import { ApiHandler } from "../../../../lib/types";
import handleError from "@/lib/errorHandling";
import { authenticateUser } from "@/lib/middleware";
import { Client, Event, Participant } from "@/lib/types";
import { createSlug } from "@/utils/createSlug";
import sql from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";
import { getCloudinaryID } from "@/utils/getCloudinaryID";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

interface Query {
  slug?: string;
  page?: number;
  limit?: number;
  id?: number;
  status?: Client["status"];
  is_preview?: Client["is_preview"];
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
          status,
          is_preview,
        }: Query = request.query;

        const values: (string | number | boolean)[] = [];
        const conditions: string[] = [];

        if (id) {
          values.push(id);
          conditions.push(`c.id = $${values.length}`);
        }

        if (slug) {
          values.push(slug);
          conditions.push(`c.slug = $${values.length}`);
        }

        if (is_preview) {
          const is_preview_bool = String(is_preview) === "true";
          values.push(is_preview_bool);
          conditions.push(`c.is_preview = $${values.length}`);
        }

        if (status) {
          values.push(status);
          conditions.push(`c.status = $${values.length}`);
        }

        const whereClause = conditions.length
          ? `WHERE ${conditions.join(" AND ")}`
          : "";

        const limitNumber = Number(limit);
        const pageNumber = Number(page);
        const offset = (pageNumber - 1) * limitNumber;
        values.push(limitNumber, offset);

        const query = `
      WITH filtered_clients AS (
        SELECT *
        FROM clients c
        ${whereClause}
        ORDER BY c.is_preview ASC, c.status DESC, c.updated_at DESC
        LIMIT $${values.length - 1} OFFSET $${values.length}
      )
      SELECT 
        c.*,
        (
          SELECT json_agg(p ORDER BY p.id ASC)
          FROM participants p
          WHERE p.client_id = c.id
        ) AS participants,
        (
          SELECT json_agg(e ORDER BY e.date ASC, e.start_time::time ASC)
          FROM events e
          WHERE e.client_id = c.id
        ) AS events,
        (
          SELECT json_agg(w ORDER BY w.id ASC)
          FROM wishes w
          WHERE w.client_id = c.id
        ) AS wishes,
        (
          SELECT to_jsonb(t)
          FROM themes t
          WHERE t.id = c.theme_id
        ) AS theme,
        (
          SELECT to_jsonb(pac)
          FROM packages pac
          WHERE pac.id = c.package_id
        ) AS package,
        (
          SELECT to_jsonb(tc)
          FROM theme_categories tc
          WHERE tc.id = c.theme_category_id
        ) AS theme_category,
        (
          SELECT to_jsonb(m)
          FROM media m
          WHERE m.client_id = c.id
          ORDER BY m.id ASC
          LIMIT 1
        ) AS media,
        (
          SELECT to_jsonb(o)
          FROM orders o
          WHERE o.client_id = c.id
          ORDER BY o.id ASC
          LIMIT 1
        ) AS "order"
      FROM filtered_clients c;
    `;

        const countQuery = `
      SELECT COUNT(*) AS total
      FROM clients c
      ${whereClause};
    `;

        const { rows } = await sql.query(query, values);
        const { rows: countRows } = await sql.query(
          countQuery,
          values.slice(0, values.length - 2)
        );

        return response.status(200).json({
          success: true,
          data: rows,
          total_rows: Number(countRows[0].total),
          page: pageNumber,
          limit: limitNumber,
        });
      } catch (error) {
        handleError(response, error);
      }
      break;

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
          const checkTheme = await sql.query(
            `SELECT EXISTS (SELECT 1 FROM themes WHERE id = $1);`,
            [client.theme_id]
          );
          if (!checkTheme.rows[0].exists) {
            return handleError(
              response,
              new Error("Theme not found with the provided ID.")
            );
          }
        }

        if (client.package_id) {
          const checkPackage = await sql.query(
            `SELECT EXISTS (SELECT 1 FROM packages WHERE id = $1);`,
            [client.package_id]
          );
          if (!checkPackage.rows[0].exists) {
            return handleError(
              response,
              new Error("Package not found with the provided ID.")
            );
          }
        }

        let sanitizeSlug: string = "";
        if (client.slug) {
          sanitizeSlug = createSlug(client.slug);
          const checkSlug = await sql.query(
            `SELECT EXISTS (SELECT 1 FROM clients WHERE slug = $1);`,
            [sanitizeSlug]
          );
          if (checkSlug.rows.length > 0 && checkSlug.rows[0].exists) {
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
              phone,
              theme_id,
              theme_category_id,
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
              gift_account_number,
              music_title
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
            RETURNING *;
          `;

        const resultClient = await sql.query(queryClient, [
          sanitizeSlug,
          client.name,
          client.phone,
          client.theme_id,
          client.theme_category_id,
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
          client.music_title,
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
                  INSERT INTO events (client_id, name, date, start_time, end_time, address, address_url, image)
                  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
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
              e.image,
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
            gift_account_number = $15,
            theme_category_id = $16,
            music_title = $17,
            phone = $18,
            updated_at = NOW()
          WHERE id = $19
          RETURNING *;`;

        const sanitizeSlug = createSlug(client.slug as string);

        await sql.query(updateClientQuery, [
          client.name,
          client.theme_id,
          sanitizeSlug,
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
          client.theme_category_id,
          client.music_title,
          client.phone,
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
              INSERT INTO events (client_id, name, date, start_time, end_time, address, address_url, image)
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
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
              e.image,
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
                address_url = $7,
                image = $8
              WHERE id = $9
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
              e.image,
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
            SELECT c.*, p.image as participant_image, e.image as event_image
            FROM clients c
            LEFT JOIN participants p ON c.id = p.client_id
            LEFT JOIN events e ON c.id = e.client_id
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
        const env = process.env.NODE_ENV || "development";

        const participantImages: string[] = currentClient
          .map((p) => p.participant_image)
          .filter(Boolean);

        if (participantImages.length > 0) {
          try {
            const allParticipantImagePublicIDs = participantImages.map(
              (url) => `${env}/${getCloudinaryID(url)}`
            );
            if (allParticipantImagePublicIDs.length > 0)
              await cloudinary.api.delete_resources(
                allParticipantImagePublicIDs
              );
            console.log("Participants deleted");
          } catch (error) {
            console.error("Error deleting participants:", error);
          }
        } else {
          console.log("No participant URL found");
        }

        const eventImages: string[] = currentClient
          .map((e) => e.event_image)
          .filter(Boolean);

        if (eventImages.length > 0) {
          try {
            const allEventImagePublicIDs = eventImages.map(
              (url) => `${env}/${getCloudinaryID(url)}`
            );
            if (allEventImagePublicIDs.length > 0)
              await cloudinary.api.delete_resources(allEventImagePublicIDs);
            console.log("Event image deleted");
          } catch (error) {
            console.error("Error deleting event image:", error);
          }
        } else {
          console.log("No event image URL found");
        }

        const galleryURLs: string[] = currentClient[0]?.gallery || [];
        if (galleryURLs.length > 0) {
          try {
            const allGalleryPublicIDs = galleryURLs.map(
              (url) => `${env}/${getCloudinaryID(url)}`
            );
            if (allGalleryPublicIDs.length > 0)
              await cloudinary.api.delete_resources(allGalleryPublicIDs);

            console.log("Gallery deleted");
          } catch (error) {
            console.error("Error deleting gallery URLs:", error);
          }
        } else {
          console.log("No gallery URL found");
        }

        const videoURLs: string[] = currentClient[0]?.videos || [];
        if (videoURLs.length > 0) {
          try {
            const allVideoPublicIDs = videoURLs.map(
              (url) => `${env}/${getCloudinaryID(url)}`
            );
            if (allVideoPublicIDs.length > 0)
              await cloudinary.api.delete_resources(allVideoPublicIDs);
            console.log("Video deleted");
          } catch (error) {
            console.error("Error deleting video URLs:", error);
          }
        } else {
          console.log("No video URL found");
        }

        const musicURL: string | null = currentClient[0]?.music || null;
        if (musicURL && musicURL !== "") {
          try {
            const musicPublicId = getCloudinaryID(musicURL as string);
            await cloudinary.uploader.destroy(`${env}/${musicPublicId}`);
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
          text: `DELETE FROM media WHERE client_id = $1`,
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
