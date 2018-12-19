<!--这是意见反馈组件-->
<template>
    <div class="feedback">
         <!-- :class="userType==2?'none':(isService==false?'esp':'')" -->
       <div :class="(userType==2&&isService==true)?'none':(isService==false?'esp':'')">
           <a href="#/coupon" v-if="userType==1" class="esp">领券中心</a>
           <!-- v-if="serviceTel!=''&&serviceTel!=null && serviceTel!='null'"  -->
           <a v-if="isService==true" :class="feedType==1?'active':''" @mouseover="feedType=1" @mouseout="feedType=0" href="javascript:;"><img v-if="feedType==1" src="../assets/images/kefu1.png" alt=""><img v-if="feedType!=1" src="../assets/images/kefu2.png" alt="">
            <p>客服</p>
            <div class="contact" v-if="feedType==1">
                <div class="tel-con">
                    <img src="../assets/images/dianhua.png" alt="">
                    <span>电话客服：</span>
                    <div>
                        <p>{{serviceTel}}</p>
                        <!-- <p>021-62415312</p>
                        <p>021-62470332</p> -->
                    </div>
                </div>
                <!-- <div class="qq-con">
                    <img src="../assets/images/qq.png" alt="">
                    <span>QQ客服：</span>
                    <div>
                        <p>1666723307</p>
                        <p>1405472312</p>
                        <p>3459424110</p>
                    </div>
                </div> -->
                <p>如有问题请您联系客服</p>
            </div>
           </a>
           <a :class="feedType==2?'active':''"  @click="feedbackFun()" href="javascript:;"><img v-if="feedType==2" src="../assets/images/fankui2.png" alt=""><img v-if="feedType!=2" src="../assets/images/fankui1.png" alt=""><p>反馈</p></a>
           <a :class="feedType==3?'active':''" @mouseover="feedType=3" @mouseout="feedType=0"  href="javascript:;"><img v-if="feedType==3" src="../assets/images/fenxiang2.png" alt=""><img v-if="feedType!=3" src="../assets/images/fenxiang1.png" alt="">
             <!-- v-if="isShow==true" -->
            <p>分享</p>
            <div class="ma-code" v-if="feedType==3">
                <img :src="codeImg" alt="">
                <p>微信扫一扫查看</p>
            </div>
           </a>
           <a :class="feedType==4?'active':''"  @click.prevent="tripAnchor()" href="javascript:;"><img v-if="feedType==4" src="../assets/images/zhiding2.png" alt=""><img v-if="feedType!=4" src="../assets/images/zhiding1.png" alt=""><p>置顶</p></a>
        </div>
    </div>
</template>
<script>
import tools from "../common/tools";
import { GetCustomerServiceInfo,getProShareQRCode } from "../services/index";
export default {
  props: ["isShow"],
  data() {
    return {
      feedType:0,
      userType:'',
      setUrl:'',
      proId:'',//产品id
      siteId:'',
      codeImg:'',//二维码图片
      serviceTel:'',//客服电话
      isService:false,//是否有客服电话
    };
  },
  methods: {
    feedbackFun(){
        if(this.userType==1){
            let userName=tools.getSessionStorage('userName');
            let userID=tools.getSessionStorage('userId');
            window.open('http://omp.'+this.setUrl+'/Module/QA/ProblemFeedback.aspx?CreatedByType=1&CreatedBy='+userName+'&CreatedByID='+userID+'&System=3');
        }
        if(this.userType==2){
            window.open('http://omp.'+this.setUrl+'/Module/QA/ProblemFeedback.aspx?CreatedByType=2&CreatedBy=&CreatedByID=&System=3');
        }
    },
    feedbackInit(){
        this.setUrl=window.location.href.split('//')[1].split('/')[0].split('.')[1]+'.'+window.location.href.split('//')[1].split('/')[0].split('.')[2];
        this.userType = tools.getLocalStorage("userType");
        this.orgId=tools.getLocalStorage('orgId');
        var couTime=setInterval(()=>{
            if(tools.getSessionStorage('siteid')!=null&&tools.getLocalStorage('proId')!=null&&tools.getLocalStorage('isOutgoing')!=null){
                clearInterval(couTime);
                this.proId=tools.getLocalStorage('proId');
                this.siteId=tools.getSessionStorage('siteid');
                // 分享二维码
                let paramsCode={
                    'proId':this.proId,
                    'siteId':this.siteId,
                    'isOutgoing':tools.getLocalStorage('isOutgoing'),
                    'orgId':tools.getLocalStorage('orgId')
                }
                getProShareQRCode(paramsCode).then(response => {
                    console.log(response);
                    console.log(paramsCode,'paramsCodeparamsCodeparamsCode');
                    console.log("分享二维码成功分享二维码成功");
                    this.codeImg=response;
                    })
                    .catch(err => {
                    console.log("分享二维码异常", err);
                    });
                }
            },1000)


            var telTime=setInterval(()=>{
                if(tools.getLocalStorage('orgId')!=null && tools.getLocalStorage('orgId')!='undefined'){
                clearInterval(telTime);
                this.orgId=tools.getLocalStorage('orgId');
                // 客服电话
                let paramsTel={
                    // 'orgID':'D2FB3DB0-AFFD-46C6-AE75-EBFDAF27F567'
                    'orgID':this.orgId
                }
                GetCustomerServiceInfo(paramsTel).then(response => {
                    console.log(response);
                    console.log("客服电话");
                    this.serviceTel=response;
                    console.log(this.isService,'this.isService11')
                        if(response!=null&&response!='null'){
                            this.isService=true;
                            console.log(this.isService,'this.isService')
                        }
                    })
                .catch(err => {
                    console.log("客服电话异常", err);
                });
            }
        },1000)
    },
    //导航锚点定位
    tripAnchor() {
     window.scrollTo(0, 0);
    },
  },
  mounted() {
     this.feedbackInit();
  }
};
</script>

