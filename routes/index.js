const express = require('express');
const router = express.Router();



const mainController = require("../controllers/mainController");
const productsController = require("../controllers/productsController");
const dbProductsController = require("../controllers/dbProductsController");
const usersController = require("../controllers/usersController");

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
router.post("/products", upload.any(), dbProductsController.store);
// router.post("/products", upload.any(), productsController.store);

//modifyproduct
router.get("/products/:id/modifyproduct", dbProductsController.modifyproduct);
router.post("/products/modify/:id", upload.any(), dbProductsController.update);
// router.get("/products/:id/modifyproduct", productsController.modifyproduct);
// router.post("/products/modify/:id", upload.any(), productsController.update);

// eliminar
router.post("/products/delete/:id", dbProductsController.delete);
// router.post("/products/delete/:id", productsController.delete);



module.exports = router;

