


module.exports = {
  publicPath: './',             // 根目录
  outputDir: './dist',           // 构建输出目录
  assetsDir: 'assets',         // 静态资源目目录
  lintOnSave: false,           // 是否开启eslint保存检测
  indexPath: 'index.html',     // 设置输出的首页的名字
  devServer: {
    open: false,             // 是否自动打开首页文件
    host: '0.0.0.0',   // 设置主机的地址
    port: '8080',           //端口
    disableHostCheck: true,
    // 配置跨域
  },

  


  




  // chainWebpack: config => {

  //   config.resolve.alias
  //     .set('@', resolve('src'))
  //     .set('config', resolve('config'))
  //   config.module
  //     .rule('css')
  //     .test(/\.scss$/)
  //     .oneOf('vue')
  //     .resourceQuery(/\?vue/)
  //     .use('px2rem')
  //     .loader('px2rem-loader')
  //     .options({
  //       remUnit: 75
  //     })
  // }

}