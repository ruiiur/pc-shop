<!--这是搜索店铺页面-->
<template>
    <div class="search-store" @click="globalFun">
        <img src="../assets/images/zhuanmaidianguangchang.png" alt="">
        <div class="search-store-input">
            <input type="search" v-model.trim="keyWord" placeholder="请输入供应商名称" >
            <i></i>
            <ul class="store-list" v-if="storeList.length!=0" >
                <li class="esp"><p></p></li>
                <li @click.stop.prevent="toSupplierFun(store,index)" v-for="(store,index) in storeList" :class="supplierIndex==index?'active':''">{{store.TravelAgencyName}}<i v-if="supplierIndex==index"></i></li>
            </ul>
        </div>
        <!-- <div class="search-history">
            <a :href="'#/supplier?orgId='+supplier.orgId" v-for="(supplier,index) in suppliersList" v-if="isLogin==1">
               <img :src="supplier.picUrl" alt="">
               <p>{{supplier.keywords}}</p>
               <i @click.stop.prevent="delectSuppliers(supplier,index)"></i>
            </a>
            <a :href="'#/supplier?orgId='+supplier.OrgID" v-for="(supplier,index) in supplierObjList" v-if="isLogin==0">
               <img :src="supplier.Logo" alt="">
               <p>{{supplier.TravelAgencyName}}</p>
               <i @click.stop.prevent="delectSuppliersObj(index)"></i>
            </a>
        </div> -->
        <div class="line-type">
            <div>
                <label for="">线路类型：</label>
                <ul>
                    <li v-for="(line,index) in lineList" :class="index==lineTopIndex?'active':''" @click.stop.prevent="selectedLine(line,index)">{{line.pName}}</li>
                </ul>
                <a href="javascript:;" @click.stop.prevent="moreLineFun()"><i></i>更多</a>
                <div v-if="moreLine" @click.stop.prevent="moreLine=true">
                    <div class="search-input">
                        <input type="search" v-model.trim="lineKey" name="" id="" placeholder="请搜索线路类型"/><i></i>
                        <div class="search-line-box" v-if="lineSearchList.length!=0">
                            <p v-for="(searchLine,index) in lineSearchList">{{searchLine.pName}}</p>
                        </div>
                        <div class="search-line-box" v-if="lineSearchList.length==0&&noLine==true">
                            <p>暂无符合搜索内容的线路</p>
                        </div>
                    </div>
                    <p>支持中文/拼音/简拼输入</p>
                    <div class="search-main" v-if="lineSearchList.length==0&&noLine==false">
                        <ul>
                            <li :class="lineIndex==key?'active':''" v-for="(line,key) in allLineList" v-if="line.length!=0" @click.stop.prevent="lineTabFun(key)">{{key}}<i v-if="lineIndex==key"></i></li>
                        </ul>
                        <div v-for="(line,key) in allLineList" v-if="lineIndex==key&&line.length!=0">
                            <a href="javascript:;" v-for="linename in line" @click.stop.prevent="lineInnerFun(linename)">{{linename.Name}}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p class="search-line"></p>
        <div class="supplier-square">
            <p>出发地：</p>
            <ul>
                <li v-for="(site,index) in siteList" v-if="index<8" @click.stop.prevent="selectedSite(site,index)" :class="cityIndex==index?'active':''">{{site.SiteName}}</li>
                <li class="more-origins">
                    <div>
                        <a href="javascript:;" @click.stop.prevent="moreOriginsFun()">更多<i></i></a>
                        <div v-if="moreOrigins" @click.stop.prevent="moreOrigins=true">
                            <div class="search-input">
                                <input type="search" v-model.trim="siteKey" name="" id="" placeholder="请搜索线路类型"/><i></i>
                                <div class="search-site" v-if="siteSearchList.length!=0">
                                    <p v-for="(searchSite,index) in siteSearchList">{{searchSite.SiteName}}</p>
                                </div>
                                <div  class="search-site" v-if="siteSearchList.length==0&&noSite==true">
                                    <p>暂无符合搜索内容的站点</p>
                                </div>
                            </div>
                            <p>支持中文/拼音/简拼输入</p>
                            <div class="search-main" v-if="siteSearchList.length==0&&noSite==false">
                                <ul>
                                    <li :class="siteIndex==key?'active':''" v-for="(site,key) in allSiteList" v-if="site.length!=0" @click.stop.prevent="siteTabFun(key)">{{key}}<i v-if="siteIndex==key"></i></li>
                                </ul>
                                <div v-for="(site,key) in allSiteList" v-if="siteIndex==key&&site.length!=0">
                                    <a href="javascript:;" v-for="city in site" @click.stop.prevent="siteInnerFun(city)">{{city.Name}}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="supplier-list" v-if="suppliersList.length!=0">
                <!-- :href="'#/supplier?orgId='+supp.OrgID" -->
                <a v-for="(supplier,index) in suppliersList" @click.stop.prevent="toSupplier(supplier.Extension)">
                    <img v-if="supplier.Extension.Logo!=null&&supplier.Extension.Logo!=''" :src="supplier.Extension.Logo" alt="">
                    <img v-if="supplier.Extension.Logo==null||supplier.Extension.Logo==''" src="../assets/images/default-logo.png" alt="">
                    <p>{{supplier.Extension.TravelAgencyName}}</p>
                    <h2>在售数量：<span>{{supplier.ProCount}}</span></h2>
                    <!-- <i @click.stop.prevent="delectSuppliers(supp,index)"></i> -->
                </a>
            </div>
            <div class="supplier-none" v-if="suppliersList.length==0&&noData==true&&load==false">
                <img src="../assets/images/zanwuneirong.png" alt="">
            </div>
            <div class="load" v-if="load==true">
                <img src="../assets/images/timg.gif" alt="">
            </div>
        </div>
    </div>
