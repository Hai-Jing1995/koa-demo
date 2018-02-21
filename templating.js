/* 集成nunjucks, 给ctx绑定一个render函数 */

const nunjucks = require('nunjucks');

function createEnv(path, opts) {
  var
      autoescape = opts.autoescape === undefined ? true : opts.autoescape,
      throwOnUndefined = opts.throwOnUndefined || false,
      nocache = opts.nocache || false,
      watch = opts.watch || false,
      env = new nunjucks.Environment(
        new nunjucks.FileSystemLoader(path || 'views', {
          nocache: nocache,
          watch: watch
        }, {
          autoescape: autoescape,
          throwOnUndefined: throwOnUndefined
        })
      );

  if (opts.filters) {
    for (var f in opts.filters) {
      env.addFilters(f, opts.filters[f]);
    }
  }

  return env;
}

function templating(path, opts) {
  // 创建env对象
  var env = createEnv(path, opts);
  return async (ctx, next) => {
    // 给ctx添加render函数，生成模板
    ctx.render = function(view, model) {
      ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}));
      ctx.response.type = 'text/html';
    };

    await next();
  }
}

module.exports = templating;
