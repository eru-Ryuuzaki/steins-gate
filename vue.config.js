const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  runtimeCompiler: true,
  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolve('src'))
  }
}
