// pages/h-mianshiguanli-yms/h-mianshiguanli-yms.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idn: 1,
    ind: 1,
    ind1: 1,
    isDel: false,
    app: getApp().globalData,
    companyId: '',
    msList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      companyId: wx.getStorageSync('companyId')
    })
    console.log(wx.getStorageSync('companyId'))
    var that = this,
      url = '/interviewManager/getInterviewList',
      data = {
        companyId: that.data.companyId,
        status: 'Y'
      }
    this.reword(url, data)
  },
  reword(url, data) {
    var that = this
    this.data.app.http({
      type: true,
      url: url,
      dengl: true,
      method: 'POST',
      data: data,
      success(res) {
        console.log(res.data.rdata)
        that.setData({
          msList: res.data.rdata
        })
      }
    })
  },
  toggleTitle(e) {
    console.log(e)
    this.setData({
      idn: e.currentTarget.dataset.index,
      ind: 1,
      ind1: 1
    })
    var x = e.currentTarget.dataset.index,
      // url = x == 1 ? '/interviewManager/getInterviewList' : x == 2 ? '/interviewManager/getInductionList' : '',
      url ='interviewManager/getInterviewList',
      that = this
    var data = {
      companyId: that.data.companyId,
      status: 'Y'
      // status: 'P'
    }
    this.reword(url, data)

  },
  toggleMin(e) {
    console.log(e)
    this.setData({
      ind: e.currentTarget.dataset.index
    })
    var x = this.data.idn,
      i = e.currentTarget.dataset.index,
      that = this,
      status = i == 1 ? 'p' : i == 2 ? 'Y' : i == 3 ? 'N' : 'S',
      // url = x == 1 ? '/interviewManager/getInterviewList' : x == 2 ? '/interviewManager/getInductionList' : ''
      url ='interviewManager/getInterviewList'
    if (x == 1) {
      var data = {
        companyId: that.data.companyId,
        // status: status
        status:'Y'
      }
      that.reword(url, data)
    } else if (x == 2) {
      var data = {
        companyId: that.data.companyId,
        // status: status
        status:'Y'
      }
      that.reword(url, data)
    }
    console.log(this.data.ind)
  },
  toggleMin1(e) {
    this.setData({
      ind1: e.currentTarget.dataset.index
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  dele() {
    var del = this.data.isDel
    this.setData({
      isDel: !del
    })
  },
  del_cancle() {
    this.dele()
  },
  del_confirm() {
    this.dele
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.hideHomeButton({
      success: function () {
        console.log("hide home success");
      },
      fail: function () {
        console.log("hide home fail");
      },
      complete: function () {
        console.log("hide home complete");
      },
    });
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