<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <!-- 弹窗组件 -->
    <v-add :info="info" ref="add"></v-add>

    <!-- 列表组件 -->
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
        title: "商品分类添加",
        isArr: true,
      },
    };
  },
  methods: {
    add() {
      this.info.show = true;
      this.info.isAdd = true;
      this.info.title = "商品分类添加";
    },

    //编辑按钮
    edit(id) {
      this.info.show = true;
      this.info.isAdd = false;
      this.info.title = "商品分类修改";
      // console.log(id);
      this.$refs.add.getDetail(id);
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>