const http = require('http')
const app = require('./app')

const server = http.createServer(app)


server.listen(3001,()=>{
    console.log('user service run on 3001')
})