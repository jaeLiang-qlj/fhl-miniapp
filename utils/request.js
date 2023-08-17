const GET = "GET";
const POST = "POST";
const baseUrl = "https://fhl-business-prod.qiliangjia.com";
const baseUrlTest = "https://fhl-business-stg.qiliangjia.com";
const {
  miniProgram: { envVersion },
} = wx.getAccountInfoSync();

function request(method, url, data) {
  return new Promise((resolve, reject) => {
    let header = {
      "Content-Type": "application/json",
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
  getQr: (puid) => request(GET, `/yanshang/qrcode/${puid}`),
};
module.exports = {
  Api,
};
