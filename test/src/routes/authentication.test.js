import request from "supertest";
import makeApp from "../../../src/app.js";
import { jest } from "@jest/globals";

// Stop logging
beforeAll(() => {
  global.console = { log: jest.fn() };
});

const mockDB = {
  relations: {},
};

const app = makeApp(mockDB);

describe("GET /api/auth", () => {
  const endpoint = "/api/auth";

  describe("GET request sent", () => {
    test("should respond with 200 status code", async () => {
      const response = await request(app).get(endpoint);
      expect(response.statusCode).toBe(200);
    });
  });
});