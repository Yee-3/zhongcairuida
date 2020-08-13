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
		val: '',
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
		rea_value: '',
		deta_value: '',

		latitude: "",
		longitude: "",
		scale: 14,
		markers: [],
		id: ''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.sel = this.selectComponent("#select");
		var data = {
			limit: 10,
			page: this.data.currentPage,
			type: 2,
			signUp: 'Y'
		}
		this.reword(data)
		var that = this
		//获取当前的地理位置、速度
		// 获取当前位置地图
		wx.getLocation({
			type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
			success: function (res) {
				//赋值经纬度
				that.setData({
					latitude: res.latitude,
					longitude: res.longitude,

				})
			}
		})
	},
	bindcontroltap(e) {
		var that = this;
		if (e.controlId == 1) {
			that.setData({
				latitude: this.data.latitude,
				longitude: this.data.longitude,
				scale: 15,
			})
		}
	},
	//导航
	onGuideTap: function (event) {
		var lat = Number(event.currentTarget.dataset.latitude);
		var lon = Number(event.currentTarget.dataset.longitude);
		var bankName = event.currentTarget.dataset.bankname;
		console.log(lat);
		console.log(lon);
		wx.openLocation({
			type: 'gcj02',
			latitude: lat,
			longitude: lon,
			name: bankName,
			scale: 28
		})
	},
	// 取消
	submit() {
		var that = this
		this.setData
		var type = this.data.idn == 2 ? 1 : this.data.idn == 3 ? 2 : ''
		this.data.app.http({
			url: '/index/updateStatus',
			dengl: true,
			method: 'POST',
			data: {
				id: that.data.id,
				status: 'N',
				type: type,
				why: that.sel.data.ids,
				whyValue:that.data.val
			},
			success(res) {
				console.log(res)
			}
		})
	},
	// 同意
	tongyi(e) {
		var that = this
		var type = this.data.idn == 2 ? 1 : this.data.idn == 3 ? 2 : ''
		this.data.app.http({
			url: '/index/updateStatus',
			dengl: true,
			method: 'POST',
			data: {
				id: e.currentTarget.dataset.id,
				status: 'Y',
				type: type,
			},
			success(res) {
				console.log(res)
			}
		})
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
						if(val.createTime){
							var date1 = new Date(val.createTime.substring(0, 10))
							var date = new Date(myDate.getFullYear() + '-' + jiance((myDate.getMonth() + 1)) + '-' + jiance(myDate.getDate()));
							var day = parseInt((date - date1) / 1000 / 60 / 60 / 24)
							var value = parseInt(day / 30) < 1 ? day + '天前' : parseInt(day / 30) + '月前'
							val.timeVal = value
						}
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
						if(val.createTime){
							var date1 = new Date(val.createTime.substring(0, 10))
							var date = new Date(myDate.getFullYear() + '-' + jiance((myDate.getMonth() + 1)) + '-' + jiance(myDate.getDate()));
							var day = parseInt((date - date1) / 1000 / 60 / 60 / 24)
							var value = parseInt(day / 30) < 1 ? day + '天前' : parseInt(day / 30) + '月前'
							val.timeVal = value
						}
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
	tanchuang: function (e) {
		console.log(e)
		this.setData({
			style: 'display:block',
			id: e.currentTarget.dataset.id
		})
	},

	quxiao2: function () {
		this.setData({
			style: 'display:none',
			val:''
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
	blur(e) {
		console.log(e)
		this.setData({
			val: e.detail.value
		})
	},
	toggleTitle(e) {
		// console.log(e)
		this.setData({
			idn: e.currentTarget.dataset.index,
			ind: 1
		})
		var that = this
		if (e.currentTarget.dataset.index == 1) {
			that.setData({
				currentPage: 1
			})
			var data = {
				limit: 10,
				page: that.data.currentPage,
				type: 2,
				signUp: 'Y'
			}
			this.reword(data)
		} else if (e.currentTarget.dataset.index == 2) {
			that.setData({
				currentPage: 1
			})
			var data = {
				limit: 10,
				page: that.data.currentPage,
				type: 2,
				interview: 'P'
			}
			this.reword(data)
		} else {
			that.setData({
				currentPage: 1
			})
			var data = {
				limit: 10,
				page: that.data.currentPage,
				type: 2,
				entry: 'P'
			}
			this.reword(data)
		}
	},
	toggleType(e) {
		this.setData({
			ind: e.currentTarget.dataset.index
		})
		var that = this
		if (this.data.idn == 2) {
			if (e.currentTarget.dataset.index == 1) {
				that.setData({
					currentPage: 1
				})
				var data = {
					limit: 10,
					page: that.data.currentPage,
					type: 2,
					interview: 'P'
				}
				this.reword(data)
			} else if (e.currentTarget.dataset.index == 2) {
				that.setData({
					currentPage: 1
				})
				var data = {
					limit: 10,
					page: that.data.currentPage,
					type: 2,
					interview: 'Y'
				}
				this.reword(data)
			} else {
				that.setData({
					currentPage: 1
				})
				var data = {
					limit: 10,
					page: that.data.currentPage,
					type: 2,
					interview: 'N'
				}
				this.reword(data)
			}
		} else if (this.data.idn == 3) {
			if (e.currentTarget.dataset.index == 1) {
				that.setData({
					currentPage: 1
				})
				var data = {
					limit: 10,
					page: that.data.currentPage,
					type: 2,
					entry: 'P'
				}
				this.reword(data)
			} else if (e.currentTarget.dataset.index == 2) {
				that.setData({
					currentPage: 1
				})
				var data = {
					limit: 10,
					page: that.data.currentPage,
					type: 2,
					entry: 'Y'
				}
				this.reword(data)
			} else {
				that.setData({
					currentPage: 1
				})
				var data = {
					limit: 10,
					page: that.data.currentPage,
					type: 2,
					entry: 'N'
				}
				this.reword(data)
			}
		}
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
		var that = this,
			idn = this.data.idn,
			ind = this.data.ind
		if (idn == 1) {
			var data = {
				limit: 10,
				page: that.data.currentPage,
				type: 2,
				signUp: 'Y'
			}
			this.reword(data)
		} else if (idn == 2) {
			if (ind == 1) {
				var data = {
					limit: 10,
					page: that.data.currentPage,
					type: 2,
					interview: 'P'
				}
				this.reword(data)
			} else if (ind == 2) {
				var data = {
					limit: 10,
					page: that.data.currentPage,
					type: 2,
					interview: 'Y'
				}
				this.reword(data)
			} else {
				var data = {
					limit: 10,
					page: that.data.currentPage,
					type: 2,
					interview: 'N'
				}
				this.reword(data)
			}
		} else {
			if (ind == 1) {
				var data = {
					limit: 10,
					page: that.data.currentPage,
					type: 2,
					entry: 'P'
				}
				this.reword(data)
			} else if (ind == 2) {
				var data = {
					limit: 10,
					page: that.data.currentPage,
					type: 2,
					entry: 'Y'
				}
				this.reword(data)
			} else {
				var data = {
					limit: 10,
					page: that.data.currentPage,
					type: 2,
					entry: 'N'
				}
				this.reword(data)
			}
		}
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})