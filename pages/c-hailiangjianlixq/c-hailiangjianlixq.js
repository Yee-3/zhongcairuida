// pages/c-hailiangjianlixq/c-hailiangjianlixq.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: '',
    isMask: false,
    datePickerValue: ['', '', ''],
    datePickerIsShow: false,
    isHz:true,
    isTwo:false,
    detCon:{},
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      height: wx.getSystemInfoSync().windowHeight * 0.9,
      id:wx.getStorageSync('companyId')
    })
    var  app=getApp().globalData,
    that=this,
    id=wx.getStorageSync('companyId')
    console.log(id)
    app.http({
      type:true,
      url:'/company/queryCooperate',
      dengl:true,
      data:{
        companyId:id
      },
      method:'POST',
      success (res){
        console.log(res)
        // if(res.data.rdata=='N'){
        //   that.setData({
        //     isHz:false
        //   })
        // }else{
        //   that.setData({
        //     isHz:true
        //   })
        // }
      }
    })
    app.http({
      url:'/indexCom/getResumeDetail',
      type:true,
      dengl:true,
      method:'POST',
      data:{
        id:options.id
      },
      success(res){
        that.setData({
          detCon:res.data.rdata
        })
        var arr=res.data.rdata.ctrlWorkDTOS
        if (arr.length > 0) {
          arr.map(function (val, i) {
           var startTime=val.startTime.substring(0,7).replace('-','/')
           var endTime=val.endTime.substring(0,7).replace('-','/')
           val.valTime=startTime+'~'+endTime
          })
        }
        var arr1=res.data.rdata.ctrlProjectDTOS
        if (arr1.length > 0) {
          arr.map(function (val, i) {
           var startTime=val.startTime.substring(0,7).replace('-','/')
           var endTime=val.endTime.substring(0,7).replace('-','/')
           val.valTime=startTime+'~'+endTime
          })
        }
        var arr2=res.data.rdata.ctrlSchoolDTOS
        if (arr2.length > 0) {
          arr.map(function (val, i) {
           var startTime=val.startTime.substring(0,7).replace('-','/')
           var endTime=val.endTime.substring(0,7).replace('-','/')
           val.valTime=startTime+'~'+endTime
          })
        }
        var arr3=res.data.rdata.ctrlBookDTOS
        if (arr3.length > 0) {
          arr.map(function (val, i) {
            if(val.time){
              var time=val.time.substring(0,4)+'年'+val.time.substring(5,7)+'月'
              val.valTime=time
            }
          })
        }
      }
    })
  },
  invit() {
    if(this.data.isHz){
    var mask=this.data.isMask,
    that=this
    this.setData({
      isMask:!mask
    })
    this.data.app.http({
      type:true,
      url:'/company/queryJobPosition',
      dengl:true,
      method:'POST',
      data:{
        companyId:that.data.id,
        limit:10,
        page:1,
        status:1
      },
      success(res){
        console.log(res.data.rdata)
      }
    })
  }else{
    var two=this.data.isTwo
    this.setData({
      isTwo:!two
    })
  }
  },
  phone(){
    wx.makePhoneCall({
      phoneNumber: '1222222'
    })
  },
  quxiao2: function() {
		this.invit()
  },
  confirm(e){
    this.invit()
    this.setData({
      datePickerIsShow: true,
      data_index: e.currentTarget.dataset.de
    });
  },
   // 选择时间
  
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
    var that=this
    this.data.app.http({
      type:true,
      url:'/company/invitation',
      dengl:true,
      data:{},
      method:'POST',
      success(res){

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