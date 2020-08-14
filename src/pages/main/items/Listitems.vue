<template>
  <div id="con">
    <h4>商品列表</h4>

    <el-table :data="tableData" :style="'height:'+height" v-loading="isloading" element-loading-text="数据拼命加载中...">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="所属分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="商品价格">
              <span>{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="商品图片">
              <!-- <span>{{ props.row.imgUrl }}</span> -->
              <img :src="props.row.imgUrl" />
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ props.row.ctime }}</span>
            </el-form-item>
            <el-form-item label="商品评价">
              <span>{{ props.row.rating }}</span>
            </el-form-item>
            <el-form-item label="商品销量">
              <span>{{ props.row.sellCount }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.goodsDesc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="商品分类" prop="category"></el-table-column>
      <el-table-column label="商品价格" prop="price"></el-table-column>
      <!-- <el-table-column label="商品图片" prop="img"></el-table-column> -->
      <el-table-column label="分类名称">
        <template slot-scope="scope">
          <img :src="goodsimgURL+scope.row.imgUrl" />
        </template>
      </el-table-column>

      <el-table-column label="商品描述" prop="goodsDesc"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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

    <!-- 点击编辑弹出的对话框 -->
    <el-dialog title="修改商品信息" :visible.sync="dialogFormVisible">
      <div class="editbox">
        <span>商品ID</span>
        <span>{{ editData.id }}</span>
      </div>
      <div class="editbox">
        <span>创建时间</span>
        <span>{{ editData.ctime }}</span>
      </div>
      <div class="editbox">
        <span>商品名称</span>
        <el-input v-model="editData.name" size="small" clearable></el-input>
      </div>
      <div class="editbox">
        <span>商品分类</span>
        <el-select v-model="editData.category">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.cateName"
            :value="item.cateName"
          ></el-option>
        </el-select>
      </div>
      <div class="editbox">
        <span>商品价格</span>
        <el-input-number v-model="editData.price" label="描述文字"></el-input-number>
      </div>
      <div class="editbox">
        <span>商品图片</span>
        <b>
          <img :src="goodsimgURL+editData.imgUrl" />
        </b>
        <b>
          <el-upload
            class="avatar-uploader"
            :action="GOODS_IMG_UPLOAD"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <!-- action 是IP+端口+接口 data里放的是接口需要的参数 -->
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </b>
      </div>
      <div class="editbox">
        <span>商品描述</span>
        <el-input v-model="editData.goodsDesc" size="small" clearable></el-input>
      </div>
      <div class="editbox">
        <span>商品销量</span>
        <el-input-number v-model="editData.sellCount" label="描述文字"></el-input-number>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { goodslist, goodsdel, categories, goodsedit, GOODS_IMG_UPLOAD, goodsimgURL } from "@/api/apis";
import { timeHandle } from "@/utils/utils";
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      total: 0,
      dialogFormVisible: false, // 对话框的显示/隐藏
      editData: {},
      options: [],
      // uploadimgUrl:'',
      isloading:false,   // 加载时显示转圈圈
      height:'',  // 表格高度，根据每页条数动态赋值
      GOODS_IMG_UPLOAD:'',  // 商品图片上传接口
      goodsimgURL:'',   // 商品图片路径
    };
  },
  created() {
    this.getgoodslist();
    this.GOODS_IMG_UPLOAD=GOODS_IMG_UPLOAD
    this.goodsimgURL=goodsimgURL
    this.height='450px'
  },
  methods: {
    // 调用获取商品列表接口函数
    getgoodslist() {
      this.isloading=true
      setTimeout(()=>{
        goodslist(this.currentPage, this.pageSize).then((res) => {
          for (let obj of res.data.data) {
            obj.ctime = timeHandle(obj.ctime);
            // obj.imgUrl = obj.imgUrl;
          }
          this.total = res.data.total;
          this.tableData = res.data.data;
          this.isloading=false
        });
      },2000)
    },

    // 点击页数切换
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getgoodslist();
    },

    // 点击每页条数切换
    handleSizeChange(val) {
      this.height=''
      this.pageSize = val;
      this.getgoodslist();
    },

    // 删除按钮
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "小渔夫温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          goodsdel(row.id).then((res) => {
            if (res.data.code == 0) {
              this.getgoodslist();
              this.$message({
                type: "success",
                message: "小渔夫温馨提示：" + res.data.msg,
              });
            } else {
              this.$message.error("小渔夫温馨提示：" + res.data.msg);
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

    // 文件上传成功后
    handleAvatarSuccess(res){
      if(res.code==0){
        // this.uploadimgUrl =this.goodsimgURL + res.imgUrl
        this.editData.imgUrl = res.imgUrl
        console.log(this.editData.imgUrl);
      }
    },

    // 编辑按钮
    handleEdit(index, row) {
      // 查询所有分类名称
      categories().then((res) => {
        this.options = res.data.categories;
      });
      this.editData = {...row};  // 用展开字符串拷贝，不然要影响下面的表格
      this.dialogFormVisible = true;
      this.uploadimgUrl=row.imgUrl
    },

    // 提交编辑信息
    sureEdit(){
      this.dialogFormVisible = false
      goodsedit(this.editData).then(res=>{
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: "小渔夫温馨提示：" + res.data.msg,
          });
        } else {
          this.$message.error("小渔夫温馨提示：" + res.data.msg);
        }
      })
      this.getgoodslist()
    }
    
  },
};
</script>

<style lang="less" scoped>
#con {
  background-color: #fff;
  padding: 20px;
  h4 {
    margin-bottom: 10px;
  }
  .el-table {
    width: 100%;
    margin-bottom: 20px;
    img {
      width: 50px;
      height: 50px;
    }
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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
}
</style>