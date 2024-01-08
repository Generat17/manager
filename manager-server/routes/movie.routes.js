const Router = require('express')
const router = new Router()
const movieController = require('../controllers/movie.controller')

router.post('/', movieController.createMovie)
router.get('/', movieController.getMovies)
router.put('/:id', movieController.updateMovie)
router.delete('/:id', movieController.deleteMovie)

module.exports = router