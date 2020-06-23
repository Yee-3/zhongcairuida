// pages/x-wodejianli-qzyx/x-wodejianli-qzyx.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ind: 0,
    ind1: '0',
    ind2: '0',
    array: [1, 2, 3, 4],
    items: [{
      name: '',
      value: ''
    }, ],
    isAdd: false,
    isInd: false,
    isTime: false,
    num: 0,
    index: 1,
    num1: 0,
    num2: 1,
    num3: 1,
    valu: '请选择',
    vauee: '请选择您期望的职位',
    type: [
      {
      item: '财务'
    },
    {
      item: '设计'
    },
    {
      item: '财务2'
    },
    {
      item: '财务'
    },
  ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  toggle(e) {
    this.setData({
      ind: e.currentTarget.dataset['index']
    })
  },
  toggle1(e) {
    this.setData({
      ind1: e.currentTarget.dataset['index']
    })
  },
  toggle2(e) {
    console.log(e)
    this.setData({
      ind2: e.currentTarget.dataset['indu']
    })
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  active(e) {
    // console.log(e.currentTarget.dataset.num)
    // console.log(e)
    this.setData({
      num: e.currentTarget.dataset.num
    })
  },
  activeOne(e) {
    this.setData({
      index: e.currentTarget.dataset.index
    })
  },
  // activeTwo(e) {
  //   this.setData({
  //     num1: e.currentTarget.dataset.num1
  //   })
  // },
  activeThree(e) {
    this.setData({
      num2: e.currentTarget.dataset.num2
    })
  },
  activeFour(e) {
    console.log(e)
    this.setData({
      num3: e.currentTarget.dataset.num
    })
  },
  zhiwei() {
    console.log(222)
    // var that=this
    var add = this.data.isAdd
    // console.log(add)
    this.setData({
      isAdd: !add
    })
    // console.log(add)
  },
  weizhi() {
    wx.navigateTo({
      url: '../b-dingweiq/b-dingwq',
    })
  },
  Ttime() {
    var timer = this.data.isTime
    this.setData({
      isTime: !timer
    })
  },
  industry() {
    var ind = this.data.isInd
    this.setData({
      isInd: !ind
    })
  },
  con() {
    // var numb=currentTarget.dataset.num
    console.log(this.data.num3)
    this.Ttime()
    if (this.data.num3 == 1) {
      this.setData({
        valu: '立即到岗'
      })
    } else if (this.data.num3 == 2) {
      this.setData({
        valu: '一周内'
      })
    } else if (this.data.num3 == 3) {
      this.setData({
        valu: '一个月内'
      })
    } else if (this.data.num3 == 4) {
      this.setData({
        valu: '三个月内'
      })
    } else {
      this.setData({
        valu: '待定'
      })
    }
  },
  con1(){
    var ind=this.data.ind1
    this.zhiwei()
    this.setData({
      vauee:this.data.type[ind].item
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