<template>
  <div class="login_con">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-width="0px" class="login_form">
          <h3 class="title">合同管理系统</h3>
          <el-form-item prop="accountName">
              <span class="svg_container"><i class="fa fa-user-o fa-lg"></i></span>
              <el-input name="accountName" type="text" v-model="loginForm.accountName" autoComplete="on" placeholder="账号"></el-input>
          </el-form-item>
          <el-form-item prop="password" class="password">
              <span class="svg_container"><i class="fa fa-lock fa-lg"></i></span>
              <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" style="width: 100%;" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
          </el-form-item>
      </el-form>
  </div>
</template>

<script>
export default {
  data() {
      const validateName = (rule, value, callback) => {
          if(value.length < 1) {
              callback(new Error('请填写账号'));
          } else {
              callback();
          }
      };
      const validatePass = (rule, value, callback) => {
          if(value.length < 6) {
              callback(new Error('密码不能小于6位'));
          } else {
              callback();
          }
      }
      return {
          loginForm: {
              accountName: '',
              password: ''
          },
          loginRules: {
              accountName: [
                  { required: true, trigger: 'blur', validator: validateName }
              ], 
              password: [
                  { required: true, trigger: 'blur', validator: validatePass }
              ]
          },
          loading: false
      }
  },
  methods: {
      handleLogin() {
          let _this = this;
          this.$refs.loginForm.validate(valid => {
              if(valid){
                  _this.loading = true;
                  this.$store.dispatch('Login', this.loginForm).then((res) => {
                    _this.loading = false;
                    if(res.data.Result){
                        _this.$message.success('登录成功！');
                        _this.$router.push({path: '/'})
                    } else {
                        _this.$message.error(res.data.Message);
                    }
                       
                  }).catch(err => {
                      _this.loading = false;
                    //   console.log(err)
                      this.$message({
                        message: "登录失败: 未知的用户名或错误密码或服务器错误！",
                        type: 'error',
                        duration: 5 * 1000
                      });;
                  })
              } else {
                  return false;
              }
          })
      }
  }
}
</script>
 
 <style lang="less" scoped>
 .login_con{
     width: 100%;
     height: 100%;
     background-color: #2d3a4b;
     .login_form{
         width: 400px;
         padding: 30px 35px;
         position: absolute;
         left: 50%;
         top: 50%;
         transform: translate(-50%, -60%);
         .title{
             font-size: 26px;
             color: #eeeeee;
             margin-bottom: 40px;
             text-align: center;
         }
         .svg_container{
             display: inline-block;
             padding: 5px 0px 6px 12px;
             width: 36px;
             color: #889aa4;
             text-align: center;
         }
     }
 }
 </style>
 <style lang="less">
 .login_con{
     .login_form{
        .el-form-item{
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            .el-form-item__content{
                position: relative;
                .el-input{
                    display: inline-block;
                    height: 47px;
                    width: 85%;
                    input{
                        background: transparent;
                        border: 0;
                        border-radius: 0;
                        height: 100%;
                        color: #ffffff;
                        &:-webkit-autofill{
                            -webkit-box-shadow: 0 0 0px 1000px #293444 inset;
                            -webkit-text-fill-color: #fff !important;
                        }
                    }
                }
            }
        }
     }
 }

 </style>
 