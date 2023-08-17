// pages/edit/edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    introduction: '',
    source: '',
    index: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const listBook = wx.getStorageSync('listBook')
    this.setData({
      name: listBook[options.index].name,
      introduction: listBook[options.index].introduction,
      source: listBook[options.index].source,
      index: options.index,
    })
  },
  //输入框监听
  nameInput(e) {
    const values = e.detail.value
    this.setData({
      name: values
    })
  },
  //输入框监听
  introductionInput(e) {
    const values = e.detail.value
    this.setData({
      introduction: values
    })
  },
  //输入框监听
  sourceInput(e) {
    const values = e.detail.value
    this.setData({
      source: values
    })
  },
  // 新增书籍
  addBook() {
    const listBook = wx.getStorageSync('listBook')
    listBook[this.data.index].name = this.data.name
    listBook[this.data.index].introduction = this.data.introduction
    listBook[this.data.index].source = this.data.source
    var book = []
    book = book.concat(listBook)
    wx.setStorageSync('listBook', book)
    wx.showToast({
      title: '修改成功！',
    })
    setTimeout(() => {
      wx.navigateBack({
        url: '/pages/index/index'
      })
    }, 1000);
  },
  // 返回
  backBook() {
    wx.navigateBack({
      url: '/pages/index/index'
    })
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