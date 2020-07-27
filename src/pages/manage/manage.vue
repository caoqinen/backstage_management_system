<template>
  <div>
    <el-button type="primary" @click="add">添 加</el-button>

    <!-- 添加 -->
    <v-add :info="info" ref="add"></v-add>

    <!-- 表格 -->
    <v-list @edit="edit"></v-list>
  </div>
</template>
<script>
import vAdd from "./components/add";
import vList from "./components/list";
export default {
  components: { vAdd, vList },
  data() {
    return {
      info: {
        show: false,
        isArr: true,
        title: "用户添加",
      },
    };
  },
  methods: {
    add() {
      this.info.show = true;
      this.info.isArr = true;
      this.info.title = "用户添加";
    },
    edit(id) {
      this.info.show = true;
      this.info.isArr = false;
      this.info.title = "用户编辑";
      this.$refs.add.getDetail(id);
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>