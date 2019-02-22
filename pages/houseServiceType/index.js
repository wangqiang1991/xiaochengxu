// pages/houseServiceType/index.js
import http from '../../utils/http.js'
import config from '../../config/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serviceId:null,
    serviceName:"",
    houseTypeData:[]
  },
  choiceSevice(e) {
    
    let service = e.currentTarget.dataset.servicename;
    let serviceName = service.serviceName;
    let serviceId = service.serviceId;
    this.setData({
      serviceName: serviceName,
      serviceId: serviceId
    })

    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];  //当前页面
    var prevPage = pages[pages.length - 2]; //上一个页面

    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      serviceName: serviceName,
      serviceId: serviceId
    })

    setTimeout(()=>{
      wx.navigateBack();
    },200)
    
  },
  getHouseType() {
    http.get(config.house_keeping, {}).then((res) => {
      console.log(res)
      let data = res.data;
      data.forEach((item)=>{
        if(item.items.length == 0){
          item.desc = "无";
        } else {
          let desc = ""
          for(var i = 0; i < item.items.length; i++){
            if(i == 0){
              desc += item.items[i].name;
            } else {
              desc += "，" + item.items[i].name;
            }
          }
          item.desc = desc;
        }
      })
      //console.log(data)
      this.setData({
        houseTypeData: data
      })
    }).catch((res) => {
      console.log(res)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      serviceId:options.serviceId,
      serviceName:options.serviceName
    })
    this.getHouseType();
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

  }
})