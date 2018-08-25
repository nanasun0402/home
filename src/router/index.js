import Vue from 'vue'
import Router from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css'

import {
  Row,
  Col,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Container,
  Header,
  Main,
  Footer,
  Input,
  Button,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Carousel,
  CarouselItem,
  Card,
  Tabs,
  TabPane,
  Dialog,
  Form,
  FormItem,
  Table,
  TableColumn,
  InputNumber,
  Radio,
  Select,
  Option,
  Loading,
  MessageBox,
  Message,
  Rate,
  Steps,
  Step,
  Switch,
  Upload,
  Badge
} from 'element-ui'

Vue.use(Router)
Vue.use(Row)
Vue.use(Col)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Input)
Vue.use(Button)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Card)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(InputNumber)
Vue.use(Radio)
Vue.use(Select)
Vue.use(Option)
Vue.use(Rate)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Switch)
Vue.use(Upload)
Vue.use(Badge)
Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message

import Home from '@/components/Home'
import Hello from '@/components/Hello'
import DailyGoods from '@/components/goods/DailyGoods'
import SearchGoods from '@/components/goods/SearchGoods'
import GoodsDetail from '@/components/goodsdetail/GoodsDetail'
import ShoppingCart from '@/components/shoppingCart/ShoppingCart'
import GoodsOrder from '@/components/order/GoodsOrder'
import MyAddress from '@/components/address/MyAddress'
import MyCollection from '@/components/collection/MyCollection'
import MyInformation from '@/components/information/MyInformation'
import MyOrder from '@/components/order/MyOrder'
import SubmitOrder from '@/components/order/SubmitOrder'
import Comment from '@/components/comment/Comment'

export default new Router({
  routes: [
    {
      path: '/home',
      redirect: '/'
    },
    {
      path: '/',
      name: '',
      component: Home,
      children: [
        {
          path: 'hello',
          component: Hello
        },
        {
          path: 'dailygoods',
          name: 'dailygoods',
          component: DailyGoods
        },
        {
          path: 'bedroomgoods',
          name: 'bedroomgoods',
          component: DailyGoods
        },
        {
          path: 'bathroomgoods',
          name: 'bathroomgoods',
          component: DailyGoods
        },
        {
          path: 'cookroomgoods',
          name: 'cookroomgoods',
          component: DailyGoods
        },
        {
          path: 'saloongoods',
          name: 'saloongoods',
          component: DailyGoods
        },
        {
          path: 'allgoods',
          name: 'allgoods',
          component: DailyGoods
        },
        {
          path: 'goodsdetail',
          name: 'goodsdetail',
          component: GoodsDetail
        },
        {
          path: 'shoppingCart',
          name: 'shoppingCart',
          component: ShoppingCart
        },
        {
          path: 'goodsOrder',
          name: 'goodsOrder',
          component: GoodsOrder
        },
        {
          path: 'myAddress',
          name: 'myAddress',
          component: MyAddress
        },
        {
          path: 'myCollection',
          name: 'myCollection',
          component: MyCollection
        },
        {
          path: 'myInformation',
          name: 'myInformation',
          component: MyInformation
        },
        {
          path: 'myOrder',
          name: 'myOrder',
          component: MyOrder
        },
        {
          path: 'submitOrder',
          name: 'submitOrder',
          component: SubmitOrder
        },
        {
          path: 'comment',
          name: 'comment',
          component: Comment
        },
        {
          path: 'searchGoods',
          name: 'searchGoods',
          component: SearchGoods
        }
    ]
    }
  ]
})
