import { Router } from "express";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/users.routes.js";

const router = Router();

router.use("/api/", authRoutes);
router.use("/api/", userRoutes);

export default router;
