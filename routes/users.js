const express = require('express');
const router = express.Router();

const { body,check } = require('express-validator')
const usersController = require("../controllers/usersController");

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
  check('date').notEmpty().withMessage(''),
  check('nombre').notEmpty().withMessage('Escribí tu nombre'),
  check('apellido').notEmpty().withMessage('Escribí tu apellido'),
  check('email').isEmail().withMessage('Escribe un email valido'),
  check('password').notEmpty().isLength({min: 8}).withMessage('Tu contraseña debe contener al menos 8 caracteres')
]

// RUTAS

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// createUsers
router.get("/register",guestMiddleware,usersController.register);
router.post("/register",[
  check('date').notEmpty().withMessage(''),
  body('nombre').isLength({min:1}).withMessage('Escribí tu nombre'),
  check('apellido').notEmpty().withMessage('Escribí tu apellido'),
  check('email').isEmail().withMessage('Escribe un email valido'),
  check('password').notEmpty().isLength({min: 8}).withMessage('Tu contraseña debe contener al menos 8 caracteres')
],usersController.store);

// usuariosLogin

router.get("/login",guestMiddleware, usersController.login);
router.post("/login", usersController.loginProcess);

//PerfilUsuario
router.get("/profile",authMiddleware, usersController.profile);
router.post("/profile", upload.any(),usersController.store);
router.get("/logout",usersController.logout);
// router.post("/profile",validations,usersController.store);

// shoppingK
router.get("/shoppingcart", usersController.shoppingcart);

module.exports = router;
