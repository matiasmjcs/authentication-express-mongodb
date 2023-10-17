import mongoose, { Document } from "mongoose";

export interface IRoom extends Document{
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


export interface IRoomFetch extends IRoom{
  _id: string
}