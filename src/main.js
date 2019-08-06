import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from '@/plugins/vuetify';

Vue.config.productionTip = false

Vue.filter('money', function (val) {
  if (!val) return '$0.00'
  return '$' + parseFloat(val).toFixed(2)
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
