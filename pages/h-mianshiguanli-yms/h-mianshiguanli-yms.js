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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      companyId: wx.getStorageSync('companyId')
    })
    console.log(wx.getStorageSync('companyId'))
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
    this.data.app.http({
      type: true,
      url: url,
      dengl: true,
      method: 'POST',
      data: data,
      success(res) {
        console.log(res.data.rdata)
        that.setData({
          msList: res.data.rdata
        })
      }
    })
  },
  toggleTitle(e) {
    console.log(e)
    this.setData({
      idn: e.currentTarget.dataset.index,
      ind: 1,
      ind1: 1
    })
    var x = e.currentTarget.dataset.index,
      // url = x == 1 ? '/interviewManager/getInterviewList' : x == 2 ? '/interviewManager/getInductionList' : '/interviewManager/getSuccessList',
      url = 'interviewManager/getInterviewList',
      status = (x == 1 || x == 2) ? 'P' : '1',
      that = this,
      data = {
        companyId: that.data.companyId,
        status: 'S'
        // status: status
      }

    this.reword(url, data)

  },
  toggleMin(e) {
    console.log(e)
    this.setData({
      ind: e.currentTarget.dataset.index
    })
    var x = this.data.idn,
      i = e.currentTarget.dataset.index,
      that = this,
      status = i == 1 ? 'p' : i == 2 ? 'Y' : i == 3 ? 'N' : 'S',
      // url = x == 1 ? '/interviewManager/getInterviewList' : '/interviewManager/getInductionList' 
      url = 'interviewManager/getInterviewList'
    if (x == 1) {
      var data = {
        companyId: that.data.companyId,
        // status: status
        status: 'S'
      }
      that.reword(url, data)
    } else if (x == 2) {
      var data = {
        companyId: that.data.companyId,
        // status: status
        status: 'S'
      }
      that.reword(url, data)
    }
    console.log(this.data.ind)
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
    console.log(e)
    var that = this
    if (this.data.ind == 4) {
      that.setData({
        datePickerIsShow: true
      })
    } else if (this.data.ind == 2 && this.data.idn == 1) {
      console.log('执行')
      // 已面试
      this.data.app.http({
        type: true,
        url: '/interviewManager/interviewSuccess',
        dengl: true,
        method: 'POST',
        data: {
          id: e.currentTarget.dataset.id
        },
        success(res) {
          console.log(res)
          if (res.data.code == 200) {
            that.onLoad()
          }
        }
      })
    }
    // else if(this.data.ind)
  },
  refuse(e) {
    var that = this
    // 未面试
    if (this.data.idn == 1 && this.data.ind == 2) {
      this.data.app.http({
        type: true,
        url: '/interviewManager/interviewfailed',
        dengl: true,
        method: 'POST',
        data: {
          id: e.currentTarget.dataset.id
        },
        success(res) {
          console.log(res)
          if (res.data.code == 200) {
            that.onLoad()
          }
        }
      })
    }
  },
  // 离职
  quit(e){
    var that=this
    this.data.app.http({
      type: true,
      url: '/interviewManager/leavePosition',
      dengl: true,
      method: 'POST',
      data: {
        id: e.currentTarget.dataset.id
      },
      success(res) {
        console.log(res)
        if (res.data.code == 200) {
          that.onLoad()
        }
      }
    })
  },
  invitTo() {
    this.setData({
      datePickerIsShow: true
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
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  dele() {
    var del = this.data.isDel
    this.setData({
      isDel: !del
    })
  },
  del_cancle() {
    this.dele()
  },
  del_confirm() {
    this.dele
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