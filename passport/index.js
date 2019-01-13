const http = require('http')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const login = require('./router/login')
const checkToken = require('./router/checktoken')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())




app.use('/login', login)
app.use('/checktoken', checkToken)


let port = process.env.PORT || 8090
let server = http.createServer(app)
app.set('port', port)


server.listen(port, function () {
  console.log(`Server ${process.env.SERVER_NAME} listening on port: ${port}`)
});