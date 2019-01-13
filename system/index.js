const express = require('express')

const http = require('http')
const session = require('express-session')
const path = require('path')



// 路由
const routerindex= require('./router/index')

const app = express()
// 模板
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


// session cookie
app.use(session({
  secret: 'passport',
  // cookie: { maxAge: 60000},
  resave: false,
  saveUninitialized: false,
}))


app.use('/', routerindex)

let port = process.env.PORT || 8081
let server = http.createServer(app)
app.set('port', port)


server.listen(port, function () {
  console.log(`Server ${process.env.SERVER_NAME} listening on port: ${port}`);
});