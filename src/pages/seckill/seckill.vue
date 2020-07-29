<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>

    <v-add :info="info" ref="add"></v-add>
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
        title: "活动添加",
      },
    };
  },
  methods: {
    add() {
      this.info.show = true;
      this.info.isAdd = true;
      this.info.title = "活动添加";

      // if (this.info.isAdd) {
      //   // console.log(this.$refs.add.value1);
      //   this.$refs.add.value1 = [new Date(), new Date()];
      // }
    },

    // 编辑
    edit(id) {
      // console.log(id);
      this.info.show = true;
      this.info.isAdd = false;
      this.info.title = "活动编辑";
      this.$refs.add.getDetail(id);
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>