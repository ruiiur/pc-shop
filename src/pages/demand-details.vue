<!--这是详情页面-->
<template>
    <div class="demand-details">
       <a href="javascript:;" id="top"></a>
        <!-- 供应商导航引入 -->
        <supplierHeader  :without="without"  :isHide="isHide" @global="globalFunT" @refreshList="demandDetailsInit"></supplierHeader>
        <div class="demand-content">
            <p class="bread-crumbs">您当前所在位置：<a :href="'#/supplier?orgId=' + orgId">首页 > </a><a :href="fromPath">{{fromName}} > </a><span>方案详情</span></p>
            <!-- 总价 -->
            <div class="demand-info">
              <div class="details-top">
                <span>编号：{{psQuickQuotation.orderno}}</span>
                <span>报价时间：{{psQuickQuotation.createddate}}</span>
                <p>下载报价单：
                  <a :href="charVersionDownloadUrl">文字版</a>
                  <!-- <i>/</i><a href="javascript:;">图文版</a> -->
                  <a :href="hotelInfoUrl" class="esp">酒店介绍</a>
                  <a :href="scenicInfoUrl" class="esp">景区介绍</a>
                  <a :href="notesInfoUrl" class="esp">旅游注意事项</a>
                </p>
              </div>
              <div class="details-bottom">
                <h2>{{psQuickQuotation.subjectname}}</h2>
                <div class="info-con">
                  <div class="con-left">
                    <div class="pro-img">
                      <img  v-for="(img,index) in imgList" v-if="index==indexImg" :src="img.imgUrl" alt="">
                    </div>
                    <div class="carousel">
                      <a href="javascript:;" @click="prev()"><img src="../assets/images/zuojiantou.png" alt=""></a>
                      <div>
                        <div ref="imgbox">
                          <img v-for="(img,index) in imgList" :class="indexImg==index?'active':''" @click="chooseImg(index)" :src="img.imgUrl" alt="">
                        </div>
                      </div>
                      <a href="javascript:;"  @click="next()"><img src="../assets/images/youjiantou.png" alt=""></a>
                    </div>
                  </div>
                  <div class="con-right">
                      <div>
                          <h2><img src="../assets/images/kehuxinxi.png" alt="">客户信息</h2>
                          <div class="customer">
                            <div>
                              <p><label for="">客户名称：</label><span>{{psQuickQuotation.customername}}</span></p>
                              <p><label for="">联系电话：</label><span>{{psQuickQuotation.phone}}</span></p>
                              <p><label for="">出团日期：</label><span>{{psQuickQuotation.tourdate}}</span></p>
                              <p><label for="">行程天数：</label><span>{{psQuickQuotation.traveldays}}</span></p>
                            </div>
                            <div>
                              <p><label class="esp" for="">联系人：</label><span>{{psQuickQuotation.contact}}</span></p>
                              <p><label for="">团队人数：</label><span><i>成人{{psQuickQuotation.adultqty}}</i><i>/儿童{{psQuickQuotation.childrenqty}}</i></span></p>
                              <p><label for="">回程日期：</label><span>{{psQuickQuotation.enddate}}</span></p>
                              <p v-if="psQuickQuotation.email!=''&&psQuickQuotation.email!=null"><label for="">电子邮件：</label><span>{{psQuickQuotation.email}}</span></p>
                            </div> 
                          </div>
                      </div>
                      <div>
                          <h2><img src="../assets/images/dajiaotong.png" alt="">大交通信息</h2>
                          <ul>
                              <li v-for="(tra,index) in bigTraffic" v-if="bigTrafficType==4">
                                  <span v-if="index==0">去程</span>
                                  <span v-if="index==1">回程</span>
                                  <div>
                                      <div>
                                          <h2>{{tra.todeptime}}</h2>
                                          <p>{{tra.todepcity}}</p>
                                      </div>
                                      <i></i>
                                      <div>
                                          <h2>{{tra.toarrtime}}</h2>
                                          <p>{{tra.toarrcity}}</p>
                                      </div>
                                  </div>
                                  <span class="esp">{{tra.toflightno}}</span>
                              </li>
                               <li v-for="(tra,index) in bigTraffic" v-if="bigTrafficType==1">
                                  <span v-if="index==0">去程</span>
                                  <span v-if="index==1">回程</span>
                                  <div>
                                      <div>
                                          <h2>{{tra.bustime}}</h2>
                                          <p>{{tra.arrcity}}</p>
                                      </div>
                                      <i></i>
                                      <div>
                                          <!-- <h2>{{tra.toarrtime}}</h2> -->
                                          <p>{{tra.depcity}}</p>
                                      </div>
                                  </div>
                                  <span class="esp">{{tra.busno}}</span>
                              </li>
                               <li v-for="(tra,index) in bigTraffic" v-if="bigTrafficType==2">
                                  <span v-if="index==0">去程</span>
                                  <span v-if="index==1">回程</span>
                                  <div>
                                      <div>
                                          <h2>{{tra.traintime}}</h2>
                                          <p>{{tra.arrcity}}</p>
                                      </div>
                                      <i></i>
                                      <div>
                                          <!-- <h2>{{tra.toarrtime}}</h2> -->
                                          <p>{{tra.depcity}}</p>
                                      </div>
                                  </div>
                                  <span class="esp">{{tra.trainno}}</span>
                              </li>
                               <li v-for="(tra,index) in bigTraffic" v-if="bigTrafficType==3">
                                  <span v-if="index==0">去程</span>
                                  <span v-if="index==1">回程</span>
                                  <div>
                                      <div>
                                          <h2>{{tra.shiptime}}</h2>
                                          <p>{{tra.arrcity}}</p>
                                      </div>
                                      <i></i>
                                      <div>
                                          <!-- <h2>{{tra.toarrtime}}</h2> -->
                                          <p>{{tra.depcity}}</p>
                                      </div>
                                  </div>
                                  <span class="esp">{{tra.shipno}}</span>
                              </li>
                          </ul>
                      </div>
                      <div>
                          <h2><img src="../assets/images/zonghebaojia.png" alt="">综合报价</h2>
                          <div class="offer">
                            <div>
                              <p><label for="">成人大交通：</label>{{amtInfo.cbigtrafficPrice}}元/人</p>
                              <p><label for="">成人地接：</label>{{amtInfo.clocalLocalquateprice}}元/人</p>
                              <p><label for="">成人总价：</label>{{amtInfo.cbigtrafficPrice+amtInfo.clocalLocalquateprice}}元/人</p>
                            </div>
                            <div>
                              <p><label for="">儿童大交通：</label>{{amtInfo.ebigtrafficPrice}}元/人</p>
                              <p><label for="">儿童地接：</label>{{amtInfo.elocalLocalquateprice}}元/人</p>
                              <p><label for="">儿童总价：</label>{{amtInfo.ebigtrafficPrice+amtInfo.elocalLocalquateprice}}元/人</p>
                            </div>
                          </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>  
             <!-- 行程介绍及一些说明区 -->
            <div class="trip-info">
                <!-- 导航 -->
                <ul class="trip-info-nav" :class="searchBarFixed == true ? 'isFixed' :''" id="nav">
                  <li v-for="(detail,index) in navList" @click="locateAtNav(index+'n',index)" :class="detailIndex==index?'active':''">{{detail.nav}}</li>
                </ul>
                <!-- 行程介绍内容区 -->
                <a href="javascript:;"  :id="index+'n'" v-for="(detail,index) in navList" v-if="detail.nav=='参考行程'"></a>
                <a href="javascript:;" id="trip-day"></a> 
                <div class="trip-introduce">
                    <h1>行程安排</h1>
                    <div> 
                        <!-- 行程安排 -->
                        <div class="trip-introduce-last" :id="'trip'+(index+1)" v-for="(sche,index) in scheduleList" >
                            <a href="javascript:;" :id="index+1" ></a>
                                <div class="trip-plan" >
                                    <p class="plan-day">D{{sche.dayindex}}<i>{{sche.daytitle}}</i></p>
                                    <div class="content-main">
                                    <i v-if="sche.allday"></i>
                                    <div class="plan-main">
                                        {{sche.allday}}
                                    </div>
                                    <div class="plan-main-images">
                                        <div v-for="img in sche.imgs">
                                            <img :src="img.imgUrl"  alt="">
                                            <p>{{img.scenicSpotName}}</p>
                                        </div>
                                    </div>
                                    <div class="plan-main">
                                        <p v-if="sche.hotel!=null"><i class="plan-main-hotel" v-if="sche.hotel.hotelname!=''"></i>{{sche.hotel.hotelname}}</p>
                                    </div>
                                    <div class="plan-main-eat" v-if="sche.dinners.length!=0">
                                        <p>
                                            <i v-if="sche.schRepast!=0"></i>
                                        </p>
                                    </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
                <!-- 接待 -->
                <a href="javascript:;"  :id="index+'n'" v-for="(detail,index) in navList" v-if="detail.nav=='接待标准'"></a>
                <a href="javascript:;"  id="standard"></a>
                <div class="standard">
                    <h1>接待标准</h1>
                    <div>
                        <p>住宿标准:（行程中入住酒店所用房型以酒店对外公布房型为准）不提供自然单间，产生自然单间的，安排三人房或补房差。</p>
                        <p>旅游用车:   全程空调旅游车( 景点门票： 行程中所列景点； </p>
                        <p>导游服务： 常规团导游；持证专业导游，幽默风趣耐心解说、贴心细致管家式服务； </p>
                        <p>儿童标准： 2岁以上1.2米以下儿童只含半价餐和车位；超高及其他费用自理； </p>
                        <p>其他服务： 海南旅行社责任险，强烈建议游客自行购买旅游意外险</p>
                    </div>
                </div>
                <!-- 费用明细 -->
                <a href="javascript:;" :id="index+'n'" v-for="(detail,index) in navList" v-if="detail.nav=='费用明细'&&isshowdetail"></a>
                <div class="cost-details" v-if="isshowdetail">
                    <h1>费用明细</h1>
                    <div>
                      <div>
                        <h2>成人报价</h2>
                        <p><span>车费：{{amtInfo.cfenTrafficamount}}元/人</span><span>酒店：{{amtInfo.cfenHotelamount}}元/人</span><span>门票：{{amtInfo.cfenTicketamount}}元/人</span><span>正餐：{{amtInfo.cfenDinneramount}}元/人</span><span>大交通报价：{{amtInfo.cbigtrafficPrice}}元/人</span></p>
                        <h3>成人地接：{{amtInfo.clocalLocalquateprice}}元/人</h3>
                        <h3>成人总价：{{amtInfo.cbigtrafficPrice+amtInfo.clocalLocalquateprice}}元/人</h3>
                      </div>
                      <div>
                        <h2>儿童报价</h2>
                        <p><span>车费：{{amtInfo.efenTrafficamount}}元/人</span><span>正餐：{{amtInfo.efenDinneramount}}元/人</span><span>大交通报价：{{amtInfo.ebigtrafficPrice}}元/人</span></p>
                        <h3>儿童地接：{{amtInfo.elocalLocalquateprice}}元/人</h3>
                        <h3>儿童总价：{{amtInfo.ebigtrafficPrice+amtInfo.elocalLocalquateprice}}元/人</h3>
                      </div>
                      <div>
                        <h2>总价结算</h2>
                        <span>{{(amtInfo.cbigtrafficPrice+amtInfo.clocalLocalquateprice)*psQuickQuotation.adultqty+(amtInfo.ebigtrafficPrice+amtInfo.elocalLocalquateprice)*psQuickQuotation.childrenqty}}</span>
                      </div>
                    </div>
                </div>
                <!-- 费用说明 -->
                <a href="javascript:;"  :id="index+'n'" v-for="(detail,index) in navList" v-if="detail.nav=='费用说明'"></a>
                <div class="cost-that">
                    <h1>费用说明</h1>
                    <div v-if="cost.costinclude">
                      <h2>费用包含</h2>
                      <p v-html="cost.costinclude">{{cost.costinclude}}</p>
                    </div>
                    <div v-if="cost.costoutofinclude">
                      <h2>费用不包含</h2>
                      <p v-html="cost.costoutofinclude">{{cost.costoutofinclude}}</p>
                    </div>
                </div>
            </div>
            <p class="print"><a href="javascript:;" v-print="'#printTest'">打印报价单</a></p>
        </div>
        <!-- 锚点定位到顶部 -->
        <!-- <div class="anchor-top" v-if="scrollShow">
            <div>
                <a @click.prevent="tripAnchor('top')"><i></i></a>
            </div>
        </div> -->
        <!-- 锚点定位行程天数 -->
        <div class="anchor-trip" v-if=" tripLineShow" >
            <div>
                <a href="javascript:;" v-for="(day,index) in scheduleList.length" @click.prevent="locateAt(day,index)"  :class="tripIndex==index?'active':''">第{{day}}天</a>
                <i></i>
            </div>
        </div>
        <div id="printTest" >
  　　　　　<div class="print-info">
              <h2>编号：{{psQuickQuotation.orderno}}<span>报价时间：{{psQuickQuotation.createddate}}</span></h2>
              <p>{{psQuickQuotation.subjectname}}</p>
              <div>
                <div>
                  <h2 class="print-title"><img src="../assets/images/kehuxinxi.png" alt="">客户信息</h2>
                  <div class="customer">
                    <div>
                      <p><label for="">客户名称：</label><span>{{psQuickQuotation.customername}}</span></p>
                      <p><label for="">联系电话：</label><span>{{psQuickQuotation.phone}}</span></p>
                      <p><label for="">出团日期：</label><span>{{psQuickQuotation.tourdate}}</span></p>
                      <p><label for="">行程天数：</label><span>{{psQuickQuotation.traveldays}}</span></p>
                    </div>
                    <div>
                      <p><label class="esp" for="">联系人：</label><span>{{psQuickQuotation.contact}}</span></p>
                      <p><label for="">团队人数：</label><span><i>成人{{psQuickQuotation.adultqty}}</i><i>/儿童{{psQuickQuotation.childrenqty}}</i></span></p>
                      <p><label for="">回程日期：</label><span>{{psQuickQuotation.enddate}}</span></p>
                      <p v-if="psQuickQuotation.email!=''&&psQuickQuotation.email!=null"><label for="">电子邮件：</label><span>{{psQuickQuotation.email}}</span></p>
                    </div> 
                  </div>
                </div>
                <div>
                  <h2 class="print-title"><img src="../assets/images/dajiaotong.png" alt="">大交通信息</h2>
                  <ul class="print-tra">
                      <li v-for="(tra,index) in bigTraffic" v-if="bigTrafficType==4">
                          <span v-if="index==0">去程</span>
                          <span v-if="index==1">回程</span>
                          <div>
                              <div>
                                  <h2>{{tra.todeptime}}</h2>
                                  <p>{{tra.todepcity}}</p>
                              </div>
                              <i></i>
                              <div>
                                  <h2>{{tra.toarrtime}}</h2>
                                  <p>{{tra.toarrcity}}</p>
                              </div>
                          </div>
                          <span class="esp">{{tra.toflightno}}</span>
                      </li>
                        <li v-for="(tra,index) in bigTraffic" v-if="bigTrafficType==1">
                          <span v-if="index==0">去程</span>
                          <span v-if="index==1">回程</span>
                          <div>
                              <div>
                                  <h2>{{tra.bustime}}</h2>
                                  <p>{{tra.arrcity}}</p>
                              </div>
                              <i></i>
                              <div>
                                  <!-- <h2>{{tra.toarrtime}}</h2> -->
                                  <p>{{tra.depcity}}</p>
                              </div>
                          </div>
                          <span class="esp">{{tra.busno}}</span>
                      </li>
                        <li v-for="(tra,index) in bigTraffic" v-if="bigTrafficType==2">
                          <span v-if="index==0">去程</span>
                          <span v-if="index==1">回程</span>
                          <div>
                              <div>
                                  <h2>{{tra.traintime}}</h2>
                                  <p>{{tra.arrcity}}</p>
                              </div>
                              <i></i>
                              <div>
                                  <!-- <h2>{{tra.toarrtime}}</h2> -->
                                  <p>{{tra.depcity}}</p>
                              </div>
                          </div>
                          <span class="esp">{{tra.trainno}}</span>
                      </li>
                        <li v-for="(tra,index) in bigTraffic" v-if="bigTrafficType==3">
                          <span v-if="index==0">去程</span>
                          <span v-if="index==1">回程</span>
                          <div>
                              <div>
                                  <h2>{{tra.shiptime}}</h2>
                                  <p>{{tra.arrcity}}</p>
                              </div>
                              <i></i>
                              <div>
                                  <!-- <h2>{{tra.toarrtime}}</h2> -->
                                  <p>{{tra.depcity}}</p>
                              </div>
                          </div>
                          <span class="esp">{{tra.shipno}}</span>
                      </li>
                  </ul>
                </div>
                <div>
                  <h2 class="print-title"><img src="../assets/images/zonghebaojia.png" alt="">综合报价</h2>
                  <div class="offer">
                    <div>
                      <p><label for="">成人大交通：</label>{{amtInfo.cbigtrafficPrice}}元/人</p>
                      <p><label for="">成人地接：</label>{{amtInfo.clocalLocalquateprice}}元/人</p>
                      <p><label for="">成人总价：</label>{{amtInfo.cbigtrafficPrice+amtInfo.clocalLocalquateprice}}元/人</p>
                    </div>
                    <div>
                      <p><label for="">儿童大交通：</label>{{amtInfo.ebigtrafficPrice}}元/人</p>
                      <p><label for="">儿童地接：</label>{{amtInfo.elocalLocalquateprice}}元/人</p>
                      <p><label for="">儿童总价：</label>{{amtInfo.ebigtrafficPrice+amtInfo.elocalLocalquateprice}}元/人</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="trip-introduce">
              <h1>行程安排</h1>
              <div> 
                  <!-- 行程安排 -->
                  <div class="trip-introduce-last" :id="'trip'+(index+1)" v-for="(sche,index) in scheduleList" >
                    <a href="javascript:;" :id="index+1" ></a>
                    <div class="trip-plan" >
                        <p class="plan-day">D{{sche.dayindex}}<i>{{sche.daytitle}}</i></p>
                        <div class="content-main">
                        <i v-if="sche.allday"></i>
                        <div class="plan-main">
                            {{sche.allday}}
                        </div>
                        <div class="plan-main-images">
                            <div v-for="img in sche.imgs">
                                <img :src="img.imgUrl"  alt="">
                                <p>{{img.scenicSpotName}}</p>
                            </div>
                        </div>
                        <div class="plan-main">
                            <p v-if="sche.hotel!=null"><i class="plan-main-hotel" v-if="sche.hotel.hotelname!=''"></i>{{sche.hotel.hotelname}}</p>
                        </div>
                        <div class="plan-main-eat" v-if="sche.dinners.length!=0">
                            <p>
                                <i v-if="sche.schRepast!=0"></i>
                            </p>
                        </div>
                        </div>
                    </div>
                  </div>
              </div>
            </div>
            <div class="standard">
              <h1>接待标准</h1>
              <div>
                <p>住宿标准:（行程中入住酒店所用房型以酒店对外公布房型为准）不提供自然单间，产生自然单间的，安排三人房或补房差。</p>
                <p>旅游用车:   全程空调旅游车( 景点门票： 行程中所列景点； </p>
                <p>导游服务： 常规团导游；持证专业导游，幽默风趣耐心解说、贴心细致管家式服务； </p>
                <p>儿童标准： 2岁以上1.2米以下儿童只含半价餐和车位；超高及其他费用自理； </p>
                <p>其他服务： 海南旅行社责任险，强烈建议游客自行购买旅游意外险</p>
              </div>
            </div>
            <div class="cost-details" v-if="isshowdetail">
              <h1>费用明细</h1>
              <div>
                <div>
                  <h2>成人报价</h2>
                  <p><span>车费：{{amtInfo.cfenTrafficamount}}元/人</span><span>酒店：{{amtInfo.cfenHotelamount}}元/人</span><span>门票：{{amtInfo.cfenTicketamount}}元/人</span><span>正餐：{{amtInfo.cfenDinneramount}}元/人</span><span>大交通报价：{{amtInfo.cbigtrafficPrice}}元/人</span></p>
                  <h3>成人地接：{{amtInfo.clocalLocalquateprice}}元/人</h3>
                  <h3>成人总价：{{amtInfo.cbigtrafficPrice+amtInfo.clocalLocalquateprice}}元/人</h3>
                </div>
                <div>
                  <h2>儿童报价</h2>
                  <p><span>车费：{{amtInfo.efenTrafficamount}}元/人</span><span>正餐：{{amtInfo.efenDinneramount}}元/人</span><span>大交通报价：{{amtInfo.ebigtrafficPrice}}元/人</span></p>
                  <h3>儿童地接：{{amtInfo.elocalLocalquateprice}}元/人</h3>
                  <h3>儿童总价：{{amtInfo.ebigtrafficPrice+amtInfo.elocalLocalquateprice}}元/人</h3>
                </div>
                <div>
                  <h2>总价结算</h2>
                  <span>{{(amtInfo.cbigtrafficPrice+amtInfo.clocalLocalquateprice)*psQuickQuotation.adultqty+(amtInfo.ebigtrafficPrice+amtInfo.elocalLocalquateprice)*psQuickQuotation.childrenqty}}</span>
                </div>
              </div>
            </div>
            <div class="cost-that">
              <h1>费用说明</h1>
              <div v-if="cost.costinclude">
                <h2>费用包含</h2>
                <p v-html="cost.costinclude">{{cost.costinclude}}</p>
              </div>
              <div v-if="cost.costoutofinclude">
                <h2>费用不包含</h2>
                <p v-html="cost.costoutofinclude">{{cost.costoutofinclude}}</p>
              </div>
            </div>
  　　　 </div>
        <feedBack></feedBack>
       <Footer></Footer>
    </div>
</template>
<script>
  import tools from "../common/tools";
  import {
    getPsCutomInfo,
  } from "../services/index";
  import supplierHeader from "../components/supplier-header.vue";
  import Footer from "../components/footer.vue";
  import feedBack from "../components/feedBack.vue";
  import { log } from "util";
  export default {
    data() {
      return {
        indexImg:0,//默认图片
        navList:[
          {nav:'参考行程'},
          {nav:'接待标准'},
          {nav:'费用明细'},
          {nav:'费用说明'},
        ],//导航列表
        value2:0,
        isHide: false, //
        without: true,
        searchBarFixed: false, //控制说明导航是否吸顶
        detailIndex: 0, //说明导航区默认值
        userType: "", //用户类型
        scheduleList:[],//行程安排
        imgList:[],//封面图片集合
        bigTraffic:[],//大交通信息
        bigTrafficType:'',//大交通类型
        cost:'',//费用包含及不包含
        amtInfo:'',//费用明细
        psQuickQuotation:'',//快速标价相关
        tripIndex:0,
        scrollShow:false,
        tripLineShow:false,
        isshowdetail:false,//是否显示费用明细
        scenicInfoUrl:'',//景区介绍
        notesInfoUrl:'',//旅游注意事项
        hotelInfoUrl:'',//酒店介绍
        charVersionDownloadUrl:'',//文字版
        orgId:'',
        fromName:'',//从哪个页面来
        fromPath:'',//上个页面路径
      };
    },
    methods: {
      // 判断页面滚动高度
      handleScroll() {
        // 计算滚动高度
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        // 计算说明导航距离顶部的高度
        let offsetTop = document.querySelector("#nav").offsetTop;
        // standard
        let standardTop=document.querySelector("#standard").offsetTop - 46;
        // 行程天数开始时距离顶部的高度
        let tripDayTop=document.querySelector("#trip-day").offsetTop - 46;
        let heightArr = [];
        for (let i = 1; i <= this.scheduleList.length ; i++) {
          heightArr.push(document.querySelector("#trip" + i).offsetHeight);
        }
        // 说明导航定位判断
        if (scrollTop > offsetTop) {
          this.searchBarFixed = true;
        } else {
          this.searchBarFixed = false;
          this.detailIndex = 0;
        }
        // 滚动联动
        let navHeight=[];
        for(let n=0;n<this.navList.length;n++){
          let e = document.getElementById(n+'n'); /*以id命名的锚点*/
          let y = e.offsetTop;
          navHeight.push(y);
        }
        // console.log(navHeight,'navHeight')
        for(let m=0;m<navHeight.length;m++){
          // console.log(scrollTop,'scrollTop');
          // console.log(navHeight[m]-50,'navHeight[m]-50');
          // console.log(navHeight[m+1]-50,'navHeight[m+1]-50');
          if(m!=navHeight.length-1&&scrollTop>=navHeight[m]-50&&scrollTop<navHeight[m+1]-50){
            this.detailIndex =m;
          }
          if(m==navHeight.length-1&&scrollTop>=navHeight[m]-50){
             this.detailIndex=m;
          }
        }
        // 回顶部锚点
        if (scrollTop > 2000) {
          this.scrollShow = true;
        } else {
          this.scrollShow = false;
        }

        let sumH = 0;
        for (let i = 0; i < heightArr.length; i++) {
          sumH += heightArr[i];
          // 行程天数锚点显隐
          if (scrollTop > tripDayTop && scrollTop < tripDayTop + heightArr[0]) {
            this.tripLineShow = true;
            this.tripIndex = 0;
          } else if ( scrollTop>standardTop || scrollTop < tripDayTop) {
            this.tripLineShow = false;
            this.tripIndex = 0;
          }
          if (
            scrollTop > tripDayTop + sumH &&
            scrollTop < tripDayTop + sumH + heightArr[i + 1]
          ) {
            this.tripIndex = i + 1;
          }
        }
      },
      //导航锚点定位
      tripAnchor(anchorName) {
        // // 找到锚点
        let anchorElement = document.getElementById(anchorName);
        // 如果对应id的锚点存在，就跳转到锚点
        if (anchorElement) {
          anchorElement.scrollIntoView();
        }
      },
      locateAtNav(e,index){
        e = document.getElementById(e); /*以id命名的锚点*/
        let y = e.offsetTop;
        while ((e = e.offsetParent)) {
          y += e.offsetTop;
        }
        y -= 50; /*悬浮菜单的高度*/
        window.scrollTo(0, y);
        this.detailIndex=index;
      },
      locateAt(e, index) {
        e = document.getElementById(e); /*以id命名的锚点*/
        let y = e.offsetTop;
        while ((e = e.offsetParent)) {
          y += e.offsetTop;
        }
        y -= 130; /*悬浮菜单的高度*/
        window.scrollTo(0, y);
        this.tripIndex = index;
      },
      // 控制返佣价格显示隐藏及文字提示
      commissionFun() {
        this.commissionShow = !this.commissionShow;
        if (this.commissionShow == true) {
          this.commissionText = "隐藏";
        } else if (this.commissionShow == false) {
          this.commissionText = "查看";
        }
      },
      globalFunT() {
        this.isHide = !this.isHide;
      },

      //详情页初始化
      demandDetailsInit() {
        window.scroll(0,0);
        // 获取用户类型
        this.userType = tools.getLocalStorage("userType");
        this.orgId = tools.getLocalStorage("orgId");
        this.fromName = tools.getLocalStorage("fromName");
        this.fromPath = tools.getLocalStorage("fromPath");
        // 获取url中的id
        let params =  this.$route.params.id;
        // 获取详情接口绑定
        getPsCutomInfo(params).then(response => {
          console.log(response);
          if (response.meta.success == true) {
            console.log("方案详情数据获取成功");
            // 行程安排
            this.scheduleList=response.data.travelDays;
            // 大交通类型
            this.bigTrafficType=response.data.bigTrafficType;
            // 大交通信息
            this.bigTraffic=response.data.bigTraffic;
            // 费用相关
            this.cost=response.data.costInclude;
            // 封面图片集合
            this.imgList=response.data.imgs;
            // 文字版
            this.charVersionDownloadUrl=response.data.charVersionDownloadUrl;
            console.log(this.charVersionDownloadUrl,'');
            // 酒店介绍
            this.hotelInfoUrl=response.data.hotelInfoUrl;
            // 景区介绍
            this.scenicInfoUrl=response.data.scenicInfoUrl;
            // 旅游注意事项
            this.notesInfoUrl=response.data.notesInfoUrl;
            // 快速标价主要信息
            this.psQuickQuotation=response.data.psQuickQuotation;
            // 成人儿童等价格
            this.amtInfo=response.data.amtInfo;
            this.isshowdetail=response.data.psQuickQuotation.isshowdetail;
            if(this.isshowdetail==false){
              this.navList=[];
              this.navList.push({nav:'参考行程'},
                {nav:'接待标准'},
                {nav:'费用说明'}
              )
            }
          } else {
            console.log("方案详情数据获取失败");
          }
        })
        .catch(err => {
          console.log("方案详情接口获取异常", err);
        });
      },

      //向上
      prev(){
        this.indexImg--;
        if(this.indexImg==-1){
          this.indexImg=this.imgList.length-1;
          this.$refs.imgbox.style.left=-168*(this.indexImg-2)+'px';
        }
        if(this.indexImg>2){
          this.$refs.imgbox.style.left=-168*(this.indexImg-2)+'px';
        }
        if(this.indexImg==0){
          this.$refs.imgbox.style.left=0+'px';
        }
      },
      //向下
      next(){
        this.indexImg++;
        if(this.indexImg>2&&this.indexImg<this.imgList.length){
          this.$refs.imgbox.style.left=-168*(this.indexImg-2)+'px';
        }
        if(this.indexImg==this.imgList.length){
          this.indexImg=0;
          this.$refs.imgbox.style.left=0;
        }
      },
      // 点击小图
      chooseImg(index){
        this.indexImg=index;
      }
    },
    mounted() {
      window.addEventListener("scroll", this.handleScroll);
    },
    destroyed () {
      window.removeEventListener("scroll", this.handleScroll)
    },
    components: {
      supplierHeader,
      Footer,
      feedBack
    }
  };
</script>

<style lang="scss">
.pc-slide {
	width: 500px;
	margin: 0 auto;
  .swiper-slide{
    width: 100%;
    >a{
      >img{
        width: 100%;
      }
    }
  }
}

.view .swiper-container {
	width: 500px;
	height: 500px;
}

.view .arrow-left {
	background: url('../assets/images/zuojiantou.png') no-repeat left top;
	position: absolute;
	left: 10px;
	top: 50%;
	margin-top: -25px;
	width: 28px;
	height: 51px;
	z-index: 10;
}

.view .arrow-right {
	background: url('../assets/images/zuojiantou.png') no-repeat left bottom;
	position: absolute;
	right: 10px;
	top: 50%;
	margin-top: -25px;
	width: 28px;
	height: 51px;
	z-index: 10;
}

.preview {
	width: 100%;
	margin-top: 10px;
	position: relative;
}

.preview .swiper-container {
	width: 430px;
	height: 82px;
	margin-left: 35px;
}

.preview .swiper-slide {
	width: 87px;
	height: 82px;
  >img{
    width: 87px;
  }
}

.preview .slide6 {
	width: 82px;
}

.preview .arrow-left {
	background: url('../assets/images/zuojiantou.png') no-repeat left top;
	position: absolute;
	left: 10px;
	top: 50%;
	margin-top: -9px;
	width: 9px;
	height: 18px;
	z-index: 10;
}

.preview .arrow-right {
	background: url('../assets/images/youjiantou.png') no-repeat left bottom;
	position: absolute;
	right: 10px;
	top: 50%;
	margin-top: -9px;
	width: 9px;
	height: 18px;
	z-index: 10;
}

.preview img {
	padding: 1px;
}

.preview .active-nav img {
	padding: 0;
	border: 1px solid #F00;
}


@media   print{
  #printTest{
    position: absolute;
    z-index: -1;
    top:0;
    left:0;
    .print-info{
      margin-left: 7px;
      border:1px solid #eee;
      margin-bottom: 29px;
      >h2{
        height: 54px;
        line-height: 54px;
        padding: 0 50px 0 30px;
        border-bottom: 1px solid #eee;
        @include sc(14px,#111);
        >span{
          float: right;
        }
      }
      >p{
        @include sc(24px,#111);
        padding: 0 50px 0 30px;
        margin-bottom: 15px;
        margin-top: 10px;
      }
      >div{
        padding: 0 20px;
        margin-bottom: 29px;
        .print-title{
          @include sc(16px,#111);
          margin-bottom: 5px;
          padding-left: 7px;
          >img{
            @include wh(16px,16px);
            display: inline-block;
            vertical-align: top;
            margin-top: 4px;
            margin-right: 17px;
          } 
        }
        >div,>ul{
          margin-bottom: 10px;
        }
        .customer{
          padding: 16px 12px 6px 40px;
          border:1px solid #e1e1e1;
          >div{
            display: inline-block;
            vertical-align: top;
            &:first-child{
              width: 520px;
              // margin-right: 30px;
            }
            >p{
              @include sc(14px,#111);
              margin-bottom: 10px;
              .esp{
                letter-spacing: 3.5px;
              }
            }
          }
        }
        .offer{
          padding: 13px 13px 13px 40px;
          border:1px solid #e1e1e1;
          >div{
            display: inline-block;
            vertical-align: top;
            &:first-child{
              width:520px;
            }
            >p{
              @include sc(14px,#111);
              margin-bottom: 10px;
              &:last-child{
                margin-bottom: 0;
              }
            }
          }
        }
        .print-tra{
          padding: 0 4px 0 16px;
          border:1px solid #e1e1e1;
          >li{
            padding: 10px 34px 10px 7px;
            &:first-child{
              border-bottom: 1px solid #eee;
            }
            >span{
              display: inline-block;
              vertical-align: middle;
              @include sc(14px,#333);
            }
            >div{
              display: inline-block;
              vertical-align: middle;
              margin:0 100px;
              >div{
                display: inline-block;
                vertical-align: middle;
                >h2{
                  @include sc(18px,#333);
                  width: 100%;
                  text-align: center;
                }
                >p{
                  @include sc(14px,#333);
                  width: 100%;
                  text-align: center;
                }
              }
              >i{
                display: inline-block;
                vertical-align: middle;
                @include wh(20px,6px);
                background: url('../assets/images/zhida.png') no-repeat;
                background-size: 100%;
                margin: 0 40px;
              }
            }
          } 
        }
      }
    }
    .trip-introduce {
      background: #fff;
      border:1px solid #eee;
      > h1 {
        @include sc(24px, #333);
        text-align: center;
        padding: 27px 0;
      }
      > div {
        > div {
          margin: 0 29px;
        }
        .trip-plan {
          &.active {
            padding-top: 80px;
            display: inline-block;
          }
          .plan-day {
            @include sc(40px, #333);
            line-height: 40px;
            margin-bottom: 40px;
            > i {
              @include sc(22px, #333);
              font-style: normal;
              margin-left: 55px;
              display: inline-block;
              vertical-align: middle;
            }
          }
          .plan-line {
            @include sc(12px, #005bac);
            line-height: 12px;
            margin-bottom: 10px;
          }
          .content-main{
            padding-left: 77px;
            display: inline-block;
            margin-bottom: 45px;
            margin-left: 25px;
            border-left:1px solid #f4f4f4;
            position: relative;
            >i{
              display: inline-block;
              @include wh(19px, 20px);
              background: url("../assets/images/xingcheng.png") no-repeat;
              background-size: 100%;
              position: absolute;
              left:-10px;
              top:0;
            }
          }
          .plan-main {
            margin-bottom: 10px;
            @include sc(14px,#333);
            > h3 {
              display: inline-block;
              line-height: 18px;
              margin-bottom: 16px;
              font-size: 18px;
              font-weight: normal;
              background-image: -webkit-linear-gradient(
                0deg,
                #005bac 0%,
                #008871 50%,
                #008c6b 55%,
                #6fba2c 100%
              );
              background-image:linear-gradient(
                0deg,
                #005bac 0%,
                #008871 50%,
                #008c6b 55%,
                #6fba2c 100%
              );
              -webkit-background-clip: text;
              /* 规定背景的划分区域 */
              -webkit-text-fill-color: transparent;
            }
            > h2 {
              @include sc(18px, #333);
              font-weight: normal;
            }
            > p {
              @include sc(14px, #333);
              margin-bottom: 20px;
              > i {
                display: inline-block;
                margin-right: 8px;
              }
            }
            > div {
              margin-bottom: 40px;
              > img {
                @include wh(210px, 118px);
                margin-right: 7px;
              }
            }
            .plan-main-hotel {
              @include wh(19px, 20px);
              background: url("../assets/images/jiudian.png") no-repeat;
              background-size: 100%;
              // margin-top: 5px;
              vertical-align: bottom;
              position: absolute;
              left:-10px;
            }

            .pil-figure-filler{
              padding: 0 !important;
            }
            .in-view-monitored,.pil-figure,.pil-figure-placeholder,.pil-figure-media{
              display: inline-block !important;
            }
          }
          .plan-main-images{
            margin-bottom: 20px;
            >div{
                display: inline-block;
                height:120px !important;
                width:214px !important;
                margin-right: 10px;
                vertical-align: top;
                margin-bottom: 20px;
                position: relative;
                >img{
                    height:120px !important;
                    width:214px !important;
                }
                >p{
                    position: absolute;
                    bottom: 0;
                    left:0;
                    width: 100%;
                    @include sc(13px,#fff);
                    background: rgba(0, 0, 0, 0.5);
                    line-height: 30px;
                    padding-left:10px;
                    box-sizing: border-box;
                }
            }
          }
          .plan-main-eat {
            // margin-bottom: 50px;
            > p {
              @include sc(14px, #666);
              > i {
                display: inline-block;
                @include wh(20px, 20px);
                background: url("../assets/images/canshi.png") no-repeat;
                background-size: 100%;
                // margin-right: 8px;
                // vertical-align: bottom;
                position: absolute;
                left:-10px;
              }
              > span {
                @include sc(14px, #666); // margin-left: 50px;
              }
            }
          }
        }
      }
    }
    .standard,.cost-details,.cost-that{
      background: #fff;
      margin-top: 24px;
      border:1px solid #eee;
      > h1 {
        @include sc(24px, #333);
        text-align: center;
        padding: 27px 0;
      }
    }
    .standard{
      padding: 0 43px 60px;
      @include sc(14px,#333);
      >div{
        >p{
          margin-bottom: 10px;
        }
      }
    }
    .cost-details{
      padding: 0 40px 40px;
      >div{
        >div{
          margin-bottom: 25px;
          >h2{
            @include sc(20px,#333);
            margin-bottom: 20px;
          }
          >p{
            padding-left: 27px;
            margin-bottom: 10px;
            >span{
              @include sc(14px,#333);
              font-weight: lighter;
              margin-right: 120px;
              &:last-child{
                margin-right: 0;
              }
            }
          }
          >h3{
            padding-left: 27px;
            @include sc(16px,#333);
            margin-bottom: 10px;
          }
          >span{
            padding-left: 30px;
            @include sc(34px,#ff8400);
            line-height: 34px;
            &:before{
              content: '￥';
              @include sc(16px,#ff8400);
            }
          }
        }
      }
    }
    .cost-that{
      padding: 0 43px 30px;
      >div{
        margin-bottom: 25px;
        >h2{
          @include sc(16px,#333);
          margin-bottom: 10px;
        }
      }
    }
  }
}
.demand-details {
  position: relative;
  #printTest{
    position: absolute;
    z-index: -1;
    top:0;
    left:0;
  }
  .demand-content {
    background: #f3f3f3;
    padding-bottom: 90px;
    .bread-crumbs{
        @include sc(14px,#999);
        padding: 12px 0;
        width:1180px;
        margin: auto;
        >span,>a{
            @include sc(14px,#666);
        }
    }
    .print{
      text-align: center;
      margin-top: 60px;
      >a{
        display: inline-block;
        @include sc(26px,#fff);
        @include wh(168px,58px);
        line-height: 58px;
        text-align: center;
        background: #ffba00;
        border-radius: 4px;
      }
    }
    >div{
        width: 1180px;
        margin:0 auto 20px;
    }
    .demand-info{
      margin-bottom: 0;
      background: #fff;
      .details-top{
        height: 54px;
        line-height: 54px;
        border-bottom: 1px solid #eee;
        >span{
          @include sc(14px,#111);
          margin-left: 30px;
        }
        >p{
          float: right;
          padding-right: 99px;
          @include sc(14px,#111);
          >a{
            @include sc(14px,#6ea5ff);
            &.esp{
              margin-left: 25px;
            }
          }
        }
      }
      .details-bottom{
        padding-bottom: 20px;
        >h2{
          @include sc(24px,#111);
          padding: 10px 30px;
        }
        .info-con{
          padding: 10px 10px 0 26px;
          >div{
            display: inline-block;
            vertical-align: top;
          }
          .con-left{
            width: 566px;
            .pro-img{
              @include wh(566px,380px);
              >img{
                @include wh(566px,380px);
              }
            }
            .carousel{
              margin-top: 12px;
              padding: 0 7px;
              height: 106px;
              overflow: hidden;
              font-size: 0;
              >div{
                display: inline-block;
                width: 504px;
                overflow: hidden;
                height: 106px;
                position: relative;
                >div{
                  position: absolute;
                  width: auto;
                  min-width: 100%;
                  height: 106px;
                  white-space: nowrap;
                  left:0;
                  >img{
                    @include wh(158px,106px);
                    margin: 0 5px;
                    display: inline-block;
                    vertical-align: top;
                    box-sizing: border-box;
                    &.active{
                      border:2px solid #ffba00;
                    }
                  }
                }
              }
            }
          }
          .con-right{
            margin-left: 7px;
            >div{
              >h2{
                @include sc(16px,#111);
                margin-bottom: 5px;
                >img{
                  @include wh(16px,16px);
                  display: inline-block;
                  vertical-align: top;
                  margin-top: 4px;
                  margin-right: 17px;
                } 
              }
              >div,>ul{
                border:1px solid #e1e1e1;
                width: 565px;
                margin-bottom: 10px;
              }
              .customer{
                padding: 16px 12px 6px;
                >div{
                  display: inline-block;
                  vertical-align: top;
                  &:first-child{
                    width: 270px;
                    margin-right: 30px;
                  }
                  >p{
                    @include sc(14px,#111);
                    margin-bottom: 10px;
                    .esp{
                      letter-spacing: 3.5px;
                    }
                  }
                }
              }
              .offer{
                padding: 13px;
                >div{
                  display: inline-block;
                  vertical-align: top;
                  &:first-child{
                    width:280px;
                  }
                  >p{
                    @include sc(14px,#111);
                    margin-bottom: 10px;
                    &:last-child{
                      margin-bottom: 0;
                    }
                  }
                }
              }
              >ul{
                padding: 0 4px 0 16px;
                >li{
                  padding: 10px 34px 10px 7px;
                  &:first-child{
                    border-bottom: 1px solid #eee;
                  }
                  >span{
                    display: inline-block;
                    vertical-align: middle;
                    @include sc(14px,#333);
                    &.esp{
                      float: right;
                      margin-top: 15px;
                    }
                  }
                  >div{
                    display: inline-block;
                    vertical-align: middle;
                    margin-left: 100px;
                    >div{
                      display: inline-block;
                      vertical-align: middle;
                      >h2{
                        @include sc(18px,#333);
                        width: 100%;
                        text-align: center;
                      }
                      >p{
                        @include sc(14px,#333);
                        width: 100%;
                        text-align: center;
                      }
                    }
                    >i{
                      display: inline-block;
                      vertical-align: middle;
                      @include wh(20px,6px);
                      background: url('../assets/images/zhida.png') no-repeat;
                      background-size: 100%;
                      margin: 0 40px;
                    }
                  }
                } 
              }
            }
          }
        }
      }
    }
    .trip-info{
      .trip-info-nav {
        width: 1180px;
        height: 47px;
        background: #434343;
        padding-left: 16px;
        > li {
          float: left;
          list-style: none;
          @include wh(96px, 47px);
          // background: #fff;
          @include sc(14px, #fff);
          text-align: center;
          line-height: 47px;
          border-bottom:3px solid transparent;
          cursor: pointer;
          &.active {
            @include sc(16px, #fff);
            border-bottom:3px solid #ffba00;
          }
        }
        &.isFixed {
          position: fixed;
          top: 0;
          z-index: 999;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
      }
      .trip-introduce {
        background: #fff;
        > h1 {
          @include sc(24px, #333);
          text-align: center;
          padding: 27px 0;
        }
        > div {
          > div {
            margin: 0 29px;
          }
          .trip-plan {
            &.active {
              padding-top: 80px;
              display: inline-block;
            }
            .plan-day {
              @include sc(40px, #333);
              line-height: 40px;
              margin-bottom: 40px;
              > i {
                @include sc(22px, #333);
                font-style: normal;
                margin-left: 55px;
                display: inline-block;
                vertical-align: middle;
              }
            }
            .plan-line {
              @include sc(12px, #005bac);
              line-height: 12px;
              margin-bottom: 10px;
            }
            .content-main{
              padding-left: 77px;
              display: inline-block;
              margin-bottom: 45px;
              margin-left: 25px;
              border-left:1px solid #f4f4f4;
              position: relative;
              >i{
                display: inline-block;
                @include wh(19px, 20px);
                background: url("../assets/images/xingcheng.png") no-repeat;
                background-size: 100%;
                position: absolute;
                left:-10px;
                top:0;
              }
            }
            .plan-main {
              margin-bottom: 10px;
              @include sc(14px,#333);
              > h3 {
                display: inline-block;
                line-height: 18px;
                margin-bottom: 16px;
                font-size: 18px;
                font-weight: normal;
                background-image: -webkit-linear-gradient(
                  0deg,
                  #005bac 0%,
                  #008871 50%,
                  #008c6b 55%,
                  #6fba2c 100%
                );
                background-image:linear-gradient(
                  0deg,
                  #005bac 0%,
                  #008871 50%,
                  #008c6b 55%,
                  #6fba2c 100%
                );
                -webkit-background-clip: text;
                /* 规定背景的划分区域 */
                -webkit-text-fill-color: transparent;
              }
              > h2 {
                @include sc(18px, #333);
                font-weight: normal;
              }
              > p {
                @include sc(14px, #333);
                margin-bottom: 20px;
                > i {
                  display: inline-block;
                  margin-right: 8px;
                }
              }
              > div {
                margin-bottom: 40px;
                > img {
                  @include wh(210px, 118px);
                  margin-right: 7px;
                }
              }
              .plan-main-hotel {
                @include wh(19px, 20px);
                background: url("../assets/images/jiudian.png") no-repeat;
                background-size: 100%;
                // margin-top: 5px;
                vertical-align: bottom;
                position: absolute;
                left:-10px;
              }

              .pil-figure-filler{
                padding: 0 !important;
              }
              .in-view-monitored,.pil-figure,.pil-figure-placeholder,.pil-figure-media{
                display: inline-block !important;
              }
            }
            .plan-main-images{
              margin-bottom: 20px;
              >div{
                  display: inline-block;
                  height:120px !important;
                  width:214px !important;
                  margin-right: 10px;
                  vertical-align: top;
                  margin-bottom: 20px;
                  position: relative;
                  >img{
                      height:120px !important;
                      width:214px !important;
                  }
                  >p{
                      position: absolute;
                      bottom: 0;
                      left:0;
                      width: 100%;
                      @include sc(13px,#fff);
                      background: rgba(0, 0, 0, 0.5);
                      line-height: 30px;
                      padding-left:10px;
                      box-sizing: border-box;
                  }
              }
            }
            .plan-main-eat {
              // margin-bottom: 50px;
              > p {
                @include sc(14px, #666);
                > i {
                  display: inline-block;
                  @include wh(20px, 20px);
                  background: url("../assets/images/canshi.png") no-repeat;
                  background-size: 100%;
                  // margin-right: 8px;
                  // vertical-align: bottom;
                  position: absolute;
                  left:-10px;
                }
                > span {
                  @include sc(14px, #666); // margin-left: 50px;
                }
              }
            }
          }
        }
      }
      .standard,.cost-details,.cost-that{
        background: #fff;
        margin-top: 24px;
        > h1 {
          @include sc(24px, #333);
          text-align: center;
          padding: 27px 0;
        }
      }
      .standard{
        padding: 0 43px 60px;
        @include sc(14px,#333);
        >div{
          >p{
            margin-bottom: 10px;
          }
        }
      }
      .cost-details{
        padding: 0 40px 40px;
        >div{
          >div{
            margin-bottom: 25px;
            >h2{
              @include sc(20px,#333);
              margin-bottom: 20px;
            }
            >p{
              padding-left: 27px;
              margin-bottom: 10px;
              >span{
                @include sc(14px,#333);
                font-weight: lighter;
                margin-right: 120px;
                &:last-child{
                  margin-right: 0;
                }
              }
            }
            >h3{
              padding-left: 27px;
              @include sc(16px,#333);
              margin-bottom: 10px;
            }
            >span{
              padding-left: 30px;
              @include sc(34px,#ff8400);
              line-height: 34px;
              &:before{
                content: '￥';
                @include sc(16px,#ff8400);
              }
            }
          }
        }
      }
      .cost-that{
        padding: 0 43px 30px;
        >div{
          margin-bottom: 25px;
          >h2{
            @include sc(16px,#333);
            margin-bottom: 10px;
          }
        }
      }
    }   
  }
  .anchor-top {
    width: 1180px;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    > div {
      @include wh(60px, 52px);
      border: 1px solid #ddd;
      position: absolute;
      right: -60px;
      bottom: 200px;
      z-index: 1000;
      box-sizing: border-box;
      > a {
        display: inline-block;
        padding: 10px 15px;
        background: #fff;
        height: 50px;
        width: 58px;
        > i {
          display: inline-block;
          @include wh(18px, 20px);
          background: url("../assets/images/anchor.png") no-repeat;
          background-size: 100%;
          margin-top: 5px;
          margin-left: 5px;
        }
      }
    }
  }
  .anchor-trip {
    width: 1180px;
    position: fixed;
    bottom: -120px;
    left: 50%;
    transform: translateX(-50%);
    > div {
      width: 60px;
      // @include wh(60px,232px);
      border: 1px solid #ddd;
      position: absolute;
      left: -60px;
      bottom: 300px;
      z-index: 1000;
      box-sizing: border-box;
      > a {
        width: 58px;
        display: inline-block;
        height: 60px;
        line-height: 60px; // padding:0 10px;
        text-align: center;
        background: #fff;
        @include sc(14px, #333);
        border-bottom: 1px solid #ddd;
        box-sizing: border-box; // &:last-child{ // height: 50px; // width:58px; // border-bottom:none; // >i{ // display: inline-block; // @include wh(18px,20px); // background: url('../../assets/image/anchor.png') no-repeat;
        // background-size: 100%;
        // margin-top: 5px;
        // margin-left: 5px;
        // }
        // }
        &.active {
          @include sc(14px, #fff);
          background-image: linear-gradient(36deg, #ffba00 0%,#fecd4b 50%, #fde093 100%), 
                            linear-gradient(0deg, #005bac 0%, #008871 50%, #008c6b 55%, #6fba2c 100%);
        }
      }
      > i {
        display: inline-block;
        @include wh(51px, 58px);
        position: absolute;
        top: -45px;
        left: -26px;
        z-index: -1;
        background: url("../assets/images/w.png") no-repeat;
        background-size: 100%;
      }
    }
  }
}
</style>
