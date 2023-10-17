import { Schema, model } from 'mongoose';
import { IRoom } from '../interfaces/room/room.interface';


const roomSchema = new Schema<IRoom>({
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

const Room = model<IRoom>('Room', roomSchema);

export default Room;
