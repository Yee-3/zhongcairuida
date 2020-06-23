// pages/q-wode/q-wode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     dianhua:'display:none'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  
  tanchuang_2: function() {
  	this.setData({
  		dianhua:'display:block'
  	})
  },
quxiao2: function() {
		this.setData({
			dianhua:'display:none'
		})
  },
  create(){
    wx.navigateTo({
      url: '../s-wodejianli/s-wodejianli',
    })
  },
  user1(){
    wx.navigateTo({
      url: '../r-wode-bdjl/r-wode-bdjl',
    })
  },
  base(){
    console.log('222')
    wx.navigateTo({
      url: '../v-wodejianli-jcxx/v-wodejianli-jcxx',
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