const state = {
  username: sessionStorage.getItem("username") ? JSON.parse(sessionStorage.getItem("username")) : null
}


const mutations = {
  changeName(state, name) {
    state.username = name
    // 把数据存储在sessionStorage  


    if (state.username) {
      sessionStorage.setItem("username", JSON.stringify(state.username))
    } else {
      sessionStorage.removeItem("username")
    }
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
