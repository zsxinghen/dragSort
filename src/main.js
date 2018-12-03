// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import 'url-search-params-polyfill' //兼容formData数据格式转化
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import i18n from './lang' // Internationalization
import Toast from './common/Toast'
import loading from './common/loading'
import './toolClass/directive.js';

// import axios from 'axios'
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.component('boardToast', Toast)
Vue.component('loading', loading);
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: {
    App
  }
})
//路由守卫
router.beforeEach((to, from, next) => { 
  store.commit('setCurrRouter', to.name==='layoutCenter'?2:1);//定位当前路由
  next();
})

// // http请求拦截器
// axios.interceptors.request.use(config => {
//   //开始请求(拦截开始)
//   app.store.commit('setLoading',true);
//   return config
// }, error => {
//   //加载超时
//   app.store.commit('setLoading',false);
//   return Promise.reject(error)
// })
// // http响应拦截器
// axios.interceptors.response.use(data => { // 响应成功关闭loading
//   //响应拦截
//   app.store.commit('setLoading',false);
//   return data
// }, error => {
//   app.store.commit('setLoading',false);
//   return Promise.reject(error)
// })
