import express from 'express'
import { registerUser,loginUser,checkAuth } from '../Controllers/users';
import isLoggedIn from '../middleware/isLoggedIn'


const router = express.Router();


router.get('/isAuthenticated',isLoggedIn,checkAuth)

// router.get('/logout',logOut)

router.post('/signup',registerUser)

router.post('/login',loginUser)

export default router