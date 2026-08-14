import * as z from "zod";

export const registerRequestSchema = z
  .object(
    {
      email: z
        .string({
          error: (issue) =>
            issue.input === undefined
              ? "El campo email es obligatorio"
              : "El campo email debe ser texto",
        })
        .trim()
        .min(1, {
          error: "El campo email es obligatorio",
          abort: true,
        })
        .pipe(
          z.email({
            error: "Formato de correo inválido",
          })
        ),
      password: z
        .string({
          error: (issue) =>
            issue.input === undefined
              ? "El campo contraseña es obligatorio"
              : "El campo contraseña debe ser texto",
        })
        .min(1, {
          error: "El campo contraseña es obligatorio",
          abort: true,
        })
        .min(6, {
          error: "La contraseña debe tener al menos 6 caracteres",
        }),
      confirmPassword: z
        .string({
          error: (issue) =>
            issue.input === undefined
              ? "El campo confirmar contraseña es obligatorio"
              : "El campo confirmar contraseña debe ser texto",
        })
        .min(1, {
          error: "El campo confirmar contraseña es obligatorio",
          abort: true,
        }),
    },
    {
      error: "El cuerpo de la solicitud debe ser un objeto",
    }
  )
  .refine((data) => data.password === data.confirmPassword, {
    error: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export const loginRequestSchema = z.object(
  {
    email: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "El campo email es obligatorio"
            : "El campo email debe ser texto",
      })
      .trim()
      .min(1, {
        error: "El campo email es obligatorio",
        abort: true,
      })
      .pipe(
        z.email({
          error: "Formato de correo inválido",
        })
      ),
    password: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "El campo contraseña es obligatorio"
            : "El campo contraseña debe ser texto",
      })
      .min(1, {
        error: "El campo contraseña es obligatorio",
        abort: true,
      }),
  },
  {
    error: "El cuerpo de la solicitud debe ser un objeto",
  }
);
