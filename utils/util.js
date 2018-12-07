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
    image:"/assets/images/defeat.png",
    duration:1500
  })
}

//成功提示
export function showSuccessToast(msg) {
  wx.showToast({
    title: msg,
    image: "/assets/images/success.png",
    duration: 1500
  })
}
