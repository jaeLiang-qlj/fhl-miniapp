// pages/demo8/demo8.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listBook: [],
    sex: 1,
    search: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},
  // 新增书籍
  addBook() {
    wx.navigateTo({
      url: '/pages/increase/increase',
    })
  },
  // 删除书籍
  removeBook(e) {
    const that = this
    that.data.listBook.splice(e.target.dataset.index, 1)
    that.setData({
      listBook: that.data.listBook
    })
    wx.setStorageSync('listBook', that.data.listBook)
    if (e.target.dataset.index == 0) {
      wx.clearStorageSync('listBook');
    }
  },
  // 编辑书籍
  editBook(e) {
    wx.navigateTo({
      url: '/pages/edit/edit?index=' + e.target.dataset.index,
    })
  },
  //点击切换，滑块index赋值
  checkSex(e) {
    this.setData({
      sex: e.target.dataset.sex
    })
  },
  // 搜索
  search() {
    if (this.data.search.trim() == '') {
      wx.showToast({
        title: '搜索内容不能为空',
        icon: 'none'
      })
      return
    }
    wx.showToast({
      title: '正在加急更新...',
      icon: 'none'
    })
  },
  //输入框监听
  searchInput(e) {
    const values = e.detail.value
    this.setData({
      search: values
    })
  },
  // 查看详情
  detailsBook(e) {
    wx.navigateTo({
      url: '/pages/book/book?img=' + e.currentTarget.dataset.img + '&author=' + e.currentTarget.dataset.author + '&name=' + e.currentTarget.dataset.name,
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
    const listBook = wx.getStorageSync('listBook')
    this.setData({
      listBook
    })
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