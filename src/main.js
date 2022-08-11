import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

// 引入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 引入wangeditor样式
import '@wangeditor/editor/dist/css/style.css';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
