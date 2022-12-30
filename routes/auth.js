const express = require('express')
const router = express.Router()
const isAuth = require('../middleware/auth')
const {body } = require('express-validator')

const {
    singup,
    signin,
    getUser,
    deleteUser,
    updateUser,
    changePassword
    

} = require('../controllers/auth')

// method = "POST" => localhost:8080/user/signup
router.post('/signup',[
    body('name').isString().trim().isLength({min:3,max:25}).withMessage('Please enter a valid password'),
    body('email').isEmail().normalizeEmail().trim().withMessage('Please enter a valid email adress'),
    body('password').isString().trim().isLength({min:5, max:25}).withMessage('Please enter a valid password')
], singup);
// method = "POST" => localhost:8080/user/signin
router.post('/signin', signin);

//method = "PATCH" => localhost:8080/user/update-user/id
router.patch('/update-user/:id', isAuth,updateUser);

//mehtod "GET" => localhost:8080/user/get-user-info/id
router.get('/get-user-info/:id', isAuth, getUser);

//method "DELETE" => localhost:8080/user/delete-user/id
router.delete('/delete-user/:id', isAuth, deleteUser);

//Method "POST" => localhost:8080/user/reset-password/id
router.post('/reset-password/:id',[
    body('newPassword').isString().trim().isLength({min:3,max:25}).withMessage('Please enter a valid password')
] ,isAuth, changePassword)

module.exports = router;
