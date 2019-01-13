const express = require('express')
const router = express.Router()

function isTokenValid(token) {
  if (token && token === 'passport') {
    return true
  }
  return false
}
router.get('/', function (req, res, next) {
  const {
    token
  } = req.query
  let result = {
    error: 1, //登录失败
  }
  console.log("非师范大师傅大师傅111111111", token)
  if (isTokenValid(token)) {
    result.error = 0
    result.userId = 'test'
  }
  res.json(result)
})

module.exports = router