//app.js
import config from 'config/api.js'
import http from 'utils/http.js'
App({
  onLaunch: function () {
    var that = this;

    // 判断是否登录
    // if (that.isLogin()) {
    //   console.log('已经登录，跳过获取session_key');
    //   return;
    // }
    
    // let sessionKey = that.getStorageByKey('session_key');
    // // 判断session_key是否存在
    // if (!sessionKey) {
    //   // 不存在，调用登录并获取session_key
    //   that.loginWxAndGetSessionKey();
    //   return;
    // }
    // // 验证seesion_key是否可用,是否过期
    // wx.checkSession({
    //   success: function (e) {
    //     console.log("session_key未过期");
    //   },
    //   fail: function () {
    //     console.log("session_key过期了");
    //     that.loginWxAndGetSessionKey();
    //   }
    // });

    that.loginWxAndGetSessionKey();
  },
  // 调用微信登录，并且请求服务器拿到session_key并存储到storage中
  loginWxAndGetSessionKey() {
    var that = this;
    wx.login({
      success(res) {
        if (res.code) {
          // 获取session_key
          that.loadSessionKey(res.code);
        } else {
          console.log('登录失败！' + res.errMsg);
          that.loginWxAndGetSessionKey();
        }
      }
    });
  },
  // 调用服务器接口获取session_key
  loadSessionKey(code) {
    var that = this;
    http.get(config.get_session_key, {
      'code': code
    }).then((res) => {
        console.log("成功获取session_key " + res.data);
        that.setStorageByKey("session_key", res.data);
    }).catch((err) => {
      console.log("获取session_key失败", err);
      that.loginWxAndGetSessionKey();
    })
  },
  // 获取数据缓存
  getStorageByKey(key) {
    try {
      return wx.getStorageSync(key);
    } catch (e) {
      console.log("getStorage error", e);
      return null;
    }
  },
  // 设置数据缓存
  setStorageByKey(key, value) {
    try {
      wx.setStorageSync(key, value);
    } catch (e) {
      console.log("setStorage error", e);
    }
  },
  //清空数据缓存
  removeStorageByKey(keyValue){
    wx.removeStorage({
      key: keyValue,
      success(res) {
        console.log(res.data)
      }
    })
  },
  // 判断是否已经登录
  isLogin() {
    var userInfo = this.getStorageByKey('userInfo');
    if (!userInfo) {
      return false;
    }
    if (!userInfo.xpOpenId || !userInfo.unionId) {
      return false;
    }
    if (!userInfo.headImg && !userInfo.nickName) {
      return false;
    }
    let accessToken = this.getStorageByKey('access_token');
    return !!accessToken;
  },
  globalData: {
    userCode: null,
    userInfo: null,
    houseItemData:null,  //房屋详情全局数据
    addHouseData:null, //新增编辑 房屋全局保存数据
    refreshHome:false   //是否刷新首页 flag
  }
})