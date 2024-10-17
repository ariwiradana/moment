import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "houiyfoudsyry23uuuhasdu62861yggsjr78ye9iad98172391";

export const authenticateUser =
  (handler: any) => async (req: NextApiRequest, res: NextApiResponse) => {

    const getCookie = (name: string): string | undefined => {
      const cookieArr = req.headers.cookie?.split(";") || [];
      for (let cookie of cookieArr) {
        const [key, value] = cookie.trim().split("=");
        if (key === name) {
          return value;
        }
      }
      return undefined;
    };

    const token = getCookie("token");

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.body.userId = (decoded as { userId: string }).userId;
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  };
