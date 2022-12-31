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
    res.send(errors);
    // console.log(validationResult)
    // console.log(errors)


      let image;
      if (req.files[0] != undefined) {
        image = req.files[0].filename;
      } else {
        image = "uDefault-image.png";
      }
    let hashPassword = bcryptjs.hashSync(req.body.password,10);

    console.log(req.body.name)

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
    
    let userToFind=Users.findOne({
        where: {
            email: req.body.email
           },
           raw: true
    }).then(user=>{
        // console.log(user.email)
        let userToLogin=user.email;
        let userPassword=user.password
    // console.log(userToLogin);
    // console.log(userPassword);
    // res.redirect("/users/login")
    console.log(req.body.remindUser)
    if(userToLogin){ 
      if(req.body.remindUser){
        res.cookie('userEmail',req.body.email,{
          maxAge: ((60*1000)*60)
        }) 
      } 
      // console.log(res.cookie)
      // console.log(userToLogin);
      // console.log(userPassword);
      let passwordOk = bcryptjs.compareSync(req.body.password,userPassword);
      // let passwordOk = userPassword;
      // console.log(passwordOk);
      if(passwordOk){
        delete userPassword;
        req.session.userLogged = userToLogin;
        
        res.redirect('/users/profile')
      }
      return res.render("login", {
        errors:{
          password:{
            msg:'Las credenciales son incorrectas'
          }}
      }) 
      }
      
    return res.render("login", {
    errors:{
      email:{
        msg:'Por favor ingresa un email válido'
      }
    }
  })     
       })
       .catch(error => res.send(error));
    
  
  },
  'shoppingcart': (req, res) => {
    res.render("shoppingcart");
  },
  'profile': (req, res) => {
    console.log(req.session);
    let userProfile = Users.findOne({
      where: {
          email: req.session.userLogged
         },
         raw: true
    }).then(user=>{
      console.log(user);
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
    let hashPassword = bcryptjs.hashSync(req.body.password,10);
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