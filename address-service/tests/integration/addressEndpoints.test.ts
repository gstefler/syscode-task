import request from "supertest";
import app from "../../src/app";
import { prisma } from "../../src/prisma";
import { v4 as uuidv4 } from "uuid";

beforeAll(async () => {
  await prisma.address.deleteMany();
});

describe("Address Endpoints Integration Tests", () => {
  it("should create an address and return 201 status code", async () => {
    const uuid = uuidv4();
    const payload = { address: "asd1", id: uuid };
    const res = await request(app).post("/address").send(payload);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.address).toBe(payload.address);
    expect(res.body.id).toBe(payload.id);
  });

  it("should delete an address and return 204 status code", async () => {
    const uuid = uuidv4();
    const createPayload = { address: "asd1", id: uuid };
    const createRes = await request(app).post("/address").send(createPayload);
    const addressId = createRes.body.id;

    const deleteRes = await request(app).delete(`/address/${addressId}`);
    expect(deleteRes.statusCode).toBe(204);
  });
});
