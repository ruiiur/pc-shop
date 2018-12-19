<!--这是个人资料页面-->
<template>
    <div class="personal-data">
        <!-- 供应商导航引入 -->
        <supplierHeader :logo="logoPic" :without="without" @refreshList="personalDataInit"></supplierHeader>
        <p v-if="userType==2" class="bread-crumbs">您当前所在位置：<a :href="'#/supplier?orgId=' + orgId">首页 > </a><span>个人中心 ></span><span v-if="personalState==1&&userType==2">订单查询</span><span v-if="personalState==2&&userType==2">个人资料</span><span v-if="personalState==3&&userType==2">我的定制</span></p>
        <p v-if="userType==1" class="bread-crumbs">您当前所在位置：<a :href="'#/supplier?orgId=' + orgId">首页 > </a><span>个人中心 ></span><span>账号总览</span></p>
        <div v-if="userType==2&&personalState!=0" class="personal-content">
            <div class="con-left">
                <div>
                    <img src="../assets/images/data-logo.png" alt="">
                </div>
                <ul>
                    <li @click="personalState=1" :class="personalState==1?'active':''"><img src="../assets/images/order-i.png" alt="">订单查询</li>
                    <li @click="personalState=2" :class="personalState==2?'active':''"><img src="../assets/images/data-i.png" alt="">个人资料</li>
                    <li @click="personalState=3" :class="personalState==3?'active':''"><img src="../assets/images/damand-i.png" alt="">我的定制</li>
                </ul>
            </div>
            <div v-if="personalState==1" class="con-order">
                <img src="../assets/images/order-banner.png" alt="">
                <div class="order-content">
                    <ul class="order-nav">
                        <li v-for="(state,index) in orderStateList" :class="orderIndex==index?'active':''" @click="getOrder(index)">{{state.name}}<span v-for="num in orderNumList.length" v-if="num==index+1">({{orderNumList[num-1]}})</span></li>
                    </ul>
                    <div class="search-order-input">
                        <form action="">
                            <Input type="text" v-model="condition" autocomplete="off"></Input>
                        </form>
                        <img @click="searchOrder(0)" src="../assets/images/data-search.png" alt="">
                    </div>
                    <div class="order-title">
                        <div>
                            <p @click="openSelected=!openSelected">{{cateName}}<i :class="openSelected==true?'active':''"></i></p>
                            <ul v-if="openSelected==true">
                                <li :class="orderTimeType==index?'active':''" @click="selectedCateFun(cate,index)" v-for="(cate,index) in searchCate">{{cate.name}}</li>
                            </ul>
                        </div>
                        <span class="order-details-title">订单详情</span>
                        <span class="contact-title">联系人</span>
                        <span class="money-title">金额</span>
                        <span class="state-title">状态</span>
                        <span class="operation-title">操作</span>
                    </div>
                    <div>
                        <div class="order-details-con" v-for="(order,index) in orderList">
                            <h2><label for="">预定日期：{{order.createdDate}}</label><span>订单号：{{order.orderNo}}</span><a href="javascript:;"  @click="toOrderDetails(order)">订单详情</a></h2>
                            <div class="order-info" @click="toOrderDetails(order)">
                                <div class="order-main">
                                    <img :src="order.coverImg" alt="">
                                    <div>
                                        <h2>{{order.aliaseName}}</h2>
                                        <p>出行日期：{{order.tourDate}}--{{order.endDay}}</p>
                                        <p>出发人数：<span v-if="order.adultNum!=0">{{order.adultNum}}成人</span> <span v-if="order.childNum!=0">{{order.childNum}}儿童</span></p>
                                        <p>出发天数：{{order.tourDays}}天</p>
                                        <p>{{order.supplierName}}</p>
                                    </div>
                                </div>
                                <div class="order-contact">
                                    <p>{{order.contact}}</p>
                                    <p>{{order.mobile}}</p>
                                </div>
                                <div class="order-price">
                                    <p>￥{{order.payableAmt}}</p>
                                    <!-- <p>（含机票费￥560）</p> -->
                                </div>
                                <span v-if="order.dataStatus==0 || order.dataStatus==2">待确认</span>
                                <span v-if="order.dataStatus==1">待付款</span>
                                <span v-if="order.dataStatus==4">已支付</span>
                                <span v-if="order.dataStatus==-1">已取消</span>
                                <span v-if="order.dataStatus==3">支付待确认</span>
                                <!-- <span v-if="order.dataStatus!=0&&order.dataStatus!=1&&order.dataStatus!=4&&order.dataStatus!=-1&&order.dataStatus!=6&&order.dataStatus!=2&&order.dataStatus!=3">已点评</span> -->
                                <!-- <span v-if="order.dataStatus==6">占位</span> -->
                                <div class="order-operation">
                                    <a class= "cancel" href="javascript:;" v-if="order.dataStatus!=4&&order.dataStatus!=-1&&order.dataStatus!=1&&order.dataStatus!=3" @click.stop.prevent="cancelOrder(order)">取消订单</a>
                                    <!-- <a href="javascript:;">联系客服</a> -->
                                    <a :href="'#/pay/'+order.ordId+'/'+order.supplierID" v-if="order.dataStatus==1" class="active">付款</a>
                                    <!-- <a :href="'http://h5.aipinzan.cn/pay/api.aspx?id='+order.ordId+'&redirect_url=http://h5.aipinzan.net:9091/payApi/payCallback'" v-if="order.dataStatus==1" class="active">付款</a> -->
                                    <!-- <a :href="'#/evaluation/'+order.ordId+'/'+order.proId" v-if="order.dataStatus==4" class="active">评价</a> -->
                                </div>
                            </div>
                        </div>
                    </div>
                    <Page v-if="orderList.length>12" :pageSize="pageNum" :current="currentPage"  @on-change="changePage" :total="total"></Page>
                    <div v-if="withoutOrder" class="without-order">
                        <img src="../assets/images/lose-1.png" alt="">
                        <p>未发现信息记录哦~</p>
                    </div>
                </div>
            </div>
            <div v-if="personalState==2" class="con-data">
               <img src="../assets/images/data-banner.png" alt="">
               <ul>
                    <li>
                        <img v-if="realName!=null" src="../assets/images/geren-a.png" alt="">
                        <img v-if="realName==null" src="../assets/images/geren-n.png" alt="">
                        <div>
                            <p>个人信息</p>
                            <p>姓名：<span v-if="realName!=null">{{realName}}</span><a v-if="realName==null||realName==''" href="javascript:;" @click="modalNameSet=true">去设置</a></p>
                            <a href="javascript:;" @click="modalNameSet=true" v-if="realName!=null">编辑</a>
                        </div>
                    </li>
                    <li>
                        <img src="../assets/images/mima-a.png" alt="">
                        <div>
                            <p>密码</p>
                            <p>安全等级<Progress :percent="65"><span>中</span></Progress></p>
                            <h3>建议密码6-20个字符以上</h3>
                            <a href="javascript:;" @click="modalPasswordSet=true">修改密码</a>
                        </div>
                    </li>
                     <li>
                        <img src="../assets/images/phone-a.png" alt="">
                        <div>
                            <p>手机</p>
                            <p>{{personalMobile}}</p>
                            <h3>手机便于快速登录</h3>
                        </div>
                    </li>
               </ul>
            </div>
            <div v-if="personalState==3" class="con-demand">
                <img src="../assets/images/de-banner.png" alt="">
                <div class="demand-process">
                    <div class="pro-box">
                        <img src="../assets/images/de-1.png" alt="">
                        <p>填写个性旅行需求</p>
                    </div>
                    <p class="pro-icon"></p>
                    <div class="pro-box">
                        <img src="../assets/images/de-2.png" alt="">
                        <p>高端私人定制</p>
                    </div>
                    <p class="pro-icon"></p>
                    <div class="pro-box">
                        <img src="../assets/images/de-3.png" alt="">
                        <p>方案确认支付</p>
                    </div>
                    <p class="pro-icon"></p>
                    <div class="pro-box">
                        <img src="../assets/images/de-4.png" alt="">
                        <p>签约快乐出行</p>
                    </div>
                    <div class="pro-btn">
                        <a href="#/demand/1">立即定制</a>
                        <p>立即免费制定方案</p>
                    </div>
                </div>
                <div class="demand-content">
                    <ul class="demand-nav">
                        <li v-for="(state,index) in demandOrderStateList" :class="demandType==state.dataStatus?'active':''" @click="getDemandOrder(state,index)">{{state.strStatus}}({{state.num}})</li>
                    </ul>
                    <div class="search-demand-input" v-if="false">
                        <form action="">
                            <Input type="text" v-model="condition" autocomplete="off"></Input>
                        </form>
                        <img @click="searchOrder(0)" src="../assets/images/data-search.png" alt="">
                    </div>
                    <div class="demand-main">
                        <a :href="'#/plan-list/'+demand.dataStatus+'/'+demand.cusInfoNo" v-for="demand in demandOrderList">
                            <p class="demand-de">提交定制单时间：</p>
                            <p class="demand-ways">{{demand.createdDate}}</p>
                            <p class="demand-contact">{{demand.travellerName}} {{demand.mobile}}</p>
                            <p class="demand-state">
                                <span v-if="demand.dataStatus==1">已提交</span>
                                <span v-if="demand.dataStatus==2" class="stateone">已出方案</span>
                                <span v-if="demand.dataStatus==3" class="stateTwo">已确认</span>
                                <span v-if="demand.dataStatus==6" class="stateThree">已取消</span>
                            </p>
                            <h2 class="demand-city">{{demand.departure}}</h2>
                            <span>至</span>
                            <h2 class="demand-city city-esp">{{demand.destination}}</h2>
                            <p class="demand-time">{{demand.startDate}}出发<span>成人{{demand.adultNum}}</span></p>
                            <p class="demand-time">{{demand.endDate}}回程<span>儿童{{demand.childNum}}</span></p>
                            <h3 class="demand-price">{{demand.budget}}</h3>
                            <p class="demand-op">
                                <a :href="'#/plan-list/'+demand.dataStatus+'/'+demand.cusInfoNo">查看详情</a>
                            </p>
                            <a class="cancel" href="javascript:;" v-if="demand.dataStatus!=6" @click.stop.prevent="cancelPlan(demand)">取消</a>
                        </a>
                    </div>
                    <Page :pageSize="pageNum" :current="currentPage"  @on-change="changePageDemand" :total="demandTotal"></Page>
                </div>
            </div>
        </div>
        <div v-if="userType==1&&personalState==0" class="personal-erp">
            <div class="erp-left">
                <div>
                    <p><img src="../assets/images/data-i.png" alt="">个人中心<i></i></p>
                    <div>
                        <a href="javascript:;" class="active">账号总览</a>
                        <a :href="'http://'+domain+'/Module/Pro/Product.aspx'">产品管理</a>
                    </div>
                </div>
                <div>
                    <p><img src="../assets/images/order-i.png" alt="">个人中心<i></i></p>
                    <div>
                        <!-- <a :href="'http://'+domain+'/Module/Buy/OrderList.aspx'">我买到的</a> -->
                        <a href="javascript:;" @click="mineBuy()">我买到的</a>
                        <a :href="'http://'+domain+'/Module/Seller/Distribution.aspx'">我卖出的</a>
                    </div>
                </div>
            </div>
            <div class="erp-right">
                <div>
                    <p>积分信息</p>
                    <div>
                        <div class="erp-integral">
                            <div>
                                <p>累计积分</p>
                                <h1>{{totalscore}}</h1>
                            </div>
                            <div>
                                <p>可用积分</p>
                                <h1>{{usablescore}}</h1>
                            </div>
                        </div>
                        <div class="erp-code">
                            <div>
                                <img :src="erpCodeUrl" alt="">
                                <p>{{codeText}}</p>
                            </div>
                            <div>
                                <img :src="codeImg" alt="">
                                <p>扫一扫查看手机专卖店</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <p>账号信息</p>
                    <div>
                        <div class="erp-info">
                            <div>
                                <p>
                                    <label for="">公司：</label>
                                    <span class="esp" :title="ERPUserObj.travelName">{{ERPUserObj.travelName}}</span>
                                    <a :href="'#/supplier?orgId='+ERPUserObj.orgID">查看 ></a>
                                </p>
                                <p :title="ERPUserObj.deptName">
                                    <label for="">部门：</label>
                                    <span>{{ERPUserObj.deptName}}</span>
                                </p>
                            </div>
                            <div>
                                <p :title="address">
                                    <label for="">地址：</label>
                                    <span class="esp">{{address}}</span>
                                </p>
                                <p :title="ERPUserObj.userName">
                                    <label for="">姓名：</label>
                                    <span>{{ERPUserObj.userName}}</span>
                                </p>
                            </div>
                        </div>
                        <div class="erp-set">
                            <p>上次登录时间：{{loginTime}}<a :href="'http://'+domain">回到ERP</a></p>
                            <div>
                                <div>
                                    <img src="../assets/images/erp-tel.png" alt="">
                                    <div>
                                        <p>已绑定手机</p>
                                        <a :href="'http://'+domain+'/Module/My/Info.aspx'">修改</a>
                                    </div>
                                </div>
                                <div>
                                    <img src="../assets/images/erp-mima.png" alt="">
                                    <div>
                                        <p>已设置密码</p>
                                        <a :href="'http://'+domain+'/Module/My/Info.aspx'">修改</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 设置密码模态框 -->
        <Modal
            v-model="modalPasswordSet"
            class-name="vertical-center-modal modal-password-set"
            width="380">
            <div>
               <div class="password-set-top">
                   <img src="../assets/images/mima-set.png" alt="">
                   <h2>密码设置</h2>
               </div>
               <div class="password-set-con">
                   <div>
                       <Input placeholder="旧密码" clearable v-model="oldPassword"  :type="seenOld ? 'text' : 'password'" @on-blur="oldBlur()"/>
                       <img :src="seenOld ? seenImg : unseenImg" :class="seenOld==true?'esp':''" @click="seenOld=!seenOld">
                       <p>{{oldText}}<a href="#/find-password">忘记密码？</a><span></span></p>
                   </div>
                   <div>
                        <Input placeholder="新密码(6-16位字母加数字)"  type="password" v-model="newPassword" clearable @on-blur="newBlur()" :type="seenNew ? 'text' : 'password'"/>
                        <img :src="seenNew ? seenImg : unseenImg" :class="seenNew==true?'esp':''" @click="seenNew=!seenNew">
                        <p>{{newText}}</p>
                   </div>
                    <div>
                        <Input placeholder="确认密码"  type="password" v-model="newPasswordCom" clearable @on-blur="newComBlur()" :type="seen ? 'text' : 'password'"/>
                        <img :src="seen ? seenImg : unseenImg" :class="seen==true?'esp':''" @click="seen=!seen">
                        <p>{{newTextCom}}</p>
                   </div>
                   <p><a href="javascript:;" @click="saveNewPassword">保存</a></p>
               </div>
            </div>
        </Modal>
        <!-- 设置姓名模态框 -->
        <Modal
            v-model="modalNameSet"
            class-name="vertical-center-modal modal-name-set"
            width="380">
            <div>
                <div class="name-set-top">
                   <img src="../assets/images/name-set.png" alt="">
                   <h2>姓名设置</h2>
               </div>
               <div class="name-set-con">
                   <div>
                       <Input placeholder="在此输入您的姓名" v-model="name"  type="text" clearable/>
                       <p>{{nameText}}</p>
                   </div>
                    <p><a href="javascript:;" @click="saveName()">保存</a></p>
               </div>
            </div>
        </Modal>
        <!-- 取消方案模态框 -->
        <Modal
            v-model="modalCancelPlan"
            class-name="vertical-center-modal modal-cancel-plan"
            width="380">
            <div>
                <div class="cancel-top">
                <img src="../assets/images/cancel-icon.png" alt="">
                <h2>取消方案</h2>
                </div>
                <div class="cancel-con">
                    <p>您确认取消该方案吗？</p>
                    <div>
                        <a href="javascript:;" @click="modalCancelPlan=false">再想想</a>
                        <a href="javascript:;" class="esp" @click.stop.prevent="cancelDemandOrderFun(dialogObj)">确认</a>
                    </div>
                </div>
            </div>
        </Modal>
        <!-- 取消订单模态框 -->
        <Modal
            v-model="modalCancelOrder"
            class-name="vertical-center-modal modal-cancel-plan"
            width="380">
            <div>
                <div class="cancel-top">
                <img src="../assets/images/cancel-icon.png" alt="">
                <h2>取消订单</h2>
                </div>
                <div class="cancel-con">
                    <p>您确认取消该订单吗？</p>
                    <div>
                        <a href="javascript:;" @click="modalCancelOrder=false">再想想</a>
                        <a href="javascript:;" class="esp" @click.stop.prevent="cancelOrderFun(orderObj)">确认</a>
                    </div>
                </div>
            </div>
        </Modal>
        <feedBack></feedBack>
        <Footer></Footer>
    </div>
