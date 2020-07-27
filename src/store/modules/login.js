const state = {
  username: "",
}


const mutations = {
  changeName(state, name) {
    state.username = name
  },

}

const actions = {
  changeAdmin(context, name) {
    context.commit("changeName", name)
  }

}

const getters = {
  username(state) {
    return state.username
  },

}


export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
