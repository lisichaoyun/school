<template>
<el-row>
  <el-col
    :xs="{ span: 24, offset: 0 }"
    :sm="{ span: 16, offset: 4 }"
    :md="{ span: 8, offset: 8 }"
  >
    <el-form :model="ruleForm" status-icon ref="ruleForm" class="demo-ruleForm">
      <el-form-item label="账号" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="on"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-col>
</el-row>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        pass: '',
        username: ''
      }
    };
  },
  methods: {
    submitForm() {
        this.axios.post('http://localhost:8080/api/login',{username:this.ruleForm.username,password:this.ruleForm.pass}).
          then(res=>{
            if (res.data.err==0){
              this.$router.push({
                name: "Home",

              });
            }else {
              console.log(res.data.msg)
            }
        }).catch(err=>{
          console.log('axios error'+err)
        })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>

</style>
