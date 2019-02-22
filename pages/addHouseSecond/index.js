// pages/addHouseSecond/index.js
import {
  parseTime,
  showErrorToast,
  showSuccessToast
} from '../../utils/util.js'
import http from '../../utils/http.js'
import config from '../../config/api.js'

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    enableZoom:false,
    enableScroll:false,
    status:1,  //1 显示详细地址文字  2显示详细地址按钮
    addHouseData:null,
    markers: [{
      iconPath: '/static/images/local.png',
      id: 0,
      latitude: 30.61925,
      longitude: 104.11545,
      width: 30,
      height: 30
    }],
    region: ['请选择', '所在', '城市'],
    longitude: 104.11545,
    latitude: 30.61925,
  },
  resetCity() {

    let addHouseData = this.data.addHouseData;
    addHouseData.provinceName = '四川省';
    addHouseData.cityName = '';
    addHouseData.countyName = '';
    addHouseData.provinceCode = '510000';
    addHouseData.cityCode = '';
    addHouseData.countyCode = '';

    let region = [];
    region[0] = '四川省';
    region[1] = '';
    region[2] = '';

    this.setData({
      addHouseData: addHouseData,
      region: region
    })

  },
  bindRegionChange(e) {
    console.log(e.detail)
    let data = e.detail;
    let provinceName = data.value[0];
    let cityName = data.value[1];
    let countyName = data.value[2];
    let provinceCode = data.code[0];
    let cityCode = data.code[1];
    let countyCode = data.code[2];

    if (provinceName != "四川省") {
      //this.selectComponent("#myToast").show('所在城市当前只支持四川省!')
      showErrorToast('所在城市当前只支持四川省!')
      this.resetCity();
      return;
    }

    let addHouseData = this.data.addHouseData;
    addHouseData.provinceName = provinceName;
    addHouseData.cityName = cityName;
    addHouseData.countyName = countyName;
    addHouseData.provinceCode = provinceCode;
    addHouseData.cityCode = cityCode;
    addHouseData.countyCode = countyCode;
    let region = [];
    region[0] = provinceName;
    region[1] = cityName;
    region[2] = countyName;

    this.setData({
      addHouseData: addHouseData,
      region: region
    })

  },
  addressAgain: function () {
    let that = this;
    wx.openSetting({
      success(res) {
        if (res.authSetting['scope.userLocation']) {
          that.setData({
            status:1
          })
          that.getlocal();
        }
      }
    })
  },
  chocieLocal() {
    let that = this;
    wx.getSetting({
      success(res) {
        console.log(res)
        if (!res.authSetting['scope.userLocation']) {
          console.log(666)
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              that.getlocal();
            },
            fail() {
              that.setData({
                status:2
              })
            }
          })
        } else {
          that.getlocal();
        }
      }
    })

  },
  getlocal() {
    let that = this;
    wx.chooseLocation({
      success: function (res) {
        // success
        console.log(res, "location")
        let addHouseData = that.data.addHouseData;
        addHouseData.houseAddress = res.name;
        addHouseData.longitude = res.longitude;
        addHouseData.latitude = res.latitude;

        let markers = [{
          iconPath: '/static/images/local.png',
          id: 0,
          latitude: res.latitude,
          longitude: res.longitude,
          width: 30,
          height: 30
        }];

        that.setData({
          longitude: res.longitude,
          latitude: res.latitude,
          markers: markers,
          addHouseData: addHouseData
        })

      }
    })
  },
  houseNameInput(e) {
    let villageName = e.detail.value;
    let addHouseData = this.data.addHouseData;
    addHouseData.villageName = villageName;
    this.setData({
      addHouseData: addHouseData
    })
  },
  createHouse() {
    

    if (!this.data.addHouseData.villageName) {
     // this.selectComponent("#myToast").show('请输入小区名称')
      showErrorToast('请输入小区名称')
      return;
    }

    if (this.data.addHouseData.villageName.length < 5) {
      // this.selectComponent("#myToast").show('请输入小区名称')
      showErrorToast('小区名称为5-20个字符')
      return;
    }

    if (!this.data.addHouseData.provinceName ) {
      //this.selectComponent("#myToast").show('请选择所在城市')
      showErrorToast('请选择所在城市')
      return;
    }

    if (!this.data.addHouseData.cityName) {
      //this.selectComponent("#myToast").show('请选择所在城市')
      showErrorToast('请选择所在城市')
      return;
    }

    if (!this.data.addHouseData.countyName) {
      //this.selectComponent("#myToast").show('请选择所在城市')
      showErrorToast('请选择所在城市')
      return;
    }

    if (!this.data.addHouseData.longitude) {
      //this.selectComponent("#myToast").show('请指定详细地址')
      showErrorToast('请指定详细地址')
      return;
    }
    console.log(this.data.addHouseData)
    wx.showLoading({ title: '数据提交中...' })
    http.postJson(config.house_list, this.data.addHouseData).then((res)=>{
      wx.hideLoading()
      app.globalData.refreshHome = true;
      wx.switchTab({
        url:"/pages/index/index"
      })
    }).catch((res)=>{
      //wx.hideLoading()
    })


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let houseData = app.globalData.addHouseData;
    let status = houseData.houseId ? 1 : 0;
    if(status) {
      houseData.latitude = +houseData.latitude;
      houseData.latitude = +houseData.latitude;
    }

    let region = ['请选择', '所在', '城市'];
    if (houseData.provinceName){
      region[0] = houseData.provinceName;
      region[1] = houseData.cityName;
      region[2] = houseData.countyName;
    }

    if(status) {
      let markers = [{
        iconPath: '/static/images/local.png',
        id: 0,
        latitude: houseData.latitude,
        longitude: houseData.longitude,
        width: 30,
        height: 30
      }];

      this.setData({
        longitude: houseData.longitude,
        latitude: houseData.latitude,
        markers: markers,
        addHouseData: houseData,
        region: region
      })
    } else {
      this.setData({
        addHouseData: houseData,
        region: region
      })
    }

    console.log(this.data.addHouseData)
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

  }
})