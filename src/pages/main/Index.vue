<template>
  <div>
    <div class="top_sec">
      <div class="card">
        <div class="leftcard">
          <i class="icon iconfont icon-dingdan" style="color: #1296db;"></i>
        </div>
        <div class="rightcard">
          <div>总订单</div>
          <span>{{ indexData.totalOrder }}</span>
        </div>
      </div>
      <div class="card">
        <div class="leftcard">
          <i class="icon iconfont icon-qian" style="color: #d4237a;"></i>
        </div>
        <div class="rightcard">
          <div>总销售额</div>
          <span>{{ indexData.totalAmount }}</span>
        </div>
      </div>
      <div class="card">
        <div class="leftcard">
          <i class="icon iconfont icon-dingdan" style="color: #1296db;"></i>
        </div>
        <div class="rightcard">
          <div>今日订单数</div>
          <span>{{ indexData.todayOrder }}</span>
        </div>
      </div>
      <div class="card">
        <div class="leftcard">
          <i class="icon iconfont icon-qudaoshangxitongbeifen" style="color: #d4237a;"></i>
        </div>
        <div class="rightcard">
          <div>今日销售额</div>
          <span>{{ indexData.totayAmount }}</span>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div id="echarts"></div>
    </div>
  </div>
</template>

<script>
import { totaldata } from "@/api/apis";
export default {
  data() {
    return {
      indexData: {}, // 初始化首页数据
    };
  },
  mounted() {
    //基于准备好的dom，初始化echarts实例
    var myChart = this.$echarts.init(document.getElementById("echarts"));

    // 初始化数据
    totaldata().then((res) => {
      console.log(res);
      this.indexData = res.data;
      this.Option = {
        title: {
          text: "小渔夫数据统计",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["订单数据", "销售额数据"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: res.data.xData,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "订单数据",
            type: "line",
            stack: "总量",
            data: res.data.orderData,
          },
          {
            name: "销售额数据",
            type: "line",
            stack: "总量",
            data: res.data.amountData,
          },
        ],
      };
      // 绘制图表
      myChart.setOption(this.Option);
    });

  },
};
</script>

<style lang="less" scoped>
.top_sec {
  display: flex;
  justify-content: space-between;
  .card {
    width: 23%;
    background-color: #fff;
    display: flex;
    .leftcard {
      flex: 1;
      text-align: center;
      i {
        font-size: 60px;
        line-height: 100px;
      }
    }
    .rightcard {
      flex: 1;
      text-align: center;
      div {
        color: #cccccc;
        font-size: 18px;
        line-height: 20px;
        margin: 25px 0 10px;
      }
      span {
        color: #333333;
        line-height: 20px;
      }
    }
  }
}
.bottom {
  padding: 20px;
  background-color: #fff;
  margin-top: 20px;
  #echarts {
    width: 100%;
    height: 400px;
    margin: auto;
  }
}
</style>