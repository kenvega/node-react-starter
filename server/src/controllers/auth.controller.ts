import { toUserDto } from "@/models/user.model.js";
import { usersService } from "@/services/users.service.js";
import { UnauthorizedError, ValidationError } from "@/shared/errors.js";
import { verifyPassword } from "@/shared/hash.js";
import { commitSession, destroySession } from "@/shared/session.js";
import type { LoginRequest, RegisterRequest } from "@/types/auth.types.js";
import type { NextFunction, Request, Response } from "express";

export const authController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as Partial<RegisterRequest>;
      const email = body.email?.trim() ?? "";
      const password = body.password ?? "";
      const confirmPassword = body.confirmPassword ?? "";

      const errors: Record<string, string[]> = {};

      if (!email) {
        errors["email"] = ["El campo email es obligatorio"];
      } else if (!email.includes("@")) {
        errors["email"] = ["Formato de correo inválido"];
      }

      if (!password) {
        errors["password"] = ["El campo contraseña es obligatorio"];
      } else if (password.length < 6) {
        errors["password"] = ["La contraseña debe tener al menos 6 caracteres"];
      }

      if (!confirmPassword) {
        errors["confirmPassword"] = [
          "El campo confirmar contraseña es obligatorio",
        ];
      } else if (password && password !== confirmPassword) {
        errors["confirmPassword"] = ["Las contraseñas no coinciden"];
      }

      if (Object.keys(errors).length > 0) {
        throw new ValidationError("Error de validación", errors);
      }

      const user = await usersService.createUser(email, password);

      await commitSession(req, { userId: user.id });

      return res.status(201).json({ data: toUserDto(user) });
    } catch (error) {
      return next(error);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as Partial<LoginRequest>;
      const email = body.email?.trim() ?? "";
      const password = body.password ?? "";

      const user = await usersService.getUserByEmail(email);

      if (!user) {
        throw new UnauthorizedError(
          "Correo electrónico o contraseña inválidos"
        );
      }

      const isValidPassword = await verifyPassword(password, user.password);

      if (!isValidPassword) {
        throw new UnauthorizedError(
          "Correo electrónico o contraseña inválidos"
        );
      }

      await commitSession(req, { userId: user.id });

      return res.status(200).json({ data: toUserDto(user) });
    } catch (error) {
      return next(error);
    }
  },

  async me(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.session.userId;
      if (!userId) {
        throw new UnauthorizedError("Usuario no autenticado");
      }

      const user = await usersService.getUserById(userId);
      if (!user) {
        throw new UnauthorizedError("Usuario no encontrado");
      }

      return res.status(200).json({ data: toUserDto(user) });
    } catch (error) {
      return next(error);
    }
  },

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      await destroySession(req);
      return res.sendStatus(204);
    } catch (error) {
      return next(error);
    }
  },
};
