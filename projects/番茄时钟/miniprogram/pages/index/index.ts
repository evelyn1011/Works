// index.ts
// 获取应用实例
const app = getApp<IAppOption>()
import { formatTime } from '../../utils/util'
// const util = require('../../utils/util.js')


Page({
  data: {
    hide: true,
    winHeight: 0,
    rate: 0,
    tabNow: null,
    time: 1,
    restTime: 1,
    countDown: '01:00',
    pause: true,
    cOrQ: false,
    back: false,
    itv: null,
    progArr: [
      {
        icon: 'work',
        text: '工作'
      }, {
        icon: 'study',
        text: '学习'
      }, {
        icon: 'think',
        text: '思考'
      }, {
        icon: 'write',
        text: '写作'
      }, {
        icon: 'sport',
        text: '运动'
      }, {
        icon: 'read',
        text: '阅读'
      },
    ],
  },

  slideChange(e) {
    this.setData({
      time: e.detail.value
    })
  },

  selectTab(e) {
    this.setData({
      tabNow: e.currentTarget.dataset.id
    })
  },
  start() {
    this.setData({
      hide: false,
      restTime: this.data.time * 60 * 1000,
      countDown: this.data.time < 10 ? '0' + this.data.time + ':' + '00' : this.data.time + ':' + '00'
    }),

      this.drawBg()
    this.drawActive()

  },

  drawBg: function () {
    const lineWidth = 6 / this.data.rate;//px
    const query = wx.createSelectorQuery()
    query.select('#pr-bg')
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')
        const dpr = wx.getSystemInfoSync().pixelRatio
        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr
        ctx.scale(dpr, dpr)
        ctx.lineCap = 'round'
        ctx.lineWidth = "lineWidth"
        ctx.beginPath()
        // 画圆：圆心x 圆心y 半径 0 圆周长 false
        ctx.arc(400 / this.data.rate / 2, 400 / this.data.rate / 2, 400 / this.data.rate / 2 - 2 * lineWidth, 0, 2 * Math.PI, false)
        // 圆周颜色
        ctx.strokeStyle = "#000000"
        ctx.stroke()
      })
  },
  drawActive: function () {
    /*
      角度：1.5 + 2 *（逝去时间/时间）
    */
    // var passTime = 0
    var totalTime = this.data.time * 60 * 1000

    // 计时器
    var itv = setInterval(() => {

      // 角度 每100ms计时 剩余s
      var angle = 1.5 + 2 * ((totalTime - this.data.restTime) / totalTime)
      var restTime = this.data.restTime - 100
      this.setData({
        restTime: restTime
      })
      // var rest = (totalTime - passTime) / 1000

      if (angle < 3.5) {


        // 绘图
        const lineWidth = 6 / this.data.rate;//px
        const query = wx.createSelectorQuery()
        query.select('#pr-active')
          .fields({ node: true, size: true })
          .exec((res) => {
            const canvas = res[0].node
            const ctx = canvas.getContext('2d')
            const dpr = wx.getSystemInfoSync().pixelRatio
            canvas.width = res[0].width * dpr
            canvas.height = res[0].height * dpr
            ctx.scale(dpr, dpr)
            ctx.lineCap = 'round'
            ctx.lineWidth = "lineWidth"
            ctx.beginPath()
            // 画圆：圆心x 圆心y 半径 0 圆周长 false
            ctx.arc(400 / this.data.rate / 2, 400 / this.data.rate / 2, 400 / this.data.rate / 2 - 2 * lineWidth, 1.5 * Math.PI, angle * Math.PI, false)
            // 圆周颜色
            ctx.strokeStyle = "#ffffff"
            ctx.stroke()
          })

        // 设置时间
        if (restTime % 1000 == 0) {
          restTime = restTime / 1000
          var min = parseInt(restTime / 60);
          var sec = Math.floor(restTime % 60);
          var minutes = min < 10 ? '0' + min : '' + min
          var seconds = sec < 10 ? '0' + sec : '' + sec
          this.setData({
            countDown: minutes + ':' + seconds
          })
        }


        this.setData({
          itv: itv
        })

      } else {
        var logs = wx.getStorageSync('logs') || [];
        // console.log('formatTime(new Date):',formatTime(new Date))
        // console.log('typeof:',typeof(formatTime(new Date)))
        logs.unshift({
          date: formatTime(new Date),
          tab: this.data.tabNow,
          time: this.data.time
        })
        wx.setStorageSync('logs', logs);
        
        clearInterval(itv)
        this.setData({
          pause: false,
          back: true
        })
      }

    }, 100)

  },

  pause() {
    clearInterval(this.data.itv)
    this.setData({
      pause: false,
      cOrQ: true,
    })
  },

  continue() {
    this.drawActive();
    this.setData({
      cOrQ: false,
      pause: true,
    })
  },

  quit() {
    clearInterval(this.data.itv);
    this.setData({
      pause: true,
      cOrQ: false,
      back: false,
      hide: true,
      tabNow: null
    })
  },

  back() {
    this.setData({
      pause: true,
      cOrQ: false,
      back: false,
      hide: true,
      tabNow: null
    })
  },






  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  onLoad() {
    var res = wx.getSystemInfoSync();
    var rt = 750 / res.windowWidth;
    this.setData({
      rate: rt,
      winHeight: res.screenHeight * rt
    })
    // @ts-ignore
    // if (wx.getUserProfile) {
    //   this.setData({
    //     canIUseGetUserProfile: true
    //   })
    // }
  },
  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e: any) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
