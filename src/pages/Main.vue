<template>
  <el-container>
    <el-aside width="200px">
      <div class="title">
        <span>
          <i class="el-icon-dish"></i>
        </span>
        <b>外卖商家中心</b>
      </div>
      <el-menu
        :default-active="curhash"
        class="el-menu-vertical-demo"
        background-color="#304156"
        text-color="#fff"
        active-text-color="#3884D1"
        router
        unique-opened
      >
        <div v-for="item in powerarr" :key="item.url">
          <el-menu-item v-if="!item.children" :index="item.url">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>

          <el-submenu v-else :index="item.url">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item v-for="items in item.children" :key="items.childUrl" :index="items.childUrl">{{ items.childName }}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </div>

      </el-menu>
    </el-aside>
    <el-container>
      <el-header height="80px">
        <div class="breadNav">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="item in breadlist" :key="item">{{ item }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="welcome">
          欢迎您，
          <span>{{ acc }}</span>
          <i @click="clickPerson">
            <img :src="headimg" />
          </i>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { checktoken, accountinfo } from "@/api/apis";
export default {
  data() {
    return {
      acc: "",
      list: [
        {
          url: "/main/index",
          icon: "icon iconfont icon-index",
          // icon: "el-icon-setting",
          name: "后台首页",
          roles: ["super", "normal"]
        },
        {
          url: "/main/order",
          icon: "el-icon-document",
          name: "订单管理",
          roles: ["super", "normal"]
        },
        {
          url: "/main/items",
          icon: "el-icon-location",
          name: "商品管理",
          children: [
            {
              childUrl: "/main/items/listitems",
              childName: "商品列表",
            },
            {
              childUrl: "/main/items/Additems",
              childName: "商品添加",
            },
            {
              childUrl: "/main/items/classitems",
              childName: "商品分类",
            },
          ],
          roles: ["super", "normal"]
        },
        {
          url: "/main/shop",
          icon: "el-icon-setting",
          name: "店铺管理",
          roles: ["super"]
        },
        {
          url: "/main/account",
          icon: "el-icon-setting",
          name: "账号管理",
          children: [
            {
              childUrl: "/main/account/listacc",
              childName: "账号列表",
            },
            {
              childUrl: "/main/account/addacc",
              childName: "账号添加",
            },
            {
              childUrl: "/main/account/changeacc",
              childName: "修改密码",
            },
          ],
          roles: ["super"]
        },
        {
          url: "/main/sales",
          icon: "el-icon-setting",
          name: "销售统计",
          children: [
            {
              childUrl: "/main/sales/itemsale",
              childName: "商品统计",
            },
            {
              childUrl: "/main/sales/ordersale",
              childName: "订单统计",
            },
          ],
          roles: ["super"]
        }
      ],
      curhash:'',  // 当前的hash值
      headimg:'',   // 头像地址
      breadlist:[]  //面包屑导航循环的数组
    };
  },
  created() {
    // 判定用户登录时效
    checktoken(localStorage.token).then((res) => {
      if (res.data.code == 0) {
        this.acc = localStorage.acc;
        this.getaccountinfo()
      } else {
        this.acc = "请登录";
      }
    });

    // 让树菜单的选中样式与hash值一致
    this.curhash=this.$route.path

    // 接收头像上传成功后发来的通知，重新调用个人信息接口拿到新的头像地址
    this.$bus.$on('uploadFinish',()=>{
      this.getaccountinfo()
    })

    // 初始化面包屑导航
    this.breadlist=this.$route.meta.breadlist

  },
  computed: {
    // 权限加载
    powerarr(){
      return this.list.filter(item => item.roles.includes(localStorage.role))
    }
  },
  methods:{
    // 调用获取账号信息接口，拿到头像地址
    getaccountinfo(){
      accountinfo(localStorage.id).then(res=>{
        this.headimg = res.data.accountInfo.imgUrl
      })
    },

    // 点击头像跳转个人中心
    clickPerson(){
      this.$router.push("/main/personal")
    }
  },
  watch:{
    $route(to){
      this.breadlist=to.meta.breadlist
      this.curhash=to.path
    }
  } 
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}
.el-aside {
  overflow: visible;
  .title {
    line-height: 80px;
    color: #fff;
    text-align: center;
    span {
      display: inline-block;
      width: 40px;
      line-height: 40px;
      border-radius: 50%;
      background-color: #1296db;
      margin-right: 10px;
    }
  }
}
.el-header {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .welcome {
    i {
      display: inline-block;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
      vertical-align: middle;
      margin-left: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.el-aside {
  background-color: #304156;
}

.el-main {
  background-color: #e9eef3;
}

.el-menu {
  border: 0;
}
</style>