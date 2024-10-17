import handleError from "@/lib/errorHandling";
import { parse } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method } = req;

    switch (method) {
      case "GET":
        const cookies = req.headers.cookie;
        const parsedCookies = cookies ? parse(cookies) : {};
        const _u = parsedCookies?.user;

        return res.status(200).json(_u);

      default:
        res.setHeader("Allow", ["GET"]);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    return handleError(res, error);
  }
};

export default handler;
