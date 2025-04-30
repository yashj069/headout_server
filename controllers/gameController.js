import Destination from "../models/Destination.js";
import User from "../models/User.js";

export const getRandomQuestion = async (req, res) => {
  try {
    const count = await Destination.countDocuments();
    const random = Math.floor(Math.random() * count);
    const destination = await Destination.findOne().skip(random);

    const options = await Destination.aggregate([
      { $sample: { size: 3 } },
      { $project: { city: 1, _id: 0 } },
    ]);

    options.push({ city: destination.city });
    const shuffled = options.sort(() => 0.5 - Math.random());

    res.json({
      id: random,
      city: destination.city,
      clues: destination.clues,
      options: shuffled.map((o) => o.city),
      fun_fact:
        destination.fun_fact[
          Math.floor(Math.random() * destination.fun_fact.length)
        ],
    });
  } catch (err) {
    res.status(500).json({ error: "Could not fetch question" });
  }
};

export const submitAnswer = async (req, res) => {
  const { username, questionId, selectedAnswer } = req.body;

  if (typeof questionId !== "number" || !selectedAnswer) {
    return res.status(400).json({ error: "Invalid request" });
  }

  try {
    const entry = await Destination.findOne().skip(questionId);
    if (!entry) {
      return res.status(404).json({ error: "Question not found" });
    }

    const isCorrect = selectedAnswer.toLowerCase() === entry.city.toLowerCase();
    const funFact =
      entry.fun_fact[Math.floor(Math.random() * entry.fun_fact.length)];

    if (isCorrect && username) {
      await User.updateOne({ username }, { $inc: { score: 1 } });
    }

    res.json({
      correct: isCorrect,
      correctAnswer: entry.city,
      funFact,
    });
  } catch (err) {
    res.status(500).json({ error: "Answer submission failed" });
  }
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
