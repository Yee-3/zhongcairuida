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
    ind1: 'x',
    ind2: 'x',
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
    xingzhi: [],
    guimo: [],
    imgList: [],
    zhiList: [],
    expList: [],
    recList: [],
    moneryList: [],
    currentPage: 1,
    loadingType: 0,
    contentText: {
      contentdown: "上拉显示更多",
      contentrefresh: "正在加载...",
      contentnomore: "没有更多数据了"
    },
    recomList: [],
    selList: [],
    gsCom: true,
    moCom: true,
    id: '',
    zwCom: true,
    zhCom: true,
    work:{}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getLocation()
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
    this.data.app.http({
      url: '/index/getIndex',
      data: {},
      dengl: true,
      success(res) {
        that.setData({
          imgList: res.data.rdata.ctrlBannerList,
          selList: res.data.rdata.ctrlSelects,
          work:res.data.rdata.ctrlLookingwork
        })
      }
    })
    this.data.app.http({
      url: '/selects/position',
      data: {},
      dengl: true,
      success(res) {
        that.setData({
          zhiList: res.data.rdata[0].treeDTOS
        })
      }
    })
    // 首页为你推荐
    wx.showNavigationBarLoading()
    this.data.app.http({
      url: '/index/getPosition',
      dengl: true,
      method: 'POST',
      data: {
        limit: 10,
        page: that.data.currentPage,
        type: 1,
      },
      success(res) {
        function jiance(x) {
          return x < 10 ? '0' + x : x
        }
        var arr = res.data.rdata
        var myDate = new Date()
        arr.map(function (val, i) {
          var date1 = new Date(val.createTime.substring(0, 10))
          var date = new Date(myDate.getFullYear() + '-' + jiance((myDate.getMonth() + 1)) + '-' + jiance(myDate.getDate()));
          var day = parseInt((date - date1) / 1000 / 60 / 60 / 24)
          var value = parseInt(day / 30) < 1 ? day + '天前' : parseInt(day / 30) + '月前'
          val.timeVal = value
        })
        that.setData({
          recomList: res.data.rdata,
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
    var that = this,
      zong = this.data.m_zong ? this.data.m_zong : ''
    if (this.data.m_zong == 1) {
      this.setData({
        z_val: '综合排序',
        currentPage: 1,
        zhCom: false
      })
    } else {
      this.setData({
        z_val: '最新发布优先',
        currentPage: 1,
        zhCom: false
      })
    }
    // 点击其他筛选清空上一个筛选内容
    if(!this.data.zwCom){
      this.setData({
        ind: 'x',
        ind1: 'x',
        ind2: 'x',
        isTwo:false,
        zwCom:true
      })
    }else  if(!this.data.gsCom){
      this.setData({
        ind3:'',
        ind4:'',
        gsCom:true
      })
    }else if(!this.data.moCom){
      this.setData({
        ind5:'',
        ind6:'',
        ind7:'',
        moCom:true
      })
    }
    this.data.app.http({
      url: '/index/getPosition',
      dengl: true,
      method: 'POST',
      data: {
        limit: 10,
        page: that.data.currentPage,
        type: 1,
        sort: zong
      },
      success(res) {
        function jiance(x) {
          return x < 10 ? '0' + x : x
        }
        var arr = res.data.rdata
        var myDate = new Date()
        arr.map(function (val, i) {
          var date1 = new Date(val.createTime.substring(0, 10))
          var date = new Date(myDate.getFullYear() + '-' + jiance((myDate.getMonth() + 1)) + '-' + jiance(myDate.getDate()));
          var day = parseInt((date - date1) / 1000 / 60 / 60 / 24)
          var value = parseInt(day / 30) < 1 ? day + '天前' : parseInt(day / 30) + '月前'
          val.timeVal=value
        })
        that.setData({
          recomList: res.data.rdata
        })
        if (res.data.rdata.length < 10) {
          that.setData({
            loadingType: 2,
          })
        }
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh()
      }
    })
  },
  cancel() {
    this.position3()
    var that = this
    if (!this.data.zhCom) {
      this.setData({
        m_zong: 1,
        z_val: '综合排序',
        currentPage: 1,
        zhCom: true
      })
      this.data.app.http({
        url: '/index/getPosition',
        dengl: true,
        method: 'POST',
        data: {
          limit: 10,
          page: that.data.currentPage,
          type: 1,
          sort: ''
        },
        success(res) {
          function jiance(x) {
            return x < 10 ? '0' + x : x
          }
          var arr = res.data.rdata
          var myDate = new Date()
          arr.map(function (val, i) {
            var date1 = new Date(val.createTime.substring(0, 10))
            var date = new Date(myDate.getFullYear() + '-' + jiance((myDate.getMonth() + 1)) + '-' + jiance(myDate.getDate()));
            var day = parseInt((date - date1) / 1000 / 60 / 60 / 24)
            var value = parseInt(day / 30) < 1 ? day + '天前' : parseInt(day / 30) + '月前'
            val.timeVal=value

          })
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

    } else {
      this.setData({
        m_zong: 1,
        z_val: '综合排序',
        currentPage: 1
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
    var two = this.data.isTwo
    this.setData({
      ind: e.currentTarget.dataset['index'],
      isTwo: !two
    })
  },
  toggle1(e) {
    this.setData({
      ind1: e.currentTarget.dataset['index'],
    })
  },
  toggle2(e) {
    this.setData({
      ind2: e.currentTarget.dataset['index'],
      id: e.currentTarget.dataset['id'],

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
    var that = this

    this.setData({
      isAdd: !add
    })
  },
  position1() {
    var that = this
    var add_t = this.data.isAdd_T
    this.setData({
      isAdd_T: !add_t
    })
    this.data.app.http({
      url: '/selects/company_num',
      data: {},
      dengl: true,
      success(res) {
        console.log(res)
        that.setData({
          guimo: res.data.rdata
        })
      }
    })
    this.data.app.http({
      url: '/selects/company_nature',
      data: {},
      dengl: true,
      success(res) {
        console.log(res)
        that.setData({
          xingzhi: res.data.rdata
        })
      }
    })
  },
  position2() {
    var add_f = this.data.isAdd_F,
      that = this
    this.setData({
      isAdd_F: !add_f
    })
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
    this.data.app.http({
      url: '/selects/school_record',
      dengl: true,
      data: {},
      success(res) {
        that.setData({
          recList: res.data.rdata
        })
      }
    })
    this.data.app.http({
      url: '/selects/expect_money',
      dengl: true,
      data: {},
      success(res) {
        that.setData({
          moneryList: res.data.rdata
        })
      }
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
  zhiDetail(e) {
    wx.navigateTo({
      url: '../zc-zhiweixq/zc-zhiweixq?id='+e.currentTarget.dataset.id
    })
  },
  run() {
    if(this.data.work){
      var work=this.data.work
    wx.navigateTo({
      url: '../a-bangwozhaogongzuo/index?id='+work.id+'&address='+work.address+'&money='+work.money+"&name="+work.name+'&phone='+work.phone+'&position='+work.position+'&status='+work.status+'&time='+work.time+'&workType='+work.workType,
    })
    }else{
      wx.navigateTo({
        url: '../a-bangwozhaogongzuo/index'
      })
    }
  },
  weizhi() {
    wx.navigateTo({
      url: '../b-dingweiq/b-dingwq?id=1',
    })
  },
  // 职位确定/取消
  con() {
    this.position()
    var that = this,
      id = this.data.id ? this.data.id : ''
    this.setData({
      currentPage: 1,
      zwCom: false
    })
     // 点击其他筛选清空上一个筛选内容
     if(!this.data.zhCom){
      this.setData({
        m_zong:'1',
        zhCom:true
      })
    }else  if(!this.data.gsCom){
      this.setData({
        ind3:'',
        ind4:'',
        gsCom:true
      })
    }else if(!this.data.moCom){
      this.setData({
        ind5:'',
        ind6:'',
        ind7:'',
        moCom:true
      })
    }
    this.data.app.http({
      url: '/index/getPosition',
      dengl: true,
      method: 'POST',
      data: {
        limit: 10,
        page: that.data.currentPage,
        type: 1,
        positionId: id
      },
      success(res) {
        function jiance(x) {
          return x < 10 ? '0' + x : x
        }
        var arr = res.data.rdata
        var myDate = new Date()
        arr.map(function (val, i) {
          var date1 = new Date(val.createTime.substring(0, 10))
          var date = new Date(myDate.getFullYear() + '-' + jiance((myDate.getMonth() + 1)) + '-' + jiance(myDate.getDate()));
          var day = parseInt((date - date1) / 1000 / 60 / 60 / 24)
          var value = parseInt(day / 30) < 1 ? day + '天前' : parseInt(day / 30) + '月前'
          val.timeVal=value
        })
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
  can() {
    this.position()
    var that = this
    if (!this.data.zwCom) {
      this.setData({
        currentPage: 1,
        zwCom: true,
        ind: 'x',
        ind1: 'x',
        ind2: 'x',
        isTwo: false
      })
      this.data.app.http({
        url: '/index/getPosition',
        dengl: true,
        method: 'POST',
        data: {
          limit: 10,
          page: that.data.currentPage,
          type: 1,
          positionId: ''
        },
        success(res) {
          function jiance(x) {
            return x < 10 ? '0' + x : x
          }
          var arr = res.data.rdata
          var myDate = new Date()
          arr.map(function (val, i) {
            var date1 = new Date(val.createTime.substring(0, 10))
            var date = new Date(myDate.getFullYear() + '-' + jiance((myDate.getMonth() + 1)) + '-' + jiance(myDate.getDate()));
            var day = parseInt((date - date1) / 1000 / 60 / 60 / 24)
            var value = parseInt(day / 30) < 1 ? day + '天前' : parseInt(day / 30) + '月前'
            val.timeVal=value
          })
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
    } else {
      this.setData({
        ind: 'x',
        ind1: 'x',
        ind2: 'x',
        isTwo: false
      })
    }
  },
  // 公司取消/确定
  gs_cancel() {
    this.position1()
    if (!this.data.gsCom) {
      var that = this
      this.setData({
        currentPage: 1,
        gsCom: true,
        ind3: '',
        ind4: ''
      })
      this.data.app.http({
        url: '/index/getPosition',
        dengl: true,
        method: 'POST',
        data: {
          limit: 10,
          page: that.data.currentPage,
          type: 1,
          comNum: '',
          comType: '',
        },
        success(res) {
          function jiance(x) {
            return x < 10 ? '0' + x : x
          }
          var arr = res.data.rdata
          var myDate = new Date()
          arr.map(function (val, i) {
            var date1 = new Date(val.createTime.substring(0, 10))
            var date = new Date(myDate.getFullYear() + '-' + jiance((myDate.getMonth() + 1)) + '-' + jiance(myDate.getDate()));
            var day = parseInt((date - date1) / 1000 / 60 / 60 / 24)
            var value = parseInt(day / 30) < 1 ? day + '天前' : parseInt(day / 30) + '月前'
            val.timeVal = value

          })
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
    } else {
      this.setData({
        ind3: '',
        ind4: ''
      })
    }
  },
  gs_confirm() {
    this.position1()
    var that = this,
      ind4 = that.data.ind4 ? that.data.ind4 : '',
      ind3 = that.data.ind3 ? that.data.ind3 : ''
    this.setData({
      currentPage: 1,
      gsCom: false
    })
     // 点击其他筛选清空上一个筛选内容
     if(!this.data.zwCom){
      this.setData({
        ind: 'x',
        ind1: 'x',
        ind2: 'x',
        isTwo:false,
        zwCom:true
      })
    }else if(!this.data.zhCom){
      this.setData({
        m_zong:'1',
        zhCom:true
      })
    }else if(!this.data.moCom){
      this.setData({
        ind5:'',
        ind6:'',
        ind7:'',
        moCom:true
      })
    }
    this.data.app.http({
      url: '/index/getPosition',
      dengl: true,
      method: 'POST',
      data: {
        limit: 10,
        page: that.data.currentPage,
        type: 1,
        comNum: ind4,
        comType: ind3,
      },
      success(res) {
        function jiance(x) {
          return x < 10 ? '0' + x : x
        }
        var arr = res.data.rdata
        var myDate = new Date()
        arr.map(function (val, i) {
          var date1 = new Date(val.createTime.substring(0, 10))
          var date = new Date(myDate.getFullYear() + '-' + jiance((myDate.getMonth() + 1)) + '-' + jiance(myDate.getDate()));
          var day = parseInt((date - date1) / 1000 / 60 / 60 / 24)
          var value = parseInt(day / 30) < 1 ? day + '天前' : parseInt(day / 30) + '月前'
          val.timeVal = value
        })
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
  // 更多取消/确定
  mo_cancel() {
    this.position2()

    if (!this.data.moCom) {
      var that = this
      this.setData({
        currentPage: 1,
        moCom: true,
        ind5: '',
        ind6: '',
        ind7: ''
      })
      this.data.app.http({
        url: '/index/getPosition',
        dengl: true,
        method: 'POST',
        data: {
          limit: 10,
          page: that.data.currentPage,
          type: 1,
          money: '',
          exe: '',
          school: ''
        },
        success(res) {
          function jiance(x) {
            return x < 10 ? '0' + x : x
          }
          var arr = res.data.rdata
          var myDate = new Date()
          arr.map(function (val, i) {
            var date1 = new Date(val.createTime.substring(0, 10))
            var date = new Date(myDate.getFullYear() + '-' + jiance((myDate.getMonth() + 1)) + '-' + jiance(myDate.getDate()));
            var day = parseInt((date - date1) / 1000 / 60 / 60 / 24)
            var value = parseInt(day / 30) < 1 ? day + '天前' : parseInt(day / 30) + '月前'
            val.timeVal = value
          })
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
    } else {
      this.setData({
        ind5: '',
        ind6: '',
        ind7: ''
      })
    }
  },
  mo_confirm() {
    this.position2()
    var that = this,
      ind5 = that.data.ind5 ? that.data.ind5 : '',
      ind6 = that.data.ind6 ? that.data.ind6 : '',
      ind7 = that.data.ind7 ? that.data.ind7 : ''
    this.setData({
      currentPage: 1,
      moCom: false
    })
    if(!this.data.zwCom){
      this.setData({
        ind: 'x',
        ind1: 'x',
        ind2: 'x',
        isTwo:false,
        zwCom:true
      })
    }else if(!this.data.zhCom){
      this.setData({
        m_zong:'1',
        zhCom:true
      })
    }else if(!this.data.gsCom){
      this.setData({
        ind3:'',
        ind4:'',
        gsCom:true
      })
    }
    this.data.app.http({
      url: '/index/getPosition',
      dengl: true,
      method: 'POST',
      data: {
        limit: 10,
        page: that.data.currentPage,
        type: 1,
        money: ind5,
        exe: ind6,
        school: ind7
      },
      success(res) {
        function jiance(x) {
          return x < 10 ? '0' + x : x
        }
        var arr = res.data.rdata
        var myDate = new Date()
        arr.map(function (val, i) {
          var date1 = new Date(val.createTime.substring(0, 10))
          var date = new Date(myDate.getFullYear() + '-' + jiance((myDate.getMonth() + 1)) + '-' + jiance(myDate.getDate()));
          var day = parseInt((date - date1) / 1000 / 60 / 60 / 24)
          var value = parseInt(day / 30) < 1 ? day + '天前' : parseInt(day / 30) + '月前'
          val.timeVal = value
        })
        that.setData({
          recomList: res.data.rdata
        })
        if (res.data.rdata.length <= 10) {
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
        function jiance(x) {
          return x < 10 ? '0' + x : x
        }
        var arr = res.data.rdata
        var myDate = new Date()
        arr.map(function (val, i) {
          var date1 = new Date(val.createTime.substring(0, 10))
          var date = new Date(myDate.getFullYear() + '-' + jiance((myDate.getMonth() + 1)) + '-' + jiance(myDate.getDate()));
          var day = parseInt((date - date1) / 1000 / 60 / 60 / 24)
          var value = parseInt(day / 30) < 1 ? day + '天前' : parseInt(day / 30) + '月前'
          val.timeVal = value
        })
        that.setData({
          recomList: that.data.recomList.concat(res.data.rdata)
        })
        if (res.data.rdata.length <= 10) {
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
    var that = this,
      ind4 = this.data.ind4 ? this.data.ind4 : '',
      ind3 = this.data.ind3 ? this.data.ind3 : '',
      ind5 = this.data.ind5 ? this.data.ind5 : '',
      ind6 = this.data.ind6 ? this.data.ind6 : '',
      ind7 = this.data.ind7 ? this.data.ind7 : '',
      id = this.data.id ? this.data.id : '',
      zong = this.data.m_zong ? this.data.m_zong : ''
    //  更多上拉
    if (!this.data.moCom) {
      var dat = {
        limit: 10,
        page: that.data.currentPage,
        type: 1,
        money: ind5,
        exe: ind6,
        school: ind7
      }
      this.jiazai(dat)
      // 公司上拉
    } else if (!this.data.gsCom) {
      var dat = {
        limit: 10,
        page: that.data.currentPage,
        type: 1,
        comNum: ind4,
        comType: ind3,
      }
      this.jiazha(dat)
    } else if (!this.data.zwCom) {
      data = {
        limit: 1,
        page: that.data.currentPage,
        type: 1,
        positionId: id
      }
      this.jiazai(data)
    } else if (!this.data.zhCom) {
      data = {
          limit: 10,
          page: that.data.currentPage,
          type: 1,
          sort: zong
      }
    } else {
      var dat = {
        limit: 10,
        page: that.data.currentPage,
        type: 1,
      }
      this.jiazai(dat)
    }

  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


})