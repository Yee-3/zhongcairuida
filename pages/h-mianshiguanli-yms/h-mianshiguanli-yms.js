// pages/h-mianshiguanli-yms/h-mianshiguanli-yms.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idn: 1,
    ind: 1,
    ind1: 1,
    isDel: false,
    app: getApp().globalData,
    companyId: '',
    msList: [],
    datePickerValue: ['', '', ''],
    datePickerIsShow: false,
    currentPage: 1,
    loadingType: 0,
    contentText: {
      contentdown: "上拉显示更多",
      contentrefresh: "正在加载...",
      contentnomore: "就这么多了~"
    },
    id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      companyId: wx.getStorageSync('companyId')
    })
    var that = this,
      url = '/interviewManager/getInterviewList',
      data = {
        companyId: that.data.companyId,
        status: 'S'
      }
    this.reword(url, data)
  },
  reword(url, data) {
    var that = this
    wx.showNavigationBarLoading()
    this.data.app.http({
      type: true,
      url: url,
      dengl: true,
      method: 'POST',
      data: data,
      success(res) {
        // 回到顶部
        wx.pageScrollTo({
          scrollTop: 0,
          duration: 300
        })
        that.setData({
          msList: res.data.rdata
        })
        if (res.data.rdata.length < 10) {
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
      url: url,
      dengl: true,
      method: 'POST',
      data: data,
      success(res) {
        that.setData({
          msList: that.data.msList.concat(res.data.rdata)
        })
        if (res.data.rdata.length < 10) {
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
  toggleTitle(e) {
    this.setData({
      idn: e.currentTarget.dataset.index,
      ind: 1,
      ind1: 1
    })
    var x = e.currentTarget.dataset.index,
      url = x == 1 ? '/interviewManager/getInterviewList' : x == 2 ? '/interviewManager/getInductionList' : '/interviewManager/getSuccessList',
      // url = 'interviewManager/getInterviewList',
      status = (x == 1 || x == 2) ? 'P' : '1',
      that = this,
      data = {
        companyId: that.data.companyId,
        // status: 'S'
        status: status
      }

    this.reword(url, data)

  },
  toggleMin(e) {
    this.setData({
      ind: e.currentTarget.dataset.index
    })
    var x = this.data.idn,
      i = e.currentTarget.dataset.index,
      that = this,
      status = i == 1 ? 'p' : i == 2 ? 'Y' : i == 3 ? 'N' : 'S',
      url = x == 1 ? '/interviewManager/getInterviewList' : '/interviewManager/getInductionList' 
      // url = 'interviewManager/getInterviewList'
    if (x == 1) {
      var data = {
        companyId: that.data.companyId,
        status: status
        // status: 'S'
      }
      that.reword(url, data)
    } else if (x == 2) {
      var data = {
        companyId: that.data.companyId,
        status: status
        // status: 'S'
      }
      that.reword(url, data)
    }
  },
  toggleMin1(e) {
    this.setData({
      ind1: e.currentTarget.dataset.index
    })
    var url = '/interviewManager/getSuccessList',
      //  var url = '/interviewManager/getInterviewList',
      that = this,
      status = e.currentTarget.dataset.index == 1 ? '1' : '2',
      data = {
        companyId: that.data.companyId,
        status: status
        // status: '1'
        // status: 'S'
      }
    this.reword(url, data)
  },
  invit(e) {
    var that = this
    if (this.data.idn == 1) {
      if (this.data.ind == 2) {
        // 已面试
        that.data.app.http({
          type: true,
          url: '/interviewManager/interviewSuccess',
          dengl: true,
          method: 'POST',
          data: {
            id: e.currentTarget.dataset.id
          },
          success(res) {
            if (res.data.code == 200) {
              that.onLoad()
            }
          }
        })
      }else{
        that.setData({
          datePickerIsShow: true
        })
      }
    }else{
      // 已入职
      this.data.app.http({
        type: true,
        url: '/interviewManager/inductionSuccess',
        dengl: true,
        method: 'POST',
        data: {
          id: e.currentTarget.dataset.id
        },
        success(res) {
          if (res.data.code == 200) {
            that.onLoad()
          }
        }
      })
    }
    // if (this.data.ind == 4) {
    //   that.setData({
    //     datePickerIsShow: true
    //   })
    // } else if (this.data.ind == 2 && this.data.idn == 1) {

    // }
    // else if(this.data.ind)
  },
  refuse(e) {
    var that = this
    // 未面试
    if (this.data.idn == 1) {
      var url = this.data.ind == 2 ? '/interviewManager/interviewfailed' : '/interviewManager/interviewPassFail'
      that.data.app.http({
        type: true,
        url: url,
        dengl: true,
        method: 'POST',
        data: {
          id: e.currentTarget.dataset.id
        },
        success(res) {
          if (res.data.code == 200) {
            that.onLoad()
          }
        }
      })
    } else {
      that.data.app.http({
        type: true,
        url: '/interviewManager/inductionFail',
        dengl: true,
        method: 'POST',
        data: {
          id: e.currentTarget.dataset.id
        },
        success(res) {
          if (res.data.code == 200) {
            that.onLoad()
          }
        }
      })
    }
  },
  // 离职
  quit(e) {
    var that = this
    this.data.app.http({
      type: true,
      url: '/interviewManager/leavePosition',
      dengl: true,
      method: 'POST',
      data: {
        id: e.currentTarget.dataset.id
      },
      success(res) {
        if (res.data.code == 200) {
          that.onLoad()
        }
      }
    })
  },
  invitTo(e) {
    this.setData({
      datePickerIsShow: true,
      id: e.currentTarget.dataset.id
    })
  },
  bindDateChange1: function (e) {
    this.setData({
      datePickerIsShow: true,
      data_index: e.currentTarget.dataset.de
    });
  },

  datePickerOnSureClick: function (e) {
    if (this.data.data_index == 1) {
      this.setData({
        date: `${e.detail.value[0]}年${e.detail.value[1]}月${e.detail.value[2]}日`,
        datePickerValue: e.detail.value,
        datePickerIsShow: false,
      })
    } else {
      this.setData({
        date1: `${e.detail.value[0]}年${e.detail.value[1]}月${e.detail.value[2]}日`,
        datePickerValue: e.detail.value,
        datePickerIsShow: false,
      })
    }
    var that = this
    // 再次面试
    if (!this.data.datePickerValue) {
      wx.showToast({
        title: '请选择面试时间',
        icon: 'none'
      })
    } else {
      if (this.data.idn == 1) {
        var url=that.data.ind==3?'/interviewManager/interviewTryAgain':that.data.ind==4?'/interviewManager/interviewPass':''
        that.data.app.http({
          type: true,
          url:url,
          dengl: true,
          method: 'POST',
          data: {
            id: that.data.id,
          },
          success(res) {
            if (res.data.code == 200) {
              that.onLoad()
            }
          }
        })
      } else {
        that.data.app.http({
          type: true,
          url: '/interviewManager/inductionTryAgain',
          dengl: true,
          method: 'POST',
          data: {
            id: that.data.id
          },
          success(res) {
            console.log(res)
            if (res.data.code == 200) {
              that.onLoad()
            }
          }
        })

      }
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  dele(e) {
    var del = this.data.isDel
    this.setData({
      isDel: !del,
      // id: e.currentTarget.dataset.id
    })
  },
  del_cancle() {
    this.dele()
  },
  // 删除
  del_confirm() {
    this.dele()
    var that=this
    this.data.app.http({
      type:true,
      url:'/interviewManager/delete',
      dengl:true,
      method:'POST',
      data:{
        // id:that.data.id
      },
      success(res){
        console.log(res.data.rdata)
    
      }
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})