import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Put,
  Delete,
  Query,
  Route,
  SuccessResponse,
  Tags,
} from 'tsoa';

import { Request, Response } from 'express';
import { WriteError } from 'mongodb';
import { Item } from '../models/Item';

import { Item as IItem, ItemList } from '../types/item';
import { CommonResponse } from '../types/common';

export const getItem = (req: Request, res: Response) => {
  Item.find()
    .then((items) => {
      res.render('index', { items });
    })
    .catch((err: WriteError) => {
      res.status(404).json({ msg: 'No items found' });
    });
}

export const addItem = (req: Request, res: Response) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem.save().then((item) => res.redirect('/'));
}

@Tags('Item 商品模块')
@Route('item')
export class ItemController extends Controller {
  /**
   * 获取商品列表
   * @param id 商品ID
   * @param name 商品名称
   */
  @Get('list')
  public async getList(
    @Query() id?: number | string,
    @Query() name?: string
  ): Promise<CommonResponse<ItemList>> {
    try {
      const items = await Item.find();
      return {
        success: true,
        message: '调用成功',
        code: 10000,
        data: items,
      };
    } catch (error) {}
  }
}
