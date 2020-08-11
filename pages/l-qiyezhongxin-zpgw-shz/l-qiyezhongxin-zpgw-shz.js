// pages/l-qiyezhongxin-zpgw-shz/l-qiyezhongxin-zpgw-shz.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idn: '1',
    id: '452612374886469632',
    currentPage: 1,
    loadingType: 0,
    contentText: {
      contentdown: "上拉显示更多",
      contentrefresh: "正在加载...",
      contentnomore: "就这么多了~"
    },
    app: getApp().globalData,
    recomList: [],
    passList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
 
      // this.setData({
      //   id: options.id
      // })
    
    this.data.app.http({
      url: '/company/queryJobPosition',
      dengl: true,
      method: 'POST',
      data: {
        companyId:that.data.id,
        limit:10,
        page:1,
        status:1
      },
      success(res) {
        console.log(res)
        that.setData({
          passList:res.data.rdata
        })
      }
    })
  },
  reword(data) {
    var that = this
    wx.showNavigationBarLoading()
    this.data.app.http({
      url: '/indexCom/getTalent',
      dengl: true,
      method: 'POST',
      data: data,
      success(res) {
        console.log(res)
        var arr = res.data.rdata
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
              })
            }
          })
        }
        console.log(res.data.rdata)
        that.setData({
          recomList: res.data.rdata
        })

        if (res.data.rdata.length <1) {
          that.setData({
            loadingType: 2
          })
        }
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh()
      }
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
      url: '/indexCom/getTalent',
      dengl: true,
      data: data,
      method: 'POST',
      success(res) {
        that.setData({
          recomList: that.data.recomList.concat(res.data.rdata)
        })

        var arr = res.data.rdata
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
        if (res.data.rdata.length < 1) {
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
  release() {
    wx.navigateTo({
      url: '../a-gangweifabu/a-gangweifabu?id=' + this.data.id,
    })
  },
  toggleShen(e) {
    console.log(e)
    this.setData({
      idn: e.currentTarget.dataset.index
    })
    if( e.currentTarget.dataset.index==1){
      this.data.app.http({
        url: '/company/queryJobPosition',
        dengl: true,
        method: 'POST',
        data: {
          companyId:that.data.id,
          limit:10,
          page:1,
          status:1
        },
        success(res) {
          console.log(res)
          that.setData({
            passList:res.data.rdata
          })
        }
      })
    }else if( e.currentTarget.dataset.index==2){
      
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

  }
})