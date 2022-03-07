// 将对象转换成query字符串
export function objectToQuery(object) {
  const result = []
  Object.keys(object).forEach((key) => {
    if (Array.isArray(object[key])) {
      result.push(`${key}=${object[key].toString()}`)
    } else if (object[key] || object[key] === 0) {
      result.push(`${key}=${object[key]}`)
    }
  })
  return `${result.join('&')}`
}

// 时间格式化
export function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('-')} ${[
    hour,
    minute,
    second
  ]
    .map(formatNumber)
    .join(':')}`
}
const formatNumber = (n) => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}
