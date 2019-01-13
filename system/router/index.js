const express = require('express')
const router = express.Router()
const request = require('request')


router.get('/', function(req, res, next) {
  // 浏览到系统a的首页返回ejs
  const {user} = req.session
  console.log("沙发斯蒂芬等多个让他一人一天雨", req.session)
  if(user) {
    res.send(`user信息${user}`)
  } else {
    // 没有用户信息 就取全局认证登录
    /*
      区分下有没有token 
    */
    const {
      token
    } = req.query
    const {
      host
    } = req.headers
   
    if(!token) {
      res.redirect(`http://www.passport.com:8090/login?callbackUrl=${host}`)
    } else {
      let url = `http://www.passport.com:8090/checktoken?token=${token}&t=${new Date().getTime()}`
      request({
        method:"GET",
        url:url,
        headers:{
          "content-type":"application/json"
        },
        json:true
      },(error,response,data)=>{
        if (!error && response.statusCode === 200) {
          // { error: 0, userId: 'test' }
          console.log("法国人供热太热一天也", data)
          console.log("法国人供热太热一天也11111", data.userId)
          if(data.error == 0) {
            let userId = data.userId // 加密的useID
            if (!userId) {
              res.redirect(`http://www.passport.com:8090/login?callbackUrl=${host}`)
              return;
            } else {
              req.session.user = data.userId
              res.render('index', {
                user: data.userId,
                system: 0
              })
            }
          } else {
            res.redirect(`http://www.passport.com:8090/login?callbackUrl=${host}`)
          }
        } else {

        }
      })
    }
  }
})
module.exports = router