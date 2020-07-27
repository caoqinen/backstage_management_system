<template>
  <div>
    <el-button type="primary" @click="add">添 加</el-button>

    <!-- 添加弹窗 -->
    <v-add :info="info" ref="add"></v-add>

    <!-- 列表 -->
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
        title: "角色添加",
        isAdd: true,
      },
    };
  },
  methods: {
    // 添加按钮
    add() {
      this.info.show = true;
      this.info.title = "角色添加";
      this.info.isAdd = true;
    },
    // 编辑按钮
    edit(id) {
      // console.log(id);
      this.info.show = true;
      this.info.title = "角色编辑";
      this.info.isAdd = false;
      this.$refs.add.getDetail(id);
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>