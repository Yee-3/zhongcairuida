// pages/x-wodejianli-qzyx/x-wodejianli-qzyx.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ind: 0,
    ind1: '0',
    ind2: '1',
    array: [1, 2, 3, 4],
    items: [{
      name: '',
      value: ''
    }, ],
    isAdd: false,
    isInd: false,
    isTime: false,
    num: 1,
    indexs: 1,
    num1: 1,
    num2: 1,
    num3: '',
    vauee: '请选择您期望的职位',
    type_value: '请选择',
    app: getApp().globalData,
    class_types: [],
    type: [],
    money: [],
    work_type: [],
    work_time: [],
    time_value: '请选择',
    mapValue: '请选择',
    hangyeInd: '',
    time_index: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this

    // this.data.content=options
    this.setData({
        num: options.money,
        indexs: options.type,
        ind2: options.industry,
        num3: options.time,
        mapValue:options.address
      }),
      // 职位类别
      this.data.app.http({
        url:'/selects/position',
        dengl:true,
        data:{},
        success(res){
          console.log(res.data.rdata)
          // for (var i = 0; i < res.data.rdata.length; i++) {
          //   if (options.time == res.data.rdata[i].value) {
          //     var label = res.data.rdata[i].label
          //   }
          // }
          that.setData({
            type: res.data.rdata,
            // time_value: label
          })
        }
      })
      // 到岗时间
      this.data.app.http({
        url: '/selects/work_time',
        data: {},
        dengl: true,
        success(res) {
          for (var i = 0; i < res.data.rdata.length; i++) {
            if (options.time == res.data.rdata[i].value) {
              var label = res.data.rdata[i].label
            }
          }
          that.setData({
            work_time: res.data.rdata,
            time_value: label
          })
        }
      })
      // 行业
    this.data.app.http({
      url: '/selects/company_type',
      data: {},
      dengl: true,
      success(res) {
        for (var i = 0; i < res.data.rdata.length; i++) {
          if (options.industry == res.data.rdata[i].value) {
            var label = res.data.rdata[i].label
          }
        }
        that.setData({
          class_types: res.data.rdata,
          type_value: label
        })
      }
    })
    // 期望薪资
    this.data.app.http({
        url: '/selects/expect_money',
        dengl: true,
        data: {},
        success(res) {
          console.log(res.data.rdata)
          that.setData({
            money: res.data.rdata
          })
        }


      }),
      // 工作类型
      this.data.app.http({
        url: '/selects/work_type',
        dengl: true,
        data: {},
        success(res) {
          console.log(res.data.rdata)
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
    console.log(e)
    this.setData({
      ind2: e.currentTarget.dataset['indu'],
      hangyeInd: e.currentTarget.dataset['index']
    })
  },
  confirm() {
    var index = this.data.hangyeInd
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
      num3: e.currentTarget.dataset.num,
      time_index: e.currentTarget.dataset.index
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
    var that = this
    this.setData({
      isTime: !timer
    })
    // this.data.app.http({
    //   url: '/selects/work_time',
    //   data: {},
    //   dengl: true,
    //   success(res) {
    //     that.setData({
    //       work_time: res.data.rdata
    //     })
    //   }
    // })
  },
  industry() {
    var ind = this.data.isInd
    var that = this
    this.setData({
      isInd: !ind
    })
    // this.data.app.http({
    //   url: '/selects/company_type',
    //   data: {},
    //   dengl: true,
    //   success(res) {
    //     that.setData({
    //       class_types: res.data.rdata
    //     })
    //   }
    // })
  },
  con() {
    // var numb=currentTarget.dataset.num
    this.Ttime()
    var index = this.data.time_index
    this.setData({
      time_value: this.data.work_time[index].label
    })
  },
  dingwei() {
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