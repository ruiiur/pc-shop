<!--这是方案列表页面-->
<template>
    <div class="plan-list">
        <!-- 供应商导航引入 -->
        <supplierHeader :logo="logoPic" :without="without" @refreshList="planListInit"></supplierHeader>
        <p class="bread-crumbs">您当前所在位置：<span>首页 ></span><span>个人中心 ></span><span>我的定制 ></span><span>查看方案</span></p>
        <div class="plan-content">
            <div class="con-left">
                <div>
                    <img src="../assets/images/data-logo.png" alt="">
                </div>
                <ul>
                    <li @click="toPersonal(1)"><img src="../assets/images/order-i.png" alt="">订单查询</li>
                    <li @click="toPersonal(2)"><img src="../assets/images/data-i.png" alt="">个人资料</li>
                    <li class="active" @click="toPersonal(3)"><img src="../assets/images/damand-i.png" alt="">我的定制</li>
                </ul>
            </div>
            <div class="con-demand">
                <img src="../assets/images/de-banner.png" alt="">
                <div class="plan-state" v-if="status!=2" >
                    <span>{{statusTip}}</span>
                    <div v-if="status==3">
                        <p>订单金额：<span>{{cusCusinfo.budget}}</span></p>
                        <div>
                            <a href="javascript:;" @click="cancelDemandOrderFun(cusCusinfo)">取消订单</a>
                            <!-- <a href="javascript:;">支付</a> -->
                        </div>
                    </div>
                    <a v-if="status==1" href="javascript:;" @click="cancelDemandOrderFun(cusCusinfo)">取消订单</a>
                </div>
                <h2 v-if="planList.length!=0"><img src="../assets/images/plan.png" alt="">定制方案列表</h2>
                <div class="plan-con">
                    <div v-for="(plan,index) in planList">
                        <p :class="status!=2?'esp':''"><span v-if="status==2||status==6">方案{{index+1}}</span>{{plan.createddate}}</p>
                        <div class="plan-top">
                            <h2>{{plan.subjectname}}</h2>
                            <p>报价<span>{{plan.amt}}</span></p>
                        </div>
                        <div class="plan-bottom">
                            <div class="plan-img">
                                <img :src="plan.logo" alt="">
                            </div>
                            <div class="plan-info">
                                <h2>{{plan.erpUserDto.deptName}}</h2>
                                <p>定制师<i>{{plan.erpUserDto.userName}}</i><span><i></i>{{plan.erpUserDto.mobile}}</span></p>
                                <div>
                                    <p><label for="">行程天数：</label>{{plan.traveldays}}</p>
                                    <p><label for="">出游人数：</label>{{plan.adultqty}}成人{{plan.childrenqty}}儿童</p>
                                </div>
                                <div class="info-time">
                                    <p><label for="">出发时间：</label>{{plan.tourdate}}</p>
                                    <p><label for="">返程时间：</label>{{plan.enddate}}</p>
                                </div>
                                <div>
                                    <p><label for="">出发城市：</label>{{plan.departure}}</p>
                                    <p><label for="">目的城市：</label>{{plan.destination}}</p>
                                </div>
                            </div>
                            <div class="plan-btn">
                                <a :href="'#/demand-details/'+plan.id">方案详情</a>
                                <a href="javascript:;" @click="confirmPlan(plan)" v-if="status!=3&&status!=6">确认方案</a>
                            </div>
                        </div>
                    </div>
                </div>
                <h2><img src="../assets/images/plan-demand.png" alt="">我的需求单</h2>
                <div class="plan-demand">
                    <div>
                        <p><label for="">出游性质：</label><span v-if="cusCusinfo.custype==1">个人定制</span><span v-if="cusCusinfo.custype==2">公司定制</span></p>
                        <p><label for="">出发城市：</label><span>{{cusCusinfo.departure}}</span></p>
                        <p><label for="">目的城市：</label><span>{{cusCusinfo.destination}}</span></p>
                        <p><label for="">几位定制师联系：</label><span>{{cusCusinfo.customernum}}位</span></p>
                        <p><label for="">需要提供什么：</label><span class="esp">{{cusCusinfo.servicetype}}</span></p>
                        <p><label for="">需求标签选择：</label><span class="esp">{{cusCusinfo.tag}}</span></p>
                    </div>
                    <div>
                        <p><label for="">预估出行日期：</label><span>{{cusCusinfo.startdate}}—{{cusCusinfo.enddate}}</span></p>
                        <p><label for="">预估出行人数：</label><span>{{cusCusinfo.adultnum}}成人</span><span>{{cusCusinfo.childnum}}儿童</span></p>
                        <p><label for="">预估人均预算：</label><span>{{cusCusinfo.budget}}元</span></p>
                        <p v-if="cusCusinfo.otherrequire!=''"><label for="">其他需求：</label><span class="esp">{{cusCusinfo.otherrequire}}</span></p>
                    </div>
                </div>
                <h2><img src="../assets/images/plan-contact.png" alt="">联系人信息</h2>
                <div class="plan-contact">
                    <div>
                        <p><label for="">姓名：</label><span>{{cusCusinfo.travellername}}</span></p>
                        <p><label for="">手机号：</label><span>{{cusCusinfo.mobile}}</span></p>
                    </div>
                    <div>
                        <p v-if="cusCusinfo.email!=''"><label for="">邮箱：</label><span>{{cusCusinfo.email}}</span></p>
                        <p v-if="cusCusinfo.wechat!=''"><label for="">微信号：</label><span>{{cusCusinfo.wechat}}</span></p>
                    </div>
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
import 'iview/dist/styles/iview.css';
import {
    ConfirmScheme,
    findPsQuick,
    cancelCus
} from "../services/index";
export default {
    data() {
        return {
            without: true,
            logoPic:'',
            planList:[],//方案列表
            status:'',//定制订单状态
            cusInfoNo:'',//定制订单号
            cusCusinfo:'',//定制师信息
            statusTip:'',//状态描述
            
        };
    },
    methods: {
        // 去个人中心页
        toPersonal(num){
            this.$router.push('/personal-data/'+num);
        },
        // 初始化
        planListInit(){
            this.status =  this.$route.params.status;
            this.cusInfoNo =  this.$route.params.id;
            if(this.status==1){
                this.statusTip='方案处理中...';
            }
            if(this.status==6){
                this.statusTip='已取消';
            }
            if(this.status==3){
                this.statusTip='已确认待支付';
            }
            // 获取详情接口绑定
            let params={
                'dataStatus':this.status,
                'cusInfoNo':this.cusInfoNo
            }
            findPsQuick(params).then(response => {
                console.log(response);
                if (response.meta.success == true) {
                    console.log("方案信息数据获取成功");
                    if(response.data.cusPsQuickDtos!=null){
                        this.planList=response.data.cusPsQuickDtos;
                    }
                    this.cusCusinfo=response.data.cusCusinfo;
                } else {
                    console.log("方案信息数据获取失败");
                }
            })
            .catch(err => {
                console.log("方案信息接口获取异常", err);
            });
        },
        // 确认方案
        confirmPlan(obj){
            let params = {
                'CusInfoID':obj.cId,
                'ReplySchemeID':obj.id,
            };
            // 获取详情接口绑定
            ConfirmScheme(params).then(response => {
                console.log(response);
                console.log("确认方案成功");
                this.$Message.info(response.Message);
                this.status=3;
                this.statusTip='已确认待支付';
                // 获取详情接口绑定
                let params={
                    'dataStatus':this.status,
                    'cusInfoNo':this.cusInfoNo
                }
                findPsQuick(params).then(response => {
                    console.log(response);
                    if (response.meta.success == true) {
                        console.log("方案信息数据获取成功");
                        if(response.data.cusPsQuickDtos!=null){
                            this.planList=response.data.cusPsQuickDtos;
                        }
                        this.cusCusinfo=response.data.cusCusinfo;
                    } else {
                        console.log("方案信息数据获取失败");
                    }
                })
                .catch(err => {
                    console.log("方案信息接口获取异常", err);
                });
                // if(response.Message.indexOf('成功')>0){
                //     this.$router.push('/confirm-plan/'+obj.cusInfoNo);
                // }
            })
            .catch(err => {
                console.log("确认方案异常", err);
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
                    this.$router.push('/personal-data/3');
                }
                else{
                    console.log('取消定制游订单失败');
                    this.$Message.info(response.meta.message);
                }
            }).catch((err)=>{
                console.log('取消定制游订单异常',err);
            });
        },
    },
    mounted() {
       
    },
    components: {
        supplierHeader,
        Footer,
        feedBack
    },
};
</script>

