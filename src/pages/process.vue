<!--这是预定进程页面-->
<template>
    <div class="process" @click="globalFun">
        <!-- 引入头部导航 -->
        <supplierHeader  :without="without"  :isHide="isHide" @global="globalFunT" @refreshList="processInit"></supplierHeader>
         <!-- 中间区 -->
        <div class="process-content">
           <!-- 订单提交成功，未支付区 -->
           <div class="wait-pay" v-if="processIndex==1">
               <h2>订单提交成功，请到ERP>买家订单支付！订单号：{{orderNo}}</h2>
               <p>请在30分钟内完成支付，否则订单会自动取消</p>
               <h1>
                    <!-- <a href="javascript:;">支付</a> -->
                    <a  @click="checkOrder()">查看订单</a>
                    <a :href="'#/supplier?orgId='+orgId">返回首页</a>
               </h1>
           </div>
           <div class="order-submit" v-if="processIndex==2">
                <p>您的预定信息已提交！</p>
                <h2>
                    <a @click="checkOrder()">查看订单</a>
                    <a :href="'#/supplier?orgId='+orgId">返回首页</a>
                </h2>
           </div>
           <div class="installment" v-if="processIndex==3">
                <p>请按照您的账期分期付款！</p>
                <h2>
                    <a href="javascript:;">查看订单</a>
                    <a :href="'#/supplier?orgId='+orgId">返回首页</a>
                </h2>
           </div>
            <div class="demand-info" v-if="processIndex==4">
                <h1>您的定制游订单已经提交成功！</h1>
                <p>需求单号：{{demandNo}}</p>
                <p>定制师将在4个小时内联系您</p>
                <h2>
                    <!-- <a href="#/order-search" @click="checkCustomOrder()">查看订单</a> -->
                    <a :href="'#/supplier?orgId='+orgId">返回首页</a>
                </h2>
           </div>
            <div class="coupon-info" v-if="processIndex==5">
                <h1>您的活动订单已经提交成功！</h1>
                <p>订单编号：{{couponNo}}</p>
                <h2>
                    <a href="javascript:;" @click="checkCouponOrder()">查看订单</a>
                    <a :href="'#/supplier?orgId='+orgId">返回首页</a>
                </h2>
           </div>
       </div>
       <feedBack></feedBack>
       <!-- 引入底部导航 -->
       <Footer></Footer>
    </div>
</template>
<script>

import tools from "../common/tools";
import {
  getCustomDeparture,
  getRouteTypeAndDestination,
  insertCustom,
  getServcieType,
  getAllTag,
  redirectOrder,
  getCouponOrderUrl,
  redirectOrderOfBuy
} from "../services/index";
import supplierHeader from "../components/supplier-header.vue";
import Footer from "../components/footer.vue";
import feedBack from "../components/feedBack.vue";
import { log } from 'util';

export default {
    data(){
        return{
            isHide:false,//
            processIndex:'',//进度默认值
            demandNo:'',//需求单号
            orderNo:'',//订单号
            without:true,
            orgId:'',//供应商id
            
        }
    },
    methods: {
         // 全局控制
        globalFun(){  
            this.isHide=false;
        },
        globalFunT(){
            this.isHide=!this.isHide;
        },
        processInit(){
            this.demandNo=tools.getLocalStorage('demandNo');
            this.couponNo=tools.getLocalStorage('couponNo');
            this.orderNo=tools.getLocalStorage('orderNo');
            this.orgId=tools.getLocalStorage('orgId');
             // 获取用户类型
		    this.userType = tools.getLocalStorage("userType");
            this.processIndex=this.$route.params.type;
            // redirectOrder
            console.log(this.processIndex);
        },
        // b端订单
        // checkOrderB(){
        //     redirectOrderOfBuy().then((response)=>{
        //         console.log(response);
        //         console.log('我买到的订单');
        //         window.location.href=response;
        //     }).catch((err)=>{
        //         console.log('我买到的订单异常',err);
        //     });
        // },
        // 查看订单
        checkOrder(){
            // 查看订单接口
            if(this.userType==1){
                // let params=this.processIndex;
                // redirectOrder(params).then((response)=>{
                //     console.log(response);
                //     if(response.meta.success==true){
                //         console.log('查看订单获取数据成功');
                //         window.location.href=response.meta.message;
                //     }
                //     else{
                //         console.log('查看订单获取数据失败');
                //     }
                // }).catch((err)=>{
                //     console.log('查看订单获取数据接口异常',err);
                //     // this.$Message.info('查看订单获取数据接口异常');
                // });
                redirectOrderOfBuy().then((response)=>{
                    console.log(response);
                    console.log('我买到的订单');
                    window.location.href=response;
                }).catch((err)=>{
                    console.log('我买到的订单异常',err);
                });
            }
            else{
                this.$router.push('/personal-data/1');
            }
        },
        // 活动订单查看
        checkCouponOrder(){
            getCouponOrderUrl().then((response)=>{
                console.log(response);
                if(response.meta.success==true){
                    console.log('查看订单获取数据成功');
                     window.location.href=response.meta.message;
                }
                else{
                    console.log('查看订单获取数据失败');
                }
            }).catch((err)=>{
                console.log('查看订单获取数据接口异常',err);
                // this.$Message.info('查看订单获取数据接口异常');
            });
        }
    },
    components: {
        supplierHeader,
        Footer,
        feedBack
    },
    mounted(){
        // this.processInit();
    }
}
</script>

