// pages/index/index.js
import {
  parseTime,
  showErrorToast,
  showSuccessToast
} from '../../utils/util.js'
import http from '../../utils/http.js'
import config from '../../config/api.js'
import validate from "../../utils/validate.js"
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    houseData: [],
    pageHeight: 200,
    pageIndex: 1,
    pageSize: 100,
    noMoreData:false,
    state: 0,
    showDate: false,
    selectedDate: ''
  },
  getHouse() {
    let that = this;
    let params = {};
    params.pageIndex = this.data.pageIndex;
    params.pageSize = this.data.pageSize;
    if (params.pageIndex == 1){
      wx.showLoading({ title: '加载中' })
    }
    http.get(config.house_list,params).then((res)=>{
      wx.hideLoading()
      wx.stopPullDownRefresh()

      let data = res.data;

      if (data.length ||  that.data.houseData.length){
        that.setData({ state: 1 })
        let houseData = that.data.houseData;
        for(var i = 0; i <data.length; i++){
          houseData.push(data[i]);
        }
        that.setData({ houseData: houseData })
        if(data.length < 100){
          that.setData({ noMoreData: true })
        } else {
          let pageIndex = that.data.pageIndex+1;
         
          that.setData({ pageIndex: pageIndex });
        }

      } else {
        
        that.setData({state:2})
        
      }
    }).catch((res) => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      if (res.code == 401 || res.code == 402 || res.code == 403) {
        that.setData({
          state: 3
        });
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('onLoad 1');
    // this.selectComponent("#dateView").setDate(2020, 3, 5, 8, 6);
    let login = app.isLogin();
    if (!login) {
      this.setData({
        state: 3
      });
    } else {
      this.getHouse();
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    console.log('onReady 3')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log('onShow 2')

    let login = app.isLogin();
    if (!login) {
      this.setData({
        state: 3
      });
    } else {
      if (app.globalData.refreshHome) {
        app.globalData.refreshHome = false;
        this.onPullDownRefresh();
      }
    }
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
   
    let houseData = [];
    let pageIndex = 1;
    let noMoreData = false;
    this.setData({
      houseData: houseData,
      pageIndex: pageIndex,
      noMoreData: noMoreData
    })
    this.getHouse();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
   
    if(!this.data.noMoreData){
      this.getHouse();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  gotoAddHouse: function() {

    wx.navigateTo({
      url: '../addHouseFirst/index?status=add'
    })
  },
  loginSuccess() {
    this.onPullDownRefresh();
  },
  showDateView() {
    this.setData({
      showDate: true
    });
  },
  dateConfirm(res) {
    console.log(res.detail);
    this.setData({
      showDate: false,
      selectedDate: res.detail
    });
  },
  gotoDetail: function(e) {
    app.globalData.houseItemData = e.currentTarget.dataset.houseitem;
    wx.navigateTo({
      url: '../houseDetail/index'
    })
  }
})