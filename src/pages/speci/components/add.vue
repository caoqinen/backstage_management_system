<template>
  <el-dialog :title="info.title" :visible.sync="info.show">
    <el-form :model="form">
      <el-form-item label="规格名称" label-width="80px">
        <el-input v-model="form.specsname" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <!-- <el-form :model="form"></el-form> -->
    <!-- =============================== -->
    <el-form
      :model="dynamicValidateForm"
      ref="dynamicValidateForm"
      label-width="100px"
      class="demo-dynamic"
    >
      <el-form-item
        v-for="(domain, index) in dynamicValidateForm.domains"
        label="规格属性"
        :key="domain.key"
        :prop="'domains.' + index + '.value'"
        label-width="80px"
      >
        <el-col :span="19">
          <el-input v-model="domain.value" auto-complete="off"></el-input>
        </el-col>
        <el-button class="btn" type="primary" @click="addDomain" v-if="index === 0">新增规格属性</el-button>
        <el-button type="danger" class="btn" @click.prevent="removeDomain(domain)" v-else>删除</el-button>
      </el-form-item>
      <!-- ==================== -->
      <el-form-item label="状态" label-width="80px">
        <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="confirm" v-if="info.isAdd">确 定</el-button>
      <el-button type="primary" @click="edit" v-else>修 改</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { reqSpeciAdd, reqSpeciInfo, reqSpeciEdit } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  // 数据
  data() {
    return {
      form: {
        specsname: "",
        attrs: [],
        status: 1,
      },
      dynamicValidateForm: {
        domains: [
          {
            value: "",
          },
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
      reqSpeciListActions: "spec/reqSpeciListActions",
      reqSpeciCountActions: "spec/reqSpeciCountActions",
    }),
    empty() {
      this.form = {
        specsname: "",
        attrs: [],
        status: 1,
      };
      this.dynamicValidateForm.domains = [
        {
          value: "",
        },
      ];
    },

    //   删除框  ele-ui里的
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item);

      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },
    // 添加框    ele-ui里的
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: "",
      });
    },
    // 添加页面  点击确定按钮
    confirm() {
      // 声明一个空数组，用来存储 在输入框中输入的内容
      var arr = [];
      // 因为拿到的是数组形式，所以循环拿到每一个里面的value
      this.dynamicValidateForm.domains.forEach((item, index) => {
        arr.push(item.value);
      });
      // 因为后台要字符串字段  所以要把里面的转换成字符串
      this.form.attrs = JSON.stringify(arr);

      reqSpeciAdd(this.form).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          this.reqSpeciListActions();
          this.reqSpeciCountActions();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 取消按钮
    cancel() {
      this.info.show = false;
      // 如果是false表示是编辑
      if (!this.info.isAdd) {
        this.empty();
      }
    },

    // 获取某一条数据   这个方法是父级那边调用
    getDetail(id) {
      // 点击编辑之前  先清空
      this.dynamicValidateForm.domains = [];
      reqSpeciInfo({ id: id }).then((res) => {
        // console.log(res.data.list);
        let newObj = JSON.parse(JSON.stringify(res.data.list[0]));

        this.form = newObj;
        // 把json格式转换成数组格式
        this.form.attrs = JSON.parse(this.form.attrs);
        // 把数组中的每一项转成对象，然后push进去
        for (let i in this.form.attrs) {
          this.dynamicValidateForm.domains.push({
            value: this.form.attrs[i],
          });
        }
      });
    },
    // 点击修改
    edit() {
      var arr = [];
      this.dynamicValidateForm.domains.forEach((item, index) => {
        arr.push(item.value);
      });

      this.form.attrs = JSON.stringify(arr);
      console.log(this.form);

      reqSpeciEdit(this.form).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          //   再次请求列表  重新渲染
          this.reqSpeciListActions();
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
.btn {
  width: 139px;
}
</style>