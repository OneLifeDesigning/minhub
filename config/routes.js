const express = require('express')
const router = express.Router()
const publicController = require('../controllers/public.controller')

router.get('/', publicController.home)

module.exports = router;