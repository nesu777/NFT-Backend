const express = require('express')
const router = express.Router()

const ctrls = require('../controllers')

router.get('/', ctrls.assets.index)
router.post('/', ctrls.assets.create)
router.put('/:id', ctrls.assets.update)
router.delete('/:id', ctrls.assets.destroy)


module.exports = router