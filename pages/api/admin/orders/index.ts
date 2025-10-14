import handleError from "@/lib/errorHandling";
import sql from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { authenticateUser } from "@/lib/middleware";
import { ApiHandler, Order } from "@/lib/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method } = req;

    switch (method) {
      case "GET": {
        const { client_id, page = 1, limit = 10 } = req.query;

        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const offset = (pageNumber - 1) * limitNumber;

        let orderQuery = `
          SELECT o.*, c.status AS client_status
          FROM orders o
          LEFT JOIN clients c ON o.client_id = c.id
        `;

        const values: (string | number)[] = [];

        if (client_id) {
          orderQuery += ` WHERE o.client_id = $1`;
          values.push(Number(client_id));
        }

        orderQuery += `
          ORDER BY
            CASE c.status
              WHEN 'unpaid' THEN 1
              WHEN 'paid' THEN 2
              WHEN 'completed' THEN 3
              ELSE 4
            END,
            o.updated_at DESC
          LIMIT $${values.length + 1} OFFSET $${values.length + 2}
        `;

        values.push(limitNumber, offset);
        const { rows: orders } = await sql.query(orderQuery, values);

        let countQuery = `SELECT COUNT(*) FROM orders`;
        const countValues: (string | number)[] = [];
        if (client_id) {
          countQuery += ` WHERE client_id = $1`;
          countValues.push(Number(client_id));
        }
        const { rows: total } = await sql.query(countQuery, countValues);

        const themeIds = Array.from(
          new Set(orders.map((o) => o.theme_id).filter(Boolean))
        );
        const packageIds = Array.from(
          new Set(orders.map((o) => o.package_id).filter(Boolean))
        );
        const clientIds = Array.from(
          new Set(orders.map((o) => o.client_id).filter(Boolean))
        );

        const [themesResult, packagesResult, clientsResult] = await Promise.all(
          [
            themeIds.length
              ? sql.query(`SELECT * FROM themes WHERE id = ANY($1::int[])`, [
                  themeIds,
                ])
              : { rows: [] },
            packageIds.length
              ? sql.query(`SELECT * FROM packages WHERE id = ANY($1::int[])`, [
                  packageIds,
                ])
              : { rows: [] },
            clientIds.length
              ? sql.query(`SELECT * FROM clients WHERE id = ANY($1::int[])`, [
                  clientIds,
                ])
              : { rows: [] },
          ]
        );

        const themes = themesResult.rows;
        const packages = packagesResult.rows;
        const clients = clientsResult.rows;

        const merged: Order[] = orders.map((order) => ({
          id: order.id,
          order_id: order.order_id,
          status: order.status,
          name: order.name,
          phone: order.phone,
          email: order.phone,
          price: order.price,
          discount: order.discount,
          admin_fee: order.admin_fee,
          snap_token: order.snap_token,
          created_at: order.created_at,
          updated_at: order.updated_at,
          client: clients.find((c) => c.id === order.client_id) || null,
          theme: themes.find((t) => t.id === order.theme_id) || null,
          package: packages.find((p) => p.id === order.package_id) || null,
        }));

        return res.status(200).json({
          success: true,
          data: merged,
          total_rows: Number(total[0].count),
          page: pageNumber,
          limit: limitNumber,
        });
      }

      default:
        res.setHeader("Allow", ["GET"]);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    return handleError(res, error);
  }
};

export default authenticateUser(handler as ApiHandler);
