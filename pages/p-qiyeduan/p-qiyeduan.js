// pages/p-qiyeduan/p-qiyeduan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPage: 1,
    loadingType: 0,
    contentText: {
      contentdown: "上拉显示更多",
      contentrefresh: "正在加载...",
      contentnomore: "就这么多了~"
    },
    app: getApp().globalData,
    recomList: [],
    imgList: [],
    companyId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.tab = this.selectComponent("#tab");
    var that = this
    if(wx.getStorageSync('companyId')){

      this.setData({
        companyId:wx.getStorageSync('companyId')
      })
    }
    wx.showNavigationBarLoading()
    this.data.app.http({
      type: true,
      url: '/indexCom/getIndex',
      data: {
        limit: 1,
        page: that.data.currentPage
      },
      dengl: true,
      success(res) {
        var arr = res.data.rdata.ctrlResumeList
        var myDate = new Date()
        if (arr.length > 0) {
          arr.map(function (val, i) {
            var arrs = val.ctrlWorkDTOS
            if (arrs.length > 0) {
              arrs.map(function (vals, is) {
                console.log(vals)
                var date1 = vals.startTime.substring(0, 10)
                var date = vals.endTime.substring(0, 10)
                let start = new Date(date1.replace(/\-/g, "/"));
                let end = new Date(date.replace(/\-/g, "/"));
                let startYear = start.getFullYear();
                let startMonth = start.getMonth();
                let endYear = end.getFullYear();
                let endMonth = end.getMonth();
                let monthCount = (endYear - startYear) * 12 + endMonth - startMonth;
                var val = (monthCount / 12).toString().split(".")
                var value = (val[0] == 0 ? '' : val[0] + '年') + (val[1] ? val[1] + '个月' : '')
                console.log(value)
                vals.timeVal = value
                console.log(vals.timeVal, value)
              })
            }
          })
        }
        that.setData({
          imgList: res.data.rdata.ctrlBannerList,
          recomList: res.data.rdata.ctrlResumeList,
        })
        console.log(res.data.rdata.ctrlResumeList)
        if (res.data.rdata.ctrlResumeList.length < 10) {
          that.setData({
            loadingType: 2
          })
        } else {
          that.setData({
            loadingType: 0
          })
        }
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh()
      }
    })
  },
  // more(){
  //   wx.navigateTo({
  //     url: '../d-hailiangrencai/d-hailiangrencai?id=2',
  //   })
  // },
  person() {
    wx.navigateTo({
      url: '../d-hailiangrencai/d-hailiangrencai',
    })
  },
  resume() {
    var id=this.data.companyId
    wx.navigateTo({
      url: '../e-jinzhunjianli/e-jinzhunjianli?id='+id,
    })
  },
  entry() {
    wx.navigateTo({
      url: '../d-hailiangrencai/d-hailiangrencai?id=' + 1,
    })
  },
  detail(e) {
    wx.navigateTo({
      url:'../c-hailiangjianlixq/c-hailiangjianlixq?id=' + e.currentTarget.dataset.id,
    })
  },
  qyRen() {
    wx.navigateTo({
      url: '../m-qiyezhuce/m-qiyezhuce',
    })
  },
  jiazai(data) {
    var that = this
    this.setData({
      currentPage: that.data.currentPage + 1
    })
    if (this.data.loadingType != 0) {
      //loadingType!=0;直接返回
      return false;
    }
    this.setData({
      loadingType: 1
    })
    wx.showNavigationBarLoading()
    this.data.app.http({
      type: true,
      url: '/indexCom/getIndex',
      dengl: true,
      data: data,
      success(res) {
        that.setData({
          recomList: that.data.recomList.concat(res.data.rdata.ctrlResumeList)
        })

        var arr = res.data.rdata.ctrlResumeList
        var myDate = new Date()
        if (arr.length > 0) {
          arr.map(function (val, i) {
            var arrs = val.ctrlWorkDTOS
            if (arrs.length > 0) {
              arrs.map(function (vals, is) {
                console.log(vals)
                var date1 = vals.startTime.substring(0, 10)
                var date = vals.endTime.substring(0, 10)
                let start = new Date(date1.replace(/\-/g, "/"));
                let end = new Date(date.replace(/\-/g, "/"));
                let startYear = start.getFullYear();
                let startMonth = start.getMonth();
                let endYear = end.getFullYear();
                let endMonth = end.getMonth();
                let monthCount = (endYear - startYear) * 12 + endMonth - startMonth;
                var val = (monthCount / 12).toString().split(".")
                var value = (val[0] == 0 ? '' : val[0] + '年') + (val[1] ? val[1] + '个月' : '')
                vals.timeVal = value
              })
            }
          })
        }
        if (res.data.rdata.ctrlResumeList.length < 10) {
          that.setData({
            loadingType: 2
          })
          wx.hideNavigationBarLoading()
        } else {
          that.setData({
            loadingType: 0
          })
        }
        wx.hideNavigationBarLoading()
      }
    })
  },
  showTab() {},
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
    var that = this,
      data = {
        limit: 1,
        page: that.data.currentPage
      }
    this.jiazai(data)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})