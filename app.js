import Excel from './lib/excel'
import Auth from './lib/auth'
import Mysql from './lib/mysql'
import path from 'path'

async function compare () {
  try {
    // 读取excel 数据
    let excel = new Excel({
      path: path.join(__dirname, './file/对比.xlsx')
    })
    let data = excel.parseJson()
    for (let item2 of data['Sheet2']) {
      for (let item1 of data['Sheet1']) {
        if (item2['xktvid'] === item1['xktvid']) {
          console.log(item1)
        }
      }
    }
  } catch (error) {
    console.error('error', error)
  }
}

compare()
