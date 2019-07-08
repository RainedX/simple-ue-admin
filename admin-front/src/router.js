import Vue from 'vue'
import Router from 'vue-router'
import Home from '@views/home'
import { getLocal } from '@libs/local'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/userList',
          name: 'userList',
          component: () => import(/* webpackChunkName: "login" */ '@views/userList')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '@views/login')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !getLocal('token')) {
    next({
      path: '/login'
    })
    return
  }
  next()
})

export default router
