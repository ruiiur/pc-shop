<!--这是登录页面-->
<template>
    <div class="login-system-users" @click="globalFun()">
        <div class="login-con">
            <!--<img class="wow fadeInLeft" data-wow-duration="1s" data-wow-delay="0.5s" src="../assets/images/xiaobeijing1.png" alt="">-->
            <div class="wow fadeInLeft conimgleft" data-wow-duration="1s" data-wow-delay="0.5s">
        		<a @click="goHome">回首页>></a>
        		<a @click="travelAgencyLogin" style="float: right;">账号密码登录>></a>
        	</div>
            <div class="login-box wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.5s">
                <h2>旅行社系统用户登陆</h2>
                <div class="input-box">
                    <div>
                        <Input type="text" clearable placeholder="请输入您的账号/手机号" v-model="loginTelNum"></Input>
                        <img src="../assets/images/shouji.png" alt="">
                    </div>
                    <div>
                        <Input type="password" clearable placeholder="请输入您的登陆密码" v-model="loginPassword" ></Input>
                        <img src="../assets/images/mima.png" alt="">
                    </div>
                    <div>
                    	<div class="ivu-input-wrapper ivu-input-type" @click.stop.prevent="btnSelectDestb">
                    		<input type="text" placeholder="请输入旅行社名称" v-model="loginTravelagency" @blur="originBlur" @focus="loginTravelagencylist=true" class="ivu-input">
	                        <img src="../assets/images/lvxingshe1.png" alt="" style="position: absolute;top: 14px;left: 17px;">
	                        <i></i>
				            <ul class="store-list" v-if="storeList.length!=0&&loginTravelagencylist==true" >
				                <li class="esp"><p></p></li>
				                <li @click.stop.prevent="selectedSale(store,index)" v-for="(store,index) in storeList" :class="supplierIndex==index?'active':''">{{store.TravelAgencyName}}<i v-if="supplierIndex==index"></i></li>
				            </ul>
				            <ul class="store-list" v-if="storeList.length==0&&nolist==true">
				                <li class="esp"><p></p></li>
				                <li style="color: red;" class="nolistfont">找不到符合要求的旅行社,请先注册</li>
				            </ul>
                    	</div>
                        
                    </div>
                </div>
                <div class="container">
                    <div id="captcha" style="position: relative"></div>
                    <div id="msg"></div>
                </div>
                <p class="rem-con" ><Checkbox v-model="remember">记住密码（公共场所勿选）</Checkbox></p>
                <a class="step-next"  href="javascript:;" @click="loginPasswordFun()">登录</a>
                <p class="register-line"><a :href="reginster">旅行社注册 >></a></p>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
