<!--这是个人资料页面-->


<!-- 页面作废 -->
<template>
    <div class="reset-password">
         <!-- 供应商导航引入 -->
        <supplierHeader :logo="logoPic" :without="without" @refreshList="resetPasswordInit"></supplierHeader>
        <p class="margin-line"></p>
        <div>
            <h2 class="reset-title">修改密码</h2>
            <div class="reset-con">
                <div>
                    <label for="">请输入旧密码：</label>
                    <div>
                        <input type="text" class="ivu-input" v-model="oldPassward">
                        <p></p>
                    </div>
                </div>
                <div>
                    <label for="">请输入新密码：</label>
                    <div>
                        <input type="text" class="ivu-input" v-model="newPassward">
                        <p></p>
                    </div>
                </div>
                <div>
                    <label for="">请再次输入新密码：</label>
                    <div>
                        <input type="text" class="ivu-input" v-model="againNewPassward">
                        <p></p>
                    </div>
                </div>
                <p><a href="#/reset-success">确认修改</a></p>
            </div>

			<div>
				<Modal
					v-model="changePswData.changePswModel"
					:closable="false"
					:mask-closable="false"
					title="修改密码"
					@on-ok="changePswOk"
					@on-cancel="changePswCancel">
					<div style="margin-bottom: 5px;">
						<p style="display: inline-block; width: 100px;">原密码：</p>
						<Input type="password" :maxlength="20" v-model="changePswData.oldPsw" placeholder="请输入原密码..." style="width: 300px" @on-blur="oldPswValid" @on-focus="oldPswValid_focus"></Input>
						<p style="display: inline; color: red;margin-left: 110px;" :style="{display: changePswData.oldPsw_pswLog_noBlank_Flag}">{{ changePswData.oldPsw_pswLog_noBlank }}</p>
					</div>
					<div style="margin-bottom: 5px;">
						<p style="display: inline-block; width: 100px;">新密码：</p>
						<Input type="password" :maxlength="20" v-model="changePswData.newPsw" placeholder="请输入新密码..." style="width: 300px" @on-blur="newPswValid" @on-focus="newPswValid_focus"></Input>
						<p style="display: inline; color: red;margin-left: 110px;" :style="{display: changePswData.newPsw_pswLog_noBlank_Flag}">{{ changePswData.newPsw_pswLog_noBlank }}</p>
						<p style="display: inline; color: red;margin-left: 110px;" :style="{display: changePswData.pswLog_pattern_Flag}">{{ changePswData.pswLog_pattern }}</p>
					</div>
					<div>
						<p style="display: inline-block; width: 100px;">重复新密码：</p>
						<Input type="password" :maxlength="20" v-model="changePswData.againNewPsw" placeholder="请再输入一次新密码..." style="width: 300px" @on-blur="againNewPswValid" @on-focus="againNewPswValid_focus"></Input>
						<p style="display: inline; color: red;margin-left: 110px;" :style="{display: changePswData.againNewPsw_pswLog_noBlank_Flag}">{{ changePswData.againNewPsw_pswLog_noBlank }}</p>
						<p style="display: inline; color: red;margin-left: 110px;" :style="{display: changePswData.pswLog_equality_Flag}">{{ changePswData.pswLog_equality }}</p>
					</div>
				</Modal>
			</div>



        </div>
        <div class="reset-bottom">
            <p>上海竞界科技有限公司   | © 2018 laolvyou.vip, All rights reserved.    |   沪ICP备18020065号-2</p>
            <!-- <p>旅游违法行为举报电话：12318 服务质量投诉电话：953520 上海市互联网违法和不良信息举报中心电话：021-55056666</p> -->
        </div>
    </div>
