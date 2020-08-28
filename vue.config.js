module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    proxy: {
      '/proxy': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        // ws: true,
        pathRewrite: {
          '^/proxy': '/'
        }
      }
    },
    port: 8083

  }
}