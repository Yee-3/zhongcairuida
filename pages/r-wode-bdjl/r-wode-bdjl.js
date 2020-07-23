// pages/r-wode-bdjl/r-wode-bdjl.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    app :getApp().globalData,
    valueCon:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  change(e){
    console.log(e)
    this.setData({
      valueCon:e.detail.value
    })
    
  },
  submit() {
    var that=this
    this.data.app.http({
      url:'/resume/binding',
      dengl:true,
      method:'post',
      data:{
        phone:that.data.valueCon
      },
      success(res){
        console.log(res,that.data.valueCon)
        if (res.data.code==200) {
          // 及时更新上层页面
          var pages = getCurrentPages();
          var prevPage = pages[pages.length - 2]; //上一个页面
          prevPage.setData({
            resume: []
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