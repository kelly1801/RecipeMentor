import mongoose from "mongoose";

export const client = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("database online");
  } catch (err) {
    console.log(err);
    throw new Error("error initializing the database");
  }
};
