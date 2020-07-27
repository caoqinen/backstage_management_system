<template>
  <div>
    <el-table :data="manageList" style="width: 100%">
      <el-table-column prop="id" label="用户编号" width="180"></el-table-column>
      <el-table-column prop="username" label="用户名" width="180"></el-table-column>
      <el-table-column prop="rolename" label="所属角色"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启 用</el-button>
          <el-button type="info" v-else disabled>禁 用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编 辑</el-button>
          <v-del-btn @confirm="del(scope.row.uid)"></v-del-btn>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="cPage"
      :page-size="size"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqAdminDel } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  // 数据
  data() {
    return {};
  },
  //   注册
  components: {},
  //计算属性
  computed: {
    ...mapGetters({
      manageList: "manage/managelist",
      total: "manage/total",
      size: "manage/size",
    }),
  },
  //   方法
  methods: {
    ...mapActions({
      // reqManageActions------调用列表的数据
      reqManageActions: "manage/reqAdminListActions",
      reqAdminCountActions: "manage/reqAdminCountActions",
      changePage: "manage/changePage",
    }),
    edit(id) {
      // console.log(id);
      this.$emit("edit", id);
    },

    del(id) {
      // console.log(id);
      reqAdminDel({ uid: id }).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);

          // 再次调用 vux里面的渲染页面的函数
          this.reqManageActions();

          this.reqAdminCountActions();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    cPage(a) {
      // a-----表示页码
      this.changePage(a);
      // 点击下一页后再次刷新列表
      this.reqManageActions();
    },
  },
  //   挂载之后
  mounted() {
    this.reqManageActions();
    // 总和
    this.reqAdminCountActions();
  },
  //   卸载之前
  beforeDestroy() {},
};
</script>
<style scoped>
</style>