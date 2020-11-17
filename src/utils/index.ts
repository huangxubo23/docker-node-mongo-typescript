import { platform_names } from '../config'
import { Platform } from '../types/item'
/**
 * sleep fn
 * @param time 
 */
export const sleep = (time: number) => new Promise(resolve => setTimeout(resolve, time));

export const getPlatformLabel = (platform: Platform) => (platform_names[platform] || '');

export const phoneReg = /^1[3-9]\d{9}$/;