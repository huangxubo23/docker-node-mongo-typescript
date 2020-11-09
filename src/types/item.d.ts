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
  // id: number;
  /**
   * 商品名称
   */
  name: string;
  /**
   * 商品平台
   */
  platform: 'taobao' | 'jd';
  /**
   * 创建时间
   */
  date: Date;
}

export interface AddItem {
  /**
   * 商品名称
   */
  name: string;
  /**
   * 商品平台
   */
  platform: 'taobao' | 'jd';
}

export type ItemList = Item[];
