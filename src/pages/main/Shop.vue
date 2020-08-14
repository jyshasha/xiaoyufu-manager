<template>
  <div id="con">
    <h4>
      店铺管理
      <el-button type="primary" @click="clickSave">保存</el-button>
    </h4>
    <p>
      <span>店铺名称</span>
      <el-input v-model="shopData.name" clearable style="width:400px"></el-input>
    </p>
    <p>
      <span>店铺公告</span>
      <el-input type="textarea" autosize v-model="shopData.bulletin"></el-input>
    </p>
    <p>
      <span>店铺头像</span>
      <b>
        <el-upload
          class="avatar-uploader"
          :action="SHOP_UPLOAD"
          :show-file-list="false"
          :on-success="shopheadSuccess"
        >
          <img v-if="shopData.avatar" :src="shopimgURL+shopData.avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </b>
    </p>
    <p>
      <span>店铺图片</span>
      <em>
        <el-upload
          :file-list="picCard"
          :action="SHOP_UPLOAD"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="shopimgSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </em>
    </p>
    <p>
      <span>配送费</span>
      <el-input-number v-model="shopData.deliveryPrice" label="描述文字"></el-input-number>元
    </p>
    <p>
      <span>起送价格</span>
      <el-input-number v-model="shopData.minPrice" label="描述文字"></el-input-number>元
    </p>
    <p>
      <span>配送时间</span>
      <el-input-number v-model="shopData.deliveryTime" label="描述文字"></el-input-number>分钟
    </p>
    <p>
      <span>配送描述</span>
      <el-input v-model="shopData.description" clearable style="width:400px"></el-input>
    </p>
    <p>
      <span>店铺评分</span>
      <el-input v-model="shopData.score" clearable style="width:400px"></el-input>
    </p>
    <p>
      <span>销量</span>
      <el-input-number v-model="shopData.sellCount" label="描述文字"></el-input-number>
    </p>
    <p class="activity">
      <span>活动</span>
      <el-checkbox-group v-model="shopData.supports">
        <el-checkbox v-for="(item,index) in activity" :key="index" :label="item"></el-checkbox>
      </el-checkbox-group>
    </p>
    <p>
      <span>营业时间</span>
      <el-time-picker is-range v-model="shopData.date" range-separator="至"></el-time-picker>
    </p>
  </div>
</template>

<script>
import { shopinfo, SHOP_UPLOAD, shopimgURL, shopedit } from "@/api/apis"; //
import { timeHandle } from '@/utils/utils'
export default {
  data() {
    return {
      shopData: {
        supports: []
      }, // 店铺数据
      SHOP_UPLOAD: "", // 店铺图片上传接口
      shopimgURL: "", // 商品图片路径
      activity:["在线支付满28减5","VC无限橙果汁全场8折","单人精彩套餐","单人特价套餐","单人精彩套餐"],
      dialogImageUrl: "",
      dialogVisible: false,
      picCard:[]   // 照片墙数组
    };
  },
  created() {
    // 店铺图片上传接口
    this.SHOP_UPLOAD = SHOP_UPLOAD;
    // 商品图片路径
    this.shopimgURL = shopimgURL;
    // 获取商品信息
    this.getshopinfo()
  },
  methods: {
    // 封装获取商品信息接口函数
    getshopinfo(){
      shopinfo().then((res) => {
        this.shopData = res.data.data;
        this.picCard=res.data.data.pics.map(obj=>{
          return {
            name:obj,
            url:this.shopimgURL+obj
          }
        })
      });
    },
    // 店铺头像上传成功后的回调函数
    shopheadSuccess(res){
      if(res.code==0){
        this.shopData.avatar=res.imgUrl
        this.$message({
          message: '小渔夫温馨提示：店铺头像' + res.msg,
          type: "success",
        })
      }else{
        this.$message.error('小渔夫温馨提示：店铺头像上传失败，请重新上传');
      }
    },
    // 店铺图片上传成功后的回调函数
    shopimgSuccess(res){
      if(res.code==0){
        this.shopData.pics.push(res.imgUrl)
        this.$message({
          message: '小渔夫温馨提示：' + res.msg,
          type: "success",
        })
      }else{
        this.$message.error('小渔夫温馨提示：' + res.msg);
      }
    },
    // 点击保存
    clickSave(){
      // 要传的参数的格式处理
      let askData=JSON.parse(JSON.stringify(this.shopData))
      askData.supports=JSON.stringify(askData.supports)

      askData.date=JSON.stringify([
        timeHandle(askData.date[0]),
        timeHandle(askData.date[1])
      ])
      askData.pics=JSON.stringify(askData.pics)
      // 调用保存修改数据接口
      shopedit(askData).then(res=>{
        if(res.data.code==0){
          this.$message({
            message: '小渔夫温馨提示：' + res.data.msg,
            type: "success",
          })
          this.getshopinfo()

        }else{
          this.$message.error('小渔夫温馨提示：' + res.data.msg);
        }
      })
    },
    // 店铺图片删除
    handleRemove(file, fileList) {
      this.picCard=fileList
      this.shopData.pics.splice(this.shopData.pics.indexOf(file.name),1)
    },
    // 店铺图片点击放大
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
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
  p {
    margin-bottom: 20px;
    display: flex;
    &:not(.activity){
      align-items: center;
    }
    span {
      width: 100px;
      text-align: right;
      margin-right: 20px;
    }
    .el-image {
      margin-right: 20px;
      border-radius: 6px;
    }
    b {
      display: inline-block;
      border: 1px solid #ccc;
      border-radius: 6px;
      width: 150px;
    }
    .el-checkbox-group {
      width: 400px;
      .el-checkbox {
        margin-bottom: 10px;
      }
    }
    .el-input-number {
      margin-right: 20px;
    }
    b>img,em>img{
      margin-right: 10px;
      width: 146px;
      height: 146px;
      border-radius: 6px;
      margin-bottom: 10px;
    }
    em{
      display: inline-block;
      display: flex;
      flex-wrap: wrap;
    }
  }
}

// 店铺头像上传样式
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
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar {
  width: 150px;
  height: 150px;
  display: block;
}
</style>