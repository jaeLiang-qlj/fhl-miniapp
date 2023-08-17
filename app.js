require("./utils/mixins");
// app.js
const defaultTime = {
  defaultWorkTime: 25,
  defaultRestTime: 30,
};
const report = require("./utils/report");
App({
  onLaunch() {
    let workTime = wx.getStorageSync("workTime");
    let restTime = wx.getStorageSync("restTime");
    if (!workTime) {
      wx.setStorage({
        key: "workTime",
        data: defaultTime.defaultWorkTime,
      });
    }
    if (!restTime) {
      wx.setStorage({
        key: "restTime",
        data: defaultTime.defaultRestTime,
      });
    }
    setTimeout(() => {
      report.useReportPageLond();
    }, 3000);
  },
});
