// 机构信息
const Crawler = require('../libs/crawler.js'),
  { crawler } = require('../config/config.js');

// 开启爬虫获取机构信息
Crawler({
  url: crawler.url.main, // 需要爬取的页面url
  callback() { // 需要获取哪些数据，回调操作
    const $ = window.$,
      $section = $('.agency-head');

    return {
      logoUrl: $section.find('.agency-head-logo').prop('src'),
      name: $section.find('.ag-title-main').text(),
      feedbackRate: $section.find('.ag-info span').eq(0).text().replace(/[^0-9]/ig, ''),
      studentCount: $section.find('.js-item-num').attr('data-num'),
      description: $section.find('.ag-info-des').text(),
      qqLink: $section.find('.ag-info-btn').prop('href'),
      logoKey: ''
    }
  }
})