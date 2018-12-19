<!--这是支付页面-->
<template>
    <div class="pay-result">
        <!-- 引入头部导航 -->
        <supplierHeader  :without="without"  :isHide="isHide"  @refreshList="payResultInit"></supplierHeader>
        <div class="result-con">
            <div class="result-state">
                <img src="../assets/images/pay-result.png" alt="">
                <h2>支付成功</h2>
                <p><a :href="'#/order-details/'+orderId">查看订单详情</a></p>
                <h3>页面将在<span>{{countText}}</span>秒后返回<a href="javascript:;">个人中心</a></h3>
            </div>
            <div class="result-info">
                <div>
                    <h2>付款信息：</h2>
                    <p>订单编号：<span>{{orderInfo.orderNo}}</span></p>
                    <p>订单金额：<span>¥{{payableAmt}}</span></p>
                </div>
                <div>
                    <h2>行程信息：</h2>
                    <p>行程日期：<span>{{orderInfo.tourDate}}-{{orderInfo.returnDate}}</span></p>
                    <p>出游人数：<span>{{parseInt(orderInfo.adultNum)+parseInt(orderInfo.childNum)}}</span></p>
                    <p>目的城市：<span>{{orderInfo.destName}}</span></p>
                </div>
            </div>
        </div>
        <feedBack></feedBack>
        <!-- 引入底部导航 -->
       <Footer></Footer>
    </div>
</template>
<script>
import tools from "../common/tools";
import supplierHeader from "../components/supplier-header.vue";
import Footer from "../components/footer.vue";
import feedBack from "../components/feedBack.vue";
import {
  getOrderInfoForPay,
} from "../services/index";
export default {
    data(){
        return{
            without:true,
            isHide: false, 
            orderId:'',//订单id
            orgId:'',
            orderInfo:'',//订单详情
            payableAmt:'',//订单金额
            countTime:0,
            countSecond:4,
        }
    },
    methods: {
         // 跳转页面倒计时
        countTimer() {
            if (this.countTime > 0) {
                this.countTime--;
                setTimeout(this.countTimer, 1000);
            } else {
                this.countTime=0;
                this.$router.push('/personal-data/1');
            }
        },
        payResultInit(){
            this.orderId=this.$route.params.orderId;
            this.countTime = this.countSecond;   
            this.countTimer();
            //  订单详情接口
            let paramsOrder={
                'orderId':this.orderId,
            }
            getOrderInfoForPay(paramsOrder).then(response => {
                console.log(response);
                if (response.meta.success == true) {
                    console.log("订单详情获取成功");
                    if(response.data!=null){
                        this.orderInfo=response.data;
                        this.payableAmt=response.data.payableAmt;
                    }
                } else {
                    console.log("订单详情获取失败");
                }
                }).catch(err => {
                    console.log("订单详情接口异常", err);
            });
        }
    },
    mounted(){
       
    },
    components:{
        supplierHeader,
        Footer,
        feedBack
    },
    computed: {
        countText:function(){
           return this.countTime > 0 ? this.countTime:0;  
        }
    }
}
</script>

<style lang="scss">
.pay-result{
    position: relative;
    min-height: 100vh;
    overflow: auto;
    padding-bottom: 190px;
    .supplier-nav{
        display: none;
    }
    .footer{
        position: absolute;
        bottom: 0;
    }
    .result-con{
        width: 1180px;
        margin: auto;
        .result-state{
            box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.11);
            border-top:4px solid #ffba00;
            text-align: center;
            padding: 80px 0;
            margin-bottom: 20px;
            >img{
               @include wh(74px,74px); 
            }
            >h2{
               @include sc(28px,#333); 
               margin: 20px 0 30px 0;
            }
            >p{
               >a{
                    @include wh(160px,34px);
                    line-height: 32px;
                    border:1px solid #ffba00;
                    @include sc(14px,#ffba00);
                    text-align: center;
                    display: inline-block;
               }
            }
            >h3{
               @include sc(20px,#999);
               font-weight: normal;
               margin-top: 30px;
               >span{
                  @include sc(28px,#999); 
                  margin: 0 10px;
               } 
               >a{
                   text-decoration: underline;
                   @include sc(20px,#ffba00);
               }
            }
        }
        .result-info{
            box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.11);
            padding: 0 250px;
            >div{
                padding-bottom: 15px;
                padding-left: 10px;
                &:first-child{
                    border-bottom: 1px solid #ccc;
                }
                >h2{
                    @include sc(18px,#333); 
                    padding-top: 25px;
                    margin-bottom: 10px;
                } 
                >p{
                    @include sc(16px,#333);
                    margin-bottom: 10px;
                    >span{
                        @include sc(16px,#ffba00);
                    }
                }
            }
        }
    }
}
</style>

