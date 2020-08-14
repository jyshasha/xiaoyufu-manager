import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router/router'
import echarts from 'echarts'
import './assets/fonts/iconfont.css'

Vue.prototype.$echarts = echarts
Vue.prototype.$bus=new Vue()

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
