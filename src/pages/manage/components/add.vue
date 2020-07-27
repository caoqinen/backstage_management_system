<template>
  <el-dialog :title="info.title" :visible.sync="info.show">
    <el-form :model="form">
      <el-form-item label="所属角色" label-width="80px">
        <el-select v-model="form.roleid">
          <el-option label="--请选择--" value disabled></el-option>

          <!-- 动态数据 -->
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.rolename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="用户名" label-width="80px">
        <el-input type="text" v-model="form.username" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" label-width="80px">
        <el-input type="password" v-model="form.password" clearable></el-input>
      </el-form-item>
      <el-form-item label="状态" label-width="80px">
        <el-switch :active-value="1" :inactive-value="2" v-model="form.status"></el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="add" v-if="info.isArr">添 加</el-button>
      <el-button type="primary" v-else @click="update">修 改</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqAdminAdd, reqAdminInfo, reqAdminEdit } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["info"],
  // 数据
  data() {
    return {
      form: {
        username: "",
        password: "",
        roleid: "",
        status: 1,
      },
    };
  },
  //   注册
  components: {},
  //计算属性
  computed: {
    ...mapGetters({
      roleList: "role/rolelist",
    }),
  },
  //   方法
  methods: {
    empty() {
      this.form = {
        username: "",
        password: "",
        roleid: "",
        status: 1,
      };
    },
    cancel() {
      this.info.show = false;
    },
    ...mapActions({
      reqroleActions: "role/reqroleActions",
      reqAdminListActions: "manage/reqAdminListActions",
      reqAdminCountActions: "manage/reqAdminCountActions",
    }),
    // 点击添加按钮
    add() {
      if (this.form.username || this.form.password) {
        reqAdminAdd(this.form).then((res) => {
          if (res.data.code === 200) {
            successAlert(res.data.msg);
            // 退出弹框
            this.cancel();
            // 清空form;
            this.empty();

            // 成功后再次请求数据 达到重新渲染效果
            this.reqAdminListActions();
            this.reqAdminCountActions();
          } else {
            warningAlert(res.data.msg);
          }
        });
      } else {
        alert("账号或密码不能为空!!!");
        return;
      }
    },

    // 获取具体的信息
    getDetail(id) {
      reqAdminInfo({ uid: id }).then((res) => {
        this.form = res.data.list;
        this.form.password = "";
      });
    },
    // 修改按钮
    update() {
      console.log(this.form);
      reqAdminEdit(this.form).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          // 再次请求  重新渲染页面
          this.reqAdminListActions();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  //   挂载之后
  mounted() {
    if (this.roleList.length === 0) {
      // 弹窗弹出 就请求一下，要不然下拉列表没有数据
      this.reqroleActions();
    }
  },
  //   卸载之前
  beforeDestroy() {},
};
</script>
<style scoped>
</style>