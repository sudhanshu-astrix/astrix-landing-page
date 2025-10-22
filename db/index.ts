import mongoose from "mongoose";

console.log("mongodb uri", process.env.MONGODB_URI);
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
};

export default connectToDatabase;
