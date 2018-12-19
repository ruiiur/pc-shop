<!--这是修改密码成功页面-->
<!--页面作废-->
<template>
    <div class="reset-success">
        <div class="reset-tip-con">
            <div>
                <img src="../assets/images/reset-s.png" alt="">
                <div>
                    <h2>修改密码成功！</h2>
                    <p>请重新登录</p>
                </div>
            </div>
            <p><a href="javascript:;">登录</a></p>
        </div>
        <div class="reset-bottom">
            <p>上海竞界科技有限公司   | © 2018 laolvyou.vip, All rights reserved.    |   沪ICP备18020065号-2</p>
            <!-- <p>旅游违法行为举报电话：12318 服务质量投诉电话：953520 上海市互联网违法和不良信息举报中心电话：021-55056666</p> -->
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            
        }
    },
    methods: {
       
       
    
    
    },
   
}
</script>

<style lang="scss">
.reset-success{
    background: url('../assets/images/reset.png') no-repeat center;
    background-size:cover; 
    min-height: 100vh;
    position: relative;
    padding-top: 188px;
    box-sizing: border-box;
    .reset-tip-con{
        @include wh(600px,260px);
        margin: auto;
        background: #fff;
        box-shadow: 0px 8px 21px 0px 
		rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        padding-top: 60px;
        box-sizing: border-box;
        >div{
            text-align: center;
            >img{
              @include wh(60px,60px);  
            }
            >div{
                display: inline-block;
                vertical-align: top;
                margin-left: 20px;
                >h2{
                   @include sc(24px,#333); 
                   margin-bottom: 5px;
                }
                >p{
                    @include sc(14px,#999); 
                    text-align: left;
                }
            }
        }
        >p{
            text-align: center;
            margin-top: 40px;
            >a{
                display: inline-block;
                @include wh(140px,40px);
                background-image: -webkit-linear-gradient(0deg, 
                                #005bac 0%, 
                                #008871 50%, 
                                #008c6b 55%, 
                                #6fba2c 100%);
                background-image: linear-gradient(0deg, 
                #005bac 0%, 
                #008871 50%, 
                #008c6b 55%, 
                #6fba2c 100%);
                border-radius: 10px;
                @include sc(18px,#fff);
                line-height: 40px;
            }
        }
    }
    .reset-bottom{
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

