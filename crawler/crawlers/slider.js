const crawler = require('../libs/crawler.js');

// slider 配置参数
crawler({
  url: 'https://ke.qq.com/cgi-bin/agency?aid=64228#category=-1&tab=0',
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
        imgUrl: $elLink.find('img').prop('src')
      }

      data.push(dataItem)
    })
    return data;
  }
})