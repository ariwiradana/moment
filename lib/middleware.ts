import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { ApiHandler } from "./types";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "houiyfoudsyry23uuuhasdu62861yggsjr78ye9iad98172391";



export const authenticateUser =
  (handler: ApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    console.log("token : ", req.headers.authorization);

    const getTokenFromHeader = (): string | undefined => {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        return authHeader.split(" ")[1];
      }
      return undefined;
    };

    const token = getTokenFromHeader();

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
      req.body.userId = decoded.userId; // Attach the userId to the request body
      return handler(req, res); // Proceed to the handler
    } catch (error: unknown) {
      console.error("JWT verification error:", error);
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
  };
