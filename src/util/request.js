// 引入axios
import axios from "axios"


// 因为有post请求
import qs from "qs"


// 响应拦截
axios.interceptors.response.use(res => {
  console.group("本次请求路径为=====>" + res.config.url);
  console.log(res);
  return res;
})


// 设置一个api变量，打包时要清空
const baseUrl = "/api";


// 菜单添加
export const reqMenuAdd = (params) => {
  return axios({
    url: baseUrl + "/api/menuadd",
    method: "post",
    data: qs.stringify(params)
  })
}


// 菜单列表
export const reqMenuList = (params) => {
  return axios({
    url: baseUrl + "/api/menulist",
    method: "get",
    params
  })
}

// 菜单获取数据
export const reqMenuDetail = (params) => {
  return axios({
    url: baseUrl + "/api/menuinfo",
    method: "get",
    params: params
  })
}

// 菜单修改
export const reqMenuUpdate = (params) => {
  return axios({
    url: baseUrl + "/api/menuedit",
    method: "post",
    data: qs.stringify(params)
  })
}


// 菜单删除
export const reqMenuDel = (params) => {
  return axios({
    url: baseUrl + "/api/menudelete",
    method: "post",
    data: qs.stringify(params)
  })
}


// ========================角色管理================================
// 角色添加
export const reqroleAdd = (params) => axios({
  url: baseUrl + "/api/roleadd",
  method: "post",
  data: qs.stringify(params)
})


// 角色列表  无参数
export const reqroleList = (params) => axios({
  url: baseUrl + "/api/rolelist",
  method: "get",
  params
})


// 角色获取  通过id 获取一条
export const reqroleInfo = (params) => axios({
  url: baseUrl + "/api/roleinfo",
  method: "get",
  params
})


// 角色修改
export const reqroleEdit = (params) => axios({
  url: baseUrl + "/api/roleedit",
  method: "post",
  data: qs.stringify(params)
})


// 角色删除
export const reqroleDel = (params) => axios({
  url: baseUrl + "/api/roledelete",
  method: "post",
  data: qs.stringify(params)
})


// ======================管理员管理============================

// 管理员添加
export const reqAdminAdd = (params) => axios({
  url: baseUrl + "/api/useradd",
  method: "post",
  data: qs.stringify(params)
})


// 管理员总数  (用于计算分页)
export const reqAdminCount = () => axios({
  url: baseUrl + "/api/usercount",
  method: "get",
})


// 管理员列表（分页）
export const reqAdminList = (params) => axios({
  url: baseUrl + "/api/userlist",
  method: "get",
  params
})


// 管理员 获取   （一条）
export const reqAdminInfo = (params) => axios({
  url: baseUrl + "/api/userinfo",
  method: "get",
  params
})


// 管理员修改
export const reqAdminEdit = (params) => axios({
  url: baseUrl + "/api/useredit",
  method: "post",
  data: qs.stringify(params)
})


// 管理员删除
export const reqAdminDel = (params) => axios({
  url: baseUrl + "/api/userdelete",
  method: "post",
  data: qs.stringify(params)
})


// 管理员登录
export const reqAdminLogin = (params) => axios({
  url: baseUrl + "/api/userlogin",
  method: "post",
  data: qs.stringify(params)
})

// ===================================会员列表-=====================


// 会员列表
export const reqMemberList = (params) => axios({
  url: baseUrl + "/api/memberlist",
  method: "GET",
  params
})


// 会员获取 一条
export const reqMemberInfo = (params) => axios({
  url: baseUrl + "/api/memberinfo",
  method: "GET",
  params
})

// 会员修改
export const reqMemberEdit = (params) => axios({
  url: baseUrl + "/api/memberedit",
  method: "post",
  data: qs.stringify(params)
})


// ===================================商品规格-=====================

// 商品规格添加
export const reqSpeciAdd = (params) => axios({
  url: baseUrl + "/api/specsadd",
  method: "post",
  data: qs.stringify(params)
})


// 商品规格总数（用于计算分页）
export const reqSpeciCount = (params) => axios({
  url: baseUrl + "/api/specscount",
  method: "get",
  params
})


// 商品规格列表（分页）
export const reqSpeciList = (params) => axios({
  url: baseUrl + "/api/specslist",
  method: "get",
  params
})

// 商品规格获取（一条）
export const reqSpeciInfo = (params) => axios({
  url: baseUrl + "/api/specsinfo",
  method: "get",
  params
})


// 商品规格修改
export const reqSpeciEdit = (params) => axios({
  url: baseUrl + "/api/specsedit",
  method: "post",
  data: qs.stringify(params)
})

// 商品规格删除
export const reqSpeciDel = (params) => axios({
  url: baseUrl + "/api/specsdelete",
  method: "post",
  data: qs.stringify(params)
})



// ===========================商品分类-====================
// 商品分类添加


export const reqCateAdd = ((params) => {
  var formData = new FormData();
  for (let i in params) {
    formData.append(i, params[i])
  }
  return axios({
    url: baseUrl + "/api/cateadd",
    method: "post",
    data: formData
  })
})

// 分类列表
export const reqCateList = params => axios({
  url: baseUrl + "/api/catelist",
  method: "get",
  params
})


// 商品分类获取一条
export const reqCateInfo = params => axios({
  url: baseUrl + "/api/cateinfo",
  method: "get",
  params
})



// .商品分类修改
export const reqCateEdit = ((params) => {
  var formData = new FormData();
  for (let i in params) {
    formData.append(i, params[i])
  }
  return axios({
    url: baseUrl + "/api/cateedit",
    method: "post",
    data: formData
  })
})


// .商品删除
export const reqCateDel = ((params) => {

  return axios({
    url: baseUrl + "/api/catedelete",
    method: "post",
    data: qs.stringify(params)
  })
})
