const Router = require('express')
const router = new Router()
const serviceController = require('../controllers/service.controller')

router.post('/', serviceController.createService)
router.get('/', serviceController.getServices)
router.put('/:id', serviceController.updateService)
router.delete('/:id', serviceController.deleteService)

module.exports = router