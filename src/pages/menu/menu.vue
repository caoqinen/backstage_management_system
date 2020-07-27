<template>
  <div class="wrap">
    <el-button type="primary" @click="add">添加</el-button>

    <!-- 弹框 -->
    <v-add :info="info" ref="add"></v-add>

    <!-- 表格 -->
    <v-list @edit="edit"></v-list>
  </div>
</template>
<script>
import vList from "./components/list";
import vAdd from "./components/add";
export default {
  components: { vList, vAdd },
  data() {
    return {
      // 弹窗的状态

      info: {
        show: false,
        title: "菜单添加",
        isAdd: true,
      },
    };
  },
  methods: {
    // 点击添加
    add() {
      this.info.show = true;
      this.info.title = "菜单添加";
      this.info.isAdd = true;
    },
    // 点击修改
    edit(id) {
      this.info.show = true;
      this.info.title = "菜单编辑";
      this.$refs.add.getDetail(id);
      this.info.isAdd = false;
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>