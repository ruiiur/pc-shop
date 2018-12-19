<!--这是详情页面-->
<template>
    <div class="details" @click="globalFun">
       <a href="javascript:;" id="top"></a>
        <!-- 供应商导航引入 -->
        <supplierHeader  :without="without"  :isHide="isHide" @global="globalFunT" @refreshList="detailsInit"></supplierHeader>
        <div class="details-content">
            <p v-if="navObj.type==1"><span @click.stop.prevent="routetypeToList(navObj.address.routetype)">{{navObj.address.routetype}}</span> ><span> {{navObj.address.province}}</span> > <span class="esp" @click.stop.prevent="cityToList(navObj.address.city)">{{navObj.address.city.destname}}旅游</span>
                  <a :href="'#/supplier/'+productDetails.orgid" target="_blank">
                        <img :src="supplierInfo.logo" alt="">
                        <span>{{supplierInfo.travelName}}</span>
                  </a>
            </p>
            <p v-if="navObj.type==2"><span @click.stop.prevent="routetypeToList(navObj.address.routetype)">{{navObj.address.routetype}}</span> >  <span class="esp" @click.stop.prevent="cityToList(navObj.address.country)">{{navObj.address.country.destname}}</span>
                  <a :href="'#/supplier/'+productDetails.orgid" target="_blank">
                        <img :src="supplierInfo.logo" alt="">
                        <span>{{supplierInfo.travelName}}</span>
                  </a>
            </p>
            <p class="bread-crumbs">您当前所在位置：<a :href="'#/supplier?orgId=' + orgId" v-if="fromName!='首页'">首页 > </a><a :href="fromPath">{{fromName}} > </a><span>详情</span></p>
            <div>
                <!-- 产品详情区 -->
                <div class="product-info">
                    <div>
                      <div class="pro-tour">
                        <div class="pro-img">
                         <img v-for="(img,index) in imageList" v-if="index==indexImg" :src="img.imagesrc" alt="">
                          <!-- <img :src="productDetails.coverimg" alt=""> -->
                          <span>{{indexImg+1}}/{{imageList.length}}</span>
                        </div>
                        <div class="carousel">
                          <a href="javascript:;" @click="prev()"><img src="../assets/images/zuojiantou.png" alt=""></a>
                          <div>
                            <div ref="imgbox">
                              <img v-for="(a,index) in imageList" :class="indexImg==index?'active':''"  @click="chooseImg(index)" :src="a.imagesrc" alt="">
                            </div>
                          </div>
                          <a href="javascript:;"  @click="next()"><img src="../assets/images/youjiantou.png" alt=""></a>
                        </div>
                        <div class="calendar">
                          <div class="month-tab">
                              <!-- <a href="javascript:;" class="tab-left"></a> -->
                            <ul>
                                <li v-for="(date,index) in tourList" @click.stop.prevent="indexDate=index" :class="index==indexDate?'active':''">
                                    <a href="javascript:;">
                                        <p>{{date.month}}</p>
                                        <h3 v-if="date.minSalePrice!=0&&userType==1">￥{{date.minSalePrice}}起</h3>
                                        <h3 v-if="date.minDirectPrice!=0&&userType==2">￥{{date.minDirectPrice}}起</h3>
                                        <h3 v-if="date.minSalePrice==0&&userType==1">无班期</h3>
                                        <h3 v-if="date.minDirectPrice==0&&userType==2">无班期</h3>
                                        <!-- <h3>￥{{date.minPrice}}起</h3> -->
                                    </a>
                                </li>
                            </ul>
                            <!-- <a href="javascript:;" class="tab-right"></a> -->
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
                                <li v-for="(i,index) in first" :class="i.price==''?'invalid':(i.selected==true?'act':(i.failure==true?'fail':''))" @click.stop.prevent="selectDateFun(first,index)">
                                    <div>
                                      <i v-if="i.isAck===1&&i.failure==false" class="ack"></i>
                                      <i v-if="i.isTail===1&&i.failure==false" class="tail"></i>
                                      <i v-if="i.useDiscount===true&&i.failure==false" class="discount"></i>
                                    </div>
                                    <p>{{i.day}}</p>
                                    <span v-if="i.remain!=''&&i.remain<10&&i.failure==false"><i v-if="i.remain!=''">余</i>{{i.remain}}</span>
                                    <span v-if="i.remain===0&&i.failure==false">已售完</span>
                                    <span v-if="i.remain!=''&&i.remain>9&&i.failure==false">充足</span>
                                    <h3 v-if="i.failure==false"><span v-if="i.price!=''&&i.failure==false">￥</span>{{i.price}}<span v-if="i.price!=''&&i.failure==false">起</span></h3>
                                </li>
                            </ul>
                            <ul v-if="indexDate==1" :class="arrWeek[1]==1?'one':(arrWeek[1]==2?'two':(arrWeek[1]==3?'three':(arrWeek[1]==4?'four':(arrWeek[1]==5?'five':(arrWeek[1]==6?'six':'')))))">
                                <li v-for="(i,index) in second" :class="i.price==''?'invalid':(i.selected==true?'act':(i.failure==true?'fail':''))" @click.stop.prevent="selectDateFun(second,index)">
                                  <div>
                                    <i v-if="i.isAck===1&&i.failure==false" class="ack"></i>
                                    <i v-if="i.isTail===1&&i.failure==false" class="tail"></i>
                                    <i v-if="i.useDiscount===true&&i.failure==false" class="discount"></i>
                                  </div>
                                  <p>{{i.day}}</p>
                                  <span v-if="i.remain!=''&&i.remain<10&&i.failure==false"><i v-if="i.remain!=''">余</i>{{i.remain}}</span>
                                  <span v-if="i.remain===0&&i.failure==false">已售完</span>
                                  <span v-if="i.remain!=''&&i.remain>9&&i.failure==false">充足</span>
                                  <h3 v-if="i.failure==false"><span v-if="i.price!=''&&i.failure==false">￥</span>{{i.price}}<span v-if="i.price!=''&&i.failure==false">起</span></h3>
                                </li>
                            </ul>
                            <ul v-if="indexDate==2" :class="arrWeek[2]==1?'one':(arrWeek[2]==2?'two':(arrWeek[2]==3?'three':(arrWeek[2]==4?'four':(arrWeek[2]==5?'five':(arrWeek[2]==6?'six':'')))))">
                                <li v-for="(i,index) in three" :class="i.price==''?'invalid':(i.selected==true?'act':(i.failure==true?'fail':''))" @click.stop.prevent="selectDateFun(three,index)">
                                  <div>
                                    <i v-if="i.isAck===1&&i.failure==false" class="ack"></i>
                                    <i v-if="i.isTail===1&&i.failure==false" class="tail"></i>
                                    <i v-if="i.useDiscount===true&&i.failure==false" class="discount"></i>
                                  </div>
                                  <p>{{i.day}}</p>
                                  <span v-if="i.remain!=''&&i.remain<10&&i.failure==false"><i v-if="i.remain!=''">余</i>{{i.remain}}</span>
                                  <span v-if="i.remain===0&&i.failure==false">已售完</span>
                                  <span v-if="i.remain!=''&&i.remain>9&&i.failure==false">充足</span>
                                  <h3 v-if="i.failure==false"><span v-if="i.price!=''&&i.failure==false">￥</span>{{i.price}}<span v-if="i.price!=''&&i.failure==false">起</span></h3>
                                </li>
                            </ul>
                            <ul v-if="indexDate==3" :class="arrWeek[3]==1?'one':(arrWeek[3]==2?'two':(arrWeek[3]==3?'three':(arrWeek[3]==4?'four':(arrWeek[3]==5?'five':(arrWeek[3]==6?'six':'')))))">
                                <li v-for="(i,index) in four" :class="i.price==''?'invalid':(i.selected==true?'act':(i.failure==true?'fail':''))" @click.stop.prevent="selectDateFun(four,index)">
                                    <div>
                                      <i v-if="i.isAck===1&&i.failure==false" class="ack"></i>
                                      <i v-if="i.isTail===1&&i.failure==false" class="tail"></i>
                                      <i v-if="i.useDiscount===true&&i.failure==false" class="discount"></i>
                                    </div>
                                    <p>{{i.day}}</p>
                                    <span v-if="i.remain!=''&&i.remain<10&&i.failure==false"><i v-if="i.remain!=''">余</i>{{i.remain}}</span>
                                    <span v-if="i.remain===0&&i.failure==false">已售完</span>
                                    <span v-if="i.remain!=''&&i.remain>9&&i.failure==false">充足</span>
                                    <h3 v-if="i.failure==false"><span v-if="i.price!=''&&i.failure==false">￥</span>{{i.price}}<span v-if="i.price!=''&&i.failure==false">起</span></h3>
                                </li>
                            </ul>
                            <p></p>
                          </div>
                        </div>
                      </div>
                      <div class="pro-con">
                        <h2><span>{{productDetails.aliasename}}</span><span><img src="../assets/images/xing.png" v-for="n in productDetails.starlevel" alt=""></span></h2>
                        <p class="prono">产品编号：{{productDetails.prono}} <span>{{productDetails.procategory}}</span></p>
                        <p class="pro-tags"><i v-for="tag in productTags.length" @click.stop.prevent="tagsChoose(productTags,tag)">{{productTags[tag-1]}}</i></p>
                        <h1 class="pro-price" v-if="chooseNowPrice==''">现价：<span class="new-price">{{nowPrice}}</span><span class="old-price" v-if="oldPrice!=nowPrice">原价：<i>￥{{oldPrice}}</i></span></h1>
                        <h1 class="pro-price" v-if="chooseNowPrice!=''">现价：<span class="new-price">{{chooseNowPrice}}</span><span class="old-price" v-if="chooseOldPrice!=''">原价：<i>￥{{chooseOldPrice}}</i></span></h1>
                        <p class="pro-destination">目的地：{{productDestination}}</p>
                        <p class="pro-departures">出发地：<span v-for="(or,index) in departuresList">{{or.departure}}<i v-if="index!=departuresList.length-1">、</i></span></p>
                        <div class="price-policy">
                          <div class="origin-con">
                            <label>出发城市：</label>
                            <span>{{departureCity}}</span>
                            <a href="javascript:;" v-if="!originShow" @click.stop.prevent="originShow=!originShow">更改</a>
                            <!-- <ul v-if="originShow" @click.stop="originShow=originShow">
                              <li :class="deIndex==index?'active':''" @click.stop.prevent="selectedOrigin(index,de)" v-for="(de,index) in departuresList">{{de.departure}}</li>
                            </ul> -->
                            <div class="select-box" v-if="originShow"  @click.stop.prevent="originShow=true">
                              <Tabs type="card">
                                <TabPane label="推荐"><a href="javascript:;" @click.stop.prevent="selectedOriginT">{{departureCityT.departure}}</a></TabPane>
                                <TabPane :label="key" v-for="(dep,key) in departuresGroup" :key="dep" v-if="dep.length!=0"><a href="javascript:;" v-for="(city,index) in dep" @click.stop.prevent="selectedOrigin(index,city)">{{city.departure}}</a></TabPane>
                              </Tabs>
                            </div>
                          </div>
                          <p v-if="pricePolicyList.length!=0"><label>出游日期：</label><span>{{tourStartMonth}}-{{tourStartDay}}出发 至 {{tourEndMonth}}-{{tourEndDay}}返回</span></p>
                          <!-- <p v-if="pricePolicyList.length!=0&&userType==1"><label>佣金金额：</label><a href="javascript:;" @click.stop.prevent="commissionFun()">{{commissionText}}</a></p> -->
                          <div class="policy-con" v-if="pricePolicyList.length!=0&&userType==1">
                              <label>出游人数：</label>
                              <div>
                                  <div class="policy-b" v-for="(policy,index) in pricePolicyList">
                                    <p class="c-computed">
                                      <i class="reduce" @click.stop.prevent="reduceCount(pricePolicyList,policy)"></i> 
                                      <input @blur="changeCount(policy)" v-model="policy.count"/>
                                      <i class="add" @click.stop.prevent="addCount(pricePolicyList,policy)"></i>
                                      <span>￥{{policy.salesPrice}}<i>/{{policy.policyName}}</i></span>
                                      <span v-if="policy.beforeDiscountDirectPrice!=null"><i>直客价</i>￥{{policy.beforeDiscountDirectPrice}}</span>
                                      <span v-if="policy.beforeDiscountDirectPrice==null"><i>直客价</i>￥{{policy.directPrice}}</span>
                                      <span><i>返</i>￥{{policy.rebatePrice}}</span>
                                    </p>
                                    <p class="c-old" v-if="policy.beforeDiscountSalesPrice!=null"><span>原价：<i>￥{{policy.beforeDiscountSalesPrice}}</i></span><em>优惠{{policy.discountSalesPrice}}元</em></p>
                                  </div>
                              </div>
                          </div>
                          <div class="policy-con" v-if="pricePolicyList.length!=0&&userType==2">
                              <label>出游人数：</label>
                              <div>
                                  <p class="policy-c" v-for="(policy,index) in pricePolicyList"><i class="reduce" @click.stop.prevent="reduceCount(pricePolicyList,policy)"></i><input @blur="changeCount(policy)" v-model="policy.count"/><i class="add" @click.stop.prevent="addCount(pricePolicyList,policy)"></i>
                                  <span class="c-price">￥{{policy.directPrice}}<i>/{{policy.policyName}}</i></span>
                                  <span class="dis-c" v-if="policy.beforeDiscountDirectPrice!=null">原价：<i>￥{{policy.beforeDiscountDirectPrice}}</i></span><em v-if="policy.beforeDiscountDirectPrice!=null">已优惠{{policy.discountDirectPrice}}元</em></p>
                              </div>
                          </div>
                          <div class="reserve-btn">
                            <div class="reserve-price">
                              <h1 :class="discountPrice==0?'esp':''">总计：<span>{{sumPrice}}</span></h1>
                              <p v-if="discountPrice!=0">已优惠{{discountPrice}}元</p>
                            </div>
                            <p class="price-btn"><a href="javascript:;" @click="nextFun()">立即预定</a></p>
                          </div>
                        </div>
                        <div class="travel-pro">
                          <!-- v-if="index<numSch" -->
                          行程概要：<p v-for="(sche,index) in scheduleList" >D{{sche.schDay}}<span>{{sche.schName}}</span>
                          <!-- <i>></i> -->
                          </p>
                          <!-- <div>
                            <a href="javascript:;" v-if="scheduleList.length>2&&numSch<scheduleList.length" @click="numSch=scheduleList.length+1" class="schedule-more">更多</a>
                            <a href="javascript:;" v-if="scheduleList.length>2&&numSch>scheduleList.length" @click="numSch=2" class="schedule-more">收起</a>
                          </div> -->
                        </div>
                      </div>
                    </div>
                </div>
                <!-- 行程介绍及一些说明区 -->
                <div class="trip-info">
                    <!-- 导航 -->
                    <div class="trip-info-nav" :class="searchBarFixed == true ? 'isFixed' :''" id="nav">
                      <ul>
                        <li v-for="(detail,index) in navList" @click.stop.prevent="locateAtNav(index+'n',index)" :class="detailIndex==index?'active':''">{{detail.nav}}</li>
                      </ul>
                      <div class="service" v-if="serviceTel!=''&&serviceTel!=null && serviceTel!='null'">
                        <p class="service-tel"><img src="../assets/images/kefu.png" alt="">{{serviceTel}}</p>
                        <p class="service-tip">如有疑问，可拨打客服电话咨询</p>
                      </div>
                    </div>
                    <!-- 线路团期 -->
                    <a href="javascript:;" :id="index+'n'" v-for="(detail,index) in navList" v-if="detail.nav=='线路团期'"></a>
                    <div class="trip-tour">
                      <h1>线路团期</h1>
                      <div>
                        <p>线路团期：</p>
                        <div class="tour-details">
                          <div v-for="(mon,index) in tourString">
                            <i v-if="mon.day.length!=0">【{{mon.month}}】</i>
                            <span v-for="dayi in mon.day.length">{{mon.day[dayi-1]}}<i v-if="dayi!=mon.day.length">、</i></span>
                          </div>
                          <!-- <div>
                            <i>【2018年11月】</i>
                            <span>29日</span>、<span>30日</span>、<span>29日</span>、<span>30日</span>、<span>29日</span>、<span>30日</span>、<span>29日</span>、<span>30日</span>、<span>29日</span>、<span>30日</span>、<span>29日</span>、<span>30日</span>
                          </div>
                          <div>
                            <i>【2018年11月】</i>
                            <span>29日</span>、<span>30日</span>、<span>29日</span>、<span>30日</span>、<span>29日</span>、<span>30日</span>、<span>29日</span>、<span>30日</span>、<span>29日</span>、<span>30日</span>
                          </div> -->
                        </div>
                      </div>
                    </div>
                    <!-- 产品描述 -->
                    <a href="javascript:;" :id="index+'n'" v-for="(detail,index) in navList" v-if="detail.nav=='产品描述'"></a>
                    <div class="trip-summary" v-if="productDetails.summary">
                      <h1>产品描述</h1>
                      <div>
                          <div>
                              <p v-html="productDetails.summary">{{productDetails.summary}}</p>
                          </div>
                          <!-- <a href="javascript:;" id="features" :class="searchBarFixed == true ? 'esp' :''"></a> -->
                      </div>
                    </div>
                    <!-- 产品特色 -->
                    <a href="javascript:;"  :id="index+'n'" v-for="(detail,index) in navList" v-if="detail.nav=='产品特色'"></a>
                    <div class="trip-features" v-if="productDetails.feature">
                        <h1>产品特色</h1>
                        <div>
                            <div>
                                <!-- <h4 v-if="productDetails.feature">产品特色</h4> -->
                                <p v-html="productDetails.feature">{{productDetails.feature}}</p>
                            </div> 
                        </div>
                    </div>
                    <!-- 行程介绍内容区 -->
                    <a href="javascript:;"  :id="index+'n'" v-for="(detail,index) in navList" v-if="detail.nav=='行程安排'"></a>
                    <a href="javascript:;" id="trip-day"></a> 
                    <div class="trip-introduce">
                        <h1>行程安排</h1>
                        <a href="javascript:;" class="download-trip" @click="updateTrip">{{updateText}}</a>
                        <!-- <a href="http://m.tuniucdn.com/fb2/t1/G5/M00/B9/EC/Cii-slwE2_eIa1BzAAmIAmHQkj0AARLlwPFcpwACYga556.pdf" class="download-trip">途下载行程</a> -->
                        <!-- <button type="button" class="btn btn-primary download-trip"v-on:click="getPdf()">导出PDF</button> -->
                        <div> 
                            <!-- 行程安排 -->
                            <div class="trip-introduce-last" :id="'trip'+(index+1)" v-for="(sche,index) in scheduleList" >
                                <a href="javascript:;" :id="index+1" ></a>
                                  <div class="trip-plan" >
                                      <p class="plan-day">D{{sche.schDay}}<i>{{sche.schName}}</i></p>
                                      <div class="content-main">
                                        <i v-if="sche.schInfo"></i>
                                        <div class="plan-main" v-html="sche.schInfo">
                                          {{sche.schInfo}}
                                        </div>
                                        <div class="plan-main-images">
                                          <div v-for="img in sche.images">
                                              <img :src="img.imagesrc"  alt="">
                                              <p>{{img.imageinfo}}</p>
                                          </div>
                                        </div>
                                        <div class="plan-main">
                                            <p><i class="plan-main-hotel" v-if="sche.schStay!=''"></i>{{sche.schStay}}</p>
                                        </div>
                                        <div class="plan-main-eat" v-if="sche.schRepast!=0">
                                            <p>
                                                <i v-if="sche.schRepast!=0"></i>
                                                <span v-if="sche.schRepast==1">有早餐</span>
                                                <span v-if="sche.schRepast==2">有午餐</span>
                                                <span v-if="sche.schRepast==4">有晚餐</span>
                                                <span v-if="sche.schRepast==5">有早餐 有晚餐</span>
                                                <span v-if="sche.schRepast==3">有早餐 有午餐</span>
                                                <span v-if="sche.schRepast==6">有午餐 有晚餐</span>
                                                <span v-if="sche.schRepast==7">有早餐 有午餐 有晚餐</span>
                                            </p>
                                        </div>
                                      </div>
                                  </div>
                            </div>
                        </div>
                    </div>
                    <!-- 大交通 -->
                    <a href="javascript:;"  :id="index+'n'" v-for="(detail,index) in navList" v-if="detail.nav=='大交通'"></a>
                    <div class="trip-traff">
                      <h1>大交通</h1>
                      <p>交通类型 :<span v-if="productDetails.traffictype==9">机票<img src="../assets/images/feiji.png" alt=""></span><span v-if="productDetails.traffictype==10">火车票<img src="../assets/images/huoche.png" alt=""></span><span v-if="productDetails.traffictype==11">汽车票<img src="../assets/images/qiche.png" alt=""></span><span v-if="productDetails.traffictype==12">船票<img src="../assets/images/chuan.png" alt=""></span></p>
                      <div class="trip-introduce-first">
                        <!-- 参考航班 -->
                        <p class="flight-tip" v-if="trafficList.length==0"></p>
                        <div class="trip-line" v-for="traffic in trafficList" v-if="traffic.datastatus==1">
                          <span>去程</span>
                          <div class="flight-path">
                              <!-- <i></i> -->
                              <h2>{{traffic.depname}}</h2>
                              <h1>{{traffic.deptime}}</h1>
                          </div>
                          <p class="flight-line"></p>
                          <div class="flight-path">
                              <!-- <i></i> -->
                              <h2>{{traffic.arrname}}</h2>
                              <h1>{{traffic.arrtime}}</h1>
                          </div>
                          <div class="flight-info">
                              <p>{{traffic.airline}}</p>
                              <p>{{traffic.flightno}}</p>
                          </div>
                        </div>
                        <div class="trip-line" v-for="traffic in trafficList" v-if="traffic.datastatus==2">
                          <span>回程</span>
                          <div class="flight-path">
                              <!-- <i></i> -->
                              <h2>{{traffic.depname}}</h2>
                              <h1>{{traffic.deptime}}</h1>
                          </div>
                          <p class="flight-line"></p>
                          <div class="flight-path">
                              <!-- <i></i> -->
                              <h2>{{traffic.arrname}}</h2>
                              <h1>{{traffic.arrtime}}</h1>
                          </div>
                          <div class="flight-info">
                              <p>{{traffic.airline}}</p>
                              <p>{{traffic.flightno}}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- 价格说明 -->
                    <a href="javascript:;"  :id="index+'n'" v-for="(detail,index) in navList" v-if="detail.nav=='价格说明'"></a>
                    <a href="javascript:;" id="price"></a>
                    <div class="trip-price" v-if="productDetails.feeincludes || productDetails.feenonincludes">
                        <h1>价格说明</h1>
                        <div>
                            <div class="con-esp">
                                <h4 v-if="productDetails.feeincludes">价格包含</h4>
                                <p v-html="productDetails.feeincludes">{{productDetails.feeincludes}}</p>
                            </div>
                            <div>
                                <h4 v-if="productDetails.feenonincludes">价格不包含</h4>
                                <p v-html="productDetails.feenonincludes">{{productDetails.feenonincludes}}</p>
                            </div>
                            <!-- <a href="javascript:;" id="reservation"></a> -->
                        </div>
                    </div>
                    <!-- 预定须知 -->
                    <a href="javascript:;"  :id="index+'n'" v-for="(detail,index) in navList" v-if="detail.nav=='预定须知'"></a>
                    <div class="trip-reservation" v-if="productDetails.attention">
                        <h1>预定须知</h1>
                        <div>
                            <div>
                                <!-- <h4>预定须知</h4> -->
                                <p v-html="productDetails.attention">{{productDetails.attention}}</p>
                            </div>
                            <!-- <a href="javascript:;" id="change"></a> -->
                        </div>
                    </div>
                    <!-- 退改规则 -->
                    <a href="javascript:;"  :id="index+'n'" v-for="(detail,index) in navList" v-if="detail.nav=='退改规则'"></a>
                    <div class="trip-change" v-if="productDetails.bactorule">
                        <h1>退改规则</h1>
                        <div>
                            <div>
                                <!-- <h4>退改规则</h4> -->
                                <p v-html="productDetails.bactorule">{{productDetails.bactorule}}</p>
                            </div>
                            <!-- <a href="javascript:;" id="other"></a> -->
                        </div>

                    </div>
                    <!-- 其他说明 -->
                    <a href="javascript:;" :id="index+'n'" v-for="(detail,index) in navList" v-if="detail.nav=='其他说明'"></a>
                    <div class="trip-other" v-if="productDetails.insurance || productDetails.shopping || productDetails.tips">
                        <h1>其他说明</h1>
                        <div>
                            <div class="con-esp">
                                <h4 v-if="productDetails.insurance">保险说明</h4>
                                <p v-html="productDetails.insurance">{{productDetails.insurance}}</p>
                            </div>
                            <div class="con-esp">
                                <h4 v-if="productDetails.shopping">购物说明</h4>
                                <p v-html="productDetails.shopping">{{productDetails.shopping}}</p>
                            </div>
                            <div>
                                <h4 v-if="productDetails.tips">补充说明</h4>
                                <p v-html="productDetails.tips">{{productDetails.tips}}</p>
                            </div>
                            <a href="javascript:;" id="esp"></a>
                        </div>
                    </div>
                    <!-- 预定流程 -->
                    <a href="javascript:;" :id="index+'n'" v-for="(detail,index) in navList" v-if="detail.nav=='预定流程'"></a>
                    <div class="trip-process">
                      <h1>预定流程</h1>
                      <div>
                        <div class="process-images">
                          <img src="../assets/images/yudingliucheng.png" alt="">
                        </div>
                        <div class="process-text">
                          <div>
                            <h3>1选择产品</h3>
                            <p>在专卖店选择旅游线路，查看产品详情，确定产品后，选择出发日期与出发人数。</p>
                          </div>
                          <div>
                            <h3>2填写信息</h3>
                            <p>核对行程信息，正确填写游客、联系人信息，确认服务协议。</p>
                          </div>
                          <div>
                            <h3>3预定</h3>
                            <p>点击“立即预订”按钮，提交订单。</p>
                          </div>
                          <div>
                            <h3>4专卖店确认</h3>
                            <p>专卖店进行订单确认</p>
                          </div>
                          <div>
                            <h3>5付款/签约</h3>
                            <p>支付订单，签订合约/合同。</p>
                          </div>
                          <div>
                            <h3>6预定成功</h3>
                            <p>预定产品成功</p>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
            <!-- <div class="adver">
                <a :href="'#/supplier/'+adv.supplierid" target="_blank" v-for=" adv in advertisingList">
                  <img :src=" adv.logosrc " alt="">
               </a>
            </div> -->
        </div>
        <!-- 锚点定位到顶部 -->
        <!-- <div class="anchor-top" v-if="scrollShow">
            <div>
                <a @click.prevent="tripAnchor('top')"><i></i></a>
            </div>
        </div> -->
        <!-- 锚点定位行程天数 -->
        <div class="anchor-trip" v-if="tripLineShow">
            <div>
                <a href="javascript:;" v-for="(day,index) in scheduleList.length" @click.prevent="locateAt(day,index)"  :class="tripIndex==index?'active':''">第{{day}}天</a>
                <i></i>
            </div>
        </div>
        <div id="pdfDom"  style="padding-top: 55px;background-color:#fff;">
           <h2>{{logoName}}<span class="service-tel"><img src="../assets/images/fill-kefu.png" alt="">{{serviceTel}}</span></h2>
           <h1>{{productDetails.aliasename}}</h1>
           <p>产品编号：{{productDetails.prono}}</p>
           <div>
             <h2>产品概要</h2>
             <p class="profile"><span>行程天数：{{scheduleList.length}}</span><span>目的地：{{productDestination}}</span><span>出发地：{{departureCity}}</span></p>
           </div>
           <div>
             <h2>产品描述</h2>
             <p v-html="productDetails.summary">{{productDetails.summary}}</p>
           </div>
           <div>
             <h2>产品特色</h2>
             <p v-html="productDetails.feature">{{productDetails.feature}}</p>
           </div>
           <div>
            <h2>行程安排</h2>
            <div class="trip-introduce-last"  v-for="(sche,index) in scheduleList" >
              <div class="trip-plan" >
                <p class="plan-day">D{{sche.schDay}}<i>{{sche.schName}}</i></p>
                  <div class="content-main">
                    <i v-if="sche.schInfo"></i>
                    <div class="plan-main" v-html="sche.schInfo">
                      {{sche.schInfo}}
                    </div>
                    <div class="plan-main">
                        <p><i class="plan-main-hotel" v-if="sche.schStay!=''"></i>{{sche.schStay}}</p>
                    </div>
                    <div class="plan-main-eat" v-if="sche.schRepast!=0">
                        <p>
                            <i v-if="sche.schRepast!=0"></i>
                            <span v-if="sche.schRepast==1">有早餐</span>
                            <span v-if="sche.schRepast==2">有午餐</span>
                            <span v-if="sche.schRepast==4">有晚餐</span>
                            <span v-if="sche.schRepast==5">有早餐 有晚餐</span>
                            <span v-if="sche.schRepast==3">有早餐 有午餐</span>
                            <span v-if="sche.schRepast==6">有午餐 有晚餐</span>
                            <span v-if="sche.schRepast==7">有早餐 有午餐 有晚餐</span>
                        </p>
                    </div>
                  </div>
                </div>
              </div>
           </div>
           <div>
            <h2>价格说明</h2>
            <div class="fill-con">
              <div class="con-esp">
                <h4 v-if="productDetails.feeincludes">价格包含</h4>
                <p v-html="productDetails.feeincludes">{{productDetails.feeincludes}}</p>
              </div>
              <div>
                <h4 v-if="productDetails.feenonincludes">价格不包含</h4>
                <p v-html="productDetails.feenonincludes">{{productDetails.feenonincludes}}</p>
              </div>
            </div>
           </div>
           <div>
            <h2>预定须知</h2>
            <p v-html="productDetails.attention">{{productDetails.attention}}</p>
           </div>
           <div>
             <h2>退改规则</h2>
             <p v-html="productDetails.bactorule">{{productDetails.bactorule}}</p>
           </div>
           <div>
            <h2>其他说明</h2>
            <div class="fill-con">
              <div class="con-esp">
                  <h4 v-if="productDetails.insurance">保险说明</h4>
                  <p v-html="productDetails.insurance">{{productDetails.insurance}}</p>
              </div>
              <div class="con-esp">
                  <h4 v-if="productDetails.shopping">购物说明</h4>
                  <p v-html="productDetails.shopping">{{productDetails.shopping}}</p>
              </div>
              <div>
                  <h4 v-if="productDetails.tips">补充说明</h4>
                  <p v-html="productDetails.tips">{{productDetails.tips}}</p>
              </div>
            </div>
           </div>
        </div>
        <feedBack :isShow="isShow"></feedBack>
       <Footer></Footer>
    </div>
