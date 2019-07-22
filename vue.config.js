module.exports = {
  devServer: {
    port: 8088, // 端口号
    host: "localhost",
    https: false, // https:{type:Boolean}
    open: false, //配置自动启动浏览器
    // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
    proxy: {
      "/api": {
        target: "<url>",
        ws: true,
        changeOrigin: true
      }
    } // 配置多个代理
  },
  // lintOnSave: false // 关闭eslint代码检查
};