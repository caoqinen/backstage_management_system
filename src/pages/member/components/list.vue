<template>
  <el-table :data="memberList" style="width: 100%">
    <el-table-column prop="id" label="用户编号" width="180"></el-table-column>
    <el-table-column prop="nickname" label="昵称" width="180"></el-table-column>
    <el-table-column prop="phone" label="手机号"></el-table-column>
    <el-table-column label="状态">
      <template slot-scope="scope">
        <el-button type="primary" v-if="scope.row.status===1">启 用</el-button>
        <el-button type="info" v-else>禁 用</el-button>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="primary" @click="edit(scope.row.uid)">编 辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
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
      memberList: "member/memberList",
    }),
  },
  //   方法
  methods: {
    edit(id) {
      // 通知父级，并且传一个id
      this.$emit("edit", id);
    },
    ...mapActions({
      reqreqMemberListActions: "member/reqreqMemberListActions",
    }),
  },
  //   挂载之后
  mounted() {
    //  一进页面请求数据就渲染
    this.reqreqMemberListActions();
  },
  //   卸载之前
  beforeDestroy() {},
};
</script>
<style scoped>
</style>