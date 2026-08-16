import * as z from "zod";

const invalidUserIdMessage = "Identificador de usuario inválido";

export const userRoleSchema = z.enum(["user", "admin"], {
  error: (issue) =>
    issue.input === undefined
      ? "El campo rol es obligatorio"
      : "Rol inválido. Valores permitidos: user, admin",
});

export type UserRole = z.infer<typeof userRoleSchema>;

export const updateUserRoleRequestSchema = z.object(
  {
    role: userRoleSchema,
  },
  {
    error: "El cuerpo de la solicitud debe ser un objeto",
  }
);

export const userIdParamsSchema = z.object({
  id: z
    .string({ error: invalidUserIdMessage })
    .regex(/^[1-9]\d*$/, { error: invalidUserIdMessage })
    .transform(Number)
    .pipe(z.int32({ error: invalidUserIdMessage })),
});
