// pages/s-wodejianli/s-wodejianli.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
 isF:true,
 isX:true,
 DataSource: [
  {
    content: '挖掘开拓本地特色餐饮客户为客户提供优质的合作方案，与公司各部门有效配合，所遇到的问题及突发事件..挖掘开拓本地特色餐饮客户为客户提供优质的合作方案，与公司各部门有效配合，所遇到的问题及突发事件..',
  },
  {
    content: '挖掘开拓本地特色餐饮客户为客户提供优质的合作方案，与公司各部门有效配合，所遇到的问题及突发事件..挖掘开拓本地特色餐饮客户为客户提供优质的合作方案，与公司各部门有效配合，所遇到的问题及突发事件..',
  }
],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  change: function (e) {
    var f=this.data.isF
    this.setData({
      isF:!f
    })
  },
  change1: function (e) {
    var x=this.data.isX
    this.setData({
      isX:!x
    })
  },
  int() {
    wx.navigateTo({
      url: '../x-wodejianli-qzyx/x-wodejianli-qzyx',
    })
  },
  work() {
    wx.navigateTo({
      url: '../t-wodejianli-gzjl/t-wodejianli-gzjl',
    })
  },
  project() {
    wx.navigateTo({
      url: '../y-wodejianli-xmjl/y-wodejianli-xmjl',
    })
  },
  education() {
    wx.navigateTo({
      url: '../w-wodejianli-jyjl/w-wodejianli-jyjl',
    })
  },
  honor(){
    wx.navigateTo({
      url: '../u-wodejianli-hdzs/u-wodejianli-hdzs',
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