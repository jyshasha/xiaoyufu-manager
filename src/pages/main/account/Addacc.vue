<template>
  <div id="con">
    <h4>添加账号</h4>
    <p>
      <span>账号</span>
      <el-input placeholder="请输入账号" v-model="uname" clearable style="width:400px"></el-input>
    </p>
    <p>
      <span>密码</span>
      <el-input placeholder="请输入密码" v-model="pwd" show-password style="width:400px"></el-input>
    </p>
    <p>
      <span>用户组</span>
      <el-select v-model="group" placeholder="请选择用户组">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </p>
    <p>
      <span></span>
      <el-button type="primary" @click="clickAddUser">添加</el-button>
      <el-button>重置</el-button>
    </p>
  </div>
</template>

<script>
import {usersadd} from '@/api/apis'
export default {
  data() {
    return {
      group: "",
      uname: "",
      pwd: "",
      options:[
        {
          value: "超级管理员",
          label: "超级管理员",
        },
        {
          value: "普通管理员",
          label: "普通管理员",
        }]
    };
  },
  methods:{
    clickAddUser(){
      /* for(let i=1;i<60;i++){
        usersadd('acc'+i,123456,i%2?'超级管理员':'普通管理员')
      } */
      usersadd(this.uname,this.pwd,this.group).then((res) => {
        if(res.data.code==0){
          this.$message({
          message: res.data.msg,
          type: 'success'
        });
        this.group= ""
        this.uname= ""
        this.pwd= ""
        }else{
          this.$message.error(res.data.msg);
        }
      })
    }
  }
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
    span {
      width: 100px;
      text-align: right;
      margin-right: 20px;
    }
  }
}
</style>