const express = require('express');
const router = express.Router();
const auth=require('../middleware/auth.js')


const userController = require('../controllers/user.js')

router.post('/register', userController.userRegister)

router.post('/login', userController.userLogin)

router.post('/createImage',auth, userController.createImage)

router.get('/getImages', userController.getImages)

router.get('/getImage/:id', userController.getImage)

router.get('/search',userController.getImageBySearch)



module.exports = router;