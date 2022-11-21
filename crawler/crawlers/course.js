// 全部课程
const Crawler = require('../libs/crawler.js'),
  { crawler } = require('../config/config.js');

Crawler({
  url: crawler.url.course,
  callback() {
    const $ = window.$,
      $item = $('.course-card-list-multi-wrap .course-card-item');

    const data = [];
    $item.each((index, item) => {
      const $el = $(item),
        $itemLink = $el.find('.item-img-link');

      const dataItem = {
        cid: $itemLink.attr('data-id'),
        href: $itemLink.prop('href'),
        posterUrl: $itemLink.find('.item-img').prop('src'),
        courseName: $itemLink.find('.item-img').prop('title'),
        price: $el.find('.item-price').text() == '免费' ? '0' : $el.find('.item-price').text().slice(1),
        description: $el.find('.item-status-step').text(),
        studentCount: parseInt($el.find('.item-user').text()),
        field: -1,
        posterKey: ''
      }

      data.push(dataItem);
    })
    return data;
  }
})