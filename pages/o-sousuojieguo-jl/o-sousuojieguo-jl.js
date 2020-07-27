// pages/o-sousuojieguo-jl/o-sousuojieguo-jl.js
import qqmap from '../../utils/map.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationData: {},
    animationSi: {},
    value: '综合排序',
    animationCon: {},
    animationMor: {},
    mapValue: '',
    app: getApp().globalData,
    zhiList:[],
    moneyList:[],
    codList:[],
    expList:[],
    comList:[],
    scaleList:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.zhiwei = this.selectComponent("#zhiwei");
    this.gongsi = this.selectComponent("#gongsi");
    this.zonghe = this.selectComponent("#zonghe");
    this.more = this.selectComponent("#more");
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
    // 职位
    this.data.app.http({
      url:'/selects/position',
      dengl:true,
      data:{},
      success(res){
        that.setData({
          zhiList:res.data.rdata[0].treeDTOS
        })
      }
    })
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
      // 公司性质
      this.data.app.http({
        url:'/selects/company_nature',
        dengl:true,
        data:{},
        success(res){
          that.setData({
          comList:res.data.rdata
          })
        }
      })
      // 公司规模
      this.data.app.http({
        url:'/selects/company_num',
        dengl:true,
        data:{},
        success(res){
          that.setData({
          scaleList:res.data.rdata
          })
        }
      })
  },
  // 获取本地地址
  getLocation() {
    let that = this;
    new qqmap().getLocateInfo().then(function (val) { //这个方法在另一个文件里，下面有贴出代码
      var val = val.address_component.city
      // if (x.indexOf('市') !== -1) { //这里是去掉“市”这个字
      //   // console.log(val.indexOf('市') - 1);
      //   val = x.slice(0, x.indexOf('市'));
      // }
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
  weizhi() {
    wx.navigateTo({
      url: '../b-dingweiq/b-dingwq?id=1',
    })
  },
  // 职位
  toggleZhi() {
    if (this.gongsi.data.isAdd_T) {
      this.toggleSi()
    }
    if (this.zonghe.data.isCon) {
      this.toggleZong()
    }
    if (this.more.data.isAdd_F) {
      this.toggleMor()
    }
    this.zhiwei.position()
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
    this.toggleZhi()
  },
  toggleSi() {
    if (this.zhiwei.data.isAdd) {
      this.toggleZhi()
    }
    if (this.zonghe.data.isCon) {
      this.toggleZong()
    }
    if (this.more.data.isAdd_F) {
      this.toggleMor()
    }
    this.gongsi.position1()
    var nowShow = this.gongsi.data.isAdd_T;
    //创建动画
    var animation = wx.createAnimation({
      timingFunction: "ease"
    })
    this.animation = animation;
    if (nowShow) {
      animation.rotate(180).step();
      this.setData({
        animationSi: animation.export()
      })
    } else {
      animation.rotate(0).step();
      this.setData({
        animationSi: animation.export()
      })
    }
  },
  toggleZong() {
    if (this.zhiwei.data.isAdd) {
      this.toggleZhi()
    }
    if (this.gongsi.data.isAdd_T) {
      this.toggleSi()
    }
    if (this.more.data.isAdd_F) {
      this.toggleMor()
    }
    this.zonghe.toggleZong()
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
  toggleMor() {
    if (this.zhiwei.data.isAdd) {
      this.toggleZhi()
    }
    if (this.gongsi.data.isAdd_T) {
      this.toggleSi()
    }
    if (this.zonghe.data.isCon) {
      this.toggleZong()
    }
    this.more.position2()
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