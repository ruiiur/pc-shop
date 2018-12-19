<!--这是订单信息页面-->
<template>
    <div class="order" @click="globalFun()">
        <!-- 引入头部导航 -->
        <supplierHeader  :without="without"  :isHide="isHide" @global="globalFunT" @refreshList="orderInit"></supplierHeader>
       <!-- <Header @refreshList="orderInit" :isHide="isHide" @global="globalFunT"></Header> -->
       <!-- 中间区 -->
       <p class="bread-crumbs">您当前所在位置：
         <a :href="'#/supplier?orgId=' + orgId">首页 > </a><a :href="'#/details/'+this.$route.params.id">产品详情 > </a><span>产品预订</span>
       </p>
       <div class="order-content">
           <!-- 订单信息 -->
           <div class="order-information">
              <h2>{{productDetails.aliasename}}</h2>
              <p>编号：{{productDetails.prono}}</p>
              <div>
                <div class="order-city">
                  <p><label>目的地：</label>{{productDetails.destination}}</p>
                  <p class="origin-con"><label>出发地：</label>{{departureCity}}
                    <a href="javascript:;" v-if="!originShow" @click.stop.prevent="originShow=!originShow"><img src="../assets/images/xiugai.png">更改</a>
                    <ul v-if="originShow" @click.stop="originShow=originShow">
                        <li :class="deIndex==index?'active':''" @click.stop.prevent="selectedOrigin(index,de)" v-for="(de,index) in departuresList">{{de.departure}}</li>
                    </ul>
                  </p>
                </div>
                <div class="order-date">
                  <p>出发日期：{{startDate}}</p>
                  <p>行程天数：{{tripDay}}天</p>
                  <p>出行人数：<span v-for="(policy,index) in pricePolicyList" v-if="policy.count>0">{{policy.policyName}}{{policy.count}}</span></p>
                </div>
                <p>产品分类: {{productDetails.procategory}}<span>本线路产品由<a :href="'#/supplier?orgId='+orgId">{{productDetails.travelname}}</a>提供</span></p>
              </div>
           </div>
            <!-- 价格信息 -->
           <div class="price-information">
               <h2 class="information-line"><img src="../assets/images/jiagexinxi.png">价格信息</h2>
               <div>
                   <table>
                       <tr v-for="(policy,index) in pricePolicyList" v-if="index==0">
                          <th>票种</th>
                          <th>直客价</th>
                          <th v-if="userType==1">返佣</th>
                          <th v-if="userType==1">同行结算</th>
                          <th>单房差</th>
                          <th v-if="policy.useDiscount==true">优惠金额</th>
                          <th>购买人数</th>
                          <!-- <th>单房差数量</th> -->
                          <th>结算价</th>
                       </tr>
                       <tr v-for="policy in pricePolicyList">
                           <td>{{policy.policyName}}</td>
                           <!-- 直客价 -->
                          <td v-if="policy.beforeDiscountDirectPrice!=null">￥{{policy.beforeDiscountDirectPrice}}/人</td>
                          <td v-if="policy.beforeDiscountDirectPrice==null">￥{{policy.directPrice}}/人</td>
                           <!-- <td v-if="userType==1&&policy.beforeDiscountDirectPrice!=null">￥{{policy.beforeDiscountDirectPrice}}/人</td>
                           <td v-if="userType==1&&policy.beforeDiscountDirectPrice==null">￥{{policy.directPrice}}/人</td> -->
                           <!-- <td v-if="userType==2">{{policy.directPrice}}</td> -->
                           <!-- 返佣 -->
                           <td v-if="userType==1">￥{{policy.rebatePrice}}</td>
                           <!-- 同行 -->
                           <td v-if="userType==1&&policy.beforeDiscountSalesPrice!=null">￥{{policy.beforeDiscountSalesPrice}}/人</td>
                           <td v-if="userType==1&&policy.beforeDiscountSalesPrice==null">￥{{policy.salesPrice}}/人</td>
                           <!-- 单房差 -->
                           <td>￥{{policy.singleRoomPrice}}/人</td>
                           <td v-if="userType==2&&policy.beforeDiscountDirectPrice!=null">￥{{policy.discountDirectPrice}}/人</td>
                           <td v-if="userType==1&&policy.beforeDiscountSalesPrice!=null">￥{{policy.discountSalesPrice}}/人</td>
                            <td>
                               <div>
                                   <i class="order-reduce" @click.stop.prevent="reduceCount(pricePolicyList,policy)"></i>
                                   <input type="tel" name="" id="" v-model="policy.count" readonly>
                                   <i class="order-add" :class="stockMax==true?'none':''" @click.stop.prevent="addCount(pricePolicyList,policy)"></i>
                               </div>
                            </td>
                            <!-- <td>
                               <div>
                                   <i class="order-reduce" @click.stop.prevent="reduceSingleNum(policy)"></i>
                                   <input type="tel" name="" id="" v-model="policy.singleRoomCount">
                                   <i class="order-add" @click.stop.prevent="addSingleNum(policy)"></i>
                               </div>
                           </td> -->
                           <td>￥{{policy.singleSum}}</td>
                       </tr>
                   </table>
               </div>
               <p>单房差：<span>{{singleRoomPrice}}元</span></p>
               <h3></h3>
           </div>
            <!-- 机票信息 -->
           <div class="traffic-information" v-if="trafficList!=''">
            <h2 class="information-line"><img src="../assets/images/dajiaotong.png" alt="">大交通</h2>
            <p>交通类型：<span v-if="trafficList.departureStatus==9">机票<img src="../assets/images/feiji.png" alt=""></span><span v-if="trafficList.departureStatus==10">火车票<img src="../assets/images/huoche.png" alt=""></span><span v-if="trafficList.departureStatus==11">汽车票<img src="../assets/images/qiche.png" alt=""></span><span v-if="trafficList.departureStatus==12">船票<img src="../assets/images/chuan.png" alt=""></span></p>
            <div>
                <div class="trip-line">
                  <h2>去程<span>{{trafficList.departureDate}}</span></h2>
                      <div class="flight-path">
                        <h2><span v-if="trafficList.departureStatus==9">{{trafficList.departureCity}}</span><span v-if="trafficList.departurePoint!=''"><i v-if="trafficList.departureStatus==9">(</i>{{trafficList.departurePoint}}<i v-if="trafficList.departureStatus==9">)</i></span></h2>
                        <h1 >{{trafficList.depBeginTime}}</h1>
                    </div>
                    <p class="flight-line"></p>
                    <div class="flight-path">
                        <h2><span v-if="trafficList.departureStatus==9">{{trafficList.depEndCity}}</span><span v-if="trafficList.depEndPoint!=''"><i v-if="trafficList.departureStatus==9">(</i>{{trafficList.depEndPoint}}<i v-if="trafficList.departureStatus==9">)</i></span></h2>
                        <h1>{{trafficList.depEndTime}}</h1>
                    </div>
                    <div class="flight-info" v-if="trafficList.departureStatus==9">
                        <p>{{trafficList.departureNo}}</p>
                    </div>
                </div>
                <div class="trip-line">
                    <h2>回程<span>{{trafficList.backDate}}</span></h2>
                    <div class="flight-path">
                        <h2><span v-if="trafficList.departureStatus==9">{{trafficList.backCity}}</span><span v-if="trafficList.backPoint!=''"><i v-if="trafficList.departureStatus==9">(</i>{{trafficList.backPoint}}<i v-if="trafficList.departureStatus==9">)</i></span></h2>
                        <h1>{{trafficList.backBeginTime}}</h1>
                    </div>
                    <p class="flight-line"></p>
                    <div class="flight-path">
                        <h2><span v-if="trafficList.departureStatus==9">{{trafficList.backEndCity}}</span><span v-if="trafficList.backEndPoint!=''"><i v-if="trafficList.departureStatus==9">(</i>{{trafficList.backEndPoint}}<i v-if="trafficList.departureStatus==9">)</i></span></h2>
                        <h1>{{trafficList.backEndTime}}</h1>
                    </div>
                    <div class="flight-info" v-if="trafficList.departureStatus==9">
                        <p>{{trafficList.backNo}}</p>
                    </div>
                </div>
            </div>
           </div>
            <!-- 游客信息 -->
           <div class="tourist-information">
              <h2 class="information-line"><img src="../assets/images/youkexiangqing.png">游客信息
                <div class="fill-con" v-if="false" @click.stop.prevent="fillBtn">
                  <a href="javascript:;" class="fill-btn">填写说明</a>
                  <div class="fill-explan" v-if="fillShow==true">
                    <ul>
                      <li @mouseenter="fillIndex=1" :class="fillIndex==1?'active':''">填写说明</li>
                      <li @mouseenter="fillIndex=2" :class="fillIndex==2?'active':''">老版护照</li>
                      <li @mouseenter="fillIndex=3" :class="fillIndex==3?'active':''">新版护照</li>
                    </ul>
                    <div v-if="fillIndex==1" class="fill-text">
                      <p>填写说明：</p>
                      <p>1.乘客姓名需与所选证件上的名字一致。</p>
                      <p>2.中文姓名：</p>
                      <p>·若持护照登机，必须确认护照上有中文姓名。</p>
                      <p>·生僻字可用拼音代替，例如：“王鬳”可输入为“王yan”。</p>
                      <p>3.英文姓名：</p>
                      <p>·若持护照登机，必须按照护照顺序区分姓与名。中国籍乘客的英文名即为中文名对
                        应拼音。外籍乘客，如乘客姓名为Loise Smith St. Paul ，则在“Last Name”栏
                        中输入StPaul(注：Last Name中无空格和特殊符号)；在“First Name”栏中输入
                        Loise Smith(注：有中间名按firstname middlename的格式填写)。不区分大小写。
                        ·名字长度≤26个字符，若过长请使用缩写。
                      </p>
                    </div>
                    <div v-if="fillIndex==2" class="fill-old">
                      <img src="../assets/images/labanhuzhao.png" alt="">
                      <p>* 请严格按照所选证件上的信息填写</p>
                    </div>
                    <div v-if="fillIndex==3" class="fill-new">
                      <img src="../assets/images/xinbanhuzhao.png" alt="">
                      <p>* 请严格按照所选证件上的信息填写</p>
                    </div>
                  </div>
                </div>
                <div class="tourist-operation">
                    <a class="copy" href="javascript:;" @click.stop.prevent="copyFun()">无格式粘贴</a>
                    <input type="text" v-if="touristFile!=''" v-model="touristFile" readonly>
                    <div class="upload">
                        <input  @change='getFile' type="file">
                        <button>批量上传</button>
                    </div>
                    <a class="download" :href="templateUrl">下载模板</a>
                   
                    <div class="copy-content" v-if="copyShow" @click.stop.prevent="copyShow=copyShow">
                        <h2>粘贴游客信息<span @click.stop.prevent="copyShow=false">X</span></h2>
                        <p>每行一个用户资料，客户姓名、身份证号用空格分离，如：</br>张三 341221199812038976</p>
                        <textarea name="" id="" v-model="userInfo" @keyup.86="ctrlV($event)"></textarea>
                        <a href="javascript:;" @click.stop.prevent="copySubmit()">提交</a>
                    </div>
                </div>
              </h2>
               <div class="tourist-fill">
                  <div v-for="(tour,_index) in tourArr">
                    <div class="fill-title">
                      <h1><img src="../assets/images/youke.png" alt="">游客{{_index+1}}</h1>
                      <p>（{{tour.name}}）</p>
                    </div>
                    <div class="fill-content">
                      <div class="tourist-name">
                        <label for="">游客姓名：</label>
                        <Input type="text" v-model="tour.personalName" placeholder="请与证件保持一致"  @on-blur="nameListFun(tour,_index)"></Input>
                        <p v-if="tour.isNameShow">{{tour.tipNameText}}</p>
                      </div>
                      <div class="tourist-sex">
                        <label for="">性别：</label>
                        <Select v-model="tour.sex" >
                          <Option v-for="item in sexListSelect" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                      </div>
                      <div class="tourist-age">
                        <label for="">年龄：</label>
                        <Input type="text" v-model="tour.personalAge" placeholder="请输入年龄"></Input>
                      </div>
                      <div class="card-select" >
                        <label for="">证件类型：</label>
                        <Select v-model="tour.sfId" @on-change="seFun(tour,_index)">
                            <Option v-for="(cd,_in) in cardList" :value ="cd.value" :key ="cd.value">{{cd.label}}</Option>
                        </Select>
                        <Input class="tourist-card" type="text" v-model.trim="tour.personalCard"  placeholder=""  @on-blur="cardListFun(tour,_index)"></Input>
                        <p v-if="tour.isCardShow">{{tour.tipCardText}}</p>
                      </div>
                      <div class="tourist-single">
                        <label for="">房差：</label>
                        <Select v-model="tour.isSingleRoom" @on-change="changeSingle(tour,_index,tourArr)">
                          <Option v-for="item in singleRoomListSelect" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                      </div>
                      <div class="tourist-set">
                        <label for="">接送设置：</label>
                        <Select v-model="tour.venueIndex" @on-change="selectVenues(tour,_index)">
                            <Option v-for="(card,index) in proTourVenues" :value="card.id" :key="index">{{card.venue}}</Option>
                        </Select>
                      </div>
                      <div class="tourist-tel">
                        <label for="">手机：</label>
                        <Input type="text" v-model.trim="tour.personalTel" placeholder='请输入联系电话'  @on-blur="telListFun(tour,_index)"></Input>
                        <p v-if="tour.isTelShow">{{tour.tipTelText}}</p>
                      </div>
                      <div class="tourist-contact">
                        <label for="">是否是联系人：</label>
                        <Select v-model="tour.isContact" @on-change="chooseContact(tour,_index,tourArr)">
                          <Option v-for="item in contactListSelect" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                      </div>
                      <a href="javascript:;" class="clear" @click="clearTour(tourArr,_index)">清空</a>
                    </div>
                   </div>
               </div>
           	</div>
            <!-- 游客联系人信息 -->
            <div class="other-information">
               <h2 class="information-line"><img src="../assets/images/youkelinxiren.png">游客联系人信息</h2>
               <div>
                  <div class="other-name">
                    <label for="">联系人：</label>
                    <!--  @input="syncTourName()"  -->
                      <!-- @blur="identityNameFun(mainName)" -->
                    <Input type="text" v-model="mainName" placeholder="请输入联系人姓名" clearable ></Input>
                    <p v-if="mainNameCon!=''">{{mainNameCon}}</p>
                  </div>
                  <div class="other-tel">
                    <label for="">手机号：</label>
                    <!-- @input="syncTourTel()" -->
                      <!-- @blur="identityTelFun(mainTel)" -->
                    <Input  type="text" placeholder="请输入联系人手机号" v-model="mainTel" clearable  ></Input>
                    <p v-if="mainTelCon!=''">{{mainTelCon}}</p>
                  </div>
                   <div class="other-note">
                        <label for="">备注：</label>
                        <textarea v-model="note" type="text" placeholder=""></textarea>
                   </div>
               </div>
            </div>
            <!-- 销售人员 -->
            <div class="sales-staff">
              <h2 class="information-line"><img src="../assets/images/xiaoshourenyuan.png">对接销售人员</h2>
              <div class="staff-info">    
                <label for="" style="float: left;margin-top: 5px;">对接销售人员：</label>
                <div class="destination">
                	<span id="Destination" v-html="Destination">{{Destination}}</span>
                	<a href="javascript:;" id="btnSelectDest" class="selector" @click.stop.prevent="btnSelectDest">选择</a>
                </div>
                <div class="" v-if="saleBlurif" @click.stop.prevent="btnSelectDestb">
                	<Input type="text" @on-blur="saleBlur" placeholder="请输入对接销售人员姓名" v-model="salename"></Input>
	                <ul v-if="saleBlurif" id="salesListul">
	                  <li @click.stop.prevent="selectedSale(index,user)" v-for="(user,index) in salesList">{{user.UserName}}</li>
	                </ul>
	              	<ul v-if="saleslistb==true">
	                	<li style="color: red;" >找不到符合要求的条件</li>
	              	</ul>
                </div>
                
              </div>
            </div>
            <div class="bookings" v-if="productDetails.attention">
               <h2 class="information-line"><img src="../assets/images/yudingxuzhi.png">预定须知</h2>
               <p v-html="productDetails.attention">{{productDetails.attention}}</p>
            </div>
            <p class="pay-btn"><Checkbox v-model="pact">我已经阅读并同意<a target="_blank" href="http://zhuce.laolvyou.vip/file/%E7%AB%9E%E7%95%8C%E7%A7%91%E6%8A%80%E5%B9%B3%E5%8F%B0%E6%9C%8D%E5%8A%A1%E5%8D%8F%E8%AE%AE.pdf">《竞界科技老旅游 SaaS 平台服务协议》</a></Checkbox><a href="javascript:;" v-if="isAck==1" @click="addOrderFun()">提交订单</a><a href="javascript:;" v-if="isAck!=1" @click="addReserveFun()">立即预定</a></p>
       </div>
       <!-- 费用明细 -->
       <div class="cost-detail">
           <div>
                <p>费用明细</p>
                <div>
                    <p v-for="policy in pricePolicyList" v-if="policy.count>0">{{policy.policyName}}<span v-if="policy.beforeDiscountDirectPrice==null">{{policy.count}}*￥{{policy.directPrice}}=￥{{mul(policy.count,policy.directPrice)}}</span><span v-if="policy.beforeDiscountDirectPrice!=null">{{policy.count}}*￥{{policy.beforeDiscountDirectPrice}}=￥{{mul(policy.count,policy.beforeDiscountDirectPrice)}}</span></p>
                    <!-- <p v-for="policy in pricePolicyList" v-if="policy.count>0&&userType==2">{{policy.policyName}}<span>{{policy.count}}*￥{{policy.directPrice}}=￥{{policy.singleSum}}</span></p> -->
                    <!-- <p>儿童<span>6000</span></p> -->
                    <!-- <p>单房差<span>{{singleRoomSum}}</span></p> -->
                    <!-- <p v-if="singlePrice!=''&&userType==1">单房差<span>{{singlePrice}}</span></p> -->
                    <p v-if="singleRoomPrice!=0">单房差<span>￥{{singleRoomPrice}}</span></p>
                    <p v-if="userType==1">分销返佣<span>-￥{{rebateSum}}</span></p>
                    <div class="venue-price" v-if="venueList.length!=0">接送费用
                      <div>
                        <p v-for="(ven,index) in venueList">{{ven.venue}}：{{ven.index}}*{{ven.dropoffprice+ven.shuttleprice}}=￥{{ven.index*(ven.dropoffprice+ven.shuttleprice)}}</p>
                      </div>
                    </div>
                    <!-- <p>总价<span>￥{{settlementPrice}}</span></p> -->
                    <!-- <p>总价<span>￥{{sum}}</span></p> -->
                    <p v-if="discountPrice!=0">优惠<span>-￥{{discountPrice}}</span></p>
                </div>
                <h2>结算价<span>{{settlementPrice}}</span></h2>
            </div>
       </div>
      <!-- 确认单房差模态框 -->
      <Modal
          v-model="modalConfirmSingle"
          class-name="vertical-center-modal modal-confirm-single"
          width="380">
          <div>
              <div class="confirm-top">
              <img src="../assets/images/cancel-icon.png" alt="">
              <h2>是否继续</h2>
              </div>
              <div class="confirm-con">
                  <p>该订单未添加单房差，请确认是否继续提交！</p>
                  <div>
                      <a href="javascript:;" @click="modalConfirmSingle=false">再想想</a>
                      <a href="javascript:;" class="esp" @click.stop.prevent="nextSubmitFun()">继续</a>
                  </div>
              </div>
          </div>
      </Modal>
      <feedBack></feedBack>
       <!-- 引入底部导航 -->
       <Footer></Footer>
    </div>
