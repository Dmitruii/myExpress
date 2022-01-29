const Router = require('../framework/Router')
const usersController = require('../src/user-controller')
const router = new Router()

router.get('/users', usersController.getUsers)
router.post('/users', usersController.createUser)

module.exports = router