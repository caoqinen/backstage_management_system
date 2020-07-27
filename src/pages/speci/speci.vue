<template>
  <div>
    <el-button type="primary" @click="add">添 加</el-button>

    <v-add :info="info" ref="add"></v-add>

    <!-- 接受一下，子集传递过来的事件 -->
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
        isAdd: true,
      },
    };
  },
  methods: {
    add() {
      this.info.show = true;
      this.info.isAdd = true;
      this.info.title = "规格列表";
    },
    // 接受到子集传过来的事件，id也接受过来了  然后可以通过$refs方法调用子集方法
    edit(id) {
      this.info.show = true;
      this.info.title = "规格修改";
      this.info.isAdd = false;
      this.$refs.add.getDetail(id);
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>