<style lang="scss">
.plan-list {
    height: 100%;
    min-height:100vh !important;
    position: relative;
    padding-bottom: 91px;
    background: #f0f2f5;
    .bread-crumbs{
        @include sc(14px,#999);
        padding: 12px 0;
        width:1180px;
        margin: auto;
        >span{
            @include sc(14px,#666);
        }
    }
    .plan-content{
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
            background: #fff;
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
        .con-demand{
            width: calc(100% - 230px);
            >img{
                width:100%;
                height: 120px;
                margin-bottom: 20px;
            }
             .plan-state{
                background: #fff;
                margin-bottom: 20px;
                height: 122px;
                padding: 20px 20px 20px 60px;
                >span,>div{
                    display: inline-block;
                    vertical-align: middle;
                }
                >span{
                    @include sc(24px,#333);
                    padding-top: 20px;
                    
                }
                >a{
                    float: right;  
                    @include wh(140px,36px);
                    line-height: 36px;
                    text-align: center;
                    @include sc(16px,#fff);
                    border-radius: 6px;
                    background: #ccc;
                    margin-top: 22px;
                }
                >div{
                    float: right;
                    >p{
                       @include sc(14px,#333);
                       display: inline-block;
                       vertical-align: top;
                       margin-top: 20px;
                       margin-right: 30px;
                       >span{
                          @include sc(30px,#ffba00);
                          &:before{
                              content: '￥';
                              @include sc(14px,#ffba00);
                          }  
                       } 
                    }
                    >div{
                        display: inline-block;
                        width: 140px;
                        >a{ 
                            display: inline-block;
                            @include wh(140px,36px);
                            line-height: 36px;
                            text-align: center;
                            @include sc(16px,#fff);
                            border-radius: 6px;
                            background: #ffba00;
                            margin-top: 25px;
                            &:first-child{
                                background: #ccc;
                                margin-bottom: 10px;
                            }
                        }
                    }
                }
            }
            >h2{
                height: 40px;
                line-height: 40px;
                padding-left: 20px;
                background: #fff;
                margin-bottom: 10px;
                >img{
                    @include wh(28px,28px);
                    margin-right: 10px;
                    display: inline-block;
                    vertical-align: top;
                    margin-top: 6px;
                }
                @include sc(16px,#333);
            }
            .plan-con{
                margin-bottom: 20px;
                >div{
                    background: #fff;
                    margin-bottom: 10px;
                    padding-top: 10px;
                    >p{
                        @include sc(14px,#333);
                        position: relative;
                        padding-left: 80px;
                        padding-top: 3px;
                        >span{
                            display: inline-block;
                            @include wh(70px,26px);
                            line-height: 26px;
                            text-align: center;
                            @include sc(14px,#fff);
                            background: #ffba00;
                            position: absolute;
                            left:-7px;
                            top:0;
                        }
                        &.esp{
                            padding-left: 20px;
                        }
                    }
                    .plan-top{
                        margin: 25px 20px 20px;
                        border-bottom:1px solid #ffba00;
                        padding-bottom: 15px;
                        >h2{
                            display: inline-block;
                            @include sc(18px,#333);
                            width:660px;
                        }
                        >p{
                            float: right;
                            @include sc(18px,#333);
                            >span{
                                @include sc(30px,#ffba00);
                                &:before{
                                    content: '￥';
                                    @include sc(18px,#ffba00);
                                }
                            }
                        }
                    }
                    .plan-bottom{
                        padding: 0 20px 20px;
                        >div{
                            display: inline-block;
                            vertical-align: top;
                        }
                        .plan-img{
                            border:1px solid #ccc;
                            @include wh(100px,100px);
                            border-radius: 50px;
                            padding-top: 29px;
                            text-align: center;
                            margin-right: 10px;
                            >img{
                                @include wh(82px,41px);
                            }
                        }
                        .plan-info{
                            width: 650px;
                            >h2{
                                @include sc(16px,#333);  
                            }
                            >p{
                                @include sc(14px,#333);
                                margin-bottom: 10px;
                                margin-top: 3px;
                                >i{
                                    @include sc(14px,#333);
                                    margin:0 53px 0 5px;
                                }
                                >span{
                                    >i{
                                        display: inline-block;
                                        vertical-align: middle;
                                        background: url('../assets/images/plan-icon.png') no-repeat;
                                        @include wh(14px,14px);
                                        background-size:100%;
                                        margin-right: 3px;
                                    }
                                }
                            }
                            >div{
                                display: inline-block;
                                >p{
                                    @include sc(14px,#666);
                                }
                            }
                            .info-time{
                                margin: 0 60px;
                            }
                        }
                        .plan-btn{
                            float: right;
                            width: 140px;
                            padding-top: 15px;
                            >a{
                                display: inline-block;
                                @include wh(140px,36px);
                                line-height: 36px;
                                text-align: center;
                                background: #ffba00;
                                border-radius: 6px;
                                @include sc(16px,#fff);
                                &:first-child{
                                    margin-bottom: 10px;
                                }
                            }
                        }
                    }
                }
            }
            .plan-demand{
                background: #fff;
                margin-bottom: 20px;
                padding: 30px 65px 22px;
                >div{
                    display: inline-block;
                    vertical-align: top;
                    >p{
                        margin-bottom: 8px;
                        >label{
                            @include sc(14px,#999);
                            display: inline-block;
                            width: 115px;
                            text-align: right;
                        }
                        >span{
                            display: inline-block;
                            vertical-align: top;
                            @include sc(14px,#333);
                            &.esp{
                                width: 258px;
                            }
                        }
                    } 
                    &:first-child{
                        margin-right: 55px;
                    }
                }
            }
            .plan-contact{
                background: #fff;
                padding: 30px 65px 22px;
                margin-bottom: 96px;
                >div{
                    display: inline-block;
                    vertical-align: top;
                    >p{
                        margin-bottom: 8px;
                        >label{
                            @include sc(14px,#999);
                            display: inline-block;
                            width: 115px;
                            text-align: right;
                        }
                        >span{
                            display: inline-block;
                            @include sc(14px,#333);
                            width: 258px;
                        }
                    } 
                    &:first-child{
                        margin-right: 55px;
                    }
                }
            }
        }
    }
    .footer{
        position: absolute;
        bottom: 0;
    }
}
</style>