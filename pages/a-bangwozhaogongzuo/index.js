// pages/shangjia/shangjia.js
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    ind: 0,
    ind1: '0',
    array: [1, 2, 3, 4],
    items: [{
      name: '',
      value: ''
    }, ],
    isAdd: false,
    num: 0,
    index: 1,
    num1: 0,
    num2: 1,
    classValue: '请选择',
    classContent: [{
        name: '金融、证卷、资产'
      },
      {
        name: '金融、证卷、资产'
      },
      {
        name: '金融、证卷、资产'
      },
    ],
    mapValue:'请选择',
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
  activeTwo(e) {
    this.setData({
      num1: e.currentTarget.dataset.num1
    })
  },
  activeThree(e) {
    this.setData({
      num2: e.currentTarget.dataset.num2
    })
  },
  zhiwei() {
    console.log(222)
    // var that=this
    var add = this.data.isAdd
    console.log(add)
    this.setData({
      isAdd: !add
    })
    console.log(add)

  },
  weizhi() {
    wx.navigateTo({
      url: '../b-dingweiq/b-dingwq',
    })
    // this.map.show()
  },
  confirm() {
    this.zhiwei()
    var index = this.data.ind1
    console.log(this.data.classContent[index])
    this.setData({
      classValue: this.data.classContent[index].name
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