import validateAddVehicle from "../../../src/lib/vehicle/validateAddVehicle.js";
import { jest } from "@jest/globals";

describe("test validateAddVehicle()", () => {
  test("should return true if vehicle was valid", () => {
    const validVehicle = {
      name: "Audi",
    };
    expect(validateAddVehicle(validVehicle)).toBe(true);
  });

  test("should return false if vehicle was invalid", () => {
    const invalidVehicle = {};
    expect(validateAddVehicle(invalidVehicle)).toBe(false);
  });
});
