import { ApiHandler } from "./../../../lib/types";
import handleError from "@/lib/errorHandling";
import { authenticateUser } from "@/lib/middleware";

import {
  Client,
  Event,
  Package,
  Participant,
  Review,
  Theme,
} from "@/lib/types";
import { createSlug } from "@/utils/createSlug";
import { del } from "@vercel/blob";
import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

interface Query {
  slug?: string;
  page?: number;
  limit?: number;
  id?: number;
  is_using_service?: boolean | string;
}

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  switch (request.method) {
    case "GET":
      try {
        const {
          slug,
          page = 1,
          id,
          limit = 10,
          is_using_service,
        }: Query = request.query;

        let query = `SELECT * FROM clients`;
        let countQuery = `SELECT COUNT(*) FROM clients`;

        const values: (number | string | boolean)[] = [];
        const countValues: (number | string | boolean)[] = [];

        if (id) {
          const valueIndex = values.length + 1;
          query += ` WHERE id = $${valueIndex}`;
          countQuery += ` WHERE id = $${valueIndex}`;
          values.push(id);
          countValues.push(id);
        }

        if (slug) {
          const valueIndex = values.length + 1;
          query += ` WHERE slug = $${valueIndex}`;
          countQuery += ` WHERE slug = $${valueIndex}`;
          values.push(slug);
          countValues.push(slug);
        }

        if (is_using_service) {
          const valueIndex = values.length + 1;
          const isTestimoniBoolean = is_using_service === "true";

          query += ` WHERE is_using_service = $${valueIndex} AND is_preview = $${
            valueIndex + 1
          }`;
          countQuery += ` WHERE is_using_service = $${valueIndex} AND is_preview = $${
            valueIndex + 1
          }`;

          values.push(isTestimoniBoolean, false);
          countValues.push(isTestimoniBoolean, false);
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
        const { rows: packages } = await sql.query(`SELECT * FROM packages`);

        const clients = rows.map((client: Client) => {
          const clientParticipants = participants.filter(
            (p) => p.client_id === client.id
          );
          const clientEvents = events.filter((e) => e.client_id === client.id);
          const clientTheme: Theme[] = themes.find(
            (t) => t.id === client.theme_id
          );
          const clientPackages: Package[] = packages.find(
            (t) => t.id === client.package_id
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
            packages: clientPackages,
          };
        });

        return response.status(200).json({
          success: true,
          data: clients,
          total_rows: Number(total[0].count),
          page: pageNumber,
          limit: limitNumber,
        });
      } catch (error) {
        handleError(response, error);
      }

    case "POST":
      try {
        const client: Client = request.body;

        if (!client.theme_id) {
          return handleError(
            response,
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
              response,
              new Error("Theme not found with the provided ID.")
            );
          }
        }

        if (client.package_id) {
          const checkPackage =
            await sql`SELECT EXISTS (SELECT 1 FROM packages WHERE id = ${client.package_id});`;
          if (!checkPackage.rows[0].exists) {
            return handleError(
              response,
              new Error("Package not found with the provided ID.")
            );
          }
        }

        const slug = createSlug(client.name);

        if (slug) {
          const checkSlug =
            await sql`SELECT EXISTS (SELECT 1 FROM clients WHERE slug = ${slug});`;
          if (checkSlug.rows[0].exists) {
            return handleError(
              response,
              new Error("Client exists with the provided slug.")
            );
          }
        }

        const queryClient = `
          INSERT INTO clients (
            slug,
            name,
            theme_id,
            status,
            gallery,
            videos,
            cover,
            music,
            package_id,
            opening_title,
            opening_description,
            closing_title,
            closing_description,
            gift_bank_name,
            gift_account_name,
            gift_account_number
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
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
          client.package_id,
          client.opening_title,
          client.opening_description,
          client.closing_title,
          client.closing_description,
          client.gift_bank_name,
          client.gift_account_name,
          client.gift_account_number,
        ]);
        const clientId = resultClient.rows[0].id;

        if (!clientId) {
          return handleError(response, new Error("Client failed to add."));
        } else {
          const participants: Participant[] = client.participants;
          const participantPromises = participants.map(
            async (p: Participant) => {
              const addParticipantQuery = `
                  INSERT INTO participants (
                  client_id,
                  name,
                  nickname,
                  address,
                  child,
                  parents_male,
                  parents_female,
                  gender,
                  role,
                  image,
                  facebook,
                  twitter,
                  instagram,
                  tiktok
                )
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

          return response.status(200).json({ success: true, data: newClient });
        }
      } catch (error) {
        handleError(response, error);
      }
    case "PUT":
      try {
        const client: Client = request.body;
        const { id } = request.query;

        if (!id) {
          return handleError(response, new Error("id required"));
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
            music = $7,
            package_id = $8,
            opening_title = $9, 
            opening_description = $10, 
            closing_title = $11, 
            closing_description = $12,
            gift_bank_name = $13,
            gift_account_name = $14,
            gift_account_number = $15
          WHERE id = $16
          RETURNING *;`;

        await sql.query(updateClientQuery, [
          client.name,
          client.theme_id,
          slug,
          client.gallery,
          client.videos,
          client.cover,
          client.music,
          client.package_id,
          client.opening_title,
          client.opening_description,
          client.closing_title,
          client.closing_description,
          client.gift_bank_name,
          client.gift_account_name,
          client.gift_account_number,
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
                Number(id),
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
              Number(id),
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

        return response.status(200).json({
          success: true,
        });
      } catch (error) {
        handleError(response, error);
      }
    case "DELETE":
      try {
        const { id } = request.query;

        if (!id || isNaN(Number(id))) {
          return handleError(response, new Error("Invalid ID provided."));
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
            response,
            new Error("Client does not exist with the provided ID.")
          );
        }

        const participantImages: string[] = currentClient
          .map((p) => p.participant_image)
          .filter(Boolean);

        if (participantImages.length > 0) {
          try {
            await Promise.all(
              participantImages.map(async (url) => {
                await del(url);
              })
            );
            console.log("Participants deleted");
          } catch (error) {
            console.error("Error deleting participants:", error);
          }
        } else {
          console.log("No participant URL found");
        }
        // Deleting gallery URLs
        const galleryURLs: string[] = currentClient[0]?.gallery || [];
        if (galleryURLs.length > 0) {
          try {
            await Promise.all(
              galleryURLs.map(async (url) => {
                await del(url);
              })
            );
            console.log("Gallery deleted");
          } catch (error) {
            console.error("Error deleting gallery URLs:", error);
          }
        } else {
          console.log("No gallery URL found");
        }

        // Deleting video URLs
        const videoURLs: string[] = currentClient[0]?.videos || [];
        if (videoURLs.length > 0) {
          try {
            await Promise.all(
              videoURLs.map(async (url) => {
                await del(url);
              })
            );
            console.log("Video deleted");
          } catch (error) {
            console.error("Error deleting video URLs:", error);
          }
        } else {
          console.log("No video URL found");
        }

        // Deleting music URL
        const musicURL: string | null = currentClient[0]?.music || null;
        if (musicURL && musicURL !== "") {
          try {
            await del(musicURL);
            console.log("Music deleted");
          } catch (error) {
            console.error("Error deleting music URL:", error);
          }
        } else {
          console.log("No music URL found");
        }

        await sql.query("BEGIN");

        await sql.query({
          text: `DELETE FROM participants WHERE client_id = $1`,
          values: [Number(id)],
        });

        await sql.query({
          text: `DELETE FROM events WHERE client_id = $1`,
          values: [Number(id)],
        });

        await sql.query({
          text: `DELETE FROM testimonials WHERE client_id = $1`,
          values: [Number(id)],
        });

        await sql.query({
          text: `DELETE FROM clients WHERE id = $1`,
          values: [Number(id)],
        });

        await sql.query("COMMIT");
        return response.status(200).json({
          success: true,
          currentClient,
        });
      } catch (error) {
        handleError(response, error);
      }

    default:
      response.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return response.status(405).end(`Method ${request.method} Not Allowed`);
  }
};

export default authenticateUser(handler as ApiHandler);
