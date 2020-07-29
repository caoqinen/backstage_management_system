<template>
  <div class="login">
    <div class="con">
      <h3>登录</h3>
      <el-input class="input" v-model="form.username" clearable placeholder="请输入用户名"></el-input>
      <el-input class="input" v-model="form.password" clearable show-password placeholder="请输入密码"></el-input>
      <div class="btn-box">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../util/alert";
import { reqAdminLogin } from "../../util/request";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  computed: {},
  methods: {
    ...mapActions({ changeAdmin: "login/changeAdmin" }),
    login() {
      reqAdminLogin(this.form).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          this.changeAdmin(res.data.list);
          this.$router.push("/");
        } else {
          warningAlert(res.data.msg);
        }
      });

      // // 这个是异步操作，请求的时候还没请求到  下面就判断了，那么要用一个定时器等接受到值后在判断
      // this.reqAdminLoginActions(this.form);
      // // if () {}
      // this.timer = setInterval(() => {
      //   // console.log(this.dataCode);
      //   if (this.dataCode.code) {
      //     successAlert(this.dataCode.msg);
      //     this.$router.push("/");
      //   } else {
      //     warningAlert(this.dataCode.msg);
      //   }
      // }, 1000);
    },

    //   }
  },
  mounted() {},
  //   卸载之前
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },
};
</script>
<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #553444, #303d60);
}
.con {
  width: 400px;
  padding: 20px;
  background: #fff;
  border-radius: 20px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  /* margin: 0 auto; */
}
h3 {
  line-height: 60px;
  font-size: 30px;
  text-align: center;
}
.input {
  margin: 20px auto;
  width: 300px;
  display: block;
}
.btn-box {
  width: 300px;
  margin: 20px auto;
  text-align: center;
}

.el-button {
  width: 100%;
}
</style>