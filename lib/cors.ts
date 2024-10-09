// lib/cors.ts
import Cors from "cors";
import { NextApiRequest, NextApiResponse } from "next";

// Define allowed origins
const allowedOrigins = [
  "https://your-allowed-origin1.com",
  "https://your-allowed-origin2.com",
  // Add more as needed
];

// Initialize the CORS middleware
const cors = Cors({
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin); // Allow the requested origin
    } else {
      callback(new Error("Not allowed by CORS")); // Block the origin
    }
  },
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  credentials: true, // Allow credentials (if needed)
});

// Helper function to run the middleware
export const runCors = (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise((resolve, reject) => {
    cors(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};
