const http = require('http')
const EventEmitter = require('events')
const path = require('path')

module.exports = class Application {
    constructor() {
        this.emitter = new EventEmitter()
        this.server = this._createServer()
        this.middleWares = []
    }

    use(middleware) {
        this.middleWares.push(middleware)
    }

    listen(port, callback) {
        this.server.listen(port, callback)
    }

    addRouter(router) {
        Object.keys(router.endpoints).forEach(path => {
            const endpoint = router.endpoints[path]
            Object.keys(endpoint).forEach(method => {
                this.emitter.on(this._getRouteMask(path, method), (req, res) => {
                    const handler = endpoint[method]
                    handler(req, res)
                })
            })
        })
    }

    _createServer() {
        return http.createServer((req, res) => {
            let body = ''
            req.on('data', (chank) => {
                body += chank
            })
            req.on('end', () => {
                if (body) {
                    req.body = JSON.parse(body)
                }
                this.middleWares.forEach(middleware => middleware(req, res))
                const emitted = this.emitter.emit(this._getRouteMask(req.pathname, req.method), req, res)
                if (!emitted) {
                    res.end(`<h1>404 not found</h1>`)
                }
            })
        })
    }

    _getRouteMask(path, method) {
        return `${path}:${method}`
    }
}
