const Router = require('express')
const router = new Router()
const passwordController = require('../controllers/password.controller')

router.post('/', passwordController.createPassword)
router.get('/:id', passwordController.getPasswords)
router.put('/:id', passwordController.updatePassword)
router.delete('/:id', passwordController.deletePassword)

module.exports = router