<style lang="scss">
 .feedback {
        width: 1180px;
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        > div {
            width: 60px;
            position: absolute;
            right: -60px;
            bottom: 160px;
            z-index: 1000;
            box-sizing: border-box;
            &.none{
                bottom: 280px;
            }
            &.esp{
                bottom: 220px;
            }
            > a {
                width: 58px;
                display: inline-block;
                height: 60px;
                line-height: 60px;
                text-align: center;
                background: #fff;
                @include sc(14px, #333);
                border-bottom: 1px solid #ddd;
                border-left: 1px solid #ddd;
                border-right: 1px solid #ddd;
                box-sizing: border-box;
                font-size: 0;
                position: relative;
                .contact{
                    font-size: 0;
                    line-height: 20px;
                    position: absolute;
                    right: 57px;
                    top:-25px;
                    z-index: 1000;
                    background: #fff;
                    width: 219px;
                    box-shadow: 0px 3px 7px 0px rgba(123, 121, 142, 0.35);
                    border-radius: 4px;
                    padding: 20px 20px 10px 20px;
                    .tel-con,.qq-con{
                        margin-bottom: 5px;
                        box-sizing: border-box;
                        >img{
                            display: inline-block;
                            vertical-align: top;
                            margin-top: 2px;
                            margin-right: 5px;
                        }
                        >span{
                            @include sc(12px,#747474);
                        }
                        >div{
                            display: inline-block;
                            vertical-align: top;
                            >p{
                            @include sc(12px,#ffba00);  
                            margin-bottom: 2px;
                            }
                        }
                    }
                    >p{
                        @include sc(12px,#000003);
                        text-align: center;
                        margin-top: 10px;
                    }
                }
                .ma-code{
                    position: absolute;
                    right: 57px;
                    top:-110px;
                    z-index: 1000;
                    background: #fff;
                    width: 150px;
                    height: 170px;
                    text-align: center;
                    box-shadow: 0px 3px 7px 0px rgba(123, 121, 142, 0.35);
                    border-radius: 4px;
                    padding-top:10px;
                    >img{
                        width: 130px;
                        height: 130px;
                        display: inline-block;
                    }
                    >p{
                        color: #333;
                        font-size: 14px;
                        line-height: 20px;
                        position: absolute;
                        bottom:5px;
                        width: 100%;
                        text-align: center;
                    }
                }
                &.active {
                    @include sc(14px, #fff);
                    background-image: linear-gradient(36deg, #ffba00 0%,#fecd4b 50%, #fde093 100%), 
                                    linear-gradient(0deg, #005bac 0%, #008871 50%, #008c6b 55%, #6fba2c 100%);
                    >p{
                        @include sc(14px,#fff);
                    }
                }
                >img{
                    display: block;
                    margin: auto;
                    margin-top: 10px;
                    margin-bottom: 6px;
                }
                >p{
                    @include sc(14px,#747474);
                    line-height: 14px;
                }
                &:first-child{
                    border-top:1px solid #ddd;
                }
            }
            .esp{
                @include sc(14px,#747474);
                // &:hover{
                //      @include sc(14px, #fff);
                //     background-image: linear-gradient(36deg, #ffba00 0%,#fecd4b 50%, #fde093 100%), 
                //                     linear-gradient(0deg, #005bac 0%, #008871 50%, #008c6b 55%, #6fba2c 100%);
                // } 
            }
        }
    }
</style>
