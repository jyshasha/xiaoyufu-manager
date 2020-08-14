<template>
  <div id="con">
    <h4>管理员信息</h4>
    <p>
      管理员ID：
      <span>{{ accountInfo.id }}</span>
    </p>
    <p>
      账号：
      <span>{{ accountInfo.account }}</span>
    </p>
    <p>
      用户组：
      <span>{{ accountInfo.userGroup }}</span>
    </p>
    <p>
      创建时间：
      <span>{{ accountInfo.ctime }}</span>
    </p>
    <p>
      管理员头像：
      <b>
        <img :src="accountInfo.imgUrl" />
      </b>
      <b>
        <el-upload
          class="avatar-uploader"
          :action="AVATAR_UPLOAD"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :data="uploadimg"
        >
          <!-- action 是IP+端口+接口 data里放的是接口需要的参数 -->
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </b>
    </p>
  </div>
</template>

<script>
import { accountinfo, AVATAR_UPLOAD } from "@/api/apis";
import { timeHandle } from "@/utils/utils";
export default {
  data() {
    return {
      accountInfo: {
        id: "",
        ctime: "",
        account: "",
        userGroup: "",
        imgUrl: "",
      },
      uploadimg: {}, // data里传的是接口需要的参数
      AVATAR_UPLOAD: "", // 头像上传接口
    };
  },
  created() {
    // 将id值存给uploadimg
    this.uploadimg = { id: localStorage.id };
    // 调用个人信息接口
    this.getaccountinfo();
    // 头像上传接口赋值
    this.AVATAR_UPLOAD = AVATAR_UPLOAD;
  },
  methods: {
    // 封装调用个人信息接口函数
    getaccountinfo() {
      accountinfo(localStorage.id).then((res) => {
        res.data.accountInfo.ctime = timeHandle(res.data.accountInfo.ctime);
        this.accountInfo = res.data.accountInfo;
      });
    },
    // 头像上传成功后，重新渲染页面
    handleAvatarSuccess(res) {
      // console.log(res)
      if (res.code == 0) {
        // this.accountInfo.imgUrl=res.imgUrl
        // console.log(this.accountInfo.imgUrl);
        this.getaccountinfo();
        this.$bus.$emit("uploadFinish");
        this.$message({
          type: "success",
          message: "小渔夫温馨提示：头像" + res.msg,
        });
      } else {
        this.$message.error("小渔夫温馨提示：头像" + res.msg);
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
    margin-bottom: 10px;
  }
  p {
    padding: 15px 0;
    &:not(:last-child) {
      border-bottom: 1px solid #ccc;
    }
    &:last-child {
      display: flex;
      align-items: center;
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