// pages/f-jinzhunjianlixq/f-jinzhunjianlixq.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isF: true,
    isX: true,
    height: '',
    isMask: false,
    datePickerValue: ['', '', ''],
    datePickerIsShow: false,
    isHz: true,
    isTwo: false,
    app: getApp().globalData,
    content: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      height: wx.getSystemInfoSync().windowHeight * 0.9,
    })
    var id = wx.getStorageSync('companyId')
    console.log(id)
    this.data.app.http({
      type: true,
      url: '/company/queryCooperate',
      dengl: true,
      data: {
        companyId: id
      },
      method: 'POST',
      success(res) {
        console.log(res)
        if (res.data.rdata == 'N') {
          that.setData({
            isHz: false
          })
        } else {
          that.setData({
            isHz: true
          })
        }
      }
    })

    this.data.app.http({
      url: '/indexCom/getResumeDetail',
      dengl: true,
      method: 'POST',
      data: {
        id: options.id
      },
      success(res) {
        if (res.data.rdata) {
          var timer = res.data.rdata.ctrlWorkDTOS
          var xiangTime = res.data.rdata.ctrlProjectDTOS
          var schoolTime = res.data.rdata.ctrlSchoolDTOS
          timer.map(function (val, i) {
            var startTime = val.startTime.substring(0, 7).replace(/-/g, '/')
            var endTime = val.endTime.substring(0, 7).replace(/-/g, '/')
            val.time = [startTime, endTime]
          })

          xiangTime.map(function (val, i) {
            var startTime = val.startTime.substring(0, 7).replace(/-/g, '/')
            var endTime = val.endTime.substring(0, 7).replace(/-/g, '/')
            val.time = [startTime, endTime]
          })

          schoolTime.map(function (val, i) {
            var startTime = val.startTime.substring(0, 7).replace(/-/g, '/')
            var endTime = val.endTime.substring(0, 7).replace(/-/g, '/')
            val.time = [startTime, endTime]
          })
          var arr = res.data.rdata.ctrlBookDTOS
          arr.map(function (val, i) {
            var time = val.time.substring(0, 4) + '年' + val.time.substring(5, 7) + '月'
            val.times = time
          })
        }


        that.setData({
          content: res.data.rdata
        })

      }
    })

  },
  change: function (e) {
    var f = this.data.isF
    this.setData({
      isF: !f
    })
  },
  change1: function (e) {
    var x = this.data.isX
    this.setData({
      isX: !x
    })
  },
  invit() {
    if (this.data.isHz) {
      var mask = this.data.isMask
      this.setData({
        isMask: !mask
      })
    } else {
      var two = this.data.isTwo
      this.setData({
        isTwo: !two
      })
    }
  },
  phone() {
    wx.makePhoneCall({
      phoneNumber: '1222222'
    })
  },
  quxiao2: function () {
    this.invit()
  },
  confirm(e) {
    this.invit()
    this.setData({
      datePickerIsShow: true,
      data_index: e.currentTarget.dataset.de
    });
  },
  // 选择时间

  bindDateChange1: function (e) {
    this.setData({
      datePickerIsShow: true,
      data_index: e.currentTarget.dataset.de
    });
  },

  datePickerOnSureClick: function (e) {
    if (this.data.data_index == 1) {
      this.setData({
        date: `${e.detail.value[0]}年${e.detail.value[1]}月${e.detail.value[2]}日`,
        datePickerValue: e.detail.value,
        datePickerIsShow: false,
      })
    } else {
      this.setData({
        date1: `${e.detail.value[0]}年${e.detail.value[1]}月${e.detail.value[2]}日`,
        datePickerValue: e.detail.value,
        datePickerIsShow: false,
      })
    }
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