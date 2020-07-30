<template>
  <div class="box">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="上级分类" label-width="80px" prop="pid">
          <el-select v-model="form.pid" placeholder="请选择">
            <el-option label="==请选择==" value disabled></el-option>
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" label-width="80px" prop="catename">
          <el-input v-model="form.catename"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="80px" v-if="form.pid !== 0">
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
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm('form')" v-if="info.isAdd">确 定</el-button>
        <el-button type="primary" v-else @click="edit">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { reqCateAdd, reqCateInfo, reqCateEdit } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["info"],
  // 数据
  data() {
    return {
      imageUrl: "",
      form: {
        pid: 0,
        catename: "",
        img: null,
        status: 1,
      },
      dialogImageUrl: "",
      dialogVisible: false,

      //表单验证
      rules: {
        catename: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ],
        pid: [{ required: true, message: "请选择上级分类", trigger: "change" }],
      },
    };
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
    changeImg(ev) {
      let file = ev.raw;

      // 判断上传的图片不能超过2M

      if (file.size > 2 * 1024 * 1024) {
        warningAlert("上传图片不能超过2M");
        return;
      }

      var imgArr = [".jpg", ".png", ".jpeg", "gif"];

      let extname = file.name.slice(file.name.lastIndexOf("."));
      // var a = imgArr.some((item) => {
      //   return item === extname;
      // });

      // 判断 后缀名 是不是数组中的某一项，some方法是有真就是真，如果是真说明有，然后取反，就是没有的情况下弹框提醒，终止运行
      //  console.log();
      if (!imgArr.some((item) => item === extname)) {
        warningAlert("请上传图片");
        return;
      }
      // s生成一个url地址，赋值给imgUrl，展示出来
      this.imageUrl = URL.createObjectURL(file);
      // 下面要用
      this.form.img = file;
    },
    // 点击确定
    confirm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          reqCateAdd(this.form).then((res) => {
            if (res.data.code === 200) {
              successAlert(res.data.msg);
              this.cancel();
              this.emity();
              this.reqCateListActions();
            } else {
              warningAlert(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    emity() {
      this.form = {
        pid: 0,
        catename: "",
        img: null,
        status: 1,
      };
      this.imageUrl = "";
    },
    cancel() {
      this.info.show = false;
      if (!this.info.isAdd) {
        this.emity();
      }
    },
    // 通过id找到具体信息
    getDetail(id) {
      reqCateInfo({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imageUrl = this.$prefixImg + res.data.list.img;
      });
    },

    // 点击修改按钮
    edit() {
      // console.log(this.form);
      reqCateEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.emity();
          // 再次请求列表
          this.reqCateListActions();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  //   挂载之后
  mounted() {},
  //   卸载之前
  beforeDestroy() {},
};
</script>
<style scoped lang="stylus">
>>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.box >>> .el-upload:hover {
  border-color: #409EFF;
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
