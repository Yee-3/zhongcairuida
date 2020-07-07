// pages/a-gangweifabu/a-gangweifabu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    natureContent: [{
        item: '全职'
      },
      {
        item: '兼职'
      },
      {
        item: '实习'
      },
      {
        item: '全职/兼职'
      }
    ],
    style: '',
    zhiValue: '请选择',
    expValue: '请选择',
    eduValue: '请选择',
    salaValue: '请选择',
    nameValue: '请选择',
    welValue: [{}],
    experContent: [{
        item: '应届生'
      },
      {
        item: '1~3年'
      },
      {
        item: '3~5年'
      },
      {
        item: '5~10年'
      },
      {
        item: '10年以上'
      },
      {
        item: '不限'
      },
    ],
    type: '',
    educatContent: [{
        item: '大专'
      },
      {
        item: '本科'
      }, {
        item: '硕士'
      },
      {
        item: '博士'
      },
      {
        item: '不限'
      },
    ],
    salaContent: [{
        item: '3K以下'
      },
      {
        item: '3K~5K'
      },
      {
        item: '5K~10K'
      },
      {
        item: '10K~15K'
      },
      {
        item: '15K~20K'
      },
      {
        item: '20K~25K'
      },
      {
        item: '25K~50K'
      },
      {
        item: '面议'
      },
    ],
    welContent: [{
        item: '14薪'
      },
      {
        item: '五险一金'
      },
      {
        item: '节假日福利'
      },
      {
        item: '带薪年病假'
      },
      {
        item: '交通补贴'
      },
      {
        item: '餐补'
      },
      {
        item: '年终奖'
      },
      {
        item: '弹性工作制度'
      },
    ],
    ty: '1',
    nameContent: [{
        item: '销售/商务拓展'
      },
      {
        item: '人事/财务/行政/法务'
      },
      {
        item: '互联网'
      },
      {
        item: '运营'
      },
      {
        item: '通讯'
      },
      {
        item: '软件'
      },
      {
        item: '硬件'
      },
      {
        item: '技术'
      },

    ],
    tContent: [{
        item: '销售/商务拓展'
      },
      {
        item: '人事/财务/行政/法务'
      },
      {
        item: '互联网'
      },
      {
        item: '运营'
      },
      {
        item: '通讯'
      },
      {
        item: '软件'
      },
      {
        item: '硬件'
      },
      {
        item: '技术'
      },

    ],
    sContent: [{
        item: '销售/商务拓展'
      },
      {
        item: '人事/财务/行政/法务'
      },
      {
        item: '互联网'
      },
      {
        item: '运营'
      },
      {
        item: '通讯'
      },
      {
        item: '软件'
      },
      {
        item: '硬件'
      },
      {
        item: '技术'
      },

    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.spring = this.selectComponent("#spring");
    this.exp = this.selectComponent("#exp");
    this.edu = this.selectComponent("#edu");
    this.sala = this.selectComponent("#sala");
    this.wel = this.selectComponent("#wel");
    this.name = this.selectComponent("#name");
  },
  zhiwei(e) {
    console.log(e)
    this.setData({
      type: e.currentTarget.dataset.type
    })
    this.spring.show()
    this.spring.setData({
      style: 'margin-right:17rpx'
    })
  },
  exper(e) {
    this.setData({
      type: e.currentTarget.dataset.type
    })
    this.exp.show()
    this.exp.setData({
      style: 'margin-right:30rpx;min-width:180rpx'
    })
  },
  educat(e) {
    this.setData({
      type: e.currentTarget.dataset.type
    })
    this.edu.show()
    this.edu.setData({
      style: 'margin-right:25rpx;'
    })
  },
  salary(e) {
    this.setData({
      type: e.currentTarget.dataset.type
    })
    this.sala.show()
    this.sala.setData({
      style: 'margin-right:50rpx;min-width:170rpx'
    })
  },
  welfare(e) {
    this.setData({
      type: e.currentTarget.dataset.type
    })
    this.wel.show()
    this.wel.setData({
      style: 'margin-right:20rpx;'
    })
  },
  handleConfirm() {
    if (this.data.type == 1) {
      this.spring.show()
      var index = this.spring.data.edu
      this.setData({
        zhiValue: this.data.natureContent[index].item
      })
    } else if (this.data.type == 2) {
      this.exp.show()
      var index = this.exp.data.edu
      this.setData({
        expValue: this.data.experContent[index].item
      })
    } else if (this.data.type == 3) {
      this.edu.show()
      var index = this.edu.data.edu
      this.setData({
        eduValue: this.data.educatContent[index].item
      })
    } else if (this.data.type == 4) {
      this.sala.show()
      var index = this.sala.data.edu
      this.setData({
        salaValue: this.data.salaContent[index].item
      })
    } else {
      this.wel.show()
      var index = this.wel.data.edu
      this.setData({
        welValue: this.data.welValue.push(this.data.welContent[index].item)
      })
      console.log(this.data.welValue)
    }
  },
  handleCancel() {
    if (this.data.type == 1) {
      this.spring.show()
    } else if (this.data.type == 2) {
      this.exp.show()
    } else if (this.data.type == 3) {
      this.edu.show()
    } else {
      this.sala.show()
    }
  },
  types(e) {
    this.setData({
      ty: e.currentTarget.dataset.index
    })
  },
  zhiName(){
    this.name.position()
  },
  naCancel() {
    this.name.setData({
      isAdd: false,
      isTwo: false

    })
  },
  naConfirm(){
   this.name.position()
      var index = this.name.data.ind2
      this.setData({
        nameValue: this.data.sContent[index].item
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