// pages/l-remenzhiwei/l-remenzhiwei.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAdd: false,
    isTwo: false,
    isAdd_T: false,
    isAdd_F: false,
    isAdd_S: false,
    ind: 'x',
    ind1: '',
    ind2: '',
    ind3: '',
    ind4: '',
    ind5: '',
    ind6: '',
    ind7: '',
    array: [{
        name: '综合排序'
      },
      {
        name: ' 最新发布优先'
      }
    ],
    inda: 0,
    m_zong: '1',
    z_val: "综合排序",
    app: getApp().globalData,
    zwList:[],
    gxzList:[],
    ggmList:[],
    mnyList:[],
    expList:[],
    codList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // 职位
    this.data.app.http({
      url: '/selects/position',
      dengl: true,
      data: {},
      success(res) {
        that.setData({
          zwList:res.data.rdata[0].treeDTOS
        })
      }
    })
    // 公司性质
    this.data.app.http({
      url: '/selects/company_nature',
      dengl: true,
      data: {},
      success(res) {
        that.setData({
          gxzList:res.data.rdata
        })
      }
    })
    // 公司规模
    this.data.app.http({
      url: '/selects/company_num',
      dengl: true,
      data: {},
      success(res) {
        that.setData({
          ggmList:res.data.rdata
        })
      }
    })
    // 薪资范围
    this.data.app.http({
      url: '/selects/expect_money',
      dengl: true,
      data: {},
      success(res) {
        that.setData({
          mnyList:res.data.rdata
        })
      }
    })
    // 工作经验
    this.data.app.http({
      url: '/selects/work_exe',
      dengl: true,
      data: {},
      success(res) {
        that.setData({
          expList:res.data.rdata
        })
      }
    })
    // 学历要求
    this.data.app.http({
      url: '/selects/school_record',
      dengl: true,
      data: {},
      success(res) {
        that.setData({
          codList:res.data.rdata
        })
      }
    })
  },
  sixChange(e) {
    this.setData({
      m_zong: e.currentTarget.dataset.index
    })
  },
  confirm() {
    this.position3()
    if (this.data.m_zong == 1) {
      this.setData({
        z_val: '综合排序'
      })
    } else {
      this.setData({
        z_val: '最新发布优先'
      })
    }
  },
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
  toggle3(e) {
    this.setData({
      ind3: e.currentTarget.dataset['index']
    })
  },
  toggle4(e) {
    this.setData({
      ind4: e.currentTarget.dataset['index']
    })
  },
  toggle5(e) {
    this.setData({
      ind5: e.currentTarget.dataset['index']
    })
  },
  toggle6(e) {
    this.setData({
      ind6: e.currentTarget.dataset['index']
    })
  },
  toggle7(e) {
    this.setData({
      ind7: e.currentTarget.dataset['index']
    })
  },
  bindPickerChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      inda: e.detail.value
    })
  },
  position() {
    var add = this.data.isAdd
    this.setData({
      isAdd: !add
    })
  },
  position1() {
    var add_t = this.data.isAdd_T
    this.setData({
      isAdd_T: !add_t
    })
  },
  position2() {
    var add_f = this.data.isAdd_F
    this.setData({
      isAdd_F: !add_f
    })
  },
  position3() {
    var add_s = this.data.isAdd_S
    this.setData({
      isAdd_S: !add_s
    })
  },

  hide() {
    var two = this.data.isTwo
    this.setData({
      isTwo: !two
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