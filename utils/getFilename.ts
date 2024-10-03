export const getFilename = (prefix: string, filename: string, ext: string) => {
  return `${prefix}-${filename.replaceAll(" ", "-").toLowerCase()}.${
    ext.split("/")[1]
  }`;
};
