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
		value: '请您写下您觉得合适的面试时间（不少于三个）',
		valu: '请写下合适的面试时间：',
		idn: '1',
		ind: '1',
		ind1: '1',
		currentPage: 1,
		loadingType: 0,
		contentText: {
			contentdown: "上拉显示更多",
			contentrefresh: "正在加载...",
			contentnomore: "没有更多数据了"
		},
		recomList: [],
		app: getApp().globalData,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var data = {
			limit: 10,
			page: 1,
			type: 2,
			signUp: 'Y'
		}
		this.reword(data)
	},
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
	tanchuang: function () {
		this.setData({
			style: 'display:block'
		})
	},

	quxiao2: function () {
		this.setData({
			style: 'display:none'
		})
	},
	getDate: function (e) {
		if (e.detail.text == '面试时间不合适') {
			this.setData({
				value: '请您写下您觉得合适的面试时间（不少于三个）',
				valu: '请写下合适的面试时间：'
			})
		} else {
			this.setData({
				value: '请输入原因',
				valu: '请输入原因',
			})
		}

	},
	toggleTitle(e) {
		// console.log(e)
		this.setData({
			idn: e.currentTarget.dataset.index
		})
	},
	toggleType(e) {
		this.setData({
			ind: e.currentTarget.dataset.index
		})
	},
	toggleRu(e) {
		this.setData({
			ind1: e.currentTarget.dataset.index
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