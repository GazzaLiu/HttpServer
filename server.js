const http = require('http')
const path = require('path')
const url = require('url')
const fs = require('fs')
const port = 3000

const webPath = 'public'

// construct a server object
// req: client -> server
// res: server -> client
const server = http.createServer((req, res) => {

    console.log('Request URL: ' + req.url)

    // parse URL
    let utlPath = url.parse(req.url)
    let pathName = utlPath.pathname

    // set default to html
    if (pathName == '/' || pathName == '/index.htm') {
        pathName = '/index.html'
    }

    // convert URL to local file path
    let filePath = path.join(__dirname, webPath, pathName)
    console.log('File path: ' + filePath)

    let header = {
        'Accept-Charset': 'utf-8',
        'Accept-Language': 'zh-TW',
        'Content-Type': 'text/html'
    }

    fs.readFile(filePath, 'utf8', (error, data) => {
        // if file does not exist
        if (error) {
            console.log(filePath + ' does not exist.')
            res.writeHead(404, header)
            res.write('<h1>404 Not Found</h1>', 'utf8')
            res.end()
            return
        }
        console.log('Someone connect successfully.')
        res.writeHead(200, header)
        res.write(data)
        res.end() // make sure that all data in buffer were sent
    })
})

server.listen(port) // if we don't assign the port, the default is 80
console.log('Server running at: http://127.0.0.1:' + port)
