// pages/v-wodejianli-jcxx/v-wodejianli-jcxx.js
var app = getApp().globalData
Page({
  /**
   * 页面的初始数据
   */
  data: {
    date_value: '请选择',
    datePickerValue: ['', '', ''],
    datePickerIsShow: false,
    img: '../img/f067.png',
    isMar: false,
    mar: '1',
    valu: '请选择',
    isSix: false,
    six: '1',
    six_val: '请选择',
    isEdu: false,
    edu: '1',
    valu2: '请选择',
    // 表单数据
    assets: [],
    assetIndex: 0,
    isCostText: '支出',
    date: '',
    amount: null,
    descripition: '',
    // 用来放弹窗内容的，里面的格式应该为[{label: 'sadsa', value: 'dsadsad'}]
    springContent: [{
        value: '求职中'
      },
      {
        value: '随便看看'
      },
      {
        value: '暂时不考虑'
      },
      {
        value: '有好机会考虑'
      }
    ],
    type_content: '请选择'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.spring = this.selectComponent("#spring");


  },
  // 求职状态
  show() {
    this.spring.show()
  },
  handleConfirmDialog() {
    // console.log(this.spring.data.mar)
    this.spring.show()
    var index = this.spring.data.mar
    this.setData({
      type_content: this.data.springContent[index].value
    })

  },
  // --end--
  // 婚姻状况弹框
  toggle(e) {
    this.setData({
      mar: e.currentTarget.dataset.mar
    })
  },
  marriage() {
    var mar = this.data.isMar
    this.setData({
      isMar: !mar
    })
    app.http({
      url: '/selects/resume_marriage',
      dengl: false,
      data: {},
      success(res) {
        //  wx.setStorageSync('Authorization',res.data.data.access_token)
        console.log(res)
      }
    })
  },
  con() {
    this.marriage()
    if (this.data.mar == 1) {
      this.setData({
        valu: '未婚'
      })
    } else if (this.data.mar == 2) {
      this.setData({
        valu: '已婚未育'
      })
    } else if (this.data.mar == 3) {
      this.setData({
        valu: '已婚已育'
      })
    } else {
      this.setData({
        valu: '保密'
      })
    }
  },
  // ---end---
  // 性别
  sixChange(e) {
    this.setData({
      six: e.currentTarget.dataset.index
    })
  },
  con1() {
    this.hidden()
    if (this.data.mar == 1) {
      this.setData({
        six_val: '男'
      })
    } else {
      this.setData({
        six_val: '女'
      })
    }
  },
  hidden() {
    var six = this.data.isSix
    this.setData({
      isSix: !six
    })
  },
  // --end--
  // 学历
  toggle(e) {
    this.setData({
      edu: e.currentTarget.dataset.edu
    })
  },
  educat() {
    var eduu = this.data.isEdu
    this.setData({
      isEdu: !eduu
    })
  },
  con2() {
    this.educat()
    if (this.data.edu == 1) {
      this.setData({
        valu2: '大专'
      })
    } else if (this.data.edu == 2) {
      this.setData({
        valu2: '本科'
      })
    } else if (this.data.edu == 3) {
      this.setData({
        valu2: '硕士'
      })
    } else {
      this.setData({
        valu2: '博士'
      })
    }
  },
  // ---end---
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 上传头像
  // 选择图片
  images() {
    var _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // console.log(res)
        // tempFilePath可以作为img标签的src属性显示图片
        _this.setData({
          img: res.tempFilePaths
        })
      }
    })
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
  showDatePicker: function (e) {
    // this.data.datePicker.show(this);
    this.setData({
      datePickerIsShow: true,
    });
  },

  datePickerOnSureClick: function (e) {
    console.log('datePickerOnSureClick');
    console.log(e);
    this.setData({
      date_value: `${e.detail.value[0]}年${e.detail.value[1]}月${e.detail.value[2]}日`,
      datePickerValue: e.detail.value,
      datePickerIsShow: false,
    });
  },

})