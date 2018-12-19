<!--这是需求单页面-->
<template>
    <div class="demand" @click="globalFun()">
      <!-- 引入头部导航 -->
      <supplierHeader  :without="without"  :isHide="isHide" @global="globalFunT" @refreshList="demandInit"></supplierHeader>
      <p class="bread-crumbs">您当前所在位置：<a :href="'#/supplier?orgId=' + orgId">首页 > </a><a :href="fromPath">{{fromName}} > </a><span>定制游</span></p>
       <!-- 需求单主要内容 -->
       <div class="demand-content">
         <div class="demand-main">
            <h2><span>1</span>基本信息填写</h2>
            <div class="basic-information">
              <div>
                  <label for="">*出游性质:</label>
                  <p class="demand-type">
                      <a href="javascript:;" :class="demandIndex==1?'active':''" @click.stop.prevent="demandIndex=1">个人定制</a>
                      <a href="javascript:;" :class="demandIndex==2?'active':''" @click.stop.prevent="demandIndex=2">公司定制</a>
                  </p>
              </div>
              <div class="demand-origin">
                  <label class="esp" for="">*出发城市:</label>
                  <Input type="text" @on-focus="originShow=true" @on-blur="originBlur" v-model.trim="originText"></Input>
                  <ul v-if="departuresList.length!=0&&originShow==true&&originText!=''" >
                      <li :class="deIndex==index?'active':''" @click.stop.prevent="selectedOrigin(index,de)" v-for="(de,index) in departuresList">{{de.name}}</li>
                  </ul>
              </div>
              <div class="demand-destination">
                  <label class="esp" for="">*目的城市:</label>
                  <div @click.stop="destinationFun()" class="show-destination" >
                      <a href="javascript:;" v-for="des in selectedDesList.length" @click.stop.prevent="deleteDes(des)" >{{selectedDesList[des-1]}}<i>x</i></a>
                  </div>
                  <!-- <input type="text" @click.stop="destinationFun()"> -->
                  <p class="demand-tip"><i>i</i>最多选择3个目的地</p>
                  <div class="destination-list" v-if="destinationShow" @click.stop="destinationShow=destinationShow">
                      <ul>
                        <li @mouseenter="destinationIndex=index" v-for="(destination,index) in destinationList"  :class="destinationIndex==index?'active':''">{{destination.omRouteType.routetype}}</li>
                      </ul>
                      <div  v-for="(destination,index) in destinationList" v-if="destinationIndex==index">
                        <a href="javascript:;" :class="hotCity.selected==true?'active':''"  @click.stop.prevent="selectedDes(hotCity)" v-for="(hotCity,index) in destinationList[destinationIndex].omDestinations">{{hotCity.destname}}</a> 
                      </div>
                  </div>
              </div>
              <div class="demand-date">
                  <label class="esp" for="">*预估日期:</label>
                  <DatePicker format="yyyy-MM-dd" type="daterange" placeholder="选择日期"  @on-change="dateSelected"></DatePicker>
                  <!-- <DatePicker type="date" :value="startTime":options="options" format="yyyy/MM/dd" placeholder="选择开始日期" style="width: 200px" v-model="startTime" @on-change="dateStartChange"></DatePicker>
                  至
                  <DatePicker type="date" :value="endTime":options="options" format="yyyy/MM/dd" placeholder="选择结束日期" style="width: 200px" v-model="endTime" @on-change="dateEndChange"></DatePicker> -->
              </div>
              <div>
                  <label for="">*预估出行人数:</label>
                  <p class="demand-price-policy">
                      <span>成人<i class="demand-reduce" @click.stop.prevent="reduceAdultCount()"></i><input type="text" @blur="handleAdultInput(adultCount)" v-model="adultCount"/><i class="demand-add" @click.stop.prevent="addAdultCount()"></i></span>
                      <span>儿童<i class="demand-reduce" @click.stop.prevent="reduceChildCount()"></i><input type="tel" @blur="handleChildInput(childCount)" v-model="childCount"/><i class="demand-add" @click.stop.prevent="addChildCount()"></i></span>
                  </p>
              </div>
              <div class="demand-cap">
                  <label class="esp" for="">预估人均预算:</label>
                  <Input @on-blur="checkCapita"  v-model="capita"></Input>
                  <p class="demand-tip"><i>i</i>请输入0-999999999之间的数字</p>
              </div>
            </div>
            <p class="next" v-if="stepIndex==1"><a href="javascript:;" @click.stop.prevent="nextFirst()">继续填写定制信息</a></p>
            <h2><span>2</span>定制信息填写</h2>
            <transition name="draw">
              <div class="characteristics" v-show="stepIndex==2||stepIndex==3">
                <div>
                      <label for="" class="esp">需要提供:</label>
                      <ul class="character-list">
                          <li href="javascript:;" v-for="(demand,index) in demandList" :class="demand.selected==true?'active':''" @click.stop.prevent="serviceSelected(demand)">{{demand.servicename}}</li>
                      </ul>
                  </div>
                  <div>
                      <label for="" class="esp">需求标签:</label>
                      <ul class="character-list">
                          <li href="javascript:;" v-for="(custom,index) in customList" :class="custom.selected==true?'active':''" @click.stop.prevent="customSelected(custom)">{{custom.tagname}}</li>
                      </ul>
                  </div>
                  <div>
                      <label for="">最多几位定制师服务:</label>
                      <div class="service">
                          <a href="javascript:;" @click.stop.prevent="serviceIndex=1" :class="serviceIndex==1?'active':''">1</a>
                          <a href="javascript:;" @click.stop.prevent="serviceIndex=2" :class="serviceIndex==2?'active':''">2</a>
                          <!-- <p class="demand-tip"><i>i</i><span>你可以选择多位来自不同旅行社的定制师为您提供方案和报价，货比三家，选择最满意的一位为您服务。</span></p> -->
                      </div>
                  </div>
                  <div>
                      <label for="">其他需求:</label>
                      <div class="require">
                        <textarea name="" id="" v-model="otherRequire"></textarea>
                        <p>*提交需求后会有专业定制师联系您，为您免费制作方案，可根据实际情况调整细节</p>
                      </div>
                  </div>
              </div>
            </transition>
            <p class="next" v-if="stepIndex==2"><a href="javascript:;" @click.stop.prevent="nextSecond()">继续填写联系人信息</a></p>
            <h2><span>3</span>联系人信息填写</h2>
            <transition name="draw">
              <div class="contact-information" v-show="stepIndex==3">
                <div>
                    <label for="">*联系人:</label>
                    <Input type="text" v-model="travellerName" @on-blur="identityNameFun()"></Input>
                    <p class="demand-tip" v-if="mainNameCon!=''"><i>i</i>{{mainNameCon}}</p>
                </div>
                <div>
                    <label for="">*手机号码:</label>
                    <Input type="text" v-model="travellerTel" @on-blur="identityTelFun()"></Input>
                    <p class="demand-tip" v-if="mainTelCon!=''"><i>i</i>{{mainTelCon}}</p>
                </div>
                <div>
                    <label for="">电子邮箱:</label>
                    <Input type="text" v-model="travellerEmail" @on-blur="identityEmailFun()"></Input>
                    <p class="demand-tip"  v-if="mainEmailCon!=''"><i>i</i>{{mainEmailCon}}</p>
                </div>
                <div>
                  <label for="">微信号:</label>
                  <Input type="text" v-model="travellerWechat" @on-blur="identityWechatFun()"></Input>
                  <p class="demand-tip"  v-if="mainWechatCon!=''"><i>i</i>{{mainWechatCon}}</p>
                </div>
                <p>*提交需求后会有专业定制师联系您，为您免费制作方案，可根据实际情况调整细节</p>
              </div>
            </transition>
            <p class="submit" v-if="stepIndex==3">
                <a href="javascript:;"  @click.stop.prevent="demandConfirm">提交</a>
            </p>
         </div>
       </div>
        <Modal
            v-model="modalDemand"
            title="我的需求单"
            class-name="vertical-center-modal modal-demand">
            <div>
              <h1>我的需求单</h1>
              <p><label for="">出游性质：</label><span v-if="demandIndex==1">个人定制</span><span v-if="demandIndex==2">公司定制</span></p>
              <p><label for="">出发地：</label><span>{{originText}}</span></p>
              <p><label for="">目的地：</label><span v-for="(des,index) in selectedDesList.length">{{selectedDesList[des-1]}}<i v-if="index!=selectedDesList.length-1">,</i></span></p>
              <p><label for="">预估出行日期：</label><span>{{startTime.toLocaleString("ja-JP",{year: "numeric", month: "short",day: "numeric" })}}至{{endTime.toLocaleString("ja-JP",{year: "numeric", month: "short", day: "numeric" })}}</span></p>
              <p><label for="">预估出行人数：</label><span>{{adultCount}}成人 {{childCount}}儿童</span></p>
              <p v-if="capita!=''"><label for="">预估人均预算：</label><span>{{capita}}元</span></p>
              <div class="demand-esp"><label for="">需要提供什么：</label><p><span v-for="de in demandSelectedList.length">{{demandSelectedList[de-1]}}<i v-if="de!=demandSelectedList.length">,</i></span></p></div>
              <div class="demand-esp"><label for="">需求标签选择：</label><p><span v-for="de in customSelectedList.length">{{customSelectedList[de-1]}}<i v-if="de!=customSelectedList.length">,</i></span></p></div>
              <p><label for="">几位定制师联系：</label><span>{{serviceIndex}}位</span></p>
              <p v-if="otherRequire!=''"><label for="">其他需求：</label><span>{{otherRequire}}</span></p>
              <p><label for="">姓名：</label><span>{{travellerName}}</span></p>
              <p><label for="">手机号：</label><span>{{travellerTel}}</span></p>
              <p v-if="travellerEmail1=''"><label for="">邮箱：</label><span>{{travellerEmail}}</span></p>
              <p v-if="travellerWechat!=''"><label for="">微信号：</label><span>{{travellerWechat}}</span></p>
              <div class="demand-btn">
                <a href="javascript:;" @click.stop.prevent="demandSubmit">确认并提交</a>
                <a href="javascript:;" @click="modalDemand=false">返回并修改</a>
              </div>
            </div>
        </Modal>
        <feedBack></feedBack>
       <!-- 引入底部导航 -->
       <Footer></Footer>
    </div>
