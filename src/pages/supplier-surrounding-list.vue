<!--这是供应商周边游列表页面-->
<template>
    <div class="supplier-surrounding-list-page" @click="globalFun">
       <div class="list-header">
           <!-- 供应商导航引入 -->
          <supplierHeader :indexPlan="indexPlan" :without="without" @select-type="navIndex" :isHide="isHide" @global="globalFunT" :keyWords="keyWords" @refreshList="surroundingInit"  @search="searchListFun(0)"></supplierHeader>
          <div class="list-condition-area">
            <p>您当前所在位置：<a :href="'#/supplier?orgId=' + orgId">首页 > </a><span>周边短线</span>
            </p>
               <ul>
                   <li v-if="false">
                       <label for="">推荐主题：</label>
                       <a href="javascript:;" :class="themeIndex==-1?'active':''" @click.stop.prevent="subjectEmpty()">不限</a>
                       <div class="supplier-content">
                           <a href="javascript:;" v-for="(theme,index) in themeList" @click.stop.prevent="subjectSearch(theme,index)" :class="themeIndex==index?'active':''">{{theme.subject}}</a>
                       </div>
                   </li>
                   <li>
                        <label for="">目的地：</label>
                        <a href="javascript:;" :class="destinationIndex==-1?'active':''" @click.stop.prevent="destinationEmpty()">不限</a>
                        <div class="supplier-content">
                           <a href="javascript:;" v-for="(destination,index) in destinationList" @click.stop.prevent="destinationProvinceSelect(destination,index)" :class="destinationIndex==index?'active':''">{{destination.destination.cityName}}
                              <i v-if="destinationIndex==index"></i>
                           </a>
                           <!-- <a href="javascript:;" v-for="(destination,index) in destinationList" @click.stop.prevent="destinationProvinceSelect(index)" :class="destinationIndex==index?'active':''">{{destination.destination.cityName}}
                              <i v-if="destinationIndex==index"></i>
                           </a> -->
                        </div>
                        <p class="destination-city" v-if="destinationIndex!=-1">
                            <a href="javascript:;" v-for="(city,index) in destinationList[destinationIndex].citys" v-if="index<numDestination" @click.stop.prevent="destinationSearch(city,index)" :class="destinationSelectIndex==index?'active':''">{{city.destname}}</a>
                            <a href="javascript:;" v-if="destinationList[destinationIndex].citys.length>13&&numDestination<destinationList[destinationIndex].citys.length" @click="numDestination=destinationList[destinationIndex].citys.length+1" class="departure-more">更多</a>
                            <a href="javascript:;" v-if="destinationList[destinationIndex].citys.length>13&&numDestination>destinationList[destinationIndex].citys.length" @click="numDestination=13" class="departure-more">收起</a>
                        </p>
                   </li>
                   <li>
                       <label for="">行程天数：</label>
                       <a href="javascript:;" :class="tripDaysSelected.length==0?'active':''" @click.stop.prevent="tripDayEmpty()">不限</a>
                       <div>
                           <a href="javascript:;" v-for="(days,index) in tripDays" @click="tripDaySearch(days,index)" :class="days.selected==true?'active':''">{{days.name}}天</a>
                       </div>
                   </li>
                   <li>
                       <label for="">出发城市：</label>
                       <a href="javascript:;" :class="departureIndex==-1?'active':''" @click.stop.prevent="departureEmpty()">不限</a>
                        <!-- <div>
                           <a href="javascript:;" v-for="(city,index) in departureList" @click.stop.prevent="departureSearch(city,index)" :class="departureIndex==index?'active':''">{{city.depname}}</a>
                       </div> -->
                        <div class="supplier-content">
                            <a href="javascript:;" v-for="(val,key,index) in departureList" @click="departureIndex=index;departureSelectIndex=-1" :class="departureIndex==index?'active':''">{{key}}
                            </a>
                        </div>
                        <p class="departure-city" v-for="(val,key,index) in departureList" v-if="departureIndex==index&&val.length!=0">
                            <a href="javascript:;" v-for="index in val.length" v-if="index<numDeparture" @click.stop.prevent="departureSearch(val,index)" :class="departureSelectIndex==index?'active':''">{{val[index-1]}}</a>
                            <a href="javascript:;" v-if="val.length>13&&numDeparture<val.length" @click="numDeparture=val.length+1" class="departure-more">更多</a>
                            <a href="javascript:;" v-if="val.length>13&&numDeparture>val.length" @click="numDeparture=13" class="departure-more">收起</a>
                        </p>
                        <p class="departure-city" v-for="(val,key,index) in departureList" v-if="departureIndex==index&&val.length==0">暂无出发城市</p>
                   </li>
                   <li>
                        <label for="">产品类型：</label>
                        <a href="javascript:;" :class="productIndex==-1?'active':''" @click.stop.prevent="productEmpty()">不限</a>
                        <div>
                            <!-- productIndex=index -->
                           <a href="javascript:;" v-for="(pro,index) in productType" @click.stop.prevent="productTypeSearch(pro,index)" :class="productIndex==index?'active':''">{{pro.producttype}}</a>
                        </div>
                   </li>
                    <li>
                        <label for="" class="esp">出团日期：</label>
                        <a class="esp" href="javascript:;" :class="tourMouth.length==0?'active':''" @click.stop.prevent="tourMouthEmpty()">不限</a>
                        <div>
                           <a href="javascript:;" v-for="(mass,index) in massDate"  @click="tourMouthSearch(mass,index)" :class="mass.selected==true?'active':''">{{mass.tourMonth}}月</a>
                        </div>
                        <div class="data-picker">
                           <DatePicker format="yyyy/MM/dd" type="daterange" placeholder="选择出团日期"  @on-change="dateSelected"></DatePicker>
                            <!-- <DatePicker type="date" format="yyyy/MM/dd" placeholder="选择开始日期" style="width: 200px" v-model="startTime" @on-change="dateStartChange"></DatePicker>
                           至
                           <DatePicker type="date" format="yyyy/MM/dd" placeholder="选择结束日期" style="width: 200px" v-model="endTime" @on-change="dateEndChange"></DatePicker> -->
                        </div>
                        <button @click="dateSearch()">确认</button>
                   </li>
                    <!-- <li>
                        <label for="">供应商：</label>
                        <a href="javascript:;" :class="supplierIdList.length==0?'active':''" @click.stop.prevent="supplierEmpty()">不限</a>
                        <div class="supplier-content">
                           <a href="javascript:;" v-for="(supplier,index) in supplierList" @click="supplierSearch(supplier,index)" :class="supplier.selected==true?'active':''">{{supplier.suppliername}}</a>
                       </div>
                   </li> -->
                   <li>
                        <label for="">产品标签：</label>
                        <a href="javascript:;" :class="productTagsSelected.length==0?'active':''" @click.stop.prevent="productTagsEmpty()">不限</a>
                        <div class="supplier-content">
                           <a href="javascript:;" v-for="(pro,index) in productTagsList" @click="productTagsSearch(pro,index)" :class="pro.selected==true?'active':''">{{pro.labelname}}</a>
                       </div>
                   </li>
                    <li>
                        <label for="">类型：</label>
                        <a href="javascript:;" :class="saleIndex==-1?'active':''" @click.stop.prevent="saleTypeEmpty()">不限</a>
                        <div>
                           <a href="javascript:;" v-for="(sale,index) in saleTypes"  @click.stop.prevent="saleTypeSearch(sale,index)" :class="saleIndex==index?'active':''">{{sale.ways}}</a>
                       </div>
                   </li>
               </ul>
           </div>
       </div>
       <div class="list-content">
          <div class="list-search-content">
            <ul>
                <li v-for="(search,index) in searchConditions" :class="searchIndex==index?'active':''" @click.stop.prevent="orderByTypeSearch(index)">{{search.name}}<i></i></li>
                <li :class="searchIndex%2==0&&orderDirection=='DESC'?'active':''" @click.stop.prevent="orderByPriceSearch()">价格<i></i></li>
            </ul>
            <div class="search-price">
              <p>价格区间</p>
              <input type="number" v-model="lowPrice" @blur="checkLowPrice(lowPrice)">
              <span>至</span>
              <input type="number"  v-model="highPrice" @blur="checkHighPrice(highPrice)">
            </div>
            <!-- <div class="search-date">
                <span>天数</span>
                <input type="number">
            </div> -->
            <div class="search-keys">
                <input type="text" name="" id="" v-model="keyWords"  placeholder="请输入关键字/线路编号">
                <!-- searchListFun(0) -->
                <a href="javascript:;" @click="searchFunBtn()">查询</a>
            </div>
          </div>
           <div class="list-left">
                <ul class="list-product" v-if="productList.length!=0">
                   <li v-for="product in productList">
                        <a :href="'#/details/'+product.id+'/'+product.orgId+'/'+product.isOutgoing"  target="_blank">
                            <div>
                                <img :src="product.coverImg" alt="">
                            </div>
                            <div>
                                <h2>{{product.aliaseName}}
                                  <span><img src="../assets/images/xing.png" v-for="n in product.starLevel" alt=""></span>
                                </h2>
                                <h3 v-if="product.tags!=null"><span v-for="tag in product.tags.length" @click.stop.prevent="tagsChoose(product.tags,tag)">{{product.tags[tag-1]}}</span></h3>
                                <div>
                                    <div class="sale-info">
                                        <!-- <div>
                                            <h3>4.9</h3>
                                            <div>
                                                <p>13762人出游</p>
                                                <p>4567条点评</p>
                                            </div>
                                        </div> -->
                                        <p>供应商：{{product.brandName}}</p>
                                    </div>
                                    <div v-if="false" class="sale-schedule" @click.stop.prevent="checkSchedule(product)">
                                        <p>班期：12/04、12/05、12/09 查看班期<i :class="product.scheduleShow==true?'active':''"></i></p>
                                        <!-- 这是班期内容 -->
                                        <!-- <p>hhh{{product.scheduleShow}}</p> -->
                                        <div class="schedule-tour" v-if="product.scheduleShow==true" @click.stop.prevent="product.scheduleShow=true">
                                            <div class="month-tab">
                                                <a href="javascript:;" class="tab-left"></a>
                                                <ul>
                                                    <li v-for="(date,index) in dateList" @click="indexDate=index" :class="index==indexDate?'active':''">
                                                        <a href="javascript:;">
                                                            <p>{{date.month}}</p>
                                                            <h3>￥{{date.lowPrice}}起</h3>
                                                        </a>
                                                    </li>
                                                </ul>
                                                <a href="javascript:;" class="tab-right"></a>
                                            </div>
                                            <div class="calendar-week">
                                                <span>日</span>
                                                <span>一</span>
                                                <span>二</span>
                                                <span>三</span>
                                                <span>四</span>
                                                <span>五</span>
                                                <span>六</span>
                                            </div>
                                            <div class="calendar-bd">
                                                <ul v-if="indexDate==0" :class="arrWeek[0]==1?'one':(arrWeek[0]==2?'two':(arrWeek[0]==3?'three':(arrWeek[0]==4?'four':(arrWeek[0]==5?'five':(arrWeek[0]==6?'six':'')))))">
                                                    <li v-for="(i,index) in first" :class="i.price==''?'invalid':(i.selected==true?'act':'')">
                                                        <p>{{i.day}}</p>
                                                        <span><i v-if="i.remain!=''">余</i>{{i.remain}}</span>
                                                        <h3><span v-if="i.price!=''">￥</span>{{i.price}}<span v-if="i.price!=''">起</span></h3>
                                                    </li>
                                                </ul>
                                                <ul v-if="indexDate==1" :class="arrWeek[1]==1?'one':(arrWeek[1]==2?'two':(arrWeek[1]==3?'three':(arrWeek[1]==4?'four':(arrWeek[1]==5?'five':(arrWeek[1]==6?'six':'')))))">
                                                    <li v-for="(i,index) in second" :class="i.price==''?'invalid':(i.selected==true?'act':'')" >
                                                        <p>{{i.day}}</p>
                                                        <span><i v-if="i.remain!=''">余</i>{{i.remain}}</span>
                                                        <h3><span v-if="i.price!=''">￥</span>{{i.price}}<span v-if="i.price!=''">起</span></h3>
                                                    </li>
                                                </ul>
                                                <ul v-if="indexDate==2" :class="arrWeek[2]==1?'one':(arrWeek[2]==2?'two':(arrWeek[2]==3?'three':(arrWeek[2]==4?'four':(arrWeek[2]==5?'five':(arrWeek[2]==6?'six':'')))))">
                                                    <li v-for="(i,index) in three" :class="i.price==''?'invalid':(i.selected==true?'act':'')" >
                                                        <p>{{i.day}}</p>
                                                        <span><i v-if="i.remain!=''">余</i>{{i.remain}}</span>
                                                        <h3><span v-if="i.price!=''">￥</span>{{i.price}}<span v-if="i.price!=''">起</span></h3>
                                                    </li>
                                                </ul>
                                                <ul v-if="indexDate==3" :class="arrWeek[3]==1?'one':(arrWeek[3]==2?'two':(arrWeek[3]==3?'three':(arrWeek[3]==4?'four':(arrWeek[3]==5?'five':(arrWeek[3]==6?'six':'')))))">
                                                    <li v-for="(i,index) in four" :class="i.price==''?'invalid':(i.selected==true?'act':'')" >
                                                        <p>{{i.day}}</p>
                                                        <span><i v-if="i.remain!=''">余</i>{{i.remain}}</span>
                                                        <h3><span v-if="i.price!=''">￥</span>{{i.price}}<span v-if="i.price!=''">起</span></h3>
                                                    </li>
                                                </ul>
                                                <p></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="sale-price">
                                        <p v-if="userType==1">{{product.salesPrice}}</p>
                                        <p v-if="userType==2">{{product.directPrice}}</p>
                                        <!-- <a href="javascript:;">+对比</a> -->
                                    </div>
                                </div>
                            </div>
                        </a>
                    </li>
                </ul>
                <p v-if="productList.length==0" class="without-tip"><i></i>{{withoutTip}}</p>
                <Page v-if="productList.length!=0" :pageSize="pageNum" :current="currentPage"  @on-change="changePage" :total="total"></Page>
           </div>
           <div class="list-right">
               <div class="list-link">
                   <!-- <a href="#/register" target="_blank">
                       <img src="../assets/images/list-store.png" alt="">
                       <div>
                           <h2>商家入驻</h2>
                           <p>点击此处查看详情 <i></i></p>
                       </div>
                   </a> -->
                   <a href="#/demand/1" >
                       <img src="../assets/images/siren.png" alt="">
                       <div>
                           <h2>定制旅行</h2>
                           <p>不跟团队不自助 <i></i></p>
                       </div>
                   </a>
               </div>
               <div class="list-search-history" v-if="false">
                    <h2>搜过“三亚”的客人还搜过</h2>
                    <ul>
                        <li>曼谷</li>
                        <li>普吉岛</li>
                        <li>首尔</li>
                        <li>香港</li>
                        <li>曼谷</li>
                        <li>普吉岛</li>
                        <li>首尔</li>
                        <li>香港</li>
                    </ul>
                    <p></p>
               </div>
               <!-- <div class="list-scurity">
                   <h2>跟团游</h2>
                   <h2>6重旅游保障</h2>
                   <p><span></span></p>
                   <div>
                        <a :href="security.docurl" target="_blank" v-for="security in platformSecurity">{{security.subject}}</a>
                    </div>
               </div> -->
           </div>
       </div>
       <feedBack></feedBack>
       <!-- 引入底部导航 -->
       <Footer></Footer>
    </div>
