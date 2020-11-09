import mongoose from 'mongoose';
import { Item as IItem } from '../types/item'


export type ItemDocument = mongoose.Document & IItem

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
  }
})

export const Item = mongoose.model<ItemDocument>('Item', ItemSchema);
