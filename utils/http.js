function request(method = "GET", url, data = {}) {
  console.log(method, url)
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data:data,
      method:method,
      header:{
        'Content-Type': 'application/json',
        'access_token': wx.getStorageSync('accessToken')
      },
      success:function(res) {
        if(res.data.code != 0) {
          if (res.data.code == 401 || res.data.code == 402 || res.data.code == 403 ){
            wx.removeStorageSync('accessToken')
          }
          wx.showToast({
            title: res.data.message,
            image:'/assets/images/defeat.png',
            duration: 2000
          })
          resolve(res)
        } else {
          resolve(res)
        }
      },
      fail:function(res) {
        wx.showToast({
          title: '服务器繁忙',
          image: '/assets/images/defeat.png',
          duration: 2000
        })
        reject(res)
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


