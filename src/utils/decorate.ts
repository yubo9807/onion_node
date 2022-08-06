import { AnyObj, Key } from "./type";

export type Constructor = (new () => object) | AnyObj

export const errorSet = new Set();

/**
 * @description: 数据校验不通过，打印错误信息（类装饰器）
 * @author: yangyb
 * @param {any} data 要校验的数据
 * @returns
 */
export function dataCheck(data: any) {
  return (target: Constructor) => {
    if (errorSet.size > 0) {
      console.log('数据校验: 原数据 >> ', data);
      console.table(Array.from(errorSet));
    }
  }
}

/**
 * 不能为空
 * @param target 
 * @param key 
 */
export function isNotEmpty(target: Constructor, key: Key) {
  const value = target[key];
  if (['', undefined, null].includes(value)) {
    errorSet.add(`${key.toString()} 不能为空`);
  }
}

/**
 * @description: 类型校验
 * @author: yangyb
 * @param {string} type 实际类型
 * @returns
 */
export function isType(type: string) {
  return (target: Constructor, key: Key) => {
    const targetType = inspectType(target[key]);
    if (targetType !== type) {
      errorSet.add(`${key.toString()} 类型应为 ${type}，实际收到类型为 ${targetType}`);
    }
  }
}

/**
 * @description: 校验数值范围
 * @author: yangyb
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @returns
 */
export function numberRange(min = 0, max = 120) {
  return (target: Constructor, key: Key) => {
    const value = target[key];
    if (value <= min || value > max) { errorSet.add(`${key.toString()} 取值 ${min}～${max}，实际收到值为 ${value}`) }
  }
}

/**
 * 方法过期提示
 * @param newMethod 新的方法名
 * @returns 
 */
export function useless(newMethod: string) {
  return (target: Constructor, key: Key, descriptor: PropertyDescriptor) => {
    console.log(`${key.toString()} 方法已弃用，取代它的是 ${newMethod}`);
  }
}

/**
 * 禁止删除 key
 * @param target 
 * @param key 
 */
 export function notDeleteKey(target: Constructor, key: Key) {
  Object.defineProperty(target, key, {
    configurable: false,
  })
}

function inspectType(o: any) {
  return Object.prototype.toString.call(o).slice(8, -1).toLowerCase();
}
