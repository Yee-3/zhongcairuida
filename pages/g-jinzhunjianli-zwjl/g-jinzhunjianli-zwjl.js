// pages/g-jinzhunjianli-zwjl/g-jinzhunjianli-zwjl.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    app: getApp().globalData,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.data.app.http({
      type: true,
      url: '/indexCom/getAccurateResumeList',
      dengl: true,
      method:'POST',
      data:{
        limit:10,
        page:1,
        positionId:options.id
      },
      success(res){
        console.log(res)
      }

    })
  },
  detail() {
    wx.navigateTo({
      url: '../f-jinzhunjianlixq/f-jinzhunjianlixq',
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