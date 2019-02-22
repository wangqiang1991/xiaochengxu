// pages/houseType/index.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:0,
  },
  choiceType(e) {
    let type = e.currentTarget.dataset

    this.setData({
      type:type.type
    })

    let addHouseData = app.globalData.addHouseData;
    addHouseData.type = +type.type;
    addHouseData.typeName = type.typename;
    app.globalData.addHouseData = addHouseData;
    setTimeout(()=>{
      wx.navigateBack({
        delta: 1
      })
    },200)
  } ,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let addHouseData = app.globalData.addHouseData;
    if (addHouseData.type){
      this.setData({
        type: addHouseData.type
      })
    }
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