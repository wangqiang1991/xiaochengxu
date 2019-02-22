// pages/editInformation/index.js
import config from '../../config/api.js'
import http from '../../utils/http.js'
import {
  showErrorToast
} from '../../utils/util.js'
import {
  showSuccessToast
} from '../../utils/util.js'

//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    key: '',
    inputValue: '',
    type: 'text',
    tipsValue: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      inputValue: options.placeholderValue,
      key: options.key,
    });
    this.setTips(this.data.key);
    if (this.data.key == 'phone') {
      this.setData({
        type: 'number',
      });
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

  },

  save: function () {
    var that = this;
    if (this.data.inputValue != null && this.data.inputValue != '') {
      var p = new Object();
      p[this.data.key] = this.data.inputValue;
      http.postJson(config.save_information, p).then((res) => {
        var object = app.getStorageByKey('userInfo');
        var keyValue = this.data.key;
        that.saveStorage(object, keyValue, this.data.inputValue);
        app.setStorageByKey('userInfo', object);
        wx.navigateBack({
          url: '../personInformation/index'
        })
        showSuccessToast("保存成功");
      }).catch((res) => {
        showErrorToast('用户信息保存失败');
      })
    } else {
      var p2 = new Object();
      p[this.data.key] = this.data.placeholderValue;
      http.postJson(config.save_information, p2).then((res) => {
        var object = app.getStorageByKey('userInfo');
        var keyValue = this.data.key;
        that.saveStorage(object, keyValue, this.data.placeholderValue);
        app.setStorageByKey('userInfo', object);
        wx.navigateBack({
          url: '../personInformation/index'
        })
        showSuccessToast("保存成功");
      }).catch((res) => {
        showErrorToast('用户信息保存失败');
      })
    };
  },

  getInput: function (e) {
    this.setData({
      inputValue: e.detail.value,
    })
  },

  saveStorage(object, key, value) {
    if (key == 'managerName') {
      object.managerName = value;
      this.setData({
        tipsValue: '请输入真实姓名'
      })
    } else if (key == 'nickName') {
      object.nickName = value;
      this.setData({
        tipsValue: '请输入昵称'
      })
    } else if (key == 'phone') {
      object.phone = value;
      this.setData({
        tipsValue: '请输入电话号码'
      })
    } else if (key == 'personalDesc') {
      object.personalDesc = value;
      this.setData({
        tipsValue: '请输入个性签名'
      })
    }
  },

  setTips(key) {
    if (key == 'managerName') {
      this.setData({
        tipsValue: '请输入真实姓名'
      })
    } else if (key == 'nickName') {
      this.setData({
        tipsValue: '请输入昵称'
      })
    } else if (key == 'phone') {
      this.setData({
        tipsValue: '请输入电话号码'
      })
    } else if (key == 'personalDesc') {
      this.setData({
        tipsValue: '请输入个性签名'
      })
    }
  },

  cleanClick: function () {
    this.setData({
      'inputValue': ''
    })
    console.log('click')
  }

})