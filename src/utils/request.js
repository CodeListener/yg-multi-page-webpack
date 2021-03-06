import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.BASE_URL || 'localhost',
  timeout: 60000,
})

instance.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => {
    return Promise.reject(err)
  },
)

instance.interceptors.response.use(
  (response) => {
    if (response.data.code === 1) {
      return Promise.resolve(response.data)
    }
    console.error(`接口：${response.config.url} 请求错误`, response.data)
    return Promise.reject(response.data)
  },
  (err) => {
    const error = err
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = `${error.response.config.url}: 请求错误`
          break

        case 401:
          error.message = `${error.response.config.url}: 未授权，请登录`
          break

        case 403:
          error.message = `${error.response.config.url}: 拒绝访问`
          break

        case 404:
          error.message = `${error.response.config.url}: 请求地址出错`
          break

        case 408:
          error.message = `${error.response.config.url}: 请求超时`
          break

        case 500:
          error.message = `${error.response.config.url}: 服务器内部错误`
          break

        case 501:
          error.message = `${error.response.config.url}: 服务未实现`
          break

        case 502:
          error.message = `${error.response.config.url}: 网关错误`
          break

        case 503:
          error.message = `${error.response.config.url}: 服务不可用`
          break

        case 504:
          error.message = `${error.response.config.url}: 网关超时`
          break

        case 505:
          error.message = `${error.response.config.url}: HTTP版本不受支持`
          break

        default:
          error.message = `${error.response.config.url}: 网络异常！`
      }
      if (err.message.indexOf('timeout') >= 0) {
        error.message = '网络超时'
      }
    }
    console.error(`状态码：${error.response.status} => ${error.message}`)
    // return Promise.reject(err)
  },
)

export function get(url, params, config) {
  return instance.get(url, {
    ...config,
    params,
  })
}
export function post(url, data, config) {
  return instance.post(url, {
    ...config,
    data,
  })
}

export default instance
