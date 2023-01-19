const express = require('express');
const router = express.Router();

// DB
const db = require('../database/models')
const sequelize = db.sequelize;
const Users = db.User;
const { body } = require('express-validator')

//EXPRESS-VALIDATOR

//CONTROLLERS
const dbUsersController = require("../controllers/dbUsersController");
// const usersController = require("../controllers/usersController");

// CONTROLLERS API
const dbUsersControllerAPI = require("../controllers/apis/dbUsersControllerAPI");


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
const validations = (req,res) => {
  body('date').notEmpty().withMessage('Ingresa tu fecha de nacimiento').run(req),
  body('name').notEmpty().isLength({min: 2}).withMessage('Escribí tu nombre').run(req),
  body('last_name').notEmpty().isLength({min: 2}).withMessage('Escribí tu apellido').run(req),
  body('email').isEmail().bail().withMessage('Escribe un email válido').custom((value,{req})=>{
    return Users.findOne({email:value}).then(user =>{
      if(user){
        return Promise.reject('El email ya existe')
      }
    });
  }).run(req),
  body('password').notEmpty().isLength({min: 8}).withMessage('Tu contraseña debe contener al menos 8 caracteres').run(req),
  body('user_img').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif'];
		let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
				return true;
	}).run(req)
}

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

// APIS

router.get('/api/listUsers',dbUsersControllerAPI.listUsers)
router.get('/api/listUsers/show/:id',dbUsersControllerAPI.show)
router.get('/api/users',dbUsersControllerAPI.users)
router.get('/api/listUsers/detail/:id',dbUsersControllerAPI.user)
// APIS END

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