</template> 
<script>
import tools from "../common/tools";
import {
  getCustomDeparture,
  getRouteTypeAndDestination,
  insertCustom,
  getServcieType,
  getAllTag
} from "../services/index";
import supplierHeader from "../components/supplier-header.vue";
import Footer from "../components/footer.vue";
import feedBack from "../components/feedBack.vue";
import { log } from 'util';
export default {
  data() {
    return {
      modalDemand:false,
      boxshow:false,
      orgId: "", //供应商id
      isHide: false, //
      siteId: "", //站点id
      demandIndex: 1, //出游性质默认值
      serviceIndex: 1, //服务人数默认值
      without:true,//
      originText: "", //选择的出发地
      originId: "", //选择的出发地id
      indexPlan: 4, //传给导航组件的值
      destinationIndex: 0, //目的地默认值
      deIndex: 0, //出发地默认值
      hotIndex: -1, //目的地默认值
      stepIndex: 1,
      originShow: false, //出发地搜索框显隐
      destinationShow: false, //目的地选择框显隐
      demandList: [], // 服务类型列表
      customList: [], //定制标签列表
      demandSelectedList: [], // 服务类型选择列表
      customSelectedList: [], //定制标签选择列表
      demandIdList: [], // 服务类型id列表
      customIdList: [], //定制标签id列表
      departuresList: [], //定制游出发地列表
      adultCount: 1, //成人默认值
      childCount: 0, //儿童默认值
      selectedDesList: [], //选择的目的地列表
      selectedDesIdList: [], //选择的目的地id列表
      capita: "", //预估人均预算
      startTime: "", //出行开始日期
      endTime: "", //出行结束日期
      destinationList: [], //定制游目的地列表
      otherRequire: "", //其他需求
      travellerName: "", //联系人姓名
      travellerTel: "", //联系人电话
      travellerEmail: "", //联系人邮箱
      travellerWechat: "", //联系人微信号
      mainNameCon: "", //联系人姓名判断
      mainTelCon: "", //联系人手机号判断
      mainEmailCon: "", //联系人邮箱判断
      mainWechatCon:"",//联系人微信判断
      options: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      orgId:'',
      fromName:'',//从哪个页面来
      fromPath:'',//上个页面路径
    };
  },

  methods: {
    reduceDemand() {
      if (this.stepIndex != 1) {
        this.stepIndex--;
        // this.startTime = this.startTime;
        // this.endTime = this.endTime;
        // alert(this.startTime);
      }
    }, //左滑需求
    addDemand() {
      // if(this.stepIndex!=3){
      //     this.stepIndex++;
      // }
      if (this.stepIndex == 1) {
        if (this.judgeFristCorrect() == false) {
          return;
        }
        this.stepIndex++;
      } else if (this.stepIndex != 3) {
        this.stepIndex++;
      }
    }, //右滑需求
    // 失去焦点时出发地情况
    originBlur() {
      if (this.departuresList.length == 0) {
        this.originText = "";
      }
    },
    // 控制输入框只输文字  
    handleAdultInput(e){
      console.log(parseInt(e));
     
      if((isNaN(parseInt(e))?0:parseInt(e))<=0){
        this.adultCount=1;
      }
      else{
        this.adultCount=parseInt(e);
      }
    },
    handleChildInput(e){
      if((isNaN(parseInt(e))?0:parseInt(e))<=0){
        this.childCount=0;
      }
      else{
        this.childCount=parseInt(e);
      }
    },
    // 目的地搜索
    destinationFun() {
      this.destinationShow = true;
      this.siteId = tools.getSessionStorage("siteid");
      // 定制游目的地
      let params = this.siteId;
      getRouteTypeAndDestination(params)
        .then(response => {
          console.log(response,'1');
          if (response.meta.success == true) {
            console.log("定制游目的地数据获取成功");
            this.destinationList = response.data;

            if (this.destinationList.length != 0) {
              for (let i = 0; i < this.destinationList.length; i++) {
                for ( let j = 0;j < this.destinationList[i].omDestinations.length;j++) {
                  this.$set(this.destinationList[i].omDestinations[j],"selected",false);
                }
              }
            }
            console.log("destinationList", this.destinationList);
          } else {
            console.log("定制游目的地数据获取失败");
          }
        })
        .catch(err => {
          console.log("定制游目的地接口获取异常", err);
          // this.$Message.info('定制游目的地接口获取异常');
        });
    },
    // 目的地选择
    selectedDes(obj) {
      obj.selected = !obj.selected;
      if (this.selectedDesList.length == 3) {
        obj.selected = !obj.selected;
        this.destinationShow = false;
        if (obj.selected == false) {
         
          this.$Message.info("最多选择3个目的地！");
          
        }
        if (obj.selected == true) {
          for (let i = 0; i < this.selectedDesList.length; i++) {
            if (this.selectedDesList[i] == obj.destname) {
              // console.log(this.selectedDesList[i]);
              this.selectedDesList.splice(i, 1);
              this.selectedDesIdList.splice(i, 1);
              obj.selected = false;
              // console.log( this.selectedDesList);
              // console.log( this.selectedDesIdList);
            }
          }
        }
        return;
      }
      if (obj.selected == true) {
        this.selectedDesList.push(obj.destname);
        this.selectedDesIdList.push(obj.destid);
      } else {
        for (let i = 0; i < this.selectedDesList.length; i++) {
          if (this.selectedDesList[i] == obj.destname) {
            console.log(this.selectedDesList[i]);
            this.selectedDesList.splice(i, 1);
            this.selectedDesIdList.splice(i, 1);
            obj.selected = false;
          }
        }
      }
      console.log(this.selectedDesList);
      console.log(this.selectedDesIdList);
    },
    // 删除目的地 
    deleteDes(index) {
      if (this.destinationList.length != 0) {
        for (let i = 0; i < this.destinationList.length; i++) {
          for (
            let j = 0;
            j < this.destinationList[i].omDestinations.length;
            j++
          ) {
            if (
              this.destinationList[i].omDestinations[j].destname ==
              this.selectedDesList[index - 1]
            ) {
              this.destinationList[i].omDestinations[j].selected = false;
            }
          }
        }
      }
      this.selectedDesList.splice(index - 1, 1);
      this.selectedDesIdList.splice(index - 1, 1);
    },
    //全局控制函数
    globalFun() {
      this.isHide = false;
      this.destinationShow = false;
    },
    globalFunT() {
      this.isHide = !this.isHide;
    },
    // 需求单页初始化
    demandInit() {
      // 面包屑相关
      this.orgId = tools.getLocalStorage("orgId");
      this.fromName = tools.getLocalStorage("fromName");
      this.fromPath = tools.getLocalStorage("fromPath");
      // 获取url中的id
      this.demandIndex = this.$route.params.type;
      // console.log(this.demandIndex);
      getServcieType()
        .then(response => {
          console.log(response);
          if (response.meta.success == true) {
            console.log("服务类型数据获取成功");
            this.demandList = response.data;
            for (let i = 0; i < this.demandList.length; i++) {
              this.$set(this.demandList[i], "selected", true);
              this.demandIdList.push(this.demandList[i].id);
              this.demandSelectedList.push(this.demandList[i].servicename);
            }
          } else {
            console.log("服务类型数据获取失败");
          }
        })
        .catch(err => {
          console.log("服务类型接口获取异常", err);
        });
      getAllTag()
        .then(response => {
          if (response.meta.success == true) {
            console.log("定制游标签获取成功");
            this.customList = response.data;
            for (let i = 0; i < this.customList.length; i++) {
              this.$set(this.customList[i], "selected", false);
              this.customIdList.push(this.customList[i].id);
              // this.customSelectedList.push(this.customList[i].tagname);
            }
          } else {
            console.log("定制游标签获取失败");
          }
        })
        .catch(err => {
          console.log("定制游标签获取异常", err);
        });
    },
    //选择出发城市
    selectedOrigin(index, obj) {
      console.log(index, obj);
      
      this.deIndex = index;
      this.originText = obj.name;
      this.originId = obj.id;
      this.originShow = false;
      // 把出发地id放入缓存
      // tools.setLocalStorage('departureId',obj.id);
      // 把出发地放入缓存
      // tools.setLocalStorage('departure',obj.departure);
    },
    //增加成人人数
    addAdultCount() {
      this.adultCount++;
    },
    //增加儿童人数
    addChildCount() {
      this.childCount++;
    },
    // 减少成人人数
    reduceAdultCount() {
      if (parseInt(this.adultCount) == 1) {
        this.$Message.info("已经是最少人数了");
      } else {
        this.adultCount--;
      }
    },
    // 减少儿童人数
    reduceChildCount() {
      if (parseInt(this.childCount) == 0) {
        this.$Message.info("已经是最少人数了");
      } else {
        this.childCount--;
      }
    },
    // 服务类型选择
    serviceSelected(obj) {
      obj.selected = !obj.selected;
      // console.log(this.demandList);
      this.demandIdList = [];
      this.demandSelectedList = [];
      if (this.demandList.length != 0) {
        for (let i = 0; i < this.demandList.length; i++) {
          if (this.demandList[i].selected == true) {
            this.demandIdList.push(this.demandList[i].id);
            this.demandSelectedList.push(this.demandList[i].servicename);
          }
        }
      }
    },
    //定制标签选择
    customSelected(obj) {
      obj.selected = !obj.selected;
      this.customIdList = [];
      this.customSelectedList = [];
      if (this.customList.length != 0) {
        for (let i = 0; i < this.customList.length; i++) {
          if (this.customList[i].selected == true) {
            this.customIdList.push(this.customList[i].id);
            this.customSelectedList.push(this.customList[i].tagname);
          }
        }
      }
    },
    // //选择开始时间
    // dateStartChange(timeData) {
    //   // if (timeData[0] == "") {
    //   //   timeData = ["", ""];
    //   // }
    //   console.log('start',this.startTime);
    //   // this.startTime = timeData;
    //   console.log(timeData);
    // },
    // //选择结束时间
    // dateEndChange(timeData) {
    //   // if (timeData[0] == "") {
    //   //   timeData = ["", ""];
    //   // }
    //   console.log(this.endTime);
    //   // this.endTime = timeData;
    //   // console.log(this.endTime);
    // },
    dateSelected(timeData){
      if (timeData[0] == "") {
        timeData = ["", ""];
      }
      this.startTime=timeData[0];
      this.endTime=timeData[1];
    },
    //联系人姓名失去焦点的时候验证
    identityNameFun() {
      if (this.travellerName == "") {
        this.mainNameCon = "联系人姓名不能为空";
      } else {
        this.mainNameCon = "";
      }
    },
    //联系人电话失去焦点的时候验证
    identityTelFun() {
      let pattern = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!pattern.test(this.travellerTel) && this.travellerTel != "") {
        this.mainTelCon = "请输入正确的电话号码";
      } else if (this.travellerTel == "") {
        this.mainTelCon = "联系人手机号码不能为空";
      } else {
        this.mainTelCon = "";
      }
    },
    //联系人Email失去焦点的时候验证
    identityEmailFun() {
      let regEmail = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
      if (!regEmail.test(this.travellerEmail) && this.travellerEmail != "") {
        this.mainEmailCon = "邮箱格式不正确";
      } else {
        this.mainEmailCon = "";
      }
    },

    // 联系人微信失去焦点的时候校验
    identityWechatFun(){
      let patternWechat=/^[a-zA-Z][a-zA-Z0-9_-]{5,19}$/;
      if(!patternWechat.test(this.travellerWechat)&&this.travellerWechat!=''){
        this.mainWechatCon = "微信号不合法";
      }
      else{
        this.mainWechatCon = "";
      }
    },

    //判断联系人信息是否填写
    judgePersonIsCorrect() {
      if (tools.trim(this.travellerName) == "") {
        this.mainNameCon = "姓名不能为空";
        return false;
      }
      if (tools.trim(this.travellerTel) == "") {
        this.mainTelCon = "手机号码不能为空";
        return false;
      }
      let pattern = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!pattern.test(this.travellerTel)) {
        this.mainTelCon = "请输入正确的电话号码";
        return false;
      }
      if(this.mainEmailCon!="" || this.mainWechatCon){
         return false;
      }
    },
    //第一步判断
    judgeFristCorrect() {
      if (tools.trim(this.originText) == "") { 
        // this.$Message.config({
        //   top: 50,
        //   duration: 0
        // });
        this.$Message.info("请选择出发地");
        return false;
      }
      if (this.selectedDesList.length == 0) {
        this.$Message.info("请选择目的地");
        return false;
      }
      if (this.startTime == "") {
        this.$Message.info("请选择开始日期");
        return false;
      }
      if (this.endTime == "") {
        this.$Message.info("请选择结束日期");
        return false;
      }
    },
    // 第一步验证
    nextFirst() {
      if (this.judgeFristCorrect() == false) {
        return;
      }
      this.stepIndex = 2;
    },
    // 第二步验证
    nextSecond(){
      if (this.judgeFristCorrect() == false) {
        return;
      }
      this.stepIndex=3;
    },
    // 确认需求单
    demandConfirm(){
      if (this.judgeFristCorrect() == false) {
        return;
      }
      if (this.judgePersonIsCorrect() == false) {
        return;
      }
      this.modalDemand=true;
    },    
    // 需求信息提交
    demandSubmit() {
      let params = {
        adultnum: this.adultCount,
        budget: this.capita,
        childnum: this.childCount,
        customernum: this.serviceIndex,
        custype: this.demandIndex,
        siteid: this.siteId,
        departure: this.originText,
        departureid: this.originId,
        destinations: this.selectedDesList,
        destinationids: this.selectedDesIdList,
        email: this.travellerEmail,
        mobile: this.travellerTel,
        otherrequire: this.otherRequire,
        servicetypes: this.demandIdList,
        tags: this.customIdList,
        startdate: this.startTime,
        enddate: this.endTime,
        travellername: this.travellerName,
        wechat: this.travellerWechat,
        supplierid: tools.getLocalStorage("orgId"),
        transferSupplierNames:tools.getLocalStorage('logoName'),
      };
      //  需求数据存入接口
      insertCustom(params)
        .then(response => {
          console.log(response);
          if (response.meta.success == true) {
            console.log("需求数据存入成功");
            tools.setLocalStorage("demandNo", response.meta.message);
             this.modalDemand=false;
             this.$router.push("/process/4");
          } else {
            console.log("需求数据存入失败");
          }
        })
        .catch(err => {
          console.log("需求数据存入接口异常", err);
          // this.$Message.info('需求数据存入接口异常');
        });
    },
    // 判断预估
    checkCapita(){
      var re = /^[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/ 
      if (!re.test(this.capita.replace(/(^\s*)|(\s*$)/g, ""))) {
　　　　 this.$Message.info('请输入整数');
        this.capita='';
  　　}
      if (parseInt(this.capita)+"" !== this.capita&&this.capita!=''){
        this.capita = parseInt(this.capita);
      }
    }
  },
  mounted() {
    // this.demandInit();
  },
  components: {
    supplierHeader,
    Footer,
    feedBack
  },
  watch:{
      originText:async function (){
          this.departuresList=[];
          if(this.originText!==''){        
            let params = {
              name: this.originText,
            };
            await getCustomDeparture(params)
              .then(response => {
                console.log(response);
                if (response.meta.success == true) {
                  console.log("定制游出发地数据获取成功");
                  this.departuresList = response.data;
                  console.log(this.departuresList,'123');
                } else {
                  console.log("定制游出发地数据获取失败");
                }
              })
              .catch(err => {
                console.log("定制游出发地接口获取异常", err);
                // this.$Message.info('定制游出发地接口获取异常');
              });
          }
      }
    }
};
</script>

