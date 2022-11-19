const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/products.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productsController = {
    newproduct: (req, res) => {
      res.render("newproduct");
    },
    modifyproduct: (req, res) => {
      let productToEdit = products.find(
        (producto) => producto.id == req.params.id
      );
      res.render("modifyproduct", { productToEdit });
    },
    update: (req, res) => {
      console.log(req.body);
      let productToUpdate = products.find(
        (producto) => producto.id == req.params.id
      );
      let image;
      if (req.files[0] != undefined) {
        image = req.files[0].filename;
      } else if (productToUpdate.img != undefined) {
        image = productToUpdate.img;
      } else {
        image = "default-image.jpeg";
      }
      let precio= "$" + req.body.precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  
      let NewProductToUpdate = {
        id: productToUpdate.id,
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        precio: precio,
        categoria: req.body.categoria,
        img: image,
        stock: req.body.stock,
        advertencia:
          "**Producto exclusivo para mayores de edad, pueden contener nicotina, la cual es una sustancia adictiva",
      };
      let newProduct = products.map((producto) => {
        if (producto.id == NewProductToUpdate.id) {
          return (producto = { ...NewProductToUpdate });
        }
        return producto;
      });
      console.log(newProduct);
      console.log("prueba2");
      fs.writeFileSync(productsFilePath, JSON.stringify(newProduct, null));
      res.redirect("/products");
    },
    product: (req, res) => {
      let producto = products.find((producto) => producto.id == req.params.id);
      res.render("product", { producto: producto });
    },
    products: (req, res) => {
      res.render("products", { products: products });
    },
    store: (req, res) => {
      let image;
      if (req.files[0] != undefined) {
        image = req.files[0].filename;
      } else {
        image = "default-image.jpeg";
      }
      let precio= "$" + req.body.precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      
      let newProduct = {
        id: products[products.length - 1].id + 1,
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        precio: precio,
        img: image,
        stock: req.body.stock,
        categoria:req.body.categoria,
        advertencia:
          "**Producto exclusivo para mayores de edad, pueden contener nicotina, la cual es una sustancia adictiva",
      };
      products.push(newProduct);
      fs.writeFileSync(productsFilePath, JSON.stringify(products, null));
      res.redirect("products");
    },
    delete: (req, res) => {
      let id = req.params.id;
      let finalProducts = products.filter((product) => product.id != id);
      fs.writeFileSync(
        productsFilePath,
        JSON.stringify(finalProducts, null, " ")
      );
      res.redirect("/products");
    },
  };
  
  module.exports = productsController;