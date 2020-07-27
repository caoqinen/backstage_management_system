<template>
  <div>
    <el-table :data="bannerList" style="width: 100%">
      <el-table-column prop="id" label="编号" width="200"></el-table-column>
      <el-table-column prop="title" label="轮播图标题" width="300"></el-table-column>
      <el-table-column label="图片" width="300">
        <template slot-scope="scope">
          <img class="img" :src="$prefixImg+scope.row.img" alt />
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启 用</el-button>
          <el-button type="info" v-else disabled>禁 用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编 辑</el-button>
          <v-del-btn @confirm="del(scope.row.id)"></v-del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { reqBannerDel } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapActions, mapGetters } from "vuex";
export default {
  // 数据
  data() {
    return {};
  },
  //   注册
  components: {},
  //计算属性
  computed: {
    ...mapGetters({
      bannerList: "banner/bannerList",
    }),
  },
  //   方法
  methods: {
    ...mapActions({
      reqBannerListActions: "banner/reqBannerListActions",
    }),

    // 编辑
    edit(id) {
      //   console.log(id);
      this.$emit("edit", id);
    },

    // 删除
    del(id) {
      //   console.log(id);
      reqBannerDel({ id: id }).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.reqBannerListActions();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  //   挂载之后
  mounted() {
    this.reqBannerListActions();
  },
  //   卸载之前
  beforeDestroy() {},
};
</script>
<style scoped>
img {
  width: 100px;
}
</style>