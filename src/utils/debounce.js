export function debounce(fn, delay = 1000) {
  let timer = null // 通过闭包保存一个标记
  return function () {
    // 因为还没到规定时间又触发了，所以把之前的定时器取消，重新计时

    clearTimeout(timer)

    timer = setTimeout(() => {
      // 如果不用箭头函数的话，this 就指向全局对象了
      fn.apply(this, arguments)
    }, delay)
  }
}
