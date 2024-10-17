import { NextApiRequest, NextApiResponse } from "next";
import { verifyPassword, generateToken } from "../../../lib/auth";
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
    const result = await sql.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    const user = result.rows[0];

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(user.id);

    res.status(200).json({
      success: true,
      token,
      user: { id: user.id },
    });
  } catch (error) {
    return handleError(res, new Error("Internal Server Error"));
  }
}
