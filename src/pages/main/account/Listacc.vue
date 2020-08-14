<template>
  <div id="con">
    <h4>账号列表</h4>

    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="账号">
        <template slot-scope="scope">{{ scope.row.account }}</template>
      </el-table-column>
      <el-table-column label="超级管理员">
        <template slot-scope="scope">{{ scope.row.userGroup }}</template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">{{ scope.row.ctime }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
    <p>
      <el-button type="danger" @click="batchDelete">批量删除</el-button>
      <el-button type="primary" @click="toggleSelection()">取消选择</el-button>
    </p>

    <!-- 点击编辑弹出的对话框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-input v-model="newacc" clearable></el-input>
      <el-select v-model="newgroup" prop="用户组">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { userslist, usersdel, usersbatchdel, usersedit } from "@/api/apis"; //
import { timeHandle } from "@/utils/utils";

export default {
  /* =============================== data ======================================== */
  data() {
    return {
      tableData: [], // 动态获取的表格数据
      currentPage: 1, // 当前页码
      pageSize: 5, // 每页条数
      total: 10, // 数据总条数
      multipleSelection: [], // 被选中的对象放在这个数组里
      ids: [],
      dialogVisible: false, // 对话框的显示/隐藏
      options:[{label:'超级管理员',value:'超级管理员'},
      {label:'普通管理员',value:'普通管理员'}],
      newacc:'', // 编辑的新的账户名
      newgroup:'', // 编辑的新的用户组
    };
  },
  /* ===================================== created =================================== */
  created() {
    // 获取账号列表
    this.getuserslist();
  },
  /* ================================== methods ======================================= */
  methods: {
    // 调用获取账号列表接口的函数
    getuserslist() {
      userslist(this.currentPage, this.pageSize).then((res) => {
        let arr = res.data.data;
        for (let obj of arr) {
          obj.ctime = timeHandle(obj.ctime);
        }
        this.tableData = arr;
        this.total = res.data.total;
      });
    },

    // 点击页数切换
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getuserslist();
    },

    // 点击每页条数切换
    handleSizeChange(val) {
      this.pageSize = val;
      this.getuserslist();
    },

    // 取消选择按钮
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },

    // 将被选中的那一条数据放入multipleSelection中
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    // 删除按钮
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "小渔夫温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          usersdel(row.id).then((res) => {
            if (res.data.code == 0) {
              this.getuserslist();
            } else {
              this.$message.error(res.data.msg);
            }
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    // 批量删除
    batchDelete() {
      this.ids = this.multipleSelection.map((item) => item.id);
      this.$confirm("此操作将批量删除数据, 请谨慎操作", "小渔夫温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          usersbatchdel(JSON.stringify(this.ids)).then((res) => {
            if (res.data.code == 0) {
              this.getuserslist();
            } else {
              this.$message.error(res.data.msg);
            }
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    // 编辑按钮 编辑账号接口
    handleEdit(index, row){     // 点击编辑按钮弹出对话框，并且拿到当前行的id
      this.newacc=row.account
      this.newgroup=row.userGroup
      this.dialogVisible = true
      this.idedit=row.id
    },
    sureEdit(){   // 点击对话框的确认按钮，调用修改账号接口
      usersedit(this.idedit,this.newacc,this.newgroup).then(res=>{
        if(res.data.code==0){
          this.dialogVisible = false
          this.getuserslist()
          this.$message({
            type: "success",
            message: '小渔夫温馨提示：' + res.data.msg,
          });
        }else{
          this.$message.error('小渔夫温馨提示：' + res.data.msg);  
        }
      })
    },
  },
};
</script>

<style lang="less" scoped>
#con {
  background-color: #fff;
  padding: 20px;
  height: 100%;
  h4 {
    margin-bottom: 20px;
  }
  .el-table {
    margin-bottom: 20px;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  p {
    margin-top: 20px;
  }
  .el-input{
    margin-bottom: 20px;
  }
}
</style>