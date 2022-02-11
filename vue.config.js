const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)
const debug = process.env.NODE_ENV !== 'production'

module.exports = {
  configureWebpack: (config) => {
    if (debug) {
      // 开发环境配置
      config.devtool = 'source-map'
    }
  },
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  runtimeCompiler: true,
  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolve('src'))
  },
  // 设置代理
  devServer: {
    // proxy: {
    //   '/api': {
    //     target: 'http://101.35.139.239:18201',
    //     // ws: true,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
  }
}
