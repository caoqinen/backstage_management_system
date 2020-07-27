<template>
  <div>
    <el-table
      :data="cateList"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="分类编号" width="180"></el-table-column>
      <el-table-column prop="catename" label="分类名称" width="180"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img class="img" :src="$prefixImg+scope.row.img" alt />
        </template>
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>

          <v-del-btn type="danger" @confirm="del(scope.row.id)">删除</v-del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../util/alert";
import { reqCateDel } from "../../../util/request";
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
      cateList: "cate/cateList",
    }),
  },
  //   方法
  methods: {
    ...mapActions({
      reqCateListActions: "cate/reqCateListActions",
    }),

    edit(id) {
      this.$emit("edit", id);
    },

    del(id) {
      // console.log(id);
      reqCateDel({ id: id }).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          this.reqCateListActions();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  //   挂载之后
  mounted() {
    // 调用状态层里面的请求列表
    this.reqCateListActions();
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