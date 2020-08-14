import Vue from 'vue'
import VueRouter from 'vue-router'
import { checktoken } from '@/api/apis'

Vue.use(VueRouter)

let router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../pages/Login')
    },
    {
      path: '/main',
      name: '/main',
      component: () => import('../pages/Main'),
      children: [
        {
          path: '/main/personal',
          name: '/main/personal',
          component: () => import('../pages/main/Personal'),
          meta:{breadlist:["首页","个人中心"]}
        },
        {
          path: '/main/index',
          name: '/main/index',
          component: () => import('../pages/main/Index'),
          meta:{breadlist:["首页"]}
        },
        {
          path: '/main/order',
          name: '/main/order',
          component: () => import('../pages/main/Order'),
          meta:{breadlist:["订单管理"]}
        },
        {
          path: '/main/items',
          name: '/main/items',
          component: () => import('../pages/main/Items'),
          children: [
            {
              path: '/main/items/listitems',
              name: '/main/items/listitems',
              component: () => import('../pages/main/items/Listitems'),
              meta:{breadlist:["商品管理","商品列表"]}
            },
            {
              path: '/main/items/additems',
              name: '/main/items/additems',
              component: () => import('../pages/main/items/Additems'),
              meta:{breadlist:["商品管理","添加商品"]}
            },
            {
              path: '/main/items/classitems',
              name: '/main/items/classitems',
              component: () => import('../pages/main/items/Classitems'),
              meta:{breadlist:["商品管理","商品分类"]}
            }
          ]
        },
        {
          path: '/main/shop',
          name: '/main/shop',
          component: () => import('../pages/main/Shop'),
          meta:{breadlist:["店铺管理"]}
        },
        {
          path: '/main/account',
          name: '/main/account',
          component: () => import('../pages/main/Account'),
          children: [
            {
              path: '/main/account/listacc',
              name: '/main/account/listacc',
              component: () => import('../pages/main/account/Listacc'),
              meta:{breadlist:["账号管理","账号列表"]}
            },
            {
              path: '/main/account/addacc',
              name: '/main/account/addacc',
              component: () => import('../pages/main/account/Addacc'),
              meta:{breadlist:["账号管理","账号添加"]}
            },
            {
              path: '/main/account/changeacc',
              name: '/main/account/changeacc',
              component: () => import('../pages/main/account/Changeacc'),
              meta:{breadlist:["账号管理","修改密码"]}
            }
          ]
        },
        {
          path: '/main/sales',
          name: '/main/sales',
          component: () => import('../pages/main/Sales'),
          children: [
            {
              path: '/main/sales/itemsale',
              name: '/main/sales/itemsale',
              component: () => import('../pages/main/sales/Itemsale'),
              meta:{breadlist:["销售统计","商品统计"]}
            },
            {
              path: '/main/sales/ordersale',
              name: '/main/sales/ordersale',
              component: () => import('../pages/main/sales/Ordersale'),
              meta:{breadlist:["销售统计","订单统计"]}
            }
          ]
        }
      ]
    }
  ]
})

// 路由拦截
router.beforeEach((to, from,next) => {
  if (to.path != '/') {
    checktoken(localStorage.token).then(res => {
      if (res.data.code == 0) {
        next()
      } else {
        next('/')
      }
    })
  } else {
    next()
  }
})

export default router