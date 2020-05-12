import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'           //首页
import Login from './views/Login.vue'         // 登录
import Register from './views/Register.vue'  // 注册

// 菜单
import Menu from './views/menu/Menu.vue'
// 菜单子路由
import Hot from './views/menu/Hot.vue'        // 热菜
import Soup from './views/menu/Soup.vue'      // 汤类
import Cold from './views/menu/Cold.vue'      // 凉菜
import Drinks from './views/menu/Drinks.vue'  // 饮料
import Slse from './views/menu/Slse.vue'      // 其他

//订单
import Order from './views/Order.vue'
// 管理
import Admin from './views/Admin.vue'
// 关于
import About from './views/about/About.vue'
// 关于子路由
import Contact from './views/about/Contact.vue'   // 联系我
import Intro from './views/about/Intro.vue'       // 个人简介

Vue.use(Router)

export default new Router({
  mode: "hash",
  linkActiveClass: 'active',
  base: process.env.BASE_URL,

  routes: [
    // 首页
    {
      path: '/',
      name: 'home',
      component: Home
    },
    // 登录
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    // 注册
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    // 菜单
    {
      path: '/menu',
      name: 'menu',
      component: Menu,
      children: [
        //热菜
        {
          path: '/menu/hot',
          name: 'hot',
          component: Hot
        },
        //汤类
        {
          path: '/menu/soup',
          name: 'soup',
          component: Soup
        },
        //凉菜
        {
          path: '/menu/cold',
          name: 'cold',
          component: Cold
        },
        //饮料
        {
          path: '/menu/drinks',
          name: 'drinks',
          component: Drinks
        },
        //其他
        {
          path: '/menu/slse',
          name: 'slse',
          component: Slse
        }
      ]
    },
    // 订单
    {
      path: '/order',
      name: 'order',
      component: Order,
      beforeEnter(to, from, next) {
        if (localStorage.getItem('IsLogin') === 'true') {
          next()
        } else {
          alert('没有登录，请登录')
          next('/login')
        }
      }
    },
    // 管理
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      beforeEnter(to, from, next) {
        if (localStorage.getItem('IsLogin') === 'true') {
          next()
        } else {
          alert('没有登录，请登录')
          next('/login')
        }
        
      }
    },
    // 关于
    {
      path: '/about',
      name: 'about',
      component: About,
      children: [
        {
          path: '/about/contact',
          name: 'contact',
          component: Contact
        },
        {
          path: '/about/intro',
          name: 'intro',
          component: Intro
        }
      ]
    },
  ]
})
