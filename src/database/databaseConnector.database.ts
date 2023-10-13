import mongoose, { Mongoose } from "mongoose";
import { config } from "dotenv";

config();

let mongooseInstance: Mongoose | null = null;

async function connect() {
  try {
    if (!mongooseInstance) {
      mongooseInstance = await mongoose.connect(process.env.MONGO_URI!);
    }
  } catch (error) {
    console.error(error);
  }
}

async function disconnect() {
  try {
    if (mongooseInstance) {
      await mongooseInstance.disconnect();
      mongooseInstance = null;
    }
  } catch (error) {
    console.error(error);
  }
}

export { connect, disconnect };
