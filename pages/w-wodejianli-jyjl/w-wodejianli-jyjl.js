// pages/w-wodejianli-jyjl/w-wodejianli-jyjl.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2016-09-01',
    time: '12:01',
    date1: '2018-09-01',
    time1: '12:01',
    isEdu:false,
    edu:'1',
    valu:'请选择'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 学历
  toggle(e){
    this.setData({
      edu:e.currentTarget.dataset.edu
    })
  },
  educat(){
    var eduu = this.data.isEdu
    this.setData({
      isEdu: !eduu
    })
  },
  con() {
    this.educat()
    if (this.data.edu == 1) {
      this.setData({
        valu: '大专'
      })
    } else if (this.data.edu == 2) {
      this.setData({
        valu: '本科'
      })
    } else if (this.data.edu == 3) {
      this.setData({
        valu: '硕士'
      })
    }  else {
      this.setData({
        valu: '博士'
      })
    }
  },
  // ---end---
  // 选择时间
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  bindDateChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date1: e.detail.value
    })
  },
  bindTimeChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time1: e.detail.value
    })
  },
  // e-----nd-----
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