// pages/o-qiyezhuce/o-qiyezhuce.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    natureContent: [],
    classContent: [],
    natValue: '请选择',
    type: '',
    clsValue: '请选择',
    scalValue: '请选择',
    isImg: false,
    img: '',
    imgbox: '',
    zhi_img: '../img/q072.png',
    imgValue: '请上传',
    app: getApp().globalData,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.nature = this.selectComponent("#nature");
    this.cls = this.selectComponent("#cls");
    this.scale = this.selectComponent("#scale");
    var that = this
    // 公司性质
    this.data.app.http({
      url: '/selects/company_nature',
      dengl: true,
      data: {},
      success(res) {
        that.setData({
          natureContent: res.data.rdata
        })
      }
    })
    // 工作类型
    this.data.app.http({
      url: '/selects/company_type',
      dengl: true,
      data: {},
      success(res) {
        that.setData({
          classContent: res.data.rdata
        })
      }
    })

    // 企业规模
    this.data.app.http({
      url: '/selects/company_num',
      dengl: true,
      data: {},
      success(res) {
        that.setData({
          numContent: res.data.rdata
        })
      }
    })

  },
  // 删除图片
  imgDelete1: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.deindex;
    let imgbox = this.data.imgbox;
    imgbox.splice(index, 1)
    that.setData({
      imgbox: imgbox
    });
  },
  // 选择图片
  images(e) {
    var _this = this
    var imgbox = this.data.imgbox
    var picid = e.currentTarget.dataset.pic
    // console.log(imgbox)
    var n = 9
    if (9 > imgbox.length > 0) {
      n = 9 - imgbox.length;
    } else if (imgbox == 9) {
      n = 1
    }
    wx.chooseImage({
      count: n,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        var tempFilePaths = res.tempFilePaths
        if (imgbox.length == 0) {
          imgbox = tempFilePaths
          console.log(imgbox)
        } else if (9 > imgbox.length) {
          imgbox = imgbox.concat(tempFilePaths)
        } else {
          imgbox[picid] = tempFilePaths[0];
        }
        console.log(tempFilePaths)
        // tempFilePath可以作为img标签的src属性显示图片
        _this.setData({
          imgbox: imgbox
        })
      }
    })
  },
  showNat(e) {
    this.nature.show()
    this.nature.setData({
        style: 'margin-right:20rpx;min-width:100rpx;'
      }),
      this.setData({
        type: e.currentTarget.dataset.type
      })
  },
  showClass(e) {
    this.cls.show()
    this.cls.setData({
        style: 'margin-right:20rpx;min-width:100rpx;'
      }),
      this.setData({
        type: e.currentTarget.dataset.type
      })
  },
  showScale(e) {
    this.scale.show()
    this.scale.setData({
        style: 'margin-right:30rpx;min-width:180rpx;'
      }),
      this.setData({
        type: e.currentTarget.dataset.type
      })
  },
  handleConfirm() {
    console.log(4444343)
    if (this.data.type == 1) {
      this.nature.show()
      var index = this.nature.data.index
      this.setData({
        natValue: this.data.natureContent[index].label
      })
    } else if (this.data.type == 2) {
      this.cls.show()
      var index = this.cls.data.index
      this.setData({
        clsValue: this.data.classContent[index].label
      })
    } else {
      this.scale.show()
      var index = this.scale.data.index
      this.setData({
        scalValue: this.data.numContent[index].label
      })
    }
  },
  handleCancel() {
    var that = this
    console.log(this.nature.data.index)
    if (this.data.type == 1) {
      this.nature.show()
      that.nature.setData({
        edu: ''
      })
      console.log(this.nature.data.index)
    } else if (this.data.type == 2) {
      this.cls.show()
      this.cls.setData({
        edu: ''
      })
    } else {
      this.scale.show()
      this.scale.setData({
        edu: ''
      })
    }
  },
  zhiZhao() {
    var _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        _this.setData({
          zhi_img: tempFilePaths
        })
      }
    })
  },
  logoImg() {
    var _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        _this.setData({
          imgValue: '已上传'
        })
      }
    })
  },
  next() {
    wx.switchTab({
      url: '../k-qiyezhongxin/k-qiyezhongxin',
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