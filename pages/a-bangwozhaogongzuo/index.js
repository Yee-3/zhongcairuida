// pages/shangjia/shangjia.js
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    ind: 0,
    ind1: 0,
    array: [1, 2, 3, 4],
    items: [{
      name: '',
      value: ''
    }, ],
    isAdd: false,
    isTwo:false,
    num: 0,
    indexs: 0,
    num1: 0,
    num2: 0,
    classValue: '请选择',
    mapValue:'请选择',
    money:[],
    status:[],
    work_time:[],
    work_type:[],
    zhiList:[],
    ind_three:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app=getApp().globalData
    var that = this
    // 期望薪资
   app.http({
      url: '/selects/expect_money',
      dengl: true,
      data: {},
      success(res) {
        console.log(res)
        that.setData({
          money: res.data.rdata
        })
      } 
    })
    // 求职状态
    app.http({
      url: '/selects/resume_status',
      dengl: true,
      data: {},
      success(res) {
        console.log(res)
        that.setData({
         status: res.data.rdata
        })
      } 
    })
    // 职位
    app.http({
      url: '/selects/position',
      dengl: true,
      data: {},
      success(res) {
        console.log(res)
        that.setData({
          zhiList: res.data.rdata[0].treeDTOS
        })
      } 
    })
    // 到岗时间
    app.http({
      url: '/selects/work_time',
      data: {},
      dengl: true,
      success(res) {
        that.setData({
          work_time: res.data.rdata
        })
      }
    })
    // 类型
  app.http({
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
  hide() {
    var two = this.data.isTwo
    this.setData({
      isTwo: !two
    })
    if(!this.data.isTwo){
      this.setData({
        ind1:0,
        ind_three:0
      })
    }
  },
  toggle(e) {
    var two = this.data.isTwo
    var index = e.currentTarget.dataset['index'],
    index2 = 0,
    index3 = 0,
    that = this
    // console.log()
    this.setData({
      ind: e.currentTarget.dataset['index'],
      isTwo: !two,
      value_zhi: that.data.zhiList[index].treeDTOS[index2].treeDTOS[index3].name
    })
  },
  toggle1(e) {
    var index = this.data.ind,
    index2 =  e.currentTarget.dataset['index'],
    index3 =0,
    that = this
    this.setData({
      ind1: e.currentTarget.dataset['index'],
      value_zhi: that.data.zhiList[index].treeDTOS[index2].treeDTOS[index3].name
    })
  },
  toggle_three(e) {
    var index = this.data.ind,
    index2 = this.data.ind1,
    index3 = e.currentTarget.dataset['index'],
    that = this
    this.setData({
      ind_three: e.currentTarget.dataset['index'],
      posi_id: e.currentTarget.dataset['id'],
      value_zhi: that.data.zhiList[index].treeDTOS[index2].treeDTOS[index3].name
    })
  },
  // 确定
  con_zhi() {
    this.zhiwei()
    var index = this.data.ind,
      index2 = this.data.ind1,
      index3 = this.data.ind_three,
      that = this
    this.setData({
      classValue: that.data.zhiList[index].treeDTOS[index2].treeDTOS[index3].name
    })

  },
  confirm_zhi(){
    this.zhiwei()
    this.setData({
      ind:0,
      ind1:0,
      ind_three:0   
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
      indexs: e.currentTarget.dataset.index
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
    var add = this.data.isAdd
    this.setData({
      isAdd: !add
    })
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