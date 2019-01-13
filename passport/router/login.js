const express = require('express')
const router = express.Router()

router.get('/', function(req, res, next){
  let cookies = req.cookies
  let token = cookies.token
  const { 
    callbackUrl
  } = req.query
  console.log("法规的所得税", token)
  if(token) {
    if(callbackUrl) {
      res.redirect(`http://www.testa.com:8091?token=${token}`)
    } else {
      res.send('<h1>登录成功!</h1>')
    }
  } else {
    // 啥都没有去登录
    res.render('login')
  }
})

router.post('/', function(req, res, next) {
  let body = req.body
  let name = body.name
  let password = body.password
  const { 
    callbackUrl
  } = req.query
  console.log("过分范德萨广泛的改革后", callbackUrl)
  if(name === '1' && password === '1') {
    // passport 生成token
    let token = 'passport'
    res.cookie('token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true
    })
    if(callbackUrl) {
      setTimeout(function(){
        res.redirect(`http://${callbackUrl}?token=${token}`)
      },2000)
     
    } else {
      res.send('<h1>登录成功!</h1>')
    }
  } else {
    res.send({
      error: 1,
      msg: '用户名或密码错误'
    })
  }
})
module.exports = router