import mongoose, { Document } from "mongoose";

export interface IRoom {
  roomNumber: string;
  roomType: string;
  pricePerNight: number;
  description: string;
  images: string[];
  availableDates: Date[];
  amenities: string[];
  capacity: number;
  isClean: boolean;
  hotel: mongoose.Schema.Types.ObjectId; 
}

export interface IRoomMondodb extends Document ,IRoom {}

export interface IRoomFetch extends IRoom{
  _id: string
}