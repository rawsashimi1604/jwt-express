import request from "supertest";
import makeApp from "../../src/app.js";
import { jest } from "@jest/globals";

// Stop logging
beforeAll(() => {
  global.console = { log: jest.fn() };
});

const app = makeApp({});

describe("GET route not found", () => {
  test("should respond with 404 status code", async () => {
    const response = await request(app).get("/some/random/route");
    expect(response.statusCode).toBe(404);
  });
});

describe("GET /", () => {
  test("should respond with 200 status code", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
});
