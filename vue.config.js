module.exports = {
  devServer: {
    host: 'localhost',
    port: '3003',
    proxy: [{
      context: ['/api'],
      target: 'http://localhost:8008'
    }]
    // proxy: {
    //       ['/api']: {
    //         target: 'http://localhost:8000',
    //       }
    //
    // }
  },

  "transpileDependencies": [
    "vuetify"
  ]
}