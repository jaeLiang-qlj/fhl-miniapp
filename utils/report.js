const PAGE_LAUNCH_NAME = "MPLaunch"; // 小程序启动
const PAGE_SHOW_NAME = "MPShow"; // 小程序显示
const PAGE_QUERY_NAME = "MPViewScreen"; // 页面浏览-参数
const PAGE_CLICK_NAME = "MPClick"; // 页面元素点击
const PAGE_ONHIDE_NAME = "MPPageLeave"; // 页面离开
const PAGE_POPOP_NAME = "PlanPopupDisplay"; // 弹窗
const PAGE_LONGPRESS_NAME = "MPLongPress"; // 元素长按

const METHOD = "GET";
const { miniProgram } = wx.getAccountInfoSync();
const { model, brand, system } = wx.getSystemInfoSync();
const { path, query, scene } = wx.getLaunchOptionsSync();
const config = __wxConfig;
const REPORT_URL =
  miniProgram.envVersion === "release"
    ? "https://eventlog-service-prod.qiliangjia.com/r.gif"
    : "https://eventlog-service-stg.qiliangjia.com/r.gif";

const data = {
  app_id: miniProgram.appId,
  model: model,
  manufacturer: brand,
  brand: brand,
  os: system,
  os_version: system,
  title: config.global.window.navigationBarTitleText,
  url: path,
  url_path: path + obj2Param(query),
  app_version: miniProgram.version,
  scene: scene,
  project_id: query?.project_id ?? 0,
  uuid: query?.uuid ?? "",
  channel_id: query?.channel_id ?? 0,
};

/**
 * @description: 请求
 * @param {*} data
 * @return {*}
 */
function request(data) {
  return new Promise((resolve, reject) => {
    const { openid, unionid, puid } = wx.getStorageSync("userinfo");
    data.unionid = unionid || "";
    data.openid = openid || "";
    data.puid = puid || "";
    let header = {
      pragma: "no-cors",
      "cache-control": "no-cors",
    };
    wx.request({
      url: REPORT_URL,
      method: METHOD,
      header: header,
      mode: "no-cors",
      data: data,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}

/**
 * @description: 链接参数
 * @param {*} obj
 * @return {*}
 */
function obj2Param(obj) {
  const tempArray = [];
  for (const item in obj) {
    if (item) {
      tempArray.push(`${item}=${obj[item]}`);
    }
  }
  return `?${tempArray.join("&")}`;
}

// 小程序启动
function useReportPageLond() {
  data.event_name = PAGE_LAUNCH_NAME;
  data.property_url_query = JSON.stringify(query);
  data.property_is_first_time = true;
  data.property_share_url_path = path;
  request(data);
}

// 小程序页面访问
function useReportPageShow() {
  data.event_name = PAGE_SHOW_NAME;
  data.property_url_query = JSON.stringify(query);
  data.property_is_first_time = true;
  data.property_share_url_path = path;
  request(data);
}

// 页面元素点击
function useReportPageClick(id, name, content, type) {
  data.event_name = PAGE_CLICK_NAME;
  data.property_element_id = id || "";
  data.property_element_name = name || "";
  data.property_element_content = content || "";
  data.property_element_type = type || "";
  request(data);
}

// 页面参数
function useReportPageQuery() {
  data.event_name = PAGE_QUERY_NAME;
  data.property_url_query = JSON.stringify(query);
  request(data);
}

// 页面离开
function useReportPageHide() {
  data.event_name = PAGE_ONHIDE_NAME;
  data.property_url_query = JSON.stringify(query);
  request(data);
}

module.exports = {
  useReportPageLond,
  useReportPageShow,
  useReportPageClick,
  useReportPageQuery,
  useReportPageHide,
};
