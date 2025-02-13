import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { errorHandler } from "../../src/middleware/errorHandler";

describe("ErrorHandler Middleware unit test", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = { path: "/test" };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should handle a Prisma P2025 error", () => {
    const prismaError = Object.create(
      Prisma.PrismaClientKnownRequestError.prototype
    ) as Prisma.PrismaClientKnownRequestError;
    prismaError.code = "P2025";
    prismaError.message = "Test error";

    errorHandler(prismaError, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Not Found" });
  });

  it("should handle a Prisma P2002 error", () => {
    const prismaError = Object.create(
      Prisma.PrismaClientKnownRequestError.prototype
    ) as Prisma.PrismaClientKnownRequestError;
    prismaError.code = "P2002";
    prismaError.message = "Test error";

    errorHandler(prismaError, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({
      message: "Conflict: A record with this identifier already exists.",
    });
  });

  it("should handle a Prisma error with an unknown code as a generic error", () => {
    const prismaError = Object.create(
      Prisma.PrismaClientKnownRequestError.prototype
    ) as Prisma.PrismaClientKnownRequestError;
    prismaError.code = "UNKNOWN";
    prismaError.message = "Some Prisma error";

    errorHandler(prismaError, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Internal Server Error" });
  });

  it("should handle a generic Error", () => {
    const genericError = new Error("Generic error");

    errorHandler(genericError, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Internal Server Error" });
  });
});
