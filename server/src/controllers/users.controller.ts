import {
  updateUserRoleRequestSchema,
  userIdParamsSchema,
} from "@/schemas/users.schema.js";
import { toUserDto } from "@/models/user.model.js";
import { usersService } from "@/services/users.service.js";
import { UnauthorizedError } from "@/shared/errors.js";
import type { NextFunction, Request, Response } from "express";

export const usersController = {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.session.userId;
      if (!userId) {
        throw new UnauthorizedError("Usuario no autenticado");
      }

      const users = await usersService.getUsers();

      return res.status(200).json({ data: users.map(toUserDto) });
    } catch (error) {
      return next(error);
    }
  },

  async updateRole(req: Request, res: Response, next: NextFunction) {
    try {
      // requireAdmin already rejected anonymous requests, so userId is present.
      const actorId = req.session.userId!;

      const { id: targetId } = userIdParamsSchema.parse(req.params);
      const { role } = updateUserRoleRequestSchema.parse(req.body);

      const user = await usersService.updateUserRole(actorId, targetId, role);

      return res.status(200).json({ data: toUserDto(user) });
    } catch (error) {
      return next(error);
    }
  },
};
