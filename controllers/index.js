/* ctx中没有ctx.render，是templating.js中的中间件 */

module.exports = {
  'GET /': async(ctx, next) => {
    ctx.render('index.html', {
      title: 'welcome'
    })
  }
}
