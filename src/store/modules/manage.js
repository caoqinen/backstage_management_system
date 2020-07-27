// 引入 跨与文件
import {
  reqAdminList,
  reqAdminCount
} from "../../util/request";

// 状态
const state = {
  managelist: [],
  //   一页的数量
  size: 3,
  // 数据总和
  total: 0,

  //   页码
  page: 1
}


// mutations  修改状态
const mutations = {
  changeList(state, arr) {
    state.managelist = arr;
  },

  //   total 在数据请求后会被修改一下
  changeTotal(state, num) {
    state.total = num
  },

  //   一会调用方法，用来改变page
  changePage(state, num) {
    state.page = num
  }
}


// actions  用来对接页面的方法
const actions = {

  // 页面列表
  reqAdminListActions(context) {
    const params = {
      page: context.state.page,
      size: context.state.size
    }
    reqAdminList(params).then(res => {
      context.commit("changeList", res.data.list)
    })
  },

  //   获取数据总和
  reqAdminCountActions(context) {
    reqAdminCount().then(res => {
      context.commit("changeTotal", res.data.list[0].total)
    })
  },

  //   用来给组件的方法
  changePage(context, num) {
    context.commit("changePage", num)
  }

}


// getters  用于对接组件数据
const getters = {
  managelist(state) {
    return state.managelist
  },
  size(state) {
    return state.size
  },
  total(state) {
    return state.total
  }
}


export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
