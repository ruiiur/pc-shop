<!--这是找回密码页面-->
<template>
    <div class="password">
       <h2><img class="wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.5s" src="../assets/images/new-logo.png" alt=""></h2>
       <div class="password-con">
            <img class="wow fadeInRight" v-if="step!=3" src="../assets/images/xiaobeijing.png" alt="">
            <div class="password-box wow fadeInLeft" v-if="step!=3">
                <h2>找回密码</h2>
                <div v-if="step==1" class="input-box">
                   <div>
                        <Input type="text" placeholder="请输入您的手机号" clearable v-model="passwordTel" @on-change="checkMobileFun()"></Input>
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
                        <Input type="password" placeholder="密码，6-16位，区分大小写" clearable v-model="password"></Input>
                        <img src="../assets/images/mima.png" alt=""> 
                    </div>
                    <div>
                        <Input type="password" placeholder="再次输入密码确认" clearable v-model="passwordCom"></Input>
                        <img src="../assets/images/mima.png" alt=""> 
                    </div>
                </div>
                <div class="container" v-if="step==1">
                    <div id="captchaPas" style="position: relative"></div>
                    <div id="msg"></div>
                </div>
               <a class="step-next" v-if="step==1" href="javascript:;" @click="stepNext()">下一步</a>
               <a class="step-next step-next-esp" v-if="step==2" href="javascript:;" @click="passwordFun()">确认</a>
               <p class="register-line"><a href="#/login">已找回去登录 >></a></p>
           </div>
           <div class="password-success" v-if="step==3">
                <img src="../assets/images/success.png" alt="">
                <h2>恭喜您,新密码设置成功！</h2>
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
  ModifyPassword,
  sendMessage,
  checkCode,
  mobile,
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
            passwordTel:'',//手机号
            password:'',//密码
            passwordCom:'',//确认密码
            step:1,//默认步骤
            code:'',//验证码
            // check:false,//验证码是否验证成功
            valid:false,//滑块验证
        }
    },
    methods: {
        //验证当前登录手机号是否存在
        checkMobileFun(){
          if(this.passwordTel.length > 10){
            let params = {"mobile":this.passwordTel};
            mobile(params).then(response => {
              console.log(response);
              if (response == null) {
                this.$Message.info("您还不是我们的用户，请先注册");
                this.loginCan = false;
                this.disabled = true;
              }else {
                this.disabled = false;
                this.loginCan = true;

              }
            });
          }
        },
         // 开始获取验证码
        start() {
            if (this.judgeFirst() == false) {
                return;
            } else {
                this.time = this.second;
                console.log(this.disabled);
                this.timer();
                // 发送短信验证码
                let params = {
                    'phone': this.passwordTel,
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
         // 验证手机号
        judgeFirst(){
            if (tools.trim(this.passwordTel) == "") {
                this.$Message.info("手机号码不能为空");
                return false;
            }
            let pattern = /^0{0,1}(1[0-9][0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/;
            if (!pattern.test(this.passwordTel)) {
                this.$Message.info("请输入正确的手机号码");
                return false;
            }
        },
        // 是否可以找回
        judgeFind(){
            // 验证密码
            if (tools.trim(this.password) == "") {
                this.$Message.info("密码不能为空");
                return false;
            }
            let pattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
            if (!pattern.test(this.password)) {
                this.$Message.info("请输入符合要求的密码");
                return false;
            }
            if (tools.trim(this.passwordCom) == "") {
                this.$Message.info("确认密码不能为空");
                return false;
            }
            if(this.password!=this.passwordCom){
                this.$Message.info("两次输入的密码不一致");
                return false;
            }
        },
        // 下一步
        stepNext(){
            if(this.judgeFirst(this.passwordTel) == false) {
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
            let params1=this.passwordTel;
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
        // 直接登录
        loginFun(){
            let params = {
                mobile: this.passwordTel,
                password: this.password
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
        // 注册
        passwordFun(){
            if (this.judgeFind() == false) {
                return;
            }
            let params={
                'mobile':this.passwordTel,
                'password':this.password
            }
            ModifyPassword(params).then(response => {
                console.log(response);
                if(response==1){
                    this.step=3;
                    this.countTime = this.countSecond;   
                    this.countTimer();
                }
            });
        },
         // 滑块插件
        newJigsaw(){
            new jigsaw(document.getElementById('captchaPas'),()=>{
                console.log('验证成功！');
                this.valid=true;
                this.stepNext();
            }, function () {
                console.log('验证失败！');
                this.valid=false;
            })
        },
         // 注册页面初始化
        passwordInit(){
            this.orgId = tools.getLocalStorage("orgId");
        },
    },
    mounted(){
        this.passwordInit();
        this.newJigsaw();
        new WOW().init();
    },
    computed: {
        text: function() {
            return this.time > 0 ? this.time + "s 后重获取" : "获取验证码";
        },
        countText:function(){
           return this.countTime > 0 ? this.countTime:0;  
        }
    },
    components:{
        Footer
    }
}
</script>

<style lang="scss">
.password {
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
    .password-con {
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
        .password-box {
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
    .password-success{
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

