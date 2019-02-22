// pages/houseService/index.js

import http from '../../utils/http.js'
import config from '../../config/api.js'
import { oneDayTime } from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serviceId:null,
    serviceName:'',
    emultiIndex: [12, 0],
    lmultiIndex: [12, 0],
    timeArray: [],
    textInputVal:'',
    etime:'12:00', 
    edate:null,
    ltime: '12:00',
    ldate: null,
    index:0,
    houseId:null,
    houseTypeData:[],
    houseTypeNameData:[],
  },
  choiceServiceType() {

    wx.navigateTo({
      url: '../houseServiceType/index?serviceId=' + this.data.serviceId + "&serviceName=" + this.data.serviceName
    })
  },
  textInput(e) {
    //console.log(e.detail.value)
    this.setData({
      textInputVal: e.detail.value
    })  
  },
  lTimeChange(e) {
    let time = e.detail.value;
    let selectTime = this.data.timeArray[0][time[0]] + ":" + this.data.timeArray[1][time[1]];
    this.setData({
      ltime: selectTime
    })
  },
  lDateChange(e) {
    console.log(e)
    this.setData({
      ldate: e.detail.value
    })
  },  
  eTimeChange(e) {
    console.log(e)
    let time = e.detail.value;
    let selectTime = this.data.timeArray[0][time[0]] + ":" + this.data.timeArray[1][time[1]];  
    this.setData({
      etime: selectTime
    })
  },
  eDateChange(e) {
    console.log(e)
    this.setData({
      edate: e.detail.value
    })   
  },
  bindPickerChange(e) {
    this.setData({
      index: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    let timeArray = oneDayTime();
    this.setData({
      timeArray: timeArray,
    })
    console.log(e)
    let etime = e.leaveTime.split(":")[0] + ":" + e.leaveTime.split(":")[1];
    let ltime = e.enterTime.split(":")[0] + ":" + e.enterTime.split(":")[1];
    this.setData({
      houseId: e.houseId,
      etime: etime,
      ltime: ltime,
    })
    
    this.initDate();
    this.initTime(etime, ltime);
  },
  initTime(etime1, ltime1) {
    let etime = etime1.split(":");
    let ltime = ltime1.split(":");
    for (var i = 0; i < 24; i++) {
      var m = i;
      m = (m < 10) ? ("0" + m) : (m + "");
      if (m == etime[0]) {
        etime[0] = i;
      }
      if (m == ltime[0]) {
        ltime[0] = i;
      }
    }

    for (var j = 0; j < 24; j++) {
      var n = j;
      n = (n < 10) ? ("0" + n) : (n + "");
      if (n == etime[1]) {
        etime[1] = j;
      }
      if (n == ltime[1]) {
        ltime[1] = j;
      }
    }

    let emultiIndex = [];
    let lmultiIndex = [];
    emultiIndex = etime;
    lmultiIndex = ltime;

    console.log(emultiIndex, lmultiIndex)
    this.setData({
      emultiIndex: emultiIndex,
      lmultiIndex: lmultiIndex,
    })
  },
  initDate() {
    let date = new Date();
    var nextDate = new Date(date.getTime() + 24 * 60 * 60 * 1000);
    
    let year = date.getFullYear() + "-";
    let nextYear = nextDate.getFullYear() + "-";
    let month = date.getMonth() + 1;
    let nextMonth = nextDate.getMonth() + 1;
    if(month < 10){
      month ="0"+ month + "-";
    } else {
      month = month + "-";
    }

    if(nextMonth < 10) {
      nextMonth = "0" + nextMonth + "-";
    } else {
      nextMonth = nextMonth + "-";
    }


    let day = date.getDate();
    let nextDay = nextDate.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    if (nextDay < 10) {
      nextDay = "0" + nextDay;
    }

    let toDayTime = year + month + day ;
    let nextDayTime = nextYear + nextMonth + nextDay;
    console.log(toDayTime, nextDayTime)
    this.setData({
      edate: toDayTime,
      ldate: nextDayTime,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // formSubmit(e) {
  //   console.log(e.detail.formId);
  //   let formId = e.detail.formId;


  //   let housekeepingId = null;
  //   let typeName = this.data.houseTypeNameData[this.data.index];

  //   this.data.houseTypeData.forEach((item) => {
  //     if (item.serviceName == typeName) {
  //       housekeepingId = item.serviceId;
  //     }
  //   })

  //   let params = {};
  //   params.houseId = this.data.houseId;
  //   params.housekeepingId = housekeepingId;
  //   params.beginDate = this.data.edate + " " + this.data.etime;
  //   params.endDate = this.data.ldate + " " + this.data.ltime;
  //   params.remark = this.data.textInputVal;
  //   params.formId = formId;

  //   console.log(params)
  //   wx.showLoading({ title: '数据提交中...' })
  //   http.postJson(config.create_house_keeping, params).then((res) => {
  //     console.log(res)
  //     wx.hideLoading()
  //     wx.navigateTo({
  //       url: '../publishSuccess/index'
  //     })
  //   }).catch((res) => {
  //     wx.hideLoading()
  //     console.log(res)
  //   })


  // },
  publish:function() {

    // let  housekeepingId = null;
    // let typeName = this.data.houseTypeNameData[this.data.index];
    
    // this.data.houseTypeData.forEach((item)=>{
    //   if (item.serviceName == typeName){
    //     housekeepingId = item.serviceId;
    //   }
    // })

    if (!this.data.serviceId || this.data.serviceId == "null"){
      this.selectComponent("#myToast").show('请选择服务项目')
      return;
    }

    let params = {};
    params.houseId = this.data.houseId;
    params.housekeepingId = this.data.serviceId;
    params.beginDate = this.data.edate + " " + this.data.etime;
    params.endDate = this.data.ldate + " " + this.data.ltime;
    params.remark = this.data.textInputVal;

    console.log(params)
    wx.showLoading({ title: '数据提交中...' })
    http.postJson(config.create_house_keeping,params).then((res)=>{
      console.log(res)
      wx.hideLoading()
      wx.navigateTo({
        url: '../publishSuccess/index'
      })
    }).catch((res)=>{
      //wx.hideLoading()
      console.log(res)
    })

  }
})