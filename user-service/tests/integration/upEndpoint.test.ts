import request from "supertest";
import app from "../../src/app";

describe("Up Endpoints Integration Tests", () => {
  it("should return 200 status code", async () => {
    const res = await request(app).get("/up");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: "up" });
  });
});
