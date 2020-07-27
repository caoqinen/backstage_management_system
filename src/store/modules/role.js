import {
  reqroleList
} from "../../util/request"

// 状态
const state = {
  //列表数据
  rolelist: []
}


// mutation
const mutations = {
  changeList(state, arr) {
    state.rolelist = arr;
  }
}


// actions
const actions = {
  reqroleActions(context) {
    reqroleList().then(res => {
      context.commit('changeList', res.data.list)
    })
  }
}

const getters = {
  rolelist(state) {
    return state.rolelist
  }
}


export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
