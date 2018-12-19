<!--这是供应商店铺页面-->
<template>
	<div class="supplier" @click="globalFun">
		<a href="javascript:;" id="top"></a>
		<!-- 供应商导航引入 -->
		<supplierHeader :without="without" :indexPlan="indexPlan" :isHide="isHide" @global="globalFunT" @refreshList="supplierInit"></supplierHeader>
		<!-- 四个随机产品详情 -->
        <div class="home-bg" >
            <h2 class="wow bounceInDown">你想要去的地方</h2>
            <div class="wow bounceInLeft" data-wow-duration="1s" data-wow-delay="0.75s">
                <form>
                    <Input placeholder="请输入目的地、主题或关键字" v-model="keyWord" clearable autocomplete="off" />
                </form>
                <a href="javascript:;" @click="toSupplierList()">搜索</a>
            </div>
        </div>
		
		<!--2018/12/12  熊二  特价促销-->
		<div class="sales-promotion wow fadeInUp animated"  v-if="promotionList.length!=0">
			<div class="promotion-title">
				<img src="../assets/images/huomiao.png" class="promotion-icon"/>
				特价促销
				<a  class="promotion-more" href="javascript:;" @click="goPromotionList()">更多产品 > </a>
			</div>
			<div class="">
				<ul class="promotion-product">
	                <li v-for="(promotionArr,index) in promotionList" v-if='index<=3'>
	                    <a raunt="server" :href="'#/details/'+promotionArr.id+'/'+promotionArr.orgId+'/'+promotionArr.isOutgoing">
	                        <div class="promotion-img">
	                            <img :src="promotionArr.coverImg" alt="">
	                        </div>
	                        <div class="promotion-con">
	                            <h2 class="promotion-tag">{{promotionArr.aliaseName.substring(0,25)}}</h2>
	                            <div class="promotion-price">
	                            	<span class="price-sales">
	                            		促销
	                            	</span>
	                            	<span class="salesPrice">￥{{promotionArr.salesPrice}}<i>起</i></span>
	                            </div>
	                        </div>
	                        <!--<div class="predetermine">立即预定</div>-->
	                        <img src="../assets/images/sales.png" class="predetermine"/>
	                    </a>
	                </li>
	                
	            </ul>
	            
			</div>
			
		</div>
		<!-- 跟团游,自由行等等 -->
		<div class="group-content" v-if="productList.length!=0">
			<div class="trip-content wow fadeInUp animated"  data-wow-delay="1.5s" data-wow-duration="1s" :id="'content'+index" v-for="(productArr,index) in productList">
                <a href="javascript:;" :id="'tour'+index"></a>
                <div class="trip-line">
                    <h1>
                        <img v-if="productArr[0].proType=='自由行'" src="../assets/images/pz.png"></img>
                        <img v-if="productArr[0].proType=='跟团游'" src="../assets/images/pg.png"></img>
                        <img v-if="productArr[0].proType=='半自由行'" src="../assets/images/pbz.png"></img>
                        {{productArr[0].proType}}
                        <a href="javascript:;" @click="goHomeList(productArr[0].proType)" v-if="productArr.length>6">更多产品<i></i></a>
                    </h1>
                </div>
                <div class="trip-main">
                    <div class="trip-img wow swing" >
                        <img v-if="productArr[0].proType=='自由行'" src="../assets/images/ziyouxing.png"></img>
                        <img v-if="productArr[0].proType=='跟团游'" src="../assets/images/gentuantu1.png"></img>
                        <img v-if="productArr[0].proType=='半自由行'" src="../assets/images/banziyouxing.png"></img>
                    </div>
                    <ul class="list-product">
                        <li v-for="(product,index) in productArr">
                            <a raunt="server" :href="'#/details/'+product.id+'/'+product.orgId+'/'+product.isOutgoing">
                                <div class="list-img">
                                    <img :src="product.coverImg" alt="">
                                </div>
                                <div class="list-con">
                                    <h2>{{product.aliaseName}}</h2>
                                    <div class="sale-price">
                                        <p v-if="userType==1">￥{{product.salesPrice}}</p>
                                        <p v-if="userType==2">￥{{product.directPrice}}</p>
                                    </div>
                                </div>
                            </a>
                        </li>
                    </ul>
                    <p v-if="productArr.length==0">暂无产品</p>
                </div>
            </div>
		</div>
        <!-- 定制游 -->
        <div v-if="productList.length!=0" class="demand-content wow fadeInDown animated" data-wow-delay="3s" data-wow-duration="1s">
            <h2>
                <img src="../assets/images/pb.png" alt="">
                 定制游
            </h2>
            <div @click="toDemandFun()">
                <img src="../assets/images/dingzhiyou.png" alt="">
                <a href="javascript:;" @click="toDemandFun()">开始定制</a>
            </div>
        </div>
		<!-- 锚点定位 -->
		<div class="anchor" v-if="scrollShow">
			<div>
				<a @click.prevent="custormAnchor('tour'+(index-1),index)" v-for="index in anchorList.length" :class="anchorIndex==index?'active':''">{{anchorList[index-1]}}</a>
				<!-- <a @click.prevent="custormAnchorTop('top')" class="point-top">
					<i></i>
				</a> -->
				<i></i>
			</div>
		</div>
        <div v-if="withoutProduct" class="maintenance">
            <img src="../assets/images/maintenance.png" alt="">
            <p>店铺维护中</p>
        </div>
		<Modal v-model="firstLoginIsHavePassward.isHavePassward" :closable="false" :mask-closable="false"  :loading="firstLoginIsHavePassward.loading" title="您还未设置登陆密码" @on-ok="changePasswardBtn" @on-cancel="changePswCancel">
			<div style="margin-bottom: 5px;">
				<p style="display: inline-block; width: 100px;">新密码：</p>
				<Input type="password" :maxlength="20" v-model="firstLoginIsHavePassward.newPassward" placeholder="请输入新密码" style="width: 300px" @on-blur="newPswValid" @on-focus="newPswValid_focus"></Input>
				<p style="display: inline; color: red;margin-left: 110px;" :style="{display: firstLoginIsHavePassward.newP_Log_none_Flag}">{{ firstLoginIsHavePassward.newP_Log_Text }}</p>
				<p style="display: inline; color: red;margin-left: 110px;" :style="{display: firstLoginIsHavePassward.pswLog_pattern_Flag}">{{ firstLoginIsHavePassward.pswLog_pattern }}</p>
			</div>
			<div>
				<p style="display: inline-block; width: 100px;">重复新密码：</p>
				<Input type="password" :maxlength="20" v-model="firstLoginIsHavePassward.againNewPassward" placeholder="请再次输入新密码" style="width: 300px" @on-blur="againNewPswValid" @on-focus="againNewPswValid_focus"></Input>
				<p style="display: inline; color: red;margin-left: 110px;" :style="{display: firstLoginIsHavePassward.againNewP_Log_none_Flag}">{{ firstLoginIsHavePassward.againNewP_Log_Text }}</p>
				<p style="display: inline; color: red;margin-left: 110px;" :style="{display: firstLoginIsHavePassward.pswLog_equality_Flag}">{{ firstLoginIsHavePassward.pswLog_equality }}</p>
			</div>
		</Modal>

		<!--<div class="box" v-if="true">-->
			<!--<div class="set-password">-->
				<!--<h2>-->
					<!--<i></i>您还未设置登陆密码!</h2>-->
				<!--<div>-->
					<!--<label for="">请输入登陆密码：</label>-->
					<!--<div>-->
						<!--<input type="text">-->
						<!--<p></p>-->
					<!--</div>-->
				<!--</div>-->
				<!--<div>-->
					<!--<label for="">请再次输入登陆密码：</label>-->
					<!--<div>-->
						<!--<input type="text">-->
						<!--<p></p>-->
					<!--</div>-->
				<!--</div>-->
				<!--<p>-->
					<!--<a href="javascript:;">确定</a>-->
				<!--</p>-->
				<!--<a href="javascript:;"></a>-->
			<!--</div>-->
		<!--</div>-->
        <!-- 反馈 -->
        <feedBack></feedBack>
		<!-- 底部 -->
		<Footer></Footer>
	</div>
