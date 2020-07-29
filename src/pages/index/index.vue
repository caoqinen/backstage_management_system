<template>
  <div>
    <el-container class="page">
      <el-aside width="200px">
        <!-- 导航开始 -->
        <!-- 
            router 路由模式
            index 是唯一标识，配置了路由，就改为自己的path
        -->
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#20222a"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
          :unique-opened="true"
        >
          <el-menu-item index="/home">
            <i class="el-icon-setting"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <template>
            <el-submenu :index="item.id+''" v-for="item in username.menus" :key="item.id">
              <template slot="title">
                <i v-if="item.icon" :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <template v-if="item.children">
                <el-menu-item :index="i.url" v-for="i in item.children" :key="i.id">{{i.title}}</el-menu-item>
              </template>
              <template v-else>
                <el-menu-item :index="item.url">{{item.title}}</el-menu-item>
              </template>
            </el-submenu>
          </template>
          <!-- 没有目录，只有菜单 v-if="!username.menus.children"-->
          <!-- <template v-if="!username.menus[0].children">
            
            <el-menu-item
              :index="item.url"
              v-for="item in username.menus"
              :key="item.id"
            >{{item.title}}</el-menu-item>
          </template>-->
        </el-menu>
        <!-- 导航结束 -->
      </el-aside>
      <el-container>
        <el-header>
          <div class="header-con">
            <span>{{username.username}}</span>
            <el-button type="primary" @click="$router.push('/login')">退出</el-button>
          </div>
        </el-header>
        <el-main>
          <!-- 面包屑导航 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <!--路由出口 -->
          <router-view class="pT"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  components: {},
  computed: {
    ...mapGetters({
      username: "login/username",
    }),

    // 判断有没有子集菜单，有就渲染，没有就直接渲染
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      reqAdminLoginActions: "login/reqAdminLoginActions",
    }),
  },
  mounted() {},
};
</script>
<style scoped>
.el-aside ::-webkit-scrollbar {
  /*隐藏滚轮*/
  display: none;
  /* width: 0; */
}
.el-menu {
  overflow-x: hidden;
  overflow-y: hidden;
}
.el-aside {
  background: #20222a;
}
.el-header {
  background: #b3c0d1;
  overflow: hidden;
}
.page {
  height: 100vh;
}
.header-con {
  float: right;
}
.header-con span {
  line-height: 60px;
  color: #ffffff;
}
.pT {
  padding-top: 20px;
}
</style>