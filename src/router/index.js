import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
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
          name: "菜单列表"
        },
        {
          path: "role",
          component: () => import("../pages/role/role.vue"),
          name: "角色列表"
        },
        {
          path: "manage",
          component: () => import("../pages/manage/manage.vue"),
          name: "管理员列表"
        },
        {
          path: "cate",
          component: () => import("../pages/cate/cate.vue"),
          name: "商品分类列表"
        },
        {
          path: "speci",
          component: () => import("../pages/speci/speci.vue"),
          name: "商品规格列表"
        },
        {
          path: "goods",
          component: () => import("../pages/goods/goods.vue"),
          name: "商品列表"
        },
        {
          path: "member",
          component: () => import("../pages/member/member.vue"),
          name: "会员列表"
        },
        {
          path: "banner",
          component: () => import("../pages/banner/banner.vue"),
          name: "轮播图管理"
        },
        {
          path: "seckill",
          component: () => import("../pages/seckill/seckill.vue"),
          name: "秒杀管理"
        },
        {
          path: "",
          redirect: "home"
        }
      ]
    },
  ]
})
