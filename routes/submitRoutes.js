import { Router } from "express";
import dataset from "../data/dataset.json" assert { type: "json" };
const router = Router();

router.post("/", (req, res) => {
  const { questionId, selectedAnswer } = req.body;

  if (typeof questionId !== "number" || !selectedAnswer) {
    return res.status(400).json({ error: "Invalid request" });
  }

  const entry = dataset[questionId];
  if (!entry) {
    return res.status(404).json({ error: "Question not found" });
  }

  const isCorrect = selectedAnswer.toLowerCase() === entry.city.toLowerCase();
  const funFact =
    entry.fun_fact[Math.floor(Math.random() * entry.fun_fact.length)];

  res.json({
    correct: isCorrect,
    correctAnswer: entry.city,
    funFact,
  });
});

export default router;
