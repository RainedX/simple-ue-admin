const path = require('path')
const resolve = dirname => path.resolve(__dirname, dirname)

module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@libs', resolve('src/libs'))
      .set('@views', resolve('src/views'))
      .set('@components', resolve('src/components'))

    config.plugin('define').tap(args => {
      args[0]['process.env'].BASE_URL = JSON.stringify(process.env.BASE_URL)

      return args
    })
  },
  lintOnSave: false
}
