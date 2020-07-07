// pages/components/zhi-name/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    content: {
      type: Array
    },
    contentT: {
      type: Array
    },
    contentS: {
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
  },

  /**
   * 组件的初始数据
   */
  data: {
    isAdd:false,
    isTwo:false,
    ind:'',
    ind1:'',
    ind2:'',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toggle(e){
      this.setData({ ind:e.currentTarget.dataset['index']})
      var two=this.data.isTwo
      this.setData({isTwo:!two})
    },
    toggle1(e){
      this.setData({ ind1:e.currentTarget.dataset['index']})
    },
    toggle2(e){
      this.setData({ ind2:e.currentTarget.dataset['index']})
    },
    position(){
      var add=this.data.isAdd
      this.setData({isAdd:!add})	  
    },
    hide(){
      var two=this.data.isTwo
      this.setData({isTwo:!two})
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
