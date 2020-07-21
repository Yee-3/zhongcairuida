//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // // 登录
    // wx.login({
    //   success: res => {
    //     console.log(res)
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // console.log(res)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
   
  },
 
  globalData: {
    userInfo: null,
    baseUrl:'http://123.56.114.88:8089',
    http(obj) {
      // console.log(webUrl)
      // var webUrl='http://192.168.100.240:8089'
      var webUrl='http://123.56.114.88:8089'
      if (!obj.dengl) {
        wx.request({
          url: webUrl + obj.url,
          data: obj.data,
          method: obj.method ? obj.method : 'GET',
          header: {
            'content-type': obj.header ? "application/json" : 'application/x-www-form-urlencoded',
            // 'maijiToken': 'abc494548414c8d8abc14541abc84cc1'
            'Authorization': wx.getStorageSync('Authorization')
          },
          success: function (res) {
            obj.success(res)
            // console.log(wx.getStorageSync('Authorization'))
          }
        })
      } else {
        if (wx.getStorageSync('Authorization')) {
          wx.request({
            url: webUrl + obj.url,
            data: obj.data,
            method: obj.method ? obj.method : 'GET',
            header: {
              'content-type': obj.header ? 'application/json' : 'application/x-www-form-urlencoded',
              // 'maijiToken': 'abc494548414c8d8abc14541abc84cc1',
              'Authorization': wx.getStorageSync('Authorization')
            },
            success: function (res) {
              if (res.data.code == 401) {
                wx.showToast({
                  title: '您未登录请登录后重试',
                  icon: 'none'
                })
                setTimeout(function () {
                  wx.navigateTo({
                    // url: '/pages/enter/enter'
                  })
                }, 1600)
              }
              obj.success(res)
            }
          })
        } else {
          wx.showToast({
            title: '您未登录请登录后重试',
            icon: 'none'
          })
          setTimeout(function () {
            wx.navigateTo({
              // url: '/pages/enter/enter'
            })
          }, 1600)
        }
      }
    }

  }
})