</template>
<script>
import tools from "../common/tools";
import {
  searchStore,
//   saveSupplier,
//   delSuppliers,
//   searchSuppliers,
  erpLogin,
  GetTravelAgencyInfo,
  GetOmSiteInfoAll,
  GetOmSiteInfoSeach,
  GetCommParameterInfoAll,
  GetCommParameterInfoSeach
} from "../services/index";
export default {
    data(){
        return{
            keyWord:'',//搜索内容
            storeList:[],//搜索结果
            supplierIndex:-1,//
            suppliersList:[],//供应商列表页
            supplierObjList:[],//本地保存的供应商列表
            isLogin:'',//是否登陆
            cityIndex:0,//
            // lineType:[
            //     {'line':'海南线'},
            //     {'line':'厦门线'},
            //     {'line':'桂林线'},
            //     {'line':'西北线'},
            //     {'line':'内蒙线'},
            //     {'line':'华东线'},
            //     {'line':'华北线'},
            // ],//线路类型
            // siteList:[],//站点列表
            moreOrigins:false,//更多出发地搜索框是否显示
            moreLine:false,//更多线路搜索框是否显示
            allSiteList:[],//所有站点列表
            allLineList:[],//所有站点列表
            siteIndex:'ABCD',
            lineIndex:'ABCD',
            siteKey:'',//站点搜索关键词
            lineKey:'',//线路搜索关键词
            userType:'',//用户类型
            siteList:[],//供应商站点
            lineList:[],//供应商线路
            siteSearchList:[],//站点搜索列表
            lineSearchList:[],//线路搜索列表
            lineTopIndex:0,//默认全部
            // siteLeftIndex:0,//默认全部
            siteId:'',//站点id
            lineId:'',//线路id
            noData:false,//是否有供应商
            load:false,//加载中
            noSite:false,//没有搜索的站点
            noLine:false,//没有搜索的线路
        }
    },
    methods: {
        // 全局事件
        globalFun(){
            this.moreOrigins=false;
            this.moreLine=false;
        },
        // 点击查找更多出发地
        moreOriginsFun(){
            this.moreOrigins=true;
            this.moreLine=false;
        },
        // 更多线路
        moreLineFun(){
            this.moreLine=true;
            this.moreOrigins=false;
        },
        // 切换站点选择
        siteTabFun(key){
            this.siteIndex=key;
        },
        // 切换线路选择
        lineTabFun(key){
            this.lineIndex=key;
        },
        // 外面选择线路
        selectedLine(obj,index){
            this.lineTopIndex=index;
            this.lineId=obj.ID;
            this.searchSupplier();
            this.moreLine=false;
            this.moreOrigins=false;
        },
        // 外面站点选择
        selectedSite (obj,index){
            this.cityIndex=index;
            this.siteId=obj.ID;
            this.searchSupplier();
            this.moreLine=false;
            this.moreOrigins=false;
            if(index!=0){
                tools.setSessionStorage("siteName",obj.SiteName);
                tools.setSessionStorage("siteid",obj.ID);
            }
        },
        // 里面线路选择
        lineInnerFun(obj){
            this.lineId=obj.ID;
            this.searchSupplier();
            this.moreLine=false;
            for(let i=0;i<8;i++){
                if(obj.ID==this.lineList[i].ID){
                    this.lineTopIndex=i;
                }
            }
        },
        // 里面站点选择
        siteInnerFun(obj){
            this.siteId=obj.ID;
            tools.setSessionStorage("siteName",obj.Name);
            tools.setSessionStorage("siteid",obj.ID);
            this.searchSupplier();
            this.moreOrigins=false;
            console.log(this.siteList,'this.siteList');
            for(let i=0;i<9;i++){
                if(obj.ID==this.siteList[i].ID){
                    this.cityIndex=i;
                }
            }
        },
        // 去供应商首页
        toSupplier(supp){
            tools.setLocalStorage("orgId",supp.OrgID);
            // tools.setSessionStorage("siteName",'');
            // tools.setSessionStorage("siteid",'');
            this.$router.push('/supplier?orgId='+supp.OrgID);
        },
        // 初始化页面
        searchStoreInit(){
            console.log('href',window.location.href);
            tools.setSessionStorage("siteName",'');
            tools.setSessionStorage("siteid",'');
            this.userType= tools.getLocalStorage("userType")==1?1:2;
            this.orgId= tools.getSessionStorage('uOrgID')?tools.getSessionStorage('uOrgID'):'';
            if(window.location.href.indexOf('userid')>0){
                 let params = window.location.href.split("?")[1];
                console.log(params);
                erpLogin(params).then(response => {
                    console.log(response);
                    if (response.meta.success == true) {
                        console.log("ERP登录成功");
                        this.$store.commit("setLogin", "1");
                        if(response.code==0){
                            tools.setLocalStorage("mobile",response.data.userName);
                            tools.setLocalStorage("userType", 1);
                            tools.setSessionStorage('deptName',response.data.deptName);
                            tools.setSessionStorage('userName',response.data.userName);
                            tools.setSessionStorage('uOrgID',response.data.orgID);
                            tools.setSessionStorage('deptId',response.data.deptID);
                            tools.setSessionStorage('uOrgName',response.data.orgName);
                            tools.setSessionStorage('userId',response.data.userID);
                            tools.setSessionStorage('domain',response.data.domain);
                            // tools.setLocalStorage("isLogin", 1);
                            //  searchSuppliers().then((response)=>{
                            //     console.log(response);
                            //     if(response.meta.success==true){
                            //         console.log('搜索供应商接口成功');
                            //         this.suppliersList=response.data;
                            //     }
                            //     else{
                            //         console.log('搜索供应商接口失败');
                            //     }
                            // }).catch((err)=>{
                            //     console.log('搜索供应商接口异常',err);
                            // }); 
                            this.searchSupplier();
                        }
                        else if(response.code==-1){
                            tools.setLocalStorage("tip", response.data.msg);
                            tools.setLocalStorage("tipUrl", response.data.url);
                            this.$router.push('/blank');
                        }
                    } else {
                        console.log("ERP登录成功");
                    }
                });
            }
            else{
                 //判断是否登陆
                // if(tools.getLocalStorage('isLogin')==1){
                //     this.isLogin=1;
                // }
                // else {
                //     this.isLogin=0;
                // }
                //  搜索历史记录
                // searchSuppliers().then((response)=>{
                //     console.log(response);
                //     if(response.meta.success==true){
                //         console.log('搜索供应商接口成功');
                //         this.suppliersList=response.data;
                //     }
                //     else{
                //         console.log('搜索供应商接口失败');
                //     }
                // }).catch((err)=>{
                //     console.log('搜索供应商接口异常',err);
                // });
                this.searchSupplier(); 
                // GetTravelAgencyInfo().then((response)=>{
                //     console.log(response);
                //     console.log('专卖店广场接口成功');
                //     this.suppliersList=response;
                // }).catch((err)=>{
                //     console.log('专卖店广场接口异常',err);
                // }); 
            }
            // 获取本地保存的
            // console.log('222',tools.getLocalStorage('supplierObjList'));
            if(tools.getLocalStorage('supplierObjList')!=null && tools.getLocalStorage('supplierObjList')!=undefined && tools.getLocalStorage('supplierObjList')!='null'){
                // alert('222');
                this.supplierObjList=JSON.parse(tools.getLocalStorage('supplierObjList'));
            }
            
            // 所有站点
            GetOmSiteInfoAll().then(response => {
                console.log(response);
                console.log("广场所有站点获取成功");
                this.allSiteList=response;
			})
			.catch(err => {
			    console.log("广场所有站点获取异常", err);
            });


            // 所有线路
            GetCommParameterInfoAll().then(response => {
                console.log(response);
                console.log("广场所有线路获取成功");
                this.allLineList=response;
			})
			.catch(err => {
			    console.log("广场所有线路获取异常", err);
            });
            
            // 搜索供应商站点方法
            let params={
                'type':this.userType,
                'orgId':this.orgId,
                'searchStr':''
            }
            GetOmSiteInfoSeach(params).then(response => {
                console.log(response);
                console.log("广场供应商站点获取成功");
                this.siteList=response;
                this.siteList.unshift({
                    'ID':'',
                    'SiteName':'全部'
                })
			})
			.catch(err => {
			    console.log("广场供应商站点获取异常", err);
            });
            

            // 搜索经营线路方法
            let paramsLine={
                'searchStr':''
            }
            GetCommParameterInfoSeach(paramsLine).then(response => {
                console.log(response);
                console.log("广场供应商经营线路获取成功");
                this.lineList=response;
                this.lineList.unshift({
                    'ID':'',
                    'pName':'全部'
                })
			})
			.catch(err => {
			    console.log("广场供应商经营线路获取异常", err);
			});
        },
        // 查询供应商店铺
        searchSupplier(){
            this.load=true;
            this.suppliersList=[];
            let paramsAgency={
                'siteId':this.siteId,
                'parameterId':this.lineId,
            }
            GetTravelAgencyInfo(paramsAgency).then((response)=>{
                this.load=false;
                console.log(response);
                console.log('专卖店广场接口成功');
                this.suppliersList=response;
                if(this.suppliersList.length==0){
                    this.noData=true;
                }
            }).catch((err)=>{
                console.log('专卖店广场接口异常',err);
            }); 
        },
        // 保存搜索结果
        toSupplierFun(obj,index){
            this.supplierIndex=index;
            console.log('obj',obj);
            console.log(this.isLogin);
            // tools.setSessionStorage("siteName",'');
            tools.setLocalStorage("orgId",obj.OrgID);
            this.$router.push('/supplier?orgId='+obj.OrgID);
            // console.log('isLogin',tools.getLocalStorage('isLogin'));
            // if(this.isLogin==0){
            //     // alert('1');
            //     // console.log(this.supplierObjList);
            //     this.supplierObjList.push(obj);
            //     console.log('JSon',JSON.stringify(this.supplierObjList));
            //     tools.setLocalStorage('supplierObjList',JSON.stringify(this.supplierObjList));
            //     this.$router.push('/supplier?orgId='+obj.OrgID);
            // }
            // else{
            //      let params={
            //         'keywords':obj.TravelAgencyName,
            //         'picUrl':obj.BussinessLicencePath,
            //         'orgId':obj.OrgID
            //     }
            //     saveSupplier(params).then((response)=>{
            //         console.log(response);
            //         if(response.meta.success==true){
            //             console.log('保存供应商成功');
            //             this.$router.push('/supplier?orgId='+obj.OrgID);
            //         }  
            //     }).catch((err)=>{
            //         console.log('搜索商铺接口异常报错',err);
            //     });
            // }
        },
        // 删除供应商
        // delectSuppliers(obj,index){
        //     let params={
        //         'keywords':obj.keywords
        //     }
        //      delSuppliers(params).then((response)=>{
        //         console.log(response);
        //         if(response.meta.success==true){
        //             console.log('删除供应商接口成功');
        //             this.suppliersList.splice(index,1);
        //         }
        //         else{
        //             console.log('删除供应商接口失败');
        //         }
        //     }).catch((err)=>{
        //         console.log('删除供应商接口异常',err);
        //     });
        // },

        // 删除本地的供应商
        // delectSuppliersObj(index){
        //     this.supplierObjList.splice(index,1);
        //     tools.setLocalStorage('supplierObjList',JSON.stringify(this.supplierObjList));
        // }
    },
    created(){
        this.searchStoreInit();
    },
    watch:{
        keyWord:async function (){
            this.storeList=[];
            if(this.keyWord!==''){
                let params={
                    'key':this.keyWord,
                    'pagesize':10
                }
                await searchStore(params).then((response)=>{
                    console.log(response);
                    console.log('搜索商铺接口成功');
                    if(response.length!=0){
                        this.storeList=response;
                    }
                }).catch((err)=>{
                    console.log('搜索商铺接口异常报错',err);
                });
            }
        },
        siteKey:async function (){
            this.siteSearchList=[];
            if(this.siteKey!==''){
                let params={
                    'type':this.userType,
                    'orgId':this.orgId,
                    'searchStr':this.siteKey
                }
                await GetOmSiteInfoSeach(params).then((response)=>{
                   console.log(response);
                    console.log("广场供应商站点获取成功");
                    this.siteSearchList=response;
                    if(this.siteSearchList.length==0){
                        this.noSite=true;
                    }
                    else{
                        this.noSite=false;
                    }
                }).catch((err)=>{
                    console.log('广场供应商站点获取异常',err);
                });
            }
        },
        lineKey:async function (){
            this.lineSearchList=[];
            if(this.lineKey!==''){
                let params={
                    'searchStr':this.lineKey
                }
                await GetCommParameterInfoSeach(params).then((response)=>{
                   console.log(response);
                    console.log("广场供应商经营线路获取成功");
                    this.lineSearchList=response;
                    if(this.lineSearchList.length==0){
                        this.noLine=true;
                    }
                    else{
                        this.noLine=false;
                    }
                }).catch((err)=>{
                    console.log('广场供应商经营线路获取异常',err);
                });
            }
        }
    }
}
</script>

