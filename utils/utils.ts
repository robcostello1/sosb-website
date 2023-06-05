export const getDayNight = (time: number) => {
  const angle = ((time / 24) % 1) * Math.PI;

  return Math.pow(Math.cos(angle), 6);
};