</template>
<script>
import {WOW} from 'wowjs'
import tools from "../common/tools";
import {
    getProductGroupByType,
    newProductListByType,
    newProductListByPromotion,//特价促销（熊二）
	getLogo,
    ModifyPassword,
    saveRecoding,
    outRecoding,
    erpLogin,
    getBusinessTypes
} from "../services/index";
import supplierHeader from "../components/supplier-header.vue";
import Footer from "../components/footer.vue";
import feedBack from "../components/feedBack.vue";

export default {
    data() {
        return {
        	//熊二做特价促销加的
        	promotionList:[],////所有特价促销的产品
        	
            isHide: false,
            anchorIndex: 1, //锚点初始值
            siteId: "", //站点
            siteName: "", //站点名
            keyWord: "", //搜索条件
            orgId: "", //供应商id
            orgIdArr: [], //供应商id
            scrollShow: false, //控制锚点区显隐
            indexPlan: 0, //传给子组件的参数
            exampleIndex: 0, //四个产品例子的默认值
            without: false,
            productList: [], //所有类型的产品
            anchorList: [], //锚点列表
            userType: "", //用户类型
            PwdType: "", // 判断是否设置密码1有，0没有
            firstLoginIsHavePassward: {
				isHavePassward: false,
				loading:true,

                newPassward: "",
                newP_Log_Text: "密码不能为空，请重新输入",
                newP_Log_none_Flag: "none",
                pswLog_pattern: "密码由5-20位数字字母组成，请重新输入",
                pswLog_pattern_Flag: "none",

                againNewPassward: "",
                againNewP_Log_Text: "密码不能为空，请重新输入",
                againNewP_Log_none_Flag: "none",
                pswLog_equality: "两次输入密码不相等，请重新输入",
                pswLog_equality_Flag: "none"
            },
            scrollFlag:true,
            withoutProduct:false,
            userId:'',//
        };
    },
    methods: {
         //关闭页面执行
        beforeunloadHandler(){
            let paramsOut={
                'userId':this.userId,
                'orgId': this.orgId,
                'proId':'',
                'url':window.location.href,
                'siteId':this.siteId,
            }
            outRecoding(paramsOut).then(response => {
                console.log(response);
                if (response.meta.success == true) {
                    console.log("离开统计接口获取成功"); 
                } else {
                    console.log("离开统计接口获取失败");
                }
            })
            .catch(err => {
                console.log("离开统计接口获取异常", err);
            });
        },
        // 全局控制
        globalFun() {
            this.isHide = false;
        },
        globalFunT() {
            this.isHide = !this.isHide;
        },

        // 搜索对应类型
        goHomeList(str){
            tools.setLocalStorage("tripType",str);
            tools.setLocalStorage("keyWords",'');
            this.$router.push('/supplier-list');
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
        //特价促销的更多产品
        goPromotionList(){
//      	console.log(saleIndex)
        	tools.setLocalStorage("saleIndex",0);
            tools.setLocalStorage("keyWords",'');
            this.$router.push('/supplier-list');
        },
        // 供应商页面初始化
        supplierInit() {
            // 刷新页面滚动到顶部
            window.scrollTo(0, 0);
            this.orgId = tools.getLocalStorage("orgId");
            // 店铺业务类型查询接口
            // let paramsBusiness = {
            //     orgId: this.orgId
            // };
            // getBusinessTypes(paramsBusiness).then(response => {
            //     console.log(response);
            //     if (response.meta.success == true) {
            //         console.log("店铺业务类型查询接口--成功");
            //         if (response.data == 0) {
            //             this.productList=[];
            //             return;
            //         }
            //     } else {
            //         console.log("店铺业务类型查询接口--失败");
            //         this.productList=[];
            //         return;
            //     }
            // })
            // .catch(err => {
            //     console.log("店铺业务类型查询接口 --异常", err);
            // });
            this.orgIdArr = [];
            this.productList = [];
            this.siteId = tools.getSessionStorage("siteid");
            // console.log(this.siteId,'siteIdddddddd')
            this.siteName = tools.getSessionStorage("siteName");
            this.userId = tools.getSessionStorage("userId")?tools.getSessionStorage("userId"):'';

            if(tools.getLocalStorage('userType')){
                this.userType=tools.getLocalStorage('userType');
            }
            else{
                tools.setLocalStorage("userType", 2);
                this.userType = tools.getLocalStorage("userType");
            }

            this.orgIdArr.push(this.orgId);
            // 供应商商铺页面查询接口
            let params = {
                // site: this.siteName,
                siteId: this.siteId,
                // keywords: this.keyWord,
                orgId: this.orgId
            };
            newProductListByType(params).then(response => {
                console.log(response);
                if (response.meta.success == true) {
                    console.log("供应商商铺页面查询数据获取成功");
                    if (response.data != null) {
                        this.productList = response.data.proProducts;
                        this.anchorList = response.data.proType;
                        // console.log(this.anchorList);
                        this.withoutProduct=false;
                    }
                    else{
                        this.withoutProduct=true;
                    }
                } else {
                    console.log("供应商商铺页面查询数据获取失败");
                }
            })
            .catch(err => {
                console.log("供应商商铺页面查询接口异常", err);
            });

            this.PwdType = tools.getLocalStorage("PwdType");
            if (this.PwdType == "0") {
                console.log("meiyou");
                this.firstLoginIsHavePassward.isHavePassward = true;
            } else {
                console.log("you");
                this.firstLoginIsHavePassward.isHavePassward = false;
            }
			//2018/12/12  熊二 特价促销开始
			this.promotionList = [];
			newProductListByPromotion(params).then(response => {
                console.log(response);
                if (response.meta.success == true) {
                    console.log(response.data.length);
                    if (response.data != null) {
                		this.promotionList = response.data;
                       	console.log("特价产品"+this.promotionList);
                        this.withoutProduct=false;
                        
                    }
                    else{
                        this.withoutProduct=true;
                    }
                } else {
                    console.log("供应商商铺页面查询数据获取失败");
                }
            })
            .catch(err => {
                console.log("供应商商铺页面查询接口异常", err);
            });
			//2018/12/12  熊二 特价促销结束
            //获取logo
            let paramsAllSite=this.orgId;
            getLogo(paramsAllSite).then(response => {
                console.log(response);
                if (response.meta.success == true) {
                    console.log("供应商logo数据获取成功");
                    if(response.data!=null){
                        tools.setLocalStorage('logoPic',response.data.logo);
                        tools.setLocalStorage('logoName',response.data.travelAgencyName);
                        document.title=tools.getLocalStorage('logoName');
                    }
                    // console.log(this.logoPic);
                } else {
                    console.log("供应商logo数据获取失败");
                }
            })
            .catch(err => {
                console.log("供应商logo数据接口获取异常", err);
            });
            
            // // 进入统计接口获得成功
            // let paramsSave={
            //     'userId':this.userId,
            //     'orgId': this.orgId,
            //     'proId':'',
            //     'url':window.location.href,
            //     'userType':this.userType,
            //     'siteId':this.siteId,
            // }
            // saveRecoding(paramsSave).then(response => {
            //     console.log(response);
            //     if (response.meta.success == true) {
            //         console.log("进入统计接口获取成功"); 
            //     } else {
            //         console.log("进入统计接口获取失败");
            //     }
            // })
            // .catch(err => {
            //     console.log("进入统计接口获取异常", err);
            // });
        },
        // 判断页面滚动高度
        handleScroll() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            let contentTop;
            let heightArr = [];
            for (let i = 0; i < this.productList.length ; i++) {
                if(i==0){
                    contentTop=document.querySelector("#content"+i).offsetTop - 300;
                }
                heightArr.push(document.querySelector("#content"+i).offsetHeight);
            }
            let sumH = 0;
            // console.log('hhhhh',heightArr);
            for (let i = 0; i < heightArr.length; i++) {
                if(i!=0){
                    sumH += heightArr[i-1];
                }
                if(scrollTop>700){
                    this.scrollShow = true;
                }
                if (scrollTop > contentTop + sumH && scrollTop < parseInt(contentTop + sumH + heightArr[i])) {
                    this.anchorIndex = i + 1;
                    this.scrollShow = true;
                }
                if(scrollTop<700){
                    this.scrollShow=false;
                }
            }
        },
        //锚点定位
        custormAnchor(e, index) {
            e = document.getElementById(e); /*以id命名的锚点*/
            let y = e.offsetTop;
            while ((e = e.offsetParent)) {
                y += e.offsetTop;
            }
            y -= 300; /*悬浮菜单的高度*/
            window.scrollTo(0, y);
            this.anchorIndex = index;
        },
        // 返回头部
        custormAnchorTop(anchorName) {
            // 找到锚点
            let anchorElement = document.getElementById(anchorName);
            // // 如果对应id的锚点存在，就跳转到锚点
            if (anchorElement) {
                anchorElement.scrollIntoView();
            }
        },
        // 返回一个月的第一天是星期几和这个月有多少天
        getWeekDay(year, month) {
            let firstWeek = new Date(year, month, 1).getDay(); //拿到这个月1号是星期几
            let lastDay = 32 - new Date(year, month, 32).getDate(); //拿到这个月有多少天
            let a;
            if (firstWeek == 0) {
                a = 7;
            } else {
                a = firstWeek;
            }
            return {
                week: a, //这个月是星期几
                sumday: lastDay //这个月有多少天
            };
        },

        // 打开Model框
        newPswValid() {
            console.log(this.firstLoginIsHavePassward.newPassward);
            if (this.firstLoginIsHavePassward.newPassward != "") {
                this.firstLoginIsHavePassward.newP_Log_none_Flag = "none";
                let pattern = /^[a-zA-Z0-9]{6,20}$/;
                if (!pattern.test(this.firstLoginIsHavePassward.newPassward)) {
                    this.firstLoginIsHavePassward.pswLog_pattern_Flag = "block";
                } else {
                    this.firstLoginIsHavePassward.pswLog_pattern_Flag = "none";
                }
            } else {
                this.firstLoginIsHavePassward.newP_Log_none_Flag = "block";
            }
        },
        newPswValid_focus() {
            this.firstLoginIsHavePassward.newP_Log_none_Flag = "none";
            this.firstLoginIsHavePassward.pswLog_pattern_Flag = "none";
        },
        againNewPswValid() {
            console.log(this.firstLoginIsHavePassward.againNewPassward);
            if (this.firstLoginIsHavePassward.againNewPassward != "") {
                this.firstLoginIsHavePassward.againNewP_Log_none_Flag = "none";
                if (
                    this.firstLoginIsHavePassward.againNewPassward !=
                    this.firstLoginIsHavePassward.newPassward
                ) {
                    this.firstLoginIsHavePassward.pswLog_equality_Flag = "block";
                } else {
					this.firstLoginIsHavePassward.pswLog_equality_Flag = "none";
					this.firstLoginIsHavePassward.loading = false;
                }
            } else {
                this.firstLoginIsHavePassward.againNewP_Log_none_Flag = "block";
            }
        },
        againNewPswValid_focus() {
            this.firstLoginIsHavePassward.againNewP_Log_none_Flag = "none";
            this.firstLoginIsHavePassward.pswLog_equality_Flag = "none";
        },

        changePasswardBtn() {
        	let mobile = tools.getLocalStorage('mobile');
			console.log(this.firstLoginIsHavePassward.pswLog_equality_Flag);
			
			if(this.firstLoginIsHavePassward.pswLog_equality_Flag == 'block'){
                this.firstLoginIsHavePassward.loading = true;
			} 
			console.log(this.firstLoginIsHavePassward.newPassward, mobile);
			let params={
                'mobile':mobile,
                'password':this.firstLoginIsHavePassward.newPassward
            } 

			ModifyPassword(params).then(response => {
                console.log(response);
                if(response==1){
					//this.step=3;
                     this.$Message.info('修改密码成功');
                     tools.setLocalStorage("PwdType",1); 
                }
                else{
                    this.$Message.info('修改密码失败');
                }
            });
            // let params = {
            // 	mobile: this.personalMobile,
            // 	oldPassword: this.firstLoginIsHavePassward.oldPassward,
            // 	newPassword: this.firstLoginIsHavePassward.newPassward,
            // }
            // posModifyPasswordByPwd(params)
            // 	.then(response => {
            // 		console.log(response);
            //
            // 		if (response == "1") {
            // 			console.log("修改成功");
            // 		} else {
            // 			console.log("需求数据存入失败");
            // 		}
            // 	})
            // 	.catch(err => {
            // 		console.log("保存失败", err);
            // 		// this.$Message.info('需求数据存入接口异常');
            // 	});
		},
		changePswCancel() {
            console.log('取消');
        },
        // 跳转到定制游信息
        toDemandFun(){
            if(tools.getLocalStorage('isLogin')==1){
                this.$router.push('/demand/1');
            }
            else{
                this.$Message.info('请先登录系统');
            }
        }
    },
    mounted() {
        console.log('根组件：mounted');
        window.addEventListener("scroll", this.handleScroll);
        window.addEventListener('beforeunload',this.beforeunloadHandler);
        // this.supplierInit();
        new WOW().init();
    },
    destroyed () {
        window.removeEventListener("scroll", this.handleScroll);
        window.removeEventListener('beforeunload',this.beforeunloadHandler);
    },
    beforeCreate() {
        if(window.location.hash.indexOf('&')>0){
            this.orgId=window.location.hash.split("=")[1].split('&')[0];
        }
        else{
            this.orgId = window.location.hash.split("=")[1];
        }
        tools.setLocalStorage("orgId", this.orgId);
        console.log('根组件：beforeCreate')
    },
    created() {
        if(window.location.hash.indexOf('&')>0){
            this.orgId=window.location.hash.split("=")[1].split('&')[0];
        }
        else{
            this.orgId = window.location.hash.split("=")[1];
        }
        tools.setLocalStorage("orgId", this.orgId);
        console.log('根组件：created')
    },
    beforeMount() {
        console.log('根组件：beforeMount')
    },
    components: {
        supplierHeader,
        Footer,
        feedBack
    }
};
</script>
<style lang="scss">
.supplier {
    min-height: 100vh;
    position: relative;
    padding-bottom: 90px;
    .footer{
        position: absolute;
        bottom:0;
    }
     @keyframes myfirst
        {
        from {opacity: 0.9;}
        to {opacity: 1;}
        }
    @keyframes mywidth
    {
        from {width: 70px;height: 50px;}
        to {width: 80px;height: 60px;}
    }
    .maintenance{
        text-align: center;
        margin: 50px 0;
        >p{
            @include sc(18px,#333);
            margin-top: 30px;
        }
    }
    .home-bg{
        height: 663px;
        width:100%;
        background: url('../assets/images/banner.png') no-repeat center center;
        background-size:cover;
        padding-top: 169px;
        >h2{
            text-align: center;
            font-size: 53px;
            color:#fff;
            letter-spacing: 11px;
        }
        >div{
            text-align: center;
            margin-top: 100px;
            >form{
                display: inline-block;
            }
            .ivu-input-wrapper{
                width:430px;
                height: 50px;
                .ivu-input{
                    height: 50px;
                    @include sc(18px,#333);
                    &::placeholder{
                        @include sc(18px,#bcbcbc);
                        text-align: center;
                    }
                }
                .ivu-input-icon{
                    height: 50px;
                    line-height: 50px;
                }
            }
            >a{
                display: inline-block;
                vertical-align: top;
                height: 50px;
                width: 70px;
                line-height: 50px;
                background: #ffba00;
                @include sc(18px,#fff);
                margin-left:47px; 
                border-radius: 6px;
                border:none;
                &:hover{
                   background:#ffba06; 
                } 
            }
        }
    }
    .trip-content {
        width: 1180px;
        margin: auto;
        >a{
            display: inline-block;
            height: 1px;
            width: 100%;
        }
        .trip-main{
            font-size: 0;
            .trip-img{
                @include wh(457px,500px); 
                overflow: hidden;
                display: inline-block;
                >img{
                    display: inline-block;
                    @include wh(457px,500px);
                    transition: all 1s;
                    -moz-transition: all 1s; /* Firefox 4 */
                    -webkit-transition: all 1s; /* Safari 和 Chrome */
                    -o-transition: all 1s; /* Opera */
                    &:hover{
                        -moz-transform: scale(1.1); 
                        -o-transform: scale(1.1); 
                        -webkit-transform: scale(1.1); 
                        transform: scale(1.1); 
                    }
                }
            }
        }
        .list-product {
            width: calc(100% - 460px);
            display: inline-block;
            vertical-align: top;
            height: 510px;
            overflow: hidden;
            > li {
                list-style: none;
                width: 222px;
                float: left;
                margin-left: 18px;
                margin-bottom: 25px;
                > a {
                    display: inline-block;
                    width: 222px;
                    overflow: hidden;
                    .list-img{
                         @include wh(222px, 150px);
                         overflow: hidden;
                        >img{
                            @include wh(222px, 150px);
                            transition: all 1s;
                            -moz-transition: all 1s; /* Firefox 4 */
                            -webkit-transition: all 1s; /* Safari 和 Chrome */
                            -o-transition: all 1s; /* Opera */
                            &:hover{
                                -moz-transform: scale(1.1); 
                                -o-transform: scale(1.1); 
                                -webkit-transform: scale(1.1); 
                                transform: scale(1.1); 
                            }
                        }
                    }
                    .list-con{
                        padding: 0 7px;
                         > h2 {
                            @include sc(14px, #333);
                            position:relative;
                            line-height:25px;
                            height:50px;
                            overflow:hidden;
                            margin-top: 8px;
                            &::after {
                                content:"...";
                                font-weight:bold;
                                position:absolute;
                                bottom:0;
                                right:0;
                                z-index: 1000;
                                background: #fff url(http://newimg88.b0.upaiyun.com/newimg88/2014/09/ellipsis_bg.png) repeat-y;
                            }
                        }
                        .sale-price{
                            display: inline-block;
                            >p{
                                @include sc(20px,#ffba00);
                                &::after{
                                    content: '起';
                                    display: inline-block;
                                    font-size: 12px;
                                    color:#999;
                                    margin-left: 8px;
                                }
                            }
                        }
                    }
                }
                &:hover {
                    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);
                }
            }
        }
    }
    .trip-line {
        width: 1180px;
        > h1 {
            line-height: 25px;
            text-align: center;
            padding: 40px 0 35px 0;
            position: relative;
            >img{
               height: 25px;
               display: inline-block;
               vertical-align: top;
               margin-right: 28px;
            }
            @include sc(25px, #5b8cfe);
            >a{
                position: absolute;
                right:0;
                @include sc(16px,#666);
                >i{
                    display: inline-block;
                    vertical-align: middle;
                    @include wh(8px,15px);
                    background: url('../assets/images/tour-right.png') no-repeat;
                    background-size: 100%;
                    margin-left: 20px;
                }
            }
        }
    }
    /*特价促销开始*/
    .sales-promotion{
    	width: 1180px;
        margin: auto;
        font-size: 0;
        .promotion-title{
        	width: 1180px;
        	height: 80px;
        	border-bottom: 2px #e8002e solid;
        	font-size:22px;
        	letter-spacing: 2.6px;
			color: #e8002e;
			line-height: 100px;
        	.promotion-icon{
        		width: 22px;
        		height: 27px;
        		float: left;
        		margin-top: 36px;
        		margin-right: 26px;
        	}
        	.promotion-more{
        		float: right;
        		color: #666666;
        		font-size: 16px;
        		line-height: 100px;
        	}
        }
        .promotion-product{
        	width: 100%;
        	height: 367px;
        	margin-top: 18px;
        	li{
        		width: 279px;
        		height: 367px;
        		float: left;
        		margin-right: 21px;
        		box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);
        		background-color: #ffffff;
				border-radius: 4px;
				overflow: hidden;
        		.promotion-img{
        			width: 279px;
					height: 180px;
					border-radius: 4px 4px 0px 0px;
					img{
						width: 100%;
						height: 100%;
						transition: all 1s;
	                    -moz-transition: all 1s; /* Firefox 4 */
	                    -webkit-transition: all 1s; /* Safari 和 Chrome */
	                    -o-transition: all 1s; /* Opera */
	                    &:hover{
	                        -moz-transform: scale(1.1); 
	                        -o-transform: scale(1.1); 
	                        -webkit-transform: scale(1.1); 
	                        transform: scale(1.1); 
	                    }
					}
        		}
        		.promotion-con{
        			padding-top: 12px;
        			.promotion-tag{
        				font-size: 18px;
        				height: 50px;
						letter-spacing: 1.1px;
						color: #333333;
						margin-left: 6px;
						margin-right: 6px;
						position: relative;
						&::after {
                            content:"...";
                            font-weight:bold;
                            position:absolute;
                            bottom:0;
                            right:0;
                            z-index: 1000;
                            background: #fff url(http://newimg88.b0.upaiyun.com/newimg88/2014/09/ellipsis_bg.png) repeat-y;
                        }
        			}
        			.promotion-price{
        				padding-left: 18px;
        				margin-top: 20px;
        				height: 22px;
        				.price-sales{
	        				width: 40px;
	        				height: 22px;
	        				float: left;
	        				border-radius: 4px;
	        				letter-spacing: 0.7px;
							color: #fffefe;
							font-size: 12px;
							text-align: center;
							line-height: 22px;
	        				background-image: linear-gradient(113deg, 
				                #f17568 0%, 
				                #e8002e 100%), 
				            linear-gradient(
				                #ffffff, 
				                #ffffff);
	        			}
	        			.salesPrice{
	        				float: left;
	        				color: #fe0036;
	        				font-size: 22px;
	        				line-height: 22px;
	        				margin-left: 20px;
	        				i{
	        					font-size: 14px;
	        					margin-left: 5px;
	        				}
	        			}
        			}
        			
        			
        		}
        		.predetermine{
        				width: 254px;
        				height: 36px;
        				/*text-align: center;
        				line-height: 254px;
        				background-color: #e8002e;
        				font-size: 16px;
        				letter-spacing: 1px;
        				color: #fffefe;*/
        				display: block;
        				margin: 0 auto;
        				margin-top: 27px;
        				/*border-radius: 4px;*/
        			}
        	}
        	li:last-child{
        		margin-right: 0;
        	}
        }
    }
    /*特价促销结束*/
    .group-content {
        width: 1180px;
        margin: auto;
        font-size: 0;
    }
    .demand-content{
        margin-bottom: 100px;
        > h2{
            line-height: 25px;
            text-align: center;
            padding: 40px 0 35px 0;
            >img{
               height: 25px;
               display: inline-block;
               vertical-align: top;
               margin-right: 28px;
            }
            @include sc(25px, #5b8cfe);
        }
        >div{
            position: relative;
            @include wh(1180px,280px);
            margin: auto;
            cursor: pointer;
            overflow: hidden;
            >img{
                @include wh(1180px,280px);
                border-radius: 4px;
                transition: all 1s;
                -moz-transition: all 1s; /* Firefox 4 */
                -webkit-transition: all 1s; /* Safari 和 Chrome */
                -o-transition: all 1s; /* Opera */
                &:hover{
                    -moz-transform: scale(1.1); 
                    -o-transform: scale(1.1); 
                    -webkit-transform: scale(1.1); 
                    transform: scale(1.1); 
                }
            }
            >a{
                display: inline-block;
                position: absolute;
                @include wh(120px,44px);
                border-radius: 4px;
                background: #ffc833;
                left:160px;
                bottom:25px;
                @include sc(20px,#fff);
                text-align: center;
                line-height: 44px;
                opacity: 0.9;
                &:hover{
                    animation:myfirst 2s infinite;
                    -webkit-animation:myfirst 2s infinite;
                }
            }
        }
    }
    .box {
        position: fixed;
        width: 100vw;
        height: 100vh;
        left: 0;
        top: 0;
        z-index: 1000;
        background: rgba(0, 0, 0, 0.6);
        .set-password {
            margin: auto;
            width: 600px;
            background: #fff;
            border-radius: 10px;
            vertical-align: middle;
            margin-top: 25%;
            transform: translateY(-50%);
            text-align: center;
            padding: 75px 0 40px 0;
            position: relative;
            > h2 {
                margin-bottom: 40px;
                > i {
                    display: inline-block;
                    @include wh(26px, 26px);
                    background: url("../assets/images/tip.png") no-repeat;
                    background-size: 100%;
                    vertical-align: middle;
                    margin-right: 10px;
                }
                @include sc(18px, #317ef3);
            }
            > div {
                margin-bottom: 20px;
                > label {
                    display: inline-block;
                    @include sc(14px, #333);
                    width: 140px;
                    text-align: right;
                }
                > div {
                    display: inline-block;
                    > input {
                        @include wh(180px, 30px);
                        border: 1px solid #ddd;
                    }
                }
            }
            > p {
                margin-top: 60px;
                > a {
                    display: inline-block;
                    @include wh(220px, 50px);
                    background-image: linear-gradient(
                        0deg,
                        #005bac 0%,
                        #008871 50%,
                        #008c6b 55%,
                        #6fba2c 100%
                    );
                    border-radius: 10px;
                    @include sc(18px, #fff);
                    line-height: 50px;
                }
            }
            > a {
                display: inline-block;
                position: absolute;
                top: 0;
                right: 0;
                @include wh(40px, 40px);
                background: url("../assets/images/set-close.png") no-repeat
                    center;
                background-size: 20px 20px;
            }
        }
    }
    .anchor {
        width: 1180px;
        position: fixed;
        bottom:0;
        left: 50%;
        transform: translateX(-50%);
        > div {
            width: 60px;
            // @include wh(60px, 232px);

            // border-bottom: none;
            position: absolute;
            right: -60px;
            bottom: 400px;
            z-index: 1000;
            box-sizing: border-box;
            > a:not(.point-top) {
                width: 58px;
                display: inline-block;
                height: 60px;
                line-height: 60px;
                // padding:10px 0;
                text-align: center;
                background: #fff;
                @include sc(14px, #333);
                border-bottom: 1px solid #ddd;
                border-left: 1px solid #ddd;
                border-right: 1px solid #ddd;
                box-sizing: border-box;
                &.active {
                    @include sc(14px, #fff);
                    background-image: linear-gradient(36deg, #ffba00 0%,#fecd4b 50%, #fde093 100%), 
                                    linear-gradient(0deg, #005bac 0%, #008871 50%, #008c6b 55%, #6fba2c 100%);
                }
            }
            .point-top {
                display: inline-block;
                height: 58px;
                width: 58px;
                border-bottom: none;
                border: 1px solid #ddd;
                border-top: none;
                > i {
                    display: inline-block;
                    @include wh(58px, 58px);
                    background: url("../assets/images/anchor.png") no-repeat
                        center;
                    background-size: 18px 20px;
                }
            }
            > i {
                display: inline-block;
                @include wh(51px, 58px);
                position: absolute;
                top: -39px;
                right: -26px;
                z-index: -1;
                background: url("../assets/images/position.png") no-repeat;
                background-size: 100%;
            }
        }
    }
}
</style>
