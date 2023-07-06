export const calculateInversePosition = (
  from: number,
  to: number,
  worlPosition: number
) => {
  return (to - from) / worlPosition;
};
