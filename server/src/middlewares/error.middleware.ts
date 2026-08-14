import * as z from "zod";
import type { Request, Response, NextFunction } from "express";
import {
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  BadRequestError,
  ConflictError,
} from "@/shared/errors.js";

export function notFoundHandler(
  _req: Request,
  _res: Response,
  next: NextFunction
) {
  next(new NotFoundError("Resource not found"));
}

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(err);

  if (err instanceof BadRequestError) {
    return res.status(400).json({ error: err.message });
  }
  if (err instanceof UnauthorizedError) {
    return res.status(401).json({ error: err.message });
  }
  if (err instanceof ForbiddenError) {
    return res.status(403).json({ error: err.message });
  }
  if (err instanceof NotFoundError) {
    return res.status(404).json({ error: err.message });
  }
  if (err instanceof z.ZodError) {
    return res.status(422).json({
      error: "Error de validación",
      errors: z.flattenError(err),
    });
  }
  if (err instanceof ValidationError) {
    return res.status(422).json({ error: err.message, errors: err.errors });
  }
  if (err instanceof ConflictError) {
    return res.status(409).json({ error: err.message });
  }

  res.status(500).json({ error: "Error interno del servidor" });
  return;
}
