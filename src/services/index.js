import fetch from '../common/fetch'
//获取cookie值接口
export const getCookie = (params) => fetch({
    'url': '/apiH/index/getCookie',
    'method': 'get',
    'params': params,
    'accredit': false
});

//站点展示
export const getAllSite = (params) => fetch({
    'url': '/apiH/index/getAllSite/' + params,
    'method': 'get',
    'accredit': false
});

//供应商logo信息接口
export const getLogo = (params) => fetch({
    'url': '/apiH/index/getLogo/' + params,
    'method': 'get',
    'accredit': true
});

// 供应商页面查询接口
export const getProductGroupByType = (params) => fetch({
    'url': '/apiH/index/getProductGroupByType',
    'method': 'post',
    'data': params,
    'accredit': true
});

// 产品类型-产品列表接口
export const newProductListByType = (params) => fetch({
    'url': '/apiH/list/newProductListByType',
    'method': 'post',
    'data': params,
    'accredit': true
});
//特价促销列表（熊二 12/12）
export const newProductListByPromotion = (params) => fetch({
	'url':'/apiH/list/newProductListByPromotion',
	'method': 'post',
    'data': params,
    'accredit': true
})
// 查询条件接口
export const getconditionlist = (params) => fetch({
    'url': '/apiH/list/getconditionlist',
    'method': 'get',
    'params': params,
    'accredit': true
});

//获取头部线路类型接口
export const getAllRouteType = () => fetch({
    'url': '/apiH/index/getAllRouteType',
    'method': 'get',
    'accredit': true
});


// 接送设置
export const getVenue = (params) => fetch({
	'url': '/apiH/getVenue',
	'method': 'post',
	'data': params,
	'accredit': true
});

// 退出登录
export const loginOut = (params) => fetch({
    'url': '/apiH/loginOut',
    'method': 'get',
    'params': params,
    'accredit': true
});


// 搜索供应商页面相关
// 搜索商铺列表
export const searchStore = (params) => fetch({
    'url': '/apiG/api/TravelAgency/GetTravelAgencys',
    'method': 'get',
    'params': params,
    'accredit': true
});

// 搜索供应商
export const searchSuppliers = () => fetch({
    'url': '/apiH/searchSuppliers',
    'method': 'get',
    'accredit': true
});

// 保存供应商
export const saveSupplier = (params) => fetch({
    'url': '/apiH/searchSuppliers/saveSupplier',
    'method': 'post',
    'data': params,
    'accredit': true
});

// 删除供应商
export const delSuppliers = (params) => fetch({
    'url': '/apiH/searchSuppliers/delSuppliers',
    'method': 'post',
    'data': params,
    'accredit': true
});

// 登录注册相关

// 用户注册
export const UserRegisteByMobile = (params) => fetch({
    'url': '/apiG/api/H5UserIdentification/UserRegisteByMobile',
    'method': 'post',
    'data': params,
    'accredit': true
});

// 手机登录
export const UserLoginByMobile = (params) => fetch({
    'url': '/apiG/api/H5UserIdentification/UserLoginByMobile',
    'method': 'get',
    'params': params,
    'accredit': true
});

// 手机登录验证是否设置密码
export const getUserLoginByMobileWithPwdType = (params) => fetch({
    'url': '/apiG/api/H5UserIdentification/UserLoginByMobileWithPwdType',
    'method': 'get',
    'params': params,
    'accredit': true
});


// 手机密码登录
export const UserLoginByMobilePassword = (params) => fetch({
    'url': '/apiG/api/H5UserIdentification/UserLoginByMobilePassword',
    'method': 'get',
    'params': params,
    'accredit': true
});

// 找回密码
export const ModifyPassword = (params) => fetch({
    'url': '/apiG/api/H5UserIdentification/ModifyPassword',
    'method': 'post',
    'data': params,
    'accredit': true
});
//旅行社系统用户登陆
// 手机密码登录
export const UserLoginForShop = (params) => fetch({
    'url': '/apiG/api/UserIdentification/UserLoginForShop',
    'method': 'get',
    'params': params,
    'accredit': true
});
// 手机登录
// export const UserRegisteByMobile = (params) => fetch({
// 	'url': '/apiG/UserRegisteByMobile',
// 	'method': 'get',
// 	'params': params,
// 	'accredit': true
// });

// 发送验证码
export const sendMessage = (params) => fetch({
    'url': '/apiH/sendMessage',
    'method': 'post',
    'data': params,
    'accredit': true
});

// 验证验证码
export const checkCode = (params1,params2) => fetch({
    'url': '/apiH/checkCode/' + params1+'/'+params2,
    'method': 'post',
    'accredit': true
});

