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

          <!-- template   可以用来站位  循环最外侧  -->
          <template v-for="item in username.menus">
            <!-- 如果 里面有children  就走这一步 -->
            <el-submenu v-if="item.children" :index="item.id+''" :key="item.id">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item v-for="i in item.children" :index="i.url" :key="i.id">{{i.title}}</el-menu-item>
            </el-submenu>
            <!-- 下面没有children 就走这一步 -->
            <el-menu-item v-if="!item.children" :index="item.url" :key="item.id">{{item.title}}</el-menu-item>
          </template>
        </el-menu>
        <!-- 导航结束 -->
      </el-aside>
      <el-container>
        <el-header>
          <div class="header-con">
            <span>{{username.username}}</span>
            <el-button type="primary" @click="tuichu">退出</el-button>
          </div>
        </el-header>
        <el-main>
          <!-- 面包屑导航 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>

          <transition enter-active-class="animate__animated animate__rotateInDownLeft">
            <!-- animate__fadeInTopLeft -->
            <!--路由出口 -->
            <router-view class="pT"></router-view>
          </transition>
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
      reqAdminLoginActions: "login/changeAdmin",
    }),

    tuichu() {
      this.reqAdminLoginActions(null);
      this.$router.push("/login");
    },
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