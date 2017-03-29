import mysql from 'mysql'
import { Map } from 'immutable'
import config from '../config/config'

export default class {
  constructor (arg) {
    this.option = {
      host: config.mysql.host,
      user: config.mysql.user,
      password: config.mysql.password,
      database: config.mysql.database
    }
  }
  /**
   * 连接
   */
  getConnect () {
    this.connection = mysql.createConnection(this.option)
  }
  /**
   * 新增
   * @param {*} sql
   */
  insert (sql) {
    if (!this.connect) {
      this.getConnect()
    }
    this.connection.connect()
    return new Promise((resolve, reject) => {
      this.connection.query(sql, function (error, results, fields) {
        if (error) reject(error)
        resolve(results)
      })
    })
  }
  /**
   * 查询
   * @param {*} sql
   */
  find (sql) {
    if (!this.connect) {
      this.getConnect()
    }
    this.connection.connect()
    return new Promise((resolve, reject) => {
      this.connection.query(sql, function (error, results, fields) {
        if (error) reject(error)
        resolve(results)
      })
    })
  }
  /**
   * 断开连接
   */
  end () {
    this.connection.end()
    this.connection = null
  }
}
