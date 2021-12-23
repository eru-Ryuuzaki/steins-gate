let BASE_URL = '101.35.139.239:18201'
const TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  // BASE_URL = '/api'
  BASE_URL = 'http://101.35.139.239:18201'
} else if (process.env.NODE_ENV === 'production') {
  // BASE_URL = "101.35.139.239:18201" // 这里待定
}

export { BASE_URL, TIME_OUT }
