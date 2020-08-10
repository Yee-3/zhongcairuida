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
  auth(){
    wx.navigateTo({
      url: '../m-qiyezhuce/m-qiyezhuce?id=1',
    })
  },
  gangwei(e) {
    console.log(e)
    wx.navigateTo({
      url: '../l-qiyezhongxin-zpgw-shz/l-qiyezhongxin-zpgw-shz?id='+e.currentTarget.dataset.id,
    })
  },
  qiuzhi() {
    this.tog.show()
  },
  cancel() {
    this.tog.show()
  },
  confirm() {
    // this.data.app.http({
    //   url: '/logout',
    //   dengl: true,
    //   data: {},
    //   success(res) {
    //     if(res.data.code==200){
    //       wx.setStorageSync('Authorization','')
    //       wx.setStorageSync('userInfo','')
    //     }
    //   }
    // })
    console.log('sdfadf')
    wx.switchTab({
      url: '../m-shouye/m-shouye',
    })
  },
  tuichu() {
    this.data.app.http({
      url: '/logout',
      dengl: true,
      data: {},
      success(res) {
        if(res.data.code==200){
          wx.setStorageSync('Authorization','')
          wx.setStorageSync('userInfo','')
          wx.showToast({
            title: '您已退出登录'
          })
        }
        // this.onLoad()
        console.log(this.data.user)
      }
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
    wx.hideHomeButton({
      success: function () {
        console.log("hide home success");
      },
      fail: function () {
        console.log("hide home fail");
      },
      complete: function () {
        console.log("hide home complete");
      },
    });
    const app = getApp().globalData
    var that = this
    app.http({
      type:true,
      url: '/getCompany',
      dengl: true,
      data: {},
      success(res) {
        console.log(res)
        that.setData({
          user:res.data.rdata.ctrlCompany
        })
      }
    })
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