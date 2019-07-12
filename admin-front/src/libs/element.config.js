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
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Row,
  Col,
  Card,
  Table,
  Tag,
  TableColumn,
  DatePicker,
  Switch,
  Select,
  Option,
  MessageBox,
  Alert,
  Tree
} from 'element-ui'

Vue.use(Pagination)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Option)
Vue.use(Col)
Vue.use(Alert)
Vue.use(Switch)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(DatePicker)
Vue.use(Row)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Header)
Vue.use(Main)
Vue.use(Container)
Vue.use(Input)
Vue.use(Button)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Card)
Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
