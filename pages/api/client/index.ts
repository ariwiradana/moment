import { checkApiKey } from "@/lib/apiKey";

import handleError from "@/lib/errorHandling";

import { Client, Event, Participant, Review, Theme } from "@/lib/types";
import { createSlug } from "@/utils/createSlug";
import { del } from "@vercel/blob";
import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

interface Query {
  slug?: string;
  page?: number;
  limit?: number;
  status?: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!checkApiKey(req, res)) return;
  switch (req.method) {
    case "GET":
      try {
        const { slug, page = 1, limit = 10, status }: Query = req.query;

        let query = `SELECT * FROM clients`;
        let countQuery = `SELECT COUNT(*) FROM clients`;

        const values: (number | string)[] = [];
        const countValues: (number | string)[] = [];

        if (slug) {
          const valueIndex = values.length + 1;
          query += ` WHERE slug = $${valueIndex}`;
          countQuery += ` WHERE slug = $${valueIndex}`;
          values.push(slug);
          countValues.push(slug);
        }

        if (status) {
          const valueIndex = values.length + 1;
          query += ` WHERE status = $${valueIndex}`;
          countQuery += ` WHERE status = $${valueIndex}`;
          values.push(status);
          countValues.push(status);
        }

        query += ` ORDER BY updated_at DESC`;

        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const offset = (pageNumber - 1) * limitNumber;
        const valueIndex = values.length + 1;
        query += ` LIMIT $${valueIndex} OFFSET $${valueIndex + 1}`;
        values.push(limitNumber, offset);

        const { rows } = await sql.query(query, values);
        const { rows: total } = await sql.query(countQuery, countValues);

        const clientIds = rows.map((client) => client.id);

        const { rows: participants } = await sql.query(
          `
            SELECT p.*
            FROM participants p
            JOIN clients c ON p.client_id = c.id
            WHERE c.id = ANY($1::int[])
            ORDER BY c.created_at ASC
        `,
          [clientIds]
        );

        const { rows: events } = await sql.query(
          `
            SELECT e.*
            FROM events e
            JOIN clients c ON e.client_id = c.id
            WHERE c.id = ANY($1::int[])
            ORDER BY e.start_time::time ASC
        `,
          [clientIds]
        );

        const { rows: themes } = await sql.query(`SELECT * FROM themes`);
        const { rows: reviews } = await sql.query(`SELECT * FROM reviews`);

        const clients = rows.map((client: Client) => {
          const clientParticipants = participants.filter(
            (p) => p.client_id === client.id
          );
          const clientEvents = events.filter((e) => e.client_id === client.id);
          const clientTheme: Theme[] = themes.find(
            (t) => t.id === client.theme_id
          );
          const clientReviews: Review[] = reviews.filter(
            (r) => r.client_id === client.id
          );
          return {
            ...client,
            participants: clientParticipants,
            events: clientEvents,
            theme: clientTheme,
            reviews: clientReviews,
          };
        });

        return res.status(200).json({
          success: true,
          data: clients,
          total_rows: Number(total[0].count),
          page: pageNumber,
          limit: limitNumber,
        });
      } catch (error) {
        handleError(res, error);
      }

    case "POST":
      try {
        const client: Client = req.body;

        if (!client.theme_id) {
          return handleError(
            res,
            new Error(
              "The theme is required. If no theme is available, please create one."
            )
          );
        }

        if (client.theme_id) {
          const checkTheme =
            await sql`SELECT EXISTS (SELECT 1 FROM themes WHERE id = ${client.theme_id});`;
          if (!checkTheme.rows[0].exists) {
            return handleError(
              res,
              new Error("Theme not found with the provided ID.")
            );
          }
        }

        const slug = createSlug(client.name);

        if (slug) {
          const checkSlug =
            await sql`SELECT EXISTS (SELECT 1 FROM clients WHERE slug = ${slug});`;
          if (checkSlug.rows[0].exists) {
            return handleError(
              res,
              new Error("Client exists with the provided slug.")
            );
          }
        }

        const queryClient = `
          INSERT INTO clients (slug, name, theme_id, status, gallery, videos, cover, music)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          RETURNING *;
        `;

        const resultClient = await sql.query(queryClient, [
          slug,
          client.name,
          client.theme_id,
          client.status,
          client.gallery,
          client.videos,
          client.cover,
          client.music,
        ]);
        const clientId = resultClient.rows[0].id;

        if (!clientId) {
          return handleError(res, new Error("Client failed to add."));
        } else {
          const participants: Participant[] = client.participants;
          const participantPromises = participants.map(
            async (p: Participant) => {
              const addParticipantQuery = `
                INSERT INTO participants (client_id, name, nickname, address, child, parents_male, parents_female, gender, role, image, facebook, twitter, instagram, tiktok)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
                RETURNING *;
              `;

              await sql.query(addParticipantQuery, [
                clientId,
                p.name,
                p.nickname,
                p.address,
                p.child,
                p.parents_male,
                p.parents_female,
                p.gender,
                p.role,
                p.image,
                p.facebook,
                p.twitter,
                p.instagram,
                p.tiktok,
              ]);
            }
          );
          await Promise.all(participantPromises);

          const events: Event[] = client.events;
          const eventPromises = events.map(async (e: Event) => {
            const addEventQuery = `
                INSERT INTO events (client_id, name, date, start_time, end_time, address, address_url)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING *;
              `;

            await sql.query(addEventQuery, [
              clientId,
              e.name,
              e.date,
              e.start_time,
              e.end_time,
              e.address,
              e.address_url,
            ]);
          });
          await Promise.all(eventPromises);

          const newClient = resultClient.rows[0];

          newClient["participants"] = participants.map((participant) => ({
            ...participant,
            client_id: clientId,
          }));

          newClient["events"] = events.map((event) => ({
            ...event,
            client_id: clientId,
          }));

          return res.status(200).json({ success: true, data: newClient });
        }
      } catch (error) {
        handleError(res, error);
      }
    case "PUT":
      try {
        const client: Client = req.body;
        const { id } = req.query;

        if (!id) {
          return handleError(res, new Error("id required"));
        }

        const slug = createSlug(client.name);

        const updateClientQuery = `
          UPDATE clients
          SET
            name = $1, 
            theme_id = $2,
            slug = $3,
            gallery = $4,
            videos = $5,
            cover = $6,
            music = $7
          WHERE id = $8
          RETURNING *;`;

        await sql.query(updateClientQuery, [
          client.name,
          client.theme_id,
          slug,
          client.gallery,
          client.videos,
          client.cover,
          client.music,
          Number(id),
        ]);

        const newParticipants = client.participants.filter((p) => !p.id);
        if (newParticipants.length > 0) {
          const newPrticipantPromises = newParticipants.map(
            async (p: Participant) => {
              const updateNewParticipantQuery = `
              INSERT INTO participants (client_id, name, nickname, address, child, parents_male, parents_female, gender, role, image, facebook, twitter, instagram, tiktok)
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
              RETURNING *;
            `;

              await sql.query(updateNewParticipantQuery, [
                p.client_id,
                p.name,
                p.nickname,
                p.address,
                p.child,
                p.parents_male,
                p.parents_female,
                p.gender,
                p.role,
                p.image,
                p.facebook,
                p.twitter,
                p.instagram,
                p.tiktok,
              ]);
            }
          );
          await Promise.all(newPrticipantPromises);
        }

        const newEvents = client.events.filter((e) => !e.id);
        if (newEvents.length > 0) {
          const newEventPromises = newEvents.map(async (e: Event) => {
            const updateNewEventQuery = `
              INSERT INTO events (client_id, name, date, start_time, end_time, address, address_url)
              VALUES ($1, $2, $3, $4, $5, $6, $7)
              RETURNING *;
            `;

            await sql.query(updateNewEventQuery, [
              e.client_id,
              e.name,
              e.date,
              e.start_time,
              e.end_time,
              e.address,
              e.address_url,
            ]);
          });
          await Promise.all(newEventPromises);
        }

        const currentParticipants = client.participants.filter((p) => p.id);
        if (currentParticipants.length > 0) {
          const participantPromises = currentParticipants.map(
            async (p: Participant) => {
              const updateParticipantQuery = `
              UPDATE participants
              SET
                client_id = $1,
                name = $2, 
                nickname = $3,
                parents_male = $4, 
                parents_female = $5, 
                address = $6, 
                gender = $7, 
                child = $8,
                role = $9,
                image = $10,
                facebook = $11,
                twitter = $12,
                instagram = $13,
                tiktok = $14
              WHERE id = $15
              RETURNING *;
            `;

              await sql.query(updateParticipantQuery, [
                p.client_id,
                p.name,
                p.nickname,
                p.parents_male,
                p.parents_female,
                p.address,
                p.gender,
                p.child,
                p.role,
                p.image,
                p.facebook,
                p.twitter,
                p.instagram,
                p.tiktok,
                p.id,
              ]);
            }
          );
          await Promise.all(participantPromises);
        }

        const currentEvents = client.events.filter((e) => e.id);
        if (currentEvents.length > 0) {
          const eventPromises = currentEvents.map(async (e: Event) => {
            const updateEventQuery = `
              UPDATE events
              SET
                client_id = $1,
                name = $2, 
                date = $3,
                start_time = $4, 
                end_time = $5, 
                address = $6, 
                address_url = $7
              WHERE id = $8
              RETURNING *;
            `;

            await sql.query(updateEventQuery, [
              e.client_id,
              e.name,
              e.date,
              e.start_time,
              e.end_time,
              e.address,
              e.address_url,
              e.id,
            ]);
          });
          await Promise.all(eventPromises);
        }

        return res.status(200).json({
          success: true,
        });
      } catch (error) {
        handleError(res, error);
      }
    case "DELETE":
      try {
        const { id } = req.query;

        if (!id || isNaN(Number(id))) {
          return handleError(res, new Error("Invalid ID provided."));
        }

        const { rows: currentClient } = await sql.query(
          `
            SELECT c.*, p.image as participant_image
            FROM clients c
            LEFT JOIN participants p
            ON c.id = p.client_id
            WHERE c.id = $1
          `,
          [Number(id)]
        );

        if (!currentClient.length) {
          return handleError(
            res,
            new Error("Client does not exist with the provided ID.")
          );
        }

        const galleryURLs: string[] = currentClient[0]?.gallery || [];
        if (galleryURLs.length) {
          const deletePromises = galleryURLs.map((url) => del(url));
          await Promise.all(deletePromises);
        }

        const musicURL: string = currentClient[0]?.music || "";
        if (musicURL) {
          await del(musicURL);
        }

        const participantImages: string[] =
          currentClient.map((p) => p.participant_image).filter(Boolean) || [];
        if (participantImages.length) {
          const deleteParticipantImagesPromises = participantImages.map((url) =>
            del(url)
          );
          await Promise.all(deleteParticipantImagesPromises);
        }

        const videoURLs: string[] = currentClient[0]?.videos || [];
        if (videoURLs.length) {
          const deleteVideoPromises = videoURLs.map((url) => del(url));
          await Promise.all(deleteVideoPromises);
        }

        await Promise.all([
          sql.query({
            text: `DELETE FROM clients WHERE id = $1`,
            values: [id],
          }),
          sql.query({
            text: `DELETE FROM participants WHERE client_id = $1`,
            values: [id],
          }),
          sql.query({
            text: `DELETE FROM events WHERE client_id = $1`,
            values: [id],
          }),
        ]);

        return res.status(200).json({
          success: true,
          currentClient,
        });
      } catch (error) {
        handleError(res, error);
      }

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
