// 优秀学员
const Crawler = require('../libs/crawler.js'),
  { crawler } = require('../config/config.js');

Crawler({
  url: crawler.url.main,
  callback() {
    const $ = window.$,
      $item = $('.stu');

    const data = [];

    $item.each((index, item) => {
      const $el = $(item);

      const dataItem = {
        sid: index + 1,
        studentImg: $el.find('.stu-img').prop('src'),
        studentName: $el.find('.stu-img').prop('alt'),
        intro: $el.find('.stu-main-cnt ').text().trim(), // 去掉空格
        courseName: $el.find('.stu-main-tit').prop('title'),
        courseLink: $el.find('.stu-main-tit').prop('href'),
        studentImgKey: ''
      }

      data.push(dataItem);
    })

    return data;
  }
})