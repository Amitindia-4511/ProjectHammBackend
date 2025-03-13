import mongoose from "mongoose";
import { databaseName } from "../constant/databaseName.js";

async function connectDatabase() {
  try {
    const MongoURI = `${process.env.MONGO_URI}/${databaseName}?retryWrites=true&w=majority&appName=RealTimeChatApplication`;
    await mongoose.connect(MongoURI);
  } catch (error) {
    process.exit(1);
  }
}

export default connectDatabase;
