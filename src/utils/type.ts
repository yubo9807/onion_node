
/**
 * 键
 */
export type Key = string | number | symbol

/**
 * 任意类型对象
 */
export type AnyObj = {
  [prop: Key]: any
}

/**
 * 上下文
 */
export type Context = {
  state?: AnyObj
}

/**
 * 下一个中间件执行
 */
export type Next = () => any

/**
 * 中间件
 */
export type Middleware = (ctx?: Context, next?: null | Next) => void
