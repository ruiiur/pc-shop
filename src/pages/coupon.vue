<!--这是优惠券页面-->
<template>
    <div class="coupon">
        <supplierHeader  @global="globalFunT"  :isHide="isHide" @refreshList="couponInit"></supplierHeader>
        <div class="coupon-con">
            <div>
                <div class="buy-con">
                    <img src="../assets/images/youhuiquan.png" alt="">
                    <a href="javascript:;"  @click="modalCoupon=true">立即购买</a>
                </div>
                <div class="code-con">
                    <img :src="codeUrl" alt="">
                    <p>扫一扫立即购券</p>
                </div>
            </div>
        </div>
        <Modal
            v-model="modalCoupon"
            class-name="vertical-center-modal modal-coupon"
            >
            <div>
                <p>您将支付<span>{{unitamt*num}}</span>元进行购买  确定购买？</p>
                <img :src="couponUrl" alt="">
                <div class="buy-num">
                    <label for="">购买数量：</label>
                    <p><i class="num-reduce" @click="reduceFun()"></i><em>{{num}}</em><i class="num-add" @click="addFun()"></i></p>
                    <span>￥{{unitamt*num}}元</span>
                </div>
                <h2>可抵{{deductionamt}}元 x{{num}}</h2>
                <a href="javascript:;" class="buy-btn" @click="buyFun()">确定购买</a>
                <a href="javascript:;" class="cancel" @click="modalCoupon=false">取消</a>
                <!-- <a href="javascript:;" class="close" @click="modalCoupon=false"></a>  -->
            </div>
        </Modal>
        <Footer></Footer>
    </div>
</template>
<script>
import tools from "../common/tools";
import supplierHeader from "../components/supplier-header.vue";
import Footer from "../components/footer.vue";
import {
   finProOtherProduct,
   getCoupon
} from "../services/index";
export default {
    data(){
        return{
            modalCoupon:false,//优惠券弹窗
            isHide:false,
            orgId:'',//当前店铺id
            deductionamt:'',//可抵金额
            unitamt:'',//单价
            num:1,//选择个数
            couponUrl:'',
            codeUrl:'',
        }
    },
    methods: {
        globalFunT() {
            this.isHide = !this.isHide;
        },
        couponInit(){
            this.orgId=tools.getLocalStorage("orgId");
            finProOtherProduct().then(response => {
                console.log(response);
                if (response.meta.success == true) {
                    console.log("获取优惠券产品接口成功");
                    this.unitamt=response.data.unitamt;//单价
                    this.deductionamt=response.data.deductionamt;//可抵金额
                    this.couponUrl=response.data.picurl;
                } else {
                    console.log("获取优惠券产品接口失败");
                }
            })
            .catch(err => {
                console.log("获取优惠券产品接口异常", err);
            });

            let params={
                'orgId':this.orgId
            }
            getCoupon(params).then(response => {
                console.log(response);
                console.log("获取二维码接口成功");
                this.codeUrl=response;
            })
            .catch(err => {
                console.log("获取二维码接口异常", err);
            });
        },
        // 确认购买
        buyFun(){
            tools.setLocalStorage("couponNum",this.num);
            this.modalCoupon=false;
            this.$router.push('/coupon-pay');
        },
        // 增加个数
        addFun(){
            this.num++;
        },
        // 减少个数
        reduceFun(){
            this.num--;
        }
    },
    components:{
        supplierHeader,
        Footer
    },
    mounted(){
    }
}
</script>

<style lang="scss">
.modal-coupon{
    .ivu-modal{
        width: 500px;
        border-radius: 6px;
        border:6px solid #e1e1e1;
        background: #fff;
    }
    .ivu-modal-footer{
        display: none;
    }
   .ivu-modal-body{
       padding-bottom: 30px;
       >div{
           text-align: center;
            >p{
                @include sc(16px,#333);
                margin-top: 20px;
                >span{
                    @include sc(22px,#ffa100);
                }
            }
            >img{
                @include wh(283px,147px);
                margin: 25px 0 20px 0; 
            }
            .buy-num{
                line-height: 34px;
                >label{
                    @include sc(14px,#333); 
                    display: inline-block;
                    vertical-align: top;
                    margin-top: 5px;
                }
                >p{
                    display: inline-block;
                    line-height: 34px;
                    height: 34px;
                    font-size: 0;
                    > i {
                        display: inline-block;
                        vertical-align: middle;
                        @include wh(32px, 34px);
                    }
                    .num-reduce {
                        background: url("../assets/images/jian1.png") no-repeat;
                        background-size: 100%;
                    }
                    .num-add {
                        background: url("../assets/images/jia1.png") no-repeat;
                        background-size: 100%;
                    }
                    > em {
                        display: inline-block;
                        vertical-align: middle;
                        @include wh(39px, 34px);
                        @include sc(17px,#fff);
                        line-height: 34px;
                        background-image: linear-gradient(36deg, #5280eb 0%, #83b4fc 100%), linear-gradient(#ff2727, #ff2727);
                        text-align: center;
                    } 
                }
                >span{
                    @include sc(15px,#ff5512);
                    margin-left: 10px;
                    display: inline-block;
                    vertical-align: top;
                    margin-top: 5px;

                }
            }
            >h2{
                @include sc(14px,#666);
                margin-top: 10px;
            }
            .buy-btn{
                @include wh(94px,38px);
                border-radius: 4px;
                line-height: 38px;
                text-align: center; 
                @include sc(16px,#fff);
                background-color: #ffba00;
                display: inline-block;
                margin-top: 18px;
            }
            .cancel{
                @include wh(94px,38px);
                border-radius: 4px;
                line-height: 36px;
                text-align: center; 
                @include sc(16px,#333);
                background-color: rgba(225, 225, 225, 0.5);
                display: inline-block;
                border: solid 1px rgba(225, 225, 225, 0.5);
                margin-top: 18px;
                margin-left: 40px;
            }
        }
     } 
}
.coupon{
    .supplier-nav{
        display: none;
    }
   .coupon-con{
       background: url('../assets/images/coupon-bg.png') no-repeat;
       background-size:100% 100%;
       min-height: calc(100vh - 224px);
       >div{
            width: 1180px;
            margin: auto;
            position: relative;
            .buy-con{
               position: absolute;
               top:154px;
               right: 55px;
               >img{
                    width: 551px;
                    height: 202px;
                }
                >a{
                    display: inline-block;
                    @include wh(94px,34px);
                    border: solid 1px #fdf3da;
                    border-radius: 10px;
                    line-height: 32px;
                    text-align: center;
                    position: absolute;
                    top:115px;
                    left:14px;
                    @include sc(16px,#fdf3da);
                }
            }
            .code-con{
                position: absolute;
                width: 100%;
                text-align: center;
                top:450px;
                >img{
                    @include wh(126px,126px);
                }
                >p{
                    @include sc(18px,#fff);
                    margin-top: 10px;
                }
            }
       }
   }
}
</style>
