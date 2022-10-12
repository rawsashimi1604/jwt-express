import request from "supertest";
import makeApp from "../../../src/app.js";
import { jest } from "@jest/globals";

// Stop logging
beforeAll(() => {
  global.console = { log: jest.fn() };
});

const getHashedUserPassword = jest.fn();

const mockDB = {
  relations: {
    user: {
      getHashedUserPassword,
    },
  },
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

describe("POST /api/auth/login", () => {
  const endpoint = "/api/auth/login";

  const validObject = {
    username: "john123",
    password: "password123",
  };

  beforeEach(async () => {
    getHashedUserPassword.mockReset();
    getHashedUserPassword.mockResolvedValue({
      rows: [
        {
          password:
            "$2b$10$f8YxoJDRvuDa6OxmPoEemedGCWdn7ygqXNoWwR4mWM12znvyiZCnG",
        },
      ],
    });
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe("POST request sent", () => {
    test("should respond with 200 status code", async () => {
      const response = await request(app).post(endpoint).send(validObject);
      expect(response.statusCode).toBe(200);
    });

    test("should receive a json object", async () => {
      const response = await request(app).post(endpoint).send(validObject);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });

    test("should respond with user object with username if login was successful", async () => {
      const response = await request(app).post(endpoint).send(validObject);
      expect(response.body.username === "john123").toBe(true);
    });

    test("should respond with 400 status code if invalid password", async () => {
      const invalidObject = {};
      const response = await request(app).post(endpoint).send(invalidObject);
      expect(response.statusCode).toBe(400);
    });

    test("should respond with 400 status code if invalid object", async () => {
      const invalidObject = {
        username: "john123",
        password: "wrongPassword",
      };
      const response = await request(app).post(endpoint).send(invalidObject);
      expect(response.statusCode).toBe(400);
    });

    test("should respond with 500 status code when error is encountered", async () => {
      getHashedUserPassword.mockImplementation(() => {
        throw new Error();
      });
      const response = await request(app).post(endpoint).send(validObject);
      expect(response.statusCode).toBe(500);
    });
  });
});
