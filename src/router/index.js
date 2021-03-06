import Vue from 'vue'
import Router from 'vue-router'

import Login from '../components/login.vue'
import NotFound from '../components/404.vue'
import Home from '../components/Home.vue'
import Table from '../components/nav1/table.vue'
import Form from '../components/nav1/form.vue'
import user from '../components/nav1/user.vue'
import Page4 from '../components/nav2/page4.vue'
import Page5 from '../components/nav2/page5.vue'
import Page6 from '../components/nav3/page6.vue'
import echarts from '../components/echarts/echarts.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: Login,
      name: '',
      hidden: true,
    },
    {
      path: '/404',
      component: NotFound,
      name: '',
      hidden: true
    },
    {
      path:'/',
      component:Home,
      name:'导航一',
      iconCls: 'el-icon-message',//图标样式class
      children:[
        { path: '/table', component: Table, name: 'Table' },
        { path: '/form', component: Form, name: 'Form' },
        { path: '/data', component: user, name: '列表' },
      ]
    },
    {
      path: '/',
      component: Home,
      name: '导航二',
      iconCls: 'fa fa-id-card-o',
      children: [
        { path: '/page4', component: Page4, name: '页面4' },
        { path: '/page5', component: Page5, name: '页面5' }
      ]
    },
    {
      path:'/',
      component:Home,
      name:'',
      iconCls: 'fa fa-address-card',
      leaf:true,//只有一个节点
      children:[
        { path: '/page6', component: Page6, name: '导航三' }
      ]

    },
    {
      path: '/',
      component: Home,
      name: 'Charts',
      iconCls: 'fa fa-bar-chart',
      children: [
        { path: '/echarts', component: echarts, name: 'echarts' }
      ]
    },
    {
      path:'/',
      hidden:true,
      redirect:{path:'/404'}
    }

  ]
})
