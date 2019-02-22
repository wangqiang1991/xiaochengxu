//时间转换
export function parseTime(time, cFormat) {

  if (!time) {
    return null;
  }

  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

//失败提示
export function showErrorToast(msg) {
  wx.showToast({
    title: msg,
    icon: "none",
    duration: 1500
  })
}

//成功提示
export function showSuccessToast(msg) {
  wx.showToast({
    title: msg,
    icon: "success",
    duration: 1500
  })
}

export function oneDayTime() {
  let timeArry = [];
  for(var k = 0; k < 2; k++){
    timeArry[k] = [];
    if(k == 0){
      for (var i = 0; i < 24; i++) {
        if (i < 10) {
          timeArry[k][i] = "0" + i;
        } else {
          timeArry[k][i] = i + '';
        }
      }
    } else {
      for (var j = 0; j < 60; j++) {
        if (j < 10) {
          timeArry[k][j] = "0" + j;
        } else {
          timeArry[k][j] = j + '';
        }
      }
    }
  }
  console.log(timeArry)
  return timeArry;
}
