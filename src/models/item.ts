import mongoose from 'mongoose';
import { Item } from '../types/item';

export type ItemDocument = mongoose.Document & Item;

const ItemSchema = new mongoose.Schema({
  // id: {
  //   type: Number,
  //   required: true,
  //   unique: true,
  // },
  name: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export const ItemModel = mongoose.model<ItemDocument>('Item', ItemSchema);
