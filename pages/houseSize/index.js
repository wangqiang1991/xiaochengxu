// pages/houseSize/index.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
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

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let addHouseData = app.globalData.addHouseData;
    console.log(addHouseData)
    if (addHouseData.bedRoomNumber) {
      this.setData({
        bedRoomNumber: addHouseData.bedRoomNumber,
        livingRoomNumber: addHouseData.livingRoomNumber,
        washRoomNumber: addHouseData.washRoomNumber,
        kitchenNumber: addHouseData.kitchenNumber,
        schoolRoomNumber: addHouseData.schoolRoomNumber,
        balconyNumber: addHouseData.balconyNumber,
        carport: addHouseData.carport,
        storageRoom: addHouseData.storageRoom,
        rumpusRoom: addHouseData.rumpusRoom,
        fitnessRoom: addHouseData.fitnessRoom,
        loungeRoom: addHouseData.loungeRoom,
        garden: addHouseData.garden,
      })
    }
  },
  subHouseSize() {
    console.log(this.data)
    if (!this.data.bedRoomNumber){
      this.selectComponent("#myToast").show('卧室数量不能为0')
      return ;
    }
    // if (!this.data.livingRoomNumber) {
      
    //   this.selectComponent("#myToast").show('客厅数量不能为0')
    //   return;
    // }
    // if (!this.data.washRoomNumber) {
      
    //   this.selectComponent("#myToast").show('卫生间数量不能为0')
    //   return;
    // }
    // if (!this.data.kitchenNumber) {
      
    //   this.selectComponent("#myToast").show('厨房数量不能为0')
    //   return;
    // }
    // if (!this.data.schoolRoomNumber) {
      
    //   this.selectComponent("#myToast").show('书房数量不能为0')
    //   return;
    // }
    // if (!this.data.balconyNumber) {
      
    //   this.selectComponent("#myToast").show('阳台数量不能为0')
    //   return;
    // }

    let addHouseData = app.globalData.addHouseData;
    addHouseData.bedRoomNumber = this.data.bedRoomNumber;
    addHouseData.livingRoomNumber = this.data.livingRoomNumber;
    addHouseData.washRoomNumber = this.data.washRoomNumber;
    addHouseData.kitchenNumber = this.data.kitchenNumber;
    addHouseData.schoolRoomNumber = this.data.schoolRoomNumber;
    addHouseData.balconyNumber = this.data.balconyNumber;
    addHouseData.carport = this.data.carport;
    addHouseData.storageRoom = this.data.storageRoom;
    addHouseData.rumpusRoom = this.data.rumpusRoom;
    addHouseData.fitnessRoom = this.data.fitnessRoom;
    addHouseData.loungeRoom = this.data.loungeRoom;
    addHouseData.garden = this.data.garden;

    app.globalData.addHouseData = addHouseData;
    wx.navigateBack({
      delta: 1
    })
  },
  subbal() {
    if (this.data.balconyNumber > 0) {
      let num = this.data.balconyNumber - 1;
      this.setData({
        balconyNumber: num
      })
    }
  },
  addbal() {
    if (this.data.balconyNumber < 99) {
      let num = this.data.balconyNumber + 1;
      this.setData({
        balconyNumber: num
      })
    }
  },
  subsch() {
    if (this.data.schoolRoomNumber > 0) {
      let num = this.data.schoolRoomNumber - 1;
      this.setData({
        schoolRoomNumber: num
      })
    }
  },
  addsch() {
    if (this.data.schoolRoomNumber < 99) {
      let num = this.data.schoolRoomNumber + 1;
      this.setData({
        schoolRoomNumber: num
      })
    }
  },
  subkit() {
    if (this.data.kitchenNumber > 0) {
      let num = this.data.kitchenNumber - 1;
      this.setData({
        kitchenNumber: num
      })
    }
  },
  addkit() {
    if (this.data.kitchenNumber < 99) {
      let num = this.data.kitchenNumber + 1;
      this.setData({
        kitchenNumber: num
      })
    }
  },
  subwas() {
    if (this.data.washRoomNumber > 0) {
      let num = this.data.washRoomNumber - 1;
      this.setData({
        washRoomNumber: num
      })
    }
  },
  addwas() {
    if (this.data.washRoomNumber < 99) {
      let num = this.data.washRoomNumber + 1;
      this.setData({
        washRoomNumber: num
      })
    }
  },
  subliv() {
    if (this.data.livingRoomNumber > 0) {
      let num = this.data.livingRoomNumber - 1;
      this.setData({
        livingRoomNumber: num
      })
    }
  },
  addliv() {
    if (this.data.livingRoomNumber < 99) {
      let num = this.data.livingRoomNumber + 1;
      this.setData({
        livingRoomNumber: num
      })
    }
  },
  subbed() {
    if (this.data.bedRoomNumber > 0){
      let num = this.data.bedRoomNumber - 1;
      this.setData({
        bedRoomNumber:num
      })
    }
  },
  addbed() {
    if (this.data.bedRoomNumber < 99) {
      let num = this.data.bedRoomNumber + 1;
      this.setData({
        bedRoomNumber: num
      })
    }
  },
  subgar() {
    if (this.data.garden > 0) {
      let num = this.data.garden - 1;
      this.setData({
        garden: num
      })
    }
  },
  addgar() {
    if (this.data.garden < 99) {
      let num = this.data.garden + 1;
      this.setData({
        garden: num
      })
    }
  },
  sublou() {
    if (this.data.loungeRoom > 0) {
      let num = this.data.loungeRoom - 1;
      this.setData({
        loungeRoom: num
      })
    }
  },
  addlou() {
    if (this.data.loungeRoom < 99) {
      let num = this.data.loungeRoom + 1;
      this.setData({
        loungeRoom: num
      })
    }
  },
  subfit() {
    if (this.data.fitnessRoom > 0) {
      let num = this.data.fitnessRoom - 1;
      this.setData({
        fitnessRoom: num
      })
    }
  },
  addfit() {
    if (this.data.fitnessRoom < 99) {
      let num = this.data.fitnessRoom + 1;
      this.setData({
        fitnessRoom: num
      })
    }
  },
  subrum() {
    if (this.data.rumpusRoom > 0) {
      let num = this.data.rumpusRoom - 1;
      this.setData({
        rumpusRoom: num
      })
    }
  },
  addrum() {
    if (this.data.rumpusRoom < 99) {
      let num = this.data.rumpusRoom + 1;
      this.setData({
        rumpusRoom: num
      })
    }
  },
  substo() {
    if (this.data.storageRoom > 0) {
      let num = this.data.storageRoom - 1;
      this.setData({
        storageRoom: num
      })
    }
  },
  addsto() {
    if (this.data.storageRoom < 99) {
      let num = this.data.storageRoom + 1;
      this.setData({
        storageRoom: num
      })
    }
  },
  subcar() {
    if (this.data.carport > 0) {
      let num = this.data.carport - 1;
      this.setData({
        carport: num
      })
    }
  },
  addcar() {
    if (this.data.carport < 99) {
      let num = this.data.carport + 1;
      this.setData({
        carport: num
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