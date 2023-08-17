const GET = "GET";
const POST = "POST";
const baseUrl = "https://fhl-ucenter-prod.qiliangjia.com";
const baseUrlTest = "https://fhl-ucenter-stg.qiliangjia.com";
const {
  miniProgram: { envVersion },
} = wx.getAccountInfoSync();
const { query } = wx.getLaunchOptionsSync();
const projectId = query?.project_id ?? 0;

function request(method, url, data) {
  return new Promise((resolve, reject) => {
    let header = {
      "Content-Type": "application/json",
      Authorization: 'Bearer ' + wx.getStorageSync("token") ?? "",
    };
    wx.request({
      url: envVersion === "release" ? baseUrl + url : baseUrlTest + url,
      method: method,
      header: header,
      data: method === POST ? JSON.stringify(data) : data,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}
const Api = {
  login: (appid, data) =>
    request(
      POST,
      `/api/v1/projects/${projectId}/mini-programs/${appid}/login`,
      data
    ),
  bindLink: (data) =>
    request(
      POST,
      `/api/v1/projects/${projectId}/entry-links/bind`,
      data
    ),
};
module.exports = {
  ApiUser: Api,
};