//验证当前登录的手机号是否存在
export const mobile = (params) => fetch({
  'url': '/apiG/api/H5UserIdentification/UserLoginByMobile',
  'method': 'get',
  'params': params,
  'accredit': true
});

// 登录
export const login = (params) => fetch({
    'url': '/apiH/login',
    'method': 'post',
    'data': params,
    'accredit': true
});

// ERP用户登录
export const erpLogin = (params) => fetch({
    'url': '/apiH/erpLogin?'+params,
    'method': 'get',
    'accredit': true
});




// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //







// ES查询接口
export const getProductList = (params) => fetch({
    'url': '/apiH/list/productlist',
    'method': 'post',
    'data': params,
    'accredit': true
});

// 数据库查询产品列表
export const newProductlist = (params) => fetch({
    'url': '/apiH/list/newProductlist',
    'method': 'post',
    'data': params,
    'accredit': true
});

// 平台保障接口
export const getDocHelp = () => fetch({
    'url': '/apiH/doc/getDocHelp',
    'method': 'get',
    'accredit': true
});

//价格策略接口
export const getPolicysList = (params) => fetch({
    'url': '/apiH/policys',
    'method': 'post',
    'data': params,
    'accredit': true
});

// 预定页信息展示接口
export const getMessage = (params) => fetch({
    'url': '/apiH/messages',
    'method': 'post',
    'data': params,
    'accredit': true
});


// 无格式粘贴提交接口
export const getUploadByText = (params) => fetch({
    'url': '/apiH/uploadByText',
    'method': 'post',
    'data': params,
    'accredit': true
});

// 下载模板文档接口
// export const getDownLoad = () => fetch({
// 	'url': '/downLoad',
// 	'method': 'post',
// 	'accredit': true
// });
// 上传模板文档接口
export const getUpload = (params) => fetch({
    'url': '/apiH/upLoad',
    'method': 'post',
    'data': params,
    'accredit': true
});

// 提交订单验证接口
export const addOrderInfo = (params) => fetch({
    'url': '/apiH/addOrderInfo',
    'method': 'post',
    'data': params,
    'accredit': true
});

//产品详情接口
export const getDetails = (params) => fetch({
    'url': '/apiH/details',
    'method': 'post',
    'data': params,
    'accredit': true
});

//团期接口
export const getTours = (params) => fetch({
    'url': '/apiH/tours',
    'method': 'post',
    'data': params,
    'accredit': true
});


// 产品出发地接口
export const getProductDepartures = (params) => fetch({
    'url': '/apiH/departures',
    'method': 'post',
    'data': params,
    'accredit': true
});

// 详情页验证接口
export const getValidateDetails = (params) => fetch({
    'url': '/apiH/validateDetail',
    'method': 'post',
    'data': params,
    'accredit': true
});

// 面包屑导航
export const getNavigation = (params) => fetch({
    'url': '/apiH/getNavigation',
    'method': 'post',
    'data': params,
    'accredit': true
});

// // 底部商家广告位接口
// export const getAdSupplierRecommend = (params) => fetch({
// 	'url': '/apiH/ad/getAdSupplierRecommend/' + params,
// 	'method': 'get',
// 	'accredit': true
// });

// 数据存入接口
export const insertCustom = (params) => fetch({
    'url': '/apiH/custom/insertCustom',
    'method': 'post',
    'data': params,
    'accredit': true
});

// 查询服务类型
export const getServcieType = () => fetch({
    'url': '/apiH/custom/getServcieType',
    'method': 'get',
    'accredit': true
});

//查询定制游标签
export const getAllTag = () => fetch({
    'url': '/apiH/custom/getAllTag',
    'method': 'get',
    'accredit': true
});
//目的地接口
export const getRouteTypeAndDestination = (params) => fetch({
    'url': '/apiH/index/getRouteTypeAndDestination/' + params,
    'method': 'get',
    'accredit': true
});

// 定制游出发地接口
export const getCustomDeparture = (params) => fetch({
    'url': '/apiH/custom/getDeparture',
    'method': 'get',
    'params': params,
    'accredit': true
});

// 订单查询接口
export const getOrderInfo = (params) => fetch({
    'url': '/apiH/getOrderInfo',
    'method': 'post',
    'data': params,
    'accredit': true
});

// 取消订单
export const cancelOrder = (params) => fetch({
    'url': '/apiH/cancel/' + params,
    'method': 'get',
    'accredit': true
});

