<template>
  <div>
    <p>
      <span>时间范围</span>
      <el-date-picker
        v-model="date"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-button type="primary" @click="clickSearch">查询</el-button>
    </p>
    <div class="echart">
      <div id="echarts"></div>
    </div>
  </div>
</template>

<script>
import { ordertotal } from "@/api/apis";
import { timeHandle } from "@/utils/utils";
export default {
  data() {
    return {
      date: [],
      option: {}, // 图表初始化数据
    };
  },
  mounted() {
    //基于准备好的dom，初始化echarts实例
    this.myChart = this.$echarts.init(document.getElementById("echarts"));
    
    this.getorderdata(this.date);
  },
  methods: {
    // 封装调用接口函数
    getorderdata(date) {
      if (!date.length == 0) {
        date = [timeHandle(this.date[0]), timeHandle(this.date[1])];
      }
      this.datestr = JSON.stringify(date);
      ordertotal({ date: this.datestr }).then((res) => {
        this.option = {
          xAxis: {
            type: "category",
            data: res.data.data.map(obj=>timeHandle(obj.orderTime)),
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: res.data.data.map(obj=>obj.orderAmount),
              type: "bar",
            },
          ],
        };
        // 绘制图表
        this.myChart.setOption(this.option)
      });
    },
    // 点击查询
    clickSearch(){
      this.getorderdata(this.date);
    }
  },
};
</script>

<style lang="less" scoped>
.el-range-editor {
  margin: 0 20px;
}
.echart {
  padding: 20px;
  background-color: #fff;
  margin-top: 20px;
  #echarts {
    width: 100%;
    height: 500px;
  }
}
</style>