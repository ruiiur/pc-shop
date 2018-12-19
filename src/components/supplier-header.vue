<!--这是供应商头部导航组件-->
<template>
	<div class="supplier-header">
		<div class="supplier-top">
			<div>
				<div class="supplier-login">
					<a href="#/login" class="login-btn" v-if="mobile==''">登录</a>
					<a href="#/register" class="register-btn" v-if="mobile==''">注册</a>
					<div class="user-information" v-if="mobile!=''">
						<p v-if="userType==1"><span><a href="javascript:;" @click="toPersonal(0)">欢迎您，{{mobile}}</a></span><a href="javascript:;" @click="loginOutFun()">[退出]</a></p>
						<p v-if="userType==2"><span><a href="javascript:;" @click="toPersonal(2)">欢迎您，{{mobile}}</a></span><a href="javascript:;" @click="loginOutFun()">[退出]</a></p>
					</div>
				</div>
				<div class="supplier-link">
					<a href="#/search-store" class="square-btn">专卖店广场搜索</a>
					<a href="javascript:;" @click="toPersonal(1)" class="order-btn" v-if="userType==2">我的订单</a>
					<dropdown trigger="click" v-if="userType==1" class="order-drop">
						<a href="javascript:void(0)">
							我的订单
							<icon type="arrow-down-b"></icon>
						</a>
						<dropdown-menu slot="list">
							<dropdown-item><a :href="'http://'+domain+'/Module/Seller/Distribution.aspx'">我卖出的订单</a></dropdown-item>
							<dropdown-item><a href="javascript:;" @click="mineBuy()">我买到的订单</a></dropdown-item>
							<!-- <dropdown-item><a :href="'http://'+domain+'/Module/Buy/OrderList.aspx'">我买到的订单</a></dropdown-item> -->
						</dropdown-menu>
					</dropdown>
					<a :href="'#/supplier?orgId='+uOrgId" v-if="userType==1" class="store-btn">我的专卖店</a>
					<dropdown trigger="click" class="phone-store" placement="bottom-end">
						<a href="javascript:void(0)">
							手机专卖店
							<icon type="arrow-down-b"></icon>
						</a>
						<dropdown-menu slot="list">
							<div>
								<img :src="codeImg" alt="">
								<div>
									<h2>手机专卖店</h2>
									<p>微信扫一扫</p>
									<p>直接进入</p>
								</div>
							</div>
						</dropdown-menu>
					</dropdown>
				</div>
			</div>
		</div>
		<div class="supplier-logo">
			<div class="logo-img">
				<img :src="logoPic" alt="" v-if="logoPic!=null && logoPic!=''">
				<img src="../assets/images/default-logo.png" alt="" v-if="logoPic==null||logoPic==''">
			</div>
			<div class="supplier-name">
				<p>我的专卖店</p>
				<span>{{logoName}}</span>
			</div>
			<div class="header-site">
				<p @click.stop="openSiteCon()">
					{{startCity}}<i :class="isHide==true?'esp':''"></i>
				</p>
				<div v-if="isHide==true" @click.stop="isHide=isHide">
					<p>热门出发城市</p>
					<div class="hot-site">
						<a href="javascript:;" v-for="(city,index) in siteList"
						   @click.stop.prevent="resetCookie(city,index)" :class="hotSiteIndex==index?'active':''">{{city.sitename}}</a>
					</div>
				</div>
			</div>
			<form action="" v-if="without" class="serach-input">
				<input type="text" v-model="keyWord" placeholder="请输入目的地、主题或关键字"/>
				<a href="javascript:;" @click="toSupplierList()"></a>
			</form>
			<a href="#/quote" class="quote-btn" v-if="userType==1">下载报价文件</a>
		</div>
		<div class="supplier-nav">
			<ul>
				<li  v-for="(operate,path,index) in operates" class="nav" >
					<router-link :to="{ path: operate.path, query: { destinations: '', tagName:'', routetypeid:operate.id} }"  active-class="active">
						{{operate.name}}
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import tools from "../common/tools";
	import {
		getAllSite,
		getAllRouteType,
		getCookie,
		getLogo,
		loginOut,
		getH5Shop,
		redirectOrderOfBuy
	} from "../services/index";

	export default {
		props: ["indexPlan", "isHide", 'without'],
		data() {
			return {
				siteIndex: 0, //站点默认显示区域
				startCity: "",
				// siteShow:false,//站点区域
				siteList: [], //头部站点相关区域
				allRouteType: [], //线路类型，如 周边游，国内游，出境游等
				hotSiteIndex: -1, //热门出发城市重置站点
				// siteAllIndex:-1,//所有站点展示区域默认值
				searchText: "", //搜索站点搜索框的值
				searchShow: false, //搜索站点框显隐
				searchSiteList: [], //搜索列表
				orgId: "", //供应商id
				logoPic: '',//供应商logo
				logoName:'',//供应商标题
				mobile: '',//用户登录的电话号码
				operates:[],
				userType:'',//用户类型
				keyWord:'',//搜索值
				codeImg:'',//手机商城二维码
				domain:'',
				uOrgId:'',//erp登录保存的orgId
			};
		},
		methods: {
			// B端我买到的
			mineBuy(){
				redirectOrderOfBuy().then((response)=>{
					console.log(response);
					console.log('我买到的订单');
					window.location.href=response;
				}).catch((err)=>{
					console.log('我买到的订单异常',err);
				});
			},
			// 去个人中心
			toPersonal(num){
				this.$router.push('/personal-data/'+num);
				this.$emit("refreshList");
			},
			 // 去搜索列表页
			toSupplierList(){
				if(this.keyWord!=''){
					tools.setLocalStorage("keyWords",this.keyWord);
					tools.setLocalStorage("tripType",'');
					this.$router.push('/supplier-list');
				}
				else{
					this.$Message.info('请先输入搜索内容');  
				}
			},
		
			getHeaderSiteInit() {
				if (tools.getLocalStorage("keyWords")!= null && tools.getLocalStorage("keyWords")!= undefined) {
					this.keyWords = tools.getLocalStorage("keyWords");
				}
				else{
					this.keyWords="";
				}
				
				this.orgId = tools.getLocalStorage("orgId");
				this.userType=tools.getLocalStorage('userType');
				this.domain=tools.getSessionStorage('domain');
				this.uOrgId=tools.getSessionStorage('uOrgID');
				let name = this.$route.fullPath;
				console.log(name,'--------------------');
				console.log(this.orgId);
				// 判断是否登录
				// console.log(tools.getLocalStorage("mobile"));
				if (tools.getLocalStorage("mobile") != null) {
					this.mobile = tools.getLocalStorage("mobile");
				}
				//获取站点存cookie
				// 初始化站点名
				if (tools.getSessionStorage('siteName')) {
					this.startCity = tools.getSessionStorage('siteName');
					// 初始化站点id
					// if(tools.getLocalStorage('siteid')){
					//     this.siteId=tools.getLocalStorage('siteid');
					// }
					this.$emit("refreshList");
				}
				else {
					let params={
						'orgId':this.orgId
					}
					getCookie(params).then(response => {
						console.log(response);
						if (response.meta.success == true) {
							console.log("站点cookie数据获取成功");
							tools.setSessionStorage("siteid", response.data.siteID);
							tools.getSessionStorage("siteName", response.data.siteName);
							this.startCity = response.data.siteName;
							this.$emit("refreshList");
						} else {
							console.log("站点cookie数据获取失败");
						}
					})
					.catch(err => {
						console.log("站点cookie接口获取异常", err);
						// this.$Message.info('站点cookie接口获取异常');
					});
				}
				//站点展示接口绑定
				let paramsAllSite = this.orgId;
				getAllSite(paramsAllSite).then(response => {
					console.log(response);
					if (response.meta.success == true) {
						console.log("站点数据获取成功");
						if (response.data != null) {
							this.siteList = response.data;
							// for (let i = 0; i < this.siteList.allSite.length; i++) {
							//   this.$set(this.siteList.allSite[i], "siteAllIndex", -1);
							// }
						}
					} else {
						console.log("站点数据获取失败");
					}
				})
				.catch(err => {
					console.log("站点接口获取异常", err);
					// this.$Message.info('站点接口获取异常');
				});

				getLogo(paramsAllSite).then(response => {
					console.log(response);
					if (response.meta.success == true) {
						console.log("供应商logo数据获取成功");
						if(response.data!=null){
							this.logoPic = response.data.logo;
							this.logoName = response.data.travelAgencyName;
							tools.setLocalStorage('logoPic',response.data.logo);
							tools.setLocalStorage('logoName',response.data.travelAgencyName);
							tools.setLocalStorage('address',response.data.address);
						}
						// console.log(this.logoPic);
					} else {
						console.log("供应商logo数据获取失败");
					}
				})
				.catch(err => {
					console.log("供应商logo数据接口获取异常", err);
				});

                // 获取手机专卖店二维码
				getH5Shop(paramsAllSite).then(response => {
					console.log(response);
					if (response.meta.success == true) {
						console.log("获取手机专卖店二维码成功");
						this.codeImg=response.meta.message;
					} else {
						console.log("获取手机专卖店二维码失败");
					}
				})
				.catch(err => {
					console.log("获取手机专卖店二维码异常", err);
				});

				//头部线路类型接口绑定
				getAllRouteType().then(response => {
					console.log(response);
					// let allRoute=[];
					if (response.meta.success == true) {

						console.log("头部线路类型数据获取成功");

						this.allRouteType = response.data;
						// console.log(this.allRouteType);
						let indexPash = '/supplier?orgId=' + this.orgId;
						this.operates = [
							{"name":"首页","path":indexPash},
						];
						for (let i=0 ; i<this.allRouteType.length;i++){
							let obj = {};
							obj['name'] = this.allRouteType[i].routetype;
							obj['path'] = this.allRouteType[i].routetype;
							obj['id'] = this.allRouteType[i].id;
							this.operates.push(obj);
						}
						
						for (let j=0 ; j<this.operates.length;j++){
							if (this.operates[j].name == '首页') {
								this.operates[j].path = indexPash;
							}
							if (this.operates[j].name == '国内长线') {
								this.operates[j].path = '/supplier-domestic-list';
							}
							if (this.operates[j].name.indexOf('境') !=-1) {
								this.operates[j].path = '/supplier-abroad-list';
							}
							if (this.operates[j].name == '周边短线') {
								this.operates[j].path = '/supplier-surrounding-list';
							}
						}
						// console.log(this.operates,'----');

						// this.allRouteType.push({id:'',routetype:'定制游'});
						this.allRouteType.unshift({id: "", routetype: "首页"});

					} else {
						console.log("头部线路类型数据获取失败");
					}
				})
					.catch(err => {
						console.log("头部线路类型接口获取异常", err);
						// this.$Message.info('头部线路类型接口获取异常');
					});
			},
			// 重置站点和cookie
			resetCookie(city, index) {
				this.startCity = city.sitename;
				tools.setSessionStorage("siteid", city.id);
				tools.getSessionStorage("siteName", city.sitename);
				this.hotSiteIndex = index;
				this.$emit("refreshList");
				this.$emit("global");
				// this.$emit('initHome');
			},
			openSiteCon() {
				this.$emit("global");
				this.searchSiteList = [];
				this.searchText = "";
			},
			//搜索选择
			searchSelectedSite(search) {
				this.searchText = search.sitename;
				this.startCity = search.sitename;
				tools.setSessionStorage("siteid", search.id);
				tools.setSessionStorage("siteName", search.sitename);
				this.$emit("refreshList");
				this.$emit("global");
			},
			// searchProduct() {
			// 	let url = window.location.href;
			// 	if (url.indexOf("/domestic-list") >= 0) {
			// 		if (this.keyWords != undefined && this.keyWords != "") {
			// 			// alert('1')
			// 			// alert(this.keyWords);
			// 			tools.setLocalStorage("keyWords", this.keyWords);
			// 			this.$emit("refreshList");
			// 			this.$emit("search");
			// 		} else {
			// 			tools.setLocalStorage("keyWords", "");
			// 			this.$Message.info("请输入搜索内容");
			// 			this.$emit("refreshList");
			// 		}
			// 	} else {
			// 		// alert(3);
			// 		if (this.keyWords != undefined && this.keyWords != "") {
			// 			tools.setLocalStorage("keyWords", this.keyWords);
			// 			this.$router.push("/supplier-domestic-list");
			// 			this.keyWords = this.keyWords;
			// 		} else {
			// 			this.$Message.info("请输入搜索内容");
			// 		}
			// 	}
			// },
			// 退出
			loginOutFun() {
				let params={
					'orgId':this.orgId
					};
				loginOut(params).then(response => {
					if(response.meta.success==true){
						this.$router.push("/jump?orgId=" + this.orgId+"&status=5");
						// this.$router.push("/supplier?orgId=" + this.orgId);
						// console.log(response);
						window.location.reload();
						localStorage.clear();
						sessionStorage.clear();
						tools.setLocalStorage("orgId", response.meta.message);
					}
				})
					.catch(err => {
						console.log("退出异常", err);
					});
			}
		},
		mounted() {
			this.getHeaderSiteInit();
		}
	};
