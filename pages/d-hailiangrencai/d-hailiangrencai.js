// pages/d-hailiangrencai/d-hailiangrencai.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '综合排序',
    animationCon: {},
    animationData: {},
    animationMor: {},
    style: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id == 1) {
      wx.setNavigationBarTitle({
        title: '即刻入职'
      })
    }
    this.zhiwei = this.selectComponent("#zhiwei");
    this.zonghe = this.selectComponent("#zonghe");
    this.more = this.selectComponent("#more");
  },
  toggleZong() {
    if(this.zhiwei.data.isAdd){
      this.toggleZhi()
    }
     if(this.more.data.isAdd_F){
      this.toggleMor()
    } 
    this.zonghe.toggleZong()
    this.zonghe.setData({
      style: 'top:82rpx',
      styleT: 'top:200rpx'
    })
    var nowShow = this.zonghe.data.isCon;
    //创建动画
    var animation = wx.createAnimation({
      timingFunction: "ease"
    })
    this.animation = animation;
    if (nowShow) {
      animation.rotate(180).step();
      this.setData({
        animationCon: animation.export()
      })
    } else {
      animation.rotate(0).step();
      this.setData({
        animationCon: animation.export()
      })
    }
  },
  togValue() {
    this.setData({
      value: this.zonghe.data.value
    })
    this.toggleZong()
  },
  toggleZhi() {
    if (this.zonghe.data.isCon) {
      this.toggleZong()
    }
    if (this.more.data.isAdd_F) {
      this.toggleMor()
    }
    this.zhiwei.position()
    this.zhiwei.setData({
      style: 'top:82rpx',
      styleT: 'top:200rpx'
    })
    var nowShow = this.zhiwei.data.isAdd;
    //创建动画
    var animation = wx.createAnimation({
      timingFunction: "ease"
    })
    this.animation = animation;
    if (nowShow) {
      animation.rotate(180).step();
      this.setData({
        animationData: animation.export()
      })
    } else {
      animation.rotate(0).step();
      this.setData({
        animationData: animation.export()
      })
    }
  },
  tog() {
    this.toggleZhi()
  },
  toggleMor() {
    if (this.zhiwei.data.isAdd) {
      this.toggleZhi()
    }
    if (this.zonghe.data.isCon) {
      this.toggleZong()
    }
    this.more.position2()
    this.more.setData({
      style: 'top:82rpx',
      styleT: 'top:200rpx'
    })
    var nowShow = this.more.data.isAdd_F;
    //创建动画
    var animation = wx.createAnimation({
      timingFunction: "ease"
    })
    this.animation = animation;
    if (nowShow) {
      animation.rotate(180).step();
      this.setData({
        animationMor: animation.export()
      })
    } else {
      animation.rotate(0).step();
      this.setData({
        animationMor: animation.export()
      })
    }
  },
  togMore() {
    this.toggleMor()
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