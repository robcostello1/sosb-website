import { getDayNight } from "./utils";

describe("getDayNight", () => {
  it("is fully dark at midnight", () => {
    expect(getDayNight(0)).toBe(1);
  });

  it("is fully bright at noon", () => {
    expect(getDayNight(12)).toEqual(expect.closeTo(0, 5));
  });

  it("is fully dark next midnight", () => {
    expect(getDayNight(24)).toEqual(expect.closeTo(1, 5));
  });

  it("is fully bright next day", () => {
    expect(getDayNight(36)).toEqual(expect.closeTo(0, 5));
  });
});
