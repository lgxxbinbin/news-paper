import Vue from 'vue'
import Router from 'vue-router'
import LoanRegister from './views/LoanRegister.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'loan-register-page',
      component: LoanRegister
    },
    {
      path: '/approve',
      name: 'approve-page',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/ApprovePage.vue')
    },
    {
      path: '/repayment',
      name: 'repayment-page',
      component: () => import(/* webpackChunkName: "about" */ './views/RepaymentPage.vue')
    }
  ]
})
