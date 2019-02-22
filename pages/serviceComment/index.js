// pages/serviceComment/index.js
const qiniuUploader = require("../../static/js/qiniuUploader");
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
    score: 5,
    content: "",
    orderId: null,
    images: [],
    token: null,
    domain: null,
    uploadedImages:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      orderId: options.orderId
    });
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
  markChange(e) {
    console.log(e.detail.mark);
    this.setData({
      score: e.detail.mark
    })
    console.log(this.data.score)
  },
  contentChange(e) {
    var content = e.detail.value;
    this.setData({
      content: content
    });
  },
  submitComment() {
    if (!this.data.content) {
      showErrorToast("内容不能为空");
      return;
    }
    this.setData({
      uploadedImages: []
    })
    if (this.data.images.length > 0) {
      this.data.images.forEach((item) => {
        this.uploadImage(item);
      });
    } else {
      this.submit();
    }
  },
  submit() {
    var params = {
      orderId: this.data.orderId,
      score: this.data.score,
      content: this.data.content
    };
    if (this.data.images.length > 0) {
      params.images = this.data.uploadedImages.join(",");
    }
    wx.showLoading({
      title: '加载中',
    });
    http.postJson(config.order_comment, params).then((res) => {
      wx.hideLoading();
      // 始终评论成功参数，方便订单列表刷新状态
      app.setStorageByKey("comment", this.data.orderId);
      showSuccessToast("提交成功");
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        })
      }, 1000);
    }).catch((res) => {
      wx.hideLoading()
      if (res.message) {
        showErrorToast(res.message)
      }
    });
  },
  perviewImage(e) {
    var currentImage = e.currentTarget.dataset.image;
    var images = this.data.images;
    wx.previewImage({
      urls: images,
      current: currentImage
    });
  },
  removeImage(e) {
    console.log(e)
    let image = e.currentTarget.dataset.image;
    let images = this.data.images;
    let index = null;
    for(var i = 0; i < images.length; i++){
      if(image == images[i]){
        index = i; 
      }
    }
    if(index != null) {
      images.splice(index,1);
      this.setData({
        images: images
      })
    }

  },
  chooseImages() {
    var that = this;
    wx.chooseImage({
      count: 3,
      sizeType: [ 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        let uploadImage = res.tempFilePaths;
        let images = that.data.images;
        if(images.length < 3) {
          for(var i = 0; i < uploadImage.length; i++){
            images.push(uploadImage[i])
            if(images.length == 3){
              break;
            }
          }
        }

        that.setData({
          images: images
        })
        console.log(that.data.images)
      },
      fail: function(err) {}
    })
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
        this.data.uploadedImages.push(res.imageURL);
        this.setData({
          uploadedImages: this.data.uploadedImages
        });
        this.checkUpload();
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
  checkUpload() {
    if (this.data.images.length == this.data.uploadedImages.length) {
      this.submit();
    }
  }
})