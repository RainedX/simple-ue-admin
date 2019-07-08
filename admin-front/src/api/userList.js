import httpRequest from '../libs/httpRequest'

export const getUserList = (query, pagenum, pagesize) => {
  return httpRequest.request({
    url: '/users',
    params: {
      query,
      pagenum,
      pagesize
    }
  })
}

export const addUser = (data) => {
  return httpRequest.request({
    url: '/users',
    method: 'post',
    data
  })
}
