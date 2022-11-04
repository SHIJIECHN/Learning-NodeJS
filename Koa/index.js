// 使用koa
// CommonJS引入第三方模块：require('xxx')
const Koa = require('koa');
const app = new Koa(); // 应用程序对象

/**
 * 常规服务器：浏览器发送一个HTTP请求，服务器接收请求。
 * 
 * 如何在服务器接收到HTTP请求，并处理请求（比如返回数据给服务器）？
 * 
 * 中间件。其实中间件就是一个函数。
 * function test(){
 *  console.log('test')
 * }
 * test();
 * 
 * 
 * 如何让test一个函数成为中间件呢？
 * 将函数传入app.use(test)。test函数就变成了中间件。 --- 注册。把函数注册成了一个中间件。
 * 
 * 中间件的作用： 
 * 有发送过来请求就执行test()函数，没有请求就不执行test().
 * 
 * 总结： 
 * 1. koa启动的时候执行、发送请求过来的时候执行
 * 2. 中间件
 * 
 * 注册多个中间件，如何执行？
 * 默认只执行第一个。中间件函数会传入参数ctx，next.ctx是上下文，next实际就是下面一个中间件函数，执行next(),就可以执行。
 * 
 * 洋葱模型
 * 
 * 判断输出
 app.use((ctx, next) => {
  console.log(1);
  next();
  console.log(2);
})

app.use((ctx, next) => {
  console.log(3);
  next();
  console.log(4);
})
 *
 * 1 3 4 2
 */

// 注册中间件
// app.use((ctx, next) => {
//   console.log(1);
//   next();
//   console.log(2);
// })

// app.use((ctx, next) => {
//   console.log(3);
//   next();
//   console.log(4);
// })

/**
 *  中间件的返回值，const result = next() 打印result结果：
 * next()没有返回值时，
 *    result Promise { undefined }
 * 中间件函数执行的结果都是Promise。
 * 
 * 执行结果：1 3 4 result Promise { undefined } 2
 */
// app.use((ctx, next) => {
//   console.log(1);
//   const result = next();
//   console.log('result', result); // result Promise { undefined }
//   console.log(2);
// })

// app.use((ctx, next) => {
//   console.log(3);
//   next();
//   console.log(4);
// })


/**
 * next()有返回值，如何直接拿到结果？
 * 使用then。
 * 
 * 执行结果：1 3 4 2  hello
 * 
 * 执行结果发生了变化。因为Promise是异步操作。
 * 
 * 使用async await改变代码顺序
 * 执行结果： 1 3 4 hello 2  
 * 
 * await 功能：
 * 1. 求值Promise表达式
 * 2. 阻塞线程
 */
// app.use(async (ctx, next) => {
//   console.log(1);
//   // const resultPromise = next();
//   // resultPromise.then(res => {
//   //   console.log(res);
//   // })
//   const result = await next();
//   console.log('result: ' + result);
//   console.log(2);
// })

// app.use((ctx, next) => {
//   console.log(3);
//   next();
//   console.log(4);
//   return 'hello';
// })

/**
 * 阻塞线程。
 * 
 * 异步：对资源的操作。读写数据库，发送http请求。
 * 
 * 如果next前面没有使用await ，并且next()中包含异步代码，会破坏洋葱模型
 */

app.use(async (ctx, next) => {
  console.log(1);
  const result = await next();
  console.log('result: ' + result);
  console.log(2);
})

app.use((ctx, next) => {
  console.log(3);
  next();
  console.log(4);
  return 'hello';
})

// 访问端口
app.listen(3111);

