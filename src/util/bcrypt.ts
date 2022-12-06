import * as bcryptjs from 'bcryptjs'
/**
 * 加密处理 - 同步方法
 * bcryptjs.hashSync(data, salt)
 * data - 要加密的数据
 * slat - 用于哈希密码的盐，指定为数字，则将使用指定的轮数生成盐并将其使用，推荐10
 */

export const hashSync = (data: string | number): string => bcryptjs.hashSync(data.toString(), 10)

/**
 * 校验 - 同步方法
 * bcryptjs.compareSync(data, encrypted)
 * data - 要校验的数据（未加密）
 * encrypted - 要校验的数据（加密）
 */

export const compareSync = (data: string | number, encryptData: string): boolean => bcryptjs.compareSync(data.toString(), encryptData)