</template>
<script>
import tools from "../common/tools";
import supplierHeader from "../components/supplier-header.vue";
import Footer from "../components/footer.vue";
import feedBack from "../components/feedBack.vue";
import 'iview/dist/styles/iview.css';
import {
    getUserInformationByID, // 获取个人信息
    getErpUser,
    getOrderInfo,
    cancelOrder,
    getCusinfoList,
    getCusinfoCount,
    cancelCus,
    getExpByOrgId,
    getH5Erp,
    getH5Shop,
    getOrderNumByDatastatus,
    getUserLastLoginTime,
    UserLoginByMobilePassword,
    ModifyPassword,
    postUserInformationByID,
    loginOut,
    redirectOrderOfBuy
} from "../services/index";
import { log } from "util";
export default {
    data() {
        return {
            seen:false,//密码是否可见
            seenNew:false,//
            seenOld:false,//
            oldPassword:'',//旧密码
            newPassword:'',//新密码
            newPasswordCom:'',//新密码确认
            oldText:'',//旧密码验证提示
            newText:'',//新密码提示
            newTextCom:'',//旧密码验证提示
            seenImg:require('../assets/images/kan.png'),//可见密码图标
            unseenImg:require('../assets/images/bukan.png'),//不可见密码图标
            modalPasswordSet:false,//密码设置模态框
            modalNameSet:false,//姓名设置模态框
            modalCancelPlan:false,//取消方案模态框
            modalCancelOrder:false,//取消订单模态框
            personName: "", //姓名
            personalMobile: "", // 用户名
            logoPic: "",
            without: true,
            userID: "", // 用户类型
            userType:'',//用户类型
            ERPUserObj:'',
            genderSex:'',
            submitFlag:1,
            // 订单相关
            orderStateList:[
                {name:'全部订单'},
                {name:'待确认'},
                {name:'待付款'},
                {name:'已支付'},
                {name:'已取消'},
            ],//订单状态列表
            demandOrderStateList:[],//定制游订单列表
            orderIndex:0,//订单默认状态
            dataStatus:-7,
            orderDetailsList:[],//订单详情列表
            orderList:[],//订单列表
            condition:'',//搜索条件
            openSelected:false,//是否打开选择订单
            orderTimeType:0,//查询的订单时间
            pageNum: 12, //每页显示条数
            total:'', //总条数
            demandTotal:'',//定制游总条数
            currentPage: 1,
            searchCate:[
                {name:'全部'},
                {name:'近6个月订单'},
                {name:'今年内订单'},
                {name:'今年外订单'},
            ],//订单搜索分类
            cateName:'全部',
            withoutOrder:'无订单',
            // 新定义的
            personalState:1,//页面状态
            realName:'',//c端姓名
            demandType:0,//默认定制游类型的状态
            demandOrderList:[],//定制游订单列表
            orgId:'',//
            usablescore:'',//可用积分
            totalscore:'',//总积分
            codeText:'',//erp二维码说明
            erpCodeUrl:'',//erp二维码链接
            codeImg:'',//专卖店二维码
            address:'',//erp信息地址
            domain:'',
            orderNumList:'',//订单个数列表
            loginTime:'',//用户上次登录时间
            name:'',//设置的姓名
            nameText:'',//姓名提示
            dialogObj:{},//弹框对象
            orderObj:{},//订单弹框对象
        };
    },
    methods: {
        // 个人信息初始化
        personalDataInit() {
            // 获取用户类型
		    this.userType = tools.getLocalStorage("userType");
            this.userID = tools.getSessionStorage("userId");
            this.orgId = tools.getLocalStorage("orgId");
            this.address = tools.getLocalStorage("address");
            this.domain=tools.getSessionStorage('domain');
            this.personalState=this.$route.params.type;
            this.searchOrder(0);
            this.searchOrderDemand(0);
            if(this.userType==2){
                let params = {
                    'userID': this.userID
                };
                getUserInformationByID(params).then(response => {
                    console.log(response);
                    console.log('c端用户信息获取成功');
                    this.personalMobile = response.Mobile;
                    this.genderSex = response.Sex;
                    this.realName = response.RealName;
                    this.personalJob = response.UserJob == null ? "" : response.UserJob;
                    this.personalBirthday = response.Birthday == null ? "" : response.Birthday;
                    this.personName = response.RealName == null ? "" : response.RealName;
                })
                .catch(err => {
                });

                // 定制游类型及个数
                let paramsC=this.userID;
                getCusinfoCount(paramsC).then((response)=>{
                    console.log(response);
                    if(response.meta.success==true){
                        console.log('定制游订单类型及个数获取成功');
                        this.demandOrderStateList=response.data;
                        this.demandTotal=parseInt(this.demandOrderStateList[0].num);
                    }
                    else{
                        console.log('定制游订单类型及个数获取失败');
                    }
                }).catch((err)=>{
                    console.log('定制游订单类型及个数接口异常',err);
                });


                // 订单个数
                getOrderNumByDatastatus().then((response)=>{
                    console.log(response);
                    this.orderNumList=Object.values(response);
                    this.orderNumList.pop();
                    let sum=0;
                    for(let i=0;i<this.orderNumList.length;i++){
                        sum+=this.orderNumList[i];
                    }
                    this.orderNumList.unshift(sum);
                    console.log(this.orderNumList);
                    console.log('订单类型及个数获取成功');
                }).catch((err)=>{
                    console.log('订单类型及个数接口异常',err);
                });
            }
            else if(this.userType==1){
                getErpUser().then(response => {
                    console.log('获取ERP用户信息成功',response);
                    if(response.data!=null){
                        this.ERPUserObj=response.data;
                    }
                    // this.personalMobile = response.Mobile;
                    // this.genderSex = response.Sex;
                    // this.personalJob = response.UserJob == null ? "" : response.UserJob;
                    // this.personalBirthday = response.Birthday == null ? "" : response.Birthday;
                    // this.personName = response.UserName == null ? "" : response.UserName;
                })
                .catch(err => {
                    console.log('获取ERP用户信息接口异常',err);
                });

                // 获取积分
                let params=this.orgId;
                getExpByOrgId(params).then(response => {
                    console.log(response);
                    if(response.meta.success==true){
                        console.log('获取ERP用户积分信息成功');
                        this.totalscore=response.data.totalscore;
                        this.usablescore=response.data.usablescore;
                    }
                    else{
                        console.log('获取ERP用户积分信息失败');
                    }
                })
                .catch(err => {
                    console.log('获取ERP用户积分信息接口异常',err);
                });

                // getH5Erp二维码
                let paramsErpCode=this.userID;
                getH5Erp(paramsErpCode).then(response => {
                    console.log(response);
                    if(response.meta.success==true){
                        console.log('获取ERP二维码成功');
                        this.erpCodeUrl=response.data.url;
                        this.codeText=response.data.text;
                        // this.totalscore=response.data.totalscore;
                        // this.usablescore=response.data.usablescore;
                    }
                    else{
                        console.log('获取ERP用户积分信息失败');
                    }
                })
                .catch(err => {
                    console.log('获取ERP二维码异常',err);
                });

                // 获取用户上次登录时间
                getUserLastLoginTime(paramsErpCode).then(response => {
                    console.log(response);
                    if(response.meta.success==true){
                        console.log('获取用户上次登录时间成功');
                       this.loginTime=response.data.loginTime;
                    }
                    else{
                        console.log('获取用户上次登录时间失败');
                    }
                })
                .catch(err => {
                    console.log('获取用户上次登录时间异常',err);
                });


                 // 获取手机专卖店二维码
                let paramsAllSite=this.orgId;
				getH5Shop(paramsAllSite).then(response => {
					console.log(response);
					if (response.meta.success == true) {
						console.log("获取手机专卖店二维码成功");
						this.codeImg=response.meta.message;
					} else {
						console.log("获取手机专卖店二维码失败");
					}
				})
				.catch(err => {
					console.log("获取手机专卖店二维码异常", err);
				});
            }
        },

        // 旧密码验证
        oldBlur(){
             this.oldText='';
            if(tools.trim(this.oldPassword)==''){
                this.oldText='旧密码不能为空';
                return;
            }
            let params={
                'mobile':this.personalMobile,
                'password':this.oldPassword
            };
            UserLoginByMobilePassword(params).then((response)=>{
                console.log(response);
                if(response.ResultCode!=0){
                    this.oldText=response.Message;
                }
                console.log('旧密码验证');
               
            }).catch((err)=>{
                console.log('旧密码验证异常',err);
            });
        },

        // 新密码失去焦点验证
        newBlur(){
            this.newText='';
            if (tools.trim(this.newPassword) == "") {
                this.newText="新密码不能为空";
                return;
            }
            let pattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
            if (!pattern.test(this.newPassword)) {
                this.newText="请输入符合要求的密码";
            }
        },
        
        // 确认密码
        newComBlur(){
            this.newTextCom='';
            if (tools.trim(this.newPasswordCom) == "") {
                this.newTextCom="确认密码不能为空";
                return;
            }
            if(this.newPassword!=this.newPasswordCom){
                this.newTextCom="两次输入的密码不一致";
                return;
            }
        },
        // 密码验证
        judgePassword(){
            if(tools.trim(this.oldPassword)==''){
                this.oldText='旧密码不能为空';
                return false;
            }
            if(tools.trim(this.newPassword)==''){
                this.newText=' 新密码不能为空';
                return false;
            }
            if(tools.trim(this.newPasswordCom)==''){
                this.newTextCom='确认密码不能为空';
                return false;
            }
            if(this.oldText!=''||this.newText!=''||this.newTextCom!=''){
                return false; 
            }
        },


        // 修改密码
        saveNewPassword(){
            if(this.judgePassword() == false) {
                return;
            }
            let params={
                'mobile':this.personalMobile,
                'password':this.newPassword
            };
            ModifyPassword(params).then((response)=>{
                console.log(response);
                if(response==1){
                    this.modalPasswordSet=false;
                    this.$Message.info('密码修改成功');
                    this.$router.push('/login');
                    tools.clearCookie();
                    // 退出
                    let params={
                        'orgId':this.orgId
                        };
                    loginOut(params).then(response => {
                        if(response.meta.success==true){
                            localStorage.clear();
                            sessionStorage.clear();
                            tools.setLocalStorage("orgId", response.meta.message);
                        }
                    })
					.catch(err => {
						console.log("退出异常", err);
					});
                }
                console.log('密码设置');
               
            }).catch((err)=>{
                console.log('密码设置异常',err);
            });
        },

        // 设置姓名
        saveName(){
            if(tools.trim(this.name)==''){
                this.nameText='姓名不能为空';
                return;
            }
            let params={
                'userID':this.userID,
                'name':this.name
            };
            postUserInformationByID(params).then((response)=>{
                console.log(response);
                if(response==1){
                    this.modalNameSet=false;
                    this.$Message.info('姓名设置成功');
                    this.personalDataInit();
                }
                console.log('姓名设置');
               
            }).catch((err)=>{
                console.log('姓名设置异常',err);
            });
        },
        //订单相关
        // 返回一个月的第一天是星期几和这个月有多少天
        getWeekDay(year,month){
            let firstWeek =new Date(year, month,1).getDay();//拿到这个月1号是星期几  
            let lastDay = 32 - new Date(year, month, 32).getDate();//拿到这个月有多少天 
            let a;  
                if(firstWeek ==0){  
                    a =7;  
                }else{  
                    a=firstWeek;  
                }  
            //    console.log(a);
            //    console.log(lastDay);
            return {
                week:a,//这个月是星期几
                sumday:lastDay//这个月有多少天
            };
        },
         // 手动搜索订单
        queryOrder(page){
            this.orderList=[];
            this.searchOrder(0);
        },
        // 分类搜索
        selectedCateFun(obj,index){
            this.orderTimeType=index;
            this.searchOrder(0);
            this.currentPage=1;
            this.cateName=obj.name;
            this.openSelected=false;
        },
        // 自动搜索订单
        searchOrder(page){
            this.orderList=[];
            let params={
                'startPage':page,
                'size':this.pageNum,
                'condition':this.condition,
                'dataStatus':this.dataStatus,
                'siteid':tools.getSessionStorage('siteid'),
                'orderTimeType':this.orderTimeType,
            };
            // 获取订单接口绑定
            getOrderInfo(params).then((response)=>{
                console.log(response);
                if(response.meta.success==true){
                    console.log('订单数据获取成功');
                    this.total=parseInt(response.data.totalNum);
                    this.orderList=response.data.orderList;
                    if(response.data.orderList.length==0){
                        this.withoutOrder=true;
                    }
                    else{
                        this.withoutOrder=false;
                    }
                    // for(let i=0;i<response.data.orderList.length;i++){
                    //     this.orderList.push(response.data.orderList[i]);
                    // }
                    for(let i=0;i<this.orderList.length;i++){
                        let monthTotal=this.getWeekDay(parseInt(this.orderList[i].tourDate.split('-')[0]),parseInt(this.orderList[i].tourDate.split('-')[1])-1).sumday;

                        let total=parseInt(this.orderList[i].tourDate.split('-')[2])+parseInt(this.orderList[i].tourDays)-1;
                        if(total>monthTotal){
                             this.$set(this.orderList[i], 'endDay', this.orderList[i].tourDate.split('-')[0]+'-'+(parseInt(this.orderList[i].tourDate.split('-')[1])+1)+'-'+(total-monthTotal));
                        }
                        else{
                             this.$set(this.orderList[i], 'endDay', this.orderList[i].tourDate.split('-')[0]+'-'+parseInt(this.orderList[i].tourDate.split('-')[1])+'-'+total);
                        }
                    }
                }
                else{
                    console.log('订单数据获取失败');
                }
            }).catch((err)=>{
                console.log('订单接口获取异常',err);
            });
        },
       
        // 搜索定制游订单
        searchOrderDemand(pageD){
            this.orderList=[];
            let params={
                'userId':this.userID,
                'page':pageD,
                'size':this.pageNum,
                'type':this.demandType,
            };
            // 获取订单接口绑定
            getCusinfoList(params).then((response)=>{
                console.log(response);
                if(response.meta.success==true){
                    console.log('定制游订单接口获取成功');
                    this.demandOrderList=response.data;
                }
                else{
                    console.log('定制游订单接口获取失败');
                }
            }).catch((err)=>{
                console.log('定制游订单接口获取异常',err);
            });
        },

        // 获取不同的订单信息
        getOrder(index){
            this.currentPage=1;
            this.orderIndex=index;
            this.orderList=[];
            // this.orderAll=false;
            if(index==0){
                this.dataStatus=-7;
                this.searchOrder(0);
            }
            else if(index==1){
                this.dataStatus=0;
                this.searchOrder(0);
            }
            // else if(index==2){
            //     this.dataStatus=0;
            // }
            else if(index==2){
                this.dataStatus=1;
                this.searchOrder(0);
            }
             else if(index==3){
                this.dataStatus=4;
                this.searchOrder(0);
            }
             else if(index==4){
                this.dataStatus=-1;
                this.searchOrder(0);
            }
            // this.orderInit();
        },
        // 获取不同的定制游订单信息
        getDemandOrder(obj,index){
            this.currentPage=1;
            this.demandType=obj.dataStatus;
            this.demandTotal=parseInt(obj.num);
            this.searchOrderDemand(0);
        },
        // 取消订单
        cancelOrder(obj){
            this.modalCancelOrder=true;
            this.orderObj={
                'id':obj.ordId
            } 
        },
        cancelOrderFun(obj){
            let params=obj.id;
             cancelOrder(params).then((response)=>{
                console.log(response);
                if(response.meta.success==true){
                    console.log('取消订单成功');
                    this.$Message.info('取消订单成功');
                    this.modalCancelOrder=false;
                    this.orderList=[];
                    this.searchOrder(0);
                }
                else{
                    console.log('取消订单失败');
                    this.$Message.info(response.meta.message);
                    // this.showTip=true;
                    // this.tipText=response.meta.message;
                }
            }).catch((err)=>{
                console.log('取消订单异常',err);
            });
        },

        // 取消定制游订单
        cancelDemandOrderFun(obj){
            let params=obj.id;
            cancelCus(params).then((response)=>{
                console.log(response);
                if(response.meta.success==true){
                    console.log('取消定制游订单成功');
                    this.$Message.info('取消定制游订单成功');
                    this.demandOrderList=[];
                    this.searchOrderDemand(0);
                }
                else{
                    console.log('取消定制游订单失败');
                    this.$Message.info(response.meta.message);
                }
            }).catch((err)=>{
                console.log('取消定制游订单异常',err);
            });
        },
        //改变页码
        changePage(page) {
            this.currentPage = page;
            this.searchOrder(page - 1);
        }, 
        changePageDemand(page){
            this.currentPage = page;
            this.searchOrderDemand(page - 1);
        },
        //去订单详情页面
        toOrderDetails(obj){
            this.$router.push('/order-details/'+obj.ordId);
        },

        // 取消定制游
        cancelPlan(obj){
            this.modalCancelPlan=true;
            this.dialogObj={
                'id':obj.id
            }
        },


        // B端我买到的
        mineBuy(){
             redirectOrderOfBuy().then((response)=>{
                console.log(response);
                console.log('我买到的订单');
                window.location.href=response;
            }).catch((err)=>{
                console.log('我买到的订单异常',err);
            });
        }
    },

    mounted() {
        // this.personalDataInit();
        // this.userInformationById();
    },
    components: {
        supplierHeader,
        Footer,
        feedBack
    },
};
</script>

