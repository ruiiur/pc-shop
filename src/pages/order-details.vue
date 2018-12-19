<!--这是订单信息页面-->
<template>
  <div class="order-details">
      <!-- 引入头部导航 -->
      <supplierHeader  :without="without"  :isHide="isHide"  @refreshList="orderInit"></supplierHeader>
      <!-- <Header @refreshList="orderInit" :isHide="isHide" @global="globalFunT"></Header> -->
      <!-- 中间区 -->
    <p class="bread-crumbs">您当前所在位置：<a :href="'#/supplier?orgId=' + orgId">首页 > </a><a :href="fromPath">{{fromName}} > </a><span>订单详情</span></p>
    <div class="order-content">
      <!-- 订单状态 -->
      <div class="order-state">
        <div class="state-info">
          <p>订单编号{{orderInfo.orderno}}</p>
          <h2>
            <span v-if="orderInfo.datastatus==0 || orderInfo.datastatus==2">待确认</span>
            <span v-if="orderInfo.datastatus==1">待支付</span>
            <span v-if="orderInfo.datastatus==4">已支付</span>
            <span v-if="orderInfo.datastatus==-1">已取消</span>
            <span v-if="orderInfo.datastatus==3">支付待确认</span>
            <!-- <span v-if="orderInfo.datastatus==6">占位</span> -->
          </h2>
        </div>
        <div class="state-price">
          <div>
            <h2>总价：<span v-if="changePrice==0">￥{{original}}</span><span class="change" v-if="changePrice!=0">{{changePrice}}</span></h2>
            <Poptip v-model="visible" placement="bottom-end">
              <a>金额明细</a>
              <div slot="content">
                <p v-for="price in ordOrderPrices">{{price.pricename}}<span><i :class="price.isNum==true?'change':''">{{price.visitornum}}</i>x<i :class="price.isPrice==true?'change':''">￥{{price.saleprice}}</i>=<i :class="(price.isNum==true||price.isPrice==true)?'change':''">￥{{price.visitornum*price.saleprice}}</i></span></p>
                <p>单房差<span v-if="isChangeSingle==false">￥{{singleRoomPrice}}</span><span v-if="isChangeSingle==true" class="change">￥{{changeSingle}}</span></p>
                <div>接送机
                  <div>
                      <p v-for="venue in proVenueDtos">{{venue.venName}}<span><i :class="venue.isNum==true?'change':''">{{venue.peopleNum}}</i>x<i :class="venue.isPrice==true?'change':''">￥{{venue.jsprice}}</i>=<i :class="(venue.isNum==true||venue.isPrice==true)?'change':''">￥{{venue.peopleNum*venue.jsprice}}</i></span></p>
                  </div>
                  <p></p>
                </div>
                <p>总价<span v-if="changePrice==0">￥{{original}}</span><span class="change" v-if="changePrice!=0">￥{{changePrice}}</span></p>
                <h2>结算价<span v-if="changePrice==0">￥{{original}}</span><span class="change" v-if="changePrice!=0">￥{{changePrice}}</span></h2>
              </div>
            </Poptip>
          </div>
          <a  :href="'#/pay/'+orderInfo.id+'/'+orderInfo.supplierid" v-if="orderInfo.datastatus==1">去支付</a>
          <!-- <a href="javascript:;" class="cancel" :class="orderInfo.datastatus==1?'esp':'cancel'" v-if="orderInfo.datastatus!=4&&orderInfo.datastatus!=-1">取消</a> -->
        </div>
      </div>
      <!-- 订单信息 -->
      <div class="order-information">
        <h2 class="information-line"><img src="../assets/images/dingdanxinxi.png">订单信息</h2>
        <p>{{orderInfo.ordername}}</p>
        <div v-if="changedOrderInfoVo!=null">
          <div>
            <p v-if="changedOrderInfoVo.cdestName==null"><label class="esp">目的地：</label>{{orderInfo.destname}}</p>
            <p class="change" v-if="changedOrderInfoVo.cdestName!=null"><label class="esp">目的地：</label>{{changedOrderInfoVo.cdestName}}</p>
            <p v-if="changedOrderInfoVo.cdepName==null"><label class="esp">出发地：</label> {{orderInfo.depname}}</p>
            <p class="change" v-if="changedOrderInfoVo.cdepName!=null"><label class="esp">出发地：</label> {{orderInfo.cdepName}}</p>
            <p v-if="changedOrderInfoVo.cadultNum==null && changedOrderInfoVo.cchildNum==null"><label>出行人数：</label><span>{{orderInfo.adultnum}}成人</span><span v-if="orderInfo.childnum!=0">{{orderInfo.childnum}}儿童</span></p>
            <p class="change" v-if="changedOrderInfoVo.cadultNum!=null || changedOrderInfoVo.cchildNum!=null"><label>出行人数：</label><span>{{changedOrderInfoVo.cadultNum}}成人</span><span v-if="changedOrderInfoVo.cchildNum!=0">{{changedOrderInfoVo.cchildNum}}儿童</span></p>
            <p v-if="changedOrderInfoVo.crouteTypeName==null"><label for="">产品分类：</label>{{orderInfo.routetypename}}</p>
            <p class="change" v-if="changedOrderInfoVo.crouteTypeName!=null"><label for="">产品分类：</label>{{changedOrderInfoVo.crouteTypeName}}</p>
            <p v-if="changedOrderInfoVo.cCreateDate==null"><label for="">下单时间：</label><span>{{orderInfo.createddate}}</span></p>
            <p class="change" v-if="changedOrderInfoVo.cCreateDate!=null"><label for="">下单时间：</label><span>{{changedOrderInfoVo.cCreateDate}}</span></p>
          </div>
          <div>
            <p v-if="changedOrderInfoVo.cTourDate==null"><label for="">出发日期：</label>{{startDate}}</p>
            <p class="change" v-if="changedOrderInfoVo.cTourDate!=null"><label for="">出发日期：</label>{{changedOrderInfoVo.cTourDate}}</p>
            <p v-if="changedOrderInfoVo.cscheduleDays==null"><label for="">行程天数：</label>{{tripDays}}天</p>
            <p class="change" v-if="changedOrderInfoVo.cscheduleDays!=null"><label for="">行程天数：</label>{{changedOrderInfoVo.cscheduleDays}}天</p>
            <p v-if="false"><label for="">订单合同：</label><a href="javascript:;">查看</a></p>
            <p v-if="false"><label for="">出团通知书：</label><a href="javascript:;">查看</a></p>
          </div>
        </div>
        <div v-if="changedOrderInfoVo==null">
          <div>
            <p><label class="esp">目的地：</label>{{orderInfo.destname}}</p>
            <p><label class="esp">出发地：</label> {{orderInfo.depname}}</p>
            <p><label>出行人数：</label><span>{{orderInfo.adultnum}}成人</span><span v-if="orderInfo.childnum!=0">{{orderInfo.childnum}}儿童</span></p>
            <p><label for="">产品分类：</label>{{orderInfo.routetypename}}</p>
            <p><label for="">下单时间：</label><span>{{orderInfo.createddate}}</span></p>
          </div>
          <div>
            <p><label for="">出发日期：</label>{{startDate}}</p>
            <p><label for="">行程天数：</label>{{tripDays}}天</p>
            <p v-if="false"><label for="">订单合同：</label><a href="javascript:;">查看</a></p>
            <p v-if="false"><label for="">出团通知书：</label><a href="javascript:;">查看</a></p>
          </div>
        </div>
      </div>
      <!-- 游客信息 -->
      <div class="tourist-information">
          <h2 class="information-line"><img src="../assets/images/youkexiangqing.png">游客信息</h2>
          <div class="tourist-fill">
              <div v-for="(tour,_index) in orderTourList" :class="tour.active==1?'change':''" >
                <h1><img src="../assets/images/youke.png" alt="">游客{{_index+1}}</h1>
                <div>
                  <div>
                    <p :class="tour.activeName==1?'change':''"><label for="">游客姓名：</label>{{tour.guestname}}</p>
                    <p :class="tour.activeAge==1?'change':''" v-if="tour.guestage!=null&&tour.guestage!=''"><label for="">年龄：</label>{{tour.guestage}}</p>
                    <p :class="tour.activeRoom==1?'change':''"><label for="">房差：</label><span v-if="tour.issingleroom==false">否</span><span v-if="tour.issingleroom==true">是</span></p>
                    <p :class="tour.activePhone==1?'change':''"><label for="">手机号码：</label>{{tour.guesttelphone}}</p>
                  </div>
                  <div>
                    <p :class="tour.activeSex==1?'change':''"><label for="">性别：</label>{{tour.guestsex}}</p>
                    <p :class="tour.activeCard==1?'change':''"><label for="">证件号码：</label>{{tour.guestcard}}</p>
                    <p :class="tour.activePick==1?'change':''"><label for="">接送地点：</label>{{tour.pickname}}</p>
                  </div>
                </div>
              </div>
              <!-- <div v-for="(tour,_index) in changedUserInfoVos" v-for="(tourOld,_index) in orderTourList" v-if="userIsChanged==true">
                <h1><img src="../assets/images/youke.png" alt="">游客{{_index+1}}</h1>
                <div v-if="tour.typeId==1">
                  <div>
                    <p class="change"><label for="">游客姓名：</label>{{tour.cguestName}}</p>
                    <p class="change" v-if="tour.cguestAge!=null&&tour.cguestAge!=''"><label for="">年龄：</label>{{tour.cguestAge}}</p>
                    <p class="change"><label for="">房差：</label><span v-if="tour.issingleroom==false">否</span><span v-if="tour.issingleroom==true">是</span></p>
                    <p class="change"><label for="">手机号码：</label>{{tour.cguestPhone}}</p>
                  </div>
                  <div>
                    <p class="change"><label for="">性别：</label>{{tour.cguestSex}}</p>
                    <p class="change"><label for="">证件号码：</label>{{tour.cguestCard}}</p>
                    <p class="change"><label for="">接送地点：</label>{{tour.cpickName}}</p>
                  </div>
                </div>
                <div v-if="tour.typeId==0">
                  <div>
                    <p  v-if="tour.cguestName==null"><label for="">游客姓名：</label>{{tourOld.guestname}}</p>
                    <p class="change" v-if="tour.cguestName!=null"><label for="">游客姓名：</label>{{tour.cguestName}}</p>
                    <p v-if="tour.cguestAge==null&&tourOld.guestage!=null&&tourOld.guestage!=''"><label for="">年龄：</label>{{tourOld.guestage}}</p>
                    <p class="change" v-if="tour.cguestAge!=null"><label for="">年龄：</label>{{tour.cguestAge}}</p>
                    <p><label for="">房差：</label><span v-if="tour.issingleroom==false">否</span><span v-if="tour.issingleroom==true">是</span></p>
                    <p  v-if="tour.cguestPhone==null"><label for="">手机号码：</label>{{tourOld.guesttelphone}}</p>
                    <p class="change" v-if="tour.cguestPhone!=null"><label for="">手机号码：</label>{{tour.cguestPhone}}</p>
                  </div>
                  <div>
                    <p v-if="tour.cguestSex==null"><label for="">性别：</label>{{tour.guestsex}}</p>
                    <p class="change" v-if="tour.cguestSex!=null"><label for="">性别：</label>{{tour.cguestSex}}</p>
                    <p v-if="tour.cguestCard==null"><label for="">证件号码：</label>{{tour.guestcard}}</p>
                    <p class="change" v-if="tour.cguestCard!=null"><label for="">证件号码：</label>{{tour.cguestCard}}</p>
                    <p v-if="tour.cpickName==null"><label for="">接送地点：</label>{{tour.pickname}}</p>
                    <p class="change" v-if="tour.cpickName!=null"><label for="">接送地点：</label>{{tour.cpickName}}</p>
                  </div>
                </div>
              </div> -->
          </div>
      </div>
      <!-- 游客联系人信息 -->
      <div class="other-information">
          <h2 class="information-line"><img src="../assets/images/youkelinxiren.png">游客联系人信息</h2>
          <div>
            <div class="other-name">
                <label for="">联系人：</label>
                {{orderInfo.contact}}
            </div>
            <div class="other-tel">
                <label for="">手机号：</label>
                {{orderInfo.mobile}}
            </div>
            <div class="other-note" v-if="orderInfo.comment!='' && orderInfo.comment!=null">
                <label for="">备注：</label>
                {{orderInfo.comment}}
            </div>
          </div>
      </div>
      <p class="change-tip" v-if="isChanged==1">标红地方为修改调整内容</p>
      <p class="change-btn" v-if="isChanged==1"><a href="javascript:;" @click="changeOrder(-1)">拒绝</a><a href="javascript:;" @click="changeOrder(1)">同意</a></p>
    </div>
    <feedBack></feedBack>
    <!-- 引入底部导航 -->
    <Footer></Footer>
  </div>
