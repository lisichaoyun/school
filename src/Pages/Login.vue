<template>
  <div class="cover">
    <el-row>
      <el-col
        :xs="{ span: 24, offset: 0 }"
        :sm="{ span: 16, offset: 4 }"
        :md="{ span: 4, offset: 10 }"
      >
        <el-form :model="ruleForm" status-icon ref="ruleForm" class="demo-ruleForm" label-position="top">
          <el-form-item prop="username" label="登录">
            <el-input v-model="ruleForm.username" autocomplete="on"
                      placeholder="Username"
            ></el-input>
          </el-form-item>

          <el-form-item prop="pass">
            <el-input type="password" v-model="ruleForm.pass" placeholder="Password"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm" style="width: 100%">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    </div>
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
    }
  }
}
</script>
<style scoped>
.cover::before{
  content: '';
  width: 100%;
  height: 100%;
  background-image: url('../../static/img/bg.jpg');
  background-size: cover;
  position: absolute;
  z-index: -1;
  background-repeat: no-repeat;
  filter: blur(2px);
  top:0;
  left:0;
}
</style>
