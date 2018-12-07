//app.js
App({
  onLaunch: function() {
    wx.authorize({ scope: "scope.userLocation" })
  },
  globalData: {
    userInfo: null
  }
})