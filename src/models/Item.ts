import mongoose from 'mongoose'

export type ItemDocument = mongoose.Document & {
  name: string
  date: Date
}

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

export const Item = mongoose.model<ItemDocument>('Item', ItemSchema)
