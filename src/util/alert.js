//存放弹窗的文件
import Vue from "vue";

// 每一个组件都是一个实例
var vm = new Vue();

// 成功弹窗
export const successAlert = (msg) => {
  // msg-------某个组件传递过来的数据
  vm.$message({
    message: msg,
    type: "success"
  })
}

// 警告弹窗
export const warningAlert = (msg) => {
  // msg-------某个组件传递过来的数据
  vm.$message({
    message: msg,
    type: "warning"
  })
}

// 错误弹窗
export const errorAlert = (msg) => {
  // msg-------某个组件传递过来的数据
  vm.$message.error(msg)
}
