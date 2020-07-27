import {
  reqCateList
} from "../../util/request";


const state = {
  cateList: []
}


const mutations = {
  changeCate(state, a) {
    state.cateList = a
  }
}


const actions = {
  reqCateListActions(context) {
    reqCateList({
      istree: true
    }).then(res => {
      context.commit("changeCate", res.data.list)
    })
  }
}


const getters = {
  cateList(state) {
    return state.cateList
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
