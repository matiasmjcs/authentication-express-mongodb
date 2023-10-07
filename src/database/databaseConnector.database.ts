import mongoose, { Mongoose } from "mongoose";
import { config } from "dotenv";

config();

let mongooseInstance: Mongoose | null = null;

async function connect() {
  try {
    if (!mongooseInstance) {
      mongooseInstance = await mongoose.connect(process.env.MONGO_URI!);
      console.log("MongoDB connected successfully");
    }
  } catch (error) {
    console.error("An error occurred while connecting to MongoDB");
    console.error(error);
  }
}

async function disconnect() {
  try {
    if (mongooseInstance) {
      await mongooseInstance.connection.close();
      console.log("MongoDB disconnected");
    }
  } catch (error) {
    console.error("An error occurred while disconnecting from MongoDB");
    console.error(error);
  }
}

export { connect, disconnect };
