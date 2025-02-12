import request from "supertest";
import app from "../../src/app";
import { prisma } from "../../src/prisma";

beforeAll(async () => {
  await prisma.address.deleteMany();
});

describe("Address Endpoints Integration Tests", () => {
  it("should create an address and return 201 status code", async () => {
    const payload = { address: "asd1", userId: "user1" };
    const res = await request(app).post("/address").send(payload);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.address).toBe(payload.address);
    expect(res.body.userId).toBe(payload.userId);
  });

  it("should retrieve addresses by user ID", async () => {
    const userId = "user1";
    const res = await request(app).get(`/address/user/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it("should update an address", async () => {
    const createPayload = { address: "asd1", userId: "user1" };
    const createRes = await request(app).post("/address").send(createPayload);
    const addressId = createRes.body.id;

    const updatePayload = { address: "asd2" };
    const updateRes = await request(app)
      .put(`/address/${addressId}`)
      .send(updatePayload);
    expect(updateRes.statusCode).toBe(200);
    expect(updateRes.body.address).toBe(updatePayload.address);
  });

  it("should delete an address and return 204 status code", async () => {
    const createPayload = { address: "123 Main St", userId: "user-123" };
    const createRes = await request(app).post("/address").send(createPayload);
    const addressId = createRes.body.id;

    const deleteRes = await request(app).delete(`/address/${addressId}`);
    expect(deleteRes.statusCode).toBe(204);
  });
});
