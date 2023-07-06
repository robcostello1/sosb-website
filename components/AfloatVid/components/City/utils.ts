import { Triplet } from "../../../../utils/types";

export const getBuildingAttributes = (size: number, index: number) => {
  const isEven = index % 2 === 0;
  const side = isEven ? -1 : 1;
  const x = (20 + Math.random() * 300) * side;
  const z = Math.random() * size - size / 2;
  const sizeFactor = 50;
  return {
    scale: [
      0.5 + Math.random(),
      0.2 +
        Math.random() *
          Math.sqrt(Math.abs(sizeFactor / z)) *
          Math.sqrt(Math.abs(sizeFactor / x)),
      0.5 + Math.random(),
    ] as Triplet,
    position: [x, 0, -z] as Triplet,
  };
};

export function weightedRandom(
  // Controls the shape of the distribution, higher values make it more skewed towards lower values
  lambda = 2
) {
  const u = Math.random(); // Generate a random number between 0 and 1
  const x = -Math.log(1 - u) / lambda; // Transform the uniform distribution into an exponential distribution
  return x;
}
