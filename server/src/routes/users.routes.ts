import { usersController } from "@/controllers/users.controller.js";
import { requireAdmin } from "@/middlewares/auth.middleware.js";
import { Router } from "express";

const router = Router();

router.get("/users", usersController.list);
router.patch("/users/:id/role", requireAdmin, usersController.updateRole);

export default router;
