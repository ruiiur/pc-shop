// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import iView from 'iview';
import 'iview/dist/styles/iview.css';
import store from './store/index'
import 'babel-polyfill'
import tools from "./common/tools";
import htmlToPdf from "./common/htmlToPdf";
Vue.use(htmlToPdf)
// import 'es6-promise/auto'
import 'animate.css'

// //引入rem.js
// import Rem from './common/rem'
import router from './router'
import App from './App'

// 打印
import Print from 'vue-print-nb'
Vue.use(Print); //注册

// 路由切换前处理
router.beforeEach((to, from, next) => {
    console.log('toooooooooo',to);
    console.log('frommmmmmmm',from);
    if(JSON.stringify(from.meta)!='{}'){
        tools.setLocalStorage("fromName",from.meta.title);
    }
    if(from.fullPath!='/'){
        tools.setLocalStorage("fromPath",'#'+from.fullPath);
    }
    // 判断登录权限
    // if (to.matched.some(m => m.meta.auth)) {
    //     if (window.localStorage.isLogin === '1') {
    //         next()
    //     } else if (to.path !== '/') {
    //         next({
    //                 path: '/login'
    //             })
    //             // Vue.prototype.$message.warning('检测到您还未登录,请登录后操作！')
    //     }
    // } else {
    //     next()
    // }
    // let title = '事达国旅';
    to.matched.forEach((path) => {
        console.log(path,'path.meta.title')
        if (path.meta.title) {
            // title = `${path.meta.title}`;
            document.title = path.meta.title;
        } 
        // if(path.path=='/supplier'){
        //     document.title=tools.getLocalStorage('logoName');
        // }
        // console.log(path.path.indexOf('/details'),'llllllllllllllllllllllllll');
        console.log(path.path);
        // if(path.path.indexOf('/details')==0){
        //     document.title=tools.getLocalStorage('aliasename');
        // }
        next();

        //路由切换页面到顶部
        window.scrollTo(0, 0);
        // if(path.meta.requireAuth){
        //     let token=tools.getCookie('token');
        //     console.log('token===',token);
        //     if (token) {  // 判断当前的token是否存在
        //         next();
        //       }
        //       else {
        //         next({
        //           path: '/',
        //           query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
        //         })
        //       }
        // }

    });
});
// 路由切换后
router.afterEach((to, from) => {});


Vue.config.productionTip = false
Vue.use(iView);
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    },
    template: '<App/>'
})