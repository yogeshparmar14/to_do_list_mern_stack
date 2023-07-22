const express = require('express');
const { registration,login } = require('../modules/authentication/authController.js');
const authValidation =require("../modules/authentication/authValidationSchemas.js");
const {addTask,getAllTask,updateTask,deleteTask} = require('../modules/authentication/taskController.js');
// const authTokenCheck =require("../modules/authentication/authaTokenCheck.js")
const checkUserAuth=require('../modules/authentication/authaTokenCheck.js')

const router = express.Router();


//Router level Middleware - To Protect Route
// router.use('/register',validationRegister);
 

//Public routes
router.post('/register',authValidation,registration);
router.post('/login',login)
router.post('/addtask',checkUserAuth,addTask)
router.get('/getAllTask',checkUserAuth,getAllTask)
router.put('/updateTask/:id',checkUserAuth,updateTask)
router.delete('/deleteTask/:id',checkUserAuth,deleteTask)
 





module.exports = router;