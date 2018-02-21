module.exports = {
  'POST /signin': async(ctx, next) => {
    var email = ctx.request.body.email || '',
        password = ctx.request.body.password || '';
    if (email === 'hhh@qq.com' && password === '123456') {
      ctx.render('signin-ok.html', {
        title: 'Hello',
        name: email
      });
    } else {
      ctx.render('signin-failed.html', {
        title: 'Sign In Failed'
      });
    }
  }
};
