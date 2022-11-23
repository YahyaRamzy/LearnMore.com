const express = require('express')
const router = express.Router()
const { registeruser, loginuser, viewuser, updatetos,registerCourse,refreshuser, updateEmail, updateBio, updatePassword } = require('../controllers/usercontroller')

const { protect } = require('../middleware/authMiddleware')

router.post('/new', registeruser)
router.post('/login', loginuser)
router.get('/me',protect, viewuser)
router.post('/updatetos',updatetos)
router.post('/registercourse',registerCourse)
router.post('/refreshuser',refreshuser)
router.post('/updateemail',updateEmail)
router.post('/updatebio',updateBio)
router.post('/updatepass',updatePassword)

module.exports = router