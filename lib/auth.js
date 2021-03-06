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
        url: config.internalApi + '/internal/users/',
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
  list (obj) {
    return new Promise((resolve, reject) => {
      request({
        method: 'GET',
        url: config.internalApi + '/internal/users/',
        json: true,
        headers: {
          'content-type': 'application/json'
        },
        qs: obj
      }, (err, response, body) => {
        if (err) reject(err)
        if (body.error) reject(body)
        resolve(body)
      })
    })
  }
}
