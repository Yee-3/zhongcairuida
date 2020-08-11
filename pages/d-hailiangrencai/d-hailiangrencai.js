// pages/d-hailiangrencai/d-hailiangrencai.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '综合排序',
    animationCon: {},
    animationData: {},
    animationMor: {},
    style: '',
    zhiList: [],
    moneyList:[],
    expList:[],
    codList:[],
    currentPage: 1,
    loadingType: 0,
    contentText: {
      contentdown: "上拉显示更多",
      contentrefresh: "正在加载...",
      contentnomore: "就这么多了~"
    },
    app: getApp().globalData,
    recomList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var data={
      limit: 1,
      page: this.data.currentPage
    }
    this.reword(data)
    console.log(options)
    var that = this
    if (options.id == 1) {
      wx.setNavigationBarTitle({
        title: '即刻入职'
      })
    }else{
    }
    this.zhiwei = this.selectComponent("#zhiwei");
    this.zonghe = this.selectComponent("#zonghe");
    this.more = this.selectComponent("#more");
    this.data.app.http({
      url: '/selects/position',
      dengl: true,
      data: {},
      success(res) {
        console.log(res.data.rdata)
        that.setData({
          zList: res.data.rdata[0].treeDTOS
        })
      }
    }),
    // 薪资
    this.data.app.http({
      url:'/selects/expect_money',
      dengl:true,
      data:{},
      success(res){
        that.setData({
          moneyList:res.data.rdata
        })
      }
    })
    // 学历
    this.data.app.http({
      url:'/selects/school_record',
      dengl:true,
      data:{},
      success(res){
        that.setData({
          codList:res.data.rdata
        })
      }
    })
    // 工作经验
    this.data.app.http({
      url:'/selects/work_exe',
      dengl:true,
      data:{},
      success(res){
        that.setData({
          expList:res.data.rdata
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
  toggleZong() {
    if (this.zhiwei.data.isAdd) {
      this.toggleZhi()
    }
    if (this.more.data.isAdd_F) {
      this.toggleMor()
    }
    this.zonghe.toggleZong()
    this.zonghe.setData({
      style: 'top:82rpx',
      styleT: 'top:200rpx'
    })
    var nowShow = this.zonghe.data.isCon;
    //创建动画
    var animation = wx.createAnimation({
      timingFunction: "ease"
    })
    this.animation = animation;
    if (nowShow) {
      animation.rotate(180).step();
      this.setData({
        animationCon: animation.export()
      })
    } else {
      animation.rotate(0).step();
      this.setData({
        animationCon: animation.export()
      })
    }
  },
  togValue() {
    this.setData({
      value: this.zonghe.data.value
    })
    this.toggleZong()
  },
  toggleZhi() {
    if (this.zonghe.data.isCon) {
      this.toggleZong()
    }
    if (this.more.data.isAdd_F) {
      this.toggleMor()
    }
    this.zhiwei.position()
    this.zhiwei.setData({
      style: 'top:82rpx',
      styleT: 'top:200rpx'
    })
    var nowShow = this.zhiwei.data.isAdd;
    //创建动画
    var animation = wx.createAnimation({
      timingFunction: "ease"
    })
    this.animation = animation;
    if (nowShow) {
      animation.rotate(180).step();
      this.setData({
        animationData: animation.export()
      })
    } else {
      animation.rotate(0).step();
      this.setData({
        animationData: animation.export()
      })
    }
  },
  tog() {
    var that=this
    this.toggleZhi()
  },
  toggleMor() {
    if (this.zhiwei.data.isAdd) {
      this.toggleZhi()
    }
    if (this.zonghe.data.isCon) {
      this.toggleZong()
    }
    this.more.position2()
    this.more.setData({
      style: 'top:82rpx',
      styleT: 'top:200rpx'
    })
    var nowShow = this.more.data.isAdd_F;
    //创建动画
    var animation = wx.createAnimation({
      timingFunction: "ease"
    })
    this.animation = animation;
    if (nowShow) {
      animation.rotate(180).step();
      this.setData({
        animationMor: animation.export()
      })
    } else {
      animation.rotate(0).step();
      this.setData({
        animationMor: animation.export()
      })
    }
  },
  togMore() {
    this.toggleMor()
  },
  detail() {
    wx.navigateTo({
      url: '../c-hailiangjianlixq/c-hailiangjianlixq',
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