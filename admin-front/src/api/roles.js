import httpRequest from '../libs/httpRequest'

export const getRoles = () => {
  return httpRequest.request({
    url: '/roles'
  })
}

export const addUserRole = (id, rid) => {
  return httpRequest.request({
    url: `/users/${id}/role`,
    method: 'put',
    data: {
      rid
    }
  })
}

export const delUserRole = (roleId, rightId) => {
  return httpRequest.request({
    url: `/roles/${roleId}/rights/${rightId}`,
    method: 'delete'
  })
}
export const addOneRole = (role) => {
  return httpRequest.request({
    url: '/roles',
    method: 'post',
    data: role
  })
}

export const delRoles = (roleId) => {
  return httpRequest.request({
    url: `/roles/${roleId}`,
    method: 'delete'
  })
}
