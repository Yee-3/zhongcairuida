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
    console.log(options)
  },
  gangwei(){
    wx.navigateTo({
      url: '../l-qiyezhongxin-zpgw-shz/l-qiyezhongxin-zpgw-shz',
    })
  },
  about(){
    wx.navigateTo({
      url: '../b-guanyuwomen/b-guanyuwomen',
    })
  },
  phone(){
    wx.makePhoneCall({
      phoneNumber: '400-061235'
    })
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
  qiuzhi(){
    wx.switchTab({
      url: '../m-shouye/m-shouye',
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