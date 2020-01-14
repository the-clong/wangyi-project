const webpack = require('webpack')
const path = require('path')
// const zopfli = require("@gfx/zopfli");//zopfli压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin') // Gzip
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
const isProduction = process.env.NODE_ENV === 'production'
function resolve (dir) {
  // 路径可能与你的项目不同
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: '/', // 部署应用时的根路径(默认'/'),也可用相对路径(存在使用限制)
  outputDir: 'dist', // 运行时生成的生产环境构建文件的目录(默认''dist''，构建之前会被清除)
  assetsDir: 'static', // 放置生成的静态资源(s、css、img、fonts)的(相对于 outputDir 的)目录(默认'')
  indexPath: 'index.html', // 指定生成的 index.html 的输出路径(相对于 outputDir)也可以是一个绝对路径。
  // 参考https://www.cnblogs.com/axl234/p/6500534.html
  lintOnSave: process.env.NODE_ENV === 'development', // 是否在保存的时候检查eslint
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  css: {
    // 是否使用css分离插件
    extract: isProduction,
    // css预设器配置项
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-px-to-viewport')({
            unitToConvert: 'px',
            viewportWidth: 750,
            unitPrecision: 3,
            viewportUnit: 'vw',
            fontViewportUnit: 'vw',
            minPixelValue: 1,
            exclude: /(\/|\\)(node_modules)(\/|\\)/
          })
        ]
      }
    }
  },
  devServer: {
    port: 8008, // 端口号
    host: 'localhost',
    https: false, // https:{type:Boolean}
    open: false, // 配置自动启动浏览器
    disableHostCheck: true,
    // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
    proxy: {
      '/base-api': {
        target: 'https://www.runoob.com',
        changeOrigin: true,
        pathRewrite: {
          '^/base-api': ''   //相当于取代了项目名
        }
      },
      '/login-api': {
        target: process.env.VUE_APP_LOGIN_API,
        changeOrigin: true,
        pathRewrite: {
          '^/login-api': ''
        }
      }
    } // 配置多个代理
  },
  configureWebpack: (config) => {
    config.resolve.alias = {
      '@': resolve('src') // 将@路径写活，基于根路径
    };
    config.externals = {
      // 'echarts': 'echarts',
      'Swiper': 'Swiper'
    };
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'windows.jQuery': 'jquery',
        Popper: ['popper.js', 'default']
      })
    );
    if (isProduction) {
      config.plugins.push(
        new CompressionPlugin({
          algorithm: 'gzip',
          compressionOptions: {
            numiterations: 15
          },
          minRatio: 0.8,
          test: productionGzipExtensions
        })
      );
      // 警告 webpack 的性能提示
      config.performance = {
        hints: 'warning',
        // 入口起点的最大体积
        maxEntrypointSize: 50000000,
        // 生成文件的最大体积
        maxAssetSize: 30000000,
        // 只给出 js 文件的性能提示
        assetFilter: function (assetFilename) {
          return assetFilename.endsWith('.js')
        }
      }
      // 删除console插件
      config.optimization.minimizer.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              // warnings: false,
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['console.log']
            }
          },
          cache: true,
          sourceMap: false,
          parallel: true
        })
      )
    }
  },
  chainWebpack (config) {
    // config.resolve.symlinks(true);
    // config.plugins.delete('preload') // TODO: need test
    // config.plugins.delete('prefetch') // TODO: need test
    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end();

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      );

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end();
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                // elementUI: {
                //   name: 'chunk-elementUI', // split elementUI into a single package
                //   priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                //   test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                // },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            });
          config.optimization.runtimeChunk('single')
        }
      );
  }
};