import { axios } from './axios'

export function Uploaderimg (data) {
  return axios({
    url: '/upload',
    method: 'post',
    data
  })
}

export function UserUpdat (id, data) {
  return axios({
    url: `/update/${id}`,
    method: 'post',
    data
  })
}
