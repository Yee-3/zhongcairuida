// pages/components/spring-box/spring-box.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      // 初始值
      value: ''
    },
    content: {
      type: Array
    },
    confirmText: {
      type: String,
      value: '确定'
    },
    cancelText: {
      type: String,
      value: '取消'
    },
    style:{
      type:String,
      value: "margin-right:17rpx"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false,
    edu: [],
    valu: '请选择',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 添加index
    toggle(e) {
      // console.log(e.currentTarget.dataset['index'])
      var that=this
      var index=e.currentTarget.dataset['index']
      this.setData({
        edu: that.data.edu.push(1)
      })
      console.log(this.data.edu)
    },
    show() {
      console.log(this.data.style)
      var show = this.data.isShow
      this.setData({
        isShow: !show,
        // style:'margin-right:'+17+'rpx;'
      })
    },
    _cancel() {
      //触发取消回调
      this.triggerEvent("cancel")
    },
    _confirm() {
      //触发成功回调
      this.triggerEvent("confirm");
    }
  }
})