import generateSecret from "../../../src/lib/utils/generateSecret";
import { jest } from "@jest/globals";

describe("test generateSecret()", () => {
  test("Should return 128 characters", () => {
    const token = generateSecret();
    expect(token.length).toBe(128);
  });
});
