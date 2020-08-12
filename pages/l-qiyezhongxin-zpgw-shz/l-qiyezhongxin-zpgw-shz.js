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
    passList: [],
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

    var data = {
      companyId: that.data.id,
      limit: 10,
      page: this.data.currentPage,
      status: 1
    }
    this.reword(data)
  },
  reword(data) {
    var that = this
    wx.showNavigationBarLoading()
    this.data.app.http({
      type: true,
      url: '/company/queryJobPosition',
      dengl: true,
      method: 'POST',
      data: data,
      success(res) {
        function jiance(x) {
          return x < 10 ? '0' + x : x
        }
        var arr = res.data.rdata
        var myDate = new Date()
        if (arr.length > 0) {
          arr.map(function (val, i) {
            console.log(val)
            if (val.createTime) {
              var date1 = new Date(val.createTime.substring(0, 10))
              var date = new Date(myDate.getFullYear() + '-' + jiance((myDate.getMonth() + 1)) + '-' + jiance(myDate.getDate()));
              var day = parseInt((date - date1) / 1000 / 60 / 60 / 24)
              var value = parseInt(day / 30) < 1 ? day + '天前' : parseInt(day / 30) + '月前'
              val.timeVal = value
            }
          })
        }

        console.log(res.data.rdata)
        that.setData({
          recomList: res.data.rdata
        })

        if (res.data.rdata.length < 1) {
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
      type: true,
      url: '/company/queryJobPosition',
      dengl: true,
      data: data,
      method: 'POST',
      success(res) {
        that.setData({
          recomList: that.data.recomList.concat(res.data.rdata)
        })

        function jiance(x) {
          return x < 10 ? '0' + x : x
        }
        var arr = res.data.rdata
        var myDate = new Date()
        if (arr.length > 0) {
          arr.map(function (val, i) {
            console.log(val)
            if (val.createTime) {
              var date1 = new Date(val.createTime.substring(0, 10))
              var date = new Date(myDate.getFullYear() + '-' + jiance((myDate.getMonth() + 1)) + '-' + jiance(myDate.getDate()));
              var day = parseInt((date - date1) / 1000 / 60 / 60 / 24)
              var value = parseInt(day / 30) < 1 ? day + '天前' : parseInt(day / 30) + '月前'
              val.timeVal = value
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
    var that = this
    console.log(e)
    this.setData({
      idn: e.currentTarget.dataset.index
    })
    if (this.data.idn == 1) {
      this.setData({
        currentPage: 1
      })
      var data = {
        companyId: that.data.id,
        limit: 10,
        page: this.data.currentPage,
        status: 1
      }
      this.jiazai(data)
    } else if (this.data.idn == 2) {
      this.setData({
        currentPage: 1
      })
      var data = {
        companyId: that.data.id,
        limit: 10,
        page: this.data.currentPage,
        status: 0
      }
      this.jiazai(data)
    } else {
      this.setData({
        currentPage: 1
      })
      var data = {
        companyId: that.data.id,
        limit: 10,
        page: this.data.currentPage,
        status: 2
      }
      this.jiazai(data)
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
    var that=this
    if (e.currentTarget.dataset.index == 1) {
      this.setData({
        currentPage: 1
      })
      var data = {
        companyId: that.data.id,
        limit: 10,
        page: this.data.currentPage,
        status: 1
      }
      this.reword(data)
    } else if (e.currentTarget.dataset.index == 2) {
      this.setData({
        currentPage: 1
      })
      var data = {
        companyId: that.data.id,
        limit: 10,
        page: this.data.currentPage,
        status: 0
      }
      this.reword(data)
    } else {
      this.setData({
        currentPage: 1
      })
      var data = {
        companyId: that.data.id,
        limit: 10,
        page: this.data.currentPage,
        status: 2
      }
      this.reword(data)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})