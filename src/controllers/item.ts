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
  Response,
  Request
} from 'tsoa';

import { Request as ExRequest, Response as ExResponse } from 'express';
import { WriteError } from 'mongodb';
import { Item } from '../models/Item';

import { Item as IItem, ItemList, AddItem } from '../types/item';
import { CommonResponse } from '../types/common';

export const getItem = (req: ExRequest, res: ExResponse) => {
  Item.find()
    .then((items) => {
      res.render('index', { items });
    })
    .catch((err: WriteError) => {
      res.status(404).json({ msg: 'No items found' });
    });
};

export const addItem = (req: ExRequest, res: ExResponse) => {
  const newItem = new Item({
    name: req.body.name,
    platform: req.body.platform
  });

  newItem.save().then((item) => res.redirect('/'));
};

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

  /**
   * 获取商品详情
   * @param id 商品ID
   */
  @Get('detail')
  public async getDetail(
    @Query() id?: number | string
  ): Promise<CommonResponse<any>> {
    try {
      const items = await Item.find();
      return {
        success: true,
        message: '调用成功',
        code: 10000,
        data: items[0],
      };
    } catch (error) {}
  }

  @Post('new')
  @SuccessResponse(302, 'Redirect')
  public async addItem(@Request() req: ExRequest,  @Body() requestBody: AddItem) {
    try {
      const newItem = new Item(requestBody);
      const item = await newItem.save();
      console.info('==item==', item)
    } finally {
      req.res.redirect('/');
    }
  }
}
