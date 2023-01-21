const db = require('../../database/models')
const path = require('path');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');
// const fetch = require('node-fetch');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

  

// modelos

const Products = db.Product;

const dbProductsControllerAPI = {
  
  'listProducts':(req,res)=>{
    
      let listAllProducts =  Products.findAll()
      .then(products => {
        return res.status(200).json(
          {
            status: 200,
            count: products.length,
            countByCategory: {
              countVapers: products.filter(product=>product.category_id===2).length,
              countLiquids: products.filter(product=>product.category_id===1).length,
            },
            data: products,
            url: `api/listProducts`
          }
        )
      } )

},
  'show':(req,res)=>{
    let listProduct =  Products.findByPk(req.params.id)
    .then(product => {
      let response = {
        meta:{
          status:200,
          total: product.length,
          url: `api/listProducts/show/${req.params.id}`
      },
      data: {
        id:product.id,
        name: product.name,
        description: product.description,
        price:product.price,
        img: product.img,
        warning: product.warning,
        category_id:product.category_id,
        stock:product.stock
      }
      }
      res.json(response)
    })
    .catch(e =>{
      return res.status(404).json({
          message:"product not found"
      })

  })
  },
  'products': async (req,res)=>{
    let products = await fetch('http://localhost:3001/api/listProducts')
    .then(data => data.json())
    .then(products =>{
      return res.render('productApi', {products:products.data})
    })
  },
  'product': async (req,res)=>{
    let product = await fetch(`http://localhost:3001/api/listProducts/show/${req.params.id}`)
    .then(data => data.json())
    
    .then(product =>{
      console.log(product)
      return res.render('productDetailApi', {product:product.data})
    })
  }
}
module.exports = dbProductsControllerAPI;