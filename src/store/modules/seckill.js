import {
  reqSeckillList
} from "../../util/request";


const state = {
  seckillList: []
}

const mutations = {
  changeList(state, a) {
    state.seckillList = a
  }
}

const actions = {
  reqSeckillListActions(context) {
    reqSeckillList().then(res => {
      context.commit("changeList", res.data.list)
    })
  }
}


const getters = {
  seckillList(state) {
    return state.seckillList
  }
}


export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
