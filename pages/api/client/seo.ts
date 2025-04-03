import handleError from "@/lib/errorHandling";
import sql from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getEventNames } from "@/utils/getEventNames";

interface Query {
  slug?: string;
}

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  switch (request.method) {
    case "GET":
      try {
        const { slug }: Query = request.query;

        const { rows } = await sql.query(
          `SELECT
            c.id,
            c.name,
            c.status,
            c.is_preview,
            c.theme_id,
            c.opening_title,
            c.opening_description,
            c.seo,
            t.name as theme_name,
            tc.name as theme_category_name
          FROM clients c
          JOIN themes t ON c.theme_id = t.id
          JOIN theme_categories tc ON c.theme_category_id = tc.id
          WHERE c.slug = $1`,
          [slug]
        );

        if (rows.length === 0) {
          return handleError(response, new Error("Klien tidak ditemukan."));
        }

        const client = rows[0];

        const { rows: events } = await sql.query(
          `SELECT *
          FROM events
          WHERE client_id = $1`,
          [client.id]
        );

        const name = client?.name || "";
        const theme_name = client?.theme_name || "";
        const description = `${client?.opening_title || ""}, ${
          client?.opening_description || ""
        }`;
        const seo_image = client?.seo || "";
        const url = `https://momentinvitation.com/${encodeURIComponent(
          slug as string
        )}`;
        const page_title = client
          ? client.status === "unpaid"
            ? `Preview ${client.name} | Undangan ${client.theme_category_name}`
            : client.is_preview
            ? `Preview Undangan Tema ${client.theme?.name} | Moment`
            : `${client.name} | Undangan ${getEventNames(events)}`
          : "Moment";

        return response.status(200).json({
          success: true,
          name,
          url,
          seo_image,
          page_title,
          description,
          theme_name,
        });
      } catch (error) {
        handleError(response, error);
      }

    default:
      response.setHeader("Allow", ["GET"]);
      return response.status(405).end(`Method ${request.method} Not Allowed`);
  }
};

export default handler;
