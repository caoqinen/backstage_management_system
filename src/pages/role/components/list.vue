<template>
  <el-table :data="rolelist" style="width: 100%">
    <el-table-column prop="id" label="角色编号" width="180"></el-table-column>
    <el-table-column prop="rolename" label="角色名称" width="180"></el-table-column>
    <el-table-column label="状态">
      <template slot-scope="scope">
        <el-button type="primary" v-if="scope.row.status===1">启 用</el-button>
        <el-button type="info" v-else>禁 用</el-button>
        <!-- <el-button>禁用</el-button> -->
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="primary" @click="edit(scope.row.id)">编 辑</el-button>
        <!-- 自己封装的删除按钮 -->
        <v-del-btn @confirm="del(scope.row.id)"></v-del-btn>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqroleDel } from "../../../util/request";
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
      rolelist: "role/rolelist",
    }),
  },
  //   方法
  methods: {
    ...mapActions({
      reqroleActions: "role/reqroleActions",
    }),
    // 点击编辑
    edit(id) {
      // 通知父级
      this.$emit("edit", id);
    },

    // 点击删除按钮
    del(id) {
      reqroleDel({ id: id }).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          // 调用函数，更新列表
          this.reqroleActions();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  //   挂载之后
  mounted() {
    //   进页面后请求一下列表  渲染页面
    this.reqroleActions();
  },
  //   卸载之前
  beforeDestroy() {},
};
</script>
<style scoped>
</style>