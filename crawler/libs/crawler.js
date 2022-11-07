const pt = require('puppeteer');

/**
 * 开始爬虫配置，包括爬取的网页url、分析页面回调、发送数据结果
 * @param {*} options 
 */
module.exports = async function (options) {
  const bs = await pt.launch(),
    pg = await bs.newPage(),
    url = options.url;

  await pg.goto(url, {
    waitUtil: 'networkidle2'
  })

  const result = await pg.evaluate(options.callback);

  await bs.close();

  process.send(result);

  setTimeout(() => {
    process.exit(0);
  }, 1000)
}