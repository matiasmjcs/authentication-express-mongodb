import mongoose, { Mongoose } from "mongoose";
import { config } from "dotenv";
import { IDatabaseConnector } from "../interfaces/databaseConnector.interfaces";

config();

export class DatabaseConnector implements IDatabaseConnector {
  private mongoose: Mongoose | null = null;

  constructor() {}

  async connect() {
    try {
      if (!this.mongoose) {
        this.mongoose = await mongoose.connect(process.env.MONGO_URI!);
        console.log("MongoDB connected successfully");
      }
    } catch (error) {
      console.error("An error occurred while connecting to MongoDB");
      console.error(error);
    }
  }

  async disconnect() {
    try {
      if (this.mongoose) {
        await this.mongoose.connection.close();
        console.log("MongoDB disconnected");
      }
    } catch (error) {
      console.error("An error occurred while disconnecting from MongoDB");
      console.error(error);
    }
  }
}