import {WOW} from 'wowjs'
import tools from "../common/tools";
import jigsaw from "../common/jigsaw";
import Footer from "../components/footer.vue";
import {
    login,
    sendMessage,
    checkCode,
    searchStore,//旅行社名称搜索接口
    // UserLoginByMobile,
    UserLoginForShop,
    getUserLoginByMobileWithPwdType,
    mobile
} from "../services/index";
export default {
    data() {
        return {
        	reginster:"http://zhuce.aipinzan.cn/#/login",//旅行社注册跳转地址（爱品赞）
            remember:true,//是否记住密码
            // 发送验证码相关
            time: 0,
            disabled: false,
            second: 60,
            loginTel: "", //手机号登录的手机号
            loginPassword: "", //密码
            loginTravelagency:"",//旅行社名称
            loginTravelagencyID:0,//旅行社orgid
            storeList:[],//旅行社名称搜索结果
            nolist:false,
            loginTravelagencylist:false,
            supplierIndex:-1,//
            loginPasswordCom: "", //确认密码
//          step: 1, //默认步骤
            loginCode: "", //登录验证码
            loginCan: false, //是否可以登录
            loginTelNum: "", //账号密码登录的手机号
            loginPassword: "", //登录密码
            orgId: "", //供应商id
            valid:false,//滑块验证
        };
    },
    methods: {
    	//回首页
    	goHome(){
    		this.$router.push("/supplier?orgId=" + window.localStorage.getItem("orgId"));
    	},
    	//旅行社登陆
    	travelAgencyLogin(){
    		this.$router.push("/login");
    	},
    	// 全局控制
	    globalFun() {
	      this.loginTravelagencylist = false;
	      this.nolist = false;
	    },
	    btnSelectDestb(){},
        // 开始获取验证码
        start() {
            if (this.judgeFirst(this.loginTel) == false) {
                return;
            } else {
                this.time = this.second;
                console.log(this.disabled);
                this.timer();
                // 发送短信验证码
                let params = {
                    phone: this.loginTel
                };
                sendMessage(params).then(response => {
                    console.log(response);
                    if (response.meta.success == true) {
                        console.log("短信验证码获取成功");
                    } else {
                        console.log("短信验证码获取失败");
                    }
                });
            }
        },
        // 验证手机号
        judgeFirst(obj) {
            console.log(obj);
            if (tools.trim(obj) == "") {
                this.$Message.info("账号不能为空");
                return false;
            }
        },
        // 验证是否可以去登录
        judgeLoginFirst(){
            if (tools.trim(this.loginPassword) == "") {
                this.$Message.info("密码不能为空");
                return false;
            }
            if (tools.trim(this.loginTravelagencyID) == 0) {
            	this.$Message.info("旅行社名称不能为空");
            	return false;
            }
        },
        // 检测输入法人密码
        // passwordCheck() {
        //     if (this.loginPassword.length > 5) {
        //         this.loginCan = true;
        //     }
        // },
        // 定时器
        timer() {
            if (this.time > 0) {
                this.time--;
                setTimeout(this.timer, 1000);
            } else {
                this.disabled = false;
            }
        },

        stepNext() {
            this.step = 2;
        },
        //设置cookie
        setCookie(c_name, c_pwd, exdays) {
            var exdate = new Date(); //获取时间
            exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
            //字符串拼接cookie
            window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
            window.document.cookie = "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
        },
        //选择旅行社名称
        selectedSale(index, obj){
        	console.log(index);
        	console.log(obj);
        	this.loginTravelagency = index.TravelAgencyName;
        	this.loginTravelagencyID = index.OrgID;
        	this.loginTravelagencylist=false;
        },
        //旅行社失去焦点
        originBlur(){
	        if (this.storeList.length == 0) {
	        	console.log("qqqq")
	        	this.loginTravelagency = "";
	        }
        },
        //读取cookie
        getCookie() {
            if (document.cookie.length > 0) {
                var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
                for (var i = 0; i < arr.length; i++) {
                    var arr2 = arr[i].split('='); //再次切割
                    //判断查找相对应的值
                    if (arr2[0] == 'userName') {
                        this.loginTelNum = arr2[1]; //保存到保存数据的地方
                    } else if (arr2[0] == 'userPwd') {
                        this.loginPassword = arr2[1];
                    }
                }
            }
        },
         //清除cookie
        clearCookie: function() {
            this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
        },
        
        // 用户登陆登录
        loginPasswordFun() {
            if (this.judgeFirst(this.loginTelNum) == false) {
                return;
            }
            if (this.judgeLoginFirst() == false) {
                return;
            }
            if(this.valid==false){
                this.$Message.info('请先进行正确的滑块验证');
                return;
            }
            let params = {
                "userAcctID": this.loginTelNum,
                "userAcctPwd": this.loginPassword,
                "orgID":this.loginTravelagencyID
            };
            console.log(params)
            UserLoginForShop(params).then(response => {
                console.log(response);
                if (response.isSuccess==true) {
                	
                    //判断复选框是否被勾选 勾选则调用配置cookie方法
                    if (this.remember == true) {
                        //传入账号名，密码，和保存天数3个参数
                        this.setCookie(this.loginTelNum,this.loginPassword, 7);
                    }else {
                        console.log("清空Cookie");
                        //清空Cookie
                        this.clearCookie();
                    }
                    this.$router.push("/jump?" + response.msg);
                }
                else{
                    this.$Message.info(response.msg);
                }
            });
        },
        // 注册初始化
        loginInit() {
            this.orgId = tools.getLocalStorage("orgId");
            if(this.step==1){
                console.log(this.getCookie());
            }
        },
        // 滑块插件
        newJigsaw(){
            new jigsaw(document.getElementById('captcha'),()=>{
                console.log('验证成功！')
                this.valid=true;
                this.loginPasswordFun();
                
            }, function () {
                console.log('验证失败！');
                this.valid=false;
            })
        }   
    },
    mounted() {
        this.loginInit();
        this.newJigsaw();
        new WOW().init();
    },
    computed: {
        text: function() {
            return this.time > 0 ? this.time + "s 后重获取" : "获取验证码";
        }
    },
    components:{
        Footer
    },
	watch:{
        loginTravelagency:async function (){
            this.storeList=[];
            if(this.loginTravelagency!==''){
                let params={
                    'key':this.loginTravelagency,
                    'pagesize':10
                }
                await searchStore(params).then((response)=>{
                    console.log(response);
                    console.log('搜索商铺接口成功');
                    if(response.length!=0){
                        this.storeList=response;
                    }else{
                    	console.log('搜索商铺接口meiyou');
//                  	this.loginTravelagencylist=false;
                    	this.nolist=true;
                    }
                }).catch((err)=>{
                    console.log('搜索商铺接口异常报错',err);
                });
            }
        }
    }
};
</script>