</template>
<script>
import { apiDefault } from "../common/env";
// import { mapState, mapActions, mapMutations } from "vuex";
import tools from "../common/tools";
import {
  getPolicysList,
  getMessage,
  getProductDepartures,
  getUpload,
  getUploadByText,
  addOrderInfo,
  getVenue,
  downLoadUrl,
  GetAllUserByCondition
} from "../services/index";
import supplierHeader from "../components/supplier-header.vue";
import Footer from "../components/footer.vue";
import feedBack from "../components/feedBack.vue";
export default {
  data() {
    return {
      modalConfirmSingle:false,//确认单房差模态框
      pact:false,//是否同意合同
      startDate:'',//出发日期
      tripDay:'',//行程天数
      // hh:'这是一个申请',
      isHide: false, //
      apiDefault: "", //服务器url
      sumPrice: 0, //总价
      pricePolicyList: [], //价格策略列表
      countArr: [], //人数数组
      productDetails: {}, //产品详情
      trafficList: '', //航班信息
      proTourVenues: [], //接送设置列表
      originShow: false, //控制出发地显隐
      departuresList: [], //出发地列表
      departureCity: "", //出发城市
      deIndex: 0, //出发地列表初始值
      saleIndex:0,//选择销售初始值
      singleRoomSum: 0, //单房差总价
      singlePrice:'',//erp单房差价格
      singleRoomPrice:'',//c端单房差价格
      singleInit:'',//c端单房差初始价格
      rebateSum: 0, //返佣总价
      sum: 0, //总价
      settlementPrice: 0, //结算价
      tourArr: [], //游客信息列表
      without:true,//
      cardList: [
        {
          value: "身份证",
          label: "身份证"
        },
        {
          value: "护照",
          label: "护照"
        },
        {
          value: "回乡证",
          label: "回乡证"
        },
        {
          value: "军旅证",
          label: "军旅证"
        },
        {
          value: "其他",
          label: "其他"
        }
      ], //身份证等证件列表
      sexListSelect:[
        {
          value:'男',
          label:'男'
        },
        {
          value:'女',
          label:'女'
        }
      ],//性别选择列表
      singleRoomListSelect:[
        {
          value:1,
          label:'是'
        },
        {
          value:2,
          label:'否'
        }
      ],//单房差选择列表
      contactListSelect:[
        {
          value:1,
          label:'是'
        },
        {
          value:2,
          label:'否'
        }
      ],//联系人列表选择
      // mainPeople:{},//联系人信息对象
      copyShow: false, //无格式粘贴部分显隐
      file: "", //上传文件
      userInfo: "", //用户信息
      copyReturnData: [], //无格式粘贴返回数据
      uploadReturnData: [], //文件上传返回数据
      policyIdArr: [], //价格策略id列表
      mainNameCon: "", //联系人姓名验证
      mainTelCon: "", //联系人电话验证
      note: "", //联系人备注
      mainName:'',//联系人姓名
      mainTel:'',//联系人手机号
      nameList: [], //旅客姓名列表
      codeList: [], //旅客身份证列表
      telList: [], //旅客联系方式列表
      sfIdArray: [], //上传身份证的id数组
      policyIdList: [], //旅客价格策略列表
      venueidList: [], //游客接送地点id
      sexList: [], //旅客性别列表
      ageList:[],//旅客年龄列表
      tourid: "", //选择的团期id
      singleRoomList: [], //单房差列表
      touristFile: "", //旅客文件
      userType:'',//用户类型
      venueList:[],//接送设置组合
      singleRoomList:[],//旅客单房差列表
      venueTotalPrice:'',//接送配置总价
      flag:false,//为true提交订单
      submitFlag:1,//是否可以提交
      orgId:'',
      stock:'',
      isAck:'',//是否及时确认
      stockMax:false,//库存是否达到上线
      templateUrl:'',//无格式粘贴路径模板
      saleName:'',//销售人员名称（点选择  直接出来所有数据的）
      salesList:[],//销售人员列表
      
      //2018/12/11  熊二更改销售人员列表新增的
      userDataList:[],//销售人员原数据
      saleslistb:false,//控制销售人员找不到条件时的显示隐藏
      Destination:'',//选择销售人员默认为空
      saleBlurif:false,//控制销售人员列表显示隐藏
      salename:'',//搜索时用到的销售人员名称（模糊查询时存销售人员名称的）
      //2018/12/11  熊二更改销售人员列表新增结束
      
      saleShow:false,//销售列表是否显示
      saleID:'',//销售id
      deptID:'',//销售人员部门ID
      deptName:'',//销售人员部门名称
      fillIndex:1,//填写说明默认值
      fillShow:false,//填写说明默认值
      discountPrice:0,//优惠总价
      useDiscount:false,//是否有优惠
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
    // 订单页面初始化
    orderInit() {
      console.log(this.$route.params.id);
      this.apiDefault = apiDefault;
      this.countArr = JSON.parse(tools.getLocalStorage("countArr"));
      console.log(this.countArr);
      this.departureCity = tools.getLocalStorage("departure");
      this.tourid = tools.getLocalStorage("tourid");
        // 获取用户类型
      this.userType = tools.getLocalStorage("userType");
      this.orgId = tools.getLocalStorage("orgId");
      this.stock = tools.getLocalStorage("stock");
      this.isAck = tools.getLocalStorage("isAck");

      // 请求下载模板路径
      downLoadUrl().then(response => {
        console.log(response);
        if (response.meta.success == true) {
          console.log("下载模板路径请求成功");
            this.templateUrl=response.meta.message;
        } else {
          console.log("下载模板路径请求失败");
        }
      })
      .catch(err => {
        console.log("下载模板路径请求异常", err);
      });
      // 请求价格策略参数
      let params = {
        'proid': this.$route.params.id,
        'isOutgoing': this.$route.params.state,
        'orgId': this.$route.params.orgid,
        'tourDate': tools.getLocalStorage("selectedDay"),
        'siteid': tools.getSessionStorage("siteid"),
        'tourid':this.tourid
      };
      // 价格策略接口绑定
      this.sumPrice = 0;
      this.tourArr = [];
      this.policyIdArr = [];
      this.singleRoomList = [];
		getPolicysList(params).then(response => {
			console.log(response);
			if (response.meta.success == true) {
				console.log("价格策略数据获取成功");
				this.pricePolicyList = response.data[0].pricePolicyList;
				if (this.pricePolicyList.length != 0) {
					for (let i = 0; i < this.pricePolicyList.length; i++) {
						this.$set(this.pricePolicyList[i], "count", this.countArr[i]);
						// this.$set(this.pricePolicyList[i], "singleRoomCount", 0);
						console.log(this.pricePolicyList,'llllllllllll');
						this.policyIdArr.push(this.pricePolicyList[i].id);
						for (let j = 0; j < this.pricePolicyList[i].count; j++) {
							// 组合游客信息数组
							this.tourArr.push({
								name: this.pricePolicyList[i].policyName,
								touristType: this.pricePolicyList[i].touristType,
                id: this.pricePolicyList[i].id,
                single: this.pricePolicyList[i].singleRoomPrice,
                seat:this.pricePolicyList[i].seat,
								//增加一个身份证的标识
								sfId: "身份证",
								sex: "男",
								venueIndex: 1,
								// indexTour:i+j,
								isNameShow: false,
								tipNameText: "",
								isCardShow: false,
								tipCardText: "",
								isTelShow: false,
								tipTelText: "",
								personalName: "",
								personalTel: "",
                personalAge: "",
                personalCard:"",
                isSingleRoom:2,
                isContact:2,
								venue:{'venue':'请选择','dropoffprice':0,'shuttleprice':0,'id':1},//配送对象
							});
              if(j==0){
                this.tourArr[0].isContact=1;
              }
						}
						// this.mainName=this.tourArr[0].personalName;
            // console.log('测试人数问题',this.tourArr);
            if(this.pricePolicyList[i].useDiscount==true){
              this.useDiscount=true;
            }
					}
				}

				// 信息展示接口参数
				let paramsMessage = {
					proid: this.$route.params.id,
					tourid: tools.getLocalStorage("tourid"),
					depid: tools.getLocalStorage("departureId"),
					siteid: tools.getSessionStorage("siteid")
				};
				// 信息展示接口绑定
				getMessage(paramsMessage).then(response => {
					console.log(response);
					if (response.meta.success == true) {
						console.log("信息展示数据获取成功");
            this.productDetails = response.data.proProduct;
            if(response.data.startDate!=null&&response.data.startDate!=''){
               this.startDate=response.data.startDate.substring(0,10);
            }
            this.tripDay=response.data.days;
            if(response.data.trafficDto.length!=0){
               this.trafficList = response.data.trafficDto[0];
            }
            // this.singleRoomPrice=response.data.singleRoomPrice;
						// this.proTourVenues = response.data.proTourVenues;
            this.singleInit=response.data.singleRoomPrice;
            let sumInit=0;
            for(let i=0;i<this.pricePolicyList.length;i++){
              if(this.pricePolicyList[i].touristType==1){
                sumInit+=this.pricePolicyList[i].count;
              }
            }
            console.log(sumInit);
            // 以下逻辑修改，不根据人数判断单房差啦
            // if(sumInit%2==0){
            //   this.singleRoomPrice=0;
            // }
            // else {
            //     this.singleRoomPrice=this.singleInit;
            // }
            this.singleRoomPrice=0;
            // this.computedSum();
            console.log('这哈哈哈哈哈');
            this.sumTotalPrice();
					} else {
						console.log("信息展示数据获取失败");
					}
					})
					.catch(err => {
					console.log("信息展示接口获取异常", err);
					// this.$Message.info('信息展示接口获取异常');
				});
			} else {
				console.log("价格策略数据获取失败");
			}
			})
			.catch(err => {
			console.log("价格策略接口获取异常", err);
			// this.$Message.info('价格策略接口获取异常');
			});
			// 出发地接口绑定
			let paramsId = {
				proid: this.$route.params.id,
				siteid: tools.getSessionStorage("siteid")
			};
		getProductDepartures(paramsId)
			.then(response => {
			console.log(response);
			if (response.meta.success == true) {
				console.log("出发地数据获取成功");
				this.departuresList = response.data.departures;
				// 把出发地id放入缓存
				// tools.setLocalStorage('departureId',response.data.departure.id);
			} else {
				console.log("出发地数据获取失败");
			}
			})
			.catch(err => {
			console.log("出发地接口获取异常", err);
			// this.$Message.info('出发地接口获取异常');
			});

        // 接送设置
        let paramsVenue={
          'proid':this.$route.params.id,
          'depid':tools.getLocalStorage('departureId'),
          'tourid':tools.getLocalStorage('tourid'),
          'siteid':tools.getSessionStorage('siteid')
        }
        getVenue(paramsVenue).then((response)=>{
            console.log(response);
            if(response.meta.success==true){
                console.log('接送设置获取成功');
                this.proTourVenues=response.data;
                this.proTourVenues.unshift({'venue':'请选择','dropoffprice':0,'shuttleprice':0,'id':1});
            }
            else{
                console.log('接送设置获取失败');
            }
        }).catch((err)=>{
            console.log('接送设置接口异常报错',err);
            // this.$Message.info('接送设置接口异常报错');
        });
    },
    // 填写说明显示
    fillBtn(){
      this.fillShow=true;
    },
    //选择出发城市
    selectedOrigin(index, obj) {
      this.deIndex = index;
      this.departureCity = obj.departure;
      // console.log(obj);
      // 把出发地id放入缓存
      tools.setLocalStorage("departure", obj.departure);
      tools.setLocalStorage("departureId", obj.id);
      this.originShow = !this.originShow;
      // this.orderInit();
    },
    // 失去焦点时销售人员情况
    saleBlur() {
    	
      if (this.salesList.length == 0) {
        this.saleName = "";
      }
    },
    // 选择销售
    selectedSale(index, obj) {
      this.saleIndex = index;
      this.saleName = obj.UserName;
      //console.log(this.saleName)
      this.Destination=obj.UserName;
      this.saleID=obj.ID;
//    console.log(this.saleID)
//    console.log(this.saleName)
      this.deptID=obj.DeptID;
      this.deptName=obj.DeptName;
      this.saleShow = !this.saleShow;
    },
    // 计算浮框中价格
    // computedSum() {
    //   // 把单房差总价、返佣总价、总价、结算价置空，防止累加
    //   // let singleRoomSum = 0;
    //   this.rebateSum = 0;
    //   this.sum = 0;
    //   this.settlementPrice = 0;
    //   this.venueTotalPrice=0;
	
    //   if(this.pricePolicyList.length!=0){
    //     for(let i=0;i<this.pricePolicyList.length;i++){
    //       // B端
    //       if(this.userType==1){
    //         this.sum+=this.pricePolicyList[i].salesPrice*this.pricePolicyList[i].count;
    //         this.settlementPrice+=this.pricePolicyList[i].salesPrice*this.pricePolicyList[i].count - this.pricePolicyList[i].count*this.pricePolicyList[i].rebatePrice;
    //         this.rebateSum+= this.pricePolicyList[i].count*this.pricePolicyList[i].rebatePrice;
    //         this.pricePolicyList[i].singleSum=this.pricePolicyList[i].salesPrice*this.pricePolicyList[i].count - this.pricePolicyList[i].count*this.pricePolicyList[i].rebatePrice;
    //       }
    //       // C端
    //       if(this.userType==2){
    //         this.sum+=this.pricePolicyList[i].directPrice*this.pricePolicyList[i].count;
    //         this.settlementPrice+= parseInt(this.pricePolicyList[i].directPrice)* parseInt(this.pricePolicyList[i].count);
    //         this.pricePolicyList[i].singleSum=this.pricePolicyList[i].directPrice*this.pricePolicyList[i].count;
    //       }
    //     }
    //     this.settlementPrice+=parseInt(this.singleRoomPrice);
    //     this.sum+=parseInt(this.singleRoomPrice);
    //   }
    // },
	
	// 计算总价
	sumTotalPrice(){
    
    // this.computedSum();
    this.rebateSum = 0;
    this.sum = 0;
    this.settlementPrice = 0;
    this.discountPrice = 0;
    this.venueTotalPrice=0;
	
    if(this.pricePolicyList.length!=0){
      for(let i=0;i<this.pricePolicyList.length;i++){
        // B端
        if(this.userType==1){
          // this.sum+=parseInt(this.pricePolicyList[i].salesPrice)*this.pricePolicyList[i].count;
          // this.settlementPrice+=parseInt(this.pricePolicyList[i].salesPrice)*this.pricePolicyList[i].count - this.pricePolicyList[i].count*parseInt(this.pricePolicyList[i].rebatePrice);
          // this.discountPrice+=parseInt(this.pricePolicyList[i].discountSalesPrice)*this.pricePolicyList[i].count;
          // this.rebateSum+= this.pricePolicyList[i].count*parseInt(this.pricePolicyList[i].rebatePrice);
          // this.pricePolicyList[i].singleSum=parseInt(this.pricePolicyList[i].salesPrice)*this.pricePolicyList[i].count - this.pricePolicyList[i].count*parseInt(this.pricePolicyList[i].rebatePrice);
          this.sum=this.add(this.mul(this.pricePolicyList[i].salesPrice,this.pricePolicyList[i].count),this.sum);
          this.settlementPrice=this.add(this.mul(this.pricePolicyList[i].salesPrice,this.pricePolicyList[i].count),this.settlementPrice);
          if(this.pricePolicyList[i].discountSalesPrice!=null){
            this.discountPrice=this.add(this.mul(this.pricePolicyList[i].discountSalesPrice,this.pricePolicyList[i].count),this.discountPrice);
          }
          this.rebateSum=this.add(this.mul(this.pricePolicyList[i].count,this.pricePolicyList[i].rebatePrice),this.rebateSum);
          this.pricePolicyList[i].singleSum=this.mul(this.pricePolicyList[i].salesPrice,this.pricePolicyList[i].count);
        }
        // C端
        if(this.userType==2){
          // this.sum+=parseInt(this.pricePolicyList[i].directPrice)*this.pricePolicyList[i].count;
          // this.settlementPrice+= parseInt(this.pricePolicyList[i].directPrice)* parseInt(this.pricePolicyList[i].count);
          // this.discountPrice+= parseInt(this.pricePolicyList[i].discountDirectPrice)* parseInt(this.pricePolicyList[i].count);
          // this.pricePolicyList[i].singleSum=parseInt(this.pricePolicyList[i].directPrice)*this.pricePolicyList[i].count;
          this.sum=this.add(this.mul(this.pricePolicyList[i].directPrice,this.pricePolicyList[i].count),this.sum);
          this.settlementPrice= this.add(this.mul(this.pricePolicyList[i].directPrice , parseInt(this.pricePolicyList[i].count)),this.settlementPrice);
          if(this.pricePolicyList[i].discountDirectPrice!=null){
            this.discountPrice= this.add(this.mul(this.pricePolicyList[i].discountDirectPrice , parseInt(this.pricePolicyList[i].count)),this.discountPrice);
          }
          this.pricePolicyList[i].singleSum=this.mul(this.pricePolicyList[i].directPrice,this.pricePolicyList[i].count);
        }
      }
      this.settlementPrice=this.add(parseInt(this.singleRoomPrice), this.settlementPrice);
      this.sum=this.add(parseInt(this.singleRoomPrice),this.sum);
    }
    for(let i=0;i<this.tourArr.length;i++){
      if(this.tourArr[i].seat==true){
        this.venueTotalPrice=this.add(this.add(this.tourArr[i].venue.shuttleprice,this.tourArr[i].venue.dropoffprice),this.venueTotalPrice);
      }
    }
    this.settlementPrice=this.add(this.venueTotalPrice,this.settlementPrice);
    this.sum=this.add(this.venueTotalPrice,this.sum);
  },

    // 减少出游人数
    reduceCount(pricePolicyList,policy) {
      console.log('pricePolicyList',pricePolicyList);
      console.log('policy',policy);
      // 判断是否还可以继续减少
      let countSum=0;
      for(let i=0;i<this.pricePolicyList.length;i++){
        if(this.pricePolicyList[i].touristType==1){
          countSum+=this.pricePolicyList[i].count;
        }
      }
      if (policy.touristType == 1 && policy.count == 1 && countSum<2) {
        policy.count = 1;
        this.$Message.info("最少选择一个成人");
        return;
      } else if (policy.count > 0) {
        policy.count--;
        this.stockMax=false;
      } else {
        this.$Message.info("已经是最少人数了");
        return;
      }
      // 计算单个旅客总价
      if (policy.count == 0) {
        policy.singleSum = 0;
      } else {
        // policy.singleSum = policy.count * policy.salesPrice + policy.singleRoomPrice * policy.singleRoomCount - policy.rebatePrice * policy.count;
        policy.singleSum =this.mul(policy.count , policy.salesPrice);
        // policy.singleSum = this.sub(this.mul(policy.count , policy.salesPrice) , this.mul(policy.rebatePrice , policy.count));
      }
      // this.computedSum();
      // 旅客信息对应增减
      for (let j = this.tourArr.length - 1; j > -1; j--) {
        if (this.tourArr[j].id == policy.id) {
          console.log('tourArr',this.tourArr[j]);
          console.log('venueList',this.venueList);
          // 配送价格对应减少
          for(let v=0;v<this.venueList.length;v++){
            if(this.tourArr[j].venue.venue==this.venueList[v].venue && this.tourArr[j].seat==true){
              this.venueList[v].index=this.venueList[v].index-1;
            }
          }
          console.log(this.venueList,'venueList');
          this.tourArr.splice(j, 1);
          break;
        }
      }

       //计算单房差
      this.singleRoomPrice=0;
      for(let i=0;i<this.tourArr.length;i++){
        if(this.tourArr[i].isSingleRoom==1){
          console.log('hhhhhsingle');
          this.singleRoomPrice=this.add(this.tourArr[i].single,this.singleRoomPrice);
        }
      }
      this.countArr = [];
      for (let i = 0; i < this.pricePolicyList.length; i++) {
        this.countArr.push(this.pricePolicyList[i].count);
      }
      //把选择人数放入缓存
      tools.setLocalStorage("countArr", JSON.stringify(this.countArr));
      this.sumTotalPrice();
      console.log(this.countArr,'hhhhhcountArrcountArrcountArrcountArrcountArrcountArr');
    },
    // 增加出游人数
    addCount(pricePolicyList,policy) {
      // 判断总人数是否超出库存
      let countSum=0;
      for(let i=0;i<this.pricePolicyList.length;i++){
        countSum+=this.pricePolicyList[i].count;
      }
      if(countSum>=this.stock){
        this.$Message.info('已达库存上线~');
        this.stockMax=true;
        return;
      }
      policy.count++;
      //计算单房差
      this.singleRoomPrice=0;
      for(let i=0;i<this.tourArr.length;i++){
        if(this.tourArr[i].isSingleRoom==1){
          this.singleRoomPrice=this.add(this.tourArr[i].single,this.singleRoomPrice);
        }
      }
     
      // 计算单个旅客总价
      // policy.singleSum = policy.count * policy.salesPrice + policy.singleRoomPrice * policy.singleRoomCount - policy.rebatePrice * policy.count;
      policy.singleSum = policy.count * policy.salesPrice;
      // policy.singleSum = policy.count * policy.salesPrice - policy.rebatePrice * policy.count;
      this.sumTotalPrice();
      // this.computedSum();
      this.tourArr.push({
        name: policy.policyName,
        touristType: policy.touristType,
        id: policy.id,
        single:policy.singleRoomPrice,
        seat:policy.seat,
        //增加一个身份证的标识
        sfId: "身份证",
        sex: "男",
        venueIndex: 1,
        // indexTour:i+j,
        isNameShow: false,
        tipNameText: "",
        isCardShow: false,
        tipCardText: "",
        isTelShow: false,
        tipTelText: "",
        personalName: "",
        personalTel: "",
        personalAge: "",
        personalCard:"",
        isSingleRoom:2,
        isContact:2,
        venue:{'venue':'请选择','dropoffprice':0,'shuttleprice':0,'id':1},//配送对象
      });
      this.countArr = [];
      for (let i = 0; i < this.pricePolicyList.length; i++) {
        this.countArr.push(this.pricePolicyList[i].count);
      }
      //把选择人数放入缓存
      tools.setLocalStorage("countArr", JSON.stringify(this.countArr));
      console.log(this.countArr,'countArrcountArrcountArrcountArrcountArrcountArradd');
    },
    // 清空指定联系人信息
    clearTour(tourArr,index){
      this.tourArr[index].personalName='';
      this.tourArr[index].personalTel='';
      this.tourArr[index].personalAge='';
      this.tourArr[index].personalCard='';
      this.tourArr[index].isSingleRoom=2;
      this.tourArr[index].isContact=2;
      this.tourArr[index].sfId="身份证";
      this.tourArr[index].sex="男";
      this.tourArr[index].venueIndex=1;
      this.tourArr[index].isNameShow=false;
      this.tourArr[index].isCardShow=false;
      this.tourArr[index].isTelShow=false;
      this.tourArr[index].tipNameText='';
      this.tourArr[index].tipCardText='';
      this.tourArr[index].tipTelText='';
    },
    //选择联系人
    chooseContact(tour,_index,tourArr){
      if(tour.isContact==1){
         for(let i=0;i<tourArr.length;i++){
          if(i!=_index){
            tourArr[i].isContact=2;
          }
        }
        this.mainName=tour.personalName;
        this.mainTel=tour.personalTel;
      }
    },
    changeSingle(tour,_index,tourArr){
      if(tour.isSingleRoom==1){
        this.singleRoomPrice=0;
        for(let i=0;i<tourArr.length;i++){
          if(tourArr[i].isSingleRoom==1){
            this.singleRoomPrice=this.add(tourArr[i].single,this.singleRoomPrice);
          }
        }
        this.sumTotalPrice();
      }
      if(tour.isSingleRoom==2){
        this.singleRoomPrice=0;
        for(let i=0;i<tourArr.length;i++){
          if(tourArr[i].isSingleRoom==1){
            this.singleRoomPrice=this.add(tourArr[i].single,this.singleRoomPrice);
          }
        }
        // if(this.singleRoomPrice==0){
        //   let sumPeople=0;
        //   for(let i=0;i<this.pricePolicyList.length;i++){
        //       if(this.pricePolicyList[i].touristType==1){
        //         sumPeople+=this.pricePolicyList[i].count;
        //       }
        //   }
        //   if(sumPeople%2==0){
        //       this.singleRoomPrice=0;
        //   }
        //   else {
        //       this.singleRoomPrice=this.singleInit;
        //   }
        // }
        this.sumTotalPrice();
      }
    },
    // 智能添加
    copyFun() {
      this.copyShow = true;
    },
    //对接销售人员 点选择时
    btnSelectDest(){
    	this.salesList=[];
    	this.saleslistb = false;//找不到符合条件的隐藏
    	this.saleBlurif = true;//销售人员列表显示
      // if(this.saleName!==''){
        let params={
          'orgID':this.orgId
        }
        GetAllUserByCondition(params).then((response)=>{
            console.log(response);
            console.log('搜索销售人员成功');
            
            if(response.length!=0){
            	this.saleName="1";
              	this.salesList=response;
              	this.userDataList=response;//这里保存一份原始数据 这样写为了避免后面用到时再次请求接口
               	console.log(this.salesList);
            }
            else{
              this.saleName='';
            }
        }).catch((err)=>{
            console.log('搜索销售人员异常',err);
            this.saleslistb=true;//找不到符合条件的显示
    		this.saleBlurif=false;//销售人员列表隐藏
        });
    },
    btnSelectDestb(){},
    //监听粘贴键
    ctrlV(event) {
      this.userInfo = this.userInfo + "\n";
      // console.log(this.userInfo);
    },
    //无格式粘贴请求接口
    copySubmit() {
      let params = {
        tourinfo: this.userInfo
      };
      getUploadByText(params)
        .then(response => {
          console.log(response);
          if (response.meta.success == true) {
            console.log("无格式粘贴数据获取成功");
            this.copyReturnData = response.data;
            // this.$Message.info('游客信息提交成功');
            // console.log(this.userInfo);
            this.copyShow = false;
            for (let i = 0; i < Math.min(this.tourArr.length,this.copyReturnData.length); i++) {
              this.tourArr[i].personalName = this.copyReturnData[i].guestname;
              this.tourArr[i].personalCard = this.copyReturnData[i].guestcard;
              // this.tourArr[i].personalTel = this.copyReturnData[i].guesttelphone;
              // this.tourArr[i].sfId = this.copyReturnData[i].guestcardtype;
              this.tourArr[i].personalAge = this.copyReturnData[i].guestage;
              this.tourArr[i].sex = this.copyReturnData[i].guestsex;
            }
            for(let i = 0; i < this.tourArr.length; i++){
              if(this.tourArr[i].isContact==1){
                this.mainName=this.tourArr[i].personalName;
                this.mainTel=this.tourArr[i].personalTel;
              }
            }
          } else {
            console.log("无格式粘贴数据获取失败");
            this.$Message.info(response.meta.message);
          }
        })
        .catch(err => {
          console.log("无格式粘贴接口获取异常", err);
          // this.$Message.info('无格式粘贴接口获取异常');
        });
    },
    // 全局控制
    globalFun() {
    	console.log('111');
      this.isHide = false;
      this.originShow = false;
      this.copyShow = false;
      this.fillShow = false;
      this.saleBlurif = false;
    },
    globalFunT() {
      this.isHide = !this.isHide;
    },
    //上传文件
    // getFile(event) {
    //     this.file = event.target.files[0];
    //     console.log(this.file);
    // },
    getFile(event) {
      let reader = new FileReader();
      let file = event.target.files[0];
      // let type=img1.type;//文件的类型，判断是否是图片
      // let size=img1.size;//文件的大小，判断图片的大小
      let uploadFile = new FormData();
      uploadFile.append("file", file, file.name);
      // 上传文件接口绑定
      getUpload(uploadFile).then(response => {
        console.log(response);
        if (response.meta.success == true) {
          console.log("上传文件数据获取成功");
          event.target.value='';
          this.touristFile = response.data.fileName;
          this.uploadReturnData = response.data.orderTouristList;
          for (let i = 0; i < this.tourArr.length; i++) {
            this.tourArr[i].personalName = this.uploadReturnData[i].guestname;
            this.tourArr[i].personalCard = this.uploadReturnData[i].guestcard;
            this.tourArr[i].personalTel = this.uploadReturnData[i].guesttelphone;
            //    this.tourArr[i].sfId=this.uploadReturnData[i].guestcardtype;
            this.tourArr[i].sex = this.uploadReturnData[i].guestsex;
            this.tourArr[i].personalAge = this.uploadReturnData[i].guestage;
            this.tourArr[i].sfId = this.uploadReturnData[i].guestcardtype;
          }
          for(let i = 0; i < this.tourArr.length; i++){
            if(this.tourArr[i].isContact==1){
               this.mainName=this.tourArr[i].personalName;
               this.mainTel=this.tourArr[i].personalTel;
            }
          }
        } else {
          // event.target.files=null;
          // file.remove();
          this.$Message.info(response.meta.message);
          event.target.value='';
          console.log("上传文件数据获取失败");
          // setTimeout(()=>{
          //   window.location.reload();
          // }, 3000);
        }
      });
    },
    //联系人姓名失去焦点的时候验证
    // identityNameFun(str) {
    //   if (str == "") {
    //     this.mainNameCon = "联系人姓名不能为空";
    //   } else {
    //     this.mainNameCon = "";
    //   }
    // },
    //联系人电话失去焦点的时候验证
    // identityTelFun(str) {
    //   let pattern = /^0{0,1}(1[0-9][0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/;
    //   if (!pattern.test(str) && str != "") {
    //     this.mainTelCon = "请输入正确的电话号码";
    //   } else if (str == "") {
    //     this.mainTelCon = "联系人手机号码不能为空";
    //   } else {
    //     this.mainTelCon = "";
    //   }
    // },
    //证件类型选择变化清除提示
    seFun(tour, index) {
      tour.tipCardText = "";
    },
    //旅客姓名列表判断
    nameListFun(tour, index) {
      console.log("旅客姓名", tour.personalName);
      if (!tour.personalName) {
        tour.tipNameText = "旅客姓名不能为空";
        this.$set(tour, "isNameShow", true);
      } else {
        tour.tipNameText = "";
        this.$set(tour, "isNameShow", false);
      }
      if(tour.isContact==1){
        this.mainName=tour.personalName;
      }
    },
     //旅客联系电话判断
    telListFun(tour,index){
      let pattern = /^0{0,1}(1[0-9][0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/;
      if(!pattern.test(tour.personalTel)&&tour.personalTel!=''){
          tour.tipTelText="请输入正确的手机号码";
          this.$set(tour,'isTelShow',true);
      }
     else{
          this.$set(tour,'isTelShow',false);
      }
      if(tour.isContact==1){
        this.mainTel=tour.personalTel;
      }
    },
    //旅客身份证列表判断
    cardListFun(tour, index) {
      let reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
      let arr1 = [];
      for (let i = 0; i < index; i++) {
        arr1.push(tour.personalCard);
      }
      // console.log(arr1);
      if (!reg.test(tour.personalCard) &&tour.personalCard != "" && tour.personalCard != undefined && tour.sfId == "身份证") {
        tour.tipCardText = "旅客身份证信息不合法";
        this.$set(tour, "isCardShow", true);
        tour.personalAge='';
        return;
        console.log(!tour.personalCard);
      } else if (tour.personalCard == "" && tour.sfId == "身份证") {
        tour.tipCardText = "旅客身份证信息不能为空";
        this.$set(tour, "isCardShow", true);
      } else {
        this.$set(tour, "isCardShow", false);
        tour.tipCardText = "";
      }
      // 获取性别
      // 获取年龄
      if(tour.sfId == "身份证" && tour.personalCard!='' && tour.personalCard.length==18){
          console.log(parseInt(tour.personalCard.substr(16, 1)),'性别----------------');
          if (parseInt(tour.personalCard.substr(16, 1)) % 2 == 1) {
            tour.sex="男";
          } else {
            tour.sex="女";
          }
          var myDate = new Date();
          var month = myDate.getMonth() + 1;
          var day = myDate.getDate();
          var age = myDate.getFullYear() - tour.personalCard.substring(6, 10) - 1;
          if (tour.personalCard.substring(10, 12) < month || tour.personalCard.substring(10, 12) == month && tour.personalCard.substring(12, 14) <= day) {
              age++;
          }
          if(age<0){
            tour.tipCardText="旅客身份证信息不合法";
            this.$set(tour, "isCardShow", true);
            tour.personalAge='';
          }
          if(age==0){
            tour.personalAge==1;
          }
          if(age>0){
            tour.personalAge=age;
          }
      }
       
      // console.log(tour.tipCardText);
    },
    //判断联系人信息是否填写
    judgePersonIsCorrect(obj) {
      if (tools.isUndefinedOrNull(obj)) {
        return false;
      }
      if (tools.trim(obj.mainName) == "") {
        this.mainNameCon = "姓名不能为空";
        return false;
      }
      if (tools.trim(obj.mainTel) == "") {
        this.mainTelCon = "手机号码不能为空";
        return false;
      }
      let pattern = /^0{0,1}(1[0-9][0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/;
      if (!pattern.test(obj.mainTel)) {
        this.mainTelCon = "请输入正确的手机号码";
        return false;
      }
    },
    //判断旅客信息的值填写的是否正确
    judgeGuestIsCorrect(array) {
        console.log(array);
        let objArr = []; 
        // 如果空的数量=数组的数量   弹出提示填写手机号，
        // 如果空的数量小于数组的数量，则进行手机号码验证。
        // 验证根据，isHave="1" 则进行验证，=0不验证
        let phoneNum = 0;
        array.forEach((item,index) => {
            console.log(item,index);
            let objIndex ={};
            if(item.personalTel=='' || tools.isUndefinedOrNull(item.personalTel)){
                objIndex['isHave'] = '0';
                objIndex['index'] = index;
                objArr.push(objIndex);
                phoneNum = phoneNum+1;
            } else{
                objIndex['isHave'] = '1';
                objIndex['index'] = index;
                objArr.push(objIndex);
            }
            // console.log(objArr,'11111111111-------------',phoneNum);
        });

        // 对游客信息进行校验
        for(var i = 0;i<array.length;i++){
          if(array[i].isCardShow==true){
            this.flag = false;
            break;
            console.log('1111111111111111111111111111111111111111111');
          }
          else{
             this.flag = true;
             console.log('1111111111111111111111111111111111111121111');
          }
            //姓名
            if(tools.isUndefinedOrNull(array[i].personalName) || tools.trim(array[i].personalName) == ''){
                array[i].isNameShow = true;
                array[i].tipNameText = '游客姓名不能为空';
                this.flag = false;
                break;
            } else{
                this.flag = true;
            }
            //证件类型
            let reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/; 
            // if(array[i].sfId == "身份证"){
                  if(tools.isUndefinedOrNull(array[i].personalCard) || tools.trim(array[i].personalCard) == ''){
                    array[i].isCardShow = true;
                    array[i].tipCardText = '证件号不能为空';
                    this.flag = false;
                    break;
                } else{
                    this.flag = true;
                }
            // }
            if(array[i].personalCard !="" && !tools.isUndefinedOrNull(array[i].personalCard)&&array[i].sfId=="身份证"){
                if ((parseInt(array[i].personalCard.substr(16, 1)) % 2 == 1&&array[i].sex=="女") || (parseInt(array[i].personalCard.substr(16, 1)) % 2 == 0&&array[i].sex=="男")) {
                    this.$Message.info('身份证与性别不符');
                    // this.tipText="身份证与性别不符";
                    // this.showTip=true;
                    this.flag = false;
                    break;
                  } else{
                    this.flag = true;
                }
            } 
            // 身份证验证
            if(!reg.test(array[i].personalCard)&&array[i].sfId=="身份证"){
                array[i].isCardShow = true;
                array[i].tipCardText="游客身份证信息不合法";
                this.flag = false;
                break;
            } else{
                this.flag = true;
            }
           let regHu= /^1[45][0-9]{7}$|([P|p|S|s]\d{7}$)|([S|s|G|g|E|e]\d{8}$)|([Gg|Tt|Ss|Ll|Qq|Dd|Aa|Ff]\d{8}$)|([H|h|M|m]\d{8,10})$/
            // 护照验证
            if(!regHu.test(array[i].personalCard)&&array[i].sfId=="护照"){
                array[i].isCardShow = true;
                array[i].tipCardText="游客护照信息不合法";
                this.flag = false;
                break;
            } else{
                this.flag = true;
            }
            // 身份证重复验证
            if (i !== array.length - 1) {
              for (var j = i ; j < array.length; j++) {
                if (i!=j && array[i].personalCard == array[j].personalCard) {
                  array[i].isCardShow = true;
                  array[i].tipCardText = "证件号不能重复";
                  this.flag = false;
                  break;
                }
                else{
                  this.flag = true;
                }
              }
              if(this.flag == false){
                  break;
              }
            }
            //手机号码
            if(phoneNum<array.length){
                if(objArr[i].isHave=='1'){
                    console.log('判断手机号码');
                    let pattern = /^0{0,1}(1[0-9][0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/;
                    if(!pattern.test(array[i].personalTel)){
                        array[i].isTelShow = true;
                        array[i].tipTelText="请输入正确手机号码";
                        this.flag = false;
                        break;
                    } else{
                        this.flag = true;
                    }
                }
            } else{
                array[i].isTelShow = true;
                array[i].tipTelText = '请您填写任意游客的手机号';
                console.log('全部为空');
                this.flag = false;
                break;
            }
        }
    },
    //选择接送设置
    selectVenues(tour,index) {
        console.log('当前旅客',tour);
        this.venueList=[];
        // 选择接送设置时的一些效果
        for(let i = 0;i<this.tourArr.length;i++){
          console.log(this.proTourVenues,'this.proTourVenues');
            for(let j=0;j<this.proTourVenues.length;j++){
                if(this.tourArr[index].venueIndex==this.proTourVenues[j].id){
                    console.log('接送',this.proTourVenues[j]);
                    if(this.tourArr[i].venueIndex ==1 && i != index){
                        this.tourArr[i].venueIndex = tour.venueIndex;
                        this.tourArr[i].venue = this.proTourVenues[j];
                    }
                    this.tourArr[index].venue=this.proTourVenues[j];
                }
            }
            // this.median.unshift(tour);
            // debugger;
            console.log(this.tourArr,'tttttttt');
        }
    
        // 组合每个接送设置类型的个数
        console.log(this.proTourVenues,'pppppppppp');
        for(let v=0;v<this.proTourVenues.length;v++){
            this.proTourVenues[v].venue;
            let num =  0;
            for(let k=0 ;k<this.tourArr.length;k++){
                if(this.proTourVenues[v].venue==this.tourArr[k].venue.venue && this.tourArr[k].seat==true){
                    num++;
                }
                if(k==this.tourArr.length-1 && this.proTourVenues[v].venue!='请选择'){
                    this.venueList.push({
                        'venue':this.proTourVenues[v].venue,
                        'index':num,
                        'dropoffprice':this.proTourVenues[v].dropoffprice,
                        'shuttleprice':this.proTourVenues[v].shuttleprice,
                    })    
                }
            }
        }
        // 计算总价
        this.sumTotalPrice();
	  },
	//  // 联系人姓名同步游客第一个人
	// syncTourName(){
	// 	this.tourArr[0].personalName=this.mainName;
	// },
	// // 联系人电话同步游客第一个人
	// syncTourTel(){
	// 	this.tourArr[0].personalTel=this.mainTel;
	// },
    // 提交订单
    addOrderFun() {
      console.log(this.proTourVenues,'pro');
      if(this.proTourVenues.length==1){
        this.$Message.info('该出发地没有相关接送，请重新选择出发地！');
        return;
      }
      // if (this.judgeGuestIsCorrect(this.tourArr) == false) {
      //   return;
      // }
      this.judgeGuestIsCorrect(this.tourArr);
       if(this.flag==false){
          return ;
      }
      let _obj = {};
      _obj.mainName = this.mainName;
      _obj.mainTel = this.mainTel;
      if (this.judgePersonIsCorrect(_obj) == false) {
        return;
      }
       for (let i = 0; i < this.tourArr.length; i++) {
        if(this.tourArr[i].venueIndex==1) {
            this.$Message.info("第"+(i+1)+"个旅客的接送设置未选择");
            return;
        }
      }
      if(this.pact==false){
        this.$Message.info('请先阅读并同意合同！');
        return;
      }
      // console.log(this.tourArr,'tourArr');
      let isSingleTip=false;
      for(let i=0;i<this.tourArr.length;i++){
        if(this.tourArr[i].touristType==1&&this.tourArr[i].isSingleRoom==1){
          isSingleTip=true;
          break;
        }
      }
      if(isSingleTip==false){
        let sumPeople=0;
        for(let i=0;i<this.pricePolicyList.length;i++){
            if(this.pricePolicyList[i].touristType==1){
              sumPeople+=this.pricePolicyList[i].count;
            }
        }
        if(sumPeople%2==0){
            this.singleRoomPrice=0;
        }
        else {
           this.modalConfirmSingle=true;
           return;
        }
      }
      if(this.flag && this.submitFlag==1){
        this.sfIdArray = [];
        this.nameList = [];
        this.codeList = [];
        this.telList = [];
        this.policyIdList = [];
        this.sexList = [];
        this.venueidList = [];
        this.singleRoomList=[];
        this.ageList=[];
        let single='';
        // if(this.userType==1){
        // 	single=this.singlePrice;
        // }
        // else if(this.userType==2){
          single=this.singleRoomPrice;
        // }
        // 遍历旅客信息列表
        for (let i = 0; i < this.tourArr.length; i++) {
          // if(this.tourArr[i].count!=0){
          //上传身份证的id数组
          this.sfIdArray.push(this.tourArr[i].sfId);
          //旅客姓名数组
          this.nameList.push(this.tourArr[i].personalName);
          //旅客身份证列表
          this.codeList.push(this.tourArr[i].personalCard);
          //旅客联系方式列表
          this.telList.push(this.tourArr[i].personalTel);
          //旅客性别列表
          this.policyIdList.push(this.tourArr[i].id);
          //旅客价格策略列表
          this.sexList.push(this.tourArr[i].sex);
          //旅客年龄
          this.ageList.push(this.tourArr[i].personalAge);
          //旅客出发地
          this.venueidList.push(this.tourArr[i].venueIndex);
          // 旅客单房差
          this.singleRoomList.push(this.tourArr[i].isSingleRoom);
          // if(this.tourArr[i].venueIndex==1) {
          //     this.$Message.info("第"+(i+1)+"个旅客的接送设置未选择");
          //     return;
          // } 
          // }
        }
        this.submitFlag=0; 
        //要传参数
        let params = {
          'siteid': tools.getSessionStorage("siteid"),
          'isOutgoing': this.$route.params.state,
          'orgId': this.$route.params.orgid,
          //有关联系人
          'mainName': this.mainName,
          'mainTel': this.mainTel,
          'remark': this.note,
          //有关旅客
          'nameList': this.nameList,
          'codeList': this.codeList,
          'telList': this.telList,
          'cardtypeList': this.sfIdArray,
          'sexList': this.sexList,
          'policyList': this.policyIdList,
          'venueidList': this.venueidList,
          // 其他重要信息
          'proid': this.$route.params.id,
          'tourid': this.tourid,
          'policyid': this.policyIdArr,
          'num': this.countArr,
          'departure': this.departureCity,
          'totalprice': this.settlementPrice,
          'singleroomprice':single,
          // singleroompricenum: this.singleRoomList
          'isSingleRoom':this.singleRoomList,
          'ageList':this.ageList,
          'deptName':this.deptName,
          'userName':this.saleName,
          'iD':this.saleID,
          'deptID':this.deptID,
          'useDiscount':this.useDiscount
        };
        addOrderInfo(params).then(response => {
            console.log(response);
            if (response.meta.success == true) {
              console.log("添加旅客信息成功");
              // 存订单号
              tools.setLocalStorage("orderNo", response.data.orderNo);
              if(this.userType==1){
                this.$router.push("/process/1");
              }
              if(this.userType==2){
                this.$router.push('/pay/'+response.data.orderId+'/'+tools.getLocalStorage('orgId'));
              }
            } else {
              console.log("添加旅客信息失败");
              this.$Message.info(response.meta.message);
              this.submitFlag=1;
            }
          })
          .catch(err => {
            console.log("添加旅客信息接口获取失败", err);
            // this.$Message.info('添加旅客信息接口获取失败');
          });
        }
    },
    // 立即预定
    addReserveFun() {
      // console.log(this.tourArr,'tourArr');
      if(this.proTourVenues.length==1){
        this.$Message.info('该出发地没有相关接送，请重新选择出发地！');
        return;
      }
      // if (this.judgeGuestIsCorrect(this.tourArr) == false) {
      //   return;
      // }
      this.judgeGuestIsCorrect(this.tourArr);
      if(this.flag==false){
          return ;
      }
      let _obj = {};
      _obj.mainName = this.mainName;
      _obj.mainTel = this.mainTel;
      if (this.judgePersonIsCorrect(_obj) == false) {
        return;
      }
      for (let i = 0; i < this.tourArr.length; i++) {
        if(this.tourArr[i].venueIndex==1) {
            this.$Message.info("第"+(i+1)+"个旅客的接送设置未选择");
            return;
        }
      }
      if(this.pact==false){
        this.$Message.info('请先阅读并同意合同！');
        return;
      }
      let isSingleTip=false;
      for(let i=0;i<this.tourArr.length;i++){
        if(this.tourArr[i].touristType==1&&this.tourArr[i].isSingleRoom==1){
          isSingleTip=true;
          break;
        }
      }
      if(isSingleTip==false){
        let sumPeople=0;
        for(let i=0;i<this.pricePolicyList.length;i++){
            if(this.pricePolicyList[i].touristType==1){
              sumPeople+=this.pricePolicyList[i].count;
            }
        }
        if(sumPeople%2==0){
            this.singleRoomPrice=0;
        }
        else {
           this.modalConfirmSingle=true;
           return;
        }
      }
      if(this.flag && this.submitFlag==1){
        this.sfIdArray = [];
        this.nameList = [];
        this.codeList = [];
        this.telList = [];
        this.policyIdList = [];
        this.sexList = [];
        this.venueidList = [];
        this.ageList=[];
        let single='';
        // if(this.userType==1){
        // 	single=this.singlePrice;
        // }
        // else if(this.userType==2){
          single=this.singleRoomPrice;
        // }
        // 遍历旅客信息列表
        for (let i = 0; i < this.tourArr.length; i++) {
          // if(this.tourArr[i].count!=0){
          //上传身份证的id数组
          this.sfIdArray.push(this.tourArr[i].sfId);
          //旅客姓名数组
          this.nameList.push(this.tourArr[i].personalName);
          //旅客身份证列表
          this.codeList.push(this.tourArr[i].personalCard);
          //旅客联系方式列表
          this.telList.push(this.tourArr[i].personalTel);
          //旅客性别列表
          this.policyIdList.push(this.tourArr[i].id);
          //旅客价格策略列表
          this.sexList.push(this.tourArr[i].sex);
           //旅客年龄
          this.ageList.push(this.tourArr[i].personalAge);
          //旅客出发地
          this.venueidList.push(this.tourArr[i].venueIndex);
          // 旅客单房差
          this.singleRoomList.push(this.tourArr[i].isSingleRoom); 
          // }
        }
        this.submitFlag=0; 
        //要传参数
        let params = {
          'siteid': tools.getSessionStorage("siteid"),
          'isOutgoing': this.$route.params.state,
          'orgId': this.$route.params.orgid,
          //有关联系人
          'mainName': this.mainName,
          'mainTel': this.mainTel,
          'remark': this.note,
          //有关旅客
          'nameList': this.nameList,
          'codeList': this.codeList,
          'telList': this.telList,
          'cardtypeList': this.sfIdArray,
          'sexList': this.sexList,
          'policyList': this.policyIdList,
          'venueidList': this.venueidList,
          // 其他重要信息
          'proid': this.$route.params.id,
          'tourid': this.tourid,
          'policyid': this.policyIdArr,
          'num': this.countArr,
          'departure': this.departureCity,
          'totalprice': this.settlementPrice,
          'singleroomprice':single,
          // singleroompricenum: this.singleRoomList,
          'isSingleRoom':this.singleRoomList,
          'ageList':this.ageList,
          'deptName':this.deptName,
          'userName':this.saleName,
          'iD':this.saleID,
          'deptID':this.deptID,
          'useDiscount':this.useDiscount
        };
        addOrderInfo(params)
          .then(response => {
            console.log(response);
            if (response.meta.success == true) {
              console.log("添加旅客信息成功");
              // 存订单号
              tools.setLocalStorage("orderNo",response.data.orderNo);
              this.$router.push("/process/2");
            } else {
              console.log("添加旅客信息失败");
              this.$Message.info(response.meta.message);
              this.submitFlag=1;
            }
          })
          .catch(err => {
            console.log("添加旅客信息接口获取失败", err);
            // this.$Message.info('添加旅客信息接口获取失败');
          });
        }
      },
      // 确认单房差模态框之后的逻辑
      nextSubmitFun(){
        if(this.flag && this.submitFlag==1){
          this.sfIdArray = [];
          this.nameList = [];
          this.codeList = [];
          this.telList = [];
          this.policyIdList = [];
          this.sexList = [];
          this.venueidList = [];
          this.ageList=[];
          let single='';
          // if(this.userType==1){
          // 	single=this.singlePrice;
          // }
          // else if(this.userType==2){
            single=this.singleRoomPrice;
          // }
          // 遍历旅客信息列表
          for (let i = 0; i < this.tourArr.length; i++) {
            // if(this.tourArr[i].count!=0){
            //上传身份证的id数组
            this.sfIdArray.push(this.tourArr[i].sfId);
            //旅客姓名数组
            this.nameList.push(this.tourArr[i].personalName);
            //旅客身份证列表
            this.codeList.push(this.tourArr[i].personalCard);
            //旅客联系方式列表
            this.telList.push(this.tourArr[i].personalTel);
            //旅客性别列表
            this.policyIdList.push(this.tourArr[i].id);
            //旅客价格策略列表
            this.sexList.push(this.tourArr[i].sex);
            //旅客年龄
            this.ageList.push(this.tourArr[i].personalAge);
            //旅客出发地
            this.venueidList.push(this.tourArr[i].venueIndex);
            // 旅客单房差
            this.singleRoomList.push(this.tourArr[i].isSingleRoom);
            if(this.tourArr[i].venueIndex==1) {
                this.$Message.info("第"+(i+1)+"个旅客的接送设置未选择");
                return;
            } 
            // }
          }
          this.submitFlag=0; 
          //要传参数
          let params = {
            'siteid': tools.getSessionStorage("siteid"),
            'isOutgoing': this.$route.params.state,
            'orgId': this.$route.params.orgid,
            //有关联系人
            'mainName': this.mainName,
            'mainTel': this.mainTel,
            'remark': this.note,
            //有关旅客
            'nameList': this.nameList,
            'codeList': this.codeList,
            'telList': this.telList,
            'cardtypeList': this.sfIdArray,
            'sexList': this.sexList,
            'policyList': this.policyIdList,
            'venueidList': this.venueidList,
            // 其他重要信息
            'proid': this.$route.params.id,
            'tourid': this.tourid,
            'policyid': this.policyIdArr,
            'num': this.countArr,
            'departure': this.departureCity,
            'totalprice': this.settlementPrice,
            'singleroomprice':single,
            // singleroompricenum: this.singleRoomList,
            'isSingleRoom':this.singleRoomList,
            'ageList':this.ageList,
            'deptName':this.deptName,
            'userName':this.saleName,
            'iD':this.saleID,
            'deptID':this.deptID,
            'useDiscount':this.useDiscount
          };
          addOrderInfo(params)
            .then(response => {
              console.log(response);
              if (response.meta.success == true) {
                console.log("添加旅客信息成功");
                this.modalConfirmSingle=false;
                // 存订单号
                tools.setLocalStorage("orderNo", response.data.orderNo);
                if(this.isAck==1){
                  if(this.userType==1){
                    this.$router.push("/process/1");
                  }
                  if(this.userType==2){
                    this.$router.push('/pay/'+response.data.orderId+'/'+tools.getLocalStorage('orgId'));
                  }
                }
                else{
                  this.$router.push("/process/2");
                }
              } else {
                console.log("添加旅客信息失败");
                this.$Message.info(response.meta.message);
                this.submitFlag=1;
                this.modalConfirmSingle=false;
              }
            })
            .catch(err => {
              console.log("添加旅客信息接口获取失败", err);
              // this.$Message.info('添加旅客信息接口获取失败');
            });
          }
        },
  },
  watch:{
    mainName:function(newValue,oldValue){
      console.log(newValue,'newValue');
      console.log(oldValue,'old');
      if (newValue == "") {
        this.mainNameCon = "联系人姓名不能为空";
      } else {
        this.mainNameCon = "";
      }
    },
    mainTel:function(newValue,oldValue){
      let pattern = /^0{0,1}(1[0-9][0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/;
      if (!pattern.test(newValue) && newValue != "") {
        this.mainTelCon = "请输入正确手机号码";
      } else if (newValue == "") {
        this.mainTelCon = "联系人手机号码不能为空";
      } else {
        this.mainTelCon = "";
      }
    },
    //对接销售人员
    salename:async function (){
    	this.saleslistb=false;//查不到搜索结果隐藏
    	this.saleBlurif = true;
         	console.log("输入的查询条件"+this.salename);
       	let arrByZM = [];//声明一个空数组来存放数据
       	//这里的正则表达式为了匹配输入的是否为中文  避免摁键就查询
       	let patternTel = /^[\u0391-\uFFE5]/;  
		if(patternTel.test(this.salename)){//如果当前是中文时
			console.log(this.salename);
	        for (let i=0;i<this.userDataList.length;i++){
            //for循环数据中的每一项（根据UserName值）
            	//search是模糊查询方法，（类似于indexOf是精准查找）
	            if(this.userDataList[i].UserName.search(this.salename)>=0 && this.salename != ""){
	              //判断输入框中的值是否可以匹配到数据，如果匹配成功
					arrByZM.push(this.userDataList[i]);
	            }else{
	            	this.salesList=this.userDataList;
	            }
	        }
	        //循环结束后，将数组赋给人员列表
	        this.salesList=arrByZM;
	        console.log(1111,arrByZM);
	    }
        if(this.salename == ""){//等于空 即输入完又删掉了  列表等于原始数据
        	this.salesList=this.userDataList;
       	}
        if(this.salesList.length==0){//如果查询到的结果没有匹配项
        	this.saleslistb=true;//查不到条件显示
        }
    }
  },
  mounted() {},
  // computed:{
  //     mainName(){
  //        if(this.tourArr.length!=0){
  //             return this.tourArr[0].personalName;
  //        }
  //     //  return this.hh;
  //     }
  // },
  components: {
    supplierHeader,
    Footer,
    feedBack
  }
};
</script>
<style lang="scss">
.modal-confirm-single{
    .ivu-modal-footer{
        display:none;
    }
    .ivu-icon-ios-close-empty:before {
        content: "\F404";
        color: #fff;
    }
    .ivu-modal-body{
        padding: 0 !important;
       >div{
            .confirm-top{
               height: 107px;
               background: #ffba00;
               border-radius: 6px 6px 0px 0px;
               padding-top: 20px;
               text-align: center;
               >img{
                    @include wh(46px,46px);  
               }
               >h2{
                   @include sc(18px,#fff);
               }
            }
            .confirm-con{
                padding: 20px 0;
                >p{
                   @include sc(14px,#666);
                   text-align: center;
                }
                >div{
                    text-align: center;
                    margin-top: 30px;
                    >a{
                        display: inline-block;
                        @include wh(100px,28px);
                        background: #ffba00;
                        @include sc(14px,#fff);
                        border-radius: 6px;
                        line-height: 28px;
                        text-align: center;
                        &.esp{
                            margin-left: 20px;
                            background: #fff;
                            color:#ffba00;
                            border:1px solid #ffba00;
                            line-height: 26px;
                        }
                    }
                }
            }
        } 
    }
}
.order {
  background: #f0f2f5;
  .bread-crumbs{
    @include sc(14px,#999);
    padding: 12px 0;
    width:1180px;
    margin: auto;
    >span,>a{
      @include sc(14px,#666);
    }
  }
  .order-content {
    width: 1180px;
    margin: auto;
    position: relative;
    > div {
      width: 832px;
      background: #fff;
      border:1px solid #eee;
      margin-bottom: 20px;
    }
    .order-information {
      padding: 23px 33px 19px 17px;
      > h2 {
       @include sc(23px,#111);
       font-weight: normal;
      }
      >p{
        @include sc(14px,#333);
      }
      > div {
        border-top:1px solid #ffba00;
        padding: 10px 20px 0 20px;
        margin-top: 10px;
        .order-city{
          >p{
            display: inline-block;
            @include sc(14px,#111);
            &:first-child{
              margin-right: 100px;
            }
            >label{
              width: 65px;
              // display: inline-block;
              letter-spacing: 5px;
            }
            >a{
              @include sc(12px,#ffba00);
              margin-left: 10px;
              >img{
                margin-right: 6px;
                @include wh(10px,10px);
              }
            }
          }
          .origin-con {
            position: relative;
            > ul {
              // @include wh(300px,180px);
              width: 300px;
              max-height: 180px;
              border: 1px solid #ffba00;
              position: absolute;
              left: 75px;
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
          }
        } 
        .order-date{
          padding: 7px 0;
          p{
            display: inline-block;
            @include sc(14px,#111);
            margin-right: 60px;
          }
        }
        > p {
          line-height: 14px;
          @include sc(14px, #111);
          > span {
            margin-left: 10px;
            > a{
              font-style: normal;
              @include sc(14px, #6ea5ff);
            }
          }
        }
      }
    }
    .price-information {
      padding: 0 25px;
      > div {
        display: inline-block;
        padding: 0 25px;
        width: 100%;
        // border:1px solid #eee;
        > table {
          width:100%;
          border:1px solid #eee;
          border-collapse:collapse;
          th {
            line-height: 32px;
            width: 130px;
            background: #f0f2f5;
            @include sc(16px, #333);
            font-weight: normal;
          }
          td {
            line-height: 50px;
            @include sc(14px, #333);
            text-align: center;
            > div {
              font-size: 0;
              > i {
                display: inline-block;
                vertical-align: middle;
                @include wh(22px, 23px);
              }
              .order-reduce {
                background: url("../assets/images/reduce-a.png") no-repeat;
                background-size: 100%;
              }
              .order-add {
                background: url("../assets/images/add-a.png") no-repeat;
                background-size: 100%;
                &.none{
                  background: url("../assets/images/add-n.png") no-repeat;
                  background-size: 100%;
                }
              }
              > input {
                display: inline-block;
                vertical-align: middle;
                @include wh(29px, 23px);
                @include sc(14px, #333);
                line-height: 23px;
                border-left:none;
                border-right:none;
                border-top: 1px solid #ddd;
                border-bottom: 1px solid #ddd;
                text-align: center;
                box-sizing: border-box;
              }
            }
          }
        }
      }
      >p{
        float: right;
        @include sc(14px,#111);
        padding: 5px 45px 10px 0;
        >span{
          @include sc(14px,#ffba00);
          &::before{
            content:'￥';
            display: inline-block;
            @include sc(14px,#ffba00);
          }
        }
      }
      >h3{
        clear: both;
      }
    }
    .traffic-information {
      padding: 0 25px;
      >p{
        padding-left: 50px;
        @include sc(16px,#333);
        line-height: 22px;
        >span{
          @include sc(16px,#333);
          margin-left: 10px;
          >img{
            height: 22px;
            display: inline-block;
            vertical-align: top;
            margin-left: 20px;
          }
        }
      }
      > div {
        .trip-line {
          width: 100%;
          border-bottom: 1px solid #eee;
          padding: 15px 0 20px 50px;
          &:last-child{
            border-bottom: none;
          }
          >h2{
            display: inline-block;
            vertical-align: middle;
            @include sc(16px,#333);
            margin-right: 100px;
            >span{
              margin-left: 10px;
              @include sc(14px,#333);
            }
          }
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
            //width:405px;
            display: inline-block;
            vertical-align: middle;
            text-align: center;
            > i {
              display: inline-block;
              @include wh(28px, 26px);
              background: url("../assets/images/flight.png") no-repeat;
              background-size: 100%;
            }
            > h2 {
              @include sc(14px, #333);
            }
            > h1 {
              @include sc(18px, #333);
            }
          }
          .flight-info {
            // vertical-align: middle;
            margin-top: 10px;
            margin-left: 40px;
            > p {
              @include sc(14px, #333);
              > i {
                display: inline-block;
                @include wh(22px, 20px);
                margin-right: 7px;
                background: url("../assets/images/fly-no.png") no-repeat;
              }
            }
          }
          > span {
            @include sc(14px, #333);
            margin: 35px 35px 0 50px;
          }
          > i {
            @include sc(14px, #333);
            margin-top: 35px;
            font-style: normal;
          }
        }
      }
    }
    .tourist-information {
      padding: 0 20px 25px 33px;
      .fill-con{
        position: relative;
        display: inline-block;
        .fill-btn{
          @include sc(14px,#6ea5ff);
          margin-left: 10px;
        }
        .fill-explan{
          position: absolute;
          padding: 24px;
          border:1px solid #ffba00;
          top:25px;
          left:20px;
          background: #fff;
          z-index: 1000;
          width: 520px;
          height: 330px;
          >ul{
            border-bottom:1px solid #eee;
            height: 31px;
            >li{
              float: left;
              border-bottom:1px solid transparent;
              @include sc(16px,#555);
              margin-right: 35px;
              padding-bottom: 10px;
              &.active{
                @include sc(16px,#ffba00);
                border-bottom: 1px solid #ffba00;
              }
            }
          }
          .fill-text{
            padding-top: 10px;
            >p{
              font-size: 12px;
              color: #555 !important;
            }
          }
          .fill-old,.fill-new{
            padding-top: 5px;
            >img{
              @include wh(283px,238px);
            }
            >p{
              @include sc(12px,#f31616);
            }
          }
        }
      }
      .tourist-operation {
        float: right;
        margin-top: -3px;
        > input {
          width: auto;
          height: 26px;
          border-radius: 4px;
          border: none;
          margin-right: 17px;
          padding-left: 5px;
          @include sc(14px, #333);
          text-align: right;
          outline: none;
        }
        .upload {
          display: inline-block;
          position: relative;
          vertical-align: top;
          @include wh(60px, 26px);
           margin: 0 15px;
          > input {
            @include wh(60px, 26px);
            position: absolute;
            z-index: 100;
            opacity: 0;
          }
          > button {
            position: absolute;
            z-index: 99;
            @include wh(66px, 26px);
            background-color: #ffba00;
            border-radius: 4px;
            border: none;
            @include sc(14px, #fff);
            cursor: pointer;
          }
        }
        .download {
          @include sc(14px, #6ea5ff);
          // margin: 0 15px;
        }
        .copy {
          display: inline-block;
          // @include sc(14px, #6ea5ff);
          background-color: #ffba00;
          border-radius: 4px;
          @include sc(14px, #fff);
          cursor: pointer;
          height: 26px;
          padding: 0 7px;
          line-height: 26px;
        }
        .copy-content {
          position: fixed;
          top: 25%;
          left: 50%;
          z-index: 1000;
          transform: translate(-50%);
          @include wh(530px, 450px);
          background: #fff;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          > h2 {
            height: 40px;
            line-height: 40px;
            padding-left: 20px;
            padding-right: 10px;
            background: #ffba00;
            margin-bottom: 10px;
            @include sc(18px, #fff);
            border-radius: 10px 10px 0 0;
            > span {
              float: right;
              cursor: pointer;
            }
          }
          > p {
            @include sc(14px, #333);
            padding-left: 20px;
            // margin: 10px 0 10px 0;
          }
          > textarea {
            margin-left: 20px;
            @include wh(490px, 300px);
            border: 1px solid #ddd;
            @include sc(14px,#333);
          }
          > a {
            float: right;
            display: inline-block;
            @include wh(80px, 40px);
            line-height: 40px;
            text-align: center;
            background: #ffba00;
            @include sc(14px, #fff);
            margin-right: 20px;
            border-radius: 4px;
          }
        }
      }
      .tourist-fill {
        > div {
          // padding: 18px 20px 20px 20px;
          width: 100%;
          margin-bottom: 9px;
          border-bottom: dashed 1px #e1e1e1;
          .fill-title{
            display: inline-block;
            vertical-align: top;
            width: 70px;
            >h1{
              @include sc(16px,#111);
              >img{
                @include wh(20px,15px);
                display: inline-block;
                vertical-align: middle;
                margin-right: 8px;
              }
            }
            >p{
               @include sc(12px,#111);
               text-align: center;
            }
          }
          .fill-content{
            display: inline-block;
            width: calc(100% - 80px);
            position: relative;
            .clear{
              position: absolute;
              bottom: 20px;
              right: 0;
            }
            >div{
              display: inline-block;
              vertical-align: top;
              margin-bottom: 15px;
              >label{
                display: inline-block;
                @include sc(14px,#333);
                width: 100px;
                text-align: right;
              }
              >p{
                display: block;
                margin-left: 105px;
                color:red;
              }
            }
            .tourist-name,.tourist-tel{
              .ivu-input-wrapper{
                width: 250px;
                display: inline-block;
              }
            }
            .tourist-set{
              .ivu-select{
                 width: 250px;
              }
            }
            .tourist-age{
              .ivu-input-wrapper{
                width: 96px;
              }
            }
            .tourist-age,.tourist-sex,.tourist-tel,.tourist-single{
              >label{
                width:70px;
              }
            }
           .tourist-tel{
              >p{
                display: block;
                margin-left: 70px;
                color:red;
              }
           }
            .tourist-sex,.card-select,.tourist-single,.tourist-contact{
               .ivu-select{
                 width: 86px;
                 display: inline-block;
              }
            }
            .tourist-card{
              width: 157px;
              margin-left: 4px;
            }
          }
        }
      }
    }
    .other-information {
      padding: 0 25px 33px;
      > div {
        padding: 0 50px;
      }
      .other-name,
      .other-tel,
      .other-note {
        > label {
          @include sc(14px, #333);
          display: inline-block;
          width:58px;
          text-align: right;
          vertical-align: top;
          margin-top: 5px;
        }
        .ivu-input-wrapper{
          /*//display: inline-block;*/
          width:250px;
        }
        >textarea{
          width: 605px;
          height: 60px;
          resize: none;
          padding: 8px 17px;
          border:1px solid #e1e1e1;
          border-radius: 4px;
        }
        > p {
          padding-left: 65px;
          color: red;
        }
      }
      .other-name,
      .other-tel {
        display: inline-block;
        vertical-align: top;
        margin-bottom: 10px;
      }
      .other-name {
        > input {
          width: 120px;
        }
      }
      .other-tel {
        margin-left: 40px;
        > input {
          width: 200px;
        }
      }
      .other-note {
        > input {
          width: 656px;
        }
      }
    }
    .pay-btn {
      width: 832px;
      background: #fff;
      margin-bottom: 23px;
      padding:0 20px;
      height: 80px;
      line-height: 80px;
      > a {
        float: right;
        @include wh(160px, 50px);
        background: #ffba00;
        border-radius: 4px;
        display: inline-block;
        letter-spacing: 1px;
        @include sc(24px, #fff);
        text-align: center;
        line-height: 50px;
        margin-top: 15px;
        &:hover{
          background: #dfad17;
        }
      }
    }
    .sales-staff{
       padding: 0 25px 33px;
       .ivu-input-wrapper{
       		display: block;
       		margin-left: 98px;
       }
      >p{
        overflow-y: auto;
        @include wh(722px, 139px);
        border-radius: 4px 0px 0px 4px;
        border: solid 1px #e1e1e1;
        margin: auto;
        padding: 20px;
      }
      .staff-info{
        padding-left: 56px;
        height: 32px;
        >label{
          @include sc(14px,#333);
          // margin-right: 10px;
          display: inline-block;
          vertical-align: middle;
        }
        .destination{
        	width: 250px;
		    height: 32px;
		    line-height: 1.5;
		    padding: 4px 7px;
		    font-size: 12px;
		    border: 1px solid #dddee1;
		    border-radius: 4px;
		    color: #495060;
		    background-color: #fff;
		    background-image: none;
		    position: relative;
        	float: left;
        	.selector {
			    position: absolute;
			    top: 0;
			    right: 10px;
			    height: 32px;
			    line-height: 32px;
			}
        }
        .ivu-input-wrapper{
          /*//display: inline-block;*/
          @include wh(251px,30px);
        }
        position: relative;
        ul {
          width: 251px;
          max-height: 180px;
          border: 1px solid #e1e1e1;
          position: absolute;
          left: 154px;
          top: 60px;
          overflow-y: auto;
          background: #fff;
          z-index: 1000;
          > li {
            list-style: none;
            height: 27px;
            line-height: 27px;
            @include sc(14px, #333);
            padding-left: 5px;
            &.active {
              background: #ffba00;
              color: #fff;
            }
          }
        }
        #salesListul>li:hover{
        	background: #ffba00;
              color: #fff;
        }
      }
    }
    .bookings {
      padding: 0 25px 33px;
      >p{
        overflow-y: auto;
        @include wh(722px, 139px);
        border-radius: 4px 0px 0px 4px;
        border: solid 1px #e1e1e1;
        margin: auto;
        padding: 20px;
      }
    }
    .information-line {
      font-weight: normal;
      padding: 17px 0;
      @include sc(18px, #111);
      border-bottom: 1px solid #ffba00;
      margin-bottom: 16px;
      line-height: 20px;
      >img{
        @include wh(20px,20px);
        margin-right: 15px;
        display: inline-block;
        vertical-align: top;
      }
    }
  }
  .cost-detail {
    width: 1180px;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    > div {
      width: 330px;
      // @include wh(300px,226px);
      margin-top: 35px;
      position: absolute;
      right: 0;
      top: 190px;
      z-index: 1000;
      > p {
        height: 26px;
        line-height: 26px;
        padding-left: 11px;
        @include sc(16px, #fff);
        background: #ffba00;
      }
      > div {
        border:1px solid #eee;
        padding-top: 20px;
        background: #fff;
        padding-bottom: 10px;
        > p {
          @include sc(14px, #333);
          padding: 0 14px 0 11px;
          margin-bottom: 19px;
          line-height: 16px;
          clear: both;
          > span {
            @include sc(14px, #333);
            float: right;
          }
          &:last-child {
            margin-bottom: 0;
          }
		}
		.venue-price{
			padding: 0 14px 0 11px;
			@include sc(14px, #333);
			 margin-bottom: 19px;
			>div{
				float: right;
				text-align: right;
				margin-bottom: 10px;
			}
		}
      }
      > h2 {
        background: #fff;
        height: 57px;
        line-height: 57px;
        border-top: 1px solid #eee;
        @include sc(18px, #ffba00);
        box-sizing: border-box;
        padding: 0 14px 0 11px;
        font-weight: normal;
        > span {
          @include sc(18px, #ffba00);
          float: right;
          font-weight: normal;
          &:before {
            content: "￥";
            @include sc(18px, #ffba00);
          }
        }
      }
	}
	
  }
  .adver {
    margin-bottom: 90px;
  }
}
</style>
