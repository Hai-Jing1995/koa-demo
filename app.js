const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

const templating = require('./templating');

const app = new Koa();

const isProduction = process.env.NODE_ENV === 'production';

// 记录URl执行时间
app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}`);
  var
      start = new Date().getTime(),
      execTime;
  await next();
  execTime = new Date().getTime() - start;
  ctx.response.set('X-Response-Time',`${execTime}ms`);
})

// 静态资源中间件
if (!isProduction) {
  let staticFiles = require('./static-files');
  app.use(staticFiles('/static/', __dirname + '/static'));
}

// 解析post请求
app.use(bodyParser());

// 集成nunjucks中间件
app.use(templating('views', {
  nocache: !isProduction,
  watch: !isProduction
}))

// 处理url路由中间件
app.use(controller());

app.listen(3000);
