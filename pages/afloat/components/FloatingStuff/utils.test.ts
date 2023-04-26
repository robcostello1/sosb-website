import { calculateInversePosition } from "./utils";

describe("calculateInversePosition", () => {
  it("returns correctly at start", () => {
    expect(calculateInversePosition(-10, 10, -10)).toBe(20);
  });
  it("returns correctly at end", () => {
    expect(calculateInversePosition(-10, 10, -10)).toBe(-20);
  });
});
