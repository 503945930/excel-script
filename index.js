import Excel from './lib/excel'
import Auth from './lib/auth'
import Mysql from './lib/mysql'
import path from 'path'

/**
 * 读取BD信息表.xlsx
 */
async function init () {
  try {
    // 读取excel 数据
    let excel = new Excel({
      path: path.join(__dirname, './file/BD信息表.xlsx')
    })
    let data = excel.parseJson()

    for (let item of data['BD格式']) {
      // auth
      let obj = `{
            "displayName":"${item['BD姓名']}",
            "email":"${item['邮箱']}",
            "role": "${item['角色']},commodity-operator",
            "mobile":{
              "profile": {
                "mobile": "${item['手机号']}"
              }
            }
          }`
      let auth = new Auth()
      let body = await auth.create(JSON.parse(obj))
      // mysql
      let db = new Mysql()
      let sql = `INSERT INTO yy_operator(bdId,name,mobile,role,cityCode) 
                VALUES ('${body.id}','${item['BD姓名']}','${item['手机号']}','${item['角色']}','${item['城市ID']}')`
      await db.insert(sql)
      db.end()
    }
  } catch (error) {
    console.error('error', error)
    process.exit()
  }

  console.log('success', 'successful')
}

// init()
/**
 * 读取bd_ktv.xls
 */
async function initKtv () {
  try {
    // 读取excel 数据
    let excel = new Excel({
      path: path.join(__dirname, './file/bd_ktv.xls')
    })
    let data = excel.parseJson()
    let obj = {}
    for (let item of data['Sheet1']) {
      let db = new Mysql()
      let ktvId = 0
      if (item['ktvId'] === undefined) {
        ktvId = parseInt(item['xktvId'].substring(4))
      } else {
        ktvId = item['ktvId']
      }
      /// console.log('ktvId', ktvId)
      // 先从obj里面取
      if (obj[item['姓名']]) {
        let sqlIn = `INSERT INTO yy_bd_ktv(bdId,ktvId,xktvId) 
                VALUES ('${obj[item['姓名']]}','${ktvId}','${item['xktvId']}')`
        await db.insert(sqlIn)
      } else {
        let sql = `SELECT  bdId FROM yy_operator WHERE name='${item['姓名']}' limit 1`
        let result = await db.find(sql)
        let sqlIn = `INSERT INTO yy_bd_ktv(bdId,ktvId,xktvId)
                VALUES ('${result[0].bdId}','${ktvId}','${item['xktvId']}')`
        await db.insert(sqlIn)
        obj[item['姓名']] = result[0].bdId
      }

      db.end()
     // console.log('result', result[0].bdId)
    }
  } catch (error) {
    console.error('error', error)
    process.exit()
  }
  console.log('success', 'successful')
}

initKtv()
