import request from "supertest";
import makeApp from "../../../src/app.js";
import { jest } from "@jest/globals";

// Stop logging
beforeAll(() => {
  global.console = { log: jest.fn() };
});

const getAllVehicles = jest.fn();
const addVehicle = jest.fn();
const deleteVehicleByID = jest.fn();

const mockDB = {
  relations: {
    vehicle: {
      getAllVehicles,
      addVehicle,
      deleteVehicleByID,
    },
  },
};

const app = makeApp(mockDB);

describe("GET /api/vehicles", () => {
  const endpoint = "/api/vehicles";

  describe("GET request sent", () => {
    test("should respond with 200 status code", async () => {
      const response = await request(app).get(endpoint);
      expect(response.statusCode).toBe(200);
    });
  });
});

describe("GET /api/vehicles/all", () => {
  const endpoint = "/api/vehicles/all";

  beforeEach(() => {
    getAllVehicles.mockReset();
    getAllVehicles.mockResolvedValue({
      rows: [
        { id: 1, name: "Honda" },
        { id: 2, name: "Mitsubishi" },
        { id: 3, name: "BMW" },
      ],
    });
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe("GET request sent", () => {
    test("should receive a json object", async () => {
      const response = await request(app).get(endpoint);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });

    test("should only call database query once", async () => {
      const response = await request(app).get(endpoint);
      expect(getAllVehicles).toBeCalledTimes(1);
    });

    test("should respond with 200 status code", async () => {
      const response = await request(app).get(endpoint);
      expect(response.statusCode).toBe(200);
    });

    test("should respond with 500 status code when error is encountered", async () => {
      getAllVehicles.mockImplementation(() => {
        throw new Error();
      });
      const response = await request(app).get(endpoint);
      expect(response.statusCode).toBe(500);
    });

    test("should receive a json object that contains vehicles", async () => {
      const vehicles = ["Honda", "Mitsubishi", "BMW"];

      const response = await request(app).get(endpoint);
      for (const vehicle of vehicles) {
        expect(response.body.some((item) => item.name === vehicle)).toBe(true);
      }
    });
  });
});

describe("POST /api/vehicles", () => {
  const endpoint = "/api/vehicles";

  beforeEach(() => {
    addVehicle.mockReset();
    addVehicle.mockResolvedValue({
      rows: [{ id: 1, name: "Audi" }],
    });
  });

  describe("POST request sent", () => {
    test("should respond with 200 status code", async () => {
      const validObject = {
        name: "Audi",
      };

      const response = await request(app).post(endpoint).send(validObject);
      expect(response.statusCode).toBe(200);
    });

    test("should respond with vehicle object", async () => {
      const validObject = {
        name: "Audi",
      };

      const response = await request(app).post(endpoint).send(validObject);
      expect(response.body.name === "Audi").toBe(true);
    });

    test("should receive a json object", async () => {
      const validObject = {
        name: "Audi",
      };
      const response = await request(app).post(endpoint).send(validObject);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });

    test("should respond with 400 status code if invalid object", async () => {
      const invalidObject = {};
      const response = await request(app).post(endpoint).send(invalidObject);
      expect(response.statusCode).toBe(400);
    });

    test("should respond with 500 status code when error is encountered", async () => {
      addVehicle.mockImplementation(() => {
        throw new Error();
      });
      const validObject = {
        name: "Audi",
      };
      const response = await request(app).post(endpoint).send(validObject);
      expect(response.statusCode).toBe(500);
    });
  });
});

describe("DELETE /api/vehicles/:id", () => {
  let endpoint = "/api/vehicles/1";

  beforeEach(() => {
    deleteVehicleByID.mockReset();
    deleteVehicleByID.mockResolvedValue({
      rows: [{ id: 1, name: "Honda" }],
      rowCount: 1,
    });
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe("DELETE request sent", () => {
    // should respond with 200 if delete success
    test("should respond with 200 if delete success", async () => {
      const response = await request(app).delete(endpoint);
      expect(response.statusCode).toBe(200);
    });

    // should respond with json object if delete success
    test("should receive a json object", async () => {
      const response = await request(app).delete(endpoint);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });

    // should respond with 500 if server error
    test("should respond with 500 status code when error is encountered", async () => {
      deleteVehicleByID.mockImplementation(() => {
        throw new Error();
      });
      const response = await request(app).delete(endpoint);
      expect(response.statusCode).toBe(500);
    });

    // should respond with 204 if delete failed
    test("should respond with 204 if delete failed", async () => {
      deleteVehicleByID.mockResolvedValue({ rowCount: 0 });
      const response = await request(app).delete(endpoint);
      expect(response.statusCode).toBe(204);
    });

    // should respond with 400 if invalid id
    test("should respond with 400 if invalid id", async () => {
      endpoint = "/api/vehicles/randomString";
      const response = await request(app).delete(endpoint);
      expect(response.statusCode).toBe(400);
    });
  });
});
