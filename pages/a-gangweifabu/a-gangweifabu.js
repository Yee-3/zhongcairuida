// pages/a-gangweifabu/a-gangweifabu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    natureContent: [{
        item: '全职'
      },
      {
        item: '兼职'
      },
      {
        item: '实习'
      },
      {
        item: '全职/兼职'
      }
    ],
    style: '',
    zhiValue: '请选择',
    expValue: '请选择',
    eduValue: '请选择',
    salaValue: '请选择',
    nameValue: '请选择',
    welValue: '',
    wel_Value:'请输入',
    experContent: [],
    type: '',
    educatContent: [],
    salaContent: [],
    welContent: [],
    ty: '1',
    nameContent: [],
    app: getApp().globalData,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    this.spring = this.selectComponent("#spring");
    this.exp = this.selectComponent("#exp");
    this.edu = this.selectComponent("#edu");
    this.sala = this.selectComponent("#sala");
    this.wel = this.selectComponent("#wel");
    this.name = this.selectComponent("#name");
    this.data.app.http({
      url:'/selects/position',
      dengl:true,
      data:{},
      success(res){
        that.setData({
          nameContent:res.data.rdata[0].treeDTOS
        })
      }
    })
    // 工作类型
    this.data.app.http({
      url:'/selects/work_type',
      dengl:true,
      data:{},
      success(res){
        that.setData({
          natureContent:res.data.rdata
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
          experContent:res.data.rdata
        })
      }
    })
     // 学历要求
     this.data.app.http({
      url:'/selects/school_record',
      dengl:true,
      data:{},
      success(res){
        that.setData({
          educatContent:res.data.rdata
        })
      }
    })
     // 薪资要求
     this.data.app.http({
      url:'/selects/expect_money',
      dengl:true,
      data:{},
      success(res){
        that.setData({
          salaContent:res.data.rdata
        })
      }
    })
    // 职位福利
    this.data.app.http({
      url:'/selects/work_welfare',
      dengl:true,
      data:{},
      success(res){
        res.data.rdata.map(function(n){
          n.dandu=false
        })
        that.setData({
          welContent:res.data.rdata
        })
      }
    })
  },
  zhiwei(e) {
    console.log(e)
    this.setData({
      type: e.currentTarget.dataset.type
    })
    this.spring.show()
    this.spring.setData({
      style: 'margin-right:17rpx'
    })
  },
  exper(e) {
    this.setData({
      type: e.currentTarget.dataset.type
    })
    this.exp.show()
    this.exp.setData({
      style: 'margin-right:30rpx;min-width:180rpx'
    })
  },
  educat(e) {
    this.setData({
      type: e.currentTarget.dataset.type
    })
    this.edu.show()
    this.edu.setData({
      style: 'margin-right:25rpx;'
    })
  },
  salary(e) {
    this.setData({
      type: e.currentTarget.dataset.type
    })
    this.sala.show()
    this.sala.setData({
      style: 'margin-right:50rpx;min-width:170rpx'
    })
  },
  welfare(e) {
    this.setData({
      type: e.currentTarget.dataset.type
    })
    this.wel.show()
    this.wel.setData({
      style: 'margin-right:20rpx;'
    })
  },
  handleConfirm() {
    if (this.data.type == 1) {
      this.spring.show()
      var index = this.spring.data.index
      this.setData({
        zhiValue: this.data.natureContent[index].label
      })
    } else if (this.data.type == 2) {
      this.exp.show()
      var index = this.exp.data.index
    
      this.setData({
        expValue: this.data.experContent[index].label
      })
    } else if (this.data.type == 3) {
      console.log()
      this.edu.show()
      var index = this.edu.data.index
      this.setData({
        eduValue: this.data.educatContent[index].label
      })
    } else if (this.data.type == 4) {
      this.sala.show()
      var index = this.sala.data.index
      this.setData({
        salaValue: this.data.salaContent[index].label
      })
    } else {
      this.wel.show()
      // var that = this
      this.setData({
        welValue: this.wel.data.welList
      })
      console.log(this.data.welValue)
    }
  },
  handleCancel() {
    if (this.data.type == 1) {
      this.spring.show()
    } else if (this.data.type == 2) {
      this.exp.show()
    } else if (this.data.type == 3) {
      this.edu.show()
    } else if(this.data.type==4) {
      this.sala.show()
    }else{
      this.wel.show()
    }
  },
 confirm(){
    this.name.position()
    var index = this.name.data.ind,
      index2 = this.name.data.ind1,
      index3 = this.name.data.ind2,
      that = this
    this.setData({
      nameValue: that.data.nameContent[index].treeDTOS[index2].treeDTOS[index3].name
    })
  },
  types(e) {
    this.setData({
      ty: e.currentTarget.dataset.index
    })
  },
  zhiName(){
    this.name.position()
  },
  naCancel() {
    this.name.setData({
      isAdd: false,
      isTwo: false

    })
  },
  naConfirm(){
   this.name.position()
      var index = this.name.data.ind2
      this.setData({
        nameValue: this.data.sContent[index].item
      })
  },
  welConfirm(){

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