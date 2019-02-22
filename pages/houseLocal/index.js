// pages/houseLocal/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    houseOrder: 0,    // 房屋栋数  
    unit: 0,          //房屋单元  
    floor: 0,         // 房屋楼层  
    number: 0,         //  房号
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let addHouseData = app.globalData.addHouseData;
    console.log(addHouseData)
    if (addHouseData.houseOrder) {
      this.setData({
        houseOrder: addHouseData.houseOrder,
        unit: addHouseData.unit,
        floor: addHouseData.floor,
        number: addHouseData.number,
      })
    }
  },
  subHouseSize() {
    console.log(this.data)
    if (!this.data.houseOrder) {
      this.selectComponent("#myToast").show('房屋所在栋数不能为0')
      return;
    }
    if (!this.data.unit) {

      this.selectComponent("#myToast").show('房屋所在单元不能为0')
      return;
    }
    if (this.data.floor == 0) {

      this.selectComponent("#myToast").show('房屋楼层不能为0')
      return;
    }
    if (!this.data.number) {

      this.selectComponent("#myToast").show('房号不能为0')
      return;
    }

    let addHouseData = app.globalData.addHouseData;
    addHouseData.houseOrder = this.data.houseOrder;
    addHouseData.unit = this.data.unit;
    addHouseData.floor = this.data.floor;
    addHouseData.number = this.data.number;
    app.globalData.addHouseData = addHouseData;
    wx.navigateBack({
      delta: 1
    })
  },

  subhou() {
    if (this.data.houseOrder > 0) {
      let num = this.data.houseOrder - 1;
      this.setData({
        houseOrder: num
      })
    }
  },
  addhou() {
    if (this.data.houseOrder < 99) {
      let num = this.data.houseOrder + 1;
      this.setData({
        houseOrder: num
      })
    }
  },
  subuni() {
    if (this.data.unit > 0) {
      let num = this.data.unit - 1;
      this.setData({
        unit: num
      })
    }
  },
  adduni() {
    if (this.data.unit < 99) {
      let num = this.data.unit + 1;
      this.setData({
        unit: num
      })
    }
  },
  subflo() {
    if (this.data.floor > -10) {
      let num = this.data.floor - 1;
      this.setData({
        floor: num
      })
    }
  },
  addflo() {
    if (this.data.floor < 99) {
      let num = this.data.floor + 1;
      this.setData({
        floor: num
      })
    }
  },
  subnum() {
    if (this.data.number > 0) {
      let num = this.data.number - 1;
      this.setData({
        number: num
      })
    }
  },
  addnum() {
    if (this.data.number < 99) {
      let num = this.data.number + 1;
      this.setData({
        number: num
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