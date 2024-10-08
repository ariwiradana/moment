import handleError from "@/lib/errorHandling";
import { withHostCheck } from "@/lib/middleware";
import { del } from "@vercel/blob";
import { sql } from "@vercel/postgres";
import type { NextApiResponse, NextApiRequest } from "next";

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const { url, id } = request.body;

  try {
    if (!url && !id) {
      return handleError(response, new Error("ID and url required"));
    }

    const { rows: themes } = await sql.query(
      `SELECT * FROM themes WHERE id = $1`,
      [Number(id)]
    );

    if (!themes[0]) {
      return handleError(response, new Error("Theme not found"));
    }

    await sql.query(`UPDATE themes SET thumbnail = $1 WHERE id = $2`, [
      null,
      Number(id),
    ]);

    await del(url);

    return response.status(200).json({
      success: true,
      message: "theme thumbnail updated successfully",
    });
  } catch (error) {
    handleError(response, error);
  }
};

export default withHostCheck(handler);
