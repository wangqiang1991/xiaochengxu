// pages/serviceDetail/index.js
import {
  parseTime,
  showErrorToast,
  showSuccessToast
} from '../../utils/util.js'
import http from '../../utils/http.js'
import config from '../../config/api.js'
import validate from "../../utils/validate.js"

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadDetail(options.orderId);
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
    var orderId = app.getStorageByKey("comment");
    if (orderId && orderId == this.data.detail.orderId) {
      // 更新评论状态
      this.setData({
        detail: null
      });
      this.loadDetail(orderId);
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
  loadDetail(orderId) {
    wx.showLoading({
      title: '加载中',
    });

    http.get(config.order_detail.replace(":orderId", orderId), {}).then((res) => {
      wx.hideLoading();
      var detail = res.data;
      if (detail.startImages) {
        detail.startImagesArray = detail.startImages.split(",");
      } else {
        detail.startImagesArray = [];
      }

      if (detail.completeImages) {
        detail.completeImagesArray = detail.completeImages.split(",");
      } else {
        detail.completeImagesArray = [];
      }

      detail.createdDate = parseTime(detail.createdAt, '{y}-{m}-{d} {h}:{i}');
      detail.beginDateStr = parseTime(detail.beginDate, '{y}-{m}-{d} {h}:{i}');
      detail.endDateStr = parseTime(detail.endDate, '{y}-{m}-{d} {h}:{i}');
      if (detail.orderStatus == 3) {
        detail.completeDateStr = parseTime(detail.completeDate, '{y}-{m}-{d} {h}:{i}');
        if (detail.commentVo && detail.commentVo.images) {
          detail.commentVo.imageArr = detail.commentVo.images.split(",");
        }
      }

      if (detail.housekeepingVo.items.length == 0){
        detail.housekeepingVo.desc = "无";
      }  else {
        let desc = "";
        for (var i = 0; i < detail.housekeepingVo.items.length; i++){
          if(i == 0){
            desc += detail.housekeepingVo.items[i].name;
          } else {
            desc += "，" + detail.housekeepingVo.items[i].name;
          }
        }
        detail.housekeepingVo.desc = desc;
      } 

      this.setData({
        detail: detail
      });
    }).catch((res) => {
      wx.hideLoading()
      if (res.message) {
        showErrorToast(res.message)
      }
    });
  },
  makePhoneCall(e) {
    var number = e.currentTarget.dataset.number;
    wx.makePhoneCall({
      phoneNumber: number,
      fail: function() {
        // showErrorToast("拨打电话失败");
      }
    })
  },
  hasten(e) {
    var orderId = e.currentTarget.dataset.orderId;
    wx.showLoading({
      title: '加载中'
    })
    http.post(config.order_hasten.replace(":orderId", orderId), {}).then((res) => {
      wx.hideLoading();
      this.data.detail.urgent = 2;
      this.setData({
        detail: this.data.detail
      });
      app.setStorageByKey("hasten", orderId);
      showSuccessToast("催单成功");
    }).catch((res) => {
      wx.hideLoading()
      if (res.message) {
        showErrorToast(res.message)
      }
    })
  },
  comment(e) {
    var orderId = e.currentTarget.dataset.orderId;
    wx.navigateTo({
      url: '../serviceComment/index?orderId=' + orderId,
    })
  },
  /**
   * 预览评论图片
   */
  perviewImage(e) {
    var currentImage = e.currentTarget.dataset.image;
    var images = this.data.detail.commentVo.imageArr;
    wx.previewImage({
      urls: images,
      current: currentImage
    });
  },
  previewBefore(e) {
    var currentImage = e.currentTarget.dataset.image;
    var images = this.data.detail.startImagesArray;
    wx.previewImage({
      urls: images,
      current: currentImage
    });
  },
  previewAfter(e) {
    var currentImage = e.currentTarget.dataset.image;
    var images = this.data.detail.completeImagesArray;
    wx.previewImage({
      urls: images,
      current: currentImage
    });
  }
})