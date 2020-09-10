import mongoose from 'mongoose'

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

const Item = mongoose.model('item', ItemSchema)

export {
  Item
}
