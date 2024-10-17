import { NextApiResponse } from "next";

const handleError = (res: NextApiResponse, error: unknown) => {
  const errorMessage =
    error instanceof Error ? error.message : "Internal Server Error";

  console.error("Error: ", error);
  res.status(500).json({
    success: false,
    message: errorMessage,
  });
};

export default handleError;
