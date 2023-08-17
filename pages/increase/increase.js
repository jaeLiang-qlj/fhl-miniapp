// pages/edit/edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    introduction: '',
    source: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
    var arr = [{
      name: this.data.name,
      introduction: this.data.introduction,
      source: this.data.source
    }]
    var book = []
    if (listBook.length > 0) {
      book = book.concat(listBook)
    }
    book = book.concat(arr)
    wx.setStorageSync('listBook', book)
    wx.showToast({
      title: '提交成功！',
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