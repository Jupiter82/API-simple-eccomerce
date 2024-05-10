const http = require('http')
const app = require("./src/config/express.config")

const httpServer = http.createServer(app)
const port = 3005

httpServer.listen(port, (error) => {
    if(!error){
        console.log(`click here : http://localhost:${port}`)
    }
})