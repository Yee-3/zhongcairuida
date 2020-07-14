// pages/m-shouye/m-shouye.js
import qqmap from '../../utils/map.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAdd: false,
    isTwo: false,
    isAdd_T: false,
    isAdd_F: false,
    isAdd_S: false,
    ind: 'x',
    ind1: '',
    ind2: '',
    ind3: '',
    ind4: '',
    ind5: '',
    ind6: '',
    ind7: '',
    array: [{
        name: '综合排序'
      },
      {
        name: ' 最新发布优先'
      }
    ],
    inda: 0,
    m_zong: '1',
    z_val: '综合排序',
    mapValue: '',
    app: getApp().globalData,
    xingzhi:[],
    guimo:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLocation()
    let that = this,
      cityOrTime = wx.getStorageSync('locatecity') || {},
      time = new Date().getTime(),
      city = '';
    if (!cityOrTime.time || (time - cityOrTime.time > 1800000)) { //每隔30分钟请求一次定位
      this.getLocate();
    } else { //如果未满30分钟，那么直接从本地缓存里取值
      that.setData({
        mapValue: cityOrTime.city
      })
    }
  },
  // 获取位置

  getLocation() {
    let that = this;
    new qqmap().getLocateInfo().then(function (val) { //这个方法在另一个文件里，下面有贴出代码
      var x = val.address_component.city
      if (x.indexOf('市') !== -1) { //这里是去掉“市”这个字
        // console.log(val.indexOf('市') - 1);
        val = x.slice(0, x.indexOf('市'));
      }
      that.setData({
        mapValue: val,
      });
      //把获取的定位和获取的时间放到本地存储
      wx.setStorageSync('locatecity', {
        city: val,
        time: new Date().getTime()
      });
    });
  },
  // 事件
  sixChange(e) {
    this.setData({
      m_zong: e.currentTarget.dataset.index
    })
  },
  confirm() {
    this.position3()
    if (this.data.m_zong == 1) {
      this.setData({
        z_val: '综合排序'
      })
    } else {
      this.setData({
        z_val: '最新发布优先'
      })
    }
  },
  search() {
    wx.navigateTo({
      url: '../n-sousuo/n-sousuo',
    })
  },
  high() {

    wx.navigateTo({
      url: '../d-gaoduanzhiwei/d-gaoduanzhiwei'
    })
  },
  hotspot() {
    wx.navigateTo({
      url: '../k-redianzixun/k-redianzixun'
    })
  },
  hot() {
    wx.navigateTo({
      url: '../l-remenzhiwei/l-remenzhiwei'
    })
  },
  toggle(e) {
    this.setData({
      ind: e.currentTarget.dataset['index']
    })
    var two = this.data.isTwo
    this.setData({
      isTwo: !two
    })
  },
  toggle1(e) {
    this.setData({
      ind1: e.currentTarget.dataset['index']
    })
  },
  toggle2(e) {
    this.setData({
      ind2: e.currentTarget.dataset['index']
    })
  },
  toggle3(e) {
    this.setData({
      ind3: e.currentTarget.dataset['index']
    })
  },
  toggle4(e) {
    this.setData({
      ind4: e.currentTarget.dataset['index']
    })
  },
  toggle5(e) {
    this.setData({
      ind5: e.currentTarget.dataset['index']
    })
  },
  toggle6(e) {
    this.setData({
      ind6: e.currentTarget.dataset['index']
    })
  },
  toggle7(e) {
    this.setData({
      ind7: e.currentTarget.dataset['index']
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      inda: e.detail.value
    })
  },

  position() {
    var add = this.data.isAdd
    this.setData({
      isAdd: !add
    })
  },
  position1() {
    var that=this
    var add_t = this.data.isAdd_T
    this.setData({
      isAdd_T: !add_t
    })
    this.data.app.http({
      url: '/selects/company_num',
      data: {},
      success(res) {
        console.log(res)
        that.setData({
          guimo:res.data.rdata
        })
      }
    })
    this.data.app.http({
      url: '/selects/company_nature',
      data: {},
      success(res) {
        console.log(res)
        that.setData({
          xingzhi:res.data.rdata
        })
      }
    })
  },
  position2() {
    var add_f = this.data.isAdd_F
    this.setData({
      isAdd_F: !add_f
    })

  },
  position3() {
    var add_s = this.data.isAdd_S
    this.setData({
      isAdd_S: !add_s
    })
  },

  hide() {
    var two = this.data.isTwo
    this.setData({
      isTwo: !two
    })
  },
  zhiDetail() {
    wx.navigateTo({
      url: '../zc-zhiweixq/zc-zhiweixq'
    })
  },
  run() {
    wx.navigateTo({
      url: '../a-bangwozhaogongzuo/index',
    })
  },
  weizhi() {
    wx.navigateTo({
      url: '../b-dingweiq/b-dingwq?id=1',
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

  },


})