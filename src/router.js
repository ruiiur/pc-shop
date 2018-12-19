import Vue from 'vue'
import Router from 'vue-router'
import { routerMode } from './common/env'
import tools from './common/tools'

Vue.use(Router)
    // 这是首页
// const home = r => require.ensure([], () => r(require('@/pages/home.vue')), 'home')
    //供应商店铺页面
const supplier = r => require.ensure([], () => r(require('@/pages/supplier.vue')), 'supplier')
    //供应商境外游列表页面
const supplierAbroadList = r => require.ensure([], () => r(require('@/pages/supplier-abroad-list.vue')), 'supplierAbroadList')
    //供应商国内游列表页面
const supplierDomesticList = r => require.ensure([], () => r(require('@/pages/supplier-domestic-list.vue')), 'supplierDomesticList')
    // 供应商周边游列表页面
const supplierSurroundingList = r => require.ensure([], () => r(require('@/pages/supplier-surrounding-list.vue')), 'supplierSurroundingList')
    // 登录页面
const login = r => require.ensure([], () => r(require('@/pages/login.vue')), 'login')
	//这是系统用户登陆页面
const loginsystemUsers = r => require.ensure([], () => r(require('@/pages/login-system-users.vue')), 'loginsystemUsers')
    // 注册页面
const register = r => require.ensure([], () => r(require('@/pages/register.vue')), 'register')
    // 找回密码页面
const findPassword = r => require.ensure([], () => r(require('@/pages/find-password.vue')), 'findPassword')
    // 订单查询
const orderSearch = r => require.ensure([], () => r(require('@/pages/order-search.vue')), 'orderSearch')
    // 搜索店铺
const searchStore = r => require.ensure([], () => r(require('@/pages/search-store.vue')), 'searchStore')
    // 个人资料页面
const personalData = r => require.ensure([], () => r(require('@/pages/personal-data.vue')), 'personalData')
    // 修改密码页面
const resetPassword = r => require.ensure([], () => r(require('@/pages/reset-password.vue')), 'resetPassword')
    // 修改密码成功页面
const resetSuccess = r => require.ensure([], () => r(require('@/pages/reset-success.vue')), 'resetSuccess')
    // 详情页面
const details = r => require.ensure([], () => r(require('@/pages/details.vue')), 'details')
    // 预定页面
const order = r => require.ensure([], () => r(require('@/pages/order.vue')), 'order')
    // 需求单
const demand = r => require.ensure([], () => r(require('@/pages/demand.vue')), 'demand')
    //这是预定进程页面
const process = r => require.ensure([], () => r(require('@/pages/process.vue')), 'process')
    // 空白页
const blank = r => require.ensure([], () => r(require('@/pages/blank.vue')), 'blank')
    // 支付页
const pay = r => require.ensure([], () => r(require('@/pages/pay.vue')), 'pay')
    // 订单详情页
const orderDetails = r => require.ensure([], () => r(require('@/pages/order-details.vue')), 'orderDetails')
    // 最新报价
const quote = r => require.ensure([], () => r(require('@/pages/quote.vue')), 'quote')
    // 全局搜索
const supplierList= r => require.ensure([], () => r(require('@/pages/supplier-list.vue')), 'supplierList')
    // 支付成功页面
const payResult= r => require.ensure([], () => r(require('@/pages/pay-result.vue')), 'payResult')
    // 定制游详情页面
const demandDetails= r => require.ensure([], () => r(require('@/pages/demand-details.vue')), 'demandDetails')
    // 方案列表
const planList= r => require.ensure([], () => r(require('@/pages/plan-list.vue')), 'planList')
    // 确认方案
const confirmPlan= r => require.ensure([], () => r(require('@/pages/confirm-plan.vue')), 'confirmPlan')
    // 优惠券页面
const coupon = r => require.ensure([], () => r(require('@/pages/coupon.vue')), 'coupon')
    // 优惠券支付页面
