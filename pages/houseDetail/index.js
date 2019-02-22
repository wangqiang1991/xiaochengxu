// pages/houseDetail/index.js
import {
  parseTime,
  showErrorToast,
  showSuccessToast
} from '../../utils/util.js'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    enableScroll: false,
    enableZoom: false,
    houseData: {},
    houseType: [{
      type: 1,
      name: "普通公寓"
    }, {
      type: 2,
      name: "酒店式公寓"
    }, {
      type: 3,
      name: "客栈"
    }, {
      type: 4,
      name: "独栋别墅"
    }, {
      type: 5,
      name: "别墅单间"
    }, {
      type: 6,
      name: "联排别墅"
    }, {
      type: 7,
      name: "叠拼别墅"
    }, {
      type: 8,
      name: "农家乐"
    }, {
      type: 9,
      name: "老洋房"
    }, {
      type: 10,
      name: "四合院"
    }, {
      type: 11,
      name: "渔家乐"
    }, {
      type: 12,
      name: "木屋"
    }, {
      type: 13,
      name: "韩屋"
    }, {
      type: 14,
      name: "房车营地"
    }, {
      type: 15,
      name: "蒙古包"
    }, {
      type: 16,
      name: "吊脚楼"
    }, {
      type: 17,
      name: "帐篷营地"
    }, {
      type: 18,
      name: "土楼"
    }, {
      type: 19,
      name: "集装箱"
    }, {
      type: 20,
      name: "石屋"
    }, {
      type: 21,
      name: "树屋"
    }, {
      type: 22,
      name: "游艇"
    }, {
      type: 23,
      name: "窑洞"
    }, {
      type: 24,
      name: "竹屋"
    }, {
      type: 25,
      name: "碉楼"
    }, {
      type: 26,
      name: "Loft复式"
    }, {
      type: 27,
      name: "船屋"
    }, {
      type: 28,
      name: "民营房"
    }, {
      type: 29,
      name: "娱乐室"
    }, {
      type: 30,
      name: "健身房"
    }],
    markers: [{
      iconPath: '/static/images/local.png',
      id: 0,
      latitude: 30.61925,
      longitude: 104.11545,
      width: 30,
      height: 30
    }],
    longitude: 104.11545,
    latitude: 30.61925,
    leaveTime: '',
    enterTime: '',
  },
  navigation: function() {
    console.log(123)
    let latitude = this.data.latitude;
    let longitude = this.data.longitude;
    let name = this.data.houseData.villageName;
    let address = this.data.houseData.houseAddress;
    wx.openLocation({ //所以这里会显示你当前的位置
      latitude: latitude,
      longitude: longitude,
      name: name,
      address: address,
      scale: 16
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let houseItemData = app.globalData.houseItemData;
    this.data.houseType.forEach((item) => {
      if (item.type == houseItemData.type) {
        houseItemData.typeName = item.name;
      }
    })

    let markers = this.data.markers;
    markers[0].latitude = +houseItemData.latitude;
    markers[0].longitude = +houseItemData.longitude;

    this.setData({
      houseData: houseItemData,
      latitude: +houseItemData.latitude,
      longitude: +houseItemData.longitude,
      markers: markers,
      enterTime: houseItemData.enterTime,
      leaveTime: houseItemData.leaveTime
    })
    console.log(this.data)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  editHouse: function() {
    wx.navigateTo({
      url: '../addHouseFirst/index?status=edit'
    })
  },
  gotoHouseService: function() {
    let houseId = this.data.houseData.houseId;
    let enterTime = this.data.houseData.enterTime;
    let leaveTime = this.data.houseData.leaveTime;
    wx.navigateTo({
      url: '../houseService/index?houseId=' + houseId + "&enterTime=" + enterTime + "&leaveTime=" + leaveTime
    })
  }

})