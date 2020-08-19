import { axios } from './axios'
export function registerText (data) {
  return axios({
    url: '/register',
    method: 'post',
    data
  })
}
export function loginText (data) {
  return axios({
    url: '/login',
    method: 'post',
    data
  })
}

export function UserInfoData (id) {
  return axios({
    url: `/user/${id}`
  })
}