<style lang="scss">
.modal-password-set{
    .ivu-modal-footer{
        display:none;
    }
    .ivu-icon-ios-close-empty:before {
        content: "\F404";
        color: #fff;
    }
    .ivu-modal-body{
        padding: 0 !important;
       >div{
           .password-set-top{
               height: 107px;
               background: #ffba00;
               border-radius: 6px 6px 0px 0px;
               padding-top: 20px;
               text-align: center;
               >img{
                    @include wh(46px,46px);  
               }
               >h2{
                   @include sc(18px,#fff);
               }
           }
           .password-set-con{
               padding: 20px 0;
               >div{
                   padding-left: 64px;
                   position: relative;
                   margin-bottom: 20px;
                   .ivu-input-wrapper{
                       width: 246px;
                       height: 40px;
                       .ivu-input{
                            width: 246px;
                            height: 40px;
                            border:1px solid #ccc;
                       }
                       .ivu-input-icon {
                            height: 40px;
                            line-height: 40px;
                            font-size: 16px;
                            right: 30px;
                            z-index: 3;
                        }
                   }
                   >img{
                       position: absolute;
                       top:12px;
                       right:82px;
                       &.esp{
                           top:15px;
                       }
                   }
                   >p{
                       @include sc(12px,#ef2a2a);
                       >a{
                           @include sc(12px,#6f9afd);
                           float: right;
                           padding-right: 65px;
                       }
                       >span{
                           display: block;
                           clear: both;
                       }
                   }
               }
               >p{
                   text-align: center;
                   >a{
                       display: inline-block;
                       @include wh(100px,28px);
                       @include sc(14px,#fff);
                       border-radius: 6px;
                       background: #ffba00;
                       line-height: 28px;
                   }
               }
           }
       } 
    }
}
.modal-name-set{
    .ivu-modal-footer{
        display:none;
    }
    .ivu-icon-ios-close-empty:before {
        content: "\F404";
        color: #fff;
    }
    .ivu-modal-body{
        padding: 0 !important;
       >div{
           .name-set-top{
               height: 107px;
               background: #ffba00;
               border-radius: 6px 6px 0px 0px;
               padding-top: 20px;
               text-align: center;
               >img{
                    @include wh(46px,46px);  
               }
               >h2{
                   @include sc(18px,#fff);
               }
           }
           .name-set-con{
               padding: 20px 0;
                >div{
                    padding-left: 64px;
                    margin-bottom: 20px;
                    .ivu-input-wrapper{
                        @include wh(246px,40px);
                        .ivu-input{
                            @include wh(246px,40px);
                        }
                    }
                    >p{
                        @include sc(12px,#ef2a2a);
                    }
                }
                >p{
                    text-align: center;
                    >a{
                        display: inline-block;
                        @include wh(100px,28px);
                        @include sc(14px,#fff);
                        border-radius: 6px;
                        background: #ffba00;
                        line-height: 28px;
                    }
                }
           }
       } 
    }
}
.modal-cancel-plan{
    .ivu-modal-footer{
        display:none;
    }
    .ivu-icon-ios-close-empty:before {
        content: "\F404";
        color: #fff;
    }
    .ivu-modal-body{
        padding: 0 !important;
       >div{
            .cancel-top{
               height: 107px;
               background: #ffba00;
               border-radius: 6px 6px 0px 0px;
               padding-top: 20px;
               text-align: center;
               >img{
                    @include wh(46px,46px);  
               }
               >h2{
                   @include sc(18px,#fff);
               }
            }
            .cancel-con{
                padding: 20px 0;
                >p{
                   @include sc(14px,#666);
                   text-align: center;
                }
                >div{
                    text-align: center;
                    margin-top: 30px;
                    >a{
                        display: inline-block;
                        @include wh(100px,28px);
                        background: #ffba00;
                        @include sc(14px,#fff);
                        border-radius: 6px;
                        line-height: 28px;
                        text-align: center;
                        &.esp{
                            margin-left: 20px;
                            background: #fff;
                            color:#ffba00;
                            border:1px solid #ffba00;
                            line-height: 26px;
                        }
                    }
                }
            }
        } 
    }
}
.personal-data {
    height: 100%;
    min-height:100vh !important;
    position: relative;
    padding-bottom: 91px;
    .bread-crumbs{
        @include sc(14px,#999);
        padding: 12px 0;
        width:1180px;
        margin: auto;
        >span,>a{
            @include sc(14px,#666);
        }
    }
    .ivu-page{
        float: right;
        margin: 20px 0 100px 0;
    }
    .personal-content{
        width: 1180px;
        margin: auto;
        padding-top: 10px;
        >div{
            display: inline-block;
            vertical-align: top;
        }
        .con-left{
            width:205px;
            margin-right: 20px;
            box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.16);
            border-top:2px solid #ffba00;
            padding-top: 40px;
            padding-bottom: 45px;
            >div{
                @include wh(80px,80px);
                border-radius: 6px;
                text-align: center;
                margin: auto;
                border:1px solid #ccc;
                >img{
                    width:74px; 
                }  
            }
            >ul{
                padding: 0 16px;
                margin-top: 45px;
               >li{
                   height: 56px;
                   line-height: 56px;
                   border-bottom:1px solid #eee;
                   padding-left: 25px;
                   position: relative;
                   cursor: pointer;
                   @include sc(16px,#333);
                   >img{
                       position: absolute;
                       top:18px;
                       left:0;
                   }
                   &.active{
                       color:#ffba00;
                   }
               } 
            }
        }
        .con-order{
            width: calc(100% - 230px);
            >img{
                width:100%;
                height: 120px;
            }
            .order-content{
                margin-top: 20px;
                .order-nav{
                    display: inline-block;
                    >li{
                        float: left;
                        @include sc(16px,#999);
                        width: 140px;
                        text-align: center;
                        padding-bottom: 4px;
                        cursor: pointer;
                        &::after{
                            content:'';
                            height: 18px;
                            width: 1px;
                            background: #ccc;
                            float: right;
                            margin-top: 3px;
                        }
                        &.active{
                            color: #ffba00;
                            border-bottom: 2px solid #ffba00;
                        }
                    }
                }
                .search-order-input{
                    float: right;
                    font-size:0;
                    margin-top: -5px;
                    // width200px;
                    >form{
                        display: inline-block;
                        .ivu-input-wrapper{
                            width: 168px;
                        }
                    }
                    >img{
                        display: inline-block;
                        vertical-align: middle;
                        margin: 0 10px;
                    }
                }
                .order-title{
                    width:100%;
                    height: 54px;
                    box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.05);
                    margin-top: -4px;
                    border:1px solid #eee;
                    margin-bottom: 20px;
                    >div{
                        display: inline-block;
                        width:140px;
                        padding-top: 19px;
                        padding-left: 20px;
                        position: relative;
                        >p{
                            @include sc(14px,#333);
                            >i{
                                display: inline-block;
                                @include wh(10px,6px);
                                background: url('../assets/images/site-bottom.png') no-repeat;
                                background-size:100%;
                                margin-left: 6px;
                                &.active{
                                    background: url('../assets/images/site-top.png') no-repeat;
                                    background-size:100%; 
                                }  
                            }
                        }
                        >ul{
                            box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.6);
                            border-radius: 4px;
                            padding: 6px 0;
                            background: #fff;
                            position: absolute;
                            left:0;
                            width:140px;
                            >li{
                                height: 32px;
                                background: #fff;
                                padding-left: 20px;
                                @include sc(14px,#333);
                                line-height: 32px;
                                &.active{
                                    background: #ddd;
                                }
                            }
                        }
                    }
                    >span{
                        @include sc(14px,#333);
                        display: inline-block;
                        text-align: center;
                    }
                    .order-details-title{
                        width:320px;
                    }
                    .contact-title{
                        width:130px;
                    }
                    .money-title{
                        width:110px;
                    }
                    .state-title{
                        width:110px;
                    }
                    .operation-title{
                        width:110px;
                    }
                }
                .order-details-con{
                    margin-bottom: 20px;
                    >h2{
                        background: #fff;
                        padding: 0 45px 10px 20px;
                        font-size:0;
                        >label,>span,>a{
                            display: inline-block;
                        }
                        >label{
                            @include sc(12px,#999);
                            margin-right: 40px;
                        }
                        >span{
                            @include sc(12px,#999);
                        }
                        >a{
                            float: right;
                            @include sc(12px,#6593fd);
                        }
                    }
                    .order-info{
                        width:100%;
                        padding: 0 0 30px 20px;
                        border-bottom:1px solid #eee;
                        border-top:none;
                        box-sizing: border-box;
                        >span{
                            display: inline-block;
                            vertical-align: middle;
                            @include sc(12px,#333); 
                            width:110px;
                            text-align: center;
                        }
                    }
                    .order-main{
                        display: inline-block;
                        vertical-align: middle;
                        margin-right: 50px;
                        >img{
                            display: inline-block;
                            vertical-align: top;
                            @include wh(144px,97px);
                            margin-right: 5px;
                        }
                        >div{
                            display: inline-block;
                            width: 240px;
                            >h2{
                                @include sc(14px,#333);
                                line-height: 14px;
                                margin-bottom: 12px;
                                overflow: hidden;
                                text-overflow:ellipsis;//文本溢出显示省略号
                                white-space:nowrap;//文本不会换行（单行文本溢出）
                            }
                            >p{
                                @include sc(12px,#999);
                            }
                        }
                    }
                    .order-contact,.order-price,.order-operation{
                        display: inline-block;  
                        vertical-align: middle;
                        text-align: center;
                    }
                    .order-contact,.order-price{
                        >p{
                            @include sc(12px,#333);
                            text-align: center;
                        }
                    }
                    .order-contact{
                        width:130px;
                    }
                    .order-price{
                        width:110px;
                    }
                    .order-operation{
                        width: 110px;
                        display: inline-block;
                        >a{
                            @include sc(12px,#6593fd);
                        }
                    }
                }
                .without-order{
                    padding-top: 50px;
                    text-align: center;
                    >img{
                        @include wh(368px,280px);
                        margin-bottom: 25px;
                    }
                    >p{
                       @include sc(20px,#999);  
                       margin-bottom: 150px;
                    }
                }
            }
        }
        .con-data{
            width: calc(100% - 230px);
            >img{
                width:100%;
                height: 120px;
            }
            >ul{
                height: 240px; 
                margin-top: 20px;
                padding: 65px 0;
                box-sizing: border-box;
                background-color: #fefeff;
	            box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.16);
                >li{
                    display: inline-block;
                    vertical-align: top;
                    width: 33%;
                    padding-left: 29px;
                    padding-top: 10px;
                    position: relative;
                    height: 108px;
                    >img{
                        margin-right: 19px;
                    }
                    >div{
                        display: inline-block;
                        vertical-align: top;
                        >a{
                            position: absolute;
                            bottom: 0;
                            right:20px;
                            @include sc(12px,#6593fd);
                        }
                        >p{
                            @include sc(14px,#333);
                            .ivu-progress{
                                width: 130px;
                                margin-left: 8px;
                                .ivu-progress-show-info .ivu-progress-outer {
                                    padding-right: 45px;
                                    margin-right: -47px;
                                }
                                .ivu-progress-bg{
                                    background-color: #ffba00 !important;
                                    height: 7px !important;
                                }
                                .ivu-progress-text{
                                    color: #ffba00 !important;
                                }
                               
                            }
                            .ivu-progress-bg{
                                background-color:#ffba00 !important;
                            }
                            >a{
                                color:#6593fd;
                            }
                        }
                        >h3{
                            @include sc(14px,#ccc);
                        }
                    }
                    &:nth-child(2){
                        border-left:1px solid #ccc;
                        border-right:1px solid #ccc;
                    }
                }
            }
        }
        .con-demand{
            width: calc(100% - 230px);
            >img{
                width:100%;
                height: 120px;
            }
            .demand-process{
                margin-top: 20px;
                .pro-box{
                    display: inline-block;
                    width:160px;
                    text-align: center;
                    >p{
                        @include sc(14px,#333);
                    }
                }
                .pro-icon{
                    display: inline-block;
                    vertical-align: top;
                    @include wh(11px,20px);
                    background: url('../assets/images/de-right.png') no-repeat;
                    background-size:11px 20px;
                    margin-top: 20px;

                }
                .pro-btn{
                    display: inline-block;
                    border-left:1px solid #ccc;
                    padding-left: 50px;
                    >a{
                        display: inline-block;
                        @include wh(160px,50px);
                        background: #ffad71;
                        @include sc(20px,#fefefe);
                        line-height:50px;
                        text-align: center;
                        border-radius: 6px;
                        margin-bottom: 16px;
                    } 
                    >p{
                        @include sc(14px,#333);
                        text-align: center;
                    }
                }
            }
            .demand-content{
                border-top:1px solid #eee;
                margin-top: 20px;
                padding-top: 9px;
                .demand-nav{
                    display: inline-block;
                    >li{
                        float: left;
                        @include sc(16px,#999);
                        width: 120px;
                        text-align: center;
                        padding-bottom: 4px;
                        cursor: pointer;
                        &::after{
                            content:'';
                            height: 18px;
                            width: 1px;
                            background: #ccc;
                            float: right;
                            margin-top: 3px;
                        }
                        &.active{
                            color: #ffba00;
                            border-bottom: 2px solid #ffba00;
                        }
                    }
                }
                .search-demand-input{
                    float: right;
                    font-size:0;
                    margin-top: -5px;
                    // width200px;
                    >form{
                        display: inline-block;
                        .ivu-input-wrapper{
                            width: 168px;
                        }
                    }
                    >img{
                        display: inline-block;
                        vertical-align: middle;
                        margin: 0 10px;
                    }
                }
                .demand-main{
                    margin-top: 20px;
                    >a{
                        display: inline-block;
                        vertical-align: top;
                        width: 228px;
                        height: 331px;
                        background-color: #ffffff;
                        box-shadow: 0px 2px 9px 0px rgba(0, 0, 0, 0.27);
                        border-radius: 6px;  
                        padding: 15px 0;
                        margin-bottom: 10px;
                        position: relative;
                        margin-right: 9px;
                        .demand-de{
                            @include sc(12px,#999);
                            padding: 0 10px;
                        }
                        .demand-ways{
                            @include sc(12px,#999);
                            padding: 0 10px;
                            >span{
                                @include sc(12px,#333);
                                float: right; 
                            }
                        }
                        .demand-contact{
                            padding: 0 10px;
                            @include sc(12px,#333);
                        }
                        .demand-state{
                            height: 18px;
                            >span{
                                @include sc(12px,#fefefe);
                                float: right;
                                background: #6196dd;
                                width: 54px;
                                text-align: center;
                                &.stateone{
                                    background: #b3d465;
                                }
                                &.stateTwo{
                                    background: #f19149;
                                }
                                &.stateThree{
                                    background: #d1212e;
                                }
                            }
                        }
                        .demand-city{
                            @include sc(20px,#333);
                            padding: 0 20px;
                            text-align: center;
                            overflow:hidden;
                            text-overflow:ellipsis;
                            white-space:nowrap;
                        }
                        .city-esp{
                            margin-bottom: 15px;
                        }
                        .demand-time{
                            padding-left: 39px;
                            @include sc(12px,#333);
                            >span{
                                margin-left: 30px;
                            }
                        }
                        .demand-price{
                            text-align: center;
                            @include sc(24px,#ffba00);
                            margin: 6px 0 15px 0;
                            &::before{
                                content:'￥';
                                @include sc(12px,#ffba00);
                            }
                        }
                        .demand-op{
                            text-align: center;
                            >a{
                                @include sc(12px,#6593fd);
                            }  
                        }
                        .cancel{
                            position: absolute;
                            display: block;
                            @include sc(12px,#6593fd);
                            text-align: center;
                            bottom:20px;
                            width: 100%;
                        }
                        >span{
                            display: block;
                            @include sc(12px,#333);
                            text-align: center;  
                        }
                    }
                }
            }
        }
    }
    .personal-erp{
        width: 1180px;
        margin: auto;
        >div{
            display: inline-block;
            vertical-align: top;
        }
        .erp-left{
            width:205px;
            margin-right: 20px;
            background-color: #ffffff;
	        box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.05);
            border-top:2px solid #ffba00;
            padding: 0 15px;
            >div{
                padding-top: 20px;
                &:first-child{
                    border-bottom:1px solid #eee;
                }
                >p{
                    padding-left: 30px;
                    position: relative;
                    @include sc(16px,#333);
                    >img{
                        top:3px;
                        left:5px;
                        position: absolute;
                    }
                    >i{
                        float: right;
                        @include wh(12px,8px);
                        background: url('../assets/images/erp-bo.png') no-repeat;
                        background-size:12px 8px;
                        margin-top: 8px;
                    }
                }
                >div{
                    padding-bottom: 20px;
                    >a{
                        display: block;
                        padding-left: 30px;
                        @include sc(14px,#333);
                        margin-top: 10px;
                        &.active{
                           @include sc(14px,#ffba00); 
                        }
                        &:active{
                            @include sc(14px,#ffba00);
                        }
                    }
                }
            }
        }
        .erp-right{
            width: calc(100% - 230px);
            >div{
                margin-bottom: 20px;
                >p{
                   @include sc(16px,#333);
                   border-left:2px solid #ffba00; 
                   padding-left: 8px;
                   line-height: 16px;
                   margin-bottom: 10px;
                }
                >div{
                    width: 951px;
                    height: 160px;
                    background-color: #fefeff;
                    box-shadow: 0px 2px 9px 0px rgba(0, 0, 0, 0.11);
                    padding: 10px 0;
                    >div{
                        display: inline-block;
                        vertical-align: top;
                    }
                    .erp-integral{
                        width:550px;
                        padding: 25px 80px 0;
                        >div{
                            display: inline-block;
                            vertical-align: top;
                            width: 49.5%;
                            text-align: center;
                            >p{
                                @include sc(16px,#999);
                            }
                            >h1{
                                @include sc(50px,#ffba00);
                                line-height: 40px;
                                margin-top: 10px;
                            }
                        }
                    }
                    .erp-code{
                        float: right;
                        border-left:1px solid #eee;
                        padding: 0 30px;
                        width:calc(100% - 550px);
                        >div{
                            display: inline-block;
                            vertical-align: top;
                            padding-top: 10px;
                            width:49%;
                            text-align: center;
                            >img{
                               @include wh(100px,100px); 
                               display: inline-block;
                               margin-bottom: 5px;
                            }
                            >p{
                                @include sc(12px,#999);
                            }
                        }
                    }
                    .erp-info{
                        width: 550px;
                        padding-left: 20px;
                        >div{
                            padding-top: 10px;
                            box-sizing: border-box;
                           >p{
                                display: inline-block;
                                height: 40px;
                                margin-bottom: 20px;
                                overflow: hidden;
                                -ms-text-overflow: ellipsis;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                >label{
                                    @include sc(14px,#434343);
                                }
                                >span{
                                    vertical-align: top;
                                    @include sc(14px,#434343);
                                    &.esp{
                                        display: inline-block;
                                        overflow: hidden;
                                        -ms-text-overflow: ellipsis;
                                        text-overflow: ellipsis;
                                        white-space: nowrap;
                                        width: 200px;
                                    }
                                }
                                >a{
                                    @include sc(12px,#5b8cfe);
                                    margin-left: 10px;
                                }
                                &:first-child{
                                    width: 320px;
                                    margin-right: 10px;
                                }
                                &:last-child{
                                    width: 185px;
                                }
                           }
                        }
                    }
                    .erp-set{
                        border-left:1px solid #eee;
                        width:calc(100% - 550px);
                        box-sizing: border-box;
                        float: right;
                        >p{
                            padding-top: 10px;
                            float: right;
                            padding-right: 20px;
                            >a{
                                @include sc(12px,#6694fe);
                                margin-left: 10px;
                            }
                        }
                        >div{
                            clear: both;
                            margin-top: 60px;
                            float: right;
                            padding-bottom: 10px;
                            >div{
                                display: inline-block;
                                width: 153px;
                                padding-left: 20px;
                                &:last-child{
                                    border-left:1px solid #eee;
                                }
                                >img{
                                    margin-right: 20px;
                                }
                                >div{
                                    display: inline-block;
                                    vertical-align: top;
                                    >p{
                                        @include sc(14px,#434343);
                                    }
                                    >a{
                                        @include sc(12px,#6694fe);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    .footer {
        position: absolute;
        bottom: 0; 
    }
}
</style>