</template>
<script>
import tools from "../common/tools";
import {
  getOrderInfoDetail,
  changeDataStatus
} from "../services/index";
import supplierHeader from "../components/supplier-header.vue";
import Footer from "../components/footer.vue";
import feedBack from "../components/feedBack.vue";
export default {
  data() {
    return {
      isHide: false, 
      without:true,//
      orderTourList:[],//游客信息
      orderInfo:'',//订单信息
      tripDays:'',//行程天数
      startDate:'',//出发日期
      visible:false,
      ordOrderPrices:[],//每个价格策略类型价格及人数
      singleRoomPrice:'',//单房差价格
      proVenueDtos:[],//接送配置价格及人数
      changePrice:'',//变更后的总价
      changedOrderInfoVo:'',//变更订单信息
      changedUserInfoVos:[],//变更游客信息
      priceChangeVos:[],//变更游客价格
      venueChangVos:[],//变更游客接送价格
      isChanged:'',//是否改变
      userIsChanged:false,//游客是否改变
      orgId:'',
      fromName:'',//从哪个页面来
      fromPath:'',//上个页面路径
      original:0,//原价
      changeSingle:'',//改变后的单房差
      isChangeSingle:false,//是否改变单房差
    };
  },
  methods: {
    // copyArray(arr){
    //   return JSON.parse(JSON.stringify(arr));      
    // },
    // 订单页面初始化
    orderInit() {
      console.log(this.$route.params.id);
      this.orgId = tools.getLocalStorage("orgId");
      this.fromName = tools.getLocalStorage("fromName");
      this.fromPath = tools.getLocalStorage("fromPath");
      this.singleRoomPrice=0;
      this.original=0;
      this.changeSingle=0;
      // 订单详情接口
		  let params = this.$route.params.orderId;
      getOrderInfoDetail(params).then(response => {
          console.log(response);
          console.log('订单详情');
          for(let h=0;h<response.ordOrderTourists.length;h++){
            this.orderTourList.push(response.ordOrderTourists[h]);
          }
          // this.orderTourList=response.ordOrderTourists;
          
          console.log(this.orderTourList,'hhhhhhhh');
          console.log(this.orderTourList.length,'hhhhhhhh');
          this.orderInfo=response.ordOrderinfo;
          this.tripDays=response.days;
          this.startDate=response.startDate;
          this.ordOrderPrices=response.ordOrderPrices;
          this.proVenueDtos=response.proVenueDtos;
          this.changePrice=response.changedDecimal;
          this.changedOrderInfoVo=response.changedOrderInfoVo;
          this.changedUserInfoVos=response.changedUserInfoVos;
          this.venueChangVos=response.venueChangVos;//接送机
          this.priceChangeVos=response.priceChangeVos;//变更游客价格
          this.isChanged=response.isChanged;
          if(this.changedUserInfoVos.length!=0){
            for(let i=0;i<this.changedUserInfoVos.length;i++){
              if(this.changedUserInfoVos[i].typeId==1){
                this.orderTourList.push({
                  'guestname':this.changedUserInfoVos[i].cguestName,
                  'guestage':this.changedUserInfoVos[i].cguestAge,
                  'issingleroom':this.changedUserInfoVos[i].isSingleRoom,
                  'guesttelphone':this.changedUserInfoVos[i].cguestPhone,
                  'guestsex':this.changedUserInfoVos[i].cguestSex,
                  'guestcard':this.changedUserInfoVos[i].cguestCard,
                  'pickname':this.changedUserInfoVos[i].cpickName,
                  'id':this.changedUserInfoVos[i].touristID,
                  'active':1, 
                  'activeAge':1,
                  'activeCard':1,
                  'activeName':1,
                  'activePhone':1,
                  'activePick':1,
                  'activeRoom':1,
                  'activeSex':1,
                })
                console.log(this.orderTourList,'this.orderTourList1');
              }
              else if(this.changedUserInfoVos[i].typeId==0){
                for(let j=0;j<this.orderTourList.length;j++){
                  if(this.orderTourList[j].id==this.changedUserInfoVos[i].touristID){
                    this.$set(this.orderTourList[j],'active',0);
                    this.$set(this.orderTourList[j],'activeAge',0);
                    this.$set(this.orderTourList[j],'activeCard',0);
                    this.$set(this.orderTourList[j],'activeName',0);
                    this.$set(this.orderTourList[j],'activePhone',0);
                    this.$set(this.orderTourList[j],'activePick',0);
                    this.$set(this.orderTourList[j],'activeRoom',0);
                    this.$set(this.orderTourList[j],'activeSex',0);
                    if(this.changedUserInfoVos[i].cguestAge!=null){
                      this.orderTourList[j].guestage=this.changedUserInfoVos[i].cguestAge;
                      this.$set(this.orderTourList[j],'activeAge',1);
                    }
                    if(this.changedUserInfoVos[i].cguestCard!=null){
                      this.orderTourList[j].guestcard=this.changedUserInfoVos[i].cguestCard;
                      this.$set(this.orderTourList[j],'activeCard',1);
                    }
                    if(this.changedUserInfoVos[i].cguestName!=null){
                      this.orderTourList[j].guestname=this.changedUserInfoVos[i].cguestName;
                      this.$set(this.orderTourList[j],'activeName',1);
                    }
                    if(this.changedUserInfoVos[i].cguestPhone!=null){
                      this.orderTourList[j].guesttelphone=this.changedUserInfoVos[i].cguestPhone;
                      this.$set(this.orderTourList[j],'activePhone',1);
                    }
                    if(this.changedUserInfoVos[i].cpickName!=null){
                      this.orderTourList[j].pickname=this.changedUserInfoVos[i].cpickName;
                      this.$set(this.orderTourList[j],'activePick',1);
                    }
                    if(this.changedUserInfoVos[i].isSingleRoom!=null){
                      this.orderTourList[j].issingleroom=this.changedUserInfoVos[i].isSingleRoom;
                      this.$set(this.orderTourList[j],'activeRoom',1);
                    }
                    if(this.changedUserInfoVos[i].cguestSex!=null){
                      this.orderTourList[j].guestsex=this.changedUserInfoVos[i].cguestSex;
                      this.$set(this.orderTourList[j],'activeSex',1);
                    }
                  }
                }
                console.log(this.orderTourList,'this.orderTourList2');
                console.log(this.orderTourList.length,'this.orderTourList2111111111');
              }
            }
          }
          // 计算原始单房差,总价
          let orderPrice=0;//所有人的总价
          let venuePrice=0;//所有接送的总价
          for(let i=0;i<this.ordOrderPrices.length;i++){
            // this.singleRoomPrice+=parseInt(this.ordOrderPrices[i].roomprice);
            orderPrice+=parseInt(parseInt(this.ordOrderPrices[i].visitornum)*parseInt(this.ordOrderPrices[i].saleprice));
          }
          for(let i=0;i<this.proVenueDtos.length;i++){
            venuePrice+=parseInt(this.proVenueDtos[i].jsprice)*parseInt(this.proVenueDtos[i].peopleNum);
          }
          console.log(response.adultRoomPriceVos,'response.adultRoomPriceVos');
          if(response.adultRoomPriceVos.length!=0){
            for(let i=0;i<response.adultRoomPriceVos.length;i++){
              this.singleRoomPrice+=parseInt(response.adultRoomPriceVos[i].adultNum)*parseInt(response.adultRoomPriceVos[i].adultPrice);
            }
          }
          if(response.childRoomPriceVos.length!=0){
            for(let i=0;i<response.childRoomPriceVos.length;i++){
              this.singleRoomPrice+=parseInt(response.childRoomPriceVos[i].childNum)*parseInt(response.childRoomPriceVos[i].childPrice);
            }
          }
          console.log(this.singleRoomPrice,'ssssssssss');
          this.original=parseInt(this.singleRoomPrice)+parseInt(venuePrice)+parseInt(orderPrice);
          console.log(this.original,'oooooooooooooo');
          // 接送机相关
          if(this.venueChangVos.length!=0){
             for(let i=0;i<this.venueChangVos.length;i++){
               for(let j=0;j<this.proVenueDtos.length;j++){
                  if(this.proVenueDtos[j].venName==this.venueChangVos[i].pickName){
                    if(this.proVenueDtos[j].peopleNum!=this.venueChangVos[i].peopleNum){
                      this.$set(this.proVenueDtos[j],'isNum',true);
                      this.proVenueDtos[j].peopleNum=this.venueChangVos[i].peopleNum;
                    }
                    else{
                      this.$set(this.proVenueDtos[j],'isNum',false);
                    }

                    if(this.proVenueDtos[j].jsprice!=this.venueChangVos[i].jsAmt){
                      this.$set(this.proVenueDtos[j],'isPrice',true);
                      this.proVenueDtos[j].jsprice=this.venueChangVos[i].jsAmt;
                    }
                    else{
                      this.$set(this.proVenueDtos[j],'isPrice',false);
                    }
                  }
                }
            }
          }
          // 变更游客价格
          if(this.priceChangeVos.length!=0){
            for(let i=0;i<this.priceChangeVos.length;i++){
              this.changeSingle+=this.priceChangeVos[i].roomPrice;
              if(this.priceChangeVos[i].isChild==0){
                console.log('1111111111111');
                for(let j=0;j<this.ordOrderPrices.length;j++){
                  if(this.ordOrderPrices[j].ischild==false){
                    if(this.ordOrderPrices[j].visitornum!=this.priceChangeVos[i].visitorNum){
                      this.ordOrderPrices[j].visitornum=this.priceChangeVos[i].visitorNum;
                      console.log(this.ordOrderPrices[j].visitornum,'hhhhhhhhhhhhhhhhh')
                      this.$set(this.ordOrderPrices[j],'isNum',true);
                    }
                    else{
                      this.$set(this.ordOrderPrices[j],'isNum',false);
                    }
                    if(this.ordOrderPrices[j].saleprice!=this.priceChangeVos[i].salePrice){
                      this.ordOrderPrices[j].saleprice=this.priceChangeVos[i].salePrice;
                      this.$set(this.ordOrderPrices[j],'isPrice',true);
                    }
                    else{
                      this.$set(this.ordOrderPrices[j],'isPrice',false);
                    }
                  }
                }
              }
              if(this.priceChangeVos[i].isChild==1){
                for(let j=0;j<this.ordOrderPrices.length;j++){
                  if(this.ordOrderPrices[j].ischild==true){
                    if(this.ordOrderPrices[j].visitornum!=this.priceChangeVos[i].visitorNum){
                      this.ordOrderPrices[j].visitornum=this.priceChangeVos[i].visitorNum;
                      this.$set(this.ordOrderPrices[j],'isNum',true); 
                    }
                    else{
                       this.$set(this.ordOrderPrices[j],'isNum',false);
                    }
                    if(this.ordOrderPrices[j].saleprice!=this.priceChangeVos[i].salePrice){
                      this.ordOrderPrices[j].saleprice=this.priceChangeVos[i].salePrice;
                      this.$set(this.ordOrderPrices[j],'isPrice',true);
                    }
                    else{
                       this.$set(this.ordOrderPrices[j],'isPrice',false);
                    }
                  }
                }
              }
            }
            if(this.changeSingle!=this.singleRoomPrice){
              this.isChangeSingle=true;
            }
          }
          
        }).catch(err => {
          console.log("订单详情接口获取异常", err);
        });
    },
    // 确认或者拒绝
    changeOrder(num){
      let params={
        'ordId':this.$route.params.orderId,
        'dataStatus':num
      }
      changeDataStatus(params).then(response => {
          console.log(response);
          if (response.meta.success == true) {
              console.log("同意或拒绝成功"); 
              if(num==1){
                this.$Message.info('已同意');
              }
              if(num==-1){
                this.$Message.info('已拒绝');
              }
          } else {
              console.log("同意或拒绝失败");
              if(num==1){
                this.$Message.info('同意失败');
              }
              if(num==-1){
                this.$Message.info('拒绝失败');
              }
          }
      })
      .catch(err => {
          console.log("同意或拒绝异常", err);
      });
    }
  },
  mounted() {
  },
  components: {
    supplierHeader,
    Footer,
    feedBack
  }
};
</script>
<style lang="scss">
.order-details{
  background: #f0f2f5;
  min-height: 100vh !important;
  position: relative;
  padding-bottom: 91px;
   .footer {
        position: absolute;
        bottom: 0; 
    }
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
      width: 100%;
      background: #fff;
      border:1px solid #eee;
      margin-bottom: 20px;
    }
    .order-state{
      padding: 15px 25px 15px 20px;
      .state-info{
        display: inline-block;
        >p{
          @include sc(18px,#111);
        }
        >h2{
          @include sc(26px,#ffba00);
          font-weight: lighter;
          width: 100%;
          text-align: center;
          margin-top: 5px;
        }
      }
      .state-price{
        float: right;
        >div{
          display: inline-block;
          margin-top: 15px;
          >h2{
            @include sc(16px,#333);
            font-weight: normal;
            >span{
              @include sc(26px,#ffba00);
              &.change{
                color:#ff5534;
              }
            }
          }
          .ivu-poptip{
            width:100%;
            .ivu-poptip-rel{
              width: 100%;
              >a{
                display: inline-block;
                width: 100%;
                text-align: right;
                padding-right: 12px;
                 @include sc(12px,#6ea5ff);
              }
            }
            .ivu-poptip-body{
              width:350px;
              .ivu-poptip-body-content{
                >div{
                  >p{
                    @include sc(14px,#333);
                    margin-bottom: 5px;
                    >span{
                      float: right;
                      @include sc(14px,#333);
                      .change{
                        color:#ff5534;
                      }
                      &.change{
                        color:#ff5534;
                      }
                    }
                  }
                  >div{
                    @include sc(14px,#333);
                    height: auto;
                    margin-bottom: 5px;
                    >div{
                      float: right;
                      >p{
                        >span{
                          margin-left: 20px;
                          .change{
                            color:#ff5534;
                          }
                        }
                      }
                    }
                    >p{
                      clear: both;
                    }
                  }
                  >h2{
                    padding-top: 10px;
                    border-top:1px solid #eee;
                    @include sc(18px,#ffba00);
                    margin-top:5px;
                    padding-bottom: 5px;
                    >span{
                      float: right;
                      @include sc(18px,#ffba00);
                      &.change{
                        color:#ff5534;
                      }
                    }
                  }
                }
              }
            }
          }
          
        }
        >a{
          display: inline-block;
          vertical-align: top;
          @include wh(123px,48px);
          @include sc(26px,#ffba00);
          line-height: 46px;
          text-align: center;
          border-radius: 4px;
          border: solid 1px #ffba00;
          background: #fff;
          margin-left: 80px;
          margin-top: 13px;
          &.cancel{
            border:1px solid #e1e1e1;
            color:#555;
          }
          &.esp{
            margin-left: 20px;
          }
        }
      }
    }
    .order-information {
      padding: 0 20px;
      >p{
        @include sc(16px,#333);
        margin-bottom: 15px;
      }
      >div{
        padding-bottom: 10px;
        >div{
          padding-left: 20px;
          >p{
            display: inline-block;
            min-width:210px;
            margin-bottom: 5px;
            @include sc(14px,#111);
            >label{
              @include sc(14px,#111);
              display: inline-block;
              width: 85px;
              &.esp{
                letter-spacing: 3.5px;
              }
            }
            >a{
              color:#6ea5ff;
            }
            &.change{
              @include sc(14px,#ff5534);
            }
          }
        }
      }
    }
    .tourist-information {
      padding: 0 20px;
	    	margin-bottom: 40px;
        margin-top: 10px;
        .tourist-fill {
            >div{
              &:last-child{
                >div{
                  border-bottom: none;
                }
              }
              >h1{
                display: inline-block;
                vertical-align: top;
                @include sc(16px,#111);
                >img{
                  @include wh(20px,15px);
                  display: inline-block;
                  vertical-align: middle;
                  margin-right: 8px;
                }
              }
              >div{
                display: inline-block;
                border-bottom: 1px dashed #e1e1e1;
                margin-bottom:10px;
                padding-left: 60px;
                margin-left: -20px;
                width: 1000px;
                padding-top: 3px;
                padding-bottom: 10px;
                >div{
                  display: inline-block;
                  vertical-align: top;
                  margin-right:100px;
                  >p{
                    @include sc(14px,#333);
                    margin-bottom: 5px;
                    >label{
                      @include sc(14px,#333);
                      width: 80px;
                      display: inline-block;
                      text-align: right;
                      margin-right: 4px;
                    }
                    &.change{
                      color:#ff5534;
                      >label{
                        color:#ff5534;
                      }
                    }
                  }
                }
              }
               &.change{
                 *{
                    color:#ff5534;
                 }
               }
            }
        }
    }
    .other-information {
      padding: 0 20px 10px;
      >div{
        padding-left: 60px;
        >div{
           @include sc(14px,#333);
          >label{
            @include sc(14px,#333);
            margin-right: 4px;
            display: inline-block;
            width: 60px;
            text-align: right;
          }
        }
        .other-name,.other-tel{
          display: inline-block;
          margin-right: 55px;
          margin-bottom: 10px;
        }
        .other-note{
          margin-bottom: 20px;
        }
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
    .change-tip{
      @include sc(14px,#7d7d7d);
      padding-left: 37px;
      margin-top: -10px;
      margin-bottom: 7px;
    }
    .change-btn{
      text-align: center;
      margin-bottom: 50px;
      >a{
        @include wh(128px,48px);
        display: inline-block;
        border-radius: 4px;
        border:1px solid #e1e1e1;
        line-height: 46px;
        text-align: center;
        background: #fff;
        @include sc(26px,#ccc);
        &:last-child{
          background: #ffba00;
          border:1px solid #ffba00;
          @include sc(26px,#fff);
          margin-left: 67px;
        }
      }
    }
  }
}
</style>