// 获取个人信息
export const getUserInformationByID = (params) => fetch({
    'url': '/apiG/api/H5UserIdentification/GetUserInfoByID',
    'method': 'get',
    'params': params,
    'accredit': true
});
// 保存个人信息
export const postUserInformationByID = (params) => fetch({
    'url': '/apiG/api/H5UserIdentification/ModifyUserInfo',
    'method': 'post',
    'data': params,
    'accredit': true
});

// 修改密码
export const posModifyPasswordByPwd = (params) => fetch({
    'url': '/apiG/api/H5UserIdentification/ModifyPasswordByPwd',
    'method': 'post',
    'data': params,
    'accredit': true
});

// 获取ERP用户信息
export const getErpUser= () => fetch({
    'url': '/apiH/user/getErpUser',
    'method': 'get',
    'accredit': true
});

// 订单跳转链接接口
export const redirectOrder= (params) => fetch({
    'url': '/apiH/redirectOrder/'+params,
    'method': 'get',
    'accredit': true
});

// 详情页产品访问统计接口
export const visits = (params) => fetch({
    'url': '/apiH/visits',
    'method': 'post',
    'data': params,
    'accredit': true
});

// 支付页面订单详情
export const getOrderInfoForPay = (params) => fetch({
    'url': '/apiH/getOrderInfoForPay',
    'method': 'get',
    'params': params,
    'accredit': true
});

// 支付页面支付方式
export const getBankAccount = (params) => fetch({
    'url': '/apiH/getBankAccount',
    'method': 'get',
    'params': params,
    'accredit': true
});

//支付页面上传图片
export const uploadPayImg = (params) => fetch({
    'url': '/apiH/uploadPayImg',
    'method': 'post',
    'data': params,
    'accredit': true
});

// 提交支付申请
export const postPayment = (params) => fetch({
    'url': '/apiH/postPayment',
    'method': 'post',
    'data': params,
    'accredit': true
});

// 订单详情
export const getOrderInfoDetail = (params) => fetch({
    'url': '/apiH/getOrderInfoDetail/'+params,
    'method': 'post',
    'accredit': true
});

// // 专卖店广场
// export const GetTravelAgencyInfo = () => fetch({
//     'url': '/apiG/api/TravelAgency/GetTravelAgencyInfo',
//     'method': 'get',
//     'accredit': true
// });

// 最新报价接口
export const latestQuote = (params) => fetch({
	'url': '/apiH/latestquo/'+params,
	'method': 'get',
	'accredit': true
});

// 用过orgId获取店铺
export const GetSupplierNameByID = (params) => fetch({
	'url': '/apiG/api/OrgInfo/GetSupplierNameByID',
    'method': 'get',
    'params':params,
	'accredit': true
});


// 获取手机专卖店二维码
export const getH5Shop = (params) => fetch({
	'url': '/apiH/index/getH5Shop/'+params,
	'method': 'get',
	'accredit': true
});

// 查询首页列表的目的地
export const getIndexListDest = (params) => fetch({
	'url': '/apiH/list/getIndexListDest',
    'method': 'get',
    'params':params,
	'accredit': true
});

// 定制游列表接口
export const getCusinfoList = (params) => fetch({
	'url': '/apiH/custom/getCusinfoList',
    'method': 'get',
    'params':params,
	'accredit': true
});

// 定制游列表各状态数据条数统计接口
export const getCusinfoCount = (params) => fetch({
	'url': '/apiH/custom/getCusinfoCount/'+params,
	'method': 'get',
	'accredit': true
});


// 定制游取消接口
export const cancelCus = (params) => fetch({
	'url': '/apiH/custom/cancelCus/'+params,
	'method': 'get',
	'accredit': true
});

// B端个人资料积分信息
export const getExpByOrgId = (params) => fetch({
	'url': '/apiH/index/getExpByOrgId/'+params,
	'method': 'get',
	'accredit': true
});

// H5ERP二维码接口
export const getH5Erp = (params) => fetch({
	'url': '/apiH/index/getH5Erp/'+params,
	'method': 'get',
	'accredit': true
});

// 获取订单每一类型的个数
export const getOrderNumByDatastatus = () => fetch({
	'url': '/apiH/getOrderNumByDatastatus',
	'method': 'post',
	'accredit': true
});

// 根据用户ID获取上次登录时间接口
export const getUserLastLoginTime = (params) => fetch({
	'url': '/apiH/index/getUserLastLoginTime/'+params,
	'method': 'get',
	'accredit': true
});

// 变更单
// export const changedSth = (params) => fetch({
// 	'url': '/apiS/changedSth/'+params,
// 	'method': 'get',
// 	'accredit': true
// });


