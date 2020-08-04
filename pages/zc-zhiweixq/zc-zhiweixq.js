// pages/zc-zhiweixq/zc-zhiweixq.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    style: 'display:none',
    app: getApp().globalData,
    detaCont: {},
    isShow: true,

    latitude: "",
    longitude: "",
    scale: 14,
    markers: [],
    //controls控件 是左下角圆圈小图标,用户无论放大多少,点这里可以立刻回到当前定位(控件（更新一下,即将废弃，建议使用 cover-view 代替）)
    controls: [{
      id: 1,
      iconPath: '../img/f030.png',
      position: {
        left: 15,
        top: 185 - 50,
        width: 30,
        height: 30
      },
      clickable: true
    }],
    isTou: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    this.data.app.http({
      url: '/index/getPosition',
      dengl: true,
      method: 'POST',
      data: {
        id: options.id,
        limit: 10,
        page: 1,
        type: 2
      },
      success(res) {
        console.log(res)
        that.setData({
          detaCont: res.data.rdata[0],
          isTou: res.data.rdata[0].signUp,
        })
      }
    })

    var that = this
    //获取当前的地理位置、速度
    // 获取当前位置地图
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        //赋值经纬度
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,

        })
      }
    })

  },
  bindcontroltap(e) {
    var that = this;
    if (e.controlId == 1) {
      that.setData({
        latitude: this.data.latitude,
        longitude: this.data.longitude,
        scale: 15,
      })
    }
  },
  //导航
  onGuideTap: function (event) {
    var lat = Number(event.currentTarget.dataset.latitude);
    var lon = Number(event.currentTarget.dataset.longitude);
    var bankName = event.currentTarget.dataset.bankname;
    console.log(lat);
    console.log(lon);
    wx.openLocation({
      type: 'gcj02',
      latitude: lat,
      longitude: lon,
      name: bankName,
      scale: 28
    })
  },

  detail(e) {
    console.log(e)
    wx.navigateTo({
      url: '../za-xinzeng-qyzsxq/z-xinzeng-qyzsxq?id=' + e.currentTarget.dataset.comid,
    })
  },
  tanchuang: function () {
    if (!this.data.isTou) {
      var that = this
      this.data.app.http({
        url: '/index/getResumes',
        dengl: true,
        method: 'POST',
        success(res) {
          // console.log(res)
          if (res.data.rdata == true) {
            console.log('cjemhhshs')
            that.data.app.http({
              url: '/index/sendResumes',
              dengl: true,
              method: 'POST',
              data: {
                company: that.data.detaCont.companyId,
                position: that.data.detaCont.name
              },
              success(res) {
                console.log(res)
                console.log(res.data.rdata)
                if (res.data.code == 200) {
                  wx.showToast({
                    title: '投递成功'
                  })
                  console.log('chengshjj')
                  that.setData({
                    isTou: true
                  })
                }
              }
            })
          } else {
            this.setData({
              style: 'display:block'
            })
          }
        }
      })
    }else{
      wx.showToast({
        title: '您已投递成功！'
      })
    }
  },
  quxiao1: function () {
    this.setData({
      style: 'display:none'
    })
  },
  buquan() {
    wx.navigateTo({
      url: '../s-wodejianli/s-wodejianli',
    })
  },
  show() {
    this.setData({
      isShow: false
    })
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
    var that = this
    setTimeout(() => {
      let query = wx.createSelectorQuery();
      query.select('.content').boundingClientRect(rect => {
        let clientHeight = rect.height;
        let clientWidth = rect.width;
        let ratio = 750 / clientWidth;
        let height = parseInt(clientHeight * ratio);
        console.log(height, clientHeight, clientWidth);
        if (height < 197) {
          that.setData({
            isShow: false
          })
        }
      }).exec();
    }, 300)
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