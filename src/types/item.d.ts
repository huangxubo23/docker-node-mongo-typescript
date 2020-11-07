import { ItemDocument } from '../models/Item'

export enum ItemPlatform {
  /**
   * 淘宝
   */
  'taobao',
  /**
   * 京东
   */
  'jd'
}

export interface Item {
  /**
   * 商品ID
   */
  id: number;
  /**
   * 商品名称
   */
  name: string;
  platform?: number;
  /**
   * 创建时间
   */
  date: Date;
}

export type ItemList = Item[];
