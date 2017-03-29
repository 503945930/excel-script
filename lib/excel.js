import XLSX from 'xlsx'
import { Map } from 'immutable'

export default class {
  constructor (arg) {
    this.option = Map(arg)
  }

  getWorkbook () {
    this.workbook = XLSX.readFile(this.option.get('path'))
  }
  /**
   * 获取表名
   *
   */
  getSheetNames () {
    if (!this.workbook) {
      this.getWorkbook()
    }
    let sheetNames = this.workbook.SheetNames
    return sheetNames
  }

 /**
  * 解析 Excel 生成 JSON
  */
  parseJson () {
    if (!this.workbook) {
      this.getWorkbook()
    }
    let result = {}
    this.workbook.SheetNames.forEach((sheetName) => {
      let worksheet = this.workbook.Sheets[sheetName]
      result[sheetName] = XLSX.utils.sheet_to_json(worksheet)
    })
    return result
  }
}
