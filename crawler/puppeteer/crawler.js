// const pt = require('puppeteer'); // 引入puppeteer

// ; (async () => {
//   // browser 发起启动puppeteer。这是异步的过程。其实是个浏览器。
//   const bs = await pt.launch(),
//     // 爬取的页面url
//     url = 'https://ke.qq.com/cgi-bin/agency?aid=64228#category=-1&tab=0',
//     // 在browser里面启动一个页面
//     pg = await bs.newPage();

//   // 等待新的页面去开url这个页面，需要配置
//   await pg.goto(url, {
//     // 超时。有可能网站打不开，如果打不开抛出错误
//     timeout: 30 * 1000,
//     // 什么时候代表完成呢？官方推荐networkidle2。意思是500ms以后网站没有发起连接了，说明爬取完成。
//     waitUtil: 'networkidle2'
//   });

//   // 分析页面。返回一个结果，通过pg.evaluate(()=>{})里面是函数，在函数内部的环境实际上就是页面的环境，
//   const result = await pg.evaluate(() => {
//     // 查看是否有jQuery。获取页面jQuery $保存
//     const $ = window.$,
//       // 保存item。每一张图片item
//       $item = $('.agency-big-banner-ul .agency-big-banner-li');

//     let data = [];

//     $item.each((index, item) => {
//       // 每一个item
//       const $el = $(item),
//         // 拿到 a 标签
//         $elLink = $el.find('.js-banner-btnqq');

//       // 组装数据
//       const dataItem = {
//         // a 标签的dat-id
//         cid: $elLink.attr('data-id'),
//         // a标签的href
//         href: $elLink.prop('href'),
//         // a标签下的img标签
//         imgUrl: $elLink.find('img').prop('src'),
//         // a标签的title
//         title: $elLink.prop('title')
//       }

//       data.push(dataItem)
//     })

//     return data;
//   })

//   // 关闭浏览器
//   await bs.close();

//   // 浏览器关闭说明爬虫结束
//   // 子进程发送数据标准格式
//   process.send(result);
//   // 进程关闭
//   setTimeout(() => {
//     process.exit(0);
//   });

// })();