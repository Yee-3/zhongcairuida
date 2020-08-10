// pages/s-wodejianli/s-wodejianli.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isF: true,
    isX: true,
    app: getApp().globalData,
    resume: {},
    baseUrl: getApp().globalData.baseUrl,
    time: [],
    times: [],
    schoolT: [],
    book: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(this.data.baseUrl)
    let that = this
    this.data.app.http({
      url: '/resume/getResume',
      dengl: true,
      data: {},
      success(res) {
        console.log(res.data.rdata)
        var timer = res.data.rdata.ctrlWorkDTOS
        var time = []
        var times = []
        var schoolT = []
        var xiangTime = res.data.rdata.ctrlProjectDTOS
        var schoolTime = res.data.rdata.ctrlSchoolDTOS
        var book = []
        for (var i = 0; i < timer.length; i++) {
          time.push({
            startTime: timer[i].startTime.substring(0, 10),
            endTime: timer[i].endTime.substring(0, 10)
          })
        }
        for (var i = 0; i < xiangTime.length; i++) {
          times.push({
            startTime: xiangTime[i].startTime.substring(0, 10),
            endTime: xiangTime[i].endTime.substring(0, 10)
          })
        }
        for (var i = 0; i < schoolTime.length; i++) {
          schoolT.push({
            startTime: schoolTime[i].startTime.substring(0, 10),
            endTime: schoolTime[i].endTime.substring(0, 10)
          })
        }
        for (var i = 0; i < res.data.rdata.ctrlBookDTOS.length; i++) {
          book.push({
            time: res.data.rdata.ctrlBookDTOS[i].time.substring(0, 4) + '年' + res.data.rdata.ctrlBookDTOS[i].time.substring(5, 7) + '月',
          })
        }

        that.setData({
          resume: res.data.rdata,
          time: time,
          times: times,
          schoolT: schoolT,
          book: book
        })
      }
    })
  },
  change: function (e) {
    var f = this.data.isF
    this.setData({
      isF: !f
    })
  },
  change1: function (e) {
    var x = this.data.isX
    this.setData({
      isX: !x
    })
  },
  int() {
    // console.log(this.data.resume.ctrlObjectiveDTOS[0])
    if (this.data.resume.ctrlObjectiveDTOS) {
      var cot = this.data.resume.ctrlObjectiveDTOS[0]
      wx.navigateTo({
        url: '../x-wodejianli-qzyx/x-wodejianli-qzyx?money=' + cot.money + '&type=' + cot.type + '&industry=' + cot.industry + '&time=' + cot.time + '&address=' + cot.address + '&posit=' + cot.position + '&pingjia=' + cot.introduction + '&id=' + cot.id,
      })
    } else {
      wx.navigateTo({
        url: '../x-wodejianli-qzyx/x-wodejianli-qzyx'
      })
    }
  },
  work(e) {
    console.log(e)
    if (this.data.resume.ctrlResumeDTO) {
      var id = this.data.resume.ctrlResumeDTO.id
      if (e.currentTarget.dataset.id) {
        wx.navigateTo({
          url: '../t-wodejianli-gzjl/t-wodejianli-gzjl?id=' + id + '&type_id=' + e.currentTarget.dataset.id,
        })
      } else {
        wx.navigateTo({
          url: '../t-wodejianli-gzjl/t-wodejianli-gzjl?id=' + id,
        })
      }
    } else {
      wx.navigateTo({
        url: '../t-wodejianli-gzjl/t-wodejianli-gzjl',
      })
    }
  },
  project(e) {
    if (this.data.resume.ctrlProjectDTOS) {
      var arr = this.data.resume.ctrlProjectDTOS
      var id = this.data.resume.ctrlResumeDTO.id,
        i = e.currentTarget.dataset.index
      if (e.currentTarget.dataset.id) {
        wx.navigateTo({
          url: '../y-wodejianli-xmjl/y-wodejianli-xmjl?id=' + id + '&sId=' + e.currentTarget.dataset.id + '&describe=' + arr[i].describe + '&endTime=' + arr[i].endTime + '&name=' + arr[i].name + '&startTime=' + arr[i].startTime + '&work=' + arr[i].work,
        })
      } else {
        wx.navigateTo({
          url: '../y-wodejianli-xmjl/y-wodejianli-xmjl?id=' + id,
        })
      }
    } else {
      wx.navigateTo({
        url: '../y-wodejianli-xmjl/y-wodejianli-xmjl',
      })
    }
  },
  education(e) {
    if (this.data.resume.ctrlSchoolDTOS) {
      var id = this.data.resume.ctrlResumeDTO.id,
        i = e.currentTarget.dataset.index
      var arr = this.data.resume.ctrlSchoolDTOS
      if (e.currentTarget.dataset.id) {
        wx.navigateTo({
          url: '../w-wodejianli-jyjl/w-wodejianli-jyjl?id=' + id + '&sId=' + e.currentTarget.dataset.id + '&describe=' + arr[i].describe + '&endTime=' + arr[i].endTime + '&startTime=' + arr[i].startTime + '&professional=' + arr[i].professionalName + '&record=' + arr[i].record + '&school=' + arr[i].school
        })
      } else {
        wx.navigateTo({
          url: '../w-wodejianli-jyjl/w-wodejianli-jyjl?id=' + id,
        })
      }
    } else {
      wx.navigateTo({
        url: '../w-wodejianli-jyjl/w-wodejianli-jyjl',
      })
    }
  },
  honor(e) {
    if (this.data.resume.ctrlBookDTOS) {
      var id = this.data.resume.ctrlResumeDTO.id,
        i = e.currentTarget.dataset.index
      var arr = this.data.resume.ctrlBookDTOS
      if (e.currentTarget.dataset.id) {
        wx.navigateTo({
          url: '../u-wodejianli-hdzs/u-wodejianli-hdzs?id=' + id + '&sId=' + e.currentTarget.dataset.id + '&name=' + arr[i].name + '&time=' + arr[i].time + '&url=' + arr[i].url
        })
      } else {
        wx.navigateTo({
          url: '../u-wodejianli-hdzs/u-wodejianli-hdzs?id=' + id,
        })
      }
    } else {
      wx.navigateTo({
        url: '../u-wodejianli-hdzs/u-wodejianli-hdzs'
      })
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