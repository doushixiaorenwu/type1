import { axios } from './axios'
export function getCategory () {
  return axios({
    url: '/category'
  })
}
export function detailData (id, page, pagesize) {
  return axios({
    url: `/detail/${id}`,
    params: {
      page,
      pagesize
    }
  })
}
export function getArticle (id) {
  return axios({
    url: `article/${id}`
  })
}
export function getCommend () {
  return axios({
    url: '/commend'
  })
}

export function getComment (id) {
  return axios({
    url: `user/${id}`
  })
}
export function conmentData (id) {
  return axios({
    url: `/comment/${id}`
  })
}
export function postComment (id, data) {
  return axios({
    url: `/comment_post/${id}`,
    method: 'post',
    data
  })
}
export function collection (id, data) {
  return axios({
    method: 'post',
    url: `/collection/${id}`,
    data
  })
}
export function collectionInit (id, articleid) {
  return axios({
    url: `/collection/${id}`,
    params: {
      articleid
    }
  })
}
export function download (id, data) {
  return axios({
    method: 'post',
    url: `/sub_scription/${id}`,
    data
  })
}
export function downloadInit (id, data) {
  return axios({
    url: `/sub_scription/${id}`,
    params: {
      data
    }
  })
}
// export function collectioN() {
//   return axios({
//     method: 'post',
//     url: '/collectioN'
//   });
// }
