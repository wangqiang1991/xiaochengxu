// pages/addHouseFirst/index.js

const app = getApp()
import validate from "../../utils/validate.js"
import { oneDayTime } from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    emultiIndex:[14,0],
    emultiArray:[],
    lmultiIndex: [12, 0],
    lmultiArray: [],
    status: null, //true 新增  FALSE 编辑
    addHouseData:{
      houseId: null,  //id

      houseName: '',// 房屋名称  
      acreage: "",        //房屋面积  

      villageName: "",    // 小区名称  
      detailAddress:"",

      type: null,             // 房屋类型  
      typeName: "",        // 房屋名称
      bedRoomNumber: 0,  //户型-卧室数量 
      livingRoomNumber: 0,  //户型-客厅数量 
      washRoomNumber: 0, // 户型-卫生间数量  
      kitchenNumber: 0,  //户型-厨房数量 
      schoolRoomNumber: 0, //户型-书房数量 
      balconyNumber: 0,   //户型-阳台数量 
      carport: 0, // 车库数量
      storageRoom: 0, //储藏室数量
      rumpusRoom: 0, //娱乐室数量
      fitnessRoom: 0, // 健身房数量
      loungeRoom: 0,//休闲室数量
      garden: 0, //花园数量

      enterTime: "14:00",      //入住时间  
      leaveTime: "12:00",      //退房时间  

      provinceName: "四川省", //省名  
      provinceCode: "510000",//省code 
      cityName: "成都市",//  [string]  是 市名  
      cityCode: '510100', // 市code 
      countyName: "锦江区",  //区县名 
      countyCode: "510104",  //区县code  
      houseAddress: "",  // 房屋详细地址  

      longitude: "", //房屋经度  
      latitude: "",   // 房屋纬度
    }
  },
  setTime(time,type){
    let addHouseData = this.data.addHouseData;
    let selectTime = this.data.emultiArray[0][time[0]] + ":" + this.data.emultiArray[1][time[1]];
    
    if(type == 0){
      addHouseData.enterTime = selectTime;
    } else {
      addHouseData.leaveTime = selectTime;
    }

    this.setData({
      addHouseData: addHouseData
    })

  },
  eTimeChange(e) {
    let enterTime = e.detail.value;
    console.log(enterTime);
    this.setTime(enterTime, 0);
    // let addHouseData = this.data.addHouseData;
    // addHouseData.enterTime = enterTime;
    // this.setData({
    //   addHouseData: addHouseData
    // })
  },
  lTimeChange(e) {
    let leaveTime = e.detail.value;
    console.log(leaveTime);
    this.setTime(leaveTime, 1);

    // let addHouseData = this.data.addHouseData;
    // addHouseData.leaveTime = leaveTime;
    // this.setData({
    //   addHouseData: addHouseData
    // })
  },
  houseAcreageInput(e) {
    let acreage = e.detail.value;
    let addHouseData = this.data.addHouseData;
    addHouseData.acreage = acreage;
    this.setData({
      addHouseData: addHouseData
    })
  },
  houseNameInput(e) {
    let houseName =  e.detail.value;
    let addHouseData = this.data.addHouseData;
    addHouseData.houseName = houseName;
    this.setData({
      addHouseData: addHouseData
    })
  },
  houseLocalInput(e) {
    let detailAddress = e.detail.value;
    let addHouseData = this.data.addHouseData;
    addHouseData.detailAddress = detailAddress;
    this.setData({
      addHouseData: addHouseData
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    let timeArray = oneDayTime();
    this.setData({
      emultiArray: timeArray,
      lmultiArray: timeArray
    })
    console.log(e)
    if(e.status == "add") {
      this.setData({
        status: true
      })

      app.globalData.addHouseData = this.data.addHouseData;

    } else {
      this.setData({
        status: false
      })
      console.log(app.globalData.houseItemData)

      let houseData = app.globalData.houseItemData
      app.globalData.addHouseData = houseData;
      this.initTime(houseData);
      this.setData({
        addHouseData: houseData
      })

    }
  },
  initTime(houseData) {
    let etime = houseData.enterTime.split(":");
    let ltime = houseData.leaveTime.split(":");
    for(var i = 0; i < 24; i++){
      var m = i;
      m = (m < 10) ? ("0" + m) : (m + "");
      if(m == etime[0]){
        etime[0] = i;
      }
      if(m == ltime[0]){
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

    let emultiIndex =  [];
    let lmultiIndex = [];
    emultiIndex = etime ;
    lmultiIndex = ltime;
    
    console.log(emultiIndex, lmultiIndex)
    this.setData({
      emultiIndex: emultiIndex,
      lmultiIndex: lmultiIndex,
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
    let data = app.globalData.addHouseData; 
    console.log(data)
    this.setData({
      addHouseData:data
    })
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
  setCacheAppData:function() {
    app.globalData.addHouseData = this.data.addHouseData;
  },
  gotoNext:function() {
    if (this.data.addHouseData.type == null){
      this.selectComponent("#myToast").show('请选择房屋类型')
      return ;
    }

    if (!this.data.addHouseData.houseName || !this.data.addHouseData.houseName.trim()) {
      this.selectComponent("#myToast").show('请输入房屋名称')
      return;
    }

    if (this.data.addHouseData.houseName.length < 5) {
      this.selectComponent("#myToast").show('房屋名称为5-20个字符')
      return;
    }


    if (!this.data.addHouseData.acreage ) {
      this.selectComponent("#myToast").show('请输入房屋面积')
      return;
    }

    if (!validate.validatPrice(this.data.addHouseData.acreage)) {
      this.selectComponent("#myToast").show('房屋面积为整数或2位小数')
      return ;
    }

    if (!this.data.addHouseData.bedRoomNumber) {
      this.selectComponent("#myToast").show('请输入户型')
      return;
    }

    if (!this.data.addHouseData.detailAddress) {
      this.selectComponent("#myToast").show('请输入楼层')
      return;
    } 

    if (!this.data.addHouseData.enterTime) {
      this.selectComponent("#myToast").show('请选择入住时间规则')
      return;
    }

    if (!this.data.addHouseData.leaveTime) {
      this.selectComponent("#myToast").show('请选择离店时间规则')
      return;
    }


    this.setCacheAppData()
    wx.navigateTo({
      url: '../addHouseSecond/index'
    })
  },
  choiceHouseType:function() {
    this.setCacheAppData();
    wx.navigateTo({
      url: '../houseType/index'
    })
  },
  choiceHouseSize:function() {
    this.setCacheAppData();
    wx.navigateTo({
      url: '../houseSize/index'
    })
  },  
  choiceHouseLocal:function() {
    this.setCacheAppData();
    wx.navigateTo({
      url: '../houseLocal/index'
    })
  }

})