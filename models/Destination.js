import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema({
  city: String,
  country: String,
  clues: [String],
  fun_fact: [String],
  trivia: [String],
});

const Destination = mongoose.model("Destination", destinationSchema);
export default Destination;
