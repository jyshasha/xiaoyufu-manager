<template>
  <div id="con">
    <h4>修改密码</h4>
    <p>
      <span>原密码</span>
      <el-input
        placeholder="请输入原密码"
        v-model="oldpwd"
        show-password
        style="width:200px"
        @blur="blurOld"
      ></el-input>
      <span>{{ errmsg1 }}</span>
    </p>
    <p>
      <span>新密码</span>
      <el-input placeholder="请输入新密码" v-model="newpwd" show-password style="width:200px"></el-input>
      <span>{{ errmsg2 }}</span>
    </p>
    <p>
      <span>确认密码</span>
      <el-input placeholder="请确认密码" v-model="surepwd" show-password style="width:200px"></el-input>
      <span>{{ errmsg3 }}</span>
    </p>
    <p>
      <span></span>
      <el-button type="primary" @click="editPwd">确定</el-button>
      <!--  -->
      <el-button>重置</el-button>
    </p>
  </div>
</template>

<script>
import { checkoldpwd, editpwd } from "@/api/apis"; //
export default {
  data() {
    return {
      oldpwd: "",
      newpwd: "",
      surepwd: "",
      errmsg1: "",
      errmsg2: "",
      errmsg3: "",
      flag: false,
    };
  },
  methods: {
    // 检查旧密码是否正确
    blurOld() {
      console.log(this.oldpwd, localStorage.id);
      checkoldpwd(this.oldpwd, localStorage.id).then((res) => {
        if (res.data.code == 0) {
          this.errmsg1 = "";
          this.flag = true;
        } else {
          this.errmsg1 = res.data.msg;
          this.flag = false;
        }
      });
    },
    // 修改密码
    editPwd() {
      if (this.flag) {
        editpwd(this.newpwd, localStorage.id).then((res) => {
          if (res.data.code) {
            this.$message.error(res.data.msg);
            this.flag=false
          } else {
            this.$message({
              message: res.data.msg,
              type: "success",
            });
            this.$router.push("/");
            this.flag=true
          }
        });
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
    margin-bottom: 20px;
  }
  p {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    span {
      width: 100px;
      text-align: right;
      margin-right: 20px;
      &:last-child {
        color: red;
        font-size: 14px;
        flex: 1;
        text-align: left;
        margin-left: 10px;
      }
    }
  }
}
</style>