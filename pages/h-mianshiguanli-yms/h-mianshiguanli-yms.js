// pages/h-mianshiguanli-yms/h-mianshiguanli-yms.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idn: '1',
    idn1: '1',
    idn2: '1',
    idn3: '1',
    isDel: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  toggleTitle(e) {
    console.log(e)
    this.setData({
      idn: e.currentTarget.dataset.index
    })
  },
  toggleMin(e) {
    console.log(e)
      this.setData({
        idn1: e.currentTarget.dataset.index
      })
  },
  toggleMin1(e) {
      this.setData({
        idn2: e.currentTarget.dataset.index
      }) 
  },
  toggleMin2(e) {  
    this.setData({
        idn3: e.currentTarget.dataset.index
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