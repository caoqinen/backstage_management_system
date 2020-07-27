<template>
  <div>
    <v-add :info="info" ref="add"></v-add>

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
      info: {
        show: false,
      },
    };
  },
  methods: {
    edit(id) {
      this.info.show = true;
      this.$refs.add.getDetail(id);
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>