import {
  reqBannerList
} from "../../util/request"


const state = {
  bannerList: []
}


const mutations = {
  changeList(state, a) {
    state.bannerList = a
  }
}


const actions = {
  reqBannerListActions(context) {
    reqBannerList().then(res => {
      context.commit("changeList", res.data.list)
    })
  }
}


const getters = {
  bannerList(state) {
    return state.bannerList
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
