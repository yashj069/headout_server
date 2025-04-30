import { Router } from "express";
import dataset from "../data/dataset.json" assert { type: "json" };
const router = Router();

router.get("/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * dataset.length);
  const entry = dataset[randomIndex];
  const clues = entry.clues.sort(() => 0.5 - Math.random()).slice(0, 2);
  const options = shuffle([...getRandomCities(dataset, 3), entry.city]);

  res.json({
    id: randomIndex,
    clues,
    options: shuffle(options),
    answer: entry.city,
    funFacts: entry.fun_fact,
    trivia: entry.trivia,
  });
});

function getRandomCities(data, count) {
  const cities = data
    .map((e) => e.city)
    .filter((v, i, a) => a.indexOf(v) === i);
  return cities.sort(() => 0.5 - Math.random()).slice(0, count);
}

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

export default router;
