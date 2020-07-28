import {
  reqGoodsList,
  reqGoodsCount
} from "../../util/request";


const state = {
  goodsList: [],
  // 总数
  total: 0,
  // 当前页
  page: 1,
  // 一页有多少数据
  size: 2
}

const mutations = {
  changeList(state, a) {
    state.goodsList = a
  },


  changeTotal(state, total) {
    state.total = total
  },

  changePage(state, page) {
    state.page = page
  }
}


const actions = {
  reqGoodsListActions(context) {
    const params = {
      size: context.state.size,
      page: context.state.page
    }
    reqGoodsList(params).then(res => {

      //没有取到数据
      if (!res.data.list && res.data.list.length == 0 && context.state.page > 1) {
        context.commit("changePage", context.state.page - 1);
        context.dispatch("reqGoodsListActions")
        return;
      }
      context.commit("changeList", res.data.list)
    })
  },


  // 获取总和
  reqGoodsCountActions(context) {
    reqGoodsCount().then(res => {

      context.commit("changeTotal", res.data.list[0].total)
    })
  },


  changePageActions(context, p) {
    context.commit("changePage", p)
  }
}


const getters = {
  goodsList(state) {
    return state.goodsList
  },

  total(state) {
    return state.total
  },

  size(state) {
    return state.size
  }

}


export default {
  state,
  mutations,
  getters,
  actions,
  namespaced: true
}
