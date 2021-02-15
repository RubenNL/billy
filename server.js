const http = require('http')
const express = require('express')
var proxy = require('express-http-proxy')
const app = express()
app.use(express.json())
const server = http.createServer(app)
const compression = require('compression')
app.use(compression({filter: shouldCompress}))
function shouldCompress(req, res) {
	if (req.headers['x-no-compression']) return false
	return compression.filter(req, res)
}

app.use(
	express.static('src/main/resources/resources', {
		setHeaders: function (res, path) {
			if (path.includes('js_commonjs-proxy')) res.set('Content-Type', 'application/javascript')
		},
	})
)

app.use('/', proxy('http://localhost:8080/'))

server.listen(process.env.PORT || 8000)
