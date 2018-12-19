<!--这是登录页面-->
<template>
    <div class="login">
        <!--<h2><img class="wow rollIn" data-wow-duration="1s" data-wow-delay="0.25s" src="../assets/images/new-logo.png" alt=""></h2>-->
        <div class="login-con">
        	<!--加回到首页 -->
        	<div class="wow fadeInLeft conimgleft" data-wow-duration="1s" data-wow-delay="0.5s">
        		<a @click="goHome">回首页>></a>
        		<a @click="travelAgencyLogin" style="float: right;">旅行社登录>></a>
        	</div>
            <!--<img class="wow fadeInLeft" data-wow-duration="1s" data-wow-delay="0.5s" src="../assets/images/xiaobeijing.png" alt="">-->
            <div class="login-box wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.5s">
                <h2><a href="javavscript:;" @click="step=1" :class="step==1?'active':''">账号密码登录</a><a href="javavscript:;" :class="step==2?'active':''" @click="step=2">手机验证码登录</a></h2>
                <div v-if="step==1" class="input-box">
                    <div>
                        <Input type="text" clearable placeholder="请输入您的账号/手机号" v-model="loginTelNum"></Input>
                        <img src="../assets/images/shouji.png" alt="">
                    </div>
                    <div>
                        <Input type="password" clearable placeholder="请输入您的登陆密码" v-model="loginPassword" ></Input>
                        <img src="../assets/images/mima.png" alt="">
                    </div>
                </div>
                <div v-if="step==2" class="input-box">
                    <div>
                        <Input type="text" clearable placeholder="请输入您的账号/手机号" v-model="loginTel" @on-change="checkMobileFun()" ></Input>
                        <img src="../assets/images/shouji.png" alt="">
                    </div>
                    <div class="input-box-esp">
                        <div>
                            <Input type="text" clearable v-model="loginCode" placeholder="请输入您的手机验证码"></Input>
                            <img src="../assets/images/yangzheng.png" alt=""> 
                        </div>
                        <button class="sendSmsBtn" :class="disabled?'dissendSmsBtn':''" @click="start" :disabled="disabled || time > 0">{{ text }}</button>
                    </div>
                </div>
                <div class="container">
                    <div id="captcha" style="position: relative"></div>
                    <div id="msg"></div>
                </div>
                <p class="rem-con" v-if="step==1"><Checkbox v-model="remember">记住密码（公共场所勿选）</Checkbox><a href="#/find-password">忘记密码？</a></p>
                <a class="step-next" v-if="step==1" href="javascript:;" @click="loginPasswordFun()">登录</a>
                <a class="step-next step-next-esp" v-if="step==2" href="javascript:;" @click="loginCodeFun()">登录</a>
                <p class="register-line"><a href="#/register">立即注册 >></a></p>
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
    // UserLoginByMobile,
    UserLoginByMobilePassword,
    getUserLoginByMobileWithPwdType,
    mobile
} from "../services/index";
export default {
    data() {
        return {
            remember:true,//是否记住密码
            // 发送验证码相关
            time: 0,
            disabled: false,
            second: 60,
            loginTel: "", //手机号登录的手机号
            loginPassword: "", //密码
            loginPasswordCom: "", //确认密码
            step: 1, //默认步骤
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
    		this.$router.push("/login-system-users");
    	},
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
                this.$Message.info("手机号码不能为空");
                console.log("滑动吗")
                return false;
            }
            let pattern = /^0{0,1}(1[0-9][0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/;
            if (!pattern.test(obj)) {
                this.$Message.info("请输入正确的手机号码");
                return false;
            }
        },
        // 验证是否可以去登录
        judgeLoginFirst(){
            if (tools.trim(this.loginPassword) == "") {
                this.$Message.info("密码不能为空");
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
        //验证当前登录手机号是否存在
        checkMobileFun(){
          if(this.loginTel.length > 10){
            let params = {"mobile":this.loginTel};
            mobile(params).then(response => {
              console.log(response);
              if (response == null) {
                this.$Message.info("您还不是我们的用户，请先注册");
                // this.loginCan = false;
                this.disabled = true;
              }else {
                this.disabled = false;
                // this.loginCan = true;
              }
            });
          }
        },
        // 下一步
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
        // 手机号登录
        loginCodeFun() {
            if(this.judgeFirst(this.loginTel) == false) {
                return;
            }
            if(this.valid==false){
                this.$Message.info('请先进行正确的滑块验证');
                return;
            }
            let params1=this.loginTel;
            let params2 = this.loginCode;
            checkCode(params1,params2).then(response => {
                console.log(response);
                if (response.meta.success == true) {
                    console.log("验证码验证成功");
                    let params = {
                        mobile: this.loginTel
                    };
                    getUserLoginByMobileWithPwdType(params).then(response => {
                        console.log("1")
                        console.log(response);
                        if(response==null){
                        this.$Message.info('您还不是我们的用户，请先注册！');
                        }
                        if(response!="null"){
                            let PwdType = response.PwdType;
                            let paramsLogin=response;
                            login(paramsLogin).then(response => {
                                console.log(response);
                                if (response.meta.success == true) {
                                    console.log("登录成功");
                                    tools.setLocalStorage("PwdType", PwdType);
                                    tools.setLocalStorage("mobile", response.data.mobile);
                                    tools.setLocalStorage("userType", response.data.userType);
                                    tools.setSessionStorage("userId",response.data.id);
                                    // 登录
                                    this.$store.commit("setStorage", {
                                        user: this.loginTel
                                    });
                                    this.$store.commit("setLogin", "1");
                                    // this.$router.push('/supplier?orgId='+this.orgId);
                                    this.$router.push("/jump?orgId=" + this.orgId+"&status=5");
                                    // this.$router.go(-1);//返回上一层
                                    // this.step=3;

                                } else {
                                    console.log("登录失败");
                                    this.$Message.info(response.meta.message);
                                }
                            });
                        }
                    });
                } else {
                   this.$Message.info(response.meta.message);
                }
            });
        },
        // 手机号密码登录
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
                mobile: this.loginTelNum,
                password: this.loginPassword
            };
            UserLoginByMobilePassword(params).then(response => {
                console.log(response);
                if (response.ResultCode==0) {
                    let paramsLogin = response;
                    login(paramsLogin).then(response => {
                        console.log(response);
                        if (response.meta.success == true) {
                            console.log("登录成功");
                            //判断复选框是否被勾选 勾选则调用配置cookie方法
                            if (this.remember == true) {
                                //传入账号名，密码，和保存天数3个参数
                                this.setCookie(this.loginTelNum,this.loginPassword, 7);
                            }else {
                                console.log("清空Cookie");
                                //清空Cookie
                                this.clearCookie();
                            }
                            tools.setLocalStorage("mobile",response.data.mobile);
                            tools.setLocalStorage("userType",response.data.userType);
                            tools.setSessionStorage("userId",response.data.id);
                            // 登录
                            this.$store.commit("setStorage", {
                                user: this.loginTelNum
                            });
                            this.$store.commit("setLogin", "1");
                            // this.$router.push("/supplier?orgId=" + this.orgId);
                            this.$router.push("/jump?orgId=" + this.orgId+"&status=5");
                        } else {
                            console.log("登录失败");
                            this.$Message.info(response.meta.message);
                        }
                    });
                }
                else{
                    this.$Message.info("用户名或密码错误");
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
                if(this.step==1){
                   this.loginPasswordFun();
                }
                else if(this.step==2){
                    this.loginCodeFun();
                }
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
    }
};
</script>

<style lang="scss">
.login {
    background: url('../assets/images/beijing.png') no-repeat;
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
    .sendSmsBtn.dissendSmsBtn {
        background-color: #ffe39f;
    }
    >h2{
        text-align: center;
        height: 207px;
        >img{
            @include wh(413px,207px);
        }
    }
    .login-con {
        box-sizing: border-box;
        margin-top: 180px;
        height: 470px;
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
        >img{
            display: inline-block;
            // float: left;
            @include wh(458px,470px);
        }
        .conimgleft{
        	display: inline-block;
            // float: left;
            @include wh(458px,470px);
            background: url('../assets/images/xiaobeijing.png') no-repeat;
            padding-top: 430px;
            padding-left: 30px;
            padding-right: 30px;
            >a{
            	color: #fff!important;
            	font-size: 18px!important;
            	float: left;
            }
        }
        .login-box {
            display: inline-block;
            vertical-align: top;
            width: 352px;
            height: 470px;
            background: #fff;
            > h2 {
                height: 54px;
                line-height: 54px;
                border-bottom:1px solid #ffba00;
                font-size: 0;
                >a{
                    display: inline-block;
                    width:50%;
                    @include sc(16px,#ffba00);
                    &.active{
                      background: #ffba00;
                      color:#fff;  
                    }
                }
            }
            .input-box{
                padding: 16px 25px 0;
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
            }
            .rem-con{
              text-align: left;
              padding: 0 25px;
              margin-top: 17px;
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
                margin: 30px 25px 0 25px;
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

