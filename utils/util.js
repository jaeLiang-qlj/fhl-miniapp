/**
 * 时间转换格式
 * @param {Date | String | number} [timestamp] 时间对象或者时间字符串
 * @param {String} [formats = "Y-m-d H:i:s"] 转换格式
 * formats格式包括
 * 1. Y-m-d
 * 2. Y-m-d H:i:s
 * 3. Y年m月d日
 * 4. Y年m月d日 H时i分
 * @return {String} 转换结果
 */
function formatDate(timestamp, formats = "Y-m-d H:i:s") {
  let zero = function (value) {
    if (value < 10) {
      return "0" + value;
    }
    return value;
  };
  let myDate = null;
  if (typeof timestamp === "string") {
    myDate = new Date(timestamp.replace(/-/g, "/"));
  } else if (typeof timestamp === "number") {
    myDate = new Date(timestamp);
  } else {
    myDate = timestamp;
  }
  if (!myDate.getTime()) {
    myDate = new Date();
  }

  let year = myDate.getFullYear();
  let month = zero(myDate.getMonth() + 1);
  let day = zero(myDate.getDate());

  let hour = zero(myDate.getHours());
  let minite = zero(myDate.getMinutes());
  let second = zero(myDate.getSeconds());

  return formats.replace(/Y|m|d|H|i|s/gi, function (matches) {
    return {
      Y: year,
      m: month,
      d: day,
      H: hour,
      i: minite,
      s: second,
    }[matches];
  });
}

function formatTime(time, format) {
  let temp = "0000000000" + time;
  let len = format.length;
  return temp.substr(-len);
}

module.exports = {
  formatDate,
  formatTime: formatTime,
};
