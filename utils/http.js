import { showErrorToast } from './util.js'

function request(method = "GET", url, data = {}) {
  console.log(method, url,)
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data:data,
      method:method,
      header:{
        'Content-Type': 'application/json',
        'access_token': wx.getStorageSync('access_token')
      },
      success:function(res) {
        if(res.data.code != 0) {

          if (res.data.code == 401 || res.data.code == 402 || res.data.code == 403 ){
            wx.removeStorageSync('access_token');
            wx.removeStorageSync('userInfo');
          }
          
          showErrorToast(res.data.message)
          reject(res.data)
        } else {
          resolve(res.data)
        }
      },
      fail:function(res) {
        var msg = res.errMsg;
        if (msg === "request:fail url not in domain list") {
          wx.showModal({
            content: '当前版本为开发版本，请打开调式再使用，并重启。',
            success(res) {
              if (res.confirm) {
                // 打开调试
                wx.setEnableDebug({
                  enableDebug: true
                })
              } else {
                reject(res)
              }
            }
          });
        } else {
          showErrorToast("网络错误")
          reject(res)
        }
      }
    })
  });
}


export default {
  get: function (url, data = {}) {
    return request("GET", url, data);
  },
  post: function (url, data = {}) {
    return request("POST", url, data);
  },
  postJson: function (url, data = {}) {
    let jsonData = JSON.stringify(data);
    return request("POST", url, jsonData);
  },
  put: function (url, data = {}) {
    return request("PUT", url, data);
  },
  delete: function (url, data = {}) {
    return request("DELETE", url, data);
  },
  head: function (url, data = {}) {
    return request("HEAD", url, data);
  }
}