<style lang="scss">
.search-store{
    min-height: 100vh;
    background: url('../assets/images/beijing-search.png') no-repeat center;
    background-size: cover;
    padding-top: 70px;
    // box-sizing: border-box;
    >img{
        // width:418px;
        @include wh(649px,61px);
        margin: auto;
        display: block;  
    }
    .store-list{
        width: 940px;
        border-radius: 0 0 10px 10px;
        box-shadow: 0px 15px 20px 0px rgba(0, 0, 0, 0.2);
        background: #fff;
        padding: 10px 0;
        position: absolute;
        top:50px;
        z-index: 100;
        max-height: 228px !important;
        overflow: auto;
        >li:not(.esp){
            @include sc(18px,#333);
            background: #fff;
            padding: 0 50px 0 20px;
            height: 38px;
            line-height: 38px;
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
            >p{
                height: 1px;
                background: #ddd;
                margin: 0 50px 17px 20px;
            }
        }
    }
    // .search-history{
    //     width: 960px;
    //     margin: auto;
    //     font-size: 0;
    //     >a{
    //         display: inline-block;
    //         vertical-align: top;
    //         @include wh(220px,140px);
    //         padding: 20px 30px;
    //         box-sizing: border-box;
    //         background: #fff;
    //         border-radius: 10px;
    //         opacity: 0.8;
    //         position: relative;
    //         margin-right: 20px;
    //         margin-bottom: 20px;
    //         // &:nth-child(4),&:nth-child(8){
    //         //     margin-right: 0;
    //         // }
    //         >img{
    //             display: inline-block;
    //             @include wh(160px,48px);
    //             margin-bottom: 10px;
    //         }
    //         >p{
    //            @include sc(14px,#333); 
    //            text-align: center;
    //         }
    //         >i{
    //             position: absolute;
    //             display: inline-block;
    //             @include wh(40px,40px);
    //             background: url('../assets/images/delect.png') no-repeat;
    //             background-size:28px 28px;
    //             top:-13px;
    //             right:-23px;
    //         }
    //     }
    // }
    .line-type{
       margin-top: 30px;
       margin-bottom: 10px;
       >div{
            width: 1040px;
            margin: auto;
            position: relative;
            >label{
                @include sc(26px,#fff);
                display: inline-block;
                vertical-align: middle;
            }
            >ul{
                display: inline-block;
                vertical-align: middle;
                >li{
                    float: left;
                    @include wh(100px,48px);
                    @include sc(22px,#fff);
                    border: 1px solid transparent;
                    border-radius: 6px;
                    line-height: 46px;
                    text-align: center;
                    &.active{
                        border:1px solid #ffba00;
                        @include sc(22px,#ffba00);
                    }
                }
            }
            >a{
                display: inline-block;
                border:1px solid #fff;
                border-radius: 4px;
                width: 78px;
                height: 32px;
                vertical-align: middle;
                @include sc(16px,#fff);
                line-height: 30px;
                margin-left: 20px;
                text-align: center;
                >i{
                    display: inline-block;
                    background: url('../assets/images/xiala.png') no-repeat;
                    background-size: 100%;
                    width: 14px;
                    height: 7px;
                    vertical-align: top;
                    margin-top: 12px;
                    margin-right: 5px;
                }
            }
            >div{
                position: absolute;
                right: 5px;
                width: 538px;
                min-height: 317px;
                padding: 25px 0 10px;
                background: #fff;
                z-index: 999;
                >p{
                    @include sc(14px,#7d7d7d); 
                    margin-top: 10px;
                    padding-left: 20px;
                }
               .search-input{
                   position: relative;
                   padding-left: 20px;
                   padding-right: 20px;
                    >input{
                        @include wh(488px,34px); 
                        border:1px solid #e1e1e1;
                        padding-left: 15px;
                        &::-moz-placeholder{
                            @include sc(14px,#7d7d7d);
                        }
                    }
                    >i{
                        position: absolute;
                        display: inline-block;
                        @include wh(20px,20px);
                        background: url('../assets/images/search-line.png') no-repeat;
                        background-size: 100%;
                        top:8px;
                        right: 40px;
                    }
                    .search-line-box{
                        position: absolute;
                        top:40px;
                        width: 488px;
                        z-index: 10000;
                        border:1px solid #e1e1e1;
                        >p{
                            color: #333;
                            font-size: 14px;
                            line-height: 30px;
                            height: 30px;
                            background: #fff;
                            padding-left: 13px;
                            &:hover{
                                background: #ffba00;
                                color:#fff;
                            }
                        }
                    }
                }
                .search-main{
                    >ul{
                        display: block;
                        height: 32px;
                        border-bottom:2px solid #e1e1e1;
                        margin-top: 5px;
                        font-size:0;
                        margin-left: 20px;
                        margin-right: 20px;
                        >li{
                            float: left;
                            @include sc(14px,#333);
                            // padding-bottom: 15px;
                            padding: 0 15px 9px;
                            position: relative;
                            &.active{
                                @include sc(14px,#ffba00);
                                border-bottom: 2px solid #ffba00;
                            }
                            >i{
                                display: inline-block;
                                width:0; 
                                height:0; 
                                border-left:6px solid transparent;
                                border-right:6px solid transparent;
                                border-top:6px solid #ffba00;
                                position: absolute;
                                bottom:-7px;
                                left: 50%;
                                transform: translateX(-50%);
                            }
                        }
                    }
                    >div{
                        font-size: 0;
                        >a{
                            @include sc(14px,#333);
                            width: 16.6%;
                            display: inline-block;
                            text-align: center;
                            margin-top: 15px;
                        }
                    }
                }
            }
        }
    }
    .search-line{
        width: 1094px;
        height: 2px;
        background: #fff;
        opacity: .6;
        margin: auto;
    }
    .supplier-square{
        width:1125px;
        margin: 10px auto 0px;
        padding-bottom: 70px;
        >p{
            @include sc(26px,#fff);
            padding-left: 40px;
        }
        >ul{
            display: inline-block;
            vertical-align: top;
            width: 220px;
            padding-left:47px;
            box-sizing: border-box; 
            // max-height: 480px;
            // overflow: auto;
            // padding-top: 10px;
            // &::-webkit-scrollbar {display:none}
            &::-webkit-scrollbar {display:none}
            >li:not(.more-origins){
               &:before{
                   content:'';
                   display: inline-block;
                   @include wh(14px,14px);
                   border:1px solid #fff;
                   background: transparent;
                   border-radius: 50%;
                   margin-right: 16px;
               } 
               @include sc(26px,#fff);
               margin-bottom: 20px;
               cursor: pointer;
               &.active{
                   @include sc(30px,#1caf9a);
                   &:before{
                        border:1px solid #1caf9a;
                        background: #1caf9a;                      
                    } 
               }
            }
            .more-origins{
                >div{
                    position: relative;
                    >a{
                        display: inline-block;
                        @include wh(78px,32px);
                        line-height: 30px;
                        text-align: center;
                        @include sc(16px,#fff);
                        border:1px solid #fff;
                        border-radius: 4px;
                        >i{
                            display: inline-block;
                            @include wh(7px,14px);
                            background: url('../assets/images/youla.png') no-repeat;
                            background-size: 100%;
                            vertical-align: top;
                            margin-left: 8px;
                            margin-top: 8px;
                        }
                    }
                     >div{
                        position: absolute;
                        left: 85px;
                        bottom: 0;
                        width: 538px;
                        min-height: 317px;
                        padding: 25px 0 10px;
                        background: #fff;
                        z-index: 999;
                        >p{
                            @include sc(14px,#7d7d7d); 
                            margin-top: 10px;
                            padding-left: 20px;
                        }
                        .search-input{
                            position: relative;
                            padding-left: 20px;
                            padding-right: 20px;
                                >input{
                                    @include wh(488px,34px); 
                                    border:1px solid #e1e1e1;
                                    padding-left: 15px;
                                    &::-moz-placeholder{
                                        @include sc(14px,#7d7d7d);
                                    }
                                }
                                >i{
                                    position: absolute;
                                    display: inline-block;
                                    @include wh(20px,20px);
                                    background: url('../assets/images/search-line.png') no-repeat;
                                    background-size: 100%;
                                    top:8px;
                                    right: 40px;
                                }
                                .search-site{
                                    position: absolute;
                                    top:40px;
                                    width: 488px;
                                    z-index: 1000;
                                    border:1px solid #e1e1e1;
                                    >p{
                                        color: #333;
                                        font-size: 14px;
                                        line-height: 30px;
                                        height: 30px;
                                        background: #fff;
                                        padding-left: 13px;
                                        &:hover{
                                            background: #ffba00;
                                            color:#fff;
                                        }
                                    }
                                }
                            }
                        .search-main{
                            >ul{
                                display: block;
                                height: 32px;
                                border-bottom:2px solid #e1e1e1;
                                margin-top: 5px;
                                font-size:0;
                                margin-left: 20px;
                                margin-right: 20px;
                                >li{
                                    float: left;
                                    @include sc(14px,#333);
                                    // padding-bottom: 15px;
                                    padding: 0 15px 9px;
                                    position: relative;
                                    &.active{
                                        @include sc(14px,#ffba00);
                                        border-bottom: 2px solid #ffba00;
                                    }
                                    >i{
                                        display: inline-block;
                                        width:0; 
                                        height:0; 
                                        border-left:6px solid transparent;
                                        border-right:6px solid transparent;
                                        border-top:6px solid #ffba00;
                                        position: absolute;
                                        bottom:-7px;
                                        left: 50%;
                                        transform: translateX(-50%);
                                    }
                                }
                            }
                            >div{
                                font-size: 0;
                                >a{
                                    @include sc(14px,#333);
                                    width: 16.6%;
                                    display: inline-block;
                                    text-align: center;
                                    margin-top: 15px;
                                }
                            }
                        }
                    }
                }
            }
        }
        .supplier-list{
            display: inline-block;
            width:calc(100% - 225px);
            max-height: 480px;
            overflow: auto;
            &::-webkit-scrollbar {display:none}
            margin-top: 20px;
            // padding-top: 15px;
             >a{
                display: inline-block;
                vertical-align: top;
                @include wh(200px,140px);
                padding:10px 30px 20px 30px;
                box-sizing: border-box;
                background: #fff;
                border-radius: 10px;
                opacity: 0.8;
                position: relative;
                margin-right: 20px;
                margin-bottom: 28px;
                // &:nth-child(4),&:nth-child(8){
                //     margin-right: 0;
                // }
                >img{
                    display: inline-block;
                    @include wh(140px,48px);
                    margin-bottom: 10px;
                }
                >p{
                    @include sc(14px,#333); 
                    text-align: center;
                    line-height: 17px;
                }
                >h2{
                    position: absolute;
                    @include sc(12px,#7d7d7d); 
                    left:9px;
                    bottom: 10px;
                    >span{
                        @include sc(14px,#1caf9a);
                    }
                }
                >i{
                    position: absolute;
                    display: inline-block;
                    @include wh(40px,40px);
                    background: url('../assets/images/delect.png') no-repeat;
                    background-size:28px 28px;
                    top:-13px;
                    right:-23px;
                }
            }
        }
        .supplier-none,.load{
            display: inline-block;
            width:calc(100% - 225px);
            max-height: 480px;
            text-align: center;
            >img{
                margin-top: 100px;
            }
        }
    }
    .search-store-input{
        width: 940px;
        height: 60px;
        background-color: #ffffff;
        box-shadow: 0px 4px 21px 0px rgba(0, 0, 0, 0.4);
        border-radius: 10px;
        // margin: auto;
        margin: 60px auto 0;
        position: relative;
        >input{
            width: 940px;
            height: 60px;
            border-radius: 10px;
            line-height: 60px;
            border:none;
            padding-left: 20px;
            box-sizing: border-box;
            outline: none;
            @include sc(18px,#18191a);
            &::placeholder{
                @include sc(18px,#999);
            }
        }
        >i{
            position: absolute;
            display: inline-block;
            cursor: pointer;
            @include wh(28px,28px);
            background: url('../assets/images/search-store.png') no-repeat;
            background-size:100%;
            top:15px;
            right:20px;
        }
    }
}
</style>

