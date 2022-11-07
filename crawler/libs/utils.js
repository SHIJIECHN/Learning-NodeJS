const cp = require('child_process'),
  { resolve } = require('path');

module.exports = {
  // 启动进程
  startProcess(options) {
    // 导入开始爬虫脚本
    const script = resolve(__dirname, options.path),
      // 子进程
      child = cp.fork(script, []);

    let invoked = false;

    child.on('message', (data) => {
      options.message(data);
    })

    child.on('exit', (code) => {
      if (invoked) return;

      invoked = true;
      options.exit(code);
    })

    child.on('error', (err) => {
      if (invoked) return;

      invoked = true;
      options.error(err);
    })
  }
}