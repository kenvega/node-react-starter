import { usersRepository } from "@/repositories/users.repository.js";
import {
  ConflictError,
  ForbiddenError,
  NotFoundError,
} from "@/shared/errors.js";
import { hashPassword } from "@/shared/hash.js";
import type { UserRole } from "@/schemas/users.schema.js";

export const usersService = {
  async getUsers() {
    const users = await usersRepository.findAll();

    return users;
  },

  async getUserByEmail(email: string) {
    const user = await usersRepository.findByEmail(email);

    return user;
  },

  async createUser(email: string, password: string) {
    const existingUser = await usersService.getUserByEmail(email);

    if (existingUser) {
      throw new ConflictError("Correo electrónico ya registrado");
    }

    const hashedPassword = await hashPassword(password);
    const user = await usersRepository.create({
      email,
      password: hashedPassword,
    });

    return user;
  },

  async getUserById(id: number) {
    const user = await usersRepository.findById(id);
    return user;
  },

  async updateUserRole(actorId: number, targetId: number, role: UserRole) {
    // Guarded here rather than in requireAdmin: the middleware only knows who
    // the actor is, not who they are targeting.
    if (actorId === targetId) {
      throw new ForbiddenError("No puedes cambiar tu propio rol");
    }

    const user = await usersRepository.updateRole(targetId, role);

    if (!user) {
      throw new NotFoundError("Usuario no encontrado");
    }

    return user;
  },
};
