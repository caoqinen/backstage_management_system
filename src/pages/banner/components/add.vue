<template>
  <div class="box">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="标题" label-width="80px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="80px">
          <!--            -->
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
        <el-button type="primary" @click="confirm" v-if="info.isAdd">确 定</el-button>
        <el-button type="primary" v-else @click="edit">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  reqBannerAdd,
  reqBannerInfo,
  reqBannerEdit,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapActions } from "vuex";
export default {
  props: ["info"],
  // 数据
  data() {
    return {
      form: {
        title: "",
        img: null,
        status: 1,
      },
      imageUrl: "",
    };
  },
  //   注册
  components: {},
  //计算属性
  computed: {},
  //   方法
  methods: {
    empty() {
      this.form = {
        title: "",
        img: null,
        status: 1,
      };
      this.imageUrl = "";
    },
    ...mapActions({
      reqBannerListActions: "banner/reqBannerListActions",
    }),
    cancel() {
      this.info.show = false;

      if (!this.info.isAdd) {
        this.empty();
      }
    },

    changeImg(ev) {
      //   console.log(ev);
      let file = ev.raw;
      //   console.log(file);
      // 判断 文件大小不能超过2M
      if (file.size > 2 * 1024 * 1024) {
        warningAlert("图片不能超过2M");
        return;
      }
      //后缀名
      let extname = file.name.slice(file.name.lastIndexOf("."));
      //   判断是否为tupian
      let arrImg = [".jpg", ".jpeg", "gif", "png"];
      if (
        !arrImg.some((item) => {
          return item == extname;
        })
      ) {
        warningAlert("请上传图片格式");
        return;
      }
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    // 确定
    confirm() {
      reqBannerAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          //
          this.reqBannerListActions();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    // 获取具体信息
    getDetail(id) {
      console.log(id);
      reqBannerInfo({ id: id }).then((res) => {
        this.form = res.data.list;
        this.imageUrl = this.$prefixImg + res.data.list.img;

        this.form.id = id;
      });

      //   console.log(this.form);
    },

    // 修改
    edit() {
      //   console.log(this.form);
      reqBannerEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          //   请求列表
          this.reqBannerListActions();
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
.box >>> .el-upload {
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