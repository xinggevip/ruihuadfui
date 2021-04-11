
module.exports = {

  devServer: {
    port: 8083,
    proxy: {
      '/api': {
        // target: 'http://shitz.cn:8181',
        target: 'http://47.102.220.144:8181',

        ws: true,
        changeOrigin: true,
        // pathRewrite: {
        //   '^/api': ''//需要重写的
        // }
      }
    }
  }
}