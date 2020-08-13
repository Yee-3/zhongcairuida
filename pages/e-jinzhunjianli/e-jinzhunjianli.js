// pages/e-jinzhunjianli/e-jinzhunjianli.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    app: getApp().globalData,
    jlList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
    this.data.app.http({
      url: '/indexCom/getAccurateResume',
      type: true,
      dengl: true,
      data: {
        companyId:options.id
      },
      method: 'POST',
      success(res) {
        that.setData({
          jlList: res.data.rdata
        })
      }
    })
  },
  jingzhun(e) {
    console.log(e)
    wx.navigateTo({
      url: '../g-jinzhunjianli-zwjl/g-jinzhunjianli-zwjl?id='+e.currentTarget.dataset.id,
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