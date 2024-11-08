import fs from "fs/promises";
import path from "path";

const delLocal = async (url: string): Promise<void> => {
  try {
    const filePath = path.join(process.cwd(), "public", url);
    await fs.unlink(filePath);
  } catch (err: unknown) {
    console.log(err);
    throw new Error(`Failed to delete file locally`);
  }
};

export default delLocal;
