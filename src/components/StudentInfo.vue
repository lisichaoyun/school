<template>
<div style="opacity: 0.9">
  <el-descriptions title="学生信息" style="background-color:rgb(255,255,255)">
    <el-descriptions-item label="姓名">{{realName}}</el-descriptions-item>
    <el-descriptions-item label="手机号">{{phone}}</el-descriptions-item>
    <el-descriptions-item label="班级">{{Class}}</el-descriptions-item>
    <el-descriptions-item label="班级">{{studyCode}}</el-descriptions-item>
    <el-descriptions-item label="已选课程">
      <template v-for="course in courseName">
        <el-tag size="medium">{{course}}</el-tag>
      </template>
    </el-descriptions-item>
  </el-descriptions>
</div>
</template>

<script>
export default {
  name: "StudentInfo",
  data(){
    return {
      realName:'',
      phone:'',
      Class:'',
      studyCode:'',
      courseName:[]
    }
  },
  beforeMount() {
    this.axios('http://localhost:8080/api/studentInfo',).then(res=>{
      if (res.data.err==0){
        this.realName=res.data.msg[0].realname
        this.phone=res.data.msg[0].phone
        this.Class=res.data.msg[0].class
        this.studyCode=res.data.msg[0].studyCode
        let courseStr=(res.data.msg[0].selectedCourse).trim()
        if(courseStr==''){
          this.courseName=['您没有选择任何课程']
        }else {
          this.courseName=courseStr.split(' ')
        }
      }else{
        console.log(res.data.msg)
      }
    }).catch(err=>{
        console.log(err)
    })
  }
}
</script>

<style scoped>

</style>
