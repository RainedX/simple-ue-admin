import httpRequest from '../libs/httpRequest'

export const userLogin = (username, password) => {
  return httpRequest.request({
    url: '/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}
