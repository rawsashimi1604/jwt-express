import request from "supertest";
import makeApp from "../../../src/app.js";
import { jest } from "@jest/globals";

// Stop logging
beforeAll(() => {
  global.console = { log: jest.fn() };
});

const getAllUsers = jest.fn();
const addUser = jest.fn();

const mockDB = {
  relations: {
    user: {
      getAllUsers,
      addUser,
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

describe("GET /api/auth/user", () => {
  const endpoint = "/api/auth/user/all";

  beforeEach(() => {
    getAllUsers.mockReset();
    getAllUsers.mockResolvedValue({
      rows: [{ username: "john123", password: "password123" }],
    });
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe("GET request sent", () => {
    test("should receive a json object that contains users", async () => {
      const response = await request(app).get(endpoint);
      for (const user of response.body) {
        expect("username" in user).toBe(true);
        expect("password" in user).toBe(true);
      }
    });

    test("should respond with 200 status code", async () => {
      const response = await request(app).get(endpoint);
      expect(response.statusCode).toBe(200);
    });

    test("should receive a json object", async () => {
      const response = await request(app).get(endpoint);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });

    test("should only call database query once", async () => {
      const response = await request(app).get(endpoint);
      expect(getAllUsers).toBeCalledTimes(1);
    });

    test("should respond with 500 status code when error is encountered", async () => {
      getAllUsers.mockImplementation(() => {
        throw new Error();
      });
      const response = await request(app).get(endpoint);
      expect(response.statusCode).toBe(500);
    });
  });
});

describe("POST /api/auth/users", () => {
  const endpoint = "/api/auth/user";

  const validObject = {
    username: 'john123',
    password: 'password123',
  }

  beforeEach(() => {
    addUser.mockReset();
    addUser.mockResolvedValue({
      rows: [{ username: 'john123' }],
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

    // Should receive json object
    // Should receive object containing username
    // should respond with 400 error if invalid object
    // should respond with 500 error if server error
  });
  
});
