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
import { StatusCodes } from 'http-status-codes';
import { ItemModel } from '../models/item';
import log from '../config/log';
import {
  formatSuccessResponse,
  CommonResponse,
  ErrorResponse,
} from '../config/response';
import Code from '../config/code';
import { Item, ItemList, AddItem } from '../types/item';
import { ValidationError } from '../error';

export const getItem = (req: ExRequest, res: ExResponse) => {
  ItemModel.find()
    .then((items) => {
      res.render('index', { items });
    })
    .catch((err: WriteError) => {
      res.status(404).json({ msg: 'No items found' });
    });
};

export const addItem = async (req: ExRequest, res: ExResponse) => {
  try {
    const newItem = new ItemModel({
      name: req.body.name,
      platform: req.body.platform,
    });
    await newItem.save();
    res.redirect('/');
  } catch (error) {
    log.error(error);
    // 500
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(
      new ErrorResponse({
        code: Code.INTERNAL_SERVER_ERROR,
        data: error,
      })
    );
  }
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
    const items = await ItemModel.find();
    return {
      success: true,
      message: '调用成功',
      code: 10000,
      data: items,
    };
  }

  /**
   * 获取商品详情
   * @param id 商品ID
   */
  @Get('detail')
  public async getDetail(
    @Query() id: number | string
  ): Promise<CommonResponse<Item>> {
    const items = await ItemModel.find();
    return formatSuccessResponse(items[0]);
  }

  /**
   * 添加商品
   * @param requestBody 
   */
  @Post('new')
  public async addItem(
    // @Request() req: ExRequest,
    @Body() requestBody: AddItem
  ): Promise<CommonResponse<Item>> {
    const newItem = new ItemModel(requestBody);
    const item = await newItem.save();
    return formatSuccessResponse(item);
  }
}
