const router = require('koa-router')(),
  crawlerController = require('../controllors/Crawler.js')
// child_process 启动一个子进程
cp = require('child_process'),
  { resolve } = require('path');

// 前缀
router.prefix('/crawler');


router.get('/crawl_slider_data', crawlerController.crawlSiderData);
/**
async (ctx, next) => {
  //启动一个子进程，执行脚本crawler.js 执行的结果交给data
  // 导入脚本
  const script = resolve(__dirname, '../puppeteer/crawler.js'),
    // 启动子进程 cp去执行script
    child = cp.fork(script, []);

  // flag 是否被调用
  let invoked = false;
  // 返回的数据 data。通过监听message事件，监听到发送消息的结果
  child.on('message', (data) => {
    console.log(data)
  })

  // 退出
  child.on('exti', (code) => {
    // 被调用过
    if (invoked) return;

    // 没有被调用过
    invoked = true;
    console.log(code);
  })

  // 错误
  child.on('error', (err) => {
    if (invoked) return;
    invoked = true;
    console.log(err);
  })
});
 */


module.exports = router;
