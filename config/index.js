// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/pcshop/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist/pcshop'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/pcshop/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    host:'192.168.0.111',
    port: 8081,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    // context: [ //代理路径
    //   '/users'
    // ],
    // proxypath: 'https://api.github.com',
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
    proxyTable: {
      '/apiH': {
        // target: 'http://122.144.131.19:8089/',//本地调试
        // target: 'http://192.168.0.60:8089/',//本地调试
        // target: 'http://192.168.10.3:8089/',//正式环境
        target: 'http://192.168.10.101:8089/',//测试环境
        // target: 'http://192.168.10.101:8088/',//试用环境
        changeOrigin: true,
        pathRewrite: {
          //获取列表
          '^/apiH': ''
        }
      },
      '/apiG': {
        // target: 'http://192.168.10.20:8765/',//正式环境
        target: 'http://192.168.10.102:8765/',//测试环境
        // target: 'http://api.xiaoboli.com:8766/',//开发环境
        // target: 'http://192.168.10.102:8768/',//试用环境
        changeOrigin: true,
        pathRewrite: {
          //获取列表
          '^/apiG': ''
        }
      },
      '/apiTXD': {
        target: 'http://192.168.0.242:8766/',//测试环境
        changeOrigin: true,
        pathRewrite: {
          //获取列表
          '^/apiTXD': ''
        }
      },
      // '/apiS': {
      //   target: 'http://192.168.0.152:8089/',
      //   pathRewrite: {
      //     //获取列表
      //     '^/apiS': ''
      //   }
      // },
      '/apiT': {
        target: 'http://192.168.0.152:15688/',
        changeOrigin: true,
        pathRewrite: {
          //获取列表
          '^/apiT': ''
        }
      },
    }
  }
}

