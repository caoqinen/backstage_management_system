<template>
  <div>
    <el-table
      :data="seckillList"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="title" label="活动名称" width="180"></el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="success" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" disabled v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <v-del-btn type="danger" @confirm="del(scope.row.id)"></v-del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqSeckillDel } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  components: {},
  computed: {
    ...mapGetters({
      seckillList: "speckill/seckillList",
    }),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      reqSeckillListActions: "speckill/reqSeckillListActions",
    }),
    //点击了编辑按钮
    edit(id) {
      this.$emit("edit", id);
    },
    //删除
    del(id) {
      // console.log(id);
      reqSeckillDel({ id: id }).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.reqSeckillListActions();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.reqSeckillListActions();
  },
};
</script>
<style scoped>
</style>