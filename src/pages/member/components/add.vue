<template>
  <el-dialog title="会员修改" :visible.sync="info.show">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="手机号" label-width="80px" prop="phone">
        <el-input v-model="form.phone" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="昵称" label-width="80px" prop="nickname">
        <el-input v-model="form.nickname" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" label-width="80px">
        <el-input
          type="password"
          placeholder="请输入要修改的新密码"
          v-model="form.password"
          auto-complete="off"
        ></el-input>
        <p>{{tishi}}</p>
      </el-form-item>
      <el-form-item label="状态" label-width="80px">
        <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="edit('form')">修 改</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { reqMemberInfo, reqMemberEdit } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  // 数据
  data() {
    return {
      form: {
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      },
      tishi: "留空则不修改",

      //表单验证
      rules: {
        phone: [
          { required: true, message: "请输入正确的手机号", trigger: "blur" },
          {
            min: 11,
            max: 11,
            trigger: "blur",
          },
        ],
        nickname: [
          { required: true, message: "请输入昵称", trigger: "change" },
        ],
      },
    };
  },
  //   注册
  components: {},
  //计算属性
  computed: {},
  //   方法
  methods: {
    ...mapActions({
      reqreqMemberListActions: "member/reqreqMemberListActions",
    }),
    empty() {
      this.form = {
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      };
    },
    cancel() {
      this.info.show = false;
      this.empty();
    },
    edit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          reqMemberEdit(this.form).then((res) => {
            if (res.data.code === 200) {
              successAlert(res.data.msg);
              this.empty();
              this.cancel();
              // 请求列表数据重新渲染
              this.reqreqMemberListActions();
            } else {
              warningAlert(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      //   console.log(this.form);

      // console.log(this.form);
    },

    // 点击编辑后 把当前这一行的信息放在表单里
    getDetail(id) {
      reqMemberInfo({ uid: id }).then((res) => {
        this.form = res.data.list;
        this.form.password = "";
        this.form.uid = id;
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