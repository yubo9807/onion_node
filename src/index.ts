import { resolve } from 'path';
import moduleAlias from 'module-alias';
moduleAlias.addAliases({ '@': resolve(__dirname) });
import Onion from './croe';

export default Onion;

// const app = new Onion();


// app.use(async (ctx, next) => {
//   console.log(1111);
//   await next();
//   console.log(44444)
//   return ctx;
// })

// app.use(async (ctx, next) => {
//   console.log(2222)
//   ctx.state.code = 200;
//   next();
// })

// app.use(async (ctx, next) => {
//   console.log(3333)
//   return 1111
// })

// const fn = app.callback();
// (async function() {
//   console.log(await fn)
// }())