export const getFilename = (
  path: string,
  clientName: string,
  prefix: string,
  ext: string
) => {
  const generateRandomString = (length: number) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  const randomString = generateRandomString(20);

  return `${path}/${clientName}/${prefix}/${clientName
    .replaceAll(" ", "-")
    .toLowerCase()}-${randomString}.${ext.split("/")[1]}`;
};
