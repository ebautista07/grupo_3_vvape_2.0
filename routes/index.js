const express = require('express');
const router = express.Router();
const { body } = require('express-validator')


const mainController = require("../controllers/mainController");
const productsController = require("../controllers/productsController");
const dbProductsController = require("../controllers/dbProductsController");
const usersController = require("../controllers/usersController");

// CONTROLLERS API
const dbProductsControllerAPI = require("../controllers/apis/dbProductsControllerAPI");

const multer = require("multer");
const path = require("path");

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    const newFileName =
      "product" + "_" + Date.now() + path.extname(file.originalname);
    cb(null, newFileName);
  },
});

let upload = multer({ storage: storage });


//VALIDACION CREACION PRODUCTOS

const validationsProducts = [
  body('name').notEmpty().isLength({min: 5}).withMessage('El nombre debe tener mínimo 5 caracteres'),
  body('description').notEmpty().isLength({min: 20}).withMessage('La descripción debe tener mínimo 20 caracteres'),
  body('img').custom((value, { req }) => {
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

// Principal
router.get("/", mainController.index);

//product search list
router.get("/products/list", dbProductsController.detail);
router.post("/products/list", dbProductsController.detail);

// productos
router.get("/products", dbProductsController.products);

// productos detallados
router.get("/products/:id", dbProductsController.product);

// createproduct
router.get("/newproduct", dbProductsController.newproduct);
router.post("/products", validationsProducts,upload.any(), dbProductsController.store);
// router.post("/products", upload.any(), productsController.store);

//modifyproduct
router.get("/products/:id/modifyproduct", dbProductsController.modifyproduct);
router.put("/products/modify/:id", upload.any(), dbProductsController.update);
// router.get("/products/:id/modifyproduct", productsController.modifyproduct);
// router.post("/products/modify/:id", upload.any(), productsController.update);

// eliminar
router.delete("/products/delete/:id", dbProductsController.delete);
// router.post("/products/delete/:id", productsController.delete);

// APIS
router.get('/api/listProducts',dbProductsControllerAPI.listProducts)
router.get('/api/listProducts/show/:id',dbProductsControllerAPI.show)
router.get('/api/products',dbProductsControllerAPI.products)
router.get('/api/listProducts/detail/:id',dbProductsControllerAPI.product)
// APIS END

module.exports = router;