</template>
<script>
import tools from "../common/tools";
import supplierHeader from "../components/supplier-header.vue";
import {

} from "../services/index";
export default {
    data(){
        return{
            logoPic:'',
            without:true,
			oldPassward:"",
			newPassward:"",
			againNewPassward:"",


			changePswData: {
				changePswModel: true,

				oldPsw: '',
				oldPsw_pswLog_noBlank: '密码不能为空，请重新输入',
				oldPsw_pswLog_noBlank_Flag: 'none',

				newPsw: '',
				newPsw_pswLog_noBlank: '密码不能为空，请重新输入',
				newPsw_pswLog_noBlank_Flag: 'none',
				pswLog_pattern: '密码由5-20位数字字母组成，请重新输入',
				pswLog_pattern_Flag: 'none',

				againNewPsw: '',
				againNewPsw_pswLog_noBlank: '密码不能为空，请重新输入',
				againNewPsw_pswLog_noBlank_Flag: 'none',
				pswLog_equality: '两次输入密码不相等，请重新输入',
				pswLog_equality_Flag: 'none'
			}
        }
    },
    methods: {
        resetPasswordInit(){

        },
// 打开Model框
		changePsw () {
			this.changePswModel = true;
		},
// 验证输入框
		oldPswValid() {
			console.log(this.changePswData.oldPsw)
			if(this.changePswData.oldPsw != ''){
				this.changePswData.oldPsw_pswLog_noBlank_Flag = 'none'
			}else{
				this.changePswData.oldPsw_pswLog_noBlank_Flag = 'block'
			}
		},
		oldPswValid_focus() {
			this.changePswData.oldPsw_pswLog_noBlank_Flag = 'none'
		},
		newPswValid() {
			console.log(this.changePswData.newPsw)
			if(this.changePswData.newPsw != ''){
				this.changePswData.newPsw_pswLog_noBlank_Flag = 'none';
				let pattern = /^[a-zA-Z0-9]{6,20}$/;
				if(!pattern.test(this.changePswData.newPsw)){
					this.changePswData.pswLog_pattern_Flag = 'block';
				}else{
					this.changePswData.pswLog_pattern_Flag = 'none';
				}
			}else{
				this.changePswData.newPsw_pswLog_noBlank_Flag = 'block'
			}
		},
		newPswValid_focus() {
			this.changePswData.newPsw_pswLog_noBlank_Flag = 'none';
			this.changePswData.pswLog_pattern_Flag = 'none';
		},
		againNewPswValid() {
			console.log(this.changePswData.againNewPsw)
			if(this.changePswData.againNewPsw != ''){
				this.changePswData.againNewPsw_pswLog_noBlank_Flag = 'none';
				if(this.changePswData.againNewPsw != this.changePswData.newPsw){
					this.changePswData.pswLog_equality_Flag = 'block'
				}else{
					this.changePswData.pswLog_equality_Flag = 'none'
				}
			}else{
				this.changePswData.againNewPsw_pswLog_noBlank_Flag = 'block'
			}
		},
		againNewPswValid_focus() {
			this.changePswData.againNewPsw_pswLog_noBlank_Flag = 'none';
			this.changePswData.pswLog_equality_Flag = 'none'
		},

		changePswOk () {
        	console.log(this.changePswData.oldPsw,this.changePswData.newPsw);

		},
		changePswCancel () {

		}

    },
    mounted(){
        // this.personalDataInit();
    },
    components:{
        supplierHeader
    }

}
</script>

<style lang="scss" scoped>
.reset-password{
    .margin-line{
        height: 40px;
        background: #f1f1f1;
        width:100%;
        margin-top: 20px;
    }
    .reset-title{
        @include sc(18px,#333);
        text-align: center;
        font-weight: bold;
        padding-top: 40px;
        margin-bottom: 70px;
    }
    .reset-con{
        width:315px;
        margin: auto;
        >div{
            margin-bottom: 20px;
            >label{
                @include sc(14px,#333);
                display: inline-block;
                width:126px;
                text-align: right;
            }
            >div{
                display: inline-block;
                >input{
                   @include wh(180px,30px);
                   border:1px solid #ddd;
                }
            }
        }
        >p{
            text-align: center;
            margin-top: 100px;
            >a{
                display: inline-block;
                @include wh(220px,50px);
                background-image: linear-gradient(0deg,
                    #005bac 0%,
                    #008871 50%,
                    #008c6b 55%,
                    #6fba2c 100%);
                border-radius: 10px;
                @include sc(18px,#fff);
                line-height: 50px;
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

