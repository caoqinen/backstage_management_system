<template>
  <div>
    <el-table :data="specList" style="width: 100%">
      <el-table-column prop="id" label="规格编号" width="180"></el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="180"></el-table-column>
      <el-table-column prop="attrs" label="规格属性">
        <template slot-scope="scope">
          <el-tag size="small" v-for="item in JSON.parse(scope.row.attrs)" :key="item">{{item}}</el-tag>
          <!--  v-for="item in JSON.parse(scope.row.attrs)" :key="item" -->
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启 用</el-button>
          <el-button type="info" disabled v-else>禁 用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编 辑</el-button>
          <v-del-btn @confirm="del(scope.row.id)"></v-del-btn>
        </template>
      </el-table-column>
    </el-table>
    <!-- 
        !===分页功能
    page-size-------------每页需要展示几条数据
    total-----------------总共有几条数据
    @current-change="cPage"--------点击切换页数时执行的函数-->

    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="cPage"
      :page-size="size"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../util/alert";
import { reqSpeciDel } from "../../../util/request";
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
      specList: "spec/specList",
      total: "spec/total",
      size: "spec/size",
    }),
  },
  //   方法
  methods: {
    ...mapActions({
      reqSpeciListActions: "spec/reqSpeciListActions",
      reqSpeciCountActions: "spec/reqSpeciCountActions",
      gbActions: "spec/gbActions",
    }),

    // 编辑按钮
    edit(id) {
      // 通知父级，然后把scope.row获取到的id，传给父级
      this.$emit("edit", id);
    },

    // 删除按钮
    del(id) {
      // console.log(id);
      reqSpeciDel({ id: id }).then((res) => {
        // console.log(res);
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          //   再次请求列表数据  从新渲染页面
          this.reqSpeciListActions();
          // 请求总数
          this.reqSpeciCountActions();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    cPage(a) {
      //   console.log(a);
      this.gbActions(a);
      this.reqSpeciListActions();
    },
  },
  //   挂载之后
  mounted() {
    //   请求列表
    this.reqSpeciListActions();

    // 请求总数
    this.reqSpeciCountActions();
  },
  //   卸载之前
  beforeDestroy() {},
};
</script>
<style scoped>
</style>