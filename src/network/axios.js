import Axios from 'axios'

export function axios (config) {
  const instance = Axios.create({
    baseURL: 'http://112.74.99.5:3000/web/api',

    timeout: 10000

  })

  instance.interceptors.request.use(
    config => {
      if (localStorage.getItem('id') && localStorage.getItem('token')) {
        config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
      }
      return config
    },
    err => {
      console.log(err)
    }
  )
  instance.interceptors.response.use(
    res => {
      return res
    },
    err => {
      console.log(err)
    }
  )

  return instance(config)
}
