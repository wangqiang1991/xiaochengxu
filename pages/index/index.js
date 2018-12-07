// pages/index/index.js
import { parseTime, showErrorToast, showSuccessToast } from '../../utils/util.js'
import http from '../../utils/http.js'
import config from '../../config/api.js'
import validate from "../../utils/validate.js"
import QQMapWX from "../../assets/js/qqmap-wx-jssdk.js"
var qqmapsdk;
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'13212345658',
    numberCout:1,
    localMeaages:'',
    obj:{
      name:'wang',
      age:18,
      array:['12','34']
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    qqmapsdk = new QQMapWX({
      key: 'CUEBZ-RWD3D-7WV4J-PNQJV-GHNAK-W6F4O'
    });



    wx.showLoading({
      title: '加载中',
    })
    setTimeout(()=>{
      wx.hideLoading();
    },500)
    console.log('onLoad++++++++++++++++++++++')
    console.log(this.data.phone)
    console.log(validate.validatPhone(this.data.phone))
    //this.loadData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onready++++++++++++++++++++++')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onShow+++++++++++++++++++')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onHide+++++++++++++++++++')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onUnload++++++++++++++++')
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
  loadData() {
    http.get(config.index).then((res)=>{
      console.log(res)
    }).catch((res)=>{
      console.log(res)
    })
  },
  gotoLogin(e) {
    console.log(e)
    let title = e.currentTarget.dataset.title;
    let key = e.currentTarget.dataset.key;
    console.log(title,key)
    wx.navigateTo({
      url: '/pages/login/login?data=' +title + '|' + key ,
    })
  },
  myevent(e) {
    console.log(e.detail)
  },
  changeData() {
    let newobj = {
      name:'wang1',
      age:88,
      array: ['121', '343']
    }
    this.setData({
      obj: newobj
    })
  },
  getUser(e) {
    console.log(e)
    if (e.detail.userInfo) {
      wx.login({
        success:(res)=>{
          console.log(res.code, e.detail.iv, e.detail.encryptedData)
        }
      })
    } else {
      wx.showToast({
        title: "为了您更好的体验,请先同意授权",
        icon: 'none',
        duration: 2000
      });
    }
  },
  getUserLocal(e) {
    let that = this;
    let type = e.currentTarget.dataset.type;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']){
          console.log('初始化授权失败')
          wx.openSetting({
            success(res) {
              console.log(res.authSetting)
              if (res.authSetting["scope.userLocation"]) {
                console.log('地理位置授权成功')
                if(type == 1){
                  that.localMeg();
                } else {
                  that.openMap();
                }
                
              } else {
                console.log('地理位置授权失败')
              }
            }
          })
        } else {
          if (type == 1) {
            that.localMeg();
          } else {
            that.openMap();
          }
        }
      }
    })
  },
  openMap() {
    wx.chooseLocation({
      success(res) {
        console.log(res)
      }
    })
  },
  localMeg() {
    let that = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log(res)
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        that.getLocal(latitude, longitude)
      }
    })
  },
  getLocal(latitude, longitude) {
    let that = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        console.log(res)
      
        that.setData({
          localMeaages: res.result.address
        })
      },
      fail: function (res) {
        console.log(res);
      }
    });

  }


})