// pages/p-qiyeduan/p-qiyeduan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.tab = this.selectComponent("#tab");
  },
person(){
  wx.navigateTo({
    url: '../d-hailiangrencai/d-hailiangrencai',
  })
},
resume(){
  wx.navigateTo({
    url: '../e-jinzhunjianli/e-jinzhunjianli',
  })
},
entry(){
  wx.navigateTo({
    url: '../d-hailiangrencai/d-hailiangrencai?id='+1,
  })
},
detail(){
  wx.navigateTo({
    url: '../f-jinzhunjianlixq/f-jinzhunjianlixq',
  })
},
qyRen(){
  wx.navigateTo({
    url: '../m-qiyezhuce/m-qiyezhuce',
  })
},
showTab(){},
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