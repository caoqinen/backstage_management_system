<template>
  <el-dialog :title="info.title" :visible.sync="info.show">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="角色名称" label-width="80px" prop="rolename">
        <el-input v-model="form.rolename" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="角色权限" label-width="80px">
        <el-tree
          :data="menulist"
          show-checkbox
          node-key="id"
          :props="defaultProps"
          ref="tree"
          :default-checked-keys="defaultKey"
        ></el-tree>
      </el-form-item>

      <el-form-item label="状态" label-width="80px">
        <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="add('form')" v-if="info.isAdd">添 加</el-button>
      <el-button type="primary" v-else @click="update">修改</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqroleAdd, reqroleInfo, reqroleEdit } from "../../../util/request";
import { warningAlert, successAlert } from "../../../util/alert";
export default {
  props: ["info"],
  // 数据
  data() {
    return {
      form: {
        rolename: "",
        menus: "",
        status: 1,
      },
      defaultProps: {
        children: "children",
        label: "title",
      },
      defaultKey: [],

      //表单验证
      rules: {
        rolename: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
    };
  },
  //   注册
  components: {},
  //计算属性
  computed: {
    ...mapGetters({
      menulist: "menu/list",
    }),
  },
  //   方法
  methods: {
    // 清空form的内容
    empty() {
      this.form = {
        rolename: "",
        menus: "",
        status: 1,
      };
    },
    ...mapActions({
      // reqMenuList------->请求列表的方法在 vuex中
      reqMenuList: "menu/reqMenuListActions",

      reqroleList: "role/reqroleActions",
    }),
    // 点击添加按钮
    add(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
          // console.log(this.form);
          reqroleAdd(this.form).then((res) => {
            if (res.data.code === 200) {
              successAlert(res.data.list);
              // 关闭弹窗
              this.cancel();
              // 清空form
              this.empty();
              // 重新获取角色列表接口  稍等
              this.reqroleList();
            } else {
              warningAlert(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      // 获取到 tree的key 值
    },
    cancel() {
      // 弹框消失
      this.info.show = false;
      // 清空form内容  下次点击添加不会有点击编辑的内容
      this.empty();
      // 把多选框的勾勾去掉
      this.$refs.tree.setCheckedKeys([]);
    },
    getDetail(id) {
      reqroleInfo({ id: id }).then((res) => {
        this.form = res.data.list;
        this.defaultKey = JSON.parse(res.data.list.menus);
        this.form.id = id;
      });
    },
    // 点击修改后
    update() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqroleEdit(this.form).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          // 关闭弹窗
          this.cancel();
          // 清空form
          this.empty();
          // 重新获取角色列表接口  稍等
          this.reqroleList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  //   挂载之后
  mounted() {
    // 如果直接进入页面没有数据，就请求数据
    if (this.menulist.length === 0) {
      this.reqMenuList();
    }
  },
  //   卸载之前
  beforeDestroy() {},
};
</script>
<style scoped>
</style>