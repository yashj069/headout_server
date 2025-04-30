import mongoose from "mongoose";
// import { isProduction } from './util.js';

mongoose.set("debug", false);

export const connectMongoDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log(`Mongodb is connected`);
};
