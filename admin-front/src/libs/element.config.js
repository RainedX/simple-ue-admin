import Vue from 'vue'
import {
  Pagination,
  Dialog,
  Button,
  Loading,
  Input,
  Message,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Notification,
  Aside,
  Container,
  Header,
  Main,
  Footer,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Row,
  Col
} from 'element-ui'

Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Col)
Vue.use(Row)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Container)
Vue.use(Input)
Vue.use(Button)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Form)
Vue.use(FormItem)

Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
