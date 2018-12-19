<!--这是最新报价页面-->
<template>
    <div class="quote">
        <supplierHeader :without="without" @refreshList="quoteInit"></supplierHeader>
        <div class="quote-list">
            <ul>
                <!-- :href="quote.url" download="hhh" -->
                <li v-for="(quote,index) in quoteList"><label>{{index+1}}、{{quote.filename}}</label><a @click="downFun(quote)">下载</a><span>{{quote.createddate}}</span></li>
            </ul>
        </div>
       <div v-if="quoteTip" class="without-quote">
           <img src="../assets/images/quote-none.png" alt="">
            <p>暂无最新报价</p>
       </div>
       <feedBack></feedBack>
        <!-- 引入底部导航 -->
       <Footer></Footer>
    </div>
</template>
<script>
import { latestQuote, download} from '../services/index'
import tools from '../common/tools'
import supplierHeader from "../components/supplier-header.vue";
import Footer from "../components/footer.vue";
import feedBack from "../components/feedBack.vue";
export default {
    data(){
        return{
            quoteList:[],//报价列表
            quoteTip:false,
            without:true,
            downUrl:'',
        }
    },
    methods: { 
        quoteInit(){
            let params=tools.getLocalStorage('orgId');
            latestQuote(params).then((response)=>{
                console.log(response);
                if(response.meta.success==true){
                    console.log('最新报价获取成功');
                    this.quoteList=response.data;
                    if(response.data.length==0){
                        this.quoteTip=true;
                    }
                    else{
                        this.quoteTip=false; 
                    }
                }
                else{
                    console.log('最新报价获取失败');
                }
            }).catch((err)=>{
                console.log('最新报价获取异常',err);
            });
        },
        downFun(obj){
            let params=obj.id;
            download(params).then((response)=>{
                console.log(response);
                if(response.meta.success==true){
                    console.log('下载成功');
                    this.downUrl=response.meta.message;
                    window.open(this.downUrl,'_blank');
                }
                else{
                    console.log('下载失败');
                }
            }).catch((err)=>{
                console.log('下载异常',err);
            });
       }
    },
   mounted(){
       this.quoteInit();
   },
    components: {
        supplierHeader,
        Footer,
        feedBack
    }
}
</script>

<style lang="scss">
.quote{
    position: relative;
    min-height: 100vh;
    padding-bottom: 91px;
    position: relative;
    .footer{
        position: absolute;
        bottom:0;
    }
   .without-quote{
      text-align: center;
       >img{
           margin-top: 100px;
           margin-bottom: 20px;
       }
       >p{
           @include sc(18px,#666);
       }
   }
   .quote-list{
       border-top: solid 1px #999999;
       margin-bottom: 20px;
       >ul{
           width: 1200px;
           margin: auto;
           padding:0 50px;
           >li{
               height: 55px;
               line-height: 54px;
               border-bottom:1px solid #e1e1e1; 
               >label{
                   @include sc(14px,#333);
               }
               >span{
                   float: right;
                    @include sc(14px,#333);
               }
               >a{
                   float: right;
                    @include sc(14px,#4e9dd9);
                    margin: 0 30px 0 80px;
               }
           }
       }
   }
   .footer {
        position: absolute;
        bottom: 0;
        width: 100%;
    }
}
</style>

