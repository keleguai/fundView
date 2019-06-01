import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/other/Index'
import Edit from '@/pages/user/Edit'
import Fund from '@/pages/fund/Fund'
import Login from '@/pages/user/Login'
import Rank from '@/pages/other/Rank'
import MyMoney from '@/pages/user/MyMoney'
import AllFund from '@/pages/fund/AllFund'
import StopStockTable from '@/pages/stock/StopStockTable'
import RegisterMore from '@/pages/user/RegisterMore'
import Manager from '@/pages/manager/Manager'
import Register from '@/pages/user/Register'
import ForgetPayPsw from '@/pages/user/ForgetPayPsw'
import ForgetPsw from '@/pages/user/ForgetPsw'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/edit',
      name: 'Edit',
      component: Edit
    },
    {
      path: '/register-more',
      name: 'RegisterMore',
      component: RegisterMore
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/forget-paypsw',
      name: 'ForgetPayPsw',
      component: ForgetPayPsw
    },
    {
      path: '/forget-psw',
      name: 'ForgetPsw',
      component: ForgetPsw
    },
    {
      path: '/fund/:id',
      name: 'Fund',
      component: Fund
    },
    {
      path: '/manager/:id',
      name: 'Manager',
      component: Manager
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/rank',
      name: 'Rank',
      component: Rank
    },
    {
      path: '/mymoney',
      name: 'MyMoney',
      component: MyMoney
    },
    {
      path: '/all-fund',
      name: 'AllFund',
      component: AllFund
    },
    {
      path: '/rank',
      name: 'Rank',
      component: Rank
    },
    {
      path: '/stop-stock',
      name: 'StopStock',
      component: StopStockTable
    },
  ]
})
