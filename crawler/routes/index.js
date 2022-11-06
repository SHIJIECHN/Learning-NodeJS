var router = require('koa-router')(),
  pt = require('puppeteer'); // 引入puppeteer

router.get('/', async (ctx, next) => {
  // browser 发起启动puppeteer。这是异步的过程。其实是个浏览器。
  const bs = await pt.launch(),
    // 爬取的页面url
    url = 'https://ke.qq.com/cgi-bin/agency?aid=64228#category=-1&tab=0',
    // 在browser里面启动一个页面
    pg = await bs.newPage();

  // 等待新的页面去开url这个页面，需要配置
  await pg.goto(url, {
    // 超时。有可能网站打不开，如果打不开抛出错误
    timeout: 30 * 1000,
    // 什么时候代表完成呢？官方推荐networkidle2。意思是500ms以后网站没有发起连接了，说明爬取完成。
    waitUtil: 'networkidle2'
  });

  // 分析页面。返回一个结果，通过pg.evaluate(()=>{})里面是函数，在函数内部的环境实际上就是页面的环境，
  const result = await pg.evaluate(() => {
    // 查看是否有jQuery。获取页面jQuery $保存
    const $ = window.$,
      // 保存item。每一张图片item
      $item = $('.agency-big-banner-ul .agency-big-banner-li');

    let data = [];

    $item.each((index, item) => {
      const $el = $(item),
        $elLink = $el.find('.js-banner-btnqq');

      const dataItem = {
        cid: $elLink.attr('data-id'),
        href: $elLink.prop('href'),
        imgUrl: $elLink.find('img').prop('src'),
        title: $elLink.prop('title')
      }


      data.push(dataItem)
    })

    return data;
  })
  console.log(result)

  await bs.close();
});

module.exports = router;
