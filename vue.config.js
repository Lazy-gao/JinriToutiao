module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'api': '@/api',
        'assets': '@/assets',
        'components': '@/components',
        'network': '@/network',
        'plugins': '@/plugins',
        'router': '@/router',
        'store': '@/store',
        'styles': '@/styles',
        'utils': '@/utils',
        'views': '@/views',
      }
    }
  }
}
