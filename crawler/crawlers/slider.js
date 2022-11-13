// 轮播图
const Crawler = require('../libs/crawler.js'),
  { crawler } = require('../config/config.js');

// libs/crawler.js 执行爬虫程序
// slider 配置参数
// 开启爬虫获取轮播图信息
Crawler({
  url: crawler.url.main,
  callback() {
    const $ = window.$,
      $item = $('.agency-big-banner-ul .agency-big-banner-li');

    let data = [];

    $item.each((index, item) => {
      const $el = $(item),
        $elLink = $el.find('.js-banner-btnqq');

      const dataItem = {
        cid: $elLink.attr('data-id'),
        href: $elLink.attr('href'),
        title: $elLink.prop('title'),
        imgUrl: $elLink.find('img').prop('src'),
        imgKey: ''
      }

      data.push(dataItem)
    })
    return data;
  }
})