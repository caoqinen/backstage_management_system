<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show" @opened="createEditor">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="一级分类" label-width="80px" prop="first_cateid">
          <el-select v-model="form.first_cateid" placeholder="请选择" @change="changeFirstCateId()">
            <el-option label="==请选择==" value disabled></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="80px" prop="second_cateid">
          <el-select v-model="form.second_cateid" placeholder="请选择">
            <el-option label="==请选择==" value disabled></el-option>
            <!-- 动态渲染 -->
            <el-option
              v-for="item in secondArr"
              :label="item.catename"
              :key="item.id"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" label-width="80px" prop="goodsname">
          <el-input v-model="form.goodsname"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="80px">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" label-width="80px">
          <el-input v-model="form.market_price"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="80px">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品规格" label-width="80px">
          <el-select v-model="form.specsid" placeholder="请选择" @change="changeSpecsId()">
            <el-option label="==请选择==" value disabled></el-option>
            <el-option
              v-for="item in specList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性" label-width="80px">
          <el-select v-model="form.specsattr" placeholder="请选择" multiple>
            <el-option label="==请选择==" value disabled></el-option>
            <el-option v-for="item in attrArr" :label="item" :key="item.id" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" label-width="80px">
          <el-radio :label="1" v-model="form.isnew">是</el-radio>
          <el-radio :label="2" v-model="form.isnew">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" label-width="80px">
          <el-radio :label="1" v-model="form.ishot">是</el-radio>
          <el-radio :label="2" v-model="form.ishot">否</el-radio>
        </el-form-item>

        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>

        <el-form-item label="商品描述" label-width="80px">
          <div id="desc"></div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm('form')" v-if="info.isAdd">确 定</el-button>
        <el-button type="primary" @click="edit" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import E from "wangeditor";
import { mapActions, mapGetters } from "vuex";
import { successAlert, warningAlert } from "../../../util/alert";
import { reqGoodsAdd, reqGoodsInfo, reqGoodsEdit } from "../../../util/request";
export default {
  props: ["info"],
  // 数据
  data() {
    return {
      // 定义一个二级分类空数组
      secondArr: [],
      // 商品规格定义一个空数组
      attrArr: [],
      // 编辑器对象
      editor: null,

      imageUrl: "",
      form: {
        // 一级分类
        first_cateid: "",
        // 二级分类
        second_cateid: "",
        // 商品名称
        goodsname: "",
        // 商品规格编号
        specsid: "",
        // 商品规格属性
        specsattr: [],
        // 商品价格
        price: "",
        // 市场价格
        market_price: "",
        // 商品图片
        img: null,
        // 是否新品
        isnew: 1,
        // 是否热卖
        ishot: 1,
        // 状态
        status: 1,
        // 文本框内容
        description: "",
      },

      //表单验证
      rules: {
        first_cateid: [
          { required: true, message: "请选择一级分类", trigger: "change" },
        ],
        second_cateid: [
          { required: true, message: "请选择二级分类", trigger: "change" },
        ],
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "change" },
        ],
      },
    };
  },
  //   注册
  components: {},
  //计算属性
  computed: {
    ...mapGetters({
      cateList: "cate/cateList",
      specList: "spec/specList",
      goodsList: "goods/goodsList",
    }),
  },
  //   方法
  methods: {
    ...mapActions({
      reqCateListActions: "cate/reqCateListActions",
      reqSpeciListActions: "spec/reqSpeciListActions",
      reqGoodsListActions: "goods/reqGoodsListActions",
      reqGoodsCountActions: "goods/reqGoodsCountActions",
    }),
    empty() {
      this.form = {
        // 一级分类
        first_cateid: "",
        // 二级分类
        second_cateid: "",
        // 商品名称
        goodsname: "",
        // 商品规格编号
        specsid: "",
        // 商品规格属性
        specsattr: [],
        // 商品价格
        price: "",
        // 市场价格
        market_price: "",
        // 商品图片
        img: null,
        // 是否新品
        isnew: 1,
        // 是否热卖
        ishot: 1,
        // 状态
        status: 1,
        // 文本框内容
        description: "",
      };
      this.imageUrl = "";
    },
    // 取消按钮
    cancel() {
      this.info.show = false;
      this.empty();
    },
    // 确定按钮
    confirm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.form.description = this.editor.txt.html();
          this.form.specsattr = JSON.stringify(this.form.specsattr);
          reqGoodsAdd(this.form).then((res) => {
            if (res.data.code == 200) {
              successAlert(res.data.msg);
              this.cancel();
              this.empty();
              // 成功后再次请求列表数据
              this.reqGoodsListActions();
              this.reqGoodsCountActions();
            } else {
              warningAlert(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });

      // console.log(this.form);
    },

    // 根据一级分类改变二级分类
    changeFirstCateId(bool) {
      // console.log(1);
      let index = this.cateList.findIndex((item) => {
        return item.id == this.form.first_cateid;
      });
      // console.log(index);
      this.secondArr = this.cateList[index].children;

      // 不传参 ！bool就是true  就把第二菜单项清空
      if (!bool) {
        this.form.second_cateid = "";
      }
    },

    // 根据规格  拿到规格内的属性
    changeSpecsId(bool) {
      // console.log(1);
      let index = this.specList.findIndex((item) => {
        return item.id == this.form.specsid;
      });

      this.attrArr = JSON.parse(this.specList[index].attrs);
      // console.log();

      if (!bool) {
        this.form.specsattr = [];
      }
    },

    // 图片上传
    changeImg(ev) {
      console.log(ev);
      let file = ev.raw;
      let extname = file.name.slice(file.name.lastIndexOf("."));
      let extArr = [".jpg", ".png", ".jpeg", "gif"];
      // console.log(extname);
      if (!extArr.some((item) => item == extname)) {
        // console.log(1);
        warningAlert("请上传图片");
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        warningAlert("图片不能超过2M");
        return;
      }

      this.imageUrl = URL.createObjectURL(file);
      // 后台需要img这个字段
      this.form.img = file;
    },

    //创建编辑器
    createEditor() {
      this.editor = new E("#desc");
      this.editor.create();
      // this.editor.txt.html("");
      this.editor.txt.html(this.form.description);
    },

    // 点击编辑通过id  获取到内容
    getDetail(id) {
      // console.log(id);
      reqGoodsInfo({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imageUrl = this.$prefixImg + this.form.img;
        // 根据一级分类计算出二级分类
        this.changeFirstCateId(true);
        // 根据上一个计算出下一个
        this.changeSpecsId(true);
        this.form.specsattr = JSON.parse(this.form.specsattr);
      });
    },

    // 点击修改

    edit() {
      this.form.specsattr = JSON.stringify(this.form.specsattr);
      this.form.description = this.editor.txt.html();
      reqGoodsEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          // 再次调用 列表
          this.reqGoodsListActions();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  //   挂载之后
  mounted() {
    if (this.cateList.length == 0) {
      // 请求一级列表
      this.reqCateListActions();
    }
    // 获取商品规格数据 参数传递true  表示获取所有信息

    this.reqSpeciListActions(true);
    // 打开页面首先请求一遍当前页面列表
    this.reqGoodsListActions();
  },
  //   卸载之前
  beforeDestroy() {},
};
</script>
<style scoped lang="stylus">
// 穿透
.add >>> .el-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.add >>> .el-upload:hover {
  border: 1px dashed #409eff !important;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>