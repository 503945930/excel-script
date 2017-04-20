import Auth from './lib/auth'
import User from './lib/user'
async function couchbaseToMysql () {
  try {
    let auth = new Auth()
    let response = await auth.list({limit: 300})
    let user = new User()
    for (let item of response) {
      try {
        console.log('item', item)
        let body = {
          displayName: item.displayName || '',
          password: item.password || '',
          email: item.email || '',
          locationLat: item.location ? item.location.lat : '',
          locationLon: item.location ? item.location.lon : '',
          cityId: '',
          mobile: item.mobile.profile.mobile || '',
          ktvId: item.ktvId || '',
          role: item.role || '',
          wechat: {
            openid: item.wechat.profile.openid || '',
            nickName: item.wechat.profile.nickName || '',
            sex: item.wechat.profile.sex || '',
            language: item.wechat.profile.language || '',
            province: item.wechat.profile.province || '',
            country: item.wechat.profile.country || '',
            headimgurl: item.wechat.profile.headimgurl || '',
            privilege: item.wechat.profile.privilege || ''
          }
        }

        user.create(body)
      } catch (error) {
        console.log('err', error)
        continue
      }
    }
    // console.log('response', response.length)
  } catch (error) {
    console.error('error', error)
  }
}

couchbaseToMysql()
