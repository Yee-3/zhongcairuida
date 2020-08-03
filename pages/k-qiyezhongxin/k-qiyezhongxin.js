// pages/q-wode/q-wode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     dianhua:'display:none',
     app: getApp().globalData,
     kefuPhone:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that=this
    this.data.app.http({
      url:'/Other/hotline',
      dengl:true,
      data:{},
      success(res){
        console.log(res.data.rdata)
        that.setData({
          kefuPhone:res.data.rdata
        })
      }
    })
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
      phoneNumber: this.data.kefuPhone.phone
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