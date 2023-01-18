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
  
  };
  
  module.exports = dbProductsControllerAPI;