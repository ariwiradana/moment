// utils/handleError.ts
import { NextApiResponse } from "next";

const handleError = (res: NextApiResponse, error: unknown) => {
  if (error instanceof Error) {
    return res.status(500).json({ success: false, message: error.message });
  } else {
    return res
      .status(500)
      .json({ success: false, message: "An unknown error occurred." });
  }
};

export default handleError;
