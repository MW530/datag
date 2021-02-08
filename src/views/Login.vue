<!--  -->
<template>
  <div class="login">
    <div class="loginWrap">
      <el-input v-model="user.name" placeholder="请输入内容"></el-input>
      <el-input
        placeholder="请输入密码"
        v-model="user.password"
        show-password
      ></el-input>
      <br />
      <el-button type="primary" @click="login">登录</el-button>
    </div>
  </div>
</template>

<script>
import { userLogin } from '../mock/index'

export default {
  name: 'login',
  data() {
    return {
      user: {
        name: '',
        password: '',
      },
      loginExtra: {
        time: '',
        address: '',
        device: '',
        status: '',
        activeTime: '',
      },
    }
  },

  mounted() {
  },

  methods: {
    login() {
      // 从插件获取
      console.log('login')
      this.loginExtra = {
        time: '',
        address: '',
        device: '',
        status: '',
        activeTime: '',
      }
      userLogin(this.user)
    },
  },
}
</script>
<style scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background: url('../assets/img/bg.jpg');
  background-size: 100% 100%;
}
.loginWrap {
  position: fixed;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 400px;
  height: 250px;
  padding-top: 70px;
  text-align: center;
  background-color: rgba(76, 219, 124, 0.274);
  border-radius: 10px;
}
.el-input {
  margin: 10px 0;
  width: 250px;
}
</style>