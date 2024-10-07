export const getFilename = (
  path: string,
  clientName: string,
  prefix: string,
  ext: string
) => {
  return `${path}/${clientName}/${prefix}/${clientName
    .replaceAll(" ", "-")
    .toLowerCase()}.${ext.split("/")[1]}`;
};
