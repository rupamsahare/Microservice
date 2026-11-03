const express = require('express')

const router = express.Router()
const userController = require('../controller/user.controller')
const authMiddileware = require('../middileware/authMiddileware')


router.post('/registr',userController.register)
router.post('/login',userController.login)
router.get('/logout',userController.logout)
router.get('/profile',authMiddileware.userAuth,userController.profile)


module.exports = router