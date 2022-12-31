const express = require('express');
const router = express.Router();

// DB
const db = require('../database/models')
const sequelize = db.sequelize;
const Users = db.User;

//EXPRESS-VALIDATOR
const { body } = require('express-validator')

//CONTROLLER
const dbUsersController = require("../controllers/dbUsersController");
// const usersController = require("../controllers/usersController");

// MIDDLEWARES

const multer = require("multer");
const path = require("path");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

//STORAGE

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/users");
  },
  filename: function (req, file, cb) {
    const newFileName =
      "user" + "_" + Date.now() + path.extname(file.originalname);
    cb(null, newFileName);
  },
});

let upload = multer({ storage: storage });


//VALIDACION FORMULARIO REGISTRO USUARIOS
const validations = [
  body('date').notEmpty().withMessage('Ingresa tu fecha de nacimiento'),
  body('name').notEmpty().isLength({min: 2}).withMessage('Escribí tu nombre'),
  body('last_name').notEmpty().isLength({min: 2}).withMessage('Escribí tu apellido'),
  body('email').isEmail().bail().withMessage('Escribe un email válido').custom((value,{req})=>{
    return Users.findOne({email:value}).then(user =>{
      if(user){
        return Promise.reject('El email ya existe')
      }
    });
  }),
  body('password').notEmpty().isLength({min: 8}).withMessage('Tu contraseña debe contener al menos 8 caracteres'),
  body('user_img').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif'];
		
		// if (!file) {
		// 	throw new Error('Tienes que subir una imagen');
		// } else {
		 	let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
				return true;
	})
]

//VALIDACION FORMULARIO LOGIN USUARIOS

const validationsLogin = [
    body('email').isEmail().bail().withMessage('Escribe un email válido'),
  body('password').notEmpty().isLength({min: 8}).withMessage('Escribe una contraseña válida')  
]



// RUTAS

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/register",guestMiddleware,dbUsersController.register);
router.post("/register",validations,dbUsersController.store);


// usuariosLogin

router.get("/login",guestMiddleware, dbUsersController.login);
router.post("/login",validationsLogin, dbUsersController.loginProcess);

//PerfilUsuario
router.get("/profile",authMiddleware, dbUsersController.profile);
router.post("/profile", upload.any(),dbUsersController.store);
router.get("/logout",dbUsersController.logout);
router.put("/profile", upload.any(),dbUsersController.update);
// router.post("/profile",validations,usersController.store);

// shoppingK
router.get("/shoppingcart", dbUsersController.shoppingcart);

module.exports = router;
