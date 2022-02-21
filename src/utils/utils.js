// 将对象转换成query字符串
export function objectToQuery(object) {
  const result = []
  Object.keys(object).forEach((key) => {
    if (object[key]) {
      result.push(`${key}=${object[key]}`)
    }
  })
  return `${result.join('&')}`
}
