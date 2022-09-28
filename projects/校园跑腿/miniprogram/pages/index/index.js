Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner:['../../images/gdou.png','../../images/gdou1.png','../../images/gdou6.png'],// 学校图片
    
    indexConfig:[
      {
        icon:'../../images/kuaidi.png',
        text:'快递代取',
        url: '../getExpress/getExpress'
      },
      {
        icon:'../../images/dayin.png',
        text:'打印服务'
      },
      {
        icon:'../../images/paotui.png',
        text:'校园跑腿'
      },
      {
        icon:'../../images/kuaididaiji.png',
        text:'快递代寄'
      },
      {
        icon:'../../images/zujie.png',
        text:'租借服务'
      },
      {
        icon:'../../images/youxi.png',
        text:'游戏陪玩'
      },
      {
        icon:'../../images/bangsong.png',
        text:'帮我送'
      },
      {
        icon:'../../images/daiti.png',
        text:'代课服务'
      },
      {
        icon:'../../images/qita.png',
        text:'其他帮助'
      },

    ]
  },


  toDetail(e) {
    const url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