</script>

<style lang="scss">
.supplier-header {
	background: #fff;
	.supplier-top{
		height: 30px;
		background: #f8f8f8;
		border-bottom: solid 1px #eeeeee;
		line-height: 30px;
		>div{
			width:1180px;
			margin: auto;
		}
		.supplier-login{
			display: inline-block;
			.login-btn,.register-btn{
				@include sc(12px,#404040);
			}
			.login-btn{
				padding-right: 10px;
				border-right:1px solid #bbb;
				margin-right: 8px;
			}
			.user-information{
				>p{
					>span{
						>a{
							@include sc(12px,#ffba00);
						}
					}
					>a{
						margin-left: 15px;
					}
				}
			}
		}
		.supplier-link{
			float: right;
			.square-btn{
				@include sc(12px,#ffba00);
				// line-height: 30px;
				// display: inline-block;
			}
			>a,.ivu-dropdown{
				@include sc(12px,#404040);
				padding: 0 16px;
			}
			>a:not(.order-btn){
				// &::after{
				// 	content:"";
				// 	display: inline-block;
				// 	height: 16px;
				// 	width: 1px;
				// 	background: #bbb;
				// 	margin-left: 15px;
				// 	vertical-align: middle;
				// }
				border-right:1px solid #bbb;
			}
			.store-btn{
				border-left:1px solid #bbb;
			}
			.order-btn{
				border-right:1px solid #bbb;
			}
			.phone-store{
				.ivu-select-dropdown{
					padding:7px 10px 0;
				}
				.ivu-dropdown-menu{
					width: 195px;
					>div{
						>img{
							@include wh(88px,88px);
						}
						>div{
							display: inline-block;
							vertical-align: top;
							margin-left: 10px;
							>h2{
							   @include sc(14px,#ffba00);	
							}
							>p{
							   @include sc(14px,#555);
							}
						}
					}
				}
			}
			.order-drop{
				.ivu-dropdown-item{
					padding: 0;
					text-align: center;
					line-height: 30px;
					>a{
						display: inline-block !important;
						width: 104px !important;
						height: 30px !important;
					}
				}
			}
		}
    }
    .supplier-logo{
		width:1180px;
		margin: auto;
		padding: 22px 0;
		.logo-img{
			display: inline-block;
			vertical-align: middle;
			>img{
				height: 55px;
				// @include wh(110px,55px);
			}
		}
		.supplier-name{
			display: inline-block;
			vertical-align: middle;
			max-width: 200px;
			margin-left: 17px;
			>p{
				@include sc(19px,#404040);
			}
			>span{
				display: inline-block;
				vertical-align: middle;
				max-width: 200px;
				@include sc(14px,#404040);
			}
		}
		>a{
			float: right;
			@include sc(14px,#ffba00);
			margin-top: 22px;
		}
		>form{
			display: inline-block;
			width: 410px;
			font-size: 0;
			margin-left: 100px;
			>input{
				@include wh(354px,36px);
				border:2px solid #ffba00;
				border-right:none;
				box-sizing: border-box;
				padding-left: 18px;
				@include sc(14px,#333);
				line-height: 42px;
				outline: none;
				&::-moz-placeholder{
					@include sc(14px,#bcbcbc);
				}
			}
			>a{
				display: inline-block;
				vertical-align: top;
				@include wh(55px,36px);
				background: #ffba00 url('../assets/images/supplier-s.png') no-repeat center center;
			}
		}
		.header-site {
			display: inline-block;
			vertical-align: middle;
			> p {
				@include sc(18px, #333);
				cursor: pointer;
				> i {
					display: inline-block;
					@include wh(16px, 8px);
					background: url("../assets/images/site-bottom.png") no-repeat;
					background-size: 100%;
					margin-left: 5px;
					&.esp {
						background: url("../assets/images/site-top.png") no-repeat;
						background-size: 100%;
					}
				}
			}
			// margin: 10px 55px 0 55px;
			margin: 0 55px 0 55px;
			position: relative;
			> div {
				position: absolute;
				top: 39px;
				width: 653px;
				z-index: 10000;
				background: #fff;
				padding: 20px 43px 30px 20px;
				box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.6);
				border-radius: 4px;
				> p {
					@include sc(14px, #999);
					line-height: 14px;
					margin-bottom: 5px;
				}
				.hot-site {
					> a {
						@include sc(14px, #333);
						margin-right: 15px;
						&.active {
							@include sc(14px, #1e5cab);
						}
					}
				}
				.search-input {
					> input {
						@include wh(300px, 35px);
						border: 1px solid #ddd;
						// border-radius: 20px;
						margin: 10px 0;
						// outline: none;
						padding-left: 20px;
						@include sc(14px, #333);
						&:focus {
							border: 1px solid #005cab;
						}
					}
					> ul {
						width: 300px;
						// @include wh(300px,200px);
						border: 1px solid #1e5cab;
						position: absolute;
						left: 20px;
						overflow-y: auto;
						background: #fff;
						z-index: 1000;
						> li {
							list-style: none;
							height: 27px;
							line-height: 27px;
							padding-left: 20px;
							border-bottom: 1px solid #1e5cab;
							@include sc(14px, #1e5cab);
							// padding-left: 5px;
							&.active {
								background: #1e5cab;
								color: #fff;
							}
							&:last-child {
								border-bottom: none;
							}
						}
					}
				}
				.site-list {
					> ul {
						> li {
							list-style: none;
							float: left;
							height: 24px;
							padding: 0 15px;
							@include sc(14px, #333);
							line-height: 24px;
							margin-right: 10px;
							&.active {
								background-image: linear-gradient(
										90deg,
										#005bac 0%,
										#008871 50%,
										#008c6b 55%,
										#6fba2c 100%
								),
								linear-gradient(#4145f2, #4145f2);
								@include sc(14px, #fff);
							}
						}
					}
					> div {
						clear: both;
						padding-top: 15px;
						> ul {
							> li {
								list-style: none;
								margin-top: 5px;
								> p {
									> span {
										font-family: MicrosoftYaHei-Bold;
										@include sc(14px, #1e5cab);
										font-weight: bold;
										margin-right: 15px;
									}
									> a {
										@include sc(14px, #333);
										margin-right: 10px;
										&.active {
											@include sc(14px, #1e5cab);
										}
									}
								}
								&:first-child {
									margin-top: 0;
								}
							}
						}
					}
				}
			}
		}
	}
    .supplier-nav {
        width:100%;
        height: 46px;
        background-color:#434343;
        >ul{
            width:1180px;
            margin: auto;
            > li {
                float: left;
                height: 46px;
                line-height: 46px;
                width: 100px;
                list-style: none;
                font-size: 0;
                text-align: center;
                > a {
                    color: #fff;
                    font-size: 14px;
                    display: inline-block;
                    width:100%;
                    overflow: hidden;
                    &::after{
                        float: right;
                        height: 15px;
                        width: 1px;
                        background: #fff;
                        content: '';
                        margin-top: 16px;
                    }
                    // &:hover{
                    //     -webkit-transform: scale(1.2);
                    //     -moz-transform:scale(1.2);
                    //     -o-transform:scale(1.2);
                    //     transform:scale(1.2);
                    // }
                }
                > a.active {
                    background: #ffba00;
					margin-left: -2px;
                    &::after{
                        display: none;
                    }
                }
            }
        }
        // padding-left: 40px;
        // margin-bottom: 60px;
        // box-sizing: border-box;
        // margin-top: 20px;
    }
}
</style>
