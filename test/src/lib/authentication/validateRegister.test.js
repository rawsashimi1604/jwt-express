import validateRegister from "../../../../src/lib/authentication/validateRegister";
import { jest } from "@jest/globals";

describe("test validateRegister()", () => {

  const validUsers = [
    { username: "john123", password: "password123"},
    { username: "asifasfijasfdi1", password: "ioasdf@oiaksd"},
    { username: "mary", password: "123456"},
    { username: "gavin", password: "08245-sjdf"},
  ]

  test("should return true if user was valid", () => {
    for (const validUser of validUsers) {
      expect(validateRegister(validUser)).toBe(true);
    }
  });

  test("should return false if password was less than 6 characters long", () => {
    const invalidUser = { username: "john123", password: "123" };
    expect(validateRegister(invalidUser)).toBe(false);
  });

  test("should return false if key value pairs were not passed in", () => {
    const invalidUser = {};
    expect(validateRegister(invalidUser)).toBe(false);
  });

  test("should return false if object schema is incorrect", () => {
    const invalidUser = { username: "john123", fakekey: "123" };
    expect(validateRegister(invalidUser)).toBe(false);
  });
});