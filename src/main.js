// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入 element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

// 引入重置样式表
import "./assets/css/reset.css"

// 处理公共组件
import commonComponents from "./components/index";
for (let i in commonComponents) {
  Vue.component(i, commonComponents[i])
}


// 处理公共过滤器
import filters from "./filters";
for (let i in filters) {
  Vue.filter(i, filter[i])
}

// 图片前缀
Vue.prototype.$prefixImg = "http://localhost:3000";


// 引入 vuex仓库
import store from "./store"





/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
