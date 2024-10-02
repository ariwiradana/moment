import handleError from "@/lib/errorHandling";
import { ClientV2, Participant } from "@/lib/types";
import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

interface Query {
  slug?: string;
  page?: number;
  limit?: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const { slug, page = 1, limit = 10 }: Query = req.query;

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
        `,
          [clientIds]
        );

        const { rows: themes } = await sql.query(`SELECT * FROM themes`);

        const clients = rows.map((client: ClientV2) => {
          const clientParticipants = participants.filter(
            (p) => p.client_id === client.id
          );
          const clientTheme = themes.find((t) => t.id === client.theme_id);
          return {
            ...client,
            participants: clientParticipants,
            theme: clientTheme,
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
        const client: ClientV2 = req.body;

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

        const slug = client.name.toLocaleLowerCase().replaceAll(" ", "-");

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
          INSERT INTO clients (slug, name, address, address_url, address_full, date, start_time, end_time, theme_id, status)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
          RETURNING *;
        `;

        const resultClient = await sql.query(queryClient, [
          slug,
          client.name,
          client.address,
          client.address_url,
          client.address_full,
          client.date,
          client.start_time,
          client.end_time,
          client.theme_id,
          client.status,
        ]);
        const clientId = resultClient.rows[0].id;

        const participants: Participant[] = client.participants;
        const participantPromises = participants.map(async (p: Participant) => {
          const addParticipantQuery = `
              INSERT INTO participants (client_id, name, nickname, address, child, parents_male, parents_female, gender, role)
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
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
          ]);
        });
        await Promise.all(participantPromises);

        const newClient = resultClient.rows[0];
        newClient["participants"] = participants.map((participant) => ({
          ...participant,
          client_id: clientId,
        }));

        return res.status(200).json({ success: true, data: newClient });
      } catch (error) {
        handleError(res, error);
      }
    case "PUT":
      try {
        const client: ClientV2 = req.body;
        const { id } = req.query;

        if (!id) {
          return handleError(res, new Error("id required"));
        }

        const slug = client.name.toLocaleLowerCase().replaceAll(" ", "-");

        const updateClientQuery = `
          UPDATE clients
          SET
            name = $1, 
            address = $2, 
            address_url = $3,
            address_full = $4, 
            date = $5, 
            start_time = $6, 
            end_time = $7, 
            theme_id = $8,
            slug = $9
          WHERE id = $10
          RETURNING *;`;

        await sql.query(updateClientQuery, [
          client.name,
          client.address,
          client.address_url,
          client.address_full,
          client.date,
          client.start_time,
          client.end_time,
          client.theme_id,
          slug,
          Number(id),
        ]);

        const newParticipants = client.participants.filter((p) => !p.id);
        if (newParticipants.length > 0) {
          const newPrticipantPromises = newParticipants.map(
            async (p: Participant) => {
              const updateNewParticipantQuery = `
              INSERT INTO participants (client_id, name, nickname, address, child, parents_male, parents_female, gender, role)
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
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
              ]);
            }
          );
          await Promise.all(newPrticipantPromises);
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
                role = $9
              WHERE id = $10
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
                p.id,
              ]);
            }
          );
          await Promise.all(participantPromises);
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

        const checkId =
          await sql`SELECT EXISTS (SELECT 1 FROM clients WHERE id = ${Number(
            id
          )});`;
        if (!checkId.rows[0].exists) {
          return handleError(
            res,
            new Error("Client not exists with the provided id.")
          );
        }

        await sql.query({
          text: `DELETE FROM clients WHERE id = $1`,
          values: [id],
        });

        await sql.query({
          text: `DELETE FROM participants WHERE client_id = $1`,
          values: [id],
        });

        return res.status(200).json({
          success: true,
        });
      } catch (error) {
        handleError(res, error);
      }

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
