<!--这是支付页面-->
<template>
    <div class="coupon-pay">
        <!-- 引入头部导航 -->
        <supplierHeader  :without="without"  :isHide="isHide"  @refreshList="couponPayInit"></supplierHeader>
        <p class="bread-crumbs">您当前所在位置：<a :href="'#/supplier?orgId=' + orgId">首页 > </a><a :href="fromPath">{{fromName}} > </a><span>订单支付</span></p>
        <h2 class="pay-title">收银台</h2>
        <p class="pay-title-e">Cashier desk</p>
        <div class="orderinfo">
            <div class="order-left">
                <h2>待支付</h2>
                <h1>￥{{couponNum*unitamt}}</h1>
                <div>
                    <div>
                        <p>购买数量</p>
                        <p>{{couponNum}}</p>
                    </div>
                    <div>
                        <p>购买单价：</p>
                        <p>{{unitamt}}</p>
                    </div>
                </div>
            </div>
            <div class="order-right">
                <h2>可抵金额：{{deductionamt}}元X{{couponNum}}</h2>
                <img :src="couponUrl" alt="">
            </div>
        </div>
        <div class="online-pay">
            <h2>线下支付</h2>
            <div v-for="(set,index) in finReceivingSets" v-if="finReceivingSets.length!=0&&index==0">
                <div class="card-wx" :class="payWay=='微信'?'active':''" v-if="set.wechatpay!=null" @click="selectWx(set)">
                    <img src="../assets/images/pay-wechat.png" alt="">
                    <div>
                        <h2>微信转账</h2>
                        <p>账号：{{set.wechatpay}}</p>
                        <p>姓名：{{set.wechatpayuser}}</p>
                    </div>
                    <i v-if="payWay=='微信'"></i>
                </div>
                <div class="card-alipay" :class="payWay=='支付宝'?'active':''" v-if="set.alipay!=null" @click="selectAli(set)">
                    <img src="../assets/images/pay-zhifu.png" alt="">
                    <div>
                        <h2>支付宝转账</h2>
                        <p>账号：{{set.alipay}}</p>
                        <p>姓名：{{set.alipayuser}}</p>
                    </div>
                    <i v-if="payWay=='支付宝'"></i>
                </div>
                <p></p>
            </div>
        </div>
        <div class="off-pay"  v-if="finBankAccounts.length!=0">
            <p>银行卡</p>
            <div class="card divcard" :class="payNo==bank.bankaccount?'active':''" v-for="(bank,index) in finBankAccounts" @click="selectBank(bank)">
                <img src="../assets/images/pay-card.png" alt="">
                <div>
                    <div>开户银行：<span>{{bank.depositbank}}</span></div>
                    <p>收款账号：{{bank.bankaccount}}</p>
                    <p>开户人：{{bank.cardholder}}</p>
                    <p>备注：{{bank.comment}}</p>
                </div>
                <i v-if="payNo==bank.bankaccount"></i>
            </div>
            <h1></h1>
        </div>
        <div class="pay-way">
            <label for="" class="elem-title">付款方式：</label>
            <a href="javascript:;" :class="payType==1?'active':''" @click="payType=1">转账支付</a>
            <!-- <a href="javascript:;" :class="payType==2?'active':''" @click="payType=2">账期支付</a> -->
            <p></p>
        </div>
        <div class="pay-account" v-if="payType==1">
            <label for="" class="elem-title">卖家收款账号：</label>
            <select name="" id="" v-model="payWay" disabled>
                <option value="银行卡">银行卡</option>
                <option value="支付宝">支付宝</option>
                <option value="微信">微信</option>
            </select>
            <input type="text" placeholder="可以选择付款账号" v-model="payNo" disabled>
            <p></p>
        </div>
        <div class="pay-credentials" v-if="payType==1">
            <label for="" class="elem-title">付款凭证：</label>
            <div>
                <a href="javascript:;">选择上传</a>
                <input accept="image/*" type="file" multiple  @change="onFileChange">
            </div>
            <p>附件最大不超过20M,最多上传三张</p>
            <h1></h1>
        </div>
        <div class="upload-img" v-if="uploadImgList.length!=0&&payType==1">
            <img :src="img.filepath" alt="" v-for="(img,index) in uploadImgList">
        </div>
        <div v-if="payType==2" class="pay-days">
            <label for="" class="elem-title">预计支付账期：</label>
            <div>
                <DatePicker type="date" placeholder=""></DatePicker>
                <p><span>授信额度：10000.00</span><span>剩余额度：10000.00</span><span>最大账期：0天</span></p>
            </div>
        </div>
        <div class="pay-note">
            <label for="" class="elem-title">备注：</label>
            <textarea name="" id="" cols="20" rows="2" placeholder="备注" v-model="comment"></textarea>
            <p></p>
        </div>
        <div class="pay-btn">
            <a href="javascript:;" class="btn btn-orange" @click="paySubmit">支付申请</a>
            <a href="javascript:;" class="btn btn-default" @click="goHome()">返回首页</a>
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
  getBankAccount,
  uploadPayImg,
  postCouponsPay,
  finProOtherProduct
} from "../services/index";
export default {
    data(){
        return{
            without:true,
            isHide: false, 
            orgId:'',
            couponNum:'',
            couponUrl:'',
            unitamt:'',
            deductionamt:'',


            finReceivingSets:[],//
            finBankAccounts:[],
            uploadImgList:[],//上传的凭证
            comment:'',//备注
            payableAmt:'',//付款金额
            payWay:'',//付款方式
            payNo:'',//付款账号
            bank:'',//开户银行
            bankId:'',//开户银行id
            payState:1,//禁止重复提交标识
            payType:1,//付款方式默认值
            fromName:'',//从哪个页面来
            fromPath:'',//上个页面路径
            orderInfo:'',
            payableAmt:'',
        }
    },
    methods: {
        // 返回首页
        goHome(){
            let orgID=tools.getLocalStorage('orgId');
            this.$router.push('/supplier?orgId='+orgID);
        },
        // 支付页面初始化
        couponPayInit(){
           this.orgId=tools.getLocalStorage('orgId');
           this.couponNum=tools.getLocalStorage('couponNum');
           //优惠劵购买信息
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
           
            // 支付方式接口
            let paramsPay={
                'orgId':this.orgId,
            }
            getBankAccount(paramsPay).then(response => {
                console.log(response);
                if (response.meta.success == true) {
                    console.log("支付方式获取成功");
                    this.finBankAccounts=response.data.finBankAccounts;
                    this.finReceivingSets=response.data.finReceivingSets;
                    if(this.finReceivingSets.length!=0){
                        if(this.finReceivingSets[0].wechatpay!=null){
                            this.payNo=this.finReceivingSets[0].wechatpay;
                            this.payWay='微信';
                        }
                        else{
                            this.payNo=this.finReceivingSets[0].alipay;
                            this.payWay='支付宝';
                        }
                    }
                    else{
                        this.payNo=this.finBankAccounts[0].bankaccount;
                        this.payWay='银行卡';
                    }
                } else {
                    console.log("支付方式获取失败");
                }
                }).catch(err => {
                    console.log("支付方式接口异常", err);
            });
       },

        //上传凭证    
        onFileChange(){
            if(this.uploadImgList.length==3){
                this.$Message.info('最多上传三张凭证！');
                return;
            } 
            let form = new FormData(); 
            if(event.target.files.length>3){
                this.$Message.info('最多上传三张凭证！');
                return;
            }
            for(let i=0;i<event.target.files.length;i++){
                form.append('file',event.target.files[i],event.target.files[i].name); 
            }
            uploadPayImg(form).then((response)=>{
                console.log(response);
                if(response.meta.success==true){
                    console.log('图片上传成功');
                    for(let i=0;i<response.data.length;i++){
                        this.uploadImgList.push(response.data[i]);
                    }
                }
                else{
                    console.log('图片上传失败');
                }
            })
        },
        // 选择银行卡
        selectBank(obj){
          this.payWay="银行卡";
          this.payNo=obj.bankaccount;
          this.bank=obj.depositbank;
          this.bankId=obj.id;
        },
        // 选择微信
        selectWx(obj){
            console.log(obj);
            this.payWay="微信";
            this.payNo=obj.wechatpay;
            this.bank='';
            this.bankId='';
        },
        // 选择支付宝
        selectAli(obj){
            this.payWay="支付宝";
            this.payNo=obj.alipay;
            this.bank='';
            this.bankId='';
        },
        // 支付申请
        paySubmit(){
            if(this.uploadImgList.length==0){
                this.$Message.info('请先上传付款凭证！');
                return;
            }
            if(this.payState==1){
                this.payState=0;
                let params={
                    'count':this.couponNum,
                    'fileArray':this.uploadImgList,
                    'shoporgid':this.orgId,
                    'comment':this.comment,
                    'payNo':this.payNo,
                    'payWay':this.payWay,
                    'srcBank': this.bank
                }
                postCouponsPay(params).then(response => {
                    console.log(response);
                    if (response.meta.success == true) {
                        console.log("优惠券购买提交成功");
                        this.$Message.info('支付成功');
                        tools.setLocalStorage("couponNo",response.meta.message);
                        this.$router.push('/process/5');
                    } else {
                        console.log("优惠券购买提交失败");
                        this.$Message.info(response.meta.message);
                        this.payState=1;
                    }
                })
                .catch(err => {
                    console.log("优惠券购买提交异常", err);
                });
            }
        }
    },
    mounted(){
        // this.payInit();
    },
    components:{
        supplierHeader,
        Footer,
        feedBack
    }
}
</script>

