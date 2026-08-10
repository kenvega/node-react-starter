import { usersService } from "@/services/users.service.js";
import { ForbiddenError, UnauthorizedError } from "@/shared/errors.js";
import type { NextFunction, Request, Response } from "express";

export async function requireAdmin(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  try {
    const userId = req.session.userId;
    if (!userId) {
      throw new UnauthorizedError("Usuario no autenticado");
    }

    // The session only stores the id, so the role has to come from the database
    // on every request — a stale role in a long-lived session would otherwise
    // keep granting access after a demotion.
    const user = await usersService.getUserById(userId);
    if (!user) {
      throw new UnauthorizedError("Usuario no encontrado");
    }

    if (user.role !== "admin") {
      throw new ForbiddenError(
        "Solo los administradores pueden realizar esta acción"
      );
    }

    return next();
  } catch (error) {
    return next(error);
  }
}
