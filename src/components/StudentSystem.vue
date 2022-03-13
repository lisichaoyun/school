<template>
      <div>
        <div>
          <el-table
            :data="tableData"
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)">
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
                <el-button type="primary" :id="scope.$index" @click="centerDialogVisible = true;showinfo(scope.$index,scope.row)">选课</el-button>
                <el-dialog
                  title="提示"
                  :visible.sync="centerDialogVisible"
                  width="80%"
                  center>
                  <el-table :data="gridData">
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
                      prop="classTime"
                      label="上课时间">
                    </el-table-column>
                    <el-table-column
                      prop="locations"
                      label="上课地点">
                    </el-table-column>
                  </el-table>
                  <span>您确定要选择此课程吗</span>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="centerDialogVisible = false;confirmSelect(nowrow.index,nowrow.row)">确 定</el-button>
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
      tableData: [],
      centerDialogVisible: false,
      nowrow:{
        index:'',
        row:''
      },
      gridData:[],
      offeted:0
    };
  },
  methods: {
    showinfo(index,row){
      this.nowrow.index=index
      this.nowrow.row=row
      this.gridData=[
        {
          course:row.course,
          credit:row.credit,
          category:row.category,
          teacher:row.teacher,
          classTime:row.classTime,
          locations:row.locations
        }
      ]
    },
    confirmSelect(index, row) {
      this.axios('http://localhost:8080/api/submitCourse',{method:"get",params:{course:row.course,offeted:this.offeted,contentsNum:this.contentsNum}})
      .then(res=>{
          if (res.data.err==1){
            console.log("服务器出问题里")
          }else {
            let ch=document.getElementById(String(index))
            let par=ch.parentElement
            par.removeChild(ch)
            let el=document.createElement('span')
            el.innerText='选课成功'
            par.appendChild(el)
          }
      }).catch(e=>{
        console.log('本地请求出错'+e)
      })
    },
    handleCurrentChange(val) {
      this.loading=true
      this.offeted=0
      if(val!=1){
        this.offeted=(val-1)*this.contentsNum
      }
      this.axios.get('http://localhost:8080/api/Selectcourse',{params:{offet:this.offeted,number:this.contentsNum}})
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
    insertInfo(info){
      this.tableData=[]//清空这页原本内容
      for (let i=0;i<info.length;i++){//插入一页信息
        this.tableData.push({
          course:info[i].course,
          credit:info[i].credit,
          category:info[i].category,
          teacher:info[i].teacher,
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
