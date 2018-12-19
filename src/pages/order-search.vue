<!--这是订单查询页面-->

<!--页面作废-->
<template>
    <div class="order-search">
         <!-- 供应商导航引入 -->
        <supplierHeader :logo="logoPic" :without="without" @refreshList="orderInit"></supplierHeader>
        <p class="margin-line"></p>
       
        <div class="order-bottom">
            <p>上海竞界科技有限公司   | © 2018 laolvyou.vip, All rights reserved.    |   沪ICP备18020065号-2</p>
            <!-- <p>旅游违法行为举报电话：12318 服务质量投诉电话：953520 上海市互联网违法和不良信息举报中心电话：021-55056666</p> -->
        </div>
    </div>
</template>
<script>
import tools from "../common/tools";
import supplierHeader from "../components/supplier-header.vue";
import {
  getOrderInfo,
  cancelOrder
} from "../services/index";
export default {
    data(){
        return{
            logoPic:'',
            without:true,
            orderStateList:[
                {name:'所有订单'},
                {name:'待确认'},
                {name:'待付款'},
                {name:'已支付'},
                // {name:'已点评'},
            ],//订单状态列表
            orderIndex:0,//订单默认状态
            dataStatus:-7,
            orderDetailsList:[],//订单详情列表
            orderList:[],//订单列表
            condition:'',//搜索条件
            openSelected:false,//是否打开选择订单
            orderTimeType:0,//查询的订单时间
            pageNum: 15, //每页显示条数
            total:'', //总条数
            currentPage: 1,
            searchCate:[
                {name:'全部'},
                {name:'近6个月订单'},
                {name:'今年内订单'},
                {name:'今年外订单'},
            ],//订单搜索分类
            cateName:'全部',
            withoutOrder:'无订单',
        }
    },
    methods: {
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
        // 订单页面初始化
        orderInit(){
            this.userType=tools.getLocalStorage('userType');
            // let font=(document.documentElement.clientWidth/320)*20;
            // this.height=document.documentElement.clientHeight-(font*5.7)+'px';
            // console.log(this.height);
            this.searchOrder(0);
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
       
        // 获取不同的订单信息
        getOrder(index){
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
                this.dataStatus=-2;
                this.searchOrder(0);
            }
            // this.orderInit();
        },
        // 取消订单
        cancelOrderFun(obj){
            let params=obj.ordId;
             cancelOrder(params).then((response)=>{
                console.log(response);
                if(response.meta.success==true){
                    console.log('取消订单成功');
                    this.$Message.info('取消订单成功');
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
        //改变页码
        changePage(page) {
            this.currentPage = page;
            this.searchOrder(page - 1);
        },  
        //去订单详情页面
        toOrderDetails(obj){
            this.$router.push('/order-details/'+obj.ordId);
        }
    },
    mounted(){
        // this.orderInit();
    },
    components:{
        supplierHeader,  
    }
}
</script>

<style lang="scss">
.order-search{
    height: 100%;
    min-height:100vh !important;
    // background: #ccc;
    position: relative;
    padding-bottom: 91px;
    .without-order{
        @include sc(18px,#999);
    }
    .ivu-page{
        margin-bottom: 20px;
    }
    .margin-line{
        height: 40px;
        background: #f1f1f1;
        width:100%;
        margin-top: 20px;
    }
    .order-content{
        width:1180px;
        margin: auto;
        margin-top: 20px;
        .order-nav{
            display: inline-block;
            >li{
                float: left;
                @include sc(14px,#333);
                margin-right: 20px;
                &.active{
                   color: #1f5dab;
                   border-bottom: 1px solid #1f5dab;
                }
            }
        }
        .search-order-input{
            float: right;
            font-size:0;
            >input{
                width:240px;
                height: 30px;
                border:1px solid #ddd;
                @include sc(14px,#333);
                box-sizing: border-box;
                padding-left: 15px;
                outline: none;
            }
            >button{
                display: inline-block;
                vertical-align: top;
                width:44px;
                height: 30px;
                background: #ddd;
                border-radius:2px;
                @include sc(14px,#333);
                border:none;
            }
        }
        .order-title{
            width:100%;
            height: 50px;
            background: #f1f1f1;
            margin: 20px 0;
            >div{
                display: inline-block;
                width:140px;
                padding-top: 19px;
                padding-left: 20px;
                position: relative;
                >p{
                    @include sc(14px,#666);
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
                        @include sc(14px,#666);
                        line-height: 32px;
                        &.active{
                            background: #ddd;
                        }
                    }
                }
            }
            >span{
                @include sc(14px,#666);
                display: inline-block;
                text-align: center;
            }
            .order-details-title{
                width:420px;
            }
            .contact-title{
                width:165px;
            }
            .money-title{
                width:150px;
            }
            .state-title{
                width:110px;
            }
            .operation-title{
                width:140px;
            }
        }
        .order-details-con{
            margin-bottom: 20px;
            >h2{
                height: 40px;
                background: #f1f1f1;
                padding: 0 20px;
                font-size:0;
                >label,>span,>a{
                    display: inline-block;
                    line-height: 40px;
                }
                >label{
                    @include sc(14px,#666);
                    margin-right: 40px;
                }
                >span{
                    @include sc(14px,#666);
                }
                >a{
                    float: right;
                    @include sc(14px,#333);
                }
            }
            .order-info{
                width:100%;
                padding: 15px 0 15px 20px;
                border:1px solid #f1f1f1;
                border-top:none;
                box-sizing: border-box;
                >span{
                    display: inline-block;
                    vertical-align: middle;
                    @include sc(14px,#18191a); 
                    width:110px;
                    text-align: center;
                }
            }
            .order-main{
                display: inline-block;
                vertical-align: middle;
                margin-right: 65px;
                >img{
                    display: inline-block;
                    @include wh(130px,89px);
                }
                >div{
                    display: inline-block;
                    width: 340px;
                    >h2{
                        @include sc(14px,#18191a);
                        margin-bottom: 12px;
                        overflow: hidden;
                        text-overflow:ellipsis;//文本溢出显示省略号
                        white-space:nowrap;//文本不会换行（单行文本溢出）
                    }
                    >p{
                         @include sc(12px,#666);
                         margin-top: 3px;
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
                    @include sc(14px,#18191a);
                    text-align: center;
                }
            }
            .order-contact{
                width:165px;
            }
            .order-price{
                width:150px;
            }
            .order-operation{
                width: 180px;
                display: inline-block;
                >a{
                    display: block;
                    @include wh(64px,28px); 
                    border-radius: 14px;
	                border: solid 1px #1f5dab;
                    @include sc(12px,#1f5dab);
                    line-height: 28px;
                    text-align: center;
                    margin: auto;
                    margin-bottom: 10px;
                    &.cancel{
                        border: solid 1px #999;
                        @include sc(12px,#999);
                        margin-top: 15px;
                    }
                }
            }
        }
    }
    .order-bottom{
        position: absolute;
        bottom:0;
        width:100%;
        height: 91px;
        background: #ddd;
        padding-top: 30px;
        box-sizing: border-box;
        >p{
           @include sc(12px,#333);
           text-align: center; 
        }
    }
}
</style>

