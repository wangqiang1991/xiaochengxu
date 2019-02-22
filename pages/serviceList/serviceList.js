// pages/serviceList/serviceList.js
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
    state: 1,
    unfinishPageIndex: 1,
    unfinishPageSize: 20,
    finishPageIndex: 1,
    finishPageSize: 20,
    unfinishOrders: [],
    finishOrders: [],
    unfinishLoad: false,
    windowHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    if (!app.isLogin()) {
      this.setData({
        state: 3
      });
    } else {
      // 判断之前的状态是不是未登录状态
      if (this.data.state == 3) {
        // 如果以登录，显示未完成工单界面
        this.setData({
          state: 1
        });
        if (this.data.unfinishOrders.length == 0) {
          this.loadOrderList();
        }
      }
    }
    // 刷新订单列表状态
    this.refreshList();
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
    console.log("onPullDownRefresh")
    if (app.isLogin()) {
      this.resetPage();
      this.loadOrderList();
    } else {
      wx.stopPullDownRefresh();
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log("onReachBottom")
    if (app.isLogin()) {
      this.loadOrderList();
    } 
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  resetPage() {
    if (this.data.state == 1) {
      this.setData({
        unfinishPageIndex: 1
      });
    } else {
      this.setData({
        finishPageIndex: 1
      });
    }
  },
  showUnFinish() {
    this.setData({
      state: 1
    });
  },
  showFinish() {
    this.setData({
      state: 2
    });
    if (!this.data.unfinishLoad) {
      this.loadOrderList();
      this.setData({
        unfinishLoad: true
      });
    }
  },
  createLoadPrams() {
    var params = {};
    if (this.data.state == 1) {
      params.pageIndex = this.data.unfinishPageIndex;
      params.pageSize = this.data.unfinishPageSize;
      params.completed = false;
    } else {
      params.pageIndex = this.data.finishPageIndex;
      params.pageSize = this.data.finishPageSize;
      params.completed = true;
    }
    return params;
  },
  setOrderData(params, data) {
    for (var i = 0; i < data.length; i++) {
      var item = data[i];
      item.createdDate = parseTime(item.createdAt, '{y}-{m}-{d} {h}:{i}')
    }
    if (params.completed) {
      if (params.pageIndex == 1) {
        this.setData({
          finishOrders: data
        });
      } else {
        this.setData({
          finishOrders: this.data.finishOrders.concat(data)
        });
      }

    } else {
      if (params.pageIndex == 1) {
        this.setData({
          unfinishOrders: data
        });
      } else {
        this.setData({
          unfinishOrders: this.data.unfinishOrders.concat(data)
        });
      }
    }
  },
  pageIncrement(params) {
    if (params.completed) {
      this.setData({
        finishPageIndex: params.pageIndex + 1
      });
    } else {
      this.setData({
        unfinishPageIndex: params.pageIndex + 1
      });
    }
  },
  loadOrderList() {
    var params = this.createLoadPrams();
    if (params.pageIndex == 1) {
      wx.showLoading({
        title: '加载中'
      })
    }
    http.get(config.order_list, params).then((res) => {
      wx.hideLoading();
      wx.stopPullDownRefresh();
      let data = res.data;
      this.setOrderData(params, data);
      if (data.length > 0) {
        this.pageIncrement(params);
      }
    }).catch((res) => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      if (res.code == 401 || res.code == 402 || res.code == 403) {
        this.setData({
          state: 3
        });
      }
    })
  },
  onLoad: function(options) {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        var w = res.windowWidth;
        var unit = 750 / w;
        that.setData({
          windowHeight: res.windowHeight * unit
        })
      },
    })
    if (app.isLogin()) {
      this.loadOrderList();
    } else {
      this.setData({
        state: 3
      });
    }
  },
  hasten(e) {
    var order = e.currentTarget.dataset.order;
    wx.showLoading({
      title: '加载中'
    })
    http.post(config.order_hasten.replace(":orderId", order.orderId), {}).then((res) => {
      wx.hideLoading();
      wx.stopPullDownRefresh();
      for (var i = 0; i < this.data.unfinishOrders.length; i++) {
        var item = this.data.unfinishOrders[i];
        if (item.orderId == order.orderId) {
          item.urgent = 2;
          this.setData({
            unfinishOrders: this.data.unfinishOrders
          });
          break;
        }
      }
      showSuccessToast("催单成功");
    }).catch((res) => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      if (res.message) {
        showErrorToast(res.message)
      }
    })
  },
  loginSuccess() {
    this.setData({
      state: 1
    });
    this.loadOrderList();
  },
  toDetail(e) {
    var orderId = e.currentTarget.dataset.orderId;
    wx.navigateTo({
      url: '../serviceDetail/index?orderId=' + orderId
    })
  },
  comment(e) {
    var orderId = e.currentTarget.dataset.orderId;
    wx.navigateTo({
      url: '../serviceComment/index?orderId=' + orderId,
    })
  },
  /**
   * 刷新订单列表状态，比如是否催办，是否评价
   */
  refreshList() {
    // 刷新评价状态
    this.refreshCommentState();
    // 刷新催办状态
    this.refreshHastenState();
  },
  refreshCommentState() {
    var orderId = app.getStorageByKey("comment");
    if (orderId) {
      app.removeStorageByKey("comment");
      // 更新评论状态
      for (var i = 0; i < this.data.finishOrders.length; i++) {
        var item = this.data.finishOrders[i];
        if (item.orderId == orderId) {
          item.comment = true;
          this.setData({
            finishOrders: this.data.finishOrders
          });
          break;
        }
      }
    }
  },
  refreshHastenState() {
    var orderId = app.getStorageByKey("hasten");
    if (orderId) {
      app.removeStorageByKey("hasten");
      // 更新评论状态
      for (var i = 0; i < this.data.unfinishOrders.length; i++) {
        var item = this.data.unfinishOrders[i];
        if (item.orderId == orderId) {
          item.urgent = 2;
          this.setData({
            unfinishOrders: this.data.unfinishOrders
          });
          break;
        }
      }
    }
  }
})