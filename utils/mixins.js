function mixinPage() {
  // 保存原生的 Page 函数
  const originPage = Page;
  Page = (options) => {
    const mixins = options.mixins;
    // mixins 必须为数组
    if (Array.isArray(mixins)) {
      delete options.mixins;
      // mixins 注入并执行相应逻辑
      options = mergePage(mixins, options);
    }
    originPage(options);
  };
}

const ORIGIN_PROPERTIES_PAGE = ["data"];

const ORIGIN_METHODS = [
  "onLoad",
  "onReady",
  "onShow",
  "onHide",
  "onUnload",
  "onPullDownRefresh",
  "onReachBottom",
  "onShareAppMessage",
  "onPageScroll",
  "onResize",
  "onTabItemTap",
];

function mergePage(mixins, options) {
  mixins.forEach((mixin) => {
    // 遍历 mixin 里面的所有属性
    for (let key in mixin) {
      // for (let [key, value] of Object.entries(mixin)) {
      if (ORIGIN_PROPERTIES_PAGE.includes(key)) {
        // 内置对象属性混入
        options[key] = { ...mixin[key], ...options[key] };
      } else if (ORIGIN_METHODS.includes(key)) {
        // 内置方法属性混入，优先执行混入的部分
        const originFunc = options[key];
        options[key] = function (...args) {
          mixin[key].call(this, ...args);
          return originFunc && originFunc.call(this, ...args);
        };
      } else {
        // 自定义方法混入
        options = { ...mixin, ...options };
      }
    }
  });
  return options;
}
mixinPage();
