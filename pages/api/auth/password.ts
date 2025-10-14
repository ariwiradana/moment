import { hashPassword } from "@/lib/auth";
import sql from "@/lib/db";
import handleError from "@/lib/errorHandling";
import { authenticateUser } from "@/lib/middleware";
import type { NextApiResponse, NextApiRequest } from "next";

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  try {
    switch (request.method) {
      case "POST": {
        const { username, password, role } = request.body;

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
          const userResult = await sql.query(
            "SELECT * FROM users WHERE username = $1 AND role = $2",
            [username, role]
          );
          const user = userResult.rows[0];

          if (user) {
            return response
              .status(401)
              .json({ success: false, message: "User exists" });
          }

          const hashedPassword = await hashPassword(password);

          await sql.query(
            "INSERT INTO users (username, password, role) VALUES ($1, $2, $3)",
            [username, hashedPassword, role]
          );
          return response.status(200).json({
            success: true,
            message: "Account created successfully",
          });
        } else {
          const hashedPassword = await hashPassword(password);

          const query = `UPDATE users SET password = $1 WHERE username = $2`;
          const values = [hashedPassword, username];

          await sql.query(query, values);

          return response.status(200).json({
            success: true,
            message: "Password updated successfully",
          });
        }
      }

      default:
        return response.status(405).json({
          success: false,
          message: "Method not allowed",
        });
    }
  } catch (error) {
    handleError(response, error);
  }
};

export default authenticateUser(handler);
