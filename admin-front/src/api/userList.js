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

export const editUser = (id, email, mobile) => {
  return httpRequest.request({
    url: `/users/${id}`,
    method: 'put',
    data: {
      email,
      mobile
    }
  })
}

export const changeUserStatus = (id, type) => {
  return httpRequest.request({
    url: `/users/${id}/state/${type}`,
    method: 'put'
  })
}

export const removeUser = (id) => {
  return httpRequest.request({
    url: `/users/${id}`,
    method: 'delete'
  })
}
