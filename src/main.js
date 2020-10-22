import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import lodash from './plugins/lodash';
import axios from './plugins/axios'
import moment from './plugins/moment'

Vue.config.productionTip = false

Vue.use(lodash)
Vue.use(axios)
Vue.use(moment)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
