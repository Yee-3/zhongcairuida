// pages/m-qiyezhuce/m-qiyezhuce.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSix: false,
    six: '1',
    six_val: '请选择',
    nameVal:'',
    zhiVal:'',
    emilVal:'',
    phoneVal:'',
    app: getApp().globalData
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  // / 性别
  sixChange(e) {
    this.setData({
      six: e.currentTarget.dataset.index
    })
  },
  qzduan() {
    wx.switchTab({
      url: '../m-shouye/m-shouye',
    })
  },
  phone() {
    wx.makePhoneCall({
      phoneNumber: '400-061235'
    })
  },
  con1() {
    this.hidden()
    if (this.data.mar == 1) {
      this.setData({
        six_val: '男'
      })
    } else {
      this.setData({
        six_val: '女'
      })
    }
  },
  hidden() {
    var six = this.data.isSix
    this.setData({
      isSix: !six
    })
  },
  blur(e) {
		console.log(e)
		var type = e.currentTarget.dataset.type,
			that = this,
			value = e.detail.value
		if (type == 1) {
			that.setData({
				nameVal: value
      })
      console.log(value)
		}
		if (type == 2) {
			that.setData({
				zhiVal: value
			})
    }
    if (type == 3) {  
        that.setData({
          emilVal: value
        })
    }
    if (type ==4) {  
        that.setData({
          phoneVal: value
        })
		}

	},
	
  // --end--
  next() {
    var that=this
    if (!this.data.app.checkEmail(this.data.emilVal)) {
      wx.showToast({
        title: '请输入正确的邮箱',
        icon: 'none'
      })
    }else  if (!this.data.app.checkPhone(this.data.phoneVal)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      })
    }else{
      wx.navigateTo({
        url: '../o-qiyezhuce/o-qiyezhuce?nameVal='+this.data.nameVal+'&six='+this.data.six+'&zhiVal='+this.data.zhiVal+'&emilVal='+this.data.emilVal+'&phoneVal='+this.data.phoneVal,
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