<style lang="scss">
.coupon-pay{
    background: #f2f2f2;
    .bread-crumbs{
        @include sc(14px,#999);
        padding: 12px 0;
        width:1180px;
        margin: auto;
        >span{
        @include sc(14px,#666);
        }
    }
    .pay-title{
        @include sc(24px,#333);
        text-align: center;
        line-height: 24px;
        margin-bottom: 6px;
        margin-top: 8px;
        font-weight: bold;
    }
    .pay-title-e{
        @include sc(12px,#333);
        text-align: center;
        margin-bottom: 20px;
    }
    .orderinfo{
        width:1180px;
        margin: auto;
        position: relative;
        height: 380px;
        .order-left{
            position: absolute;
            z-index: 100;
            box-shadow: 0px 6px 20px 3px rgba(4, 0, 0, 0.1);
	        border-radius: 10px;
            background: #ffba00;
            top:40px;
            left:0;
            width: 512px;
            >h2{
                height: 98px;
                padding-left: 30px;
                @include sc(24px,#fff);
                line-height: 98px;
            }
            >h1{
                height: 78px;
                background: #fff;
                @include sc(40px,#333);
                text-align: center;
                line-height: 78px;
            }
            >div{
                font-size: 0;
                padding: 50px 0 10px 0;
                >div{
                    display: inline-block;
                    vertical-align: top;
                    width: 50%;
                    >p{
                        @include sc(18px,#fff);
                        margin-bottom: 5px;
                    }
                    &:first-child{
                        padding-left: 30px;
                    }
                }
            }
        }
        .order-right{
            position: absolute;
            z-index: 99;
            background-color: #ffffff;
            box-shadow: 0px 6px 20px 3px rgba(4, 0, 0, 0.1);
            border-radius: 6px;
            width: 930px;
            height: 380px;
            right:0;
            padding-left: 320px;
            padding-top: 90px;
            padding-right: 80px;
            >h2{
                @include sc(18px,#333);
                margin-bottom: 25px;
            }
        }
    }
    .online-pay{
        width: 1180px;
        margin:50px auto 30px;
        >h2{
           @include sc(18px,#333); 
           padding-left: 40px;
           margin-bottom: 30px;
        }
        >div{
            width:1080px;
            margin-left: 60px;
            border-bottom:1px solid #ccc;
            padding-bottom: 30px;
            font-size: 0;
            .card-wx{
                margin-right: 40px;
            }
            .card-wx,.card-alipay{
                display: inline-block;
                vertical-align: top;
                width: 520px;
                height: 154px;
                background-color: #ffffff;
                box-shadow: 0px 6px 20px 3px rgba(4, 0, 0, 0.1);
                border-radius: 6px;
                padding: 40px 0 0 60px;
                position: relative;
                border:1px solid transparent;
                &.active{
                    border:1px solid #ffba00;
                }
                >div{
                    display: inline-block;
                    vertical-align: top;
                    margin-left: 10px;
                    >h2{
                        @include sc(18px,#333);
                        margin-bottom: 2px;
                    }
                    >p{
                        @include sc(16px,#666);
                    }
                }
                >i{
                    position: absolute;
                    bottom:0;
                    right:0;
                    background: url('../assets/images/pay-s.png') no-repeat;
                    background-size:100%;
                    @include wh(52px,44px);
                }
            }
        }
    }
    .off-pay{
        width:1180px;
        padding-left: 20px;
        margin: auto;
        >p{
            @include sc(18px,#333); 
            padding-left: 40px;
            margin-bottom: 30px;
        }
        .card{
            display: inline-block;
            width: 520px;
            height: 154px;
            background-color: #ffffff;
            box-shadow: 0px 6px 20px 3px rgba(4, 0, 0, 0.1);
            border-radius: 6px;
            margin-bottom: 20px;
            padding: 40px 0 0 60px;
            margin-left: 40px;
            position: relative;
            border:1px solid transparent;
                &.active{
                    border:1px solid #ffba00;
                }
            >div{
                display: inline-block;
                vertical-align: top;
                margin-left: 10px;
                >p{
                    @include sc(14px,#666);
                    line-height: 18px;
                }
                >div{
                    @include sc(14px,#666);
                    line-height: 20px;
                    >span{
                        @include sc(14px,#333);
                    } 
                }
            }
            >i{
                position: absolute;
                bottom:0;
                right:0;
                background: url('../assets/images/pay-s.png') no-repeat;
                background-size:100%;
                @include wh(52px,44px);
            }
        }
        >h1{
            width: 1080px;
            height: 1px;
            background: #ccc;
            margin-left: 40px;
            margin-top: 10px;
            margin-bottom: 30px;
        }
    }
    .pay-way,.pay-account,.pay-credentials,.pay-note,.pay-days{
        width: 1180px;
        margin:0 auto 20px;
        >label{
            display: inline-block;
            width: 180px;
            text-align: right;
            @include sc(18px,#333);
        }
    }
    .pay-way{
        >a{
            display: inline-block;
            @include wh(84px,30px);
            @include sc(14px,#999);
            border:1px solid #ccc;
            border-radius: 6px;
            line-height: 28px;
            text-align: center;
            margin-right: 5px;
            &.active{
                border:1px solid #ffba00;
                @include sc(14px,#ffba00);
            }
        }
    }
    .pay-account{
        >select{
           @include wh(84px,30px);
           border-radius: 6px;
           background: transparent; 
           @include sc(14px,#333);
           padding-left: 7px;
           margin-right: 5px;
        }
        >input{
            @include wh(360px,30px);
            border:1px solid #ccc;
            border-radius: 6px;
            @include sc(14px,#999);
            background: transparent;
            padding-left: 10px;
        }
    }
    .pay-credentials{
        >div{
            display: inline-block;
            position: relative;
            >a{
                display: inline-block;
                @include wh(84px,30px);
                @include sc(14px,#fff);
                background: #ffba00;
                border-radius: 6px;
                line-height: 30px;
                text-align: center;
            }
            >input{
                position: absolute;
                @include wh(84px,30px);
                top:0;
                left:0;
                opacity: 0;
            }
        }
        >p{
            display: inline-block;
            @include sc(14px,#e42c2c);
            margin-left: 8px;
        }
    }
    .pay-days{
        >div{
            display: inline-block;
            vertical-align: top;
            .ivu-date-picker{
                display: inline-block;
                width: 178px;
                .ivu-input{
                    background: transparent;
                }
            }
            >p{
                display: inline-block;
                @include sc(14px,#e42c2c);
               vertical-align: middle;
                >span{
                    margin-left: 9px;
                }
            }
        }
    }
    .pay-note{
        >textarea{
            display: inline-block;
            vertical-align: top;
            @include wh(780px,104px);
            background: transparent;
            border:1px solid #ccc;
            border-radius: 6px;
            padding: 8px 13px;
            outline: none;
            resize: none;
        }
    }
    .upload-img{
        width: 1180px;
        margin:-10px auto 20px;
        padding-left: 190px;
        >img{
           @include wh(180px,180px); 
           margin-right: 10px;
        }
    }
    .pay-btn{
        margin: 40px 0 96px 0;
        text-align: center;
        .btn{
            display: inline-block;
            @include wh(120px,40px);
            border-radius: 6px;
            line-height: 40px;
            text-align: center;
            @include sc(18px,#fff);
        }
        .btn-orange{
            background: #ffba00;
            margin-right: 40px;
        }
        .btn-default{
            background: #ccc;
            margin-left:40px;
        }
    }
}
</style>

