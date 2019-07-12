import httpRequest from '../libs/httpRequest'

export const getAllRights = (type) => {
  return httpRequest.request({
    url: `/rights/${type}`
  })
}

export const addUserRights = (roleId, rids) => {
  return httpRequest.request({
    url: `/roles/${roleId}/rights`,
    method: 'post',
    data: {
      rids: rids.join(',')
    }
  })
}
