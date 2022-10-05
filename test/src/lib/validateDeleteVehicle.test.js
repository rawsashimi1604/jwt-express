import validateDeleteVehicle from "../../../src/lib/vehicle/validateDeleteVehicle.js";
import { jest } from "@jest/globals";

describe("test validateDeleteVehicle()", () => {
  test("should return true if id was valid", () => {
    const validId = 1;
    expect(validateDeleteVehicle(validId)).toBe(true);
  });

  test("should return false if id was invalid", () => {
    const invalidId = "someRandomString";
    expect(validateDeleteVehicle(invalidId)).toBe(false);
  });
});
