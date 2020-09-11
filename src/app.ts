import express from 'express'
import mongoose from 'mongoose'
import path from 'path'

import * as itemController from './controllers/item'

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './views'))

app.use(express.urlencoded({ extended: false }))

// Connect to MongoDB
mongoose
  .connect(
    'mongodb://localhost:27017/mongo', // 'mongodb://mongo:27017/docker-node-mongo',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => {
    console.log(err)
  })

app.get('/', itemController.getItem)
app.post('/item/add', itemController.addItem)

export default app