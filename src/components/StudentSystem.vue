<template>
      <div>
        <div>
          <el-table
            :data="tableData"
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            :row-class-name="tableRowClassName">
            <el-table-column
              prop="course"
              label="课程"
              >
            </el-table-column>
            <el-table-column
              prop="credit"
              label="学分"
              >
            </el-table-column>
            <el-table-column
              prop="category"
              label="类别">
            </el-table-column>
            <el-table-column
              prop="teacher"
              label="任课老师">
            </el-table-column>
            <el-table-column
              prop="limited"
              label="限选">
            </el-table-column>
            <el-table-column
              prop="selected"
              label="已选">
            </el-table-column>
            <el-table-column
              prop="Not"
              label="未选">
            </el-table-column>
            <el-table-column
              prop="classTime"
              label="上课时间">
            </el-table-column>
            <el-table-column
              prop="locations"
              label="上课地点">
            </el-table-column>
            <el-table-column
              prop="condition"
              label="状态">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button type="success" disabled v-if="selectState">已选</el-button>
                <el-button type="primary" @click="centerDialogVisible = true" v-else>选课</el-button>
                <el-dialog
                  title="提示"
                  :visible.sync="centerDialogVisible"
                  width="30%"
                  center>
                  <span>您确定要选择此课程吗</span>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="centerDialogVisible = false;confirmSelect(scope.$index, scope.row)">确 定</el-button>
                  </span>
                </el-dialog>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage3"
            :page-size="contentsNum"
            layout="prev, pager, next, jumper,total"
            :total="infonumber">
          </el-pagination>

        </div>
       </div>
</template>

<script>
export default {
  name: "StudentSystem",
  data() {
    return {
      loading: false,
      contentsNum:30,//每一页多少条内容,自定义
      infonumber:0,//动态生成
      currentPage3: 1,//默认页码
      activeName: 'first',
      tableData: [],
      centerDialogVisible: false,
      selectState:false
    };
  },
  methods: {
    confirmSelect(index, row) {
      this.axios('http://localhost:8080/api/submitCourse',{method:"get",params:{course:row.course}})
      .then(res=>{
          if (res.data.err==1){
            console.log("服务器出问题里")
          }else {
            this.selectState=true
          }
      }).catch(e=>{
        console.log(e)
      })
    },
    handleCurrentChange(val) {
      this.loading=true
      let offeted=0
      if(val!=1){
        offeted=(val-1)*this.contentsNum
      }
      this.axios.get('http://localhost:8080/api/Selectcourse',{params:{offet:offeted,number:this.contentsNum}})
      .then(res=>{
        if (res.data.err==1){
          console.log(res.data.msg)
        }
        this.insertInfo(res.data.msg)
      })
      .catch(e=>{
        console.log('axios错误'+e)
      }).finally(()=>{
        this.loading=false
      })
    },
    tableRowClassName({row, rowIndex}) {
      if (this.tableData[rowIndex].condition=='已满') {
        return 'danger-row';
      } else{
        return 'success-row';
      }
      return '';
    },
    insertInfo(info){
      this.tableData=[]//清空这页原本内容
      for (let i=0;i<info.length;i++){//插入一页信息
        this.tableData.push({
          course:info[i].course,
          credit:info[i].credit,
          category:info[i].category,
          teacher:info[i].teacher,
          limited:(info[i].limited.split(',')).join(' '),
          selected:info[i].SelectNumer,
          Not:info[i].Capcity-info[i].SelectNumer,
          classTime:info[i].classTime,
          locations:info[i].locations,//客户端信息
          condition:(info[i].Capcity-info[i].SelectNumer)>0?'未满':'已满'
        })
      }
    }
  },
  beforeMount() {
    this.axios.get('http://localhost:8080/api/Selectcourse',{params:{offet:0,number:this.contentsNum}})
    .then(res=>{
      this.insertInfo(res.data.msg)
    }).catch(err=>{
      console.log('axiosu程序错误'+err)
    })
    this.axios.get('http://localhost:8080/api/courseNum').then(res=>{
        this.infonumber=res.data.msg
    }).catch(err=>{
      console.log('axiosu程序错误'+err)
    })
  }
}
</script>

<style scoped>

</style>
