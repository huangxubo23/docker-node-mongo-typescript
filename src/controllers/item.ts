import { Request, Response, NextFunction } from 'express'
import { WriteError } from 'mongodb'
import { Item } from '../models/Item'

export const getItem = (req: Request, res: Response) => {
  Item.find()
    .then((items) => {
      res.render('index', { items })
    })
    .catch((err: WriteError) => {
      res.status(404).json({ msg: 'No items found' })
    })
}

export const addItem = (req: Request, res: Response) => {
  const newItem = new Item({
    name: req.body.name
  })

  newItem.save().then((item) => res.redirect('/'))
}