</template>
<script>
// import { mapState, mapActions, mapMutations } from "vuex";
import tools from "../common/tools";
import {
  getconditionlist,
  // getDocHelp,
  getProductList,
  newProductlist
} from "../services/index";
import supplierHeader from "../components/supplier-header.vue";
import Footer from "../components/footer.vue";
import feedBack from "../components/feedBack.vue";
// import Advertising from "../../components/advertising.vue";
export default {
  data() {
    return {
      numDeparture:13,//控制出发地显隐，
      numDestination:13,//控制目的地显隐
      isHide: false,
      siteId: "", //获取站点id，为了判断显示的价格
      siteName: "", //获取站点名称
      routetypeid: "", //线路类型
      indexPlan: '', //传给导航组件的值
      searchIndex: 0, //搜素默认值
      themeIndex: -1, //推荐主题默认值
      destinationIndex: -1, //目的地默认值
      destinationSelectIndex: -1, //选择的城市默认值
      departureSelectIndex:-1,//选择的出发地
      without:true,
      //    tripIndex:-1,//旅行天数默认值
      departureIndex: -1, //出发城市默认值
      productIndex: -1, //产品类型默认值
      //    massIndex:-1,//出团日期默认值
      //    supplierIndex:-1,//供应商默认值
      saleIndex: -1, //销售类型默认值
      themeList: [], //推荐主题列表
      destinationList: [], //目的地列表
      tripDays: [
        { name: 3, selected: false },
        { name: 4, selected: false },
        { name: 5, selected: false },
        { name: 6, selected: false },
        { name: 7, selected: false },
        { name: 8, selected: false },
        { name: 9, selected: false },
        { name: 10, selected: false },
        { name: 11, selected: false },
        { name: 12, selected: false },
        { name: 13, selected: false },
        { name: 14, selected: false }
      ], //行程天数列表
      //    tripDay:'',//选择行程天数
      supplierSelected: "", //选择的供应商
      massSelected: "", //选择的出团日期
      departureList: [], //出发城市列表
      productType: [], //产品类型列表
      massDate: [], //出团日期列表
      supplierList: [], //供应商列表
      saleTypes: [{ ways: "促销" }], //销售类型
      searchConditions: [{ name: "默认" }, { name: "热门" }], //搜素条件
      productList: [], //产品列表
      platformSecurity: [], //跟团游 6重旅游保障
      pageNum: 6, //每页显示条数
      total: "", //总条数
      currentPage: 1,
      startTime: "", //选择开始日期
      endTime: "", //选择结束日期
      subject: "", //主题
      destination: "", //目的地
      departure: "", //出发地
      tripDaysSelected: [], //行程天数
      proType: "", //产品类型
      tourMouth: [], //出团日期月份选择列表
      lowPrice: "", //最低价格
      highPrice: "", //最高价格
      keyWords: "", //关键字
      orderBy: 1, //排序
      orderDirection: "ASC", //排序规则
      supplierIdList: [], //供应商id列表
      productTagsSelected: [], //选择的产品标签
      productTagsList: [], //产品标签列表
      withoutTip:'',//无数据的时候的提示
      userType:'',//用户类型
      orgId:'',//
      // 团期相关
      // tourList:[],//团期列表
      // indexDate:0,//显示第一个月的日期
      // tour:[],//返回的团期
      // first:[],
      // second:[],
      // three:[],
      // four:[],
      // arrWeek:[],
      // firstCopy:[],
      // secondCopy:[],
      // threeCopy:[],
      // fourCopy:[],
      // arrLastDay:[],
    };
  },
  methods: {
    // 监听价格
    checkLowPrice(num){
      if(num<0){
        this.lowPrice=0;
      }
    },
    checkHighPrice(num){
      if(num<0){
        this.highPrice=0;
      }
    },
    // 全局控制
    globalFun() {
      this.isHide = false;
    },
    globalFunT() {
      this.isHide = !this.isHide;
    },
    navIndex(type){
      this.indexPlan=type;
    },
    // 周边短线长线列表页初始化
    surroundingInit() {
      tools.setLocalStorage("routetypeid", this.$route.query.routetypeid);
      tools.setLocalStorage("destinations", this.$route.query.destinations);
      tools.setLocalStorage("tagName", this.$route.query.destinations);
      this.userType = tools.getLocalStorage("userType");
      this.siteId = tools.getSessionStorage("siteid");
      this.routetypeid = tools.getLocalStorage("routetypeid");
      this.siteName = tools.getSessionStorage("siteName");
      this.orgId=tools.getLocalStorage("orgId");
      this.supplierIdList.push(tools.getLocalStorage("orgId"));
//    this.saleIndex = Number(tools.getLocalStorage("saleIndex"));//类型
      let tagName = tools.getLocalStorage("tagName");
      console.log("siteid", this.siteId);
      let params = {
        siteId: this.siteId,
        routeTypeId: this.routetypeid
      };
      // 查询条件绑定
      getconditionlist(params)
        .then(response => {
          console.log(response);
          if (response.meta.success == true) {
            console.log("查询条件数据获取成功");
            this.themeList = response.data.adSubjectRecommends;
            this.productType = response.data.productTypes;
            this.massDate = response.data.tourDateVOs;
            this.productTagsList = response.data.omProductlabels;
            //出发地
            this.departureList = response.data.departures;
            //目的地
            this.destinationList = response.data.destinationDtos;
           
            // 组合产品标签
            for (let i = 0; i < this.productTagsList.length; i++) {
              this.$set(this.productTagsList[i], "selected", false);
            }
            // 出团月份组合
            for (let i = 0; i < this.massDate.length; i++) {
              this.$set(this.massDate[i], "selected", false);
            }
            if (this.productTagsList.length != 0 && tagName != "") {
              this.productTagsSelected = [];
              for (let i = 0; i < this.productTagsList.length; i++) {
                if (tagName == this.productTagsList[i].labelname) {
                  this.productTagsList[i].selected = true;
                  this.productTagsSelected.push(
                    this.productTagsList[i].labelname
                  );
                }
              }
            }
            // console.log('massDate',this.massDate);
            this.searchListFun(0);
          } else {
            console.log("查询条件数据获取失败");
          }
        })
        .catch(err => {
          console.log("查询条件接口获取异常", err);
          // this.$Message.info('查询条件接口获取异常');
        });
    },
    //热门主题选择
    subjectSearch(obj, index) {
      this.themeIndex = index;
      this.subject = obj.subject;
      this.searchListFun(0);
    },
    // 出发地选择
    departureSearch(obj, index) {
      this.departureSelectIndex = index;
      this.departure = obj[index-1];
      this.searchListFun(0);
    },
    //产品类型选择
    productTypeSearch(obj, index) {
      this.productIndex = index;
      this.proType = obj.id;
      this.searchListFun(0);
    },
    // 目的地选择
    destinationSearch(obj, index) {
      this.destinationSelectIndex = index;
      this.destination = obj.destname;
      this.searchListFun(0);
    },
    // 选择行程天数
    tripDaySearch(obj, index) {
      obj.selected = !obj.selected;
      this.tripDaysSelected = [];
      for (let i = 0; i < this.tripDays.length; i++) {
        if (this.tripDays[i].selected == true) {
          this.tripDaysSelected.push(this.tripDays[i].name);
        }
      }
      this.searchListFun(0);
    },
    // 供应商选择
    supplierSearch(obj, index) {
      obj.selected = !obj.selected;
      this.supplierIdList = [];
      for (let i = 0; i < this.supplierList.length; i++) {
        if (this.supplierList[i].selected == true) {
          this.supplierIdList.push(this.supplierList[i].supplierid);
        }
      }
      this.searchListFun(0);
    },
    // 产品标签选择
    productTagsSearch(obj, index) {
      obj.selected = !obj.selected;
      this.productTagsSelected = [];
      for (let i = 0; i < this.productTagsList.length; i++) {
        // if (i != index) {
        //   this.productTagsList[i].selected = false;
        // }
        if(this.productTagsList[i].selected==true){
           this.productTagsSelected.push(this.productTagsList[i].labelname);
        }
      }
      // this.productTagsSelected.push(obj.labelname);
      this.searchListFun(0);
    },
    // 销售类型选择
    saleTypeSearch(obj, index) {
      this.saleIndex = index;
      this.searchListFun(0);
    },
    // 出团月份选择
    tourMouthSearch(obj, index) {
      obj.selected = !obj.selected;
      this.tourMouth = [];
      for (let i = 0; i < this.massDate.length; i++) {
        if (this.massDate[i].selected == true) {
          this.tourMouth.push(this.massDate[i].tourYear+'-'+this.massDate[i].tourMonth);
        }
      }
      console.log(this.tourMouth);
      this.searchListFun(0);
    },
    // 置空行程天数
    tripDayEmpty() {
      this.tripDaysSelected = [];
      for (let i = 0; i < this.tripDays.length; i++) {
        this.tripDays[i].selected = false;
      }
      this.searchListFun(0);
    },
    // 置空供应商
    supplierEmpty() {
      this.supplierIdList = [];
      for (let i = 0; i < this.supplierList.length; i++) {
        this.supplierList[i].selected = false;
      }
      this.searchListFun(0);
    },
    // 置空产品标签
    productTagsEmpty() {
      this.productTagsSelected = [];
      for (let i = 0; i < this.productTagsList.length; i++) {
        this.productTagsList[i].selected = false;
      }
      this.searchListFun(0);
    },
    // 置空出团月份
    tourMouthEmpty() {
      this.tourMouth = [];
      for (let i = 0; i < this.massDate.length; i++) {
        this.massDate[i].selected = false;
      }
      this.searchListFun(0);
    },
    // 出团日期选择
    dateSearch() {
      this.searchListFun(0);
    },
    // 推荐主题置空
    subjectEmpty() {
      this.themeIndex = -1;
      this.subject = "";
      this.searchListFun(0);
    },
    // 目的地置空
    destinationEmpty() {
      this.destinationIndex = -1;
      this.destinationSelectIndex = -1;
      this.destination = "";
      this.searchListFun(0);
    },
    //  出发城市置空
    departureEmpty() {
      this.departureIndex = -1;
      this.departure = "";
      this.searchListFun(0);
    },
    // 产品类型置空
    productEmpty() {
      this.productIndex = -1;
      this.proType = "";
      this.searchListFun(0);
    },
    // 销售类型置空
    saleTypeEmpty() {
      this.saleIndex = -1;
      this.searchListFun(0);
    },
    // 排序类型选择
    orderByTypeSearch(index) {
      // alert(index);
      this.searchIndex = index;
       if(obj.name=="热门"){
        this.orderBy=3;
      }
      if(obj.name=="默认"){
        this.orderBy=1;
      }
      this.searchListFun(0);
    },
    // 根据价格升序/降序
    orderByPriceSearch() {
      this.orderBy = 2;
      // this.searchIndex=1;
      this.searchIndex = this.searchIndex + 3;
      // alert(this.searchIndex);
      if (this.searchIndex % 2 == 0) {
        this.orderDirection = "DESC";
      } else {
        this.orderDirection = "ASC";
      }
      this.searchListFun(0);
    },
    // 产品标签处选择
    tagsChoose(obj, index) {
      this.productTagsSelected = [];
      for (let i = 0; i < this.productTagsList.length; i++) {
        if (this.productTagsList[i].labelname == obj[index - 1]) {
          this.productTagsList[i].selected = true;
          this.productTagsSelected.push(this.productTagsList[i].labelname);
        } else {
          this.productTagsList[i].selected = false;
        }
      }
      this.searchListFun(0);
    },
    // 搜索列表
    searchListFun(page) {
      // this.currentPage=1;
      let paramsEs = {
        siteId: this.siteId,
        destination: this.destination,
        start: page,
        size: this.pageNum,
        // subject: this.subject,
        routeTypeId: this.routetypeid,
        // site: this.siteName,
        departure: this.departure,
        proType: this.proType,
        days: this.tripDaysSelected,
        tourMonth: this.tourMouth,
        beginDate: this.startTime,
        endDate: this.endTime,
        lowPrice: this.lowPrice,
        highPrice: this.highPrice,
        keywords: this.keyWords,
        orderBy: this.orderBy,
        orderDirection: this.orderDirection,
        orgId: this.orgId,
        marketType: this.saleIndex+1,
        tag: this.productTagsSelected
      };
      // ES查询
      newProductlist(paramsEs)
        .then(response => {
          console.log(response);
          if (response.meta.success == true) {
            console.log("ES查询数据获取成功");
            this.total = response.code;
            if(response.data.length!=0){
              this.productList = response.data;
              // this.total = response.data.totalElements;
            }
            else{
              this.productList=[];
            }
            if(this.productList.length==0){
              this.withoutTip="很抱歉,没有找到符合条件的相关产品";
            }
            // this.total = response.data.totalElements;
          } else {
            console.log("ES查询数据获取失败");
          }
        })
        .catch(err => {
          console.log("ES查询接口获取异常", err);
          // this.$Message.info('ES查询接口获取异常');
        });
    },
    //目的地省份选择
    destinationProvinceSelect(obj,index) {
      this.destinationIndex = index;
      this.destinationSelectIndex = -1;
    },
    //查看班期
    checkSchedule(obj) {
      obj.scheduleShow = !obj.scheduleShow;
    },
    //改变页码
    changePage(page) {
      this.currentPage = page;
      this.searchListFun(page - 1);
    },
    //选择开始时间
    // dateStartChange(timeData) {
    //   if (timeData[0] == "") {
    //     timeData = ["", ""];
    //   }
    //   this.startTime = timeData;
    // },
    // //选择结束时间
    // dateEndChange(timeData) {
    //   if (timeData[0] == "") {
    //     timeData = ["", ""];
    //   }
    //   this.endTime = timeData;
    // },
     dateSelected(timeData){
      if (timeData[0] == "") {
        timeData = ["", ""];
      }
      this.startTime=timeData[0];
      this.endTime=timeData[1];
      // console.log(timeData,'dateSelected');
    },
     // 查询按钮
    searchFunBtn(){
      tools.setLocalStorage("keyWords",this.keyWords);
      console.log('to',tools.getLocalStorage("keyWords"));
      this.searchListFun(0);
    }
  },
  mounted() {
    // this.surroundingInit();
  },
  components: {
    supplierHeader,
    Footer,
    feedBack
    // Advertising
  }
};
</script>

