<template>
  <el-button type="danger" @click="del">删 除</el-button>
</template>
<script>
export default {
  // 数据
  data() {
    return {};
  },
  //   注册
  components: {},
  //计算属性
  computed: {},
  //   方法
  methods: {
    del() {
      this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$emit("confirm");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
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