</template>
<script>
// import { mapState, mapActions, mapMutations } from "vuex";
import tools from "../common/tools";
import {
  getDetails,
  getProductDepartures,
  getPolicysList,
  getTours,
  getValidateDetails,
  // getNavigation,
  visits,
  saveRecoding,
  outRecoding,
  GetCustomerServiceInfo
  // getAdSupplierRecommend
} from "../services/index";
import supplierHeader from "../components/supplier-header.vue";
import Footer from "../components/footer.vue";
import feedBack from "../components/feedBack.vue";
import { log } from "util";
import { setInterval } from 'timers';
export default {
  data() {
    return {
      imageList:[],//产品图片
      navList:[],//导航列表
      isHide: false, //
      isShow:true,
      advertisingList: [], //广告页面
      classShow: false, //
      tripIndex: 0, //行程天数默认值
      without: true,
      tripLineShow: false, //行程天数锚点定位
      scrollShow: false, //回顶部锚点显隐
      commissionText: "查看", //控制佣金提示文字
      // commissionShow: false, //控制佣金显隐
      productDestination: "", //产品目的地
      productPrice: "", //产品价格
      productTags: [], //产品标签
      scheduleList: [], //产品行程介绍
      trafficList: [], //产品参考航班
      productDetails: {}, //产品详情
      searchBarFixed: false, //控制说明导航是否吸顶
      departuresList: [], //出发地列表
      departureCity: "", //出发城市
      detailIndex: 0, //说明导航区默认值
      originShow: false, //更改出发地弹框显隐
      deIndex: 0, //出发地弹框默认值
      selectedDay: "", //选择的日期
      pricePolicyList: [], //价格策略列表
      sumPrice: 0, //总计价格
      countArr: [], //选择人数数组
      policyIdArr: [], //选择的价格策略对应的id数组
      // startTour:'',//开始日期
      // endTour:'',//结束日期
      // 出游日期年月日
      tourStartYear: "",
      tourStartMonth: "",
      tourStartDay: "",
      tourEndYear: "",
      tourEndMonth: "",
      tourEndDay: "",
      supplierInfo: {},
      // 团期相关
      tourList:[],//团期列表
      indexDate:0,//显示第一个月的日期
      tour:[],//返回的团期
      first:[],
      second:[],
      three:[],
      four:[],
      arrWeek:[],
      firstCopy:[],
      secondCopy:[],
      threeCopy:[],
      fourCopy:[],
      arrLastDay:[],
      dayF:[],
      dayS:[],
      dayT:[],
      dayFour:[],
      tourString:[],


      navObj: {}, //面包屑导航
      routetypeid: "", //线路类型
      userType: "", //用户类型
      userId:'',//用户id
      windowUrl:'',//当前页面url
      orgId:'',
      fromName:'',//从哪个页面来
      fromPath:'',//上个页面路径
      numSch:2,//行程展开收起默认值
      serviceTel:'',//客服电话
      htmlTitle: '行程文件',
      logoName:'',//供应商名称
      updateText:'下载行程',
      indexImg:0,
      oldPrice:'',//原价
      nowPrice:'',//现价
      discountPrice:0,//总优惠金额
      departuresGroup:[],//分组出发地
      departureCityT:'',//推荐城市
      nextTimer:null,
      chooseOldPrice:'',//选择后的原价
      chooseNowPrice:'',//选择后的现价
    };
  },
  methods: {
  // 加
  add(a, b) {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (this.mul(a, e) + this.mul(b, e)) / e;
  },
  // 减
  sub(a, b) {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (this.mul(a, e) - this.mul(b, e)) / e;
  },
  //乘
  mul(a, b) {
    var c = 0,
        d = a.toString(),
        e = b.toString();
    try {
        c += d.split(".")[1].length;
    } catch (f) {}
    try {
        c += e.split(".")[1].length;
    } catch (f) {}
    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
  },
  // 除
  div(a, b) {
    var c, d, e = 0,
        f = 0;
    try {
        e = a.toString().split(".")[1].length;
    } catch (g) {}
    try {
        f = b.toString().split(".")[1].length;
    } catch (g) {}
    return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), this.mul(c / d, Math.pow(10, f - e));
  },
    //向上
    prev(){
      this.indexImg--;
      if(this.indexImg==-1){
        this.indexImg=this.imageList.length-1;
        this.$refs.imgbox.style.left=-135*(this.indexImg-2)+'px';
      }
      if(this.indexImg>2){
        this.$refs.imgbox.style.left=-135*(this.indexImg-2)+'px';
      }
      if(this.indexImg==0){
        this.$refs.imgbox.style.left=0+'px';
      }
    },
    //向下
    next(){
      this.indexImg++;
      if(this.indexImg>2&&this.indexImg<this.imageList.length){
        this.$refs.imgbox.style.left=-135*(this.indexImg-2)+'px';
      }
      if(this.indexImg==this.imageList.length){
        this.indexImg=0;
        this.$refs.imgbox.style.left=0;
      }
    },
    // 点击小图
    chooseImg(index){
      this.indexImg=index;
      alert('1');
      clearInterval(this.nextTimer); 
      this.nextTimer=null;
      console.log(this.nextTimer);
    },
    //关闭页面执行
    beforeunloadHandler(){
      let paramsOut={
          'userId':this.userId,
          'orgId': tools.getLocalStorage('orgId'),
          'proId': this.$route.params.id,
          'url':this.windowUrl,
          'siteId':tools.getSessionStorage("siteid"),
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
    // 改变人数
    changeCount(policy){
      this.sumPrice = 0;
      this.discountPrice = 0;
      for (let i = 0; i < this.pricePolicyList.length; i++) {
        if (this.userType == 2) {
          policy.count=parseInt(policy.count);
          // this.sumPrice += parseFloat(this.pricePolicyList[i].directPrice) * (isNaN(parseInt(this.pricePolicyList[i].count))==true?0:parseInt(this.pricePolicyList[i].count));
          // this.discountPrice += parseFloat(this.pricePolicyList[i].discountDirectPrice) * (isNaN(parseInt(this.pricePolicyList[i].count))==true?0:parseInt(this.pricePolicyList[i].count));
          this.sumPrice = this.add(this.mul(parseFloat(this.pricePolicyList[i].directPrice), (isNaN(parseInt(this.pricePolicyList[i].count))==true?0:parseInt(this.pricePolicyList[i].count))),this.sumPrice);
          if(this.pricePolicyList[i].discountDirectPrice!=null){
            this.discountPrice = this.add(this.mul(parseFloat(this.pricePolicyList[i].discountDirectPrice),(isNaN(parseInt(this.pricePolicyList[i].count))==true?0:parseInt(this.pricePolicyList[i].count))),this.discountPrice);
          }
        } else {
          policy.count=parseInt(policy.count);
          // this.sumPrice += parseFloat(this.pricePolicyList[i].salesPrice) * (isNaN(parseInt(this.pricePolicyList[i].count))==true?0:parseInt(this.pricePolicyList[i].count)) - parseInt(this.pricePolicyList[i].rebatePrice) * (isNaN(parseInt(this.pricePolicyList[i].count))==true?0:parseInt(this.pricePolicyList[i].count));
          // this.discountPrice += parseFloat(this.pricePolicyList[i].discountSalesPrice) * (isNaN(parseInt(this.pricePolicyList[i].count))==true?0:parseInt(this.pricePolicyList[i].count));
          this.sumPrice = this.add(this.mul(parseFloat(this.pricePolicyList[i].salesPrice),(isNaN(parseInt(this.pricePolicyList[i].count))==true?0:parseInt(this.pricePolicyList[i].count))),this.sumPrice);
          if(this.pricePolicyList[i].discountSalesPrice!=null){
            this.discountPrice = this.add(this.mul(parseFloat(this.pricePolicyList[i].discountSalesPrice),(isNaN(parseInt(this.pricePolicyList[i].count))==true?0:parseInt(this.pricePolicyList[i].count))),this.discountPrice);
          }
        }
      }
    },
    // 判断页面滚动高度
    handleScroll() {
      // 计算滚动高度
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      // 计算说明导航距离顶部的高度
      let offsetTop = document.querySelector("#nav").offsetTop;
      // 产品特色区域距离顶部的高度
      // let featureTop = document.querySelector("#features").offsetTop - 46;
      // 行程介绍区域距离顶部的高度
      // let tripLineTop = document.querySelector("#trip-line").offsetTop - 46;
      // 产品价格区域距离顶部的高度
      let priceTop = document.querySelector("#price").offsetTop - 46;
      // 预定须知区域距离顶部的高度
      // let reservationTop = document.querySelector("#reservation").offsetTop - 46;
      // 退改规则区域距离顶部的高度
      // let changeTop = document.querySelector("#change").offsetTop - 46;
      // 其他说明区域距离顶部的高度
      // let otherTop = document.querySelector("#other").offsetTop - 46;
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
      // console.log(navHeight);
      for(let m=0;m<navHeight.length;m++){
        if(scrollTop>=navHeight[m]-50&&scrollTop<navHeight[m+1]-50){
            this.detailIndex =m;
        }
      }
      // if (scrollTop > featureTop && scrollTop < tripLineTop) {
      //   this.detailIndex = 0;
      // } else if (scrollTop > tripLineTop && scrollTop < priceTop) {
      //   this.detailIndex = 1;
      // } else if (scrollTop > priceTop && scrollTop < reservationTop) {
      //   this.detailIndex = 2;
      // } else if (scrollTop > reservationTop && scrollTop < changeTop) {
      //   this.detailIndex = 3;
      // } else if (scrollTop > changeTop && scrollTop < otherTop) {
      //   this.detailIndex = 4;
      // } else if (scrollTop > otherTop) {
      //   this.detailIndex = 5;
      // }

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
        } else if (scrollTop > priceTop || scrollTop < tripDayTop) {
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
      // this.detailIndex=anchorName.substring(0,1);
      // console.log(this.detailIndex);
      // 给锚点加样式
      // if (anchorName == "features") {
      //   this.detailIndex = 0;
      // } else if (anchorName == "trip-line") {
      //   this.detailIndex = 1;
      // } else if (anchorName == "price") {
      //   this.detailIndex = 2;
      // } else if (anchorName == "reservation") {
      //   this.detailIndex = 3;
      // } else if (anchorName == "change") {
      //   this.detailIndex = 4;
      // } else if (anchorName == "other") {
      //   this.detailIndex = 5;
      // }
      // alert(anchorName);
    },
    locateAtNav(e,index){
      console.log(index,'index');
      e = document.getElementById(e); /*以id命名的锚点*/
      let y = e.offsetTop;
      while ((e = e.offsetParent)) {
        y += e.offsetTop;
      }
      y -= 50; /*悬浮菜单的高度*/
      window.scrollTo(0, y);
      this.detailIndex=index;
      console.log(this.detailIndex,'detailIndex');
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
    // commissionFun() {
    //   this.commissionShow = !this.commissionShow;
    //   if (this.commissionShow == true) {
    //     this.commissionText = "隐藏";
    //   } else if (this.commissionShow == false) {
    //     this.commissionText = "查看";
    //   }
    // },
    //选择出发城市
    selectedOrigin(index, obj) {
      this.deIndex = index;
      this.departureCity = obj.departure;
      // 把出发地id放入缓存
      tools.setLocalStorage("departureId", obj.id);
      // 把出发地放入缓存
      tools.setLocalStorage("departure", obj.departure);
      this.originShow = !this.originShow;
    },
    // 选择推荐出发城市
    selectedOriginT(){
      this.departureCity = this.departureCityT.departure;
      // 把出发地id放入缓存
      tools.setLocalStorage("departureId", this.departureCityT.id);
      // 把出发地放入缓存
      tools.setLocalStorage("departure", this.departureCityT.departure);
      this.originShow = !this.originShow;
    },
    // 全局控制
    globalFun() {
      this.isHide = false;
      this.originShow = false;
    },
    globalFunT() {
      this.isHide = !this.isHide;
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
      //    console.log(a);
      //    console.log(lastDay);
      return {
        week: a, //这个月是星期几
        sumday: lastDay //这个月有多少天
      };
    },

    //团期日期渲染方法
      drawFun(arr1,arr2,arr3){
        // console.log('arr1',arr1);
        // console.log('arr2',arr2);
          let date=new Date();
          if(arr2){
              for(let i=0;i<arr1.length;i++){
                  for(let j=0;j<arr2.length;j++){
                      if(arr1[i].day==parseInt(arr2[j].tourDate.split('-')[2])){
                          if(this.userType==1){
                            arr1[i].price=arr2[j].salesPrice;
                          }
                          else if(this.userType==2){
                            arr1[i].price=arr2[j].directPrice;
                          }
                          arr1[i].remain=arr2[j].stock;
                          arr1[i].date=arr2[j].tourDate;
                          arr1[i].id=arr2[j].id;
                          arr1[i].isAck=arr2[j].isAck;
                          arr1[i].isTail=arr2[j].isTail;
                          arr1[i].useDiscount=arr2[j].useDiscount;
                          // console.log(arr2[j].dueDate,'arr2[j].dueDate');
                          let date2=new Date(arr2[j].dueDate);
                          // let date3=new Date(arr2[j].tourDate);
                          if(date2.getTime()<=(date.getTime() - 24*60*60*1000)){
                              arr1[i].failure=true;
                          }
                          // if(arr2[j].tourStatus==-1){
                          //     arr1[i].failure=true;
                          // }
                          if(arr1[i].date==this.selectedDay){
                              arr1[i].selected=true;
                          }
                      }
                  }
              }
          }
          for(let k=0;k<arr1.length;k++){
            if(arr1[k].failure==false&&arr1[k].price!=''){
              arr3.push(arr1[k].day+'日');
            }
          }
          let tourJson={
              'day':arr3
          }
          this.tourString.push(tourJson);
          // console.log(arr3,'hhharr3');
          // console.log(arr1,'hhharr1');
          console.log(this.tourString,'tourString');
      },
    // Trim(str) { 
    //   //str表示要转换的字符串  
    //   return str.replace(/\n|\r\n/g,"<br/>");
    // },
    //详情页初始化
    updateTrip(){
      this.updateText = "下载中...";
      this.getPdf();
      var updateTime=setInterval(()=>{
          if(tools.getLocalStorage('fill')==1){
            clearInterval(updateTime);
            this.updateText = "下载行程";
          }
      },1000)
    },
    detailsInit() {
      window.scroll(0,0);
      this.navList=[],
      this.navList.push({'nav':'线路团期'})
      // 获取用户类型
      this.userType = tools.getLocalStorage("userType");
      // 判断是否有了orgId
      console.log(tools.getLocalStorage("orgIdhh"),'orghhh');
      if(tools.getLocalStorage("orgId")==null){
        tools.setLocalStorage('orgId',this.$route.params.orgid);
      }
      // this.nextTimer=setInterval(()=>{
      //   this.next();
      // },3000)
      this.orgId = tools.getLocalStorage("orgId");
      this.fromName = tools.getLocalStorage("fromName");
      this.fromPath = tools.getLocalStorage("fromPath");
      var logoTime=setInterval(()=>{
          if(tools.getLocalStorage('logoName')!=null && tools.getLocalStorage('logoName')!='undefined' && tools.getLocalStorage('logoName')!=''){
            clearInterval(logoTime);
           this.logoName = tools.getLocalStorage("logoName");
          }
      },1000)

      this.userId = tools.getSessionStorage("userId")?tools.getSessionStorage("userId"):'';
      this.windowUrl=window.location.href;
      tools.setLocalStorage('proId',this.$route.params.id);
      tools.setLocalStorage('isOutgoing',this.$route.params.state);
      tools.setLocalStorage('orgIdw',this.$route.params.orgid);
      // 获取url中的id
      let params = {
        'proid': this.$route.params.id,
        'isOutgoing': this.$route.params.state,
        'orgId': this.$route.params.orgid,
        // proid: "6E22B7AA-9AD6-4391-A7E4-E22BCDC508DC",
        'siteid': tools.getSessionStorage("siteid")
      };
      // 获取详情接口绑定
      getDetails(params)
        .then(response => {
          console.log(response);
          if (response.meta.success == true) {
            console.log("产品详情数据获取成功");
            // 产品目的地获取
            this.productDestination = response.data.destination;
            // 产品价格获取
            this.productPrice = response.data.price;
            // 产品行程介绍数组
            this.scheduleList = response.data.scheduleList;
            // 产品参考航班
            this.trafficList = response.data.trafficList;
            // 产品原价现价
            this.nowPrice=response.data.newPrice.nowPrice;
            this.oldPrice=response.data.newPrice.oldPrice;
            // 产品图片
            this.imageList.push({
                'id':'',
                'imagesrc':response.data.product.coverimg,
                'productid':''
            })
            for(let f=0;f<response.data.imageList.length;f++){
                this.imageList.push(response.data.imageList[f]);
            }
            // 产品详情
            this.productDetails = response.data.product;
            this.htmlTitle=this.productDetails.aliasename;
            if(this.productDetails.summary!=null&&this.productDetails.summary!=''){
              this.navList.push({'nav':'产品描述'});
            }
            if(this.productDetails.feature!=null&&this.productDetails.feature!=''){
              this.navList.push({'nav':'产品特色'});
            }
            this.navList.push({'nav':'行程安排'});
            if(this.trafficList.length!=0){
              this.navList.push({'nav':'大交通'});
            }
            this.navList.push({'nav':'价格说明'});
            if(this.productDetails.attention!=null&&this.productDetails.attention!=''){
              this.navList.push({'nav':'预定须知'});
            }
            if(this.productDetails.bactorule!=null&&this.productDetails.bactorule!=''){
              this.navList.push({'nav':'退改规则'});
            }
            if(this.productDetails.insurance || this.productDetails.shopping || this.productDetails.tips){
              this.navList.push({'nav':'其他说明'});
            }
            // this.navList.push({'nav':'预定流程'})
            tools.setLocalStorage('aliasename',response.data.product.aliasename);
            document.title=tools.getLocalStorage('aliasename');
            //获取供应商信息
            this.supplierInfo = response.data.supplierInfoDto;
            //产品标签
            this.productTags = response.data.tags;
            // // 转换回车
            // if(this.scheduleList!=null){
            //     for(let i=0;i<this.scheduleList.length;i++){
            //       this.scheduleList[i].schInfo=this.Trim(this.scheduleList[i].schInfo);
            //     }
            // }

            let myDate = new Date();
            let paramsVisits={
                'projectType':1,
                'createDate':myDate,
                'orgId': tools.getLocalStorage('orgId'),
                'orgName': response.data.product.travelname,
                'loginStatus':tools.getLocalStorage('isLogin')==1?1:0, 		//登录状态：0.未登录 1.登录
                'userId':tools.getLocalStorage('userType')==1?tools.getSessionStorage('userId'):'', 			//用户ID
                'userType':tools.getLocalStorage('userType'),
                'userName':tools.getLocalStorage('userType')==1?tools.getSessionStorage('mobile'):tools.getSessionStorage('mobile'),
                'deptId': tools.getLocalStorage('userType')==1?tools.getSessionStorage('deptId'):'',			//部门ID B端
                'deptName':tools.getLocalStorage('userType')==1?tools.getSessionStorage('deptName'):'', 			//部门名称 B端
                'uOrgId': tools.getLocalStorage('userType')==1?tools.getSessionStorage('uOrgId'):'',			//用户旅行社ID B端 
                'uOrgName':tools.getLocalStorage('userType')==1?tools.getSessionStorage('uOrgName'):'',			//用户旅行社名称 B端
                'proId':response.data.product.id,			//产品ID
                'proType': response.data.product.protype,			//产品类型
                'proRouretType':response.data.product.procategory,		//产品线路类型
                'aliaseName':response.data.product.aliasename,		//产品分销名（别名）
                'localProName':response.data.product.localproname, 		//地接产品名称
                'proNo': response.data.product.prono,				//产品编号
                'tourDays':response.data.product.tourdays, 			//行程天数
                'startDate':response.data.product.startdate, 		//有效开始日期
                'dueDate':response.data.product.duedate, 			//有效截止日期
                'departure':response.data.product.departure, 			//出发地
                'destination':response.data.product.destination, 		//目的地
                'proTag':response.data.product.protag, 			//产品标签
                'isAck':response.data.product.isack, 
                'salesType':response.data.product.salestype,	
                'proProp':response.data.product.proprop,			//产品属性 1：打包产品；2：单项产品
                'starLevel':response.data.product.starlevel, 			//产品星级，用于产品排序
                'trafficType':response.data.product.traffictype, 
                'routeSubType':response.data.product.routesubtype, 		//线路子类型
                'routeSubTypeName':response.data.product.routesubtypename
            }
            visits(paramsVisits).then((response)=>{
                console.log(response);
                console.log('统计访问量接口请求成功');
            }).catch((err)=>{
                console.log('统计访问量接口异常',err);
            });
          } else {
            console.log("产品详情数据获取失败");
          }
        })
        .catch(err => {
          console.log("产品详情接口获取异常", err);
          // this.$Message.info('产品详情接口获取异常');
        });

      // 出发地接口绑定
      let paramsDeparture={
        'proid': this.$route.params.id,
        // proid: "6E22B7AA-9AD6-4391-A7E4-E22BCDC508DC",
        'siteid': tools.getSessionStorage("siteid")
      }
      getProductDepartures(paramsDeparture)
        .then(response => {
          console.log(response);
          if (response.meta.success == true) {
            console.log("出发地数据获取成功");
            this.departuresList = response.data.departures;
            this.departureCity = response.data.departure.departure;
            this.departureCityT = response.data.departure;
            this.departuresGroup = response.data.departuresGroup;
            // 把出发地id放入缓存
            tools.setLocalStorage("departureId", response.data.departure.id);
            // 把出发地放入缓存
            tools.setLocalStorage(
              "departure",
              response.data.departure.departure
            );
          } else {
            console.log("出发地数据获取失败");
          }
        })
        .catch(err => {
          console.log("出发地异常报错", err);
          // this.$Message.info('出发地接口获取异常');
        });

      // 团期接口绑定
      getTours(params)
        .then(response => {
          console.log(response);
          if(response.meta.success == true) {
            console.log("团期接口数据获取成功");
            this.tourList = response.data.returnList;
            console.log('tourList',this.tourList);
            if(response.data.returnList!=''){
              for(let i=0;i<response.data.returnList.length;i++){
                this.tour.push(response.data.returnList[i].tourList);
              }
            }
            this.arrWeek=[];
            this.arrLastDay=[];
            for(let i=0;i<this.tourList.length;i++){
                // 判断一个月是从星期几开始
                this.arrWeek.push(this.getWeekDay(this.tourList[i].month.split('-')[0],this.tourList[i].month.split('-')[1]-1).week);//每月第一天从周几开始
                this.arrLastDay.push(this.getWeekDay(this.tourList[i].month.split('-')[0],this.tourList[i].month.split('-')[1]-1).sumday);//一个月总共多少天
            };
            // 根据每个月的天数去组合数组
            // console.log(this.arrLastDay);
            this.first=[];
            this.second=[];
            this.three=[];
            this.four=[];
            for(let i=0;i<this.arrLastDay.length;i++){
                for(let j=0;j<this.arrLastDay[i];j++){
                    if(i==0){ 
                        this.first.push({'day':j+1,'remain':'','price':'','selected':false,'date':'','id':'','failure':false,'isAck':'','isTail':0,'useDiscount':false})
                    }
                    else if(i==1){
                        this.second.push({'day':j+1,'remain':'','price':'','selected':false,'date':'','id':'','failure':false,'isAck':'','isTail':0,'useDiscount':false})
                    }
                    else if(i==2){
                        this.three.push({'day':j+1,'remain':'','price':'','selected':false,'date':'','id':'','failure':false,'isAck':'','isTail':0,'useDiscount':false})
                    }
                    else if(i==3){
                        this.four.push({'day':j+1,'remain':'','price':'','selected':false,'date':'','id':'','failure':false,'isAck':'','isTail':0,'useDiscount':false})
                    }
                }
            }
            this.firstCopy=this.tour[0];
            // console.log('hhh',this.firstCopy);
            this.secondCopy=this.tour[1];
            this.threeCopy=this.tour[2];
            this.fourCopy=this.tour[3];
            this.drawFun(this.first,this.firstCopy,this.dayF);
            this.drawFun(this.second,this.secondCopy,this.dayS);
            this.drawFun(this.three,this.threeCopy,this.dayT);
            this.drawFun(this.four,this.fourCopy,this.dayFour);
             console.log('hhh',this.firstCopy);
            console.log('fff',this.first)
            // console.log(this.tourString,'tourStringtourStringtourStringtourString')
            let monthString='';
            for(let f=0;f<this.tourList.length;f++){
              // console.log(this.tourList[f].month,'this.tourListthis.tourListthis.tourListthis.tourList')
              monthString=this.tourList[f].month.split('-')[0]+'年'+this.tourList[f].month.split('-')[1]+'月';
              this.$set(this.tourString[f],'month',monthString);
            }
            // console.log(this.tourString,'tourStringtourStringtourStringtourString111')
          } else {
            console.log("团期接口数据获取失败");
          }
        })
        .catch(err => {
          console.log("团期接口获取异常", err);
          // this.$Message.info('团期接口获取异常');
        });
      // 面包屑导航接口
      // let paramsNav = {
      //   proid: this.$route.params.id,
      //   siteid: tools.getLocalStorage("siteid")
      // };
      // getNavigation(paramsNav).then(response => {
      //     console.log(response);
      //     if (response.meta.success == true) {
      //       console.log("面包屑导航数据获取成功");
      //       this.navObj = response.data;
      //       if (response.data.type == 1) {
      //         this.routetypeid = response.data.address.city.routetypeid;
      //       }
      //       if (response.data.type == 2) {
      //         this.routetypeid = response.data.address.country.routetypeid;
      //       }
      //       // console.log(this.routetypeid);
      //     } else {
      //       console.log("面包屑导航数据获取失败");
      //     }
      //   })
      //   .catch(err => {
      //     console.log("面包屑导航接口获取异常", err);
      //     // this.$Message.info('面包屑导航接口获取异常');
      //   });


        let paramsSave={
            'userId':this.userId,
            'orgId': tools.getLocalStorage('orgId'),
            'proId': this.$route.params.id,
            'url':window.location.href,
            'userType':this.userType,
            'siteId':tools.getSessionStorage("siteid"),
        }
        saveRecoding(paramsSave).then(response => {
            console.log(response);
            if (response.meta.success == true) {
                console.log("进入统计接口获取成功"); 
            } else {
                console.log("进入统计接口获取失败");
            }
        })
        .catch(err => {
            console.log("进入统计接口获取异常", err);
        });

        // 客服电话
        let paramsTel={
            // 'orgID':'D2FB3DB0-AFFD-46C6-AE75-EBFDAF27F567'
            'orgID':this.orgId
        }
        GetCustomerServiceInfo(paramsTel).then(response => {
          console.log(response);
          console.log("详情页客服电话");
          this.serviceTel=response;
        })
        .catch(err => {
          console.log("详情页客服电话异常", err);
        });
    },
    // 选择团期
    selectDateFun(obj, index) {
      console.log(obj[index]);
      if (obj[index].price != "" && obj[index].failure != true) {
        this.$nextTick(() => {
          obj[index].selected = true;
          this.selectedDay = obj[index].date;
          this.tourid = obj[index].id; // 出游日期
          this.stock=obj[index].remain;//库存
          // console.log(obj[index].isAck,'库存');//库存
          // parseInt
          this.startTour =this.selectedDay.split("-")[1] +"/" +this.selectedDay.split("-")[2];
          // console.log(parseInt(this.selectedDay.split('-')[1]))
          // console.log(parseInt(this.selectedDay.split('-')[2]))
          // console.log(parseInt(this.selectedDay.split('-')[0]))
          this.tourStartYear = parseInt(this.selectedDay.split("-")[0]);
          this.tourStartMonth = parseInt(this.selectedDay.split("-")[1]);
          this.tourStartDay = parseInt(this.selectedDay.split("-")[2]);
          let monthTotal = this.getWeekDay(
            parseInt(this.selectedDay.split("-")[0]),
            parseInt(this.selectedDay.split("-")[1]) - 1
          ).sumday;
          this.tourEndMonth = this.tourStartMonth;
          this.tourEndDay = this.tourStartDay + this.scheduleList.length - 1;
          // console.log(monthTotal,'monthTotal');
          if (this.tourEndDay > monthTotal&&this.tourEndMonth<12) {
            this.tourEndDay = this.tourEndDay - monthTotal;
            this.tourEndMonth = this.tourEndMonth + 1;
          }
          else if(this.tourEndDay > monthTotal&&this.tourEndMonth==12){
            this.tourEndDay = this.tourEndDay - monthTotal;
            this.tourEndMonth = 1;
          }
          // console.log(this.getWeekDay(parseInt(this.selectedDay.split('-')[0]),parseInt(this.selectedDay.split('-')[1])-1).sumday)
          // console.log(this.satrtTour);
          //把选择人日期放入缓存
          tools.setLocalStorage("selectedDay", this.selectedDay);
          //把团期id放入缓存
          tools.setLocalStorage("tourid", this.tourid);
          // 把库存放入缓存
          tools.setLocalStorage('stock',this.stock);
          // 是否及时确认
          tools.setLocalStorage('isAck',obj[index].isAck);
          //价格策略接口请求参数
          let params = {
            'proid': this.$route.params.id,
            'isOutgoing': this.$route.params.state,
            'orgId': this.$route.params.orgid,
            'tourDate': this.selectedDay,
            'siteid': tools.getSessionStorage("siteid"),
            'tourid':obj[index].id
          };
          // 价格策略接口绑定
          this.sumPrice = 0;
          this.discountPrice = 0;
          getPolicysList(params)
            .then(response => {
              console.log(response);
              if (response.meta.success == true) {
                console.log("价格策略数据获取成功");
                this.pricePolicyList = response.data[0].pricePolicyList;
                console.log(this.pricePolicyList, "--------------121");

                if (this.pricePolicyList.length != 0) {
                  for (let i = 0; i < this.pricePolicyList.length; i++) {
                    this.$set(this.pricePolicyList[i], "count", 0);
                  }
                  for(let i=0;i<this.pricePolicyList.length;i++){
                      if(this.pricePolicyList[i].touristType==1){
                          this.$set(this.pricePolicyList[i], 'count', 1);
                          break;
                      }
                  }
                  for(let i=0;i<this.pricePolicyList.length;i++){
                      if (this.userType == 2) {
                        // this.sumPrice +=this.pricePolicyList[i].directPrice * this.pricePolicyList[i].count;
                        // this.discountPrice +=this.pricePolicyList[i].discountDirectPrice * this.pricePolicyList[i].count;
                        this.sumPrice =this.add(this.mul(this.pricePolicyList[i].directPrice,this.pricePolicyList[i].count),this.sumPrice);
                        if(this.pricePolicyList[i].discountDirectPrice!=null){
                          this.discountPrice =this.add(this.mul(this.pricePolicyList[i].discountDirectPrice,this.pricePolicyList[i].count),this.discountPrice);
                        }
                      } else {
                        // this.sumPrice +=this.pricePolicyList[i].salesPrice * this.pricePolicyList[i].count -this.pricePolicyList[i].rebatePrice * this.pricePolicyList[i].count;
                        // this.discountPrice +=this.pricePolicyList[i].discountSalesPrice * this.pricePolicyList[i].count;
                        this.sumPrice =this.add(this.mul(this.pricePolicyList[i].salesPrice , this.pricePolicyList[i].count),this.sumPrice);
                        if(this.pricePolicyList[i].discountSalesPrice!=null){
                          this.discountPrice =this.add(this.mul(this.pricePolicyList[i].discountSalesPrice , this.pricePolicyList[i].count),this.discountPrice);
                        }
                      }
                  }
                  this.chooseNowPrice='';
                  this.chooseOldPrice='';
                  for(let i=0;i<this.pricePolicyList.length;i++){
                    if(this.pricePolicyList[i].def==true){
                      if(this.userType==2){
                        if(this.pricePolicyList[i].beforeDiscountDirectPrice!=null){
                          this.chooseOldPrice=this.pricePolicyList[i].beforeDiscountDirectPrice;
                        }
                        this.chooseNowPrice=this.pricePolicyList[i].directPrice;
                      }
                      else{
                        if(this.pricePolicyList[i].beforeDiscountSalesPrice!=null){
                          this.chooseOldPrice=this.pricePolicyList[i].beforeDiscountSalesPrice;
                        }
                        this.chooseNowPrice=this.pricePolicyList[i].salesPrice;
                      }
                    }
                  }
                }
              } else {
                console.log("价格策略数据获取失败");
              }
            })
            .catch(err => {
              console.log("价格策略接口获取异常", err);
              // this.$Message.info('价格策略接口获取异常');
            });
        });
        //  console.log('first',this.four);
        //  console.log('obj',obj);
        //  console.log(this.three);
        //  console.log(this.four);
        // return;
        for (let i = 0; i < obj.length; i++) {
          if (i != index && obj[i].price != "") {
            // console.log(obj[i].price);
            obj[i].selected = false;
          }
        }
        for (let i = 0; i < obj.length; i++) {
          if (obj == this.first) {
            for (let j = 0;j <=(this.second.length && this.three.length && this.four.length);j++) {
              if (!tools.isUndefined(this.second[j]) && !tools.isUndefined(this.second[j].selected)
              ) {
                this.second[j].selected = false;
              }
              if (!tools.isUndefined(this.three[j]) && !tools.isUndefined(this.three[j].selected)
              ) {
                this.three[j].selected = false;
              }
              if (
                !tools.isUndefined(this.four[j]) &&
                !tools.isUndefined(this.four[j].selected)
              ) {
                this.four[j].selected = false;
              }
            }
          } else if (obj == this.second) {
            for (
              let j = 0;
              j <= (this.first.length && this.three.length && this.four.length);
              j++
            ) {
              if (
                !tools.isUndefined(this.first[j]) &&
                !tools.isUndefined(this.first[j].selected)
              ) {
                this.first[j].selected = false;
              }
              if (
                !tools.isUndefined(this.three[j]) &&
                !tools.isUndefined(this.three[j].selected)
              ) {
                this.three[j].selected = false;
              }
              if (
                !tools.isUndefined(this.four[j]) &&
                !tools.isUndefined(this.four[j].selected)
              ) {
                this.four[j].selected = false;
              }
            }
          } else if (obj == this.four) {
            for (
              let j = 0;
              j <=
              (this.second.length && this.three.length && this.first.length);
              j++
            ) {
              if (
                !tools.isUndefined(this.second[j]) &&
                !tools.isUndefined(this.second[j].selected)
              ) {
                this.second[j].selected = false;
              }
              if (
                !tools.isUndefined(this.three[j]) &&
                !tools.isUndefined(this.three[j].selected)
              ) {
                this.three[j].selected = false;
              }
              if (
                !tools.isUndefined(this.first[j]) &&
                !tools.isUndefined(this.first[j].selected)
              ) {
                this.first[j].selected = false;
              }
            }
          } else if (obj == this.three) {
            for (
              let j = 0;
              j < (this.second.length && this.first.length && this.four.length);
              j++
            ) {
              if (
                !tools.isUndefined(this.second[j]) &&
                !tools.isUndefined(this.second[j].selected)
              ) {
                this.second[j].selected = false;
              }
              if (
                !tools.isUndefined(this.first[j]) &&
                !tools.isUndefined(this.first[j].selected)
              ) {
                this.first[j].selected = false;
              }
              if (
                !tools.isUndefined(this.four[j]) &&
                !tools.isUndefined(this.four[j].selected)
              ) {
                this.four[j].selected = false;
              }
            }
          }
        }
      }
    },
    // 减少出游人数
    reduceCount(pricePolicyList,policy) {
      console.log('ppp',pricePolicyList);
      console.log('p',policy);
      let countSum=0;
      for(let i=0;i<this.pricePolicyList.length;i++){
        if(this.pricePolicyList[i].touristType==1){
          countSum+=this.pricePolicyList[i].count;
        }
      }
      if (policy.touristType == 1 && policy.count == 1 && countSum<2) {
        policy.count = 1;
        this.$Message.info("最少选择一个成人");
      } else if (policy.count > 0) {
        policy.count--;
      } else {
        this.$Message.info("已经是最少人数了");
      }
      // 计算总价
      this.sumPrice = 0;
      this.discountPrice = 0;
      for (let i = 0; i < this.pricePolicyList.length; i++) {
        if (this.userType == 2) {
          // this.sumPrice += this.pricePolicyList[i].directPrice * this.pricePolicyList[i].count;
          // this.discountPrice += this.pricePolicyList[i].discountDirectPrice * this.pricePolicyList[i].count;
          this.sumPrice = this.add(this.mul(this.pricePolicyList[i].directPrice , this.pricePolicyList[i].count),this.sumPrice);
          if(this.pricePolicyList[i].discountDirectPrice!=null){
            this.discountPrice = this.add(this.mul(this.pricePolicyList[i].discountDirectPrice , this.pricePolicyList[i].count),this.discountPrice);
          }
        } else {
          // this.sumPrice += this.pricePolicyList[i].salesPrice * this.pricePolicyList[i].count -this.pricePolicyList[i].rebatePrice * this.pricePolicyList[i].count;
          // this.discountPrice += this.pricePolicyList[i].discountSalesPrice * this.pricePolicyList[i].count;
          this.sumPrice = this.add(this.mul(this.pricePolicyList[i].salesPrice , this.pricePolicyList[i].count),this.sumPrice);
          if(this.pricePolicyList[i].discountSalesPrice!=null){
            this.discountPrice = this.add(this.mul(this.pricePolicyList[i].discountSalesPrice , this.pricePolicyList[i].count),this.discountPrice);
          }
        }
      }
    },
    // 增加出游人数
    addCount(pricePolicyList,policy) {
      // if (policy.count < 20) {
        let countSum=0;
        for(let i=0;i<this.pricePolicyList.length;i++){
          countSum+=this.pricePolicyList[i].count;
        }
        if(countSum>=this.stock){
          this.$Message.info('已达库存上限~')
          return;
        }
        policy.count++;
        // 计算总价
        this.sumPrice = 0;
        this.discountPrice = 0;
        for (let i = 0; i < this.pricePolicyList.length; i++) {
          if (this.userType == 2) {
            // this.sumPrice +=this.pricePolicyList[i].directPrice *this.pricePolicyList[i].count;
            // this.discountPrice +=this.pricePolicyList[i].discountDirectPrice *this.pricePolicyList[i].count;
            this.sumPrice=this.add(this.mul(this.pricePolicyList[i].directPrice , this.pricePolicyList[i].count), this.sumPrice);
            if(this.pricePolicyList[i].discountDirectPrice!=null){
              this.discountPrice =this.add(this.mul(this.pricePolicyList[i].discountDirectPrice , this.pricePolicyList[i].count), this.discountPrice);
            }
          } else {
            // this.sumPrice +=this.pricePolicyList[i].salesPrice *this.pricePolicyList[i].count -this.pricePolicyList[i].rebatePrice * this.pricePolicyList[i].count;
            // this.discountPrice +=this.pricePolicyList[i].discountSalesPrice *this.pricePolicyList[i].count;
            this.sumPrice =this.add(this.mul(this.pricePolicyList[i].salesPrice , this.pricePolicyList[i].count),this.sumPrice);
            if(this.pricePolicyList[i].discountSalesPrice!=null){
              this.discountPrice =this.add(this.mul(this.pricePolicyList[i].discountSalesPrice , this.pricePolicyList[i].count),this.discountPrice);
            }
          }
        }
      // }
    },
    // 立即预定
    nextFun() {
      this.countArr = [];
      this.policyIdArr = [];
      if (this.pricePolicyList.length != 0) {
        console.log(this.pricePolicyList);
        for (let i = 0; i < this.pricePolicyList.length; i++) {
          this.countArr.push(this.pricePolicyList[i].count);
          this.policyIdArr.push(this.pricePolicyList[i].id);
        }
        // 详情页验证接口
        let params = {
          'tourid': tools.getLocalStorage("tourid"),
          'isOutgoing': this.$route.params.state, 
          'orgId': this.$route.params.orgid, 
          'totalprice': this.sumPrice,
          'policyid': this.policyIdArr,
          'personnum': this.countArr,
          'siteid': tools.getSessionStorage("siteid")
        };
        console.log(params);

        getValidateDetails(params)
          .then(response => {
            console.log(response);
            if (response.meta.success == true) {
              console.log("详情页验证成功");
              //把选择人数放入缓存
              tools.setLocalStorage("countArr", JSON.stringify(this.countArr));
              // 把价格策略id放入缓存
              // tools.setLocalStorage('policyIdArr',JSON.stringify(this.policyIdArr));
              let _url = "/order/" + this.$route.params.id +'/'+this.$route.params.orgid+'/'+ this.$route.params.state;
              this.$router.push(_url);
            } else {
              console.log("详情页验证失败");
              if(response.meta.message.indexOf("用户未登录")>0){
                this.$router.push('/login');
              }
              else{
                this.$Message.info(response.meta.message);
              }
            }
          })
          .catch(err => {
            console.log("详情页验证接口异常", err);
            // this.$Message.info('详情页验证接口异常');
          });
      } else {
        this.$Message.info("请选择团期");
      }
    },
    // 面包屑跳转到列表页
    routetypeToList(str) {
      tools.setLocalStorage("hotSubjectid", "");
      tools.setLocalStorage("destinations", "");
      tools.setLocalStorage("routetypeid", this.routetypeid);
      if (str == "国内长线") {
        this.$router.push("/domestic-list");
      }
      if (str == "境外游行") {
        this.$router.push("/abroad-list");
      }
      if (str == "周边短线") {
        this.$router.push("/surrounding-list");
      }
    },

    //面包屑城市导航
    cityToList(obj) {
      tools.setLocalStorage("destinations", JSON.stringify(obj));
      console.log(obj);
      //置空
      tools.setLocalStorage("routetypeid", "");
      // 根据routetype进行跳转判断
      if (obj.routetype == "国内长线") {
        this.$router.push("/domestic-list");
        return;
      } else if (obj.routetype == "境外游行") {
        this.$router.push("/abroad-list");
        return;
      } else if (obj.routetype == "周边短线") {
        this.$router.push("/surrounding-list");
      }
    },
    //  产品详情标签搜索
    tagsChoose(obj, index) {
      // alert(obj[index-1]);
      tools.setLocalStorage("tagName", obj[index - 1]);
      tools.setLocalStorage("hotSubjectid", "");
      tools.setLocalStorage("destinations", "");
      tools.setLocalStorage("routetypeid", this.productDetails.procategoryid);
      if (this.productDetails.procategory == "国内长线") {
        this.$router.push("/domestic-list");
      }
      if (this.productDetails.procategory == "境外游行") {
        this.$router.push("/abroad-list");
      }
      if (this.productDetails.procategory == "周边短线") {
        this.$router.push("/surrounding-list");
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener('beforeunload',this.beforeunloadHandler);
    // this.detailsInit();
  },
  created(){
    this.nextTimer=setInterval(()=>{
      this.next();
    },3000)
  },
  beforeDestroy(){
    // if(this.nextTimer) { 
      //如果定时器在运行则关闭
      clearInterval(this.nextTimer); 
    // }
      this.nextTimer=null;
  },
  destroyed () {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener('beforeunload',this.beforeunloadHandler);
    // if(this.nextTimer) { 
    //   //如果定时器在运行则关闭
    //   clearInterval(this.nextTimer); 
    // }
    // this.nextTimer=null;
  },
  components: {
    supplierHeader,
    Footer,
    feedBack
  }
};
</script>

<style lang="scss">
.details {
  // position: relative;
  #pdfDom{
    position: absolute;
    z-index: -1;
    top:0;
    left:0;
    padding: 20px;
    >h2{
      font-size: 16px;
      >span{
        float: right;
        >img{
          @include wh(20px,20px);
          display: inline-block;
          vertical-align: top;
          margin-right: 10px;
        }
      }
    }
    >h1{
      @include sc(16px,#333);
      font-weight: bold;
      width: 50%;
      text-align: center;
      transform: translateX(50%);
      margin-bottom: 10px;
    }
    >p{
      text-align: center;
      @include sc(13px,#333);
      margin-bottom: 5px;
    }
    .profile{
      >span{
        margin-right: 25px;
      }
    }
    >div{
      margin-bottom: 15px;
      >h2{
        height: 30px;
        line-height: 30px;
        @include sc(14px,#333);
        padding-left: 5px;
        font-weight: bold;
        background: #f3f3f3;
        margin-bottom: 10px;
        &::before{
          content: '';
          height: 15px;
          width: 2px;
          background: #ffba00;
          display: inline-block;
          vertical-align: top;
          margin-top: 7px;
          margin-right: 10px;
        }
      }
      >p{
        @include sc(14px,#333);
      }
    }
    .trip-plan {
      &.active {
        padding-top: 80px;
        display: inline-block;
      }
      .plan-day {
        @include sc(16px, #333);
        line-height: 25px;
        margin-bottom: 10px;
        > i {
          @include sc(14px, #333);
          font-style: normal;
          margin-left: 25px;
        }
      }
      .plan-line {
        @include sc(12px, #005bac);
        line-height: 12px;
        margin-bottom: 10px;
      }
      .content-main{
        padding-left: 37px;
        display: inline-block;
        margin-bottom: 15px;
        margin-left: 10px;
        border-left:1px solid #f4f4f4;
        position: relative;
        >i{
          display: inline-block;
          @include wh(14px, 15px);
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
        // position: relative;
        // &::before{
        //   content: '';
        //   display: inline-block;
        //   width: 1px;
        //   padding-top: 100%;
        //   background: #f4f4f4;
        //   position: absolute;
        //   left:30px;
        // }
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
          @include wh(14px, 15px);
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
      .plan-main-eat {
        // margin-bottom: 50px;
        > p {
          @include sc(14px, #666);
          > i {
            display: inline-block;
            @include wh(15px, 15px);
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
    .fill-con{
      > div {
        > h4 {
          @include sc(14px, #ffba00);
          font-weight: normal;
          line-height: 20px;
          margin-bottom: 5px;
        }
        > p {
          @include sc(14px, #333);
          img{
           display: none;
          }
        }
      }
    }
  }
  .details-content {
    background: #f3f3f3;
    // padding-top: 20px;
    padding-bottom: 90px;
    // margin-top: 24px;
    .bread-crumbs{
      @include sc(14px,#999);
      padding: 12px 0;
      width:1180px;
      margin: auto;
      >span,>a{
        @include sc(14px,#666);
      }
    }
    > div:not(.advertising) {
      width: 1180px;
      margin: auto;
      margin-bottom: 48px;
      .product-info {
        padding-top: 27px;
        background: #fff;
        padding-bottom: 35px;
        > div {
          padding:0 20px;
          .pro-tour{
            display: inline-block;
            width: 592px;
            font-size: 0;
            // @include wh(592px, 406px);
            .pro-img{
              overflow: hidden;
              position: relative;
              > img {
                display: inline-block;
                background: #ddd;
                @include wh(592px, 406px);
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
              >span{
                position: absolute;
                bottom: 10px;
                right:15px;
                @include sc(14px,#fffefe);
              }
            }
            .carousel{
              margin-top: 12px;
              // padding: 0 7px;
              height: 100px;
              overflow: hidden;
              font-size: 0;
              padding-left: 2px;
              >a{
                display: inline-block;
                vertical-align: top;
                >img{
                  height: 80px;
                  width: 24px;
                }
              }
              >div{
                display: inline-block;
                width: 540px;
                overflow: hidden;
                height: 80px;
                position: relative;
                >div{
                  position: absolute;
                  width: auto;
                  min-width: 100%;
                  height: 100px;
                  white-space: nowrap;
                  left:0;
                  >img{
                    @include wh(125px,80px);
                    // @include wh(158px,106px);
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
            .calendar {
              width: 592px; // @include wh(592px,384px);
              margin-bottom: 11px;
              .month-tab {
                height: 46px;
                border-left:1px solid #e1e1e1;
                border-right:1px solid #e1e1e1;
                > ul {
                  display: inline-block;
                  width: 592px;
                  > li {
                    list-style: none;
                    float: left;
                    width: 148px;
                    text-align: center;
                    height: 46px;
                    padding-top: 7px;
                    border-top:1px solid #e1e1e1;
                    > a {
                      display: inline-block;
                      height: toRem(73px);
                      > p {
                        line-height: 14px;
                        @include sc(14px, #333);
                        margin-bottom: 5px;
                      }
                      > h3 {
                        line-height: 14px;
                        @include sc(14px, #ffba00);
                        font-weight: normal;
                      }
                    }
                    &.active {
                      background: #ffba00;
                      border-top:1px solid #ffba00;
                      > a {
                        > p,>h3{
                          color:#fff;
                        }
                      }
                    }
                  }
                }
                // >a{
                // display: inline-block;
                // width:48px;
                // height:64px;
                // &.tab-left{
                // background: url('../../assets/image/tour-left.png') no-repeat center center;
                // background-size:12px 26px;
                // }
                // &.tab-right{
                // background: url('../../assets/image/tour-right.png') no-repeat center center;
                // background-size:12px 26px;
                // }
                // }
              }
              .calendar-week {
                line-height: 37px;
                height: 37px;
                background: #434343;
                font-size: 0px;
                > span {
                  display: inline-block;
                  width: 14.28%;
                  text-align: center;
                  @include sc(18px, #fff);
                }
              }
              .calendar-bd {
                width: 100%;
                background: url("../assets/images/calendar-details.png") center;
                background-size: 100%;
                border:1px solid #e1e1e1;
                border-top:none;
                > ul {
                  width: 100%;
                  > li {
                    list-style: none;
                    float: left;
                    height: 55px;
                    width: 14.28%;
                    text-align: center;
                    padding-top: 13px;
                    padding-bottom: 3px;
                    border-bottom: 1px solid #e1e1e1;
                    // border-left:1px solid #e1e1e1;
                    box-sizing: border-box;
                    cursor: pointer;
                    position: relative;
                    &:hover{
                     background-color: rgba(255, 186, 0, 0.08);
                    }
                    >div{
                      position: absolute;
                      top:0;
                      right:0;
                      >i{
                        display: inline-block;
                        @include wh(12px,12px);                   
                      }
                      .ack{
                        background: url('../assets/images/zhi.png') no-repeat;
                        background-size: 100%; 
                      }
                      .tail{
                        background: url('../assets/images/wei.png') no-repeat;
                        background-size: 100%; 
                      }
                      .discount{
                        background: url('../assets/images/cu.png') no-repeat;
                        background-size: 100%; 
                      }
                    }
                    > p {
                      position: absolute;
                      @include sc(16px, #333);
                      line-height: 18px;
                      top:7px;
                      left:10px;
                    }
                    > h3 {
                      font-weight: normal;
                      @include sc(12px, #ff8400);
                    }
                    > span {
                      display: inline-block;
                      width: 100%;
                      margin-top: 4px;
                      @include sc(12px, #999);
                      > i {
                        font-style: normal;
                      }
                    }
                    &.invalid {
                      > p {
                        @include sc(16px, #333);
                      }
                    }
                    &.act {
                      background: #ffba00;
                      cursor: pointer;
                      > p,
                      > h3,
                      > span {
                        color: #fff;
                      }
                      // >i{
                      //   // position: absolute;
                      //   // @include wh(12px,12px);
                      //   background: url('../assets/images/zhi.png') no-repeat;
                      //   background-size: 100%;
                      //   // top:5px;
                      //   // right:5px;
                      // }
                    }
                    &.fail {
                      > p {
                        @include sc(16px, #333);
                      }
                      // background: #ccc;
                      // > p,
                      // > h3,
                      // > span {
                      //   color: #fff;
                      // }
                    }
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
          .pro-con{
            display: inline-block;
            vertical-align: top;
            width: calc(100% - 610px);
            margin-left: 11px;
            >h2{
             @include sc(24px,#111);
             >span{
               display: inline-block;
               >img{
                 @include wh(20px,20px);
                 margin-right: 7px;
               }
               &:nth-child(1){
                  margin-right: 20px;
               }
             } 
            }
            .prono{
              @include sc(14px,#333);
              >span{
                @include sc(14px,#555);
              }
            }
            .pro-tags{
              margin: 10px 0 15px;
              > i {
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
            .pro-price{
              width:100%;
              height: 84px;
              background-color: rgba(255, 186, 0, 0.08);
              line-height: 84px;
              @include sc(18px,#333);
              padding-left: 13px;
              .new-price{
                @include sc(34px,#ff5512);
                &:before{
                  content: '￥';
                  display: inline-block;
                  @include sc(16px,#ff5512);
                }
              }
              .old-price{
                @include sc(14px,#666);
                margin-left: 22px;
                >i{
                   @include sc(14px,#555);
                   text-decoration:line-through;
                }
              }
            }
            .pro-destination,.pro-departures{
              @include sc(16px,#111);
              margin-top: 8px;
            }
            .price-policy {
              width: 100%; // @include wh(495px,334px);
              border: solid 2px #ffba00;
              border-radius: 4px;
              padding-top: 16px;
              margin-top: 20px;
              .origin-con {
                position: relative;
                >a{
                   margin-left: 20px;
                }
                > ul{
                  // @include wh(300px,180px);
                  width: 300px;
                  max-height: 180px;
                  border: 2px solid #ffba00;
                  position: absolute;
                  left: 120px;
                  overflow-y: auto;
                  background: #fff;
                  z-index: 1000;
                  > li {
                    list-style: none;
                    height: 27px;
                    line-height: 27px;
                    @include sc(14px, #ffba00);
                    padding-left: 5px;
                    &.active {
                      background: #ffba00;
                      color: #fff;
                    }
                  }
                }
                .select-box{
                  position: absolute;
                  left:100px;
                  background: #fff;
                  box-shadow: 0px 2px 9px 0px 
                  rgba(0, 0, 0, 0.27);
                  border-radius: 6px;
                  width: 420px !important;
                  margin: auto;
                  padding: 10px;
                  padding-bottom: 0;
                  .ivu-tabs{
                    width: 100% !important;
                  }
                  .ivu-tabs-tabpane{
                    >a{
                      display: inline-block;
                      @include wh(80px,30px);
                      background: #57a3f3;
                      @include sc(14px,#fff);
                      border-radius: 6px;
                      text-align: center;
                      line-height: 30px;
                      margin-right: 10px;
                      margin-bottom: 10px;
                    }
                  }
                }
              }
              > p,>div {
                padding-left: 16px;
                margin-bottom: 16px;
                > label {
                  display: inline-block;
                  @include sc(16px, #111);
                  width: 80px;
                  text-align: right;
                }
                > span {
                  @include sc(16px, #333);
                }
                > a {
                  @include sc(14px, #ffba00);
                }
              }
              .policy-con {
                padding-left: 16px;
                > label {
                  display: inline-block;
                  vertical-align: top;
                  @include sc(16px, #111);
                }
                > div {
                  display: inline-block;
                  margin-bottom: 15px;
                  .policy-b{
                    .c-computed{
                      > i {
                        display: inline-block;
                        @include wh(22px, 22px);
                      }
                      .reduce {
                        background: url("../assets/images/reduce.png") no-repeat;
                        background-size: 100%;
                      }
                      .add {
                        background: url("../assets/images/add.png") no-repeat;
                        background-size: 100%;
                      }
                       > input {
                        display: inline-block;
                        vertical-align: top;
                        font-style: normal;
                        @include sc(16px, #333);
                        width: 30px;
                        height: 22px;
                        border:none;
                        text-align: center;
                        border-top:1px solid #ddd;
                        border-bottom:1px solid #ddd;
                        margin-left: -3px;
                        // margin: 0 11px;
                      }
                      > span {
                        @include sc(16px, #ff5512);
                        display: inline-block;
                        vertical-align: top;
                        > i {
                          @include sc(16px, #999);
                          font-style: normal;
                        }
                        margin:0 4px;
                      }
                    }
                    .c-old{
                      // margin-left: 90px;
                      margin: 5px 0 5px 90px;
                      > span {
                        @include sc(14px, #7d7d7d);
                        display: inline-block;
                        vertical-align: top;
                        > i {
                          font-style: normal;
                          text-decoration: line-through;
                        }
                        margin-right: 14px;
                      }
                      >em{
                        height: 22px;
                        border-radius: 2px;
                        background: #ff5512;
                        @include sc(12px,#fff);
                        line-height: 22px;
                        text-align: center;
                        padding: 0 5px;
                        display: inline-block;
                        vertical-align: top;
                        margin-left: 10px;
                        margin-right: 5px;
                        // margin-top: 2px;
                      }
                    }
                  }
                  .policy-c {
                    margin-bottom: 10px;
                    > i {
                      display: inline-block;
                      @include wh(22px, 22px);
                    }
                    .reduce {
                      background: url("../assets/images/reduce.png") no-repeat;
                      background-size: 100%;
                    }
                    .add {
                      background: url("../assets/images/add.png") no-repeat;
                      background-size: 100%;
                    }
                    .c-price{
                      @include sc(16px, #ff5512);
                      display: inline-block;
                      vertical-align: top;
                      > i {
                        @include sc(16px, #999);
                        font-style: normal;
                      }
                      // &:last-child{
                      margin-left: 5px;
                      // }
                    }
                    .dis-c{
                        @include sc(16px, #7d7d7d);
                        display: inline-block;
                        vertical-align: top;
                        > i {
                          font-style: normal;
                          text-decoration: line-through;
                        }
                        margin:0 5px;
                      }
                    > input {
                      display: inline-block;
                      vertical-align: top;
                      font-style: normal;
                      @include sc(16px, #333);
                      width: 30px;
                      height: 22px;
                      border:none;
                      text-align: center;
                      border-top:1px solid #ddd;
                      border-bottom:1px solid #ddd;
                      // margin: 0 11px;
                    }
                    >em{
                      height: 22px;
                      border-radius: 2px;
                      background: #ff5512;
                      @include sc(12px,#fff);
                      line-height: 22px;
                      text-align: center;
                      padding: 0 5px;
                      display: inline-block;
                      vertical-align: top;
                      margin-left: 10px;
                      margin-right: 5px;
                      margin-top: 2px;
                    }
                  }
                }
              }
              .reserve-btn {
                height: 110px;
                border-top: solid 2px #ffba00;
                padding-left: 35px;
                // padding-top: 19px;
                .reserve-price{
                  display: inline-block;
                  vertical-align: middle;
                  >h1{
                    @include sc(16px,#111);
                    margin-top: 10px;
                    >span{
                      @include sc(36px, #ff5512);
                      &:before{
                        @include sc(16px,#ff5512);
                        content: '￥';
                        display: inline-block;
                      }
                    }
                    &.esp{
                      margin-top: 25px;
                    }
                  }
                  >p{
                    @include sc(14px,#7d7d7d);
                    width: 100%;
                    text-align: center;
                  }
                }
                .price-btn{
                   float: right;
                   margin-top: 26px;
                   > a {
                    margin-right: 60px;
                    @include wh(176px, 53px);
                    display: inline-block;
                    background: #ffba00;
                    @include sc(26px, #fff);
                    text-align: center;
                    line-height: 53px;
                    border-radius: 4px;
                    letter-spacing: 1px;                  
                  }
                }
              }
            }
            .travel-pro{
              @include sc(16px,#7d7d7d);
              margin-top: 20px;
              >p{
                @include sc(16px,#333);
                //  display: inline-block;
                margin-top: 5px;
                >span{
                  display: inline-block;
                  vertical-align: top;
                  overflow:hidden;
                  text-overflow:ellipsis;
                  white-space:nowrap;
                  width: 490px;
                  //  border: solid 1px #e1e1e1;
                  padding: 0 10px;
                  //  line-height: 20px;
                  @include sc(14px,#7d7d7d);
                  margin: 0 5px;
                }
              }
              >div{
                >a{
                  float: right;
                  font-size: 14px;
                }
              }
            }
          }
        }
      }
      .trip-info {
        width: 100%;
        
        .trip-info-nav {
          width: 1180px;
          height: 47px;
          background: #434343;
          padding-left: 16px;
          position: relative;
          >ul{
            > li {
              float: left;
              list-style: none;
              @include wh(90px, 47px);
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
          }
          .service{
            position: absolute;
            top:3px;
            right:20px;
            .service-tel{
              @include sc(12px,#fff);
              text-align: center;
              >img{
                display: inline-block;
                vertical-align: top;
                margin-right: 3px;
              }
            }
            .service-tip{
              @include sc(14px,#fff);
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
         margin-top: 22px;
         position: relative;
          > h1 {
            @include sc(24px, #333);
            text-align: center;
            padding: 27px 0;
          }
          .download-trip{
            @include wh(80px,34px);
            border-radius: 4px;
            border:1px solid #ffba00;
            background: #ffba00;
            color:#fff;
            font-size: 14px;
            position: absolute;
            top:60px;
            right:30px;
            line-height: 32px;
            text-align: center;
            // &:hover{
            //   border:1px solid #ffba00;
            //   background: #ffba00;
            //   color:#fff;
            // }
          }
          > div {
            > div {
              // border: solid 1px #dddddd;
              margin: 0 29px;
            }
            .trip-introduce-last {
              // padding: 21px 56px 0 41px;
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
                // position: relative;
                // &::before{
                //   content: '';
                //   display: inline-block;
                //   width: 1px;
                //   padding-top: 100%;
                //   background: #f4f4f4;
                //   position: absolute;
                //   left:30px;
                // }
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
        .con-esp{
          margin-bottom: 40px;
        }
        .trip-process,
        .trip-features,
        .trip-price,
        .trip-reservation,
        .trip-change,
        .trip-other,.trip-summary{
          margin-top:25px; 
        }
        .trip-process,
        .trip-tour,
        .trip-features,
        .trip-price,
        .trip-reservation,
        .trip-change,
        .trip-other,.trip-summary {
          background: #fff;
          padding: 0 20px 30px;
          img {
            max-width: 100%;
          }
          > h1 {
            @include sc(24px, #333);
            text-align: center;
            padding: 27px 0;
          }
          > div {
            // border: solid 1px #dddddd;
            // margin: 0 6px 10px 6px;
            // padding: 20px 40px 0 40px;
            > div {
              > h4 {
                @include sc(20px, #333);
                font-weight: normal;
                line-height: 20px;
                margin-bottom: 20px;
                // padding-top: 42px;
              }
              > p {
                @include sc(14px, #333);
                img{
                  max-width: 100%;
                  // width:100%;
                  // height: 200px;
                }
                // line-height: 20px;
              }
            }
          }
        }
        .trip-tour{
          >div{
            >p{
              @include sc(16px,#333);
              display: inline-block;
              vertical-align: top;
            }
            .tour-details{
              display: inline-block;
              width: 1050px;
              >div{
                margin-bottom: 8px;
                >i{
                  @include sc(16px,#333);
                  margin-right: 10px;
                  font-weight: bold;
                }
                >span{
                  @include sc(16px,#333);
                }
              }
            }
          }
        }
        .trip-process{
          >div{
            .process-images{
              text-align: center;
            }
            .process-text{
              margin-left: -30px;
              >div{
                display: inline-block;
                width: 192px;
                vertical-align: top;
                padding: 0 30px;
                box-sizing: border-box;
                >h3{
                  @include sc(14px,#333);
                  text-align: center;
                  margin: 5px 0;
                }
                >p{
                  @include sc(12px,#7d7d7d);
                  text-align: left;
                  line-height: 25px;
                }
                &:nth-child(3),&:nth-child(4){
                  >p{
                    text-align: center;
                  }
                }
                &:nth-child(4){
                  padding-left: 30px;
                }
                &:nth-child(5){
                  padding-left: 50px;
                }
                &:last-child{
                  padding-left: 70px;
                }
              }
            }
          }
        }
        .trip-traff{
          background: #fff;
          padding: 0 20px 30px;
          margin-top: 25px;
          > h1 {
            @include sc(24px, #333);
            text-align: center;
            padding: 27px 0;
          }
          >p{
            padding-left: 17px;
            @include sc(20px,#333);
            line-height: 22px;
            >span{
              @include sc(20px,#333);
              margin-left: 10px;
              >img{
                height: 22px;
                display: inline-block;
                vertical-align: top;
                margin-left: 20px;
              }
            }
          }
          .trip-introduce-first {
            width:1100px;
            background: #fbfbfb;
            margin-left: 17px;
            margin-top: 26px;
            padding: 0 20px;
            .flight-tip {
              @include sc(16px, #333);
              margin-bottom: 8px;
            }
            .trip-line {
              // border-radius: 8px;
              // margin-bottom: 31px;
              &:first-child{
                border-bottom: solid 1px #dddddd;
              }
              width: 100%;
              // @include wh(800px, 100px);
              padding: 15px 20px 15px 20px;
              > div,
              > span,
              > i {
                display: inline-block;
                vertical-align: middle;
              }
              .flight-line {
                display: inline-block;
                width: 20px;
                height: 6px;
                vertical-align: middle;
                background: url("../assets/images/zhida.png") no-repeat;
                background-size: 100%;
                margin: 0 50px;
              }
              .flight-path {
                // width:405px;
                display: inline-block;
                vertical-align: middle;
                text-align: center;
                > h2 {
                  @include sc(14px, #333);
                }
                > h1 {
                  @include sc(18px, #333);
                }
              }
              .flight-info {
                margin-top: 19px;
                margin-left: 80px;
                > p {
                  @include sc(14px, #333);
                }
              }
              > span {
                @include sc(16px, #333);
                vertical-align: middle;
                margin-right: 95px;
              }
              > i {
                @include sc(14px, #333);
                margin-top: 35px;
                font-style: normal;
              }
            }
          }
        }
        // #price,
        // #trip-line,
        // #reservation,
        // #change,
        // #other,
        // #esp {
        //   display: inline-block;
        //   height: 40px;
        // }
        // #features {
        //   &.esp {
        //     display: inline-block;
        //     height: 40px;
        //   }
        // }
      }
    }
    .adver {
      margin: auto;
      margin-bottom: 84px;
      width: 1180px;
      > a {
        display: inline-block;
        @include wh(280px, 160px);
        border-radius: 8px;
        margin-right: 20px;
        > img {
          display: inline-block;
          @include wh(280px, 160px);
          border-radius: 8px;
        }
        &:last-child {
          margin-right: 0px;
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
