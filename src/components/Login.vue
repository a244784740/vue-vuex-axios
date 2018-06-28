<template>
    <div class="content">
        <div class="login-container">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm">
                <el-form-item prop="name">
                    <el-input v-model="ruleForm.name"  placeholder="邮箱/手机号"></el-input>
                </el-form-item>
                <el-form-item prop="name">
                    <el-input v-model="ruleForm.pwd" placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item prop="name">
                    <el-input v-model="ruleForm.code" placeholder="验证码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" @click="submitForm('ruleForm')" class="action-btn">登录</el-button>
                </el-form-item>

                <el-form-item>
                    <input id="agreement" class="agreement" type="checkbox" name="agreement" checked="checked">
                    <label for="agreement">我已阅读并同意
                        <a href="https://www.toutiao.com/user_agreement/" target="_blank">用户协议</a>
                        和
                        <a href="https://www.toutiao.com/privacy_protection/" target="_blank">隐私条款</a>
                    </label>
                </el-form-item>
                
            </el-form>
        </div>
    </div>
</template>


<style scoped>

.content {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #eee;
    background-image: url(//s3b.pstatp.com/toutiao/resource/ntoutiao_web/static/image/login/login_bg_7584f6a.png);
    background-repeat: no-repeat;
    background-position: top center;
}

.login-container {
    position: absolute;
    top: 230px;
    left: 50%;
    margin-left: -200px;
    width: 300px;
    padding: 28px 50px 38px;
    background-color: #fff;
    background-color: rgba(255,255,255,.9);
    
}

.action-btn {
    color: #fff;
    font-size: 18px;
    width: 300px;
    text-align: center;
    background-color: #f85959;
    cursor: pointer;
}

.input {
    margin-bottom: 5px;
}



</style>


<script>
import http from "../api/http.js";  
import ApiSetting from "../api/ApiSetting.js";


export default {

    data() {
      return {
        checked:true,
        ruleForm: {
          name: '',
          pwd:'',
          code:'',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          
        },
        rules: {
          name: [
            
          ],
          region: [
          ],
          date1: [
          ],
          date2: [
          ],
          type: [
          ],
          resource: [
          ],
          desc: [
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              //登陆请求
               http(ApiSetting.mockLogin,{})  
                .then((res)=>{  
                    if (res.status == 200) {
                        this.$message({
                            showClose: true,
                            message: '登录成功',
                            type: 'success'
                        });
                        this.$router.push('/index');
                    }
                })
            
            // this.$router.push('/index');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  
    
}
</script>
