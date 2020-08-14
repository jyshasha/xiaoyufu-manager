<template>
  <div id="con">
    <div class="search_div">
      <div>
        <span class="num_span">订单号</span>
        <el-input placeholder="订单号" v-model="orderNo" clearable></el-input>
      </div>
      <div>
        <span>收货人</span>
        <el-input placeholder="收货人" v-model="consignee" clearable></el-input>
      </div>
      <div>
        <span>手机号</span>
        <el-input placeholder="手机号" v-model="phone" clearable></el-input>
      </div>
      <div>
        <span>订单状态</span>
        <el-select v-model="orderState" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="time_div">
      选择时间
      <el-date-picker
        v-model="date"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <el-button type="primary" @click="clickQuery">查询</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" height="340">
      <el-table-column fixed prop="orderNo" label="订单号" width="100"></el-table-column>
      <el-table-column prop="orderTime" label="下单时间" width="180"></el-table-column>
      <el-table-column prop="phone" label="联系电话" width="160"></el-table-column>
      <el-table-column prop="consignee" label="收货人" width="120"></el-table-column>
      <el-table-column prop="deliverAddress" label="配送地址" width="200"></el-table-column>
      <el-table-column prop="deliveryTime" label="送达时间" width="180"></el-table-column>
      <el-table-column prop="remarks" label="用户备注" width="160"></el-table-column>
      <el-table-column prop="orderAmount" label="订单金额" width="100"></el-table-column>
      <el-table-column prop="orderState" label="订单状态" width="100"></el-table-column>

      <el-table-column fixed="right" label="操作" min-width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 点击编辑弹出的对话框 -->
    <el-dialog title="修改商品信息" :visible.sync="dialogFormVisible">
      <div class="editbox">
        <span>订单号</span>
        <el-input v-model="row.orderNo" clearable></el-input>
      </div>
      <div class="editbox">
        <span>下单时间</span>
        <el-input v-model="row.orderTime" clearable></el-input>
      </div>
      <div class="editbox">
        <span>联系电话</span>
        <el-input v-model="row.phone" clearable></el-input>
      </div>
      <div class="editbox">
        <span>收货人</span>
        <el-input v-model="row.consignee" clearable></el-input>
      </div>
      <div class="editbox">
        <span>收货地址</span>
        <el-input v-model="row.deliverAddress" clearable></el-input>
      </div>
      <div class="editbox">
        <span>送达时间</span>
        <el-input v-model="row.deliveryTime" clearable></el-input>
      </div>
      <div class="editbox">
        <span>备注</span>
        <el-input v-model="row.remarks" clearable></el-input>
      </div>
      <div class="editbox">
        <span>订单金额</span>
        <el-input v-model="row.orderAmount" clearable></el-input>
      </div>
      <div class="editbox">
        <span>订单状态</span>
        <el-select v-model="row.orderState">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="clilckSure">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { orderlist, orderedit } from "@/api/apis"; //, ordersearch
import { timeHandle } from '@/utils/utils'
export default {
  data() {
    return {
      orderNo: "",
      consignee: "",
      phone: "",
      orderState: "",
      date: null,
      options: [
        {
          value: "已受理",
          label: "已受理",
        },
        {
          value: "派送中",
          label: "派送中",
        },
        {
          value: "已完成",
          label: "已完成",
        },
        {
          value: "全部",
          label: "全部",
        }
      ],
      currentPage: 1,
      pageSize: 5,
      tableData: [],
      total: 0,
      dialogFormVisible: false, // 对话框的显示/隐藏
      row:{},  // 当前订单的信息
    };
  },
  created(){
    this.getorderlist()
  },
  methods: {
    // 封装获取订单列表接口函数
    getorderlist(paramsex){
      
      orderlist({currentPage:this.currentPage,pageSize:this.pageSize,...paramsex}).then(res=>{
        for(let obj of res.data.data){
          obj.orderTime=timeHandle(obj.orderTime)
          obj.deliveryTime=timeHandle(obj.deliveryTime)
        }
        this.tableData=res.data.data
        this.total=res.data.total
      })
    },
    // 每页条数切换
    handleSizeChange(val) {
      this.pageSize=val
      this.getorderlist()
    },
    // 当前页数切换
    handleCurrentChange(val) {
      this.currentPage=val
      this.getorderlist()
    },
    // 点击查询
    clickQuery(){
      this.currentPage=1
      // 判定用户选择了那些参数
      let paramsex={}
      if(this.orderNo!="")paramsex.orderNo=this.orderNo
      if(this.consignee!="")paramsex.consignee=this.consignee
      if(this.phone!="")paramsex.phone=this.phone
      if(this.orderState!="" && this.orderState!="全部")paramsex.orderState=this.orderState
      if(this.date)paramsex.date=JSON.stringify([timeHandle(this.date[0]),timeHandle(this.date[1])])
      this.paramsex=paramsex
      this.getorderlist(paramsex)
      console.log(this.paramsex);

    },
    // 点击查看
    handleEdit(index,row){
      this.row=row
      this.dialogFormVisible = true;
    },
    // 点击确定提交修改好的信息
    clilckSure(){
      this.dialogFormVisible = false
      orderedit(this.row).then(res=>{
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: "小渔夫温馨提示：" + res.data.msg,
          });
        } else {
          this.$message.error("小渔夫温馨提示：" + res.data.msg);
        }
      })
    }

  },
};
</script>

<style lang="less" scoped>
#con {
  background-color: #fff;
  padding: 20px;
  height: 100%;
  .search_div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    > div {
      display: flex;
      align-items: center;
      span {
        width: 100px;
        &:not(.num_span) {
          width: 100px;
          margin-left: 20px;
        }
      }
    }
  }
  .time_div {
    margin-bottom: 20px;
  }
  .el-table {
    margin-bottom: 10px;
  }
  .editbox {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    span:first-child {
      width: 100px;
      text-align: right;
      margin-right: 20px;
    }
    .el-input {
      flex: 1;
    }
    b {
        width: 100px;
        height: 100px;
        border: 1px solid #ccc;
        margin-right: 20px;
        img {
          width: 100%;
          height: 100%;
        }
      }
  }
}
</style>