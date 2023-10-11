import mongoose, { Schema, model } from 'mongoose';
import { IRoomMondodb } from '../interfaces/room/room.interface';


const roomSchema = new Schema<IRoomMondodb>({
  roomNumber: { type: String, required: true },
  roomType: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  description: { type: String, required: true },
  images: [String],
  availableDates: [Date],
  amenities: [String],
  capacity: { type: Number, required: true },
  isClean: { type: Boolean, default: true },
  hotel: { type: Schema.Types.ObjectId, ref: 'Hotel' }
});

const Room = model<IRoomMondodb>('Rooms', roomSchema);

export default Room;
