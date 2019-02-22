// pages/my/index.js

//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    width:0,
    height:0,
    state:1,
    headImg:'',
    gender:'',
    nickName:'',
    personalDesc:'',
    phone:'',
    genderValue:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({height:res.windowHeight,width:res.windowWidth})
      },
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onLoad 1');
    let login = app.isLogin();
    if (!login) {
      this.setData({
        state: 3
      });
    } else {
      this.loginSuccess();
    }
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

  toCustomService:function(){
    wx.navigateTo({
      url: '../customService/index'
    })
  },

  toPerson:function(){
    wx.navigateTo({
      url: '../personInformation/index'
    })
  },

  toAgreement:function(){
    wx.navigateTo({
      url: '../agreement/index'
    })
  },

  loginSuccess() {
    var object = app.getStorageByKey('userInfo');
    this.setObject(object);
    this.setData({
      state: 1,
      genderValue: object.gender,
      phone: object.phone,
      nickName:object.nickName,
      personalDesc:object.personalDesc,
      headImg:object.headImg
    })
    if(this.data.genderValue == 1){
      this.setData({
        gender:'/static/images/gender_man.png'
      })
    }else{
      this.setData({
        gender: '/static/images/girl.png'
      })
    }
  },
  signOut:function(){
    app.removeStorageByKey('userInfo');
    app.removeStorageByKey('session_key');
    app.removeStorageByKey('access_token');
    this.setData({
      state:3,
    });
    app.loginWxAndGetSessionKey();
  },

  setObject(object) {
    if (typeof (object.gender) == null || typeof (object.gender) == "undefined") {
      object.gender = 1;
    } else if (typeof (object.phone) == null || typeof (object.phone) == "undefined") {
      object.phone = '';
    } else if (typeof (object.nickName) == null || typeof (object.nickName) == "undefined") {
      object.nickName = '';
    } else if (typeof (object.personalDesc) == null || typeof (object.personalDesc) == "undefined") {
      object.personalDesc = '';
    } else if (typeof (object.headImg) == null || typeof (object.headImg) == "undefined") {
      object.headImg = '';
    } else if (typeof (object.managerName) == null || typeof (object.managerName) == "undefined") {
      object.managerName = '';
    }
  }

})