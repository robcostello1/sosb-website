import { calculateBars } from './utils';

describe("calculateBars", () => {
  it("calculates 60bpm", () => {
    expect(calculateBars(4, 60, 0)).toBe(1);
  });
  it("calculates 120bpm", () => {
    expect(calculateBars(0.5, 120, 0)).toBe(0.25);
    expect(calculateBars(0.51, 120, 0)).toBe(0.25);
    expect(calculateBars(2, 120, 0)).toBe(1);
  });
  it("calculates 123bpm", () => {
    const FUZZ = 0.003;
    expect(calculateBars(1.951 + FUZZ, 123, 0)).toBe(1);
    expect(calculateBars(3.902 + FUZZ, 123, 0)).toBe(2);
    expect(calculateBars(234.146 + FUZZ, 123, 0)).toBe(120);
  });
});
