<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="活动名称" label-width="80px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="活动期限" label-width="80px">
          <div class="block">
            <!-- <span class="demonstration">默认</span> -->
            <el-date-picker
              v-model="value1"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-form-item>

        <el-form-item label="一级分类" label-width="80px">
          <el-select v-model="form.first_cateid" @change="changeFirst()">
            <el-option label="--请选择--" value disabled></el-option>

            <!-- 动态数据 -->
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="80px">
          <el-select v-model="form.second_cateid" @change="changeGoods()">
            <el-option label="--请选择--" value disabled></el-option>

            <!-- 动态数据 -->
            <el-option
              v-for="item in secondList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" label-width="80px">
          <el-select v-model="form.goodsid">
            <el-option label="--请选择--" value disabled></el-option>

            <!-- 动态数据 -->
            <el-option
              v-for="item in newGoodsList"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" v-else @click="edit">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../util/alert";
import {
  reqGoodsList,
  reqSeckillAdd,
  reqSeckillInfo,
  reqSeckillEdit,
} from "../../../util/request";

export default {
  props: ["info"],
  // 数据
  data() {
    return {
      // 二级分类
      secondList: [],
      // 商品
      newGoodsList: [],
      form: {
        title: "",
        // 开始时间
        begintime: "",
        // 结束时间
        endtime: "",
        // 一级分类
        first_cateid: "",
        // 二级分类
        second_cateid: "",
        // 商品编号
        goodsid: "",
        status: "",
      },
      value1: [],
    };
  },
  //   注册
  components: {},
  //计算属性
  computed: {
    ...mapGetters({
      cateList: "cate/cateList",
      speckillList: "speckill/speckillList",
    }),
  },
  //   方法
  methods: {
    // 清空form
    empty() {
      this.form = {
        title: "",
        // 开始时间
        begintime: "",
        // 结束时间
        endtime: "",
        // 一级分类
        first_cateid: "",
        // 二级分类
        second_cateid: "",
        // 商品编号
        goodsid: "",
        status: "",
      };
    },
    ...mapActions({
      reqCateListActions: "cate/reqCateListActions",
      reqSeckillListActions: "speckill/reqSeckillListActions",
    }),
    cancel() {
      this.info.show = false;
      this.empty();
      if (!this.info.isAdd) {
        // console.log(1);
        this.value1 = [];
      }
    },

    // 点击添加
    add() {
      this.form.begintime = this.value1[0].getTime();
      this.form.endtime = this.value1[1].getTime();
      // console.log(this.form);reqSeckillList
      reqSeckillAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          //  渲染秒杀列表
          this.reqSeckillListActions();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    // 一级菜单改变事件
    changeFirst(bool) {
      let index = this.cateList.findIndex(
        (item) => item.id == this.form.first_cateid
      );

      this.secondList = this.cateList[index].children;

      if (!bool) {
        this.form.second_cateid = "";
      }
    },

    // 点击二级分类后 得出商品
    changeGoods() {
      reqGoodsList({
        fid: this.form.first_cateid,
        sid: this.form.second_cateid,
      }).then((res) => {
        this.newGoodsList = res.data.list;
      });
    },

    getDetail(id) {
      // console.log(id);
      reqSeckillInfo({ id: id }).then((res) => {
        this.form = res.data.list;
        this.changeFirst(true);
        this.changeGoods();

        this.value1 = [
          new Date(res.data.list.begintime * 1),
          new Date(res.data.list.endtime * 1),
        ];
        this.form.id = id;
      });
    },

    // 修改
    edit() {
      this.form.begintime = this.value1[0].getTime() + "";
      this.form.endtime = this.value1[1].getTime() + "";
      // console.log(this.form);
      reqSeckillEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          // 再次渲染列表
          this.reqSeckillListActions();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  //   挂载之后
  mounted() {
    if (this.cateList.length == 0) {
      this.reqCateListActions();
    }
  },
  //   卸载之前
  beforeDestroy() {},
};
</script>
<style scoped>
</style>