// 统计相关接口
export const saveRecoding = (params) => fetch({
    'url': '/apiT/saveRecoding',
    'method': 'post',
    'data': params,
    'accredit': true
});
export const outRecoding = (params) => fetch({
    'url': '/apiT/outRecoding',
    'method': 'post',
    'data': params,
    'accredit': true
});

// 方案详情接口
export const getPsCutomInfo = (params) => fetch({
	'url': '/apiH/ps/getPsCutomInfo/'+params,
	'method': 'get',
	'accredit': true
});

// // 查看定制游方案列表
// export const findPsQuickList = (params) => fetch({
// 	'url': '/apiH/ps/findPsQuickList/'+params,
// 	'method': 'get',
// 	'accredit': true
// });

// 确认方案
export const ConfirmScheme = (params) => fetch({
    'url': '/apiG/api/CusInfo/ConfirmScheme',
    'method': 'post',
    'data':params,
    'accredit': true
});

// 已确认定制游方案
export const findPsQuick = (params) => fetch({
    'url': '/apiH/ps/findPsQuick',
    'params':params,
	'method': 'get',
	'accredit': true
});

// 确认或拒绝变更单接口
export const changeDataStatus = (params) => fetch({
    'url': '/apiH/changeDataStatus',
    'data':params,
	'method': 'post',
	'accredit': true
});

// 下载模板
export const downLoadUrl = () => fetch({
    'url': '/apiH/downLoadUrl',
	'method': 'get',
	'accredit': true
});

//下载最新报价接口
export const download = (params) => fetch({
    'url': '/apiH/download/'+params,
	'method': 'get',
	'accredit': true
});


// 优惠券购买提交接口
export const postCouponsPay = (params) => fetch({
    'url': '/apiH/postCouponsPay',
    'data':params,
	'method': 'post',
	'accredit': true
});

// 获取优惠券产品接口
export const finProOtherProduct = () => fetch({
    'url': '/apiH/finProOtherProduct',
	'method': 'get',
	'accredit': true
});

// pc优惠券获取二维码
export const getCoupon = (params) => fetch({
    'url': '/apiH/index/getCoupon',
	'method': 'get',
	'params': params,
	'accredit': true
});

// 返回优惠券订单接口
export const getCouponOrderUrl = () => fetch({
    'url': '/apiH/getCouponOrderUrl',
	'method': 'get',
	'accredit': true
});

// 搜索销售人员接口
export const GetAllUserByCondition = (params) => fetch({
    'url': '/apiG/api/User/GetAllUserByCondition',
    'method': 'get',
    'params': params,
    'accredit': true
});

// 我买到的
export const redirectOrderOfBuy = () => fetch({
	'url': '/apiH/redirectOrderOfBuy',
	'method': 'get',
	'accredit': true
});

// 店铺业务类型查询接口
export const getBusinessTypes = () => fetch({
	'url': '/apiH/index/getBusinessTypes',
	'method': 'get',
	'accredit': true
});

// 客服电话接口
export const GetCustomerServiceInfo = (params) => fetch({
    'url': '/apiG/api/Comm/GetCustomerServiceInfo',
    // 'url': '/apiG/api/Comm/GetCustomerServiceInfo?orgID='+params,
    'method': 'get',
    'params': params,
    'accredit': true
});

// 产品二维码分享接口
export const getProShareQRCode = (params) => fetch({
    'url': '/apiH/getProShareQRCode',
    'method': 'get',
    'params': params,
    'accredit': true
});

// 获取全部旅行社站点信息
export const GetOmSiteInfoAll = () => fetch({
    'url': '/apiG/api/TravelAgency/GetOmSiteInfoAll',
    'method': 'get',
    'accredit': true
});

// 搜索旅行社站点信息
export const GetOmSiteInfoSeach = (params) => fetch({
    'url': '/apiG/api/TravelAgency/GetOmSiteInfoSeach',
    'method': 'get',
    'params': params,
    'accredit': true
});

// 获取全部旅行社经营线路信息
export const GetCommParameterInfoAll = (params) => fetch({
    'url': '/apiG/api/TravelAgency/GetCommParameterInfoAll',
    'method': 'get',
    'params': params,
    'accredit': true
});

// 搜索获取全部旅行社经营线路信息
export const GetCommParameterInfoSeach = (params) => fetch({
    'url': '/apiG/api/TravelAgency/GetCommParameterInfoSeach',
    'method': 'get',
    'params': params,
    'accredit': true
});

// 获取旅行社信息，专卖店广场
export const GetTravelAgencyInfo = (params) => fetch({
    'url': '/apiG/api/TravelAgency/GetTravelAgencyInfo',
    'method': 'get',
    'params': params,
    'accredit': true
});