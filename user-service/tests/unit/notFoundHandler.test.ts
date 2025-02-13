import request from "supertest";
import express from "express";
import { notFoundHandler } from "../../src/middleware/errorHandler";

describe("notFoundHandler Middleware", () => {
  let app: express.Express;

  beforeAll(() => {
    app = express();
    app.use(notFoundHandler);
  });

  it("should return 404 with message 'Not Found'", async () => {
    const response = await request(app).get("/asdf");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Not Found" });
  });
});
