const express = require('express')
const router = express.Router()

const {
    singup,
    signin,
    getUser,
    deleteUser,
    updateUser
    

} = require('../controllers/auth')

// method = "POST" => localhost:8080/user/signup
router.post('/signup', singup);
// method = "POST" => localhost:8080/user/signin
router.post('/signin', signin);
//method = "PATCH" => localhost:8080/user/update-user/id
router.patch('/update-user/:id', updateUser);
//mehtod "GET" => localhost:8080/user/get-user-info/id
router.get('/get-user-info/:id', getUser);
//method "DELETE" => localhost:8080/user/delete-user/id
router.delete('/delete-user/:id', deleteUser);


module.exports = router;
