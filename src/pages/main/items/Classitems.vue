<template>
  <div id="con">
    <h4>
      商品分类
      <el-button type="primary" @click="dialogVisible=true">添加分类</el-button>
    </h4>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号" width="120">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分类名称">
        <template slot-scope="scope">
          <span style="margin-left: 10px" v-show="!scope.row.isedit">{{ scope.row.cateName }}</span>
          <el-input v-model="scope.row.cateName" v-show="scope.row.isedit" size="small"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="是否启用">
        <el-switch
          v-model="scope.row.state"
          active-color="#13ce66"
          inactive-color="#ff4949"
          slot-scope="scope"
          :disabled="!scope.row.isedit"
        ></el-switch>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            :type="scope.row.isedit ? 'success' : ''"
            @click="handleEdit(scope.$index, scope.row)"
          >{{ scope.row.isedit ? '完成' : '编辑' }}</el-button>
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

    <!-- 点击添加分类弹出的对话框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <p>
        <span>分类名称</span>
        <el-input v-model="name" placeholder="请输入分类名称" clearable></el-input>
      </p>
      <p>
        <span>分类名称</span>
        <el-switch v-model="switchVal" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { catelist, delcate, addcate, editcate } from "@/api/apis"; //
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      total: 0,
      name: "", // 添加的分类名称
      switchVal: true, // 添加分类对话框中的是否启用
      dialogVisible: false, // 对话框的显示/隐藏
    };
  },
  created() {
    this.getcatelist();
  },
  methods: {
    // 调用获取分类列表的函数
    getcatelist() {
      catelist(this.currentPage, this.pageSize).then((res) => {
        for (let obj of res.data.data) {
          obj.isedit = false;
          obj.state = obj.state == 1 ? true : false;
        }
        this.total = res.data.total;
        this.tableData = res.data.data;
      });
    },

    // 点击页数切换
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getcatelist();
    },

    // 点击每页条数切换
    handleSizeChange(val) {
      this.pageSize = val;
      this.getcatelist();
    },

    // 删除按钮
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "小渔夫温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delcate(row.id).then((res) => {
            if (res.data.code == 0) {
              this.getcatelist();
              this.$message({
                type: "success",
                message: "小渔夫温馨提示：删除成功!",
              });
            } else {
              this.$message.error('小渔夫温馨提示：'+res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "小渔夫温馨提示：已取消删除",
          });
        });
    },

    // 添加分类
    sureEdit() {
      // console.log(this.name,this.switchVal)
      addcate(this.name, this.switchVal).then((res) => {
        if (res.data.code == 0) {
          this.getcatelist();
          this.$message({
            type: "success",
            message: res.data.msg,
          });
        } else {
          this.$message.error(res.data.msg);
        }
      });
      this.dialogVisible = false;
    },

    // 编辑
    handleEdit(index, row) {
      if (row.isedit) {
        row.isedit = false;
        editcate(row.id, row.cateName, row.state).then((res) => {
          if (res.data.code == 0) {
            this.$message({
              type: "success",
              message: res.data.msg,
            });
          } else {
            this.$message.error(res.data.msg);
          }
        });
      } else {
        row.isedit = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
#con {
  padding: 20px;
  background-color: #ffffff;
  h4 {
    display: flex;
    justify-content: space-between;
  }
  .el-table {
    margin-bottom: 20px;
  }
  p {
    display: flex;
    align-items: center;
    &:first-child {
      margin-bottom: 20px;
    }
    span {
      width: 100px;
    }
  }
}
</style>