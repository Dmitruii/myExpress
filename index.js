const Application = require('./framework/Application')
const userRouter = require('./src/user-router')
const jsonParser = require('./framework/parseJson')
const parseUrl = require('./framework/parseUrl')

const PORT = process.env.PORT || 666
const app = new Application()

app.use(jsonParser)
app.use(parseUrl(`http://localhost:${PORT}`))

app.addRouter(userRouter)

app.listen(PORT, e => console.log(`Server was started correctly on PORT ${PORT}`))

/**  // Old method how to use express implementation
*    const server = http.createServer((req, res) => {
*        res.writeHead(200, {
*            'Content-type': 'text/html; charset=utf-8'
*        })
*        switch (req.url) {
*            case '/':
*                return res.end(`<h1>HOME</h1>`)
*            case '/users':
*                return res.end(`<h1>USERS</h1>`)
*            case '/posts':
*                return res.end(`<h1>POSTS</h1>`)
*            default:
*                return res.end(`<h1>404 not found</h1>`)
*       }
*    })
*/