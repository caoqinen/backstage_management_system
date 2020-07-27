<template>
  <el-dialog title="商品分类修改" :visible.sync="info.show">
    <el-form :model="form">
      <el-form-item label="一级分类" label-width="80px">
        <el-select v-model="form.name" placeholder="请选择">
          <el-option label="==请选择==" value disabled></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" label-width="80px">
        <el-select v-model="form.name" placeholder="请选择">
          <el-option label="==请选择==" value disabled></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称" label-width="80px">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="价格" label-width="80px">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="市场价格" label-width="80px">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="图片" label-width="80px">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </el-form-item>

      <el-form-item label="商品规格" label-width="80px">
        <el-select v-model="form.name" placeholder="请选择">
          <el-option label="==请选择==" value disabled></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="规格属性" label-width="80px">
        <el-select v-model="form.name" placeholder="请选择">
          <el-option label="==请选择==" value disabled></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否新品" label-width="80px">
        <template>
          <el-radio label="1">是</el-radio>
          <el-radio label="2">否</el-radio>
        </template>
      </el-form-item>
      <el-form-item label="是否热卖" label-width="80px">
        <template>
          <el-radio label="1">是</el-radio>
          <el-radio label="2">否</el-radio>
        </template>
      </el-form-item>

      <el-form-item label="状态" label-width="80px">
        <el-switch v-model="info.value" :active-value="1" :inactive-value="2"></el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="info.show = false">取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: ["info"],
  // 数据
  data() {
    return {
      form: {
        name: "",
        value: 1,
      },
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  //   注册
  components: {},
  //计算属性
  computed: {},
  //   方法
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
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