<style lang="scss">
.modal-demand{
  .ivu-modal{
    width: 514px;
    box-sizing: border-box;
    .ivu-modal-content{
      border-radius: 0;
      .ivu-modal-header,.ivu-modal-footer{
        display: none;
      }
      .ivu-modal-body{
        padding:20px 0 0 0;
        >div{
          >h1{
            @include sc(24px,#ffba00);
            font-weight: lighter;
            line-height: 24px;
            margin-bottom: 30px;
            padding-left: 20px;
          }
          >p,.demand-esp{
            padding-left:40px;
            line-height: 17px;
            margin-bottom: 15px;
            >label{
              display: inline-block;
              width: 115px;
              text-align: right;
              @include sc(14px,#999);
            }
            >span{
              @include sc(14px,#333);
              display: inline-block;
            }
            >p{
              display: inline-block;
              vertical-align: top;
              width: 320px;
               >span{
                @include sc(14px,#333);
                display: inline-block;
              }
            }
          }
          .demand-btn{
            height: 60px;
            font-size: 0;
            width: 100%;
            margin-top: 25px;
            >a{
              line-height: 60px;
              text-align: center;
              display: inline-block;
              @include sc(20px,#fff);
              &:first-child{
                width: 294px;
                background: #ffba00;
              }
              &:nth-child(2){
                width: calc(100% - 294px);
                background: #666;
              }
            }
          }
        }
      }
    }
  }
}
.characteristics{
  overflow: hidden;
  height: 350px;
}
.contact-information{
  min-height: 145px;
}
.draw-enter-active, .draw-leave-active {
  transition: all 1s ease;
}
.draw-enter, .draw-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  height: 0;
}


.demand {
  min-height: 100vh;
  overflow: auto;
  position: relative;
  padding-bottom: 90px;
  .footer{
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
  .demand-content {
    background: url('../assets/images/demand-s1.png') no-repeat;
    background-size: cover;
    min-height: calc(100vh - 315px);
    padding-top: 60px;
    padding-bottom: 76px;
    // &.step{
    //    background: url('../assets/images/demand-s2.png') no-repeat;
    //    background-size: cover;
    // }
    // &.step-n{
    //    background: url('../assets/images/demand-s3.png') no-repeat;
    //    background-size: cover;
    // }
    .demand-main{
      width: 1180px;
      margin: auto;
      >h2{
        @include sc(21px,#fff);
        margin-bottom: 28px;
        >span{
          @include wh(36px,36px);
          display: inline-block;
          border:1px solid #fff;
          border-radius: 50%;
          @include sc(21px,#fff);
          text-align: center;
          line-height: 34px;
          margin-right: 15px;
        }
      }
      .next{
        text-align: center;
        >a{
          display: inline-block;
          padding: 0 20px;
          height: 42px;
          @include sc(16px,#ffba00);
          line-height: 40px;
          border:1px solid #ffba00; 
          border-radius: 21px;    
        }
      }
      .demand-tip {
        display: inline-block;
        margin-bottom: 10px;
        @include sc(12px, #fff);
        margin-left: 10px;
        > i {
          @include sc(12px,#fff);
          border:1px solid #fff;
          @include wh(14px,14px);
          border-radius: 50%;
          display: inline-block;
          line-height: 13px;
          text-align: center;
          margin-right: 4px;
        }
        > span {
          width: calc(100% - 19px);
          display: inline-block;
          @include sc(12px, #fff);
        }
      }
      .basic-information{
        padding-left: 150px;
        >div{
          >label{
            display: inline-block;
            width:110px;
            text-align: right;
            @include sc(16px,#fff);
          }
        }
        .demand-type{
          display: inline-block;
          margin-bottom: 30px;
          >a{
            display: inline-block;
            @include wh(140px,42px);
            border:1px solid #fff;
            border-radius: 21px;
            text-align: center;
            line-height: 40px;
            @include sc(16px,#fff);
            margin-left: 30px;
            &.active{
              border: 1px solid #ffba00;
              @include sc(16px,#ffba00);
            }
          }
        }
        .demand-origin {
          position: relative;
          display: inline-block;
          vertical-align: top;
          margin-right: 30px;
          >label{
            margin-right: 5px;
          }
          .ivu-input-wrapper{
            display: inline-block;
            width: 213px;
            height: 42px;
            .ivu-input{
              width: 213px;
              height: 42px;
              border-radius: 0;
              border:1px solid #fff;
              background: transparent;
              color:#fff;
            }
          }
          > ul {
            width: 300px;
            max-height: 200px;
            // @include wh(300px,200px);
            border: 1px solid #1e5cab;
            position: absolute;
            left: 116px;
            overflow-y: auto;
            background: #fff;
            z-index: 1000;
            > li {
              list-style: none;
              height: 27px;
              line-height: 27px;
              @include sc(14px, #1e5cab);
              padding-left: 5px;
              &.active {
                background: #1e5cab;
                color: #fff;
              }
            }
          }
        }
        .demand-destination {
          position: relative;
          display: inline-block;
          >label{
            margin-right: 5px;
          }
          .show-destination {
            display: inline-block;
            vertical-align: middle;
            min-width: 213px;
            height: 42px;
            border: 1px solid #fff;
            padding-top: 9px;
            padding-right: 5px;
            > a {
              display: inline-block;
              height: 24px;
              padding: 0 5px;
              // @include wh(50px,24px);
              line-height: 24px;
              @include sc(14px, #ffba00);
              // border-radius: 12px;
              // background: #1e5cab;
              border:1px solid #ffba00;
              padding-left: 5px;
              margin-left: 5px;
              > i {
                display: inline-block;
                margin-left:8px; 
              }
            }
          }
          .destination-list {
            position: absolute;
            left: 117px;
            z-index: 1000;
            @include wh(490px, 180px);
            overflow-y: auto;
            background: #fff;
            box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.6);
            border-radius: 4px;
            > ul {
              height: 30px;
              margin: 0 30px;
              border-bottom: 1px solid #ddd;
              margin-bottom: 10px;
              margin-top: 10px;
              > li {
                list-style: none;
                float: left;
                height: 30px;
                line-height: 30px;
                @include sc(14px, #333);
                padding: 0 10px;
                &.active {
                  border-bottom: 2px solid #1e5cab;
                }
              }
            }
            > div {
              clear: both;
              padding: 0 20px;
              > a {
                height: 20px;
                line-height: 20px;
                padding: 0 10px;
                display: inline-block;
                @include sc(14px, #333);
                margin-left: 5px;
                margin-bottom: 6px;
                &.active {
                  @include sc(14px, #1e5cab);
                }
              }
            }
          }
        }
        .demand-date{
          margin: 30px 0;
          .ivu-date-picker{
            width: 213px;
            height: 42px;
            margin-left:5px;
            .ivu-input{
              height: 42px;
              border:1px solid #fff;
              background: transparent;
              color:#fff;
              border-radius: 0;
            }
            .ivu-icon{
              height: 42px;
              line-height: 42px;
            }
          }
        }
        .demand-price-policy {
          display: inline-block;
          > span {
            @include sc(16px, #fff);
            line-height: 25px;
            margin-left: 30px;
            > i {
              display: inline-block;
              vertical-align: middle;
              @include wh(42px, 42px);
            }
            .demand-reduce {
              background: url("../assets/images/demand-reduce.png")
                no-repeat;
              background-size: 100%;
              margin-left: 15px;
            }
            .demand-add {
              background: url("../assets/images/demand-add.png") no-repeat;
              background-size: 100%;
            }
            > input {
              font-style: normal;
              @include sc(16px, #fff);
              display: inline-block;
              vertical-align: top;
              width:55px;
              text-align: center;
              height: 42px;
              line-height: 40px;
              background: transparent;
              border: none;
              border-top:1px solid #fff;
              border-bottom:1px solid #fff;
            }
          }
        }
        .demand-cap{
          margin-top: 30px;
          margin-bottom: 40px;
          .ivu-input-wrapper{
            width: 213px;
            height: 42px;
            margin-left: 5px;
            .ivu-input{
              height: 42px;
              border:1px solid #fff;
              background: transparent;
              border-radius: 0;
              color:#fff;
            }
          }
        }
      }
      .characteristics{
        padding-left: 105px;
        >div{
          margin-bottom: 20px;
          >label{
            display: inline-block;
            width:155px;
            text-align: right;
            @include sc(16px,#fff);
          }
        }
        .character-list{
          display: inline-block;
          vertical-align: middle;
          margin-left: 5px;
          >li{
            float: left;
            width: 92px;
            height: 42px;
            @include sc(16px,#fff);
            line-height: 40px;
            text-align: center;
            border:1px solid #fff;
            margin-right: 10px;
            &.active{
              border:1px solid #ffba00;
              color:#ffba00;
            }
          }
        }
        .service{
          display: inline-block;
          margin-left: 5px;
          font-size:0;
          >a{
            display: inline-block;
            width: 92px;
            height: 42px;
            @include sc(16px,#fff);
            line-height: 40px;
            text-align: center;
            border:1px solid #fff;
            margin-right: 10px;
            &.active{
              border:1px solid #ffba00;
              color:#ffba00;
            }
          }
        }
        .require{
          display: inline-block;
          vertical-align: top;
          margin-left: 5px;
          margin-bottom: 20px;
          >textarea{
            @include wh(396px,100px);
            border:1px solid #fff;
            background: transparent;
            resize: none;
            padding: 7px 5px;
            color:#fff;
          }
          >p{
            @include sc(12px,#fff);
          }
        }
      }
      .contact-information{
        padding-left: 180px;
        >div{
          margin-bottom: 20px;
          display: inline-block;
          vertical-align: top;
          width: 360px;
          >label{
            display: inline-block;
            width:80px;
            text-align: right;
            @include sc(16px,#fff);
            margin-right: 5px;
          }
          >p{
            width: 300px;
            padding-left: 70px;
            text-align: center;
            margin-top: 5px;
            margin-bottom: 0 !important;
          }
        }
        .ivu-input-wrapper {
          display: inline-block;
          width:213px;
          height: 42px;
          .ivu-input{
            height: 42px;
            border:1px solid #fff;
            background: transparent;
            border-radius: 0;
            color:#fff;
          }
        }
        >p{
         @include sc(12px,#fff);
         text-align: center;
         margin-left: -180px;
        }
      }
      .submit{
        text-align: center;
        margin: 40px 0 0 0;
        >a{
          display: inline-block;
          @include wh(140px,42px);
          @include sc(18px,#fefefe);
          border-radius: 21px;
          line-height: 42px;
          text-align: center;
          background: #ffba00;
        }
      }
    }
  }
}
</style>
