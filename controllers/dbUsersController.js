const fs = require("fs");
const path = require("path");
const bcryptjs = require("bcryptjs");
const db = require('../database/models')
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');
const session = require("express-session");
const {validationResult} = require('express-validator');
const { check } = require('express-validator')

// modelos

const Users = db.User;

// const usersFilePath = path.join(__dirname, "../data/users.json");
// const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

const dbUsersController = {
  'register': (req, res) => {
    res.render("register");
  },
  
  'store': (req, res, next) => {
    let errors = validationResult(req);
    // res.send(errors);
    // console.log(validationResult)


      let image;
      if (req.files[0] != undefined) {
        image = req.files[0].filename;
      } else {
        image = "uDefault-image.png";
      }

    let hashPassword = bcryptjs.hashSync(req.body.password,10);

    Users
    .create({
      birth_date: req.body.birth_date,
      name: req.body.name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hashPassword,
    //   user_type: req.body.user_type,
      user_img: image
    })
        
    .then(() => {
        return res.redirect("/users/login")})
        .catch(errors => res.render('register', {errors:errors.errors}));
  },
      
  'login': (req, res) => {
    
    res.render("login");
  },
  'loginProcess':(req,res)=>{
    
    async function findUser (){
      let userToFind = await Users.findOne({
        where: {
            email: req.body.email
          },
          raw: true
    });
    if ((userToFind === null) || (req.body.email === '') ){
      res.render('login',{
        errors:{
          password:{
            msg:'las credenciales son incorrectas'
          }
        }
      })
    } else{
      let userToLogin=userToFind.email;
      let userPassword=userToFind.password
      console.log(userToFind.email);
      if(userToLogin){ 
        if(req.body.remindUser){
          res.cookie('userEmail',req.body.email,{
            maxAge: ((60*1000)*60)
          }) 
        } 
        let passwordOk = bcryptjs.compareSync(req.body.password,userPassword);
        if(passwordOk){
          delete userPassword;
          req.session.userLogged = userToLogin;
          
          res.redirect('/users/profile')
        }else {
          res.render('login',{
            errors:{
              password:{
                msg:'las credenciales son incorrectas'
              }
            }
          })
        }
        } 
      // console.log(userToFind instanceof Users); // true
    }

  }
  findUser();
  },
  'shoppingcart': (req, res) => {
    res.render("shoppingcart");
  },
  'profile': (req, res) => {
    // console.log(req.session);
    let userProfile = Users.findOne({
      where: {
          email: req.session.userLogged
         },
         raw: true
    }).then(user=>{
      // console.log(user);
      res.render('profile',{user})
    })
  },
  'update': (req, res) => {
    let userToUpdate = Users.findOne({
      where: {
          email: req.session.userLogged
         },
         raw: true
    })
    let image;
    if (req.files[0] != undefined) {
      image = req.files[0].filename;
    } else {userToUpdate.user_img != undefined 
      image = userToUpdate.user_img;
    } 
    // else {
    //   image = "uDefault-image.png";
    // }
    let hashPassword;
    if(req.body.password !== undefined && req.body.password !== ""){
      hashPassword = bcryptjs.hashSync(req.body.password,10);
    }else{
      hashPassword = userToUpdate.password;
    }
    Users.update({
      name: req.body.name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hashPassword,
      birth_date: req.body.birth_date,
      user_img: image,
            
    },{
      where:{email:req.session.userLogged}
    })
    .then(() => res.redirect("/"))
  },
  'logout': (req, res) => {
    res.clearCookie('userEmail')
    req.session.destroy();
    return res.redirect('/')
  },
  //  'processRegister':(req, res) =>{
  //   const resultValidation = validationResult(req);
  //   console.log(resultValidation);
  //   if(resultValidation.errors.length>0){
  //     return res.render("register",{
  //       errors: resultValidation.mapped(),
  //       oldData: req.body     
  //     });
  //   }
  //   return res.send('Ok, las validaciones se pasaron y no tienes errores');
  // }

}

module.exports = dbUsersController;