<style lang="scss">
.supplier-surrounding-list-page {
  min-height: 100vh;
  position: relative;
  padding-bottom: 91px;
  .footer{
    position: absolute;
    bottom: 0;
  }
  .supplier-header > ul {
    margin-bottom: 40px;
  }
  .list-header {
    margin-bottom: 13px;
  }
  .list-condition-area {
    width: 1180px;
    margin: auto;
    >p{
      @include sc(14px,#999);
      padding: 12px 0;
      >span,>a{
        @include sc(14px,#666);
      }
    }
    > ul {
      border: solid 1px #eeeeee;
      width: 100%;
      background: #fff;
      padding: 0 0 0 20px;
      > li {
        list-style: none;
        border-bottom: 1px solid #eee;
        padding: 9px 0;
        &:last-child{
          border-bottom: 0;
        }
        > label {
          display: inline-block;
          @include sc(12px, #666);
          width: 93px;
          vertical-align: top;
          margin-top: 2px;
          &.esp {
            margin-top: 7px;
          }
        }
        > a {
          @include wh(51px, 23px);
          display: inline-block;
          vertical-align: top;
          text-align: center;
          line-height: 23px;
          @include sc(14px, #333);
          border: solid 1px transparent;
          &.active {
            border: solid 1px #5b8cfe;
            @include sc(14px, #5b8cfe);
          }
          &.esp {
            margin-top: 5px;
          }
        }
        > div:not(.supplier-content) {
          max-width: 800px;
          display: inline-block;
          margin-left: 17px;
          > a {
            @include sc(14px, #333);
            margin-left: 27px;
            display: inline-block;
            padding: 0 5px;
            border: solid 1px transparent;
            &:first-child {
              margin-left: 20px;
            }
            &.active {
              border: solid 1px #5b8cfe;
              @include sc(14px, #5b8cfe);
            }
            &:hover{
               @include sc(14px, #5b8cfe);
            }
          }
        }
        .supplier-content {
          max-width: 780px;
          display: inline-block;
          margin-left: 37px;
          > a {
            @include sc(14px, #333);
            margin-right: 27px;
            display: inline-block;
            padding: 0 5px;
            // margin-bottom: 10px;
            border: solid 1px transparent;
            &:first-child {
              margin-left: 0px;
            }
            &.active {
              border: solid 1px #5b8cfe;
              @include sc(14px, #5b8cfe);
            }
            &:hover{
               @include sc(14px, #5b8cfe);
            }
          }
        }
        .data-picker {
          margin-left: 50px;
        }
        > button {
          @include wh(60px, 32px);
          border-radius: 4px;
          border: 1px solid #ffba00;
          line-height: 23px;
          text-align: center;
          background: #fff;
          @include sc(14px,#ffba00);
          margin-left: 20px;
        }
      }
    }
    .destination-province,.departure-province {
      width: 751px;
      // display: inline-block;
      > a {
        float: left;
        display: inline-block;
        position: relative;
        > i {
          position: absolute;
          top: 30px;
          left: 7px;
          width: 0;
          height: 0;
          border-width: 0 7px 7px;
          border-style: solid;
          border-color: transparent transparent #f3f3f3; /*透明 透明  灰*/
          // margin:40px auto;
        }
      }
    }
    .destination-city,.departure-city {
      margin-top: 10px;
      // background: #f3f3f3;
      width: 851px;
      display: inline-block;
      // border-radius: 15px;
      margin-left: 93px;
      box-sizing: border-box;
      line-height: 30px;
      padding-left: 22px;
      border: solid 1px #e1e1e1;
      > a {
        @include sc(14px, #333);
        margin-right: 41px;
        display: inline-block;
        &.active {
          @include sc(14px, #5b8cfe);
        }
        &:hover{
          @include sc(14px, #5b8cfe);
        }
      }
      .departure-more{
        color:#ffba00;
      }
    }
  }
  .list-content {
    width: 1180px;
    margin: auto;
    margin-bottom: 70px;
  }
  .list-left,
  .list-right {
    display: inline-block;
    vertical-align: top;
  }
  .list-search-content {
    width: 1180px;
    height: 48px;
    background: #f8f8f8;
    border: solid 1px #eee;
    margin-bottom: 13px;
    > ul {
      > li {
        float: left;
        list-style: none;
        width: 95px;
        height: 48px;
        line-height: 48px;
        text-align: center;
        cursor: pointer;
        border-right: solid 1px #eee;
        @include sc(18px, #333);
        &:nth-child(1),
        &:nth-child(2) {
          > i {
            display: inline-block;
            @include wh(13px, 16px);
            // margin-top: 2px;
            margin-left: 5px;
            vertical-align: middle;
            background: url("../assets/images/select-w.png") no-repeat;
            background-size: 13px 16px;
          }
        }
        &:nth-child(3) {
          > i {
            display: inline-block;
            vertical-align: top;
            margin-top: 10px;
            margin-left: 5px;
            @include wh(13px, 16px);
            background: url("../assets/images/price-choose.png") 0 9px no-repeat;
            background-size: 13px 18px;
          }
        }
        &.active {
          &:nth-child(1),
          &:nth-child(2) {
            background: #ffba00;
            color: #fff;
            > i {
              background: url("../assets/images/select-s.png") no-repeat;
              background-size: 13px 16px;
            }
          }
          &:nth-child(3) {
            > i {
              vertical-align: top;
              margin-top: 20px;
              background: url("../assets/images/price-choose.png") 0 -9px no-repeat;
              background-size: 13px 18px;
            }
          }
        }
      }
    }
    > div {
      display: inline-block;
    }
    .search-price {
      padding: 5px 25px;
      border-right: solid 1px #eee;
      box-sizing: border-box;
      // display: inline-block;
      >p{
        display: inline-block;
        @include sc(16px,#333);
        padding: 0 20px;
      }
      > input {
        @include wh(80px, 34px);
        border: solid 1px #eee;
        padding-left: 5px;
      }
      > span {
        @include sc(16px, #999);
        margin: 0 4px;
      }
    }
    .search-keys {
      padding-top: 7px;
      padding-left: 50px;
      > input {
        @include wh(225px, 34px);
        border: solid 1px #eee;
        padding-left: 13px;
        margin-right: 5px;
        outline: none;
      }
      > input::-moz-placeholder {
        @include sc(14px, #b2b2b2);
      }
      > a {
        display: inline-block;
        @include wh(48px, 31px);
        @include sc(14px, #ffba00);
        border-radius: 4px;
        line-height: 31px;
        text-align: center;
        border:1px solid #ffba00;
      }
    }
  }
  .list-product {
    width: 882px;
    margin-bottom: 20px;
    border: solid 1px #eeeeee;
    > li {
      list-style: none;
      width:882px;
      min-height: 192px;
      border-radius: 4px;
      padding: 0 25px;
      box-sizing: border-box;
      // margin-bottom: 21px;
      > a {
        display: inline-block;
        width:100%;
        min-height: 192px;
        // @include wh(882px, 192px);
        padding: 11px 0 15px 0;
        border-radius: 4px;
        box-sizing: border-box;
        border-bottom:1px solid #eee; 
        > div {
          display: inline-block;
          vertical-align: top;
          &:nth-child(1) {
            @include wh(236px, 163px);
            position: relative;
            margin-right: 10px;
            overflow: hidden;
            > img {
              @include wh(236px, 163px);
              display: inline-block;
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
            > i {
              position: absolute;
              top: 10px;
              left: 14px;
              @include sc(14px, #fff);
              height: 20px;
              display: inline-block;
              padding: 0 5px;
              // width: 30px;
              background: #ff2020;
              border-radius: 2px;
              text-align: center;
              font-style: normal;
              line-height: 21px;
            }
          }
          &:nth-child(2) {
            width: calc(100% - 255px);
            position: relative;
            min-height: 167px;
            > h2 {
              @include sc(18px, #333);
              position:relative;
              line-height:25px;
              >span{
                display: inline-block;
                margin-left: 5px;
                >img{
                  @include wh(16px,16px);
                  margin-right: 6px;
                }
              }
            }
            > h3 {
              height: 22px;
              line-height: 22px;
              margin: 8px 0 18px 0;
              > span {
                display: inline-block;
                @include sc(12px, #fff);
                line-height: 22px;
                height: 22px;
                padding: 0 5px;
                margin-right: 5px;
                border-radius: 2px;
                &:nth-child(1) {
                  background: #ff9500;
                }
                &:nth-child(2) {
                  background: #ff3b30;
                }
                &:nth-child(3) {
                  background: #ff2d55;
                }
                &:nth-child(4) {
                  background: #5858d6;
                }
                &:nth-child(5) {
                  background: #007aff;
                }
              }
            }
            > div {
              > div {
                display: inline-block;
                vertical-align: top;
              }
              .sale-info {
                // width: 130px;
                margin-right: 20px;
                position: absolute;
                bottom: 0;
                > p {
                  @include sc(14px, #555);
                  margin-top: 3px;
                }
              }
              .sale-schedule {
                // margin-top: 12px;
                position: relative;
                > p {
                  line-height: 14px;
                  @include sc(14px, #333);
                  > i {
                    display: inline-block;
                    @include wh(16px, 8px);
                    // background: url("../../assets/image/check.png") no-repeat;
                    background-size: 100%;
                    margin-left: 6px;
                    &.active {
                      // background: url("../../assets/image/check-top.png")
                      //   no-repeat;
                      background-size: 100%;
                    }
                  }
                }
                .schedule-tour {
                  @include wh(390px, 253px);
                  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
                  position: absolute;
                  top: 20px;
                  left: 43px;
                  z-index: 1000;
                  // width:447px;
                  // margin-bottom: 11px;
                  // border-radius: 10px;
                  background: #fff;
                  .month-tab {
                    height: 42px;
                    > ul {
                      display: inline-block;
                      > li {
                        list-style: none;
                        float: left;
                        width: 80px;
                        text-align: center;
                        height: 42px;
                        padding-top: 10px;
                        > a {
                          display: inline-block;
                          height: 48px;
                          > p {
                            line-height: 12px;
                            @include sc(12px, #333);
                            margin-bottom: 5px;
                          }
                          > h3 {
                            line-height: 12px;
                            @include sc(12px, #ea5714);
                            font-weight: normal;
                          }
                        }
                        &.active {
                          background: #317ef3;
                          > a {
                            > p {
                              @include sc(14px, #fff);
                            }
                          }
                        }
                      }
                    }
                    > a {
                      display: inline-block;
                      width: 30px;
                      height: 42px;
                      &.tab-left {
                        // background: url("../../assets/image/tour-left.png")
                        //   no-repeat center center;
                        background-size: 8px 16px;
                      }
                      &.tab-right {
                        // background: url("../../assets/image/tour-right.png")
                        //   no-repeat center center;
                        background-size: 8px 16px;
                      }
                    }
                  }
                  .calendar-week {
                    line-height: 24px;
                    height: 24px;
                    background: #317ef3;
                    font-size: 0px;
                    > span {
                      display: inline-block;
                      width: 14.28%;
                      text-align: center;
                      @include sc(12px, #fff);
                    }
                  }
                  .calendar-bd {
                    width: 100%;
                    // background: url("../../assets/image/calendar-schedule.png")
                    //   no-repeat center;
                    > ul {
                      width: 100%;
                      > li {
                        list-style: none;
                        float: left;
                        height: 37.5px;
                        width: 14.28%;
                        text-align: center;
                        padding-top: 3px;
                        font-size: 0;
                        > p {
                          @include sc(12px, #333);
                          line-height: 12px;
                        }
                        > h3 {
                          font-weight: normal;
                          @include sc(10px, #ea5714);
                        }
                        > span {
                          display: inline-block;
                          width: 100%;
                          line-height: 10px;
                          @include sc(10px, #999);
                          > i {
                            font-style: normal;
                          }
                        }
                        // &.invalid{
                        //     // background: #ddd;
                        //     >p{
                        //         @include sc(toRem(20px),#ddd);
                        //     }
                        // }
                        // &.act{
                        //     background: #4a8aff;
                        //     >p,>h3{
                        //         color:#fff;
                        //     }
                        // }
                      }
                      &.one {
                        > li:first-child {
                          margin-left: 14.2%;
                        }
                      }
                      &.two {
                        > li:first-child {
                          margin-left: 28.4%;
                        }
                      }
                      &.three {
                        > li:first-child {
                          margin-left: 42.6%;
                        }
                      }
                      &.four {
                        > li:first-child {
                          margin-left: 56.8%;
                        }
                      }
                      &.five {
                        > li:first-child {
                          margin-left: 71%;
                        }
                      }
                      &.six {
                        > li:first-child {
                          margin-left: 85.2%;
                        }
                      }
                    }
                    > p {
                      clear: both;
                    }
                  }
                }
              }
              .sale-price {
                // float: right;
                // margin-top: 35px;
                position: absolute;
                bottom: 0;
                right: 0;
                > p {
                  line-height: 26px;
                  @include sc(26px, #ffba00);
                  &:before {
                    display: inline-block;
                    content: "￥";
                    @include sc(26px, #ffba00);
                  }
                  &:after {
                    display: inline-block;
                    content: "起";
                    @include sc(12px, #999);
                    margin-left: 9px;
                  }
                }
                > a {
                  text-align: center;
                  float: right;
                  @include wh(56px, 24px);
                  @include sc(16px, #333);
                  border: solid 1px #dddddd;
                  display: inline-block;
                }
              }
            }
          }
        }
      }
      &:nth-child(odd) {
        margin-right: 20px;
      }
      &:last-child{
        >a{
          border-bottom:none;
        }
      }
      &:hover {
       background: rgba($color: #ffba00, $alpha: .1s)
      }
    }
  }
  .without-tip {
    width:882px;
    display: inline-block;
    > i {
      display: inline-block;
      vertical-align: middle;
      @include wh(25px, 25px);
      // background: url("../../assets/image/without-search.png") no-repeat;
      background-size: 100%;
      margin-right: 10px;
    }
    @include sc(14px, #333);
  }
  .list-right {
    width: 285px;
    margin-left: 7px;
  }
  .list-link {
    > a {
      display: inline-block;
      padding: 13px 0 10px 16px;
      border: solid 1px #eeeeee;
      width:100%;
      > img {
        @include wh(78px, 64px);
        margin-right: 38px;
      }
      > div {
        display: inline-block;
        vertical-align: top;
        > h2 {
          @include sc(16px, #ffba00);
          margin-top: 5px;
          margin-bottom: 5px;
        }
        > p {
          @include sc(14px, #7d7d7d);
          > i {
            @include wh(7px, 13px);
            display: inline-block;
            margin-left: 10px;
            // background: url("../../assets/image/link-right.png") no-repeat;
          }
        }
      }
    }
  }
  .list-search-history {
    margin-top: 48px;
    margin-bottom: 55px;
    > h2 {
      @include sc(20px, #333);
      text-align: center;
      margin-bottom: 22px;
    }
    > ul {
      > li {
        float: left;
        list-style: none;
        @include wh(60px, 29px);
        border-radius: 10px;
        margin-bottom: 18px;
        margin-right: 11px;
        background-image: linear-gradient(
            90deg,
            #0856a0 0%,
            #098767 55%,
            #6db130 100%
          ),
          linear-gradient(#ff5a20, #ff5a20);
        @include sc(14px, #fff);
        line-height: 29px;
        text-align: center;
      }
    }
    > p {
      clear: both;
    }
  }
  .list-scurity {
    > h2 {
      text-align: center;
      font-size: 20px;
      font-weight: normal;
      background-image: -webkit-linear-gradient(
        0deg,
        #0856a0 0%,
        #098767 50%,
        #6db130 55%,
        #6fba2c 100%
      );
       background-image: linear-gradient(
        0deg,
        #0856a0 0%,
        #098767 50%,
        #6db130 55%,
        #6fba2c 100%
      );
      -webkit-background-clip: text; /* 规定背景的划分区域 */
      -webkit-text-fill-color: transparent; /* 防止字体颜色覆盖 */
    }
    > p {
      > span {
        display: inline-block;
        @include wh(58px, 4px);
        background-image: linear-gradient(
            90deg,
            #0856a0 0%,
            #098767 55%,
            #6db130 100%
          ),
          linear-gradient(#ff7a23, #ff7a23);
      }
      text-align: center;
    }
    > div {
      color: red;
      // text-align: center;
      margin: auto;
      padding-left: 50px;
      margin-top: 10px;
      > a {
        display: inline-block;
        list-style: none;
        width: 15px;
        word-wrap: break-word;
        float: left;
        @include sc(16px, #333);
        line-height: 15px;
        margin-right: 20px;
      }
    }
  }
}
</style>
