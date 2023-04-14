const express = require('express')
const router = express.Router()


const {
  registerUser,
  logout,
  loginUser,
  getPatient,
} = require('../controllers/userControler')
const { protect } = require('../middlewares/authmw')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/get', protect, getPatient)
router.post('/logout', logout)


module.exports = router

// router.get('/' , (req, res)=> { res.status(200).json({message: "Ok"})
// })
// router.delete('/id' , (req, res)=> { res.status(200).json({message: `Delete User ${req.params.id}`})
// })
