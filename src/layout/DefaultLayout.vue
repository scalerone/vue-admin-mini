<template>
  <div class="content-wrapper">

    <template v-if="mode == 'login'">
      <router-view></router-view>
    </template>

    <el-container id="layout" v-else>

      <el-header class="top-header">
        <div class="header-logo">
          <img src="../assets/img/header_icon.png" alt="">
        </div>
        <div class="header-content">
          <div class="header-content-left">
            <span>后台管理系统</span>
          </div>

          <div class="header-content-right" @click="logout">
            <el-tooltip effect="dark" content="登出" placement="top-start">
              <div>
                <span style="margin-right: 10px;">{{username}}</span>
                <span>
                  <i class="fas fa-caret-down fa-lg"></i>
                </span>
              </div>
            </el-tooltip>
          </div>

        </div>
      </el-header>

      <el-container class="main-container">

        <el-aside class="main-container-side" width="280px">

          <el-menu
                  default-active="/"
              class="main-side-menu"
              @select="handleSideMenuOpen"
          >
            <el-menu-item index="/">
              <template slot="title">
                <div>
                  <span>首页</span>
                </div>
              </template>
            </el-menu-item>

          </el-menu>

        </el-aside>

        <el-container class="main-container-content">
          <el-main>
            <div>
              <router-view v-if="isRouterAlive"></router-view>
            </div>
          </el-main>
        </el-container>
      </el-container>

    </el-container>
  </div>
</template>

<script>
  import router from "../router";
  // import http from "../lib/http"

  export default {
    name: "DefaultLayout",

    data () {
      return {
        mode: 'login',
        isRouterAlive: true,
      }
    },

    methods: {

      reload () {
        this.isRouterAlive = false;
        this.$nextTick(function () {
          this.isRouterAlive = true;
        });
      },

      async logout () {
        try {
          // TODO API添加
          // await http.del("/api/token");
          this.$message.success('登出成功');
          sessionStorage.removeItem('-_token_-');
          sessionStorage.removeItem('-_username_-');
          this.$router.push('/login');
        }  catch (e) {
          this.$message.error(e.message);
        }
      },

      handleSideMenuOpen (indexPath) {
        console.log('indexPath %s ', indexPath);
        this.reload();
        this.$router.push(indexPath);
      }

    },

    computed: {
      username: {
        cache: false,
        get: function () {
          let username = sessionStorage.getItem('-_username_-');
          if (username) {
            return username;
          } else {
            return '系统管理员';
          }
        },
      }
    },

    created() {
      router.afterEach((to) => {
        if (to.path == '/login') {
          this.mode = 'login';
        } else {
          this.mode = 'main'
        }
      })
    }
  }
</script>

<style scoped lang="less">

  .content-wrapper {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
  }

  #layout {
    height: 100%;
    width: 100%;
    margin: 0 auto;
  }

  .el-header {
    color: #666666;
    font-weight: 600;
    font-style: normal;
    font-size: 18px;
    background-color: #FFF;
    padding: 5px 10px;
    border-right: solid 1px #ccc;
    line-height: 36px;

    &>span {
      display: inline-block;
    }
  }

  .el-main {
    background-color: rgb(245, 245, 246);
    padding: 0;
    overflow-y: auto;

    &>div {
      height: 100%;
      overflow-y: auto;
      background-color: #FFFFFF;
    }
  }

  .top-header {
    display: flex;
    padding: 10px 0;
    height: 80px !important;
    line-height: 80px;
    font-family:PingFangSC-Medium,PingFang SC;
    color: #666;
    .header-logo {
      & > img {
        width: 60px;
        height: 60px;
        margin-left: 50px;
      }
    }

    .header-content {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;

      .header-content-left {
        margin-left: 26px;
      }

      .header-content-right{
        font-size: 16px;
        margin-right: 20px;
        cursor: pointer;
      }
    }
  }

  .main-container {
    margin: 20px;

    .main-container-side {
      background:rgba(255, 255, 255, 1);
      font-size: 18px;
      margin-right: 20px;

      .main-side-menu {
        text-align: center;
        background-color: #FFF;
      }
    }

    .main-container-content {
      .el-header {
        background-color: #F5F5F6;
        padding: 0;
        border: none;
      }
    }
  }
</style>

<style lang="less">
  html, body {
    background:rgba(245, 245, 246, 1);
    font-family:PingFangSC-Regular,PingFang SC;
  }

  .main-container {
    .main-container-side {
      .el-submenu__title {
        font-size: 18px;
        letter-spacing: 2px;
      }

      .el-submenu__title:hover {

      }

      .el-icon-arrow-down:before {
        content: '';
      }

      .el-menu-item{
        font-size: 18px;
        letter-spacing: 2px;
      }
      .el-menu-item.is-active {
        color: #303133;
        background-color: #ddd;
      }




    }
  }
</style>
