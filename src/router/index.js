import Vue from 'vue'
import Router from 'vue-router'
import HelloComing from '../Pages/HelloComing'
import Register from '../Pages/Register'
import Home from '../Pages/Home'
import Login from "../Pages/Login";
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/helloComing',
      name: 'HelloComing',
      component: HelloComing
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path:"/home",
      name:"Home",
      component:Home
    },
    {
      path:'/',
      name:'Login',
      component:Login
    }
  ]
})
