// pages/userLogin/userLogin.js

import config from '../../config/api.js'
import http from '../../utils/http.js'
import {
  showErrorToast
} from '../../utils/util.js'

const app = getApp()

Component({

  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },

  /**
   * 页面的初始数据
   */
  data: {
    showFillButton: false
  },
  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
      var userInfo = app.getStorageByKey('userInfo');
      if (!userInfo) {
        return;
      }
      // 未获取到相关id则需要要完善
      if (!userInfo.xpOpenId || !userInfo.unionId) {
        this.setData({
          showFillButton: true
        });
        return;
      }
      // 满足无头像，无昵称条件则需要完善
      if (!userInfo.headImg && !userInfo.nickName) {
        this.setData({
          showFillButton: true
        });
        return;
      }
    },
    detached() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  // 以下是旧式的定义方式，可以保持对 <2.2.3 版本基础库的兼容
  attached() {
    // 在组件实例进入页面节点树时执行
    var userInfo = app.getStorageByKey('userInfo');
    if (!userInfo) {
      return;
    }
    // 未获取到相关id则需要要完善
    if (!userInfo.xpOpenId || !userInfo.unionId) {
      this.setData({
        showFillButton: true
      });
      return;
    }
    // 满足无头像，无昵称条件则需要完善
    if (!userInfo.headImg && !userInfo.nickName) {
      this.setData({
        showFillButton: true
      });
      return;
    }
  },
  detached() {
    // 在组件实例被从页面节点树移除时执行
  },

  methods: {
    getPhoneNumber(e) {
      if (e.detail.errMsg.indexOf("ok") == -1) {
        showErrorToast("授权失败");
        return;
      }
      let sessionKey = app.getStorageByKey("session_key");
      this.loginByMobile(sessionKey, e.detail.iv, e.detail.encryptedData);
    },
    // 手机号登录
    loginByMobile(sessionKey, iv, encryptedData) {
      http.get(config.login, {
        'encryptedData': encryptedData,
        'iv': iv,
        'sessionKey': sessionKey
      }).then((res) => {
        app.setStorageByKey('userInfo', res.data);
        app.setStorageByKey('access_token', res.data.accessToken);
        // 验证是否需要完善信息
        var userInfo = res.data;
        // 未获取到相关id则需要要完善
        if (!userInfo.xpOpenId || !userInfo.unionId) {
          this.setData({
            showFillButton: true
          });
          return;
        }
        // 满足无头像，无昵称条件则需要完善
        if (!userInfo.headImg && !userInfo.nickName) {
          this.setData({
            showFillButton: true
          });
          return;
        }
        // 触发登录成功事件
        this.triggerEvent("loginSuccess");
      }).catch((res) => {
        app.loginWxAndGetSessionKey();
        showErrorToast(res.message ? res.message : "登录失败");
      })
    },
    // 获取用户信息
    getUserInfo(e) {
      if (e.detail.errMsg.indexOf("ok") == -1) {
        showErrorToast("您拒绝了请求");
        return;
      }

      let sessionKey = app.getStorageByKey("session_key");
      // 需要设置的属性参数
      var fillParams = {
        headImg: e.detail.userInfo.avatarUrl,
        nickName: e.detail.userInfo.nickName,
        gender: e.detail.userInfo.gender,
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
        sessionKey: sessionKey
      };
      
      // 完善设置
      http.postJson(config.fill_basic_info, fillParams).then((res) => {
        var userInfo = app.getStorageByKey('userInfo');
        userInfo.headImg = fillParams.headImg;
        userInfo.nickName = fillParams.nickName;
        userInfo.gender = fillParams.gender;
        userInfo.xpOpenId = res.data.xpOpenId;
        userInfo.unionId = res.data.unionId;
        app.setStorageByKey("userInfo", userInfo);
        // 触发登录成功事件
        this.triggerEvent("loginSuccess");
      }).catch((res) => {
        showErrorToast(res.message ? res.message : '提交失败');
      })
    }
  }
})