import { Context, Next, Middleware } from '@/utils/type';
import context from './context';

export default class {
  
  performFuncList: Middleware[]
  ctx: Context
  next: Next

  constructor() {
    this.performFuncList = [];  // 执行函数数组
    this.ctx = context;
    this.next = () => {};
  }

  /**
   * 使用一个中间件
   * @param func 
   */
  use(func: Middleware) {
    this.performFuncList.push(func);
  }

  /**
   * 回调
   */
  async callback() {
    return this.#compose(this.performFuncList, this.ctx, this.next);
  }

  /**
   * 中间件执行队列处理
   * @param middlewareList 中间件list
   * @param ctx 
   * @param next 
   * @returns 
   */
  #compose(middlewareList: Middleware[], ctx: Context, next: Next) {
    function dispatch(i: number) {
      let fn = middlewareList[i];
      if (i === middlewareList.length) fn = next;
      return Promise.resolve(fn(ctx, dispatch.bind(null, ++i)));
    }
    return dispatch(0);
  }
}