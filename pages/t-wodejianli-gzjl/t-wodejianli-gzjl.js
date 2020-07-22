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
    ind: '',
    ind1: 0,
    ind2: 0,
    ind3: '0',
    data_index: '',
    app: getApp().globalData,
    zhiList: [],
    value_Zhi: '请选择',
    value_zhi: '',
    type_cont:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // 职位类别
    this.data.app.http({
      url: '/selects/position',
      dengl: true,
      data: {},
      success(res) {
        var arr = res.data.rdata[0].treeDTOS
        that.setData({
          zhiList: res.data.rdata[0].treeDTOS,
        })
        for (var i = 0; i < arr.length; i++) {
          for (var j = 0; j < arr[i].treeDTOS.length; j++) {
            for (var x = 0; x < arr[i].treeDTOS[j].treeDTOS.length; x++) {
              if (options.posit == arr[i].treeDTOS[j].treeDTOS[x].id) {
                that.setData({
                  vauee: arr[i].treeDTOS[j].treeDTOS[x].name,
                  ind: i,
                  ind1: j,
                  ind_three: x,
                })
                console.log(arr[i].treeDTOS[j].treeDTOS[x].id)
              }

            }
          }
        }

      }
    })
    // 工作类型
    this.data.app.http({
      url:'/selects/work_type',
      dengl:true,
      data:{},
      success(res){
        that.setData({
          type_cont:res.data.rdata
        })
        console.log(res.data.rdata)
      }
    })
  },
  // 职位遮罩层中的函数
  toggle(e) {
    var two = this.data.isTwo
    var index = e.currentTarget.dataset['index'],
    index2 = 0,
    index3 = 0,
    that = this
    console.log(that.data.zhiList[index].treeDTOS[index2].treeDTOS[index3].name)
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
    console.log(that.data.zhiList[index].treeDTOS[index2].treeDTOS[index3].name)
    this.setData({
      ind1: e.currentTarget.dataset['index'],
      value_zhi: that.data.zhiList[index].treeDTOS[index2].treeDTOS[index3].name
    })
  },
  toggle2(e) {
    console.log(this.data.ind,this.data.ind1,this.data.ind2)
    var index = this.data.ind,
    index2 = this.data.ind1,
    index3 = e.currentTarget.dataset['index'],
    that = this
    console.log(that.data.zhiList[index].treeDTOS[index2].treeDTOS[index3].name)
    this.setData({
      ind2: e.currentTarget.dataset['index'],
      value_zhi: that.data.zhiList[index].treeDTOS[index2].treeDTOS[index3].name
    })
  },
  // 职位确认
  queren(e) {
    console.log(this.data.ind,this.data.ind1,this.data.ind2)
    var that = this
    this.setData({
      value_Zhi: that.data.value_zhi
    })
  },
  position() {
    var add = this.data.isAdd
    this.setData({
      isAdd: !add,
     
    })
  },
  confirm(){
    this.setData({
      isAdd: false,
      isTwo: false
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
        ind2:0
      })
    }
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
      data_index: e.currentTarget.dataset.de
    });
  },
  bindDateChange1: function (e) {
    console.log(this.data.datePickerIsShow)
    this.setData({
      datePickerIsShow: true,
      data_index: e.currentTarget.dataset.de
    });
  },

  datePickerOnSureClick: function (e) {
    if (this.data.data_index == 1) {
      this.setData({
        date: `${e.detail.value[0]}年${e.detail.value[1]}月${e.detail.value[2]}日`,
        datePickerValue: e.detail.value,
        datePickerIsShow: false,
      })
    } else {
      this.setData({
        date1: `${e.detail.value[0]}年${e.detail.value[1]}月${e.detail.value[2]}日`,
        datePickerValue: e.detail.value,
        datePickerIsShow: false,
      })
    }
  },
})