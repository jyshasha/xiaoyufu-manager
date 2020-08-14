<template>
  <div id="box">
    <div class="login_div">
      <h3>欢迎登录屋企系统</h3>
      <p>
        <el-input placeholder="请输入账号" prefix-icon="el-icon-user-solid" v-model="acc" clearable></el-input>
      </p>
      <p>
        <el-input placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="pwd" show-password></el-input>
      </p>
      <div class="errmsg">{{ errmsg }}</div>
      <p>
        <el-button type="primary" @click="clickLogin">登录</el-button>
      </p>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/apis";
export default {
  data() {
    return {
      acc: "", // 账号
      pwd: "", // 密码
      errmsg:"", // 错误提示信息
    };
  },
  methods: {
    clickLogin() {
      login(this.acc, this.pwd).then((res) => {
        if(res.data.code==0){
          localStorage.token=res.data.token
          localStorage.role=res.data.role
          localStorage.acc=this.acc
          localStorage.id=res.data.id
          this.$router.push('/main/index')
        }else{
          this.errmsg=res.data.msg
        }
      });
    },
  },
};
</script>

<style lang="less">
#box {
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg,#000,#106d8a);
  display: flex;
  justify-content: center;
  align-items: center;
  .login_div {
    width: 400px;
    height: 240px;
    h3 {
      color: #fff;
      margin-bottom: 20px;
      text-align: center;
    }
    p {
      &:first-of-type{
      margin-bottom: 20px;

      }
      .el-input__inner {
        background-color: #2d3a4b;
        color: #fff;
      }
      .el-button {
        width: 100%;
        margin-top: 10px;
      }
      
    }
    .errmsg{
      color: #F56C6C;
      font-size: 12px;
      margin-top: 5px;
      text-indent: 5px;
    }
  }
}
</style>