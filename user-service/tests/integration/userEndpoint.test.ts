import nock from "nock";
import request from "supertest";
import app from "../../src/app";
import { prisma } from "../../src/prisma";

describe("Student Endpoints Integration Tests", () => {
  beforeEach(() => {
    nock("http://localhost:3000")
      .post("/address")
      .reply(201, { address: "Mocked Address" });

    nock("http://localhost:3000")
      .get(/\/address\/.+/)
      .reply(200, { address: "Mocked Address" });

    nock("http://localhost:3000")
      .delete(/\/address\/.+/)
      .reply(204);
  });

  afterEach(async () => {
    nock.cleanAll();
    await prisma.student.deleteMany();
  });

  it("should list students", async () => {
    await prisma.student.createMany({
      data: [
        { name: "Alice", email: "alice@example.com" },
        { name: "Bob", email: "bob@example.com" },
      ],
    });

    const response = await request(app).get("/student");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "Alice", email: "alice@example.com" }),
        expect.objectContaining({ name: "Bob", email: "bob@example.com" }),
      ])
    );
  });

  it("should create a student and associated address", async () => {
    const response = await request(app).post("/student").send({
      name: "John Doe",
      email: "john@example.com",
      address: "Mocked Address",
    });

    expect(response.status).toBe(201);
    expect(response.body.address).toBe("Mocked Address");
  });

  it("should get a student by id", async () => {
    const createResponse = await request(app).post("/student").send({
      name: "Jane Doe",
      email: "jane@example.com",
      address: "Mocked Address",
    });

    const studentId = createResponse.body.id;

    const response = await request(app).get(`/student/${studentId}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Jane Doe");
    expect(response.body.email).toBe("jane@example.com");
    expect(response.body.address).toBe("Mocked Address");
  });

  it("should update a student", async () => {
    const createResponse = await request(app).post("/student").send({
      name: "Jane Doe",
      email: "jane@example.com",
      address: "Mocked Address",
    });

    const studentId = createResponse.body.id;

    const updateResponse = await request(app)
      .put(`/student/${studentId}`)
      .send({
        name: "Jane Smith",
        email: "jane.smith@example.com",
      });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.name).toBe("Jane Smith");
    expect(updateResponse.body.email).toBe("jane.smith@example.com");

    const getResponse = await request(app).get(`/student/${studentId}`);

    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe("Jane Smith");
    expect(getResponse.body.email).toBe("jane.smith@example.com");
  });

  it("should delete a student", async () => {
    const createResponse = await request(app).post("/student").send({
      name: "John Doe",
      email: "john@example.com",
      address: "Mocked Address",
    });

    const studentId = createResponse.body.id;

    const deleteResponse = await request(app).delete(`/student/${studentId}`);

    expect(deleteResponse.status).toBe(204);

    const getResponse = await request(app).get(`/student/${studentId}`);

    expect(getResponse.status).toBe(404);
  });
});
