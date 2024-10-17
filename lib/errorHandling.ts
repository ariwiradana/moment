// utils/handleError.ts
import { NextApiResponse } from "next";

const handleError = (res: NextApiResponse, error: any) => {
  console.error("Error: ", error);
  res.status(500).json({
    success: false,
    message: error.message || "Internal Server Error",
  });
};

export default handleError;
