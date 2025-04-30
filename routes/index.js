import { Router } from "express";
// import dataRoutes from "./dataRoutes.js";
// import submitRoutes from "./submitRoutes.js";
import userRoutes from "./userRoutes.js";
import gameRoutes from "./gameRoutes.js";

const router = Router();

// router.use("/data", dataRoutes);
// router.use("/submit", submitRoutes);
router.use("/user", userRoutes);
router.use("/game", gameRoutes);

router.use((req, res) => {
  res.status(404).json({ message: "route_not_found" });
});

export default router;
