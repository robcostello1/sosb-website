export const calculateBars = (
  currentTime: number,
  bpm: number,
  startOffset: number
) => {
  // E.g. at 60bpm 1 beat = 1 second so 1 bar = 4 seconds
  const lengthOfBeat = 60 / bpm;
  const lengthOfBar = lengthOfBeat * 4;
  return Math.floor(((currentTime - startOffset) / lengthOfBar) * 4) / 4;
};
