// pages/q-wode/q-wode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dianhua: 'display:none',
    app: getApp().globalData,
    kefuPhone: {},
    user: {},
    show: true,
    content: '您已注册企业端信息，是否重新注册？'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.tog = this.selectComponent("#tog");
    const app = getApp().globalData
    // app.http({  
    //     url: '/oauth/login',
    //     dengl:true,
    //     success

    // })
    this.setData({
      user: wx.getStorageSync('userInfo').ctrlResumeDTO
    })
    var that = this
    this.data.app.http({
      url: '/Other/hotline',
      dengl: true,
      data: {},
      success(res) {
        that.setData({
          kefuPhone: res.data.rdata
        })
      }
    })

  },

  tanchuang_2: function () {
    var that = this
    this.setData({
      dianhua: 'display:block'
    })

  },
  quxiao2: function () {
    this.setData({
      dianhua: 'display:none'
    })
  },
  create() {
    wx.checkSession({
      success(res) {
        wx.navigateTo({
          url: '../s-wodejianli/s-wodejianli',
        })
      },
      fail() {
        // var that = this;
        wx.navigateTo({
          url: '../login/index',
        })
      }
    })
  },
  tuichu() {
    this.data.app.http({
      url: '/logout',
      dengl: true,
      data: {},
      success(res) {
        wx.removeStorageSync('userInfo')
      }
    })
  },
  user1() {
    wx.navigateTo({
      url: '../r-wode-bdjl/r-wode-bdjl',
    })
  },
  base() {
    wx.navigateTo({
      url: '../v-wodejianli-jcxx/v-wodejianli-jcxx',
    })
  },
  phone() {
    wx.makePhoneCall({
      phoneNumber: this.data.kefuPhone.phone
    })
  },
  zhaopin() {
    this.tog.show()
    // wx.redirectTo({
    //   url: '../p-qiyeduan/p-qiyeduan',
    // })
  },
  cancel() {
    wx.redirectTo({
      url: '../m-qiyezhuce/m-qiyezhuce',
    })
  },
  confirm() {
    this.tog.show()
    // wx.removeStorage('Authorization')
    // let _this = this;
    // const app = getApp().globalData
    // wx.login({
    //   success(res) {
    //     var code = res.code
    //     wx.getUserInfo({
    //       success: function (res) {       
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
    //       }
    //     })
    //   }
    // });
    wx.redirectTo({
      url: '../p-qiyeduan/p-qiyeduan',
    })
  },
  about() {
    wx.navigateTo({
      url: '../g-guanyuwomen/g-guanyuwomen',
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