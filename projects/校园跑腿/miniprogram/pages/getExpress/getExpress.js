// pages/getExpress/getExpress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList: [
        {
            name: '小件',
            tips: '小件：手机巴掌大小的快件，价格3元'
        },
        {
            name: '中件',
            tips: '中件：鞋服盒子大小的快件，价格5元'
        },
        {
            name: '大件',
            tips: '大件：重量超过5公斤的快件，价格8元'
        }
    ],
    typeNow: 0,
    showMore: false,
    isReward: false,
  },

  selectAddress(){
    wx.navigateTo({
      url: '../address/address'
    })
  },

  handleChangeReward(e) {
      const value = e.detail.value;
      this.setData({
          isReward: value
      })
  },

  showMore() {
      this.setData({
          showMore: !this.data.showMore
      })
  },

  selectType(e){
      const { id, tip } = e.currentTarget.dataset;
      this.setData({
          typeNow: id,
      })
      wx.showToast({
        icon: 'none',
        title: tip,
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
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})