import { NextApiRequest, NextApiResponse } from "next";
import { hashPassword } from "../../../../../../../lib/auth";
import sql from "@/lib/db";
import handleError from "@/lib/errorHandling";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method Not Allowed" });
  }

  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const userResult = await sql.query(
      "SELECT * FROM users WHERE username = $1 AND role = $2",
      [username, role]
    );
    const user = userResult.rows[0];

    if (user) {
      return res.status(401).json({ success: false, message: "User exists" });
    }

    const hashedPassword = await hashPassword(password);

    await sql.query(
      "INSERT INTO users (username, password, role) VALUES ($1, $2, $3)",
      [username, hashedPassword, role]
    );
    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    return handleError(res, error);
  }
}
