import { hashPassword } from "@/lib/auth";
import sql from "@/lib/db";
import handleError from "@/lib/errorHandling";
import { authenticateUser } from "@/lib/middleware";
import { capitalizeWords } from "@/utils/capitalizeWords";
import type { NextApiResponse, NextApiRequest } from "next";

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const { username, password, role } = request.body;

  try {
    if (!username) {
      return handleError(response, new Error("Username required"));
    }
    if (!password) {
      return handleError(response, new Error("Password required"));
    }

    const { rowCount } = await sql.query(
      "SELECT username FROM users WHERE username = $1",
      [username]
    );

    if (rowCount === 0) {
      return handleError(
        response,
        new Error(`${capitalizeWords(role)} does not exists`)
      );
    }

    const hashedPassword = await hashPassword(password);

    const query = `UPDATE users SET password = $1 WHERE username = $2`;
    const values = [hashedPassword, username];

    await sql.query(query, values);

    return response.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    handleError(response, error);
  }
};

export default authenticateUser(handler);
