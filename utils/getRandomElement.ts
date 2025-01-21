export const getRandomElement = (arr: (string | number)[]) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};