const couponPay = r => require.ensure([], () => r(require('@/pages/coupon-pay.vue')), 'couponPay')
// 首页跳转页面
const jump = r => require.ensure([], () => r(require('@/pages/jump.vue')), 'jump')
const test = r => require.ensure([], () => r(require('@/pages/test.vue')), 'jump')

const router = new Router({
    mode: routerMode,
    routes: [{
            path: '/',
            redirect: '/search-store'
        },
        // {
        //     path: '/home',
        //     component: home,
        //     meta: {
        //         title: '首页',
        //     },
        // },
        {
            path: '/supplier',
            component: supplier,
            meta: {
                title: '首页',
            },
        },
        {
            path: '/supplier-abroad-list',
            component: supplierAbroadList,
            meta: {
                title: '境外游',
            },
        },
        {
            path: '/supplier-domestic-list',
            component: supplierDomesticList,
            meta: {
                title: '国内长线',
            },
        },
        {
            path: '/supplier-surrounding-list',
            component: supplierSurroundingList,
            meta: {
                title: '周边短线',
            },
        },
        {
            path: '/login',
            meta: {
                title: '登录',
            },
            component: login,
           
        },
        {
            path: '/login-system-users',
            meta: {
                title: '系统用户登录',
            },
            component: loginsystemUsers,
           
        },
        {
            path: '/register',
            component: register,
            meta: {
                title: '注册',
            },
        },
        {
            path: '/find-password',
            component: findPassword,
            meta: {
                title: '找回密码',
            },
        },
        {
            path: '/order-search',
            component: orderSearch,
            meta: {
                title: '我的订单',
            },
        },
        {
            path: '/search-store',
            component: searchStore,
            meta: {
                title: '专卖店广场',
            },
        },
        {
            path: '/personal-data/:type',
            component: personalData,
            meta: {
                title: '个人资料',
            },
        },
        {
            path: '/reset-password',
            component: resetPassword,
            meta: {
                title: '重置密码',
            },
        },
        {
            path: '/reset-success',
            component: resetSuccess,
            meta: {
                title: '修改密码',
            },
        },
        {
            path: '/details/:id/:orgid/:state',
            component: details,
            meta: {
                title: '详情',
            },
        },
        {
            path: '/order/:id/:orgid/:state',
            component: order,
            meta: {
                title: '产品预订',
            },
        },
        {
            path: '/demand/:type',
            component: demand,
            meta: {
                title: '定制游',
            },
        },
        {
            path: '/process/:type',
            component: process,
            meta: {
                title: '进程',
            },
        },
        {
            path: '/blank',
            component: blank,
            meta: {
                title: '过渡',
            },
        },
        {
            path: '/pay/:orderId/:orgId',
            component: pay,
            meta: {
                title: '线下支付申请',
            },
        },
        {
            path: '/order-details/:orderId',
            component: orderDetails,
            meta: {
                title: '订单详情',
            },
        },
        {
            path: '/quote',
            component: quote,
            meta: {
                title: '最新报价',
            },
        },
        {
            path: '/supplier-list',
            component: supplierList,
            meta: {
                title: '列表页',
            },
        },
        {
            path: '/pay-result/:orderId',
            component: payResult,
            meta: {
                title: '支付成功',
            },
        },  
        {
            path: '/demand-details/:id',
            component: demandDetails,
            meta: {
                title: '定制游详情',
            },
        }, 
        {
            path: '/plan-list/:status/:id',
            component: planList,
            meta: {
                title: '方案列表',
            },
        }, 
        {
            path: '/confirm-plan/:id',
            component: confirmPlan,
            meta: {
                title: '确认方案',
            },
        },  
        {
            path: '/coupon',
            component: coupon,
            meta: {
                title: '领券中心',
            },
        },  
        {
            path: '/coupon-pay',
            component: couponPay,
            meta: {
                title: '支付中心',
            },
        }, 
        {
            path: '/jump',
            component: jump,
            meta: {
                title: '过渡中',
            },
        }, 
        {
            path: '/test',
            component: test,
            meta: {
                title: '测试',
            },
        },    
    ]
})

export default router;