<style lang="scss">
.process{
    .process-content{
        min-height: calc(100vh - 452px);
        height:840px;
        margin-top: 18px;
        background: url("../assets/images/wait.png") no-repeat center;
        padding-top: 106px;
        .wait-pay{
            @include wh(600px,180px);
            margin: auto;
            border-radius: 8px;
            background-color: rgba(0, 0, 0, 0.8);
            padding: 39px 0px 0 0px;
            >h2{
                @include sc(18px,#fff);
                line-height: 18px;
                margin-bottom: 15px;
                font-weight: normal;
                text-align: center;
            }
            >p{
                @include sc(14px,#fff);
                line-height: 14px;
                margin-bottom: 20px;
                text-align: center;
            }
            >h1{
                text-align: center;
                font-weight: normal;
                >a{
                    display: inline-block;
                    @include wh(120px,40px);
                    @include sc(18px,#fff); 
                    border-radius: 20px;
                    border: solid 2px #ffffff;
                    line-height: 37px;
                    text-align: center;
                    &:first-child{
                        margin-right: 50px;
                    }
                }
            }
        }
        .installment,.order-submit{
            @include wh(600px,180px);
            margin: auto;
            border-radius: 8px;
            background-color: rgba(0, 0, 0, 0.8);
            padding: 40px 140px 0 140px;
             >p{
                @include sc(14px,#fff);
                line-height: 14px;
                margin-bottom: 30px;
                text-align: center;
            }
            >h2{
                font-weight: normal;
                >a{
                    display: inline-block;
                    @include wh(120px,40px);
                    @include sc(18px,#fff); 
                    border-radius: 20px;
                    border: solid 2px #ffffff;
                    line-height: 38px;
                    text-align: center;
                    // margin-left: 53px;
                    &:last-child{
                        float:right;
                    }
                }
            }
        }
        .demand-info,.coupon-info{
            @include wh(600px,200px);
            margin: auto;
            border-radius: 8px;
            background-color: rgba(0, 0, 0, 0.8);
            padding: 25px 140px 0 140px;
             >p{
                @include sc(14px,#fff);
                line-height: 14px;
                margin-bottom: 20px;
                text-align: center;
            }
            >h1{
                 @include sc(18px,#fff); 
                 font-weight: normal;
                 text-align: center;
                 margin-bottom: 10px;
            }
            >h2{
                font-weight: normal;
                text-align: center;
                >a{
                    display: inline-block;
                    @include wh(120px,40px);
                    @include sc(18px,#fff); 
                    border-radius: 20px;
                    border: solid 2px #ffffff;
                    line-height: 38px;
                    text-align: center;
                    // margin-left: 53px;
                    // &:last-child{
                    //     float:right;
                    // }
                }
            }
        }
        .coupon-info{
            >h2{
                margin-top: 40px;
            }
        }
    }
}
</style>

