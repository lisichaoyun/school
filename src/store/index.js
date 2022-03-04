import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'
Vue.use(Vuex)
const store=new Vuex.Store({
  state:state,
  getters:getters,
  mutations:mutations,//mutations相当于组件中的methods，但是它不能使用异步方法（定时器、axios）
  actions:actions//actions专门用来处理异步，实际修改状态值的，依然是mutations
})
export default store
