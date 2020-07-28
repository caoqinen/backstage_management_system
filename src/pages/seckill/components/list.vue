<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="date" label="活动名称" width="180"></el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="success">启用</el-button>
          <el-button type="info" disabled>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary">编辑</el-button>
          <del-btn type="danger"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
// import { mapGetters, mapActions } from "vuex";
// import { requestCateDelete } from "../../../util/request";
// import { successAlert, warningAlert } from "../../../util/alert";
export default {
  components: {},
  computed: {
    // ...mapGetters({
    //   list: "cate/list",
    // }),
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  methods: {
    // ...mapActions({
    //   requestList: "cate/requestList",
    // }),
    //点击了编辑按钮
    // edit(id) {
    //   this.$emit("edit", id);
    // },
    //删除
    // del(id) {
    //     console.log(id)
    //   requestCateDelete({ id: id }).then((res) => {
    //     if (res.data.code == 200) {
    //       successAlert(res.data.msg);
    //       this.requestList();
    //     } else {
    //       warningAlert(res.data.msg);
    //     }
    //   });
    // },
  },
  mounted() {
    // this.requestList();
  },
};
</script>
<style scoped>
</style>