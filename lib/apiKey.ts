// lib/apiKey.ts
import { NextApiRequest, NextApiResponse } from "next";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY; // Store your API key in an environment variable

export const checkApiKey = (req: NextApiRequest, res: NextApiResponse) => {
  const apiKey = req.headers["x-request-identifier"];

  if (apiKey !== API_KEY) {
    res.status(403).json({ message: "Forbidden" });
    return false;
  }
  return true;
};
