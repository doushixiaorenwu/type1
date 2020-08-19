module.exports = {
  devServer: {
    // 自动打开浏览器
    open: true,
    port: 8080
  },
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components',
        content: 'components/content',
        common: 'components/common',
        assets: '@/assets',
        network: '@/network',
        views: '@/views'
      }
    }
  }
}
