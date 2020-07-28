// 引入 Vue  Vuex
import Vue from "vue";
import Vuex from "vuex"
Vue.use(Vuex)


// 引入actions 文件
import actions from "./actions"

// 引入mutations  
import {
  state,
  mutations,
  getters
} from "./mutations"


import menu from "./modules/menu"

import role from "./modules/role"

import manage from "./modules/manage"

import login from "./modules/login"

import member from "./modules/member"

import spec from "./modules/spec"

import cate from "./modules/cate"

import banner from "./modules/banner"

import goods from "./modules/goods"


// 创建仓库，并暴露出去，  main.js 需要接收
export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules: {
    menu,
    role,
    manage,
    login,
    member,
    spec,
    cate,
    banner,
    goods
  }
})
