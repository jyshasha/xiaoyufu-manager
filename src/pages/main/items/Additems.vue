<template>
  <div id="con">
    <h4>商品添加</h4>
    <p>
      <span>商品名称</span>
      <el-input placeholder="商品名称" v-model="goodsmsg.name" clearable style="width:400px"></el-input>
    </p>
    <p>
      <span>商品分类</span>
      <el-select v-model="goodsmsg.category" placeholder="请选择商品分类">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.cateName"
          :value="item.cateName"
        ></el-option>
      </el-select>
    </p>
    <p>
      <span>商品价格</span>
      <el-input-number v-model="goodsmsg.price" label="描述文字"></el-input-number>
    </p>
    <p>
      <span>商品图片</span>
      <el-upload
        :action="GOODS_IMG_UPLOAD"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-success="handleAvatarSuccess"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>
    </p>
    <p>
      <span>商品描述</span>
      <el-input
        type="textarea"
        autosize
        placeholder="请输入内容"
        v-model="goodsmsg.goodsDesc"
        style="width:400px"
      ></el-input>
    </p>
    <p>
      <span></span>
      <el-button type="primary" @click="goodsAdd">添加商品</el-button>
    </p>
  </div>
</template>

<script>
import { goodsadd, categories, GOODS_IMG_UPLOAD } from "@/api/apis";
export default {
  data() {
    return {
      goodsmsg:{
        name: "",
        category: "",
        price: "",
        imgUrl: "",
        goodsDesc: ""
      },
      empty:{
        name: "",
        category: "",
        price: "",
        imgUrl: "",
        goodsDesc: ""
      },
      options: [],
      dialogImageUrl: '',
      dialogVisible: false,
      GOODS_IMG_UPLOAD:''  // 商品图片上传接口
    };
  },
  created() {
    // 查询所有分类名称
    categories().then((res) => {
      this.options = res.data.categories;
      this.GOODS_IMG_UPLOAD=GOODS_IMG_UPLOAD
    });
  },
  methods: {
    // 文件上传成功后
    handleAvatarSuccess(res){
      if(res.code==0){
        this.goodsmsg.imgUrl=res.imgUrl
      }
    },
    // 上传成功后的图片的删除和放大
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 添加商品
    goodsAdd() {
      goodsadd(this.goodsmsg).then((res) => {
        console.log(res.data);
        if (res.data.code) {
          this.$message.error('小渔夫温馨提示：' + res.data.msg);
        } else {
          this.$message({
            message: '小渔夫温馨提示：' + res.data.msg,
            type: "success",
          });
          this.goodsmsg=this.empty
        }
      });
    },
    
  },
};
</script>

<style lang="less" scoped>
#con {
  padding: 20px;
  background-color: #ffffff;
  h4 {
    margin-bottom: 10px;
  }
  p {
    margin-bottom: 20px;
    display: flex;
    // align-items: center;
    span {
      width: 100px;
      text-align: right;
      margin-right: 20px;
      &:not(.activity) {
        line-height: 40px;
      }
    }
    .el-image {
      margin-right: 20px;
      border-radius: 5px;
    }
    b {
      display: inline-block;
      width: 150px;
      line-height: 150px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 50px;
      color: #ccc;
      text-align: center;
    }
    .el-checkbox-group {
      width: 400px;
      .el-checkbox {
        margin-bottom: 10px;
      }
    }
  }
}
</style>