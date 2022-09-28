// logs.ts
// const util = require('../../utils/util')
import { formatTime } from '../../utils/util'

Page({
  data: {
    logs: [],
    currentIndex: 0,
    dayList: [],
    list: [],
    chart: [{
      title: '今日番茄次数',
      value: '0'
    }, {
      title: '累计番茄次数',
      value: '0'
    }, {
      title: '今日专注时长',
      value: '0分钟'
    }, {
      title: '累计专注时长',
      value: '0分钟'
    }],
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
  onShow() {

    var logs = wx.getStorageSync('logs') || []
    var day = 0;
    var total = logs.length;
    var dayTime = 0;
    var totalTime = 0;
    var dayList = [];
    if (logs.length > 0) {
      for (var i = 0; i < logs.length; i++) {
        let a = logs[i].date + ""
        let b = formatTime(new Date) + ""
        if (a.slice(0, 10) == b.slice(0, 10)) {
          day = day + 1;
          dayTime = dayTime + parseInt(logs[i].time);
          dayList.push(logs[i]);
          this.setData({
            dayList: dayList,
            list: dayList
          })
        }
        totalTime = totalTime + parseInt(logs[i].time);
      }
      this.setData({
        'chart[0].value': day,
        'chart[1].value': total,
        'chart[2].value': dayTime + '分钟',
        'chart[3].value': totalTime + '分钟',
      })
    }
  },


  changeType(e) {
    let index = e.currentTarget.dataset.index;
    if (index == 0) {
      this.setData({
        list: this.data.dayList
      })

    } else if (index == 1) {
      var logs = wx.getStorageSync('logs') || []
      this.setData({
        list: logs
      })

    }

    this.setData({
      currentIndex: index
    })
  }


})
