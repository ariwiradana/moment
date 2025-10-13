import { NextApiRequest, NextApiResponse } from "next";
import handleError from "@/lib/errorHandling";
import { serialize } from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method Not Allowed" });
  }
  try {
    res.setHeader("Set-Cookie", [
      serialize("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 0,
      }),
      serialize("user", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 0,
      }),
      serialize("role", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 0,
      }),
    ]);

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return handleError(res, error);
  }
}
