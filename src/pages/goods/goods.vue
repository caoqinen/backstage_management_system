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
  // 数据
  data() {
    return {
      info: {
        show: false,
        isAdd: true,
        title: "商品添加",
      },
    };
  },
  //   注册
  components: { vAdd, vList },
  //计算属性
  computed: {},
  //   方法
  methods: {
    add() {
      this.info.show = true;
      this.info.isAdd = true;
      this.info.title = "商品添加";
    },

    // 子集传递过来的
    edit(id) {
      this.info.show = true;
      this.info.isAdd = false;
      this.info.title = "商品编辑";
      this.$refs.add.getDetail(id);
    },
  },
  //   挂载之后
  mounted() {},
  //   卸载之前
  beforeDestroy() {},
};
</script>
<style scoped>
</style>