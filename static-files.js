/* 处理静态资源的中间件 */
const fs = require('mz/fs');
const mime = require('mime');
const path = require('path');

// url: 类似/static/
// dir: 类似__dirname + '/static'
function staticFiles(url, dir) {
  return async(ctx, next) => {
    let rpath = ctx.request.path

    // 判断请求的是否是静态资源
    if (rpath.startsWith(url)) {
      // 拼接静态资源的完整路径
      let fp = path.join(dir, rpath.substring(url.length));
      // 判断文件是否存在
      if (await fs.exists(fp)) {
        // 查询文件的mime类型
        ctx.response.type = mime.getType(rpath);
        // 读取文件内容
        ctx.response.body = await fs.readFile(fp);
      } else {
        ctx.response.status = 404;
      }
    } else {
      // 请求的资源不是静态资源，处理权交给下一个中间件
      await next();
    }
  }
}

module.exports = staticFiles;
