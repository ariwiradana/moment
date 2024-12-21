import { NextApiRequest, NextApiResponse } from "next";
import { verifyPassword, generateToken } from "../../../lib/auth";
import handleError from "@/lib/errorHandling";
import { serialize } from "cookie";
import sql from "@/lib/db";

export default async function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method Not Allowed" });
  }

  const { username, password, role } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const result = await sql.query(
      "SELECT * FROM users WHERE username = $1 AND role = $2",
      [username, role]
    );
    const user = result.rows[0];

    console.log({ userrrr: user });

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

    res.setHeader("Set-Cookie", [
      serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60,
      }),
      serialize("user", username, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60,
      }),
      serialize("role", user.role, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60, // 1 hour
      }),
    ]);

    res.status(200).json({
      success: true,
      token,
      user: { id: user.id, role: user.role },
    });
  } catch (error) {
    return handleError(res, error);
  }
}
