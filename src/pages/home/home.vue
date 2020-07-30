<template>
  <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
  <div id="main" style="width: 1000px;height:600px;margin:50px auto"></div>
</template>
<script>
import echarts from "echarts";
export default {
  // 数据
  data() {
    return {};
  },
  //   注册
  components: {},
  //计算属性
  computed: {},
  //   方法
  methods: {},
  //   挂载之后
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));

    // 指定图表的配置项和数据
    var option = {
      title: {
        text: "2020后台管理",
      },
      tooltip: {},
      legend: {
        data: ["销量"],
      },
      xAxis: {
        data: ["移动设备", "家电", "食品", "美食", "玩具", "随便"],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "line",
          data: [15, 20, 30, 40, 30, 60],
        },
      ],
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  },
  //   卸载之前
  beforeDestroy() {},
};
</script>
<style scoped>
</style>