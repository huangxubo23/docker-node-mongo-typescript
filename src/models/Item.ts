import mongoose from 'mongoose';

export type ItemDocument = mongoose.Document & {
  id: number,
  name: string,
  date: Date,
}

const ItemSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  }
})

export const Item = mongoose.model<ItemDocument>('Item', ItemSchema);
