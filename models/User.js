import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  score: { type: Number, default: 0 },
});

const User = mongoose.model("User", userSchema);
export default User;
