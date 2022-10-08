import { jest } from "@jest/globals";
import hashPassword from "../../../../src/lib/authentication/hashPassword";

describe("test hashPassword()", () => {
  const password = "password123";

  test("should return a changed password", async () => {
    expect(hashPassword(password) === password).toBe(false);
  });
});
