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
    indexs: 0,
    num1: 0,
    num2: 0,
    num3: 0,
    vauee: '请选择您期望的职位',
    type_value: '请选择',
    app: getApp().globalData,
    class_types: [],
    type: [{
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
    ],
    money: [],
    work_type:[],
    work_time:[],
    time_value:'请选择',
    mapValue:'请选择'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.data.app.http({
      url: '/selects/expect_money',
      dengl: true,
      data: {},
      success(res) {
        console.log(res)
        that.setData({
          money: res.data.rdata
        })
      }
      

    }),
    this.data.app.http({
      url: '/selects/work_type',
      dengl: true,
      data: {},
      success(res) {
        console.log(res)
        that.setData({
          work_type: res.data.rdata
        })
      }
      

    })
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
    this.setData({
      ind2: e.currentTarget.dataset['indu'],
    })
  },
  confirm() {
    var index = this.data.ind2
    var that = this
    this.industry()
    this.setData({
      type_value: that.data.class_types[index].label
    })
  },
  checkboxChange: function (e) {
    // console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  active(e) {
    this.setData({
      num: e.currentTarget.dataset.num
    })
  },
  activeOne(e) {
    this.setData({
      indexs: e.currentTarget.dataset.index
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
    this.setData({
      num3: e.currentTarget.dataset.num
    })
  },
  zhiwei() {
    // var that=this
    var add = this.data.isAdd
    this.setData({
      isAdd: !add
    })
  },
  weizhi() {
    wx.navigateTo({
      url: '../b-dingweiq/b-dingwq',
    })
  },
  Ttime() {
    var timer = this.data.isTime
    var that=this
    this.setData({
      isTime: !timer
    })
    this.data.app.http({
      url: '/selects/work_time',
      data: {},
      dengl: true,
      success(res) {
        that.setData({
          work_time: res.data.rdata
        })
      }
    })
  },
  industry() {
    var ind = this.data.isInd
    var that = this
    this.setData({
      isInd: !ind
    })
    this.data.app.http({
      url: '/selects/company_type',
      data: {},
      dengl: true,
      success(res) {
        that.setData({
          class_types: res.data.rdata
        })
      }
    })
  },
  con() {
    // var numb=currentTarget.dataset.num
    this.Ttime()
    var index = this.data.num3
    this.setData({
      time_value: this.data.work_time[index].label
    })
  },
  dingwei(){
wx.navigateTo({
  url: '../b-dingweiq/b-dingwq',
})
  },
  con1() {
  
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