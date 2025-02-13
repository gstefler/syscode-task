import { NextFunction, Request, Response } from "express";
import logger from "../config/logger";
import { ValidateError } from "tsoa";
import { Prisma } from "@prisma/client";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2025":
        res.status(404).json({
          message: "Not Found",
        });
        return;
      case "P2002":
        res.status(409).json({
          message: "Conflict: A record with this identifier already exists.",
        });
        return;
    }
  }
  if (err instanceof ValidateError) {
    console.warn(`Validation error on ${req.path}:`, err.fields);
    res.status(422).json({
      message: "Validation Failed",
      details: err.fields,
    });
    return;
  }

  if (err instanceof Error) {
    logger.error(`Unhandled error on ${req.path}:`, err);
    res.status(500).json({
      message: "Internal Server Error",
    });
    return;
  }
}

export function notFoundHandler(_req: Request, res: Response): void {
  res.status(404).json({
    message: "Not Found",
  });
}
