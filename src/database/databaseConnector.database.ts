import mongoose, { Mongoose } from "mongoose";
import { config } from "dotenv";

config();

let mongooseInstance: Mongoose | null = null;

/**
 * Connects to the MongoDB database.
 *
 * @return {Promise<void>} - A promise that resolves when the connection is successful, or rejects with an error.
 */
async function connect() {
  try {
    if (!mongooseInstance) {
      mongooseInstance = await mongoose.connect(process.env.MONGO_URI!);
    }
  } catch (error) {
    console.error(error);
  }
}

/**
 * Disconnects from the database if a connection instance exists.
 *
 * @return {Promise<void>} - A Promise that resolves once the disconnection is complete.
 */
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
