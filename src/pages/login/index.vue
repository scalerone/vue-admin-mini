<template>
  <div class="content-panel">
    <div class="login-panel">
      <el-form class="login-form">
        <div class="login-form-header">
          <div><i class="fab fa-envira" style="color: #62b77a"></i></div>
          <div style="margin-top: 40px;color: #62b77a;">后台管理系统</div>
        </div>

        <div style="margin-bottom: 20px">
          <el-input autocomplete="off" placeholder="请输入用户名" prefix-icon="el-icon-user" v-model.trim="username" @keydown.enter.native="doLogin"></el-input>
        </div>

        <div style="margin-bottom: 20px">
          <el-input autocomplete="off" placeholder="请输入密码" prefix-icon="el-icon-lock" v-model.trim="password"
                    show-password @keydown.enter.native="doLogin"></el-input>
        </div>

        <div>
          <el-button type="primary" @click="doLogin">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import userData from "@/lib/userData";

  export default {
    data() {
      return {
        username: '',
        password: ''
      }
    },

    methods: {
       async doLogin() {
        if (!this.username) {
          this.$message.error('用户名不能为空');
          return
        }

        if (!this.password) {
          this.$message.error('密码不能为空');
          return
        }

        try {
          await userData.login(this.username, this.password);
          let url = this.$route.params.redirect || this.$route.query.redirect || "/";
          this.$router.push(url);
        } catch (err) {
          this.$message.error(err);
          sessionStorage.removeItem('-_token_-');
          sessionStorage.removeItem('-_username_-');
          this.$router.push('/login');
        }

      }
    }
  }
</script>

<style scoped lang="less">
  .content-panel {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    justify-items: center;
    align-items: center;
    align-content: center;
    background-color: #f2f2f2;

    .login-panel {
      width: 100%;
      height: 100%;
      min-height: 750px;
      max-height: 950px;
      background-color: #f2f2f2;
      background-image: url("../../assets/login_bg.jpg");
      background-position: center bottom;
      background-repeat: no-repeat;
      text-align: center;
      overflow-y: hidden;

      .login-form {
        width: 500px;
        height: 580px;
        background-color: #FFFFFF;
        border-radius: 3px;
        padding: 0 60px;
        box-shadow: #cccccc 1px 1px 5px;
        margin: 50px auto;

        .login-form-header {
          font-size: 36px;
          color: rgb(0, 121, 254);
          padding: 60px 0 80px 0;
          font-weight: 600;

          i {
            font-weight: 400;
            font-style: normal;
            font-size: 72px;
            color: rgb(0, 121, 254);
          }
        }

        .el-button {
          width: 100%;
          height: 50px;
        }
      }
    }
  }
</style>

<style lang="less">
  .login-form {
    .el-input__inner {
      height: 50px;
      line-height: 50px;
    }
  }

</style>
