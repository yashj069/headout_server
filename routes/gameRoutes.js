import express from "express";
import {
  getRandomQuestion,
  submitAnswer,
  getUserScore,
} from "../controllers/gameController.js";

const router = express.Router();

router.get("/question", getRandomQuestion);
router.post("/answer", submitAnswer);
router.get("/score/:username", getUserScore);

export default router;
