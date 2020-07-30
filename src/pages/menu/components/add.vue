<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="菜单名称" label-width="80px" prop="title">
          <el-input v-model="form.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" label-width="80px" prop="pid">
          <el-select v-model="form.pid" placeholder="请选择">
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 动态数据 -->
            <el-option v-for="item in list" :label="item.title" :key="item.id" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单类型" label-width="80px">
          <el-radio v-model="form.type" :label="1">目录</el-radio>
          <el-radio v-model="form.type" :label="2">菜单</el-radio>
        </el-form-item>

        <el-form-item label="菜单图标" label-width="80px" v-if="form.type===1">
          <el-select v-model="form.icon" placeholder="请选择图标">
            <el-option v-for="item in icon" :label="item" :key="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单地址" label-width="80px" v-else>
          <el-select v-model="form.url" placeholder="请选择地址 ">
            <el-option v-for="item in urls" :label="item" :key="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" label-width="80px">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
            active-color="#13ce66"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add('form')" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  reqMenuAdd,
  reqMenuDetail,
  reqMenuUpdate,
  reqMenuList,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";

import { mapGetters, mapActions } from "vuex";

// 调用弹窗
import {} from "../../../util/alert";
export default {
  props: ["info"],
  // 数据
  data() {
    return {
      icon: [
        "el-icon-setting",
        "el-icon-rank",
        "el-icon-more",
        "el-icon-phone",
      ],
      //路由集合
      urls: [
        "/home",
        "/menu",
        "/role",
        "/manage",
        "/member",
        "/cate",
        "/speci",
        "/goods",
        "/banner",
        "/seckill",
      ],
      form: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },

      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        pid: [{ required: true, message: "请选择菜单图表", trigger: "change" }],
      },
    };
  },
  //   注册
  components: {},
  //计算属性
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  //   方法
  methods: {
    ...mapActions({
      reqMenuListActions: "menu/reqMenuListActions",
    }),
    // 重置内容
    empty() {
      this.form = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
    // 取消弹框
    cancel() {
      this.info.show = false;

      if (!this.info.isAdd) {
        this.empty();
      }
    },
    // 点击了添加按钮
    add(form) {
      // console.log(form);
      this.$refs[form].validate((valid) => {
        if (valid) {
          reqMenuAdd(this.form).then((res) => {
            if (res.data.code === 200) {
              successAlert(res.data.msg);
              this.cancel();
              // 调用重置方法
              this.empty();
              // 再次请求列表数据
              this.reqMenuListActions();
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
    // 获取某一条数据
    getDetail(id) {
      // console.log(id);
      reqMenuDetail({ id: id }).then((res) => {
        // 把获取到的数据复制给form表单
        this.form = res.data.list;
        this.form.id = id;
      });
    },

    // 点击修改按钮后
    update() {
      reqMenuUpdate(this.form).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          // 调用关闭弹窗函数
          this.cancel();
          // 调用重置方法
          this.empty();

          this.reqMenuListActions();
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
<style scoped>
</style>