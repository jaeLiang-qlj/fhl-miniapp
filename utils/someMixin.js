const api = require("../utils/request").Api;
const apiUser = require("../utils/request-user").ApiUser;
const report = require("../utils/report");
module.exports = {
  data: {
    link_id: "",
    channel_id: 0,
    isSh: false,
    phone: "",
    uuid: ''
  },
  onLoad(options) {
    if (options.channel_id) {
      this.setData({
        link_id: options?.link_id ?? "",
        channel_id: options?.channel_id ?? 0,
        uuid: options?.uuid ?? ''
      });
      this.getOptions();
    }
  },
  // 审核态判断
  getOptions() {
    const op = wx.getLaunchOptionsSync();
    const channel_id = this.data.channel_id;
    if (channel_id === "2" && op.scene === 1047) {
      // 腾讯渠道
      this.setData({
        isSh: true,
      });
    } else {
      this.login();
    }
  },
  // 登录
  login() {
    const token = wx.getStorageSync("token") || '';
    const {
      miniProgram: { appId },
    } = wx.getAccountInfoSync();
    const uuid = this.data.uuid
    const link_id = this.data.link_id
    const channel_id = this.data.channel_id
    if (token) {
      this.bindLink()
      report.useReportPageShow();
      return
    }
    wx.login({
      success: (res) => {
        if (res.code) {
          apiUser
            .login(appId, {
              token,
              uuid,
              code: res.code,
              link_id,
              channel_id
            })
            .then((res) => {
              const { token, userinfo } = res.data.data;
              wx.setStorageSync("token", token);
              wx.setStorageSync("userinfo", userinfo);
              report.useReportPageShow();
            })
            .catch((error) => {
              console.log('登陆报错：', error);
            });
        }
      },
    });
  },
  bindLink() {
    let data = {
      link_id: this.data.link_id,
      channel_id: this.data.channel_id
    };
    apiUser.bindLink(data).then((res) => { });
  },
  openImg() {
    const { puid } = wx.getStorageSync("userinfo");
    api
      .getQr(puid)
      .then(({ data }) => {
        if (data.code === 0) {
          wx.previewImage({
            urls: [data.data.qr_code],
          });
          report.useReportPageClick(
            "openCode",
            "弹出公众号二维码",
            "微信领取报考资格",
            "按钮"
          );
        }
      })
      .catch((error) => { });
  },
  phoneInput(e) {
    const value = e.detail.value.trim();
    this.setData({
      phone: value,
    });
  },
  jump() {
    wx.navigateTo({
      url: '/pages/agreement/index',
    })
  },
  submitPhone() {
    const phone = this.data.phone;
    var reg = /^1\d{10}$/;
    if (phone == "") {
      wx.showToast({
        title: "手机号不能为空",
        icon: "none",
      });
      return;
    }
    if (!reg.test(phone)) {
      wx.showToast({
        title: "请输入正确的手机号",
        icon: "none",
      });
    } else {
      wx.showToast({
        title: "提交成功",
        icon: "none",
      });
      setTimeout(() => {
        this.setData({
          phone: "",
        });
      }, 1500);
    }
  },
};
