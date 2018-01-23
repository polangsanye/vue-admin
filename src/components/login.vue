<template>
    <el-form :model="ruleForm" :rules="rules" ref="myForm" class="login-container">
        <h3 class="title">系统登录</h3>
        <el-form-item>
            <el-input type="text" v-model="ruleForm.account" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item>
            <el-input type="password" v-model="ruleForm.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-checkbox v-model="checked" class="remember">记住密码</el-checkbox>
        <el-form-item :loading="loading">
            <el-button style="width: 100%" type="primary" @click="handleSubmit">登录</el-button>
            <!--<el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>-->
        </el-form-item>
    </el-form>
</template>

<script>
  import { requestLogin } from '../api/api/api'
  export default {
    data() {
      return {
        loading: false,
        checked: true,
        ruleForm: {
          account: 'admin',
          password: '123456'
        },
        rules: {
          account: [
            {require: true, message: '请输入账号', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleSubmit(){
        this.$refs.myForm.validate((value) => {
          if (value) {
            this.loading = true;
            let loginParams = {username: this.ruleForm.account, password: this.ruleForm.password};
            requestLogin(loginParams).then((data) => {
              this.loading = false;
              console.log(data);
              let {msg, code, user} = data;
              if (code != 200) {
                this.$message({
                  message: msg,
                  type: 'error'
                })
              } else {
                sessionStorage.setItem('user', JSON.stringify(user))
                this.$router.push({path: '/table'})
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      }
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
    .login-container {
        width: 350px;
        padding: 35px 35px 15px 35px;
        position: absolute;
        top: 50%;
        left: 50%;
        background: #fff;
        border: 1px solid #eaeaea;
        border-radius: 5px;
        box-shadow: 0 0 25px #cac6c6;
        transform: translate(-50%, -50%);
        .title {
            margin: 0 auto 40px auto;
            text-align: center;
            color: #505458;
        }
        .remember {
            margin: 0 0 35px 0;
        }
    }
</style>