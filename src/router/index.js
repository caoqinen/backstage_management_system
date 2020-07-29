import Vue from 'vue'
import Router from 'vue-router'

import store from "../store/index"
Vue.use(Router)


// 路由独享守卫  封装函数
function havePower(url) {
  return store.state.login.username.menus_url.some(item => item == url)
}

let router = new Router({
  routes: [{
      path: "/login",
      component: () => import("../pages/login/login.vue")
    },
    {
      path: "/",
      component: () => import("../pages/index/index.vue"),
      children: [{
          path: 'home',
          component: () => import("../pages/home/home"),
          name: "首页"

        },
        {
          path: "menu",
          component: () => import("../pages/menu/menu.vue"),
          name: "菜单列表",
          beforeEnter(to, from, next) {
            havePower("/menu") ? next() : next("/home")
          }
        },
        {
          path: "role",
          component: () => import("../pages/role/role.vue"),
          name: "角色列表",
          beforeEnter(to, from, next) {
            havePower("/role") ? next() : next("/home")
          }
        },
        {
          path: "manage",
          component: () => import("../pages/manage/manage.vue"),
          name: "管理员列表",
          beforeEnter(to, from, next) {
            havePower("/manage") ? next() : next("/home")
          }
        },
        {
          path: "cate",
          component: () => import("../pages/cate/cate.vue"),
          name: "商品分类列表",
          beforeEnter(to, from, next) {
            havePower("/cate") ? next() : next("/home")
          }
        },
        {
          path: "speci",
          component: () => import("../pages/speci/speci.vue"),
          name: "商品规格列表",
          beforeEnter(to, from, next) {
            havePower("/speci") ? next() : next("/home")
          }
        },
        {
          path: "goods",
          component: () => import("../pages/goods/goods.vue"),
          name: "商品列表",
          beforeEnter(to, from, next) {
            havePower("/goods") ? next() : next("/home")
          }
        },
        {
          path: "member",
          component: () => import("../pages/member/member.vue"),
          name: "会员列表",
          beforeEnter(to, from, next) {
            havePower("/member") ? next() : next("/home")
          }
        },
        {
          path: "banner",
          component: () => import("../pages/banner/banner.vue"),
          name: "轮播图管理",
          beforeEnter(to, from, next) {
            havePower("/banner") ? next() : next("/home")
          }
        },
        {
          path: "seckill",
          component: () => import("../pages/seckill/seckill.vue"),
          name: "秒杀管理",
          beforeEnter(to, from, next) {
            havePower("/seckill") ? next() : next("/home")
          }
        },
        {
          path: "",
          redirect: "home"
        }
      ]
    },
  ]
})


// 登录拦截
router.beforeEach((to, from, next) => {
  // 如果是前往登录页  直接next
  if (to.path === "/login") {
    next();
    return;
  }

  // 如果去的不是登录  就先判断 vuex中的有没有值，如果有 就next  否则  就去登录页面
  if (store.state.login.username) {
    next();
    return;
  } else {
    next('/login')
  }
})


export default router
