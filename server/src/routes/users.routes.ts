import { usersController } from "@/controllers/users.controller.js";
import { Router } from "express";

const router = Router();

router.get("/users", usersController.list);

export default router;
