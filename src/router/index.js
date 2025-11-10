// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/login/Login.vue'
import TestPage from '@/views/testpage/TestPage.vue'
import Transction from '@/views/Transaction.vue'
import Setting from '@/views/Setting.vue'
import Stock from '@/views/Stock.vue'
// 如果还没有Analytics组件，先注释掉或创建它
// import Analytics from '@/views/Analytics.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/testpage',
    name: 'TestPage',
    component: TestPage
  },
  {
    path: '/transction',
    name: 'Transction',
    component: Transction
  },
  {
    path: '/stock',
    name: 'Stock',
    component: Stock
  },
  {
    path: '/setting',
    name: 'Setting',
    component: Setting
  },
  // 暂时注释掉Analytics路由，等创建后再启用
  // {
  //   path: '/analytics',
  //   name: 'Analytics',
  //   component: Analytics
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router