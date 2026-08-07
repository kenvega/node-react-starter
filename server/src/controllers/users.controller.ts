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
};
