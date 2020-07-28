<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>

    <v-add :info="info"></v-add>
    <v-list></v-list>
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
      },
    };
  },
  methods: {
    add() {
      this.info.show = true;
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>