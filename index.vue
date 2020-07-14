<template>
	<view>
		<view v-if="isCanUse">
			<view>
				<view class='header'>
					<image src="../../static/img/logo.png"></image>
				</view>
				<view class='content'>
					<view>申请获取以下权限</view>
					<text>获得你的公开信息(昵称，头像、地区等)</text>
				</view>
				<button class='bottom' type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="login">
					授权登录
				</button>
				
				<button class='nologin' type='default' withCredentials="true" lang="zh_CN" @click="noLogin">
					先去看看
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from "vuex";
	export default {

		data() {
			return {
				//登录状态 及其信息
				SessionKey: '',
				OpenId: '',
				nickName: null,
				avatarUrl: null,
				code: null,
				isCanUse: uni.getStorageSync('isCanUse') || true, //默认为true,
				//parentId
				parentId: '',
				
				//在哪来的 ；  目前只有区分是否来自于分享
				from : 'login' ,
				//分享的课程ID
				ID : '' ,
				path : '' ,
			};
		},
		methods: {
			...mapActions(["getUserInfo", "GetloginState"]),
			//不登陆
			noLogin () {
				uni.reLaunch({
					url:'/pages/index/index'
				})
			},
			//拿到用户信息
			//登录
			login(options) {
				let _this = this;
				console.log(options.detail)
				_this.nickName = options.detail.userInfo.nickName;
				_this.avatarUrl = options.detail.userInfo.avatarUrl;
				uni.showLoading({
					title: '登录中...',
					mask: true,
				});
				// 1.wx获取登录用户code
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						let code = loginRes.code;
						_this.code = code;
						_this.GetloginState({
							code: _this.code,
							nickName: _this.nickName,
							avatarUrl: _this.avatarUrl,
							from : _this.from ,
							path : `${_this.path}?from=shareDown&ID=` + _this.ID ,
						});
					},
				});
			},
		},
		onLoad(options) { //默认加载
		console.log('这是登录页')
			if (options.parentId) {
				console.log(options)
				uni.setStorageSync('parentId', options.parentId);
			}
			//如果来自于分享页
			if(options.from) {
				this.from = options.from;
				this.ID = options.ID;
				this.path = options.path;
				
				console.log(this.path)
			}
			// uni.getUserInfo({
			// 	provider: 'weixin',
			// 	success: function(infoRes) {
			// 		_this.nickName = infoRes.userInfo.nickName; //昵称
			// 		_this.avatarUrl = infoRes.userInfo.avatarUrl; //头像
			// 	}
			// })
		}
	}
</script>

<style lang="scss">
	.header {
		margin: 90rpx 0 90rpx 50rpx;
		border-bottom: 1px solid #ccc;
		text-align: center;
		width: 650rpx;
		height: 300rpx;
		line-height: 450rpx;
	}

	.header image {
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%;
	}

	.content {
		margin-left: 50rpx;
		margin-bottom: 90rpx;
	}

	.content text {
		display: block;
		color: #9d9d9d;
		margin-top: 40rpx;
	}

	.bottom {
		border-radius: 80rpx;
		margin: 70rpx 50rpx;
		font-size: 35rpx;
	}
	.nologin {
		border-radius: 80rpx;
		margin: 70rpx 50rpx;
		font-size: 35rpx;
		color: #8a7353 !important;
	}
</style>
