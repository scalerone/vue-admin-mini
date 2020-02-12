import Vue from 'vue'
import DefaultLayout from "./layout/DefaultLayout";
import router from './router'
import './plugins/element.js'

import "@fortawesome/fontawesome-free/css/all.css"
// import api from './api' // 导入api接口

// Vue.prototype.$api = api; // 将api挂载到vue的原型上
//  用法:this.$api.networkCheck.queryNetworkInfo

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(DefaultLayout)
}).$mount('#app')
