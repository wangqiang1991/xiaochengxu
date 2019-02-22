// pages/personInformation/index.js
const qiniuUploader = require("../../static/js/qiniuUploader");
import config from '../../config/api.js'
import http from '../../utils/http.js'
import {
  parseTime,
  showErrorToast,
  showSuccessToast
} from '../../utils/util.js'
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['男', '女'],
    headImg: '',
    nickName: '',
    gender: '',
    genderValue: 0,
    realName: '',
    phone: '',
    personalDesc: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getUploadToken();
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
    var object = app.getStorageByKey('userInfo');
    this.setObject(object);
    this.setData({
      genderValue: object.gender,
      phone: object.phone,
      nickName: object.nickName,
      personalDesc: object.personalDesc,
      headImg: object.headImg,
      realName: object.managerName
    })
    if (this.data.genderValue == 1) {
      this.setData({
        gender: '男'
      })
    } else {
      this.setData({
        gender: '女'
      })
    }
    app.loginWxAndGetSessionKey();
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

  nickNameEdit: function() {
    var value = this.data.nickName;
    wx.navigateTo({
      url: '../editInformation/index?placeholderValue=' + value + '&key=nickName',
    })
  },
  realNameEdit: function() {
    var value = this.data.realName;
    wx.navigateTo({
      url: '../editInformation/index?placeholderValue=' + value + '&key=managerName',
    })
  },
  phoneEdit: function() {
    var value = this.data.phone;
    wx.navigateTo({
      url: '../editInformation/index?placeholderValue=' + value + '&key=phone',
    })
  },
  personalDescEdit: function() {
    var value = this.data.personalDesc;
    wx.navigateTo({
      url: '../editInformation/index?placeholderValue=' + value + '&key=personalDesc',
    })
  },

  bindPickerChange: function(e) {
    var choose = e.detail.value;
    if (choose == 0) {
      this.setData({
        gender: '男'
      })
      http.post(config.save_information, {
        gender: 1
      }).then((res) => {
        var object = app.getStorageByKey('userInfo');
        object.gender = '1';
        app.setStorageByKey('userInfo', object);
        console.log('用户性别信息保存成功');
      }).catch((res) => {
        console.log('用户性别信息保存失败');
      })
    } else {
      this.setData({
        gender: '女'
      })
      http.post(config.save_information, {
        gender: 2
      }).then((res) => {
        var object = app.getStorageByKey('userInfo');
        object.gender = '2';
        app.setStorageByKey('userInfo', object);
        console.log('用户性别信息保存成功');
      }).catch((res) => {
        console.log('用户性别信息保存失败');
      })
    }
  },
  
  getUploadToken() {
    http.get(config.upload_token, {}).then((res) => {
      this.setData(res.data);
      this.initQiuniu();
    }).catch((res) => {
      wx.hideLoading()
      if (res.message) {
        showErrorToast(res.message)
      }
    });
  },

  initQiuniu() {
    var options = {
      domain: this.data.domain,
      uptoken: this.data.token,
      region: 'SCN',
      shouldUseQiniuFileName: true
    }
    qiniuUploader.init(options);
  },

  uploadImage(image) {
    qiniuUploader.upload(image, (res) => {
      http.post(config.save_information,{'headImg':this.data.headImg}).then((res) => {
        var object = app.getStorageByKey('userInfo');
        object.headImg = this.data.headImg;
        app.setStorageByKey('userInfo', object);
        showSuccessToast("保存成功");
      }).catch((res) => {
        showErrorToast('用户信息保存失败');
      })
      this.setData({
        headImg: res.imageURL
      })
    }, (error) => {
      // 上传错误
      console.log('error: ' + error);
      showErrorToast("上传失败");
    }, null, (progress) => {
      // 进度
      console.log('上传进度', progress.progress)
      console.log('已经上传的数据长度', progress.totalBytesSent)
      console.log('预期需要上传的数据总长度', progress.totalBytesExpectedToSend)
    }, null);
  },

  getImage: function (){
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        tempFilePaths.forEach((item) => {
          that.uploadImage(item);
        });
      },
      fail: function (err) { }
    })
  },

  fail: function(res) {
    console.log(res.errMsg)
  },

  getPhoneNumber(e) {
    let sessionKey = app.getStorageByKey("session_key");
    this.loginPhone(sessionKey, e.detail.iv, e.detail.encryptedData);
  },

  loginPhone(sessionKey, iv, encryptedData) {
    http.get(config.getPhone, {
      'encryptedData': encryptedData,
      'iv': iv,
      'sessionKey': sessionKey
    }).then((res) => {
      this.savePhone(res.data);
      this.triggerEvent("loginSuccess");
    }).catch((res) => {
      showErrorToast('用户信息保存失败');
    })
  },

  savePhone(value){
    http.post(config.save_information, { 'phone':value}).then((res) => {
      var object = app.getStorageByKey('userInfo');
      object.phone = value;
      app.setStorageByKey('userInfo', object);
      showSuccessToast("保存成功");
    }).catch((res) => {
      showErrorToast('用户信息保存失败');
    })
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
    } else if (typeof (object.reallyName) == null || typeof (object.reallyName) == "undefined") {
      object.reallyName = '';
    }
  }

})