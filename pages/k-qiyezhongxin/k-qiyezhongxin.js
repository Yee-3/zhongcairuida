// pages/q-wode/q-wode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dianhua: 'display:none',
    app: getApp().globalData,
    kefuPhone: {},
    user:{},
    content: '是否切换为求职身份'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.tog = this.selectComponent("#tog");
    console.log(options,wx.getStorageSync('userInfo'))
    this.setData({
      user:wx.getStorageSync('userInfo').ctrlResumeDTO
    })
    var that = this
    this.data.app.http({
      url: '/Other/hotline',
      dengl: true,
      data: {},
      success(res) {
        console.log(res.data.rdata)
        that.setData({
          kefuPhone: res.data.rdata
        })
      }
    })
  },
  gangwei() {
    wx.navigateTo({
      url: '../l-qiyezhongxin-zpgw-shz/l-qiyezhongxin-zpgw-shz',
    })
  },
  qiuzhi() {
    this.tog.show()
  },
  cancel() {
    this.tog.show()
  },
  confirm() {
    // wx.removeStorage('Authorization')
    // let _this = this;
    // const app = getApp().globalData
    // wx.login({
    //   success(res) {
    //     var code = res.code
    //     wx.getUserInfo({
    //       success: function (res) {
    //         // console.log(res)           
    //         if (code) {
    //           _this.setData({
    //             nickName: res.userInfo.nickName,
    //             avatarUrl: res.userInfo.avatarUrl,
    //             // iv: res.iv,
    //             // encryptedData: res.encryptedData
    //           })
    //           app.http({
    //             url: '/oauth/login',
    //             method: 'POST',
    //             dengl: false,
    //             header: true,
    //             type:2,
    //             data: JSON.stringify({
    //               code: code,
    //               encryptedData: res.encryptedData,
    //               iv: res.iv,
    //               type:2,
    //             }),
    //             success(res) {
    //               if (res.data.rdata) {
    //                 wx.setStorageSync('Authorization', res.data.rdata.ctrlToken.token)
    //                 wx.setStorageSync('userInfo', res.data.rdata)
    //                 console.log(wx.getStorageSync('Authorization')),
    //                   wx.showToast({
    //                     title: '登录成功'
    //                   })
    //                 setTimeout(function () {
    //                   wx.reLaunch({
    //                     url: '../p-qiyeduan/p-qiyeduan'
    //                   })
    //                 }, 1000)
    //               }
    //             }
    //           })
    //         }
    //       },
    //       fail: function (err) {
    //         console.log(err)
    //       }
    //     })
    //     console.log(res)
    //   }
    // });
    console.log('sdfadf')
    wx.switchTab({
      url: '../m-shouye/m-shouye',
    })
  },
  about() {
    this.tog.show()
    wx.navigateTo({
      url: '../b-guanyuwomen/b-guanyuwomen',
    })
  },
  phone() {
    wx.makePhoneCall({
      phoneNumber: this.data.kefuPhone.phone
    })
  },
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