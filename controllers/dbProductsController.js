const fs = require("fs");
const path = require("path");
const db = require('../database/models')
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');


// modelos

const Products = db.Product;
const Categories = db.Category;


const productsFilePath = path.join(__dirname, "../data/products.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productsController = {
    'products': (req, res) => {
        db.Product.findAll({
            include: ['category']
        })
            .then(products => {
                res.render("products", {products,toThousand},);
            }) 
      },
      'product': (req, res) => {
        db.Product.findByPk(req.params.id,
        {
          include: ['category']
        })
        .then(product => {
            res.render("product", {product,toThousand},);
        }) 
      },
    'detail': (req, res) => {
      let searchButton = '%'
      Products.findAll({
        include:['category'],
        where: {
         name: {[db.Sequelize.Op.like]: searchButton+req.body.search+searchButton}
        }
     }).then(products=>{
        if (products.length <= 0){
          let message = "No se encontraron productos VVAPE"
          console.log(message)
          res.render('emptyList', {message,products,toThousand})
        }
          else {
            res.render('list', {products,toThousand})
        console.log(products)
        }})
        .catch(error => res.send(error))

    },
    'newproduct': (req, res) => {
      let categories = Categories.findAll();
      Promise
      .all([categories])
      .then(([categories]) =>{
        return res.render("newproduct",{categories});})
      .catch(error => res.send(error))
    },
    'store': (req, res) => {
      let image;
      if (req.files[0] != undefined) {
        image = req.files[0].filename;
      } else {
        image = "default-image.jpeg";
      }
      Products
      .create(
      {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        img: image,
        // stock: req.body.stock,
        category_id:req.body.category_id,
        warning:"**Producto exclusivo para mayores de edad, pueden contener nicotina, la cual es una sustancia adictiva"
      }
      )
      // console.log(req.body.category_id)
      .then(() => {
        return res.redirect("/products")})
      .catch(error => res.send(error))
      },
    'modifyproduct': (req, res) => {
      const Product = db.Product.findByPk(req.params.id,{
        include:['category']
      })
      const categories = Categories.findAll();
      Promise
      .all(([Product,categories]))
      .then(([Product,categories]) =>{
        res.render("modifyproduct",{Product,categories});})
      .catch(error => res.send(error))
    },
    'update': (req, res) => {
      let productToUpdate = Products.findByPk(req.params.id,{
        include:['category']
      })
      let image;
      if (req.files[0] != undefined) {
        image = req.files[0].filename;
      } else if (productToUpdate.img != undefined) {
        image = productToUpdate.img;
      } else {
        image = "default-image.jpeg";
      }
      Products.update({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        img: image,
        // stock: req.body.stock,
        category_id:req.body.category_id,
        warning:"**Producto exclusivo para mayores de edad, pueden contener nicotina, la cual es una sustancia adictiva"
      },{
        where:{id:req.params.id}
      })
      .then(() => res.redirect("/products"))
    },
    'delete': (req, res) => {
      Products.destroy({
        where:{id:req.params.id}
      })
      .then(() => res.redirect("/products"))
    },
  };
  
  module.exports = productsController;