<template>
  <el-row type="flex">
    <el-col
      :xs="{span: 5, offset: 0}"
      :sm="{span: 4, offset: 0}"
      :md="{span: 3, offset: 0}"
    >
      <el-menu default-active="2"
               class="el-menu-vertical-demo"
               background-color="#545c64"
               text-color="#fff"
               active-text-color="#ffd04b"
               align="left"
               @select="ControlPage"
      >

        <el-menu-item index="1">
          <i class="el-icon-s-home hidden-xs-only"></i>
          <span slot="title">首页</span>
        </el-menu-item>

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-s-data hidden-xs-only"></i>
            <span slot="title">学生系统</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1"><i class="el-icon-s-check hidden-xs-only"></i><span>选课</span></el-menu-item>
            <el-menu-item index="2-2"><i class="el-icon-s-data hidden-xs-only"></i><span>信息</span></el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-menu-item index="3">
          <i class="el-icon-key hidden-xs-only"></i>
          <span slot="title">修改密码</span>
        </el-menu-item>
      </el-menu>
    </el-col>

    <el-col
      :xs="{span: 19, offset: 0}"
      :sm="{span: 20, offset: 0}"
      :md="{span: 21, offset: 0}"
    >
      <component :is="content"></component>
    </el-col>
  </el-row>
</template>

<script>
import StudentSystem from '../components/StudentSystem'
import StudentInfo from "../components/StudentInfo";
export default {
components:{StudentSystem,StudentInfo},
name: "Home",
  data() {
    return {
      username:this.$route.params.username,
      content:'',
      pages:{
        '1':'',
        '2-1':'StudentSystem',
        '2-2':'StudentInfo',
        '3':''
      }
    };
  },
  methods: {
    ControlPage(index,indexPath){//此方法可以设置多级菜单
      this.content=this.pages[index]
    }
  },

}
</script>

<style scoped>
.el-menu-vertical-demo{
  min-height: 478px;
  z-index: 5;
  overflow: hidden;
}
@media screen and (max-width: 420px){/*为少数屏幕更小的设计*/
  span{
    font-size: small;
  }
}
@media screen and (max-width: 300px){/*为少数屏幕更小的设计*/
  span{
    writing-mode: vertical-rl;
    font-size: xx-small;
    margin-left: -50%;
  }
}
</style>
