import express from 'express'
import mongoose from 'mongoose'
import path from 'path'

import { Item } from './models/Item'

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
  .catch((err: any) => console.log(err))


app.get('/', (req: any, res: any) => {
  Item.find()
    .then((items: any) => res.render('index', { items }))
    .catch((err: any) => res.status(404).json({ msg: 'No items found' }))
})

app.post('/item/add', (req: any, res: any) => {
  console.log(req.body.name)
  const newItem = new Item({
    name: req.body.name
  })

  newItem.save().then((item: any) => res.redirect('/'))
})

const port = 3000

app.listen(port, () => console.log('Server running...'))
