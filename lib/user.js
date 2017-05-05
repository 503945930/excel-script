import request from 'request'
import config from '../config/config'

export default class {
  /**
   * 调用 auth create
   *
   * @param {*} obj
   */
  create (obj) {
    return new Promise((resolve, reject) => {
      request({
        method: 'POST',
        url: config.userApi + '/internal/users?_type=Operator',
        json: true,
        headers: {
          'content-type': 'application/json'
        },
        body: obj
      }, (err, response, body) => {
        if (err) reject(err)
        if (body.error) reject(body)
        resolve(body)
      })
    })
  }
}
