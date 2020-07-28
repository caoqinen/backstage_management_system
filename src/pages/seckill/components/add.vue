<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="活动名称" label-width="80px">
          <el-input v-model="form.name" autocomplete="off"></el-input>
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

        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.name" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary">添 加</el-button>
        <!-- <el-button type="primary" @click="update">修 改</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ["info"],
  // 数据
  data() {
    return {
      form: {
        name: "",
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value2: "",
    };
  },
  //   注册
  components: {},
  //计算属性
  computed: {},
  //   方法
  methods: {
    cancel() {
      this.info.show = false;
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