import Vue from 'vue'
import Router from 'vue-router'

import Home from './components/Home'
import Products from './components/Products/Products'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/products',
      name: 'Products',
      component: Products
    },
    {
      path: '/products/:category',
      name: 'ProductsCategory',
      component: Products
    },
    {
      path: '/products/:category/:name',
      name: 'ProductsCategoryName',
      component: Products
    },
    {
      path: '/products/:name',
      name: 'ProductsName',
      component: Products
    }
  ]
})
