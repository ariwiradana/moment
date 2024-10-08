// lib/middleware.ts

import type { NextApiRequest, NextApiResponse } from "next";

export function withHostCheck(
  handler: (req: NextApiRequest, res: NextApiResponse) => void
) {
  return (req: NextApiRequest, res: NextApiResponse) => {
    const origin = req.headers.origin;
    const host = req.headers.host;

    // Log the origin and host for debugging
    console.log("Origin:", origin);
    console.log("Host:", host);

    // Allow requests from localhost and any other origin matching the host
    const allowedOrigins = [
      `http://${host}`,
      `https://${host}`,
      `http://localhost:3000`, // Adjust this if your port is different
      `https://localhost:3000`, // Adjust this if your port is different
    ];

    // Check if the origin is in the allowed origins list
    if (origin && !allowedOrigins.includes(origin)) {
      console.log("Forbidden:", origin); // Log forbidden access
      return res.status(403).json({ message: "Forbidden" });
    }

    return handler(req, res);
  };
}