<style lang="scss">
.login-system-users {
    background: url('../assets/images/beijing1.png') no-repeat;
    // height: 100vh;
    padding-top: 99px;
    font-size: 0;
    .sendSmsBtn {
        height: 40px;
        width: 87px;
        line-height: 40px;
        border-radius: 4px;
        background: #ffba00;
        border: none;
        color: #fff;
        font-size: 12px;
        float: right;
    }
    .ivu-checkbox-checked .ivu-checkbox-inner {
	    border-color: #ffba00;
	    background-color: #ffba00;
	}
    .sendSmsBtn.dissendSmsBtn {
        background-color: #ffe39f;
    }
    >h2{
        text-align: center;
        height: 65px;
        >img{
            @include wh(413px,207px);
        }
    }
    .login-con {
        box-sizing: border-box;
        margin-top: 180px;
        height: 510px;
        margin-bottom: 116px;
        text-align: center;
        .register-line{
            padding-right: 25px;
            margin-top: 7px;
          >a{
            @include sc(14px,#7d7d7d);
            float: right;
            &:hover{
                @include sc(14px,#0080ff);
            }
          }  
        }
        .conimgleft{
        	display: inline-block;
            // float: left;
            @include wh(458px,510px);
            background: url('../assets/images/xiaobeijing1.png') no-repeat;
            padding-top: 470px;
            padding-left: 30px;
            padding-right: 30px;
            >a{
            	color: #fff!important;
            	font-size: 18px!important;
            	float: left;
            }
        }
        >img{
            display: inline-block;
            // float: left;
            @include wh(458px,510px);
        }
        .login-box {
            display: inline-block;
            vertical-align: top;
            width: 352px;
            height: 510px;
            background: #fff;
            > h2 {
                height: 54px;
                font-size: 18px;
                line-height: 54px;
                color: #ffba00;
            }
            .input-box{
                padding: 0 25px 0;
                >div{
                    position: relative;
                    margin-bottom: 16px;
                    >img{
                        position: absolute;
                        top:12px;
                        left:17px;
                    }
                }
                .ivu-input-wrapper{
                    height: 40px;
                    line-height: 40px;
                    .ivu-input{
                        height: 40px;
                        line-height: 40px;
                        padding-left: 46px;
                    }
                    .ivu-input-icon{
                        height: 40px;
                        line-height: 40px;
                    }
                }
                .input-box-esp{
                    position: relative;
                    text-align: left;
                  .ivu-input-wrapper {
                      width:197px;
                      .ivu-input{
                          width: 197px;
                      }
                  } 
                  >div{
                      display: inline-block;
                      >img{
                          position: absolute;
                          top:12px;
                          left:17px;
                      }
                  } 
                }
                /*旅行社名称*/
                .store-list{
			        width: 100%;
			        border-radius: 0 0 10px 10px;
			        box-shadow: 0px 15px 20px 0px rgba(0, 0, 0, 0.2);
			        background: #fff;
			        /*padding: 10px 0;*/
			        position: absolute;
			        top:40px;
			        z-index: 100;
			        max-height: 228px !important;
			        overflow: auto;
			        >li:not(.esp){
			            @include sc(14px,#333);
			            background: #fff;
			            padding: 0 50px 0 20px;
			            height: 28px;
			            line-height: 28px;
			            cursor: pointer;
			            &.active{
			                background: #ddd;
			            }
			            >i{
			                float: right;
			                @include wh(20px,14px);
			                background: url('../assets/images/to.png') no-repeat;
			                margin-top: 12px;
			            }
			        }
			        >li{
			        	text-align: left;
			            >p{
			                /*height: 1px;
			                background: #ddd;
			                margin: 0 50px 17px 20px;*/
			            }
			        }
			        >li:hover{
			        	background-color: #ffba00;
			        	color: #fff;
			        }
			        >.nolistfont:hover{
			        	background-color: #fff!important;
			        	color: red!important;
			        }
			    }
            }
            .rem-con{
              text-align: left;
              padding: 0 25px;
              margin-top: 14px;
              >a{
                  float: right;
                  @include sc(12px,#2e9dd9);
              }  
              .ivu-checkbox-wrapper{
                  >span{
                      margin-right: 10px;
                  }
              }
            }
            .step-next {
                display: inline-block;
                width: 302px;
                height: 40px;
                background: #ffba00;
                border-radius: 4px;
                color: #fff;
                font-size: 18px;
                line-height: 40px;
                text-align: center;
                margin: 27px 25px 0 25px;
                &.fail {
                    background: #ccc;
                }
            }
            .step-next-esp{
                margin-top:65px;
            }
        }
        // .login-success {
        //     margin: auto;
        //     width: 460px;
        //     background: url("../assets/images/login-bg.png") no-repeat;
        //     background-size: cover;
        //     padding: 40px 70px 50px 70px;
        //     box-sizing: border-box;
        //     min-height: 420px;
        //     text-align: center;
        //     > img {
        //         @include wh(180px, 180px);
        //     }
        //     > h2 {
        //         @include sc(18px, #fff);
        //         margin: 20px 0 50px 0;
        //         line-height: 18px;
        //     }
        //     > a {
        //         display: inline-block;
        //         width: 100%;
        //         height: 50px;
        //         background-image: -webkit-linear-gradient(
        //             0deg,
        //             #005bac 0%,
        //             #008871 50%,
        //             #008c6b 55%,
        //             #6fba2c 100%
        //         );
        //         background-image:linear-gradient(
        //             0deg,
        //             #005bac 0%,
        //             #008871 50%,
        //             #008c6b 55%,
        //             #6fba2c 100%
        //         );
        //         box-shadow: 0px 4px 10px 0px #000000;
        //         border-radius: 4px;
        //         color: #fff;
        //         font-size: 18px;
        //         line-height: 50px;
        //         text-align: center;
        //     }
        // }
    }
}
</style>

