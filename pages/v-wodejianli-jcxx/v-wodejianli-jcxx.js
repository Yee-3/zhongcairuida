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
    mar: '0',
    valu: '请选择',
    isSix: false,
    six: '1',
    six_val: '请选择',
    isEdu: false,
    edu: 'x',
    valu2: '请选择',
    // 表单数据
    assets: [],
    assetIndex: 0,
    isCostText: '支出',
    date: '',
    amount: null,
    descripition: '',
    // 用来放弹窗内容的，里面的格式应该为[{label: 'sadsa', value: 'dsadsad'}]
    springContent: [],
    type_content: '请选择',
    app: getApp().globalData,
    eduction: [],
    marr: [],
    app: getApp().globalData,
    edu_index: '',
    mar_index: '',
    isYear: false,
    yearValue: '请选择',
    yearList: [],
    year_time: '',
    year_index: '',
    name_value: '',
    home_value: '',
    money_value: '',
    reg_value: '',
    phone_value: '',
    emil_value: '',
    id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.spring = this.selectComponent("#spring");
    var that = this
    if (wx.getStorageSync('userInfo').ctrlResumeDTO) {
      var list = wx.getStorageSync('userInfo').ctrlResumeDTO

      this.setData({
        img: list.url ? list.url : '../img/f067.png',
        name_value: list.name ? list.name : '请输入',
        date_value: list.time ? list.time : '请选择',
        valu2: list.schoolName ? list.schoolName : '请选择',
        phone_value: list.phone ? list.phone : '请输入',
        edu: list.school ? list.school : '',
        id: list.id,
        money_value: list.address ? list.address : '请输入',
        home_value: list.address ? list.address : '请输入',
        mar: list.marriage ? list.marriage : '',
        emil_value: list.email ? list.email : ''
      })
      if (list.sex) {
        var six_val = (list.sex == 1) ? '男' : '女'
        this.setData({
          six_val: six_val,
        })
      }
      this.spring.setData({
        mar: list.status ? list.status : ''
      })
    }
    // 求职状态
    this.data.app.http({
      url: '/selects/resume_status',
      dengl: true,
      data: {},
      success(res) {
        that.setData({
          springContent: res.data.rdata
        })
        if (list.status) {
          res.data.rdata.map(function (val, i) {
            if (val.value == list.status) {
              that.setData({
                type_content: val.label,
              })
            }
          })
        }
      }
    })
    // 最高学历
    this.data.app.http({
      url: '/selects/school_record',
      dengl: true,
      data: {},
      success(res) {
        that.setData({
          eduction: res.data.rdata
        })
        if (list.school) {
          res.data.rdata.map(function (val, i) {
            if (val.value == list.school) {

              that.setData({
                valu2: val.label,
                edu: val.value
              })
            }
          })
        }
      }
    })
    // 婚姻状况
    this.data.app.http({
      url: '/selects/resume_marriage',
      dengl: true,
      data: {},
      success(res) {
        that.setData({
          marr: res.data.rdata
        })
        if (list.marriage) {
          res.data.rdata.map(function (val, i) {
            if (val.value == list.marriage) {
              that.setData({
                valu: val.label,
                mar: val.value
              })
            }
          })
        }
      }
    })
    // 工作时间
    this.data.app.http({
      url: '/selects/work_exe',
      dengl: true,
      data: {},
      success(res) {
        that.setData({
          yearList: res.data.rdata
        })
        if (list.workTime) {
          res.data.rdata.map(function (val, i) {
            if (val.value == list.workTime) {
              that.setData({
                yearValue: val.label,
                year_time: val.value
              })
            }
          })
        }
      }
    })

  },
  blur(e) {
    var type = e.currentTarget.dataset.ty,
      that = this,
      value = e.detail.value
    if (type == 1) {
      that.setData({
        name_value: value
      })
    }
    if (type == 2) {
      that.setData({
        home_value: value
      })
    }
    if (type == 3) {
      that.setData({
        money_value: value
      })
    }
    if (type == 4) {
      that.setData({
        reg_value: value
      })
    }
    if (type == 5) {
      if (!this.data.app.checkPhone(value)) {
        wx.showToast({
          title: '请输入正确的手机号',
          icon: 'none'
        })
      } else {
        that.setData({
          phone_value: value
        })
      }

    }
    if (type == 6) {
      if (!this.data.app.checkEmail(value)) {
        wx.showToast({
          title: '请输入正确的邮箱',
          icon: 'none'
        })
      } else {
        that.setData({
          emil_value: value
        })
      }
    }
  },
  submit() {
    var that = this,
      date = this.data.date_value.substring(0, 4) + '/' + this.data.date_value.substring(5, 7) + '/' + this.data.date_value.substring(8, 10)
    var data = {
      address: this.data.home_value,
      time: date,
      name: this.data.name_value,
      phone: this.data.phone_value,
      email: this.data.emil_value,
      money: this.data.money_value,
      url: this.data.img,
      status: this.spring.data.mar,
      school: this.data.edu,
      workTime: this.data.year_time,
      marriage: this.data.mar,
      sex: this.data.six,
      id: this.data.id
    }
    this.data.app.http({
      url: '/resume/saveOrUpdateResumes',
      dengl: true,
      method: 'POST',
      data: data,
      success(res) {
        if (res.data.code == 200) {
          var userInfo = wx.getStorageSync('userInfo')
          userInfo.ctrlResumeDTO = data
          wx.setStorageSync('userInfo', userInfo)
          var pages = getCurrentPages();
          var prevPage = pages[pages.length - 2];
          prevPage.setData({
            user: wx.getStorageSync('userInfo').ctrlResumeDTO
          })
          wx.navigateBack({
            success(res) {
              var page = getCurrentPages().pop();
              if (page == undefined || page == null) return;
              page.onLoad();
            }
          })
        }
      }
    })
  },
  // 参加工作时间
  yearShow() {
    var year = this.data.isYear
    var that = this
    this.setData({
      isYear: !year
    })
  },
  toggle_year(e) {
    this.setData({
      year_time: e.currentTarget.dataset.year,
      year_index: e.currentTarget.dataset.index
    })
  },
  con_year() {
    this.yearShow()
    var that = this
    var index = this.data.year_index
    this.setData({
      yearValue: that.data.yearList[index].label
    })
  },
  // end
  // 求职状态
  show() {
    var that = this
    this.data.app.http({
      url: '/selects/resume_status',
      dengl: true,
      data: {},
      success(res) {
        that.setData({
          springContent: res.data.rdata
        })
      }
    })
    this.spring.show()

  },
  handleConfirmDialog() {
    this.spring.show()
    var index = this.spring.data.index
    this.setData({
      type_content: this.data.springContent[index].label
    })

  },
  // --end--
  // 婚姻状况弹框
  toggle_marr(e) {
    this.setData({
      mar: e.currentTarget.dataset.mar,
      mar_index: e.currentTarget.dataset.index
    })
  },
  marriage() {
    var mar = this.data.isMar
    var that = this
    this.setData({
      isMar: !mar
    })

  },
  con() {
    this.marriage()
    var that = this
    var index = this.data.mar_index
    this.setData({
      valu: that.data.marr[index].label
    })
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
    if (this.data.six == 1) {
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
      edu: e.currentTarget.dataset.edu,
      edu_index: e.currentTarget.dataset.index,
    })
  },
  educat() {
    var eduu = this.data.isEdu
    var that = this
    this.setData({
      isEdu: !eduu
    })

  },
  con2() {
    var that = this
    var index = this.data.edu_index
    this.educat()
    this.setData({
      valu2: that.data.eduction[index].label
    })
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
    this.setData({
      date_value: `${e.detail.value[0]}年${e.detail.value[1]}月${e.detail.value[2]}日`,
      datePickerValue: e.detail.value,
      datePickerIsShow: false,
    });
  },

})