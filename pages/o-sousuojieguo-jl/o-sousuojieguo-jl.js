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
    zhiList: [],
    moneyList: [],
    codList: [],
    expList: [],
    comList: [],
    scaleList: [],
    currentPage: 1,
    loadingType: 0,
    contentText: {
      contentdown: "上拉显示更多",
      contentrefresh: "正在加载...",
      contentnomore: "我也是有底线的~"
    },
    recomList: [],
    morType: false,
    gsType: false,
    zhType: false,
    location: '',
    zwType: false,
    name: '',
    id_adre: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options) {
      this.setData({
        name: options.name
      })
    }
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
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(res);
        that.setData({
          location: res.longitude + ',' + res.latitude
        })
        console.log(that.data.location)
      },
      fail: function (res) {
        console.log(res);
      }
    })
    setTimeout(function () {
      var data = {
        limit: 10,
        page: that.data.currentPage,
        type: 2,
        name: that.data.name ? that.data.name : '',
        location: that.data.location ? that.data.location : '',
        address: that.data.id_adre ? that.data.id_adre : ''
      }
      that.reword(data)
    }, 500)

    // 职位
    this.data.app.http({
      url: '/selects/position',
      dengl: true,
      data: {},
      success(res) {
        that.setData({
          zhiList: res.data.rdata[0].treeDTOS
        })
      }
    })
    // 薪资
    this.data.app.http({
      url: '/selects/expect_money',
      dengl: true,
      data: {},
      success(res) {
        that.setData({
          moneyList: res.data.rdata
        })
      }
    })
    // 学历
    this.data.app.http({
      url: '/selects/school_record',
      dengl: true,
      data: {},
      success(res) {
        that.setData({
          codList: res.data.rdata
        })
      }
    })
    // 工作经验
    this.data.app.http({
      url: '/selects/work_exe',
      dengl: true,
      data: {},
      success(res) {
        that.setData({
          expList: res.data.rdata
        })
      }
    })
    // 公司性质
    this.data.app.http({
      url: '/selects/company_nature',
      dengl: true,
      data: {},
      success(res) {
        that.setData({
          comList: res.data.rdata
        })
      }
    })
    // 公司规模
    this.data.app.http({
      url: '/selects/company_num',
      dengl: true,
      data: {},
      success(res) {
        that.setData({
          scaleList: res.data.rdata
        })
      }
    })
  },
  search(e) {
    console.log(e)
    this.setData({
      currentPage: 1,
      name: e.detail.value
    })
    var name = this.data.name ? this.data.name : '',
      that = this,
      data = {
        limit: 10,
        page: that.data.currentPage,
        type: 2,
        name: name
      }
    this.reword(data)
  },

  // 获取本地地址
  getLocation() {
    let that = this;
    new qqmap().getLocateInfo().then(function (val) { //这个方法在另一个文件里，下面有贴出代码
      var location = val.location
      var val = val.address_component.city
      // if (x.indexOf('市') !== -1) { //这里是去掉“市”这个字
      //   // console.log(val.indexOf('市') - 1);
      //   val = x.slice(0, x.indexOf('市'));
      // }
      that.setData({
        mapValue: val,
        location: location.lng + ',' + location.lat
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
    console.log('zhiwei')
    this.toggleZhi()
    this.setData({
      currentPage: 1,
      zhType: true
    })
    var that = this,
      id = this.zhiwei.data.id ? this.zhiwei.data.id : '',
      name = this.data.name ? this.data.name : '',
      data = {
        limit: 10,
        page: that.data.currentPage,
        type: 2,
        positionId: id,
        name: name
      }
    this.reword(data)
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
      value: this.zonghe.data.value,
      currentPage: 1,
      zhType: true
    })
    this.toggleZong()
    var that = this,
      ind = '',
      address = '',
      name = this.data.name ? this.data.name : ''
    if (this.zonghe.data.ind == 1) {
      ind = that.zonghe.data.ind
    } else if (this.zonghe.data.ind == 2) {
      ind = that.zonghe.data.ind
    } else if (this.zonghe.data.ind == 3) {
      address = that.data.location
    }
    var data = {
      limit: 10,
      page: that.data.currentPage,
      type: 2,
      sort: ind,
      location: address,
      name: name
    }
    console.log(address)
    this.reword(data)
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
  // 公司筛选
  togCom() {
    this.toggleSi()
    this.setData({
      currentPage: 1,
      gsType: true
    })
    var that = this,
      ind3 = this.gongsi.data.ind3 ? this.gongsi.data.ind3 : '',
      ind4 = this.gongsi.data.ind4 ? this.gongsi.data.ind4 : '',
      name = this.data.name ? this.data.name : '',
      data = {
        limit: 10,
        page: that.data.currentPage,
        type: 2,
        omNum: ind4,
        comType: ind3,
        name: name
      }
    this.reword(data)
  },
  comCancel() {
    this.toggleSi()
    this.setData({
      currentPage: 1,
      gsType: false,
    })
    var that = this,
      name = this.data.name ? this.data.name : '',
      data = {
        limit: 10,
        page: that.data.currentPage,
        type: 2,
        name: name
      }
    this.gongsi.setData({
      ind4: '',
      ind3: '',
    })
    this.reword(data)
  },
  // 更多筛选
  togMore() {
    this.toggleMor()
    this.setData({
      currentPage: 1,
      morType: true
    })
    var that = this,
      ind5 = this.more.data.ind5 ? this.more.data.ind5 : '',
      ind6 = this.more.data.ind6 ? this.more.data.ind6 : '',
      ind7 = this.more.data.ind7 ? this.more.data.ind7 : '',
      name = this.data.name ? this.data.name : '',
      data = {
        limit: 10,
        page: that.data.currentPage,
        type: 2,
        money: ind5,
        exe: ind6,
        school: ind7,
        name: name
      }
    this.reword(data)
  },
  // 职位详情
  detail(e) {
    wx.navigateTo({
      url: '../zc-zhiweixq/zc-zhiweixq?id=' + e.currentTarget.dataset.id,
    })
  },
  moreCancel() {
    this.toggleMor()
    this.setData({
      currentPage: 1,
      morType: false,
    })
    var that = this,
      name = this.data.name ? this.data.name : '',
      data = {
        limit: 10,
        page: that.data.currentPage,
        type: 2,
        name: name
      }
    this.more.setData({
      ind5: '',
      ind6: '',
      ind7: '',
    })
    this.reword(data)
  },
  // 首页为你推荐
  reword(data) {
    var that = this
    wx.showNavigationBarLoading()
    this.data.app.http({
      url: '/index/getPosition',
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
            var date1 = new Date(val.createTime.substring(0, 10))
            var date = new Date(myDate.getFullYear() + '-' + jiance((myDate.getMonth() + 1)) + '-' + jiance(myDate.getDate()));
            var day = parseInt((date - date1) / 1000 / 60 / 60 / 24)
            var value = parseInt(day / 30) < 1 ? day + '天前' : parseInt(day / 30) + '月前'
            val.timeVal = value
          })
        }
        console.log(arr, 88888)
        console.log(res.data.rdata)
        that.setData({
          recomList: res.data.rdata
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
      url: '/index/getPosition',
      dengl: true,
      method: 'POST',
      data: data,
      success(res) {
        console.log(res.data.rdata, 22222)
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
            var date1 = new Date(val.createTime.substring(0, 10))
            var date = new Date(myDate.getFullYear() + '-' + jiance((myDate.getMonth() + 1)) + '-' + jiance(myDate.getDate()));
            var day = parseInt((date - date1) / 1000 / 60 / 60 / 24)
            var value = parseInt(day / 30) < 1 ? day + '天前' : parseInt(day / 30) + '月前'
            val.timeVal = value
          })
        }
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
    var that = this
    var ind5 = this.more.data.ind5 ? this.more.data.ind5 : '',
      ind6 = this.more.data.ind6 ? this.more.data.ind6 : '',
      ind7 = this.more.data.ind7 ? this.more.data.ind7 : '',
      ind3 = this.gongsi.data.ind3 ? this.gongsi.data.ind3 : '',
      ind4 = this.gongsi.data.ind4 ? this.gongsi.data.ind4 : '',
      name = this.data.name ? this.data.name : ''
    //  更多
    if (this.data.morType) {
      var data = {
        limit: 10,
        page: that.data.currentPage,
        type: 2,
        money: ind5,
        exe: ind6,
        school: ind7,
        name: name
      }
      this.jiazai(data)
      // 公司
    } else if (this.data.gsType) {
      var data = {
        limit: 10,
        page: that.data.currentPage,
        type: 2,
        omNum: ind4,
        comType: ind3,
        name: name
      }
      this.jiazai(data)
    } else if (this.data.zhType) {
      var that = this,
        ind = '',
        address = ''
      if (that.zonghe.data.ind == 1) {
        ind = that.zonghe.data.ind
      } else if (that.zonghe.data.ind == 2) {
        ind = that.zonghe.data.ind
      } else if (that.zonghe.data.ind == 3) {
        address = that.data.location
      }
      var data = {
        limit: 10,
        page: that.data.currentPage,
        type: 2,
        sort: ind,
        location: address,
        name: name
      }
    } else if (this.data.zhType) {
      var that = this,
        id = this.zhiwei.data.id ? this.zhiwei.data.id : '',
        data = {
          limit: 10,
          page: that.data.currentPage,
          type: 2,
          positionId: id,
          name: name
        }
      this.jiazai(data)
    } else {
      var data = {
        limit: 10,
        page: that.data.currentPage,
        type: 2,
        name: name,
        location: that.data.location ? that.data.location : '',
        address: that.data.id_adre ? that.data.id_adre : ''
      }
      this.jiazai(data)
    }


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})