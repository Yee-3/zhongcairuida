// pages/h-mianshi-yms/h-mianshi-yms.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		style: 'display:none',
		selectArray: [{
			"id": "1",
			"text": "面试时间不合适"
	}, {
			"id": "2",
			"text": "其他原因"
	}],
	value:'请您写下您觉得合适的面试时间（不少于三个）',
	valu:'请写下合适的面试时间：',
	idn:'1',
	ind:'1',
	ind1:'1',
	
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {

	},
	
	tanchuang: function() {
		this.setData({
			style:'display:block'
		})
	},
	
	quxiao2: function() {
		this.setData({
			style:'display:none'
		})
	},
	getDate:function(e){
		if(e.detail.text=='面试时间不合适'){
			this.setData({
				value:'请您写下您觉得合适的面试时间（不少于三个）',
				valu:'请写下合适的面试时间：'
			})
		}
		else{
			this.setData({
				value:'请输入原因',
				valu:'请输入原因',
			})
		}

},
toggleTitle(e){
	// console.log(e)
	this.setData({
		idn:e.currentTarget.dataset.index
	})
},
toggleType(e){
	this.setData({
		ind:e.currentTarget.dataset.index
	})
},
toggleRu(e){
	this.setData({
		ind1:e.currentTarget.dataset.index
	})
},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})
