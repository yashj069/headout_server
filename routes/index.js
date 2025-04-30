import { Router } from "express";
import userRoutes from "./userRoutes.js";
import gameRoutes from "./gameRoutes.js";

const router = Router();

router.use("/user", userRoutes);
router.use("/game", gameRoutes);

router.use((req, res) => {
  res.status(404).json({ message: "route_not_found" });
});

export default router;
