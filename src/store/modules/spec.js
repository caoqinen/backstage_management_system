import {
  reqSpeciList,
  reqSpeciCount
} from "../../util/request";


const state = {
  specList: [],
  //   一页的数量
  size: 2,
  //   总数
  total: 0,
  //  页码
  page: 1
}

const mutations = {
  changeList(state, list) {
    state.specList = list
  },
  //   一会用来改变总数
  changeTotal(state, tot) {
    state.total = tot
  },
  //   用来改变page
  changePages(state, page) {
    state.page = page
  }

}


const actions = {
  reqSpeciListActions(context) {
    const params = {
      page: context.state.page,
      size: context.state.size
    }
    reqSpeciList(params).then(res => {
      if (res.data.list.length == 0 && context.state.page > 1) {
        context.commit("changePages", context.state.page - 1);

        context.dispatch("reqSpeciListActions");
        return;
      }
      context.commit("changeList", res.data.list);
    })
  },
  //   请求总和的
  reqSpeciCountActions(context) {
    reqSpeciCount().then(res => {
      context.commit("changeTotal", res.data.list[0].total)
    })
  },
  //   等待传过来的值用来，改变上面
  gbActions(context, pages) {
    context.commit("changePages", pages)
  }
}


const getters = {
  specList(state) {
    return state.specList
  },
  total(state) {
    return state.total
  },
  page(state) {
    return state.page
  },
  size(state) {
    return state.size
  }
}


export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
