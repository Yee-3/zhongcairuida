// pages/t-wodejianli-gzjl/t-wodejianli-gzjl.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date1: '请选择',
    datePickerValue: ['', '', ''],
    datePickerIsShow: false,
    dianhua: 'display:none',
    date: '请选择',
    time: '12:01',
    time1: '12:01',
    types: '',
    value: '请选择',
    isAdd: false,
    isTwo: false,
    isInd: false,
    ind: 'x',
    ind1: '',
    ind2: '',
    ind3: '0',
    data_index:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 职位遮罩层中的函数
  toggle(e) {
    this.setData({
      ind: e.currentTarget.dataset['index']
    })
    var two = this.data.isTwo
    this.setData({
      isTwo: !two
    })
  },
  toggle1(e) {
    this.setData({
      ind1: e.currentTarget.dataset['index']
    })
  },
  toggle2(e) {
    this.setData({
      ind2: e.currentTarget.dataset['index']
    })
  },
  position() {
    var add = this.data.isAdd
    this.setData({
      isAdd: !add
    })
  },
  hide() {
    var two = this.data.isTwo
    this.setData({
      isTwo: !two
    })
  },
  zhiDetail() {
    console.log(3333)
    wx.navigateTo({
      url: '../zc-zhiweixq/zc-zhiweixq'
    })
  },
  // --end--
  // 行业遮罩
  industry() {
    var ind = this.data.isInd
    this.setData({
      isInd: !ind
    })
  },
  toggle3(e) {
    this.setData({
      ind3: e.currentTarget.dataset['index']
    })
  },
  // --end---
  
  tanchuang_2: function () {
    this.setData({
      dianhua: 'display:block'
    })
  },
  quxiao2: function () {
    this.setData({
      dianhua: 'display:none'
    })
  },
  type(e) {
    console.log(e)
    this.setData({
      types: e.currentTarget.dataset['index']
    })
  },
  submit() {
    this.quxiao2()
    if (this.data.types == 1) {
      this.setData({
        value: '全职'
      })
    } else if (this.data.types == 2) {
      this.setData({
        value: '兼职'
      })
    } else {
      this.setData({
        value: '实习'
      })
    }

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

  },
  // 选择时间
  bindDateChange: function (e) {
    this.setData({
      datePickerIsShow: true,
      data_index:e.currentTarget.dataset.de
    });
  },
  bindDateChange1: function (e) {
    console.log(this.data.datePickerIsShow)
    this.setData({
      datePickerIsShow: true,
      data_index:e.currentTarget.dataset.de
    });
  },

  datePickerOnSureClick: function (e) {
    if(this.data.data_index==1){
      this.setData({
        date: `${e.detail.value[0]}年${e.detail.value[1]}月${e.detail.value[2]}日`,
        datePickerValue: e.detail.value,
        datePickerIsShow: false,
      })
    }else{
      this.setData({
        date1: `${e.detail.value[0]}年${e.detail.value[1]}月${e.detail.value[2]}日`,
        datePickerValue: e.detail.value,
        datePickerIsShow: false,
      })
    }
  },
})