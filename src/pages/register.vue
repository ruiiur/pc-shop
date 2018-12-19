<!--这是注册页面-->
<template>
    <div class="register">
        <h2><img class="wow bounceInDown" data-wow-duration="2s" data-wow-delay="0.5s" src="../assets/images/new-logo.png" alt=""></h2>
        <div class="register-con">
            <img class="wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.5s" v-if="step!=3" src="../assets/images/xiaobeijing.png" alt="">
            <div class="register-box wow fadeInDown" data-wow-duration="1s" data-wow-delay="0.5s" v-if="step!=3">
               <h2>注册</h2>
               <div v-if="step==1" class="input-box">
                    <div>
                        <Input type="text" placeholder="请输入您的手机号" clearable v-model="registerTel" @on-change="checkTelFun()"></Input>
                        <img src="../assets/images/shouji.png" alt="">
                    </div>
                    <div class="input-box-esp">
                        <div>
                            <Input type="text" v-model="code" clearable placeholder="请输入您的手机验证码"></Input>
                            <img src="../assets/images/yangzheng.png" alt=""> 
                        </div>
                        <button class="sendSmsBtn" :class="disabled?'dissendSmsBtn':''" type="button" @click="start" :disabled="disabled || time > 0">{{ text }}</button>
                    </div>
               </div>
               <div v-if="step==2" class="input-box">
                    <div>
                        <Input type="password" placeholder="密码，6-16位，区分大小写" clearable v-model="registerPassword"></Input>
                        <img src="../assets/images/mima.png" alt="">
                    </div>
                    <div>
                        <Input type="password" placeholder="再次输入密码确认" clearable v-model="registerPasswordCom" @input="passwordCom"></Input>
                        <img src="../assets/images/mima.png" alt="">
                    </div>
               </div>
               <div class="container" v-if="step==1">
                    <div id="captchaReg" style="position: relative"></div>
                    <div id="msg"></div>
                </div>
               <a class="step-next" v-if="step==1" href="javascript:;" @click="stepNext()">下一步</a>
               <a class="step-next step-next-esp" v-if="step==2" href="javascript:;" @click="registerFun()">注册</a>
               <p class="register-line"><a href="#/login">有账号去登录 >></a></p>
            </div>
            <div class="register-success" v-if="step==3">
                <img src="../assets/images/success.png" alt="">
                <h2>恭喜您,注册成功！</h2>
                <p><span>{{countText}}s</span>后将自动为您跳转到大广场</p>
                <a href="javascript:;" @click="loginFun()">直接登录</a>
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
  UserRegisteByMobile,
  sendMessage,
  checkCode,
  UserLoginByMobile,
  UserLoginByMobilePassword,
  login
} from "../services/index";
export default {
    data(){
        return{
            // 发送验证码相关
            time: 0,
            countTime:0,
            countSecond:11,
            disabled: false,
            second: 60,
            registerTel:'',//手机号
            registerPassword:'',//密码
            registerPasswordCom:'',//确认密码
            step:1,//默认步骤
            code:'',//验证码
            orgId:'',
            checkTel:false,//验证手机号
            valid:false,//滑块验证
        }
    },
    methods: {
        // 开始获取验证码
        start() {
            if (this.judgeFirst() == false || this.checkTel== false) {
                return;
            } else {
                this.time = this.second;
                console.log(this.disabled);
                this.timer();
                // 发送短信验证码
                let params = {
                    'phone': this.registerTel,
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
        // 定时器
        timer() {
            if (this.time > 0) {
                this.time--;
                setTimeout(this.timer, 1000);
            } else {
                this.disabled = false;
            }
        },
        // 跳转页面倒计时
        countTimer() {
            if (this.countTime > 0) {
                this.countTime--;
                setTimeout(this.countTimer, 1000);
            } else {
                this.countTime=0;
                this.$router.push('/search-store');
            }
        },
        // 手机号失去焦点时验证
        checkTelFun(){
            if(this.registerTel.length==11){
                let params={
                    'mobile':this.registerTel
                }
                UserLoginByMobile(params).then(response => {
                    console.log(response);
                    if(response== null){
                        this.checkTel=true;
                    }
                    else{
                         this.$Message.info('该用户已经注册');
                    }
                });
            }
        },
        // 验证手机号
        judgeFirst(){
            if (tools.trim(this.registerTel) == "") {
                this.$Message.info("手机号码不能为空");
                return false;
            }
            let pattern = /^0{0,1}(1[0-9][0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/;
            if (!pattern.test(this.registerTel)) {
                this.$Message.info("请输入正确的手机号码");
                return false;
            }
        },
        // 验证确认密码是否可以输入
        passwordCom(){
            if(this.registerPassword==''){
                 this.$Message.info("请先输入密码");
                 this.registerPasswordCom="";
            }
        },
        // 验证是否可以去注册
        judgeRegister(){
            // 验证密码
            if (tools.trim(this.registerPassword) == "") {
                this.$Message.info("密码不能为空");
                return false;
            }
            let pattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
            if (!pattern.test(this.registerPassword)) {
                this.$Message.info("请输入符合要求的密码");
                return false;
            }
            if (tools.trim(this.registerPasswordCom) == "") {
                this.$Message.info("确认密码不能为空");
                return false;
            }
            if(this.registerPassword!=this.registerPasswordCom){
                this.$Message.info("两次输入的密码不一致");
                return false;
            }
        },
        // 下一步
        stepNext(){
             if(this.judgeFirst(this.registerTel) == false) {
                return;
            }
            if(this.code==''){
                this.$Message.info("请输入验证码");
                return;
            }
            if(this.valid==false){
                this.$Message.info('请先进行正确的滑块验证');
                return;
            }
            // 验证验证码
            let params1=this.registerTel;
            let params2=this.code;
            checkCode(params1,params2).then(response => {
                console.log(response);
                if (response.meta.success == true) {
                    console.log("验证码验证成功");
                    this.step=2;

                } else {
                    console.log("验证码验证失败");
                    this.$Message.info(response.meta.message);
                }
            });
        },
        // 注册
        registerFun(){
            if (this.judgeRegister() == false) {
                return;
            }
            let params={
                'mobile':this.registerTel,
                'password':this.registerPassword
            } 
            UserRegisteByMobile(params).then(response => {
                console.log(response);
                if(response==1){
                    this.step=3;
                    this.countTime = this.countSecond;   
                    this.countTimer();
                }
                else{
                    this.$Message.info('注册失败');
                }
            });
        },
        // 直接登录
        loginFun(){
            let params = {
                mobile: this.registerTel,
                password: this.registerPassword
            };
            UserLoginByMobilePassword(params).then(response => {
                console.log(response);
                if (response.ResultCode==0) {
                    let paramsLogin = response;
                    login(paramsLogin).then(response => {
                        console.log(response);
                        if (response.meta.success == true) {
                            console.log("登录成功");
                            tools.setLocalStorage("mobile",response.data.mobile);
                            tools.setLocalStorage("userType",response.data.userType);
                            tools.setSessionStorage("userId",response.data.id);
                            // 登录
                            this.$store.commit("setStorage", {
                                user: this.loginTelNum
                            });
                            this.$store.commit("setLogin", "1");
                            this.$router.push("/supplier?orgId=" + this.orgId);
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
        // 注册页面初始化
        registerInit(){
            this.orgId = tools.getLocalStorage("orgId");
        },
        // 滑块插件
        newJigsaw(){
            new jigsaw(document.getElementById('captchaReg'),()=>{
                console.log('验证成功！');
                this.valid=true;
                this.stepNext();
            }, function () {
                console.log('验证失败！');
                this.valid=false;
            })
        }
    },
    mounted(){
        this.registerInit();
        this.newJigsaw();
        new WOW().init();
    },
    components:{
        Footer
    },
    computed: {
        text: function() {
          return this.time > 0 ? this.time + "s 后重获取" : "获取验证码";
        },
        countText:function(){
           return this.countTime > 0 ? this.countTime:0;  
        }
    }
}
</script>

<style lang="scss">
.register {
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
    >h2{
        text-align: center;
        height: 207px;
        >img{
            @include wh(413px,207px);
        }
    }
    .register-con {
        box-sizing: border-box;
        margin-top: 73px;
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
        .register-box {
            display: inline-block;
            vertical-align: top;
            width: 352px;
            height: 470px;
            background: #fff;
            > h2 {
                height: 54px;
                line-height: 54px;
                background: #ffba00;
                font-size: 16px;
                color:#fff;
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
                margin: 65px 25px 0 25px;
                &.fail {
                    background: #ccc;
                }
            }
            .step-next-esp{
                margin-top:100px;
                margin-bottom: 100px;
            }
        }
    }
    .register-success{
        @include wh(570px,393px);
        margin: auto;
        border-radius: 6px;
        background: #fff;
        text-align: center;
        padding-top: 54px;
        box-sizing: border-box;
        >img{
            @include wh(237px,145px);
        }
        >h2{
            @include sc(20px,#ffba00);
            margin: 35px 0 20px 0;
        }
        >p{
            @include sc(16px,#333);
            margin-bottom: 20px;
            >span{
                @include sc(16px,#ffba00);
            }
        }
        >a{
            @include sc(14px,#6ea5ff);
            &:hover{
                text-decoration: underline;
            }
        }
    }
}
</style>

