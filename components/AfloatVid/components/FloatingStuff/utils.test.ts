import { calculateInversePosition } from "./utils";

describe("calculateInversePosition", () => {
  it("returns correctly at start", () => {
    expect(
      calculateInversePosition(
        // Starts at 10m in front
        -10,
        // Goes to 10m behind
        10,
        // The world is 10m in fron
        -10
      )
    ).toBe(20);
  });
  // it("returns correctly at end", () => {
  //   expect(calculateInversePosition(-10, 10, -10)).toBe(-20);
  // });
});
