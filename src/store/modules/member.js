import {
  reqMemberList
} from "../../util/request"

const state = {
  menberList: []
}

const mutations = {
  changeList(state, list) {
    state.menberList = list
  }
}

const actions = {
  reqreqMemberListActions(context) {
    reqMemberList().then(res => {
      context.commit("changeList", res.data.list)
    })
  }
}


const getters = {
  memberList(state) {
    return state.menberList
  }
}


export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
