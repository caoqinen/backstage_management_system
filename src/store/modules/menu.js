import {
  reqMenuList
} from "../../util/request"

// 用来存放菜单的状态
const state = {
  // 列表数据   
  list: []
}


// 用来修改状态
const mutations = {
  changeList(state, arr) {
    state.list = arr
  }
}

// 来对接页面的方法
const actions = {
  reqMenuListActions(context) {
    reqMenuList({
      istree: true
    }).then(res => {
      context.commit('changeList', res.data.list)
    })
  }
}


// 用来导出状态，共组件使用
const getters = {
  list(state) {
    return state.list
  }
}


export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
