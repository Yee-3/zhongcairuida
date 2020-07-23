// pages/w-wodejianli-jyjl/w-wodejianli-jyjl.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '请选择',
    date1: '请选择',
    isEdu:false,
    edu:'',
    valu:'请选择',
    app: getApp().globalData,
    schList:[],
    edu_index:'',
    school:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that=this
    this.data.app.http({
      url:'/selects/school_record',
      dengl:true,
      data:{},
      success(res){
        that.setData({
          schList:res.data.rdata
        })
        console.log(res.data.rdata)
      }
    })
  },
  // 学历
  toggle(e){
    this.setData({
      edu:e.currentTarget.dataset.edu,
      edu_index:e.currentTarget.dataset.edu,
    })
  },
  educat(){
    var eduu = this.data.isEdu
    this.setData({
      isEdu: !eduu
    })
  },
  con() {
    this.educat()
    var index=this.data.edu_index,
    that=this
    this.setData({
      valu:that.data.schList[index].label
    })
  },
  submit(){
    var that=this
    this.data.app.http({
      url:'/resume/saveOrUpdateSchool',
      dengl:true,
      method:'POST',
      data:{

      }
      
    })
  },
  // ---end---
 
  // e-----nd-----
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

  },
    // 选择时间
    bindDateChange: function (e) {
      this.setData({
        datePickerIsShow: true,
        data_index: e.currentTarget.dataset.de
      });
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
})