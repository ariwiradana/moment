import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";
import { Client } from "@/lib/types";
import { list, ListBlobResultBlob } from "@vercel/blob";
import handleError from "@/lib/errorHandling";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const { id, slug } = req.query;

        let text = `SELECT * FROM clients`;
        const values: (string | number)[] = [];
        let images: ListBlobResultBlob[] | null = null;
        let bride_images: ListBlobResultBlob[] | null = null;

        if (id) {
          const valueIndex = values.length + 1;
          text += ` WHERE id = $${valueIndex}`;
          values.push(Number(id));
        }

        if (slug) {
          const valueIndex = values.length + 1;
          text += ` WHERE slug = $${valueIndex}`;
          values.push(String(slug));

          const [blobs, brideBlobs] = await Promise.all([
            list({
              mode: "folded",
              prefix: `meundang/${slug}/gallery/`,
            }),
            list({
              mode: "folded",
              prefix: `meundang/${slug}/brides/`,
            }),
          ]);

          const galleryBlobs = blobs.blobs;
          const bridesBlobs = brideBlobs.blobs;

          const validImageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
          const imageBlobs = galleryBlobs.filter((blob) =>
            validImageExtensions.some((ext) => blob.url.endsWith(ext))
          );
          const brideImageBlobs = bridesBlobs.filter((blob) =>
            validImageExtensions.some((ext) => blob.url.endsWith(ext))
          );
          images = imageBlobs;
          bride_images = brideImageBlobs;
        }

        const query = {
          text,
          values,
        };

        const { rows } = await sql.query(query);

        if (slug && rows.length > 0) {
          const data = { ...rows[0], images, bride_images };
          return res.status(200).json({ success: true, data: [data] });
        }
        return res.status(200).json({ success: true, data: rows });
      } catch (error) {
        handleError(res, error);
      }

    case "POST":
      const newClient: Client = req.body;

      const slug = `${newClient.male_nickname.toLowerCase()}-${newClient.female_nickname.toLowerCase()}`;

      const { rows: existingClient } = await sql`
      SELECT * FROM clients WHERE slug = ${slug}`;

      if (existingClient.length > 0) {
        return res.status(404).json({
          success: false,
          message: "Client already exists with the provided slug.",
        });
      }

      try {
        const { rows } = await sql`
          INSERT INTO clients (
            slug, 
            theme_id, 
            date, 
            time, 
            location, 
            location_full, 
            location_link, 
            male_name, 
            male_nickname, 
            male_child, 
            male_address, 
            male_parents_male, 
            male_parents_female, 
            female_name, 
            female_nickname, 
            female_child, 
            female_address, 
            female_parents_male, 
            female_parents_female
          )
          VALUES (
            ${slug}, 
            ${newClient.theme_id}, 
            ${newClient.date}, 
            ${newClient.time}, 
            ${newClient.location}, 
            ${newClient.location_full}, 
            ${newClient.location_link}, 
            ${newClient.male_name}, 
            ${newClient.male_nickname}, 
            ${newClient.male_child}, 
            ${newClient.male_address}, 
            ${newClient.male_parents_male}, 
            ${newClient.male_parents_female}, 
            ${newClient.female_name}, 
            ${newClient.female_nickname}, 
            ${newClient.female_child}, 
            ${newClient.female_address}, 
            ${newClient.female_parents_male}, 
            ${newClient.female_parents_female}
          )
          RETURNING *`;
        return res.status(201).json({ success: true, data: rows[0] });
      } catch (error) {
        handleError(res, error);
      }

    case "PUT":
      const updatedClient: Client = req.body;

      const id = Number(req.query.id);

      try {
        const { rows: existingClient } = await sql`
      SELECT * FROM clients WHERE id = ${id}`;

        if (existingClient.length === 0) {
          return res
            .status(404)
            .json({ success: false, message: "Client not found" });
        }

        const { rows } = await sql`
      UPDATE clients
      SET 
        theme_id = ${updatedClient.theme_id}, 
        date = ${updatedClient.date}, 
        time = ${updatedClient.time}, 
        location = ${updatedClient.location}, 
        location_full = ${updatedClient.location_full}, 
        location_link = ${updatedClient.location_link},
        male_name = ${updatedClient.male_name}, 
        male_nickname = ${updatedClient.male_nickname}, 
        male_child = ${updatedClient.male_child}, 
        male_address = ${updatedClient.male_address}, 
        male_parents_male = ${updatedClient.male_parents_male}, 
        male_parents_female = ${updatedClient.male_parents_female}, 
        female_name = ${updatedClient.female_name}, 
        female_nickname = ${updatedClient.female_nickname}, 
        female_child = ${updatedClient.female_child}, 
        female_address = ${updatedClient.female_address}, 
        female_parents_male = ${updatedClient.female_parents_male}, 
          female_parents_female = ${updatedClient.female_parents_female}
      WHERE id = ${id}
      RETURNING *`;

        if (rows.length === 0) {
          return res
            .status(404)
            .json({ success: false, message: "Client not found" });
        }

        return res.status(200).json({ success: true, data: rows[0] });
      } catch (error) {
        console.error("Error updating client:", error);
        handleError(res, error);
      }

    case "DELETE":
      const clientId = Number(req.query.id);
      try {
        await sql`DELETE FROM clients WHERE id = ${clientId}`;
        return res
          .status(200)
          .json({ success: true, message: "Client deleted successfully" });
      } catch (error: unknown) {
        handleError(res, error);
      }

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
