// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import vuex from 'vuex'
import 'font-awesome/css/font-awesome.min.css'
import Mock from './mock'

Mock.bootstrap();

Vue.use(ElementUI, vuex)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  let user =JSON.parse(sessionStorage.getItem('user'))
  if(!user && to.path !='/login'){
    next({path:'/login'})
  }else{
    next()
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
