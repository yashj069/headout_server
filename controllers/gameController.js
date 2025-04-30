import Destination from "../models/Destination.js";
import User from "../models/User.js";
import mongoose from "mongoose";

export const getRandomQuestion = async (req, res) => {
  try {
    const [destination] = await Destination.aggregate([
      { $sample: { size: 1 } },
    ]);
    if (!destination) {
      return res.status(404).json({ error: "No destinations found" });
    }

    const decoys = await Destination.aggregate([
      { $match: { city: { $ne: destination.city } } },
      { $sample: { size: 3 } },
      { $project: { city: 1, _id: 0 } },
    ]);

    const options = [...decoys.map((o) => o.city), destination.city].sort(
      () => 0.5 - Math.random()
    );

    res.json({
      id: destination._id, // Use ObjectId as question ID
      clues: destination.clues,
      options,
      fun_fact:
        destination.fun_fact[
          Math.floor(Math.random() * destination.fun_fact.length)
        ],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch question" });
  }
};

export const submitAnswer = async (req, res) => {
  const { questionId, username, selectedAnswer } = req.body;

  if (!mongoose.Types.ObjectId.isValid(questionId) || !selectedAnswer) {
    return res.status(400).json({ error: "Invalid request" });
  }

  const entry = await Destination.findById(questionId);
  if (!entry) {
    return res.status(404).json({ error: "Question not found" });
  }

  const isCorrect = selectedAnswer.toLowerCase() === entry.city.toLowerCase();

  if (isCorrect && username) {
    await User.updateOne({ username }, { $inc: { score: 1 } });
  }

  const funFact =
    entry.fun_fact[Math.floor(Math.random() * entry.fun_fact.length)];

  res.json({
    correct: isCorrect,
    correctAnswer: entry.city,
    funFact,
  });
};

export const getUserScore = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (user) {
      res.json({ score: user.score });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Could not fetch score" });
  }
};
