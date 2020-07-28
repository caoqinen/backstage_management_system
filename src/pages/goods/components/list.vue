<template>
  <div>
    <el-table
      :data="goodsList"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="商品编号" width="100"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="150"></el-table-column>
      <el-table-column prop="price" label="商品价格" width="120"></el-table-column>
      <el-table-column prop="market_price" label="市场价格" width="120"></el-table-column>
      <el-table-column label="图片" width="200">
        <template slot-scope="scope">
          <img :src="$prefixImg + scope.row.img" alt />
        </template>
      </el-table-column>
      <el-table-column label="是否新品" width="150">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.isnew==1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column label="是否新品" width="150">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.ishot==1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
        </template>
      </el-table-column>

      <el-table-column label="状态" width="150">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" disabled v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <v-del-btn @confirm="del(scope.row.id)"></v-del-btn>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->

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
import { mapActions, mapGetters } from "vuex";
import { successAlert, warningAlert } from "../../../util/alert";
import { reqGoodsDel } from "../../../util/request";
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
      goodsList: "goods/goodsList",
      size: "goods/size",
      total: "goods/total",
    }),
  },
  //   方法
  methods: {
    ...mapActions({
      reqGoodsListActions: "goods/reqGoodsListActions",
      reqGoodsCountActions: "goods/reqGoodsCountActions",
      changePageActions: "goods/changePageActions",
    }),

    // 编辑
    edit(id) {
      // console.log(id);
      this.$emit("edit", id);
    },

    // 点击删除
    del(id) {
      reqGoodsDel({ id: id }).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.reqGoodsListActions();
          this.reqGoodsCountActions();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    cPage(e) {
      // console.log(e);
      // console.log(e);
      this.changePageActions(e);
      this.reqGoodsListActions();
      this.reqGoodsCountActions();
    },
  },
  //   挂载之后
  mounted() {
    this.reqGoodsListActions();

    this.reqGoodsCountActions();
  },
  //   卸载之前
  beforeDestroy() {},
};
</script>
<style scoped>
</style>