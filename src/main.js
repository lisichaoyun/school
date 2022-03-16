// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//axios
import axios from 'axios'
import VueAxios from 'vue-axios'

//element
import {
  Button,
  Col, Descriptions, DescriptionsItem, Dialog,
  Form,
  FormItem, Image,
  Input, Loading, Menu, MenuItem, MenuItemGroup, Pagination,
  Progress,
  Result,
  Row, Submenu, Table, TableColumn, Tag
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';

Vue.use(VueAxios, axios)

Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Result)
Vue.use(Progress)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Descriptions)
Vue.use(DescriptionsItem)
Vue.use(Tag)
Vue.use(Dialog)
Vue.use(Image)
Vue.use(Loading.directive)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
