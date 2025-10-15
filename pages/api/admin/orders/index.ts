import handleError from "@/lib/errorHandling";
import sql from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { authenticateUser } from "@/lib/middleware";
import { ApiHandler, Order } from "@/lib/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method } = req;

    if (method !== "GET") {
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
    }

    const { client_id, page = 1, limit = 10 } = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const offset = (pageNumber - 1) * limitNumber;

    // Ambil orders tanpa join clients
    let orderQuery = `SELECT * FROM orders`;
    const values: (string | number)[] = [];
    if (client_id) {
      orderQuery += ` WHERE client_id = $1`;
      values.push(Number(client_id));
    }
    orderQuery += ` ORDER BY updated_at DESC LIMIT $${
      values.length + 1
    } OFFSET $${values.length + 2}`;
    values.push(limitNumber, offset);

    const { rows: orders } = await sql.query(orderQuery, values);

    // Hitung total rows
    const countQuery = client_id
      ? `SELECT COUNT(*) FROM orders WHERE client_id = $1`
      : `SELECT COUNT(*) FROM orders`;
    const countValues = client_id ? [Number(client_id)] : [];
    const { rows: totalRowsResult } = await sql.query(countQuery, countValues);
    const totalRows = Number(totalRowsResult[0].count);

    // Ambil clients unik
    const clientIds = Array.from(
      new Set(orders.map((o) => o.client_id).filter(Boolean))
    );
    const clientsResult = clientIds.length
      ? await sql.query(`SELECT * FROM clients WHERE id = ANY($1::int[])`, [
          clientIds,
        ])
      : { rows: [] };
    const clients = clientsResult.rows;

    // Ambil theme & package dari clients
    const themeIds = Array.from(
      new Set(clients.map((c) => c.theme_id).filter(Boolean))
    );
    const packageIds = Array.from(
      new Set(clients.map((c) => c.package_id).filter(Boolean))
    );

    const [themesResult, packagesResult] = await Promise.all([
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
    ]);

    const themes = themesResult.rows;
    const packages = packagesResult.rows;

    // Merge data ke orders
    const merged: Order[] = orders.map((order) => {
      const client = clients.find((c) => c.id === order.client_id) || null;
      return {
        ...order,
        client: client
          ? {
              ...client,
              theme: client.theme_id
                ? themes.find((t) => t.id === client.theme_id) || null
                : null,
              package: client.package_id
                ? packages.find((p) => p.id === client.package_id) || null
                : null,
            }
          : null,
      };
    });

    return res.status(200).json({
      success: true,
      data: merged,
      total_rows: totalRows,
      page: pageNumber,
      limit: limitNumber,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export default authenticateUser(handler as ApiHandler);
