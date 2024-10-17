import { NextApiRequest, NextApiResponse } from "next";
import { verifyPassword, generateToken, hashPassword } from "../../../lib/auth";
import { sql } from "@vercel/postgres";
import handleError from "@/lib/errorHandling";

export default async function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method Not Allowed" });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const userResult = await sql.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    const user = userResult.rows[0];

    if (user) {
      return res.status(401).json({ success: false, message: "User exists" });
    }

    const hashedPassword = await hashPassword(password);

    await sql.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
      username,
      hashedPassword,
    ]);
    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    return handleError(res, new Error("Internal Server Error"));
  }
}
