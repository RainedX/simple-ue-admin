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
          path: '/users',
          name: 'users',
          component: () => import(/* webpackChunkName: "user" */ '@views/user')
        },
        {
          path: '/roles',
          name: 'roles',
          component: () => import(/* webpackChunkName: "role" */ '@views/role')
        },
        {
          path: '/rights',
          name: 'rights',
          component: () => import(/* webpackChunkName: "right" */ '@views/right')
        },
        {
          path: '/orders',
          name: 'orders',
          component: () => import(/* webpackChunkName: "order" */ '@views/order')
        },
        {
          path: '/reports',
          name: 'reports',
          component: () => import(/* webpackChunkName: "report" */ '@views/report')
        },
        {
          path: '/goods',
          name: 'goods',
          component: () => import(/* webpackChunkName: "good" */ '@views/good')
        },
        {
          path: '/params',
          name: 'params',
          component: () => import(/* webpackChunkName: "param" */ '@views/param')
        },
        {
          path: '/categories',
          name: 'categories',
          component: () => import(/* webpackChunkName: "category" */ '@views/category')
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
