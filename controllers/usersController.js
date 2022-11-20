const fs = require("fs");
const path = require("path");
const bcryptjs = require("bcryptjs");
const session = require("express-session");
const {validationResult} = require('express-validator');

const usersFilePath = path.join(__dirname, "../data/users.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

const usersController = {
  register: (req, res) => {
    res.render("register");
  },
  // processRegister:(req, res) =>{
  //   // const resultValidation = validationResult(req);
  //   console.log(resultValidation);
  //   if(resultValidation.errors.length>0){
  //     return res.render("register",{
  //       errors: resultValidation.mapped(),
  //       oldData: req.body     
  //     });
  //   }
  //   return res.send('Ok, las validaciones se pasaron y no tienes errores');
  // }
  store: (req, res, next) => {
    let errors = validationResult(req)
      let image;
      if (req.files[0] != undefined) {
        image = req.files[0].filename;
      } else {
        image = "uDefault-image.jpeg";
      }
    let hashPassword = bcryptjs.hashSync(req.body.password,10);
    let newUser = {
      id: users[users.length - 1].id + 1,
      date: req.body.date,
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      password: hashPassword,
      user_type: req.body.user_type,
      img: image
    };
    // console.log(errors.errors);
    if(!errors.isEmpty()){
      return res.render('register', {errors:errors.errors})
  } else{
    users.push(newUser);
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null));
    res.redirect("/products")};
  }, //PENDIENTE CAMBIAR REDIRECT!!!!!!!!!!!!
  login: (req, res) => {
    
    res.render("login");
  },
  loginProcess:(req,res)=>{
    let userToLogin=users.find((user)=>user.email==req.body.email);
    
    if(userToLogin){ 
      if(req.body.remindUser){
        res.cookie('userEmail',req.body.email,{
          maxAge: ((60*1000)*60)
        }) 
      } console.log(res.cookie)
      let passwordOk = bcryptjs.compareSync(req.body.password,userToLogin.password);
      if(passwordOk){
        delete userToLogin.password;
        req.session.userLogged=userToLogin;
        
        res.redirect('/users/profile')
      }
      return res.render("login", {
        errors:{
          password:{
            msg:'Las credenciales son incorrectas'
          }
        }
      }) 
      }
      
    return res.render("login", {
    errors:{
      email:{
        msg:'Por favor ingresa un email válido'
      }
    }
  })
  
  },
  shoppingcart: (req, res) => {
    res.render("shoppingcart");
  },
  profile: (req, res) => {
    console.log(req.session);
    res.render('profile',{
      user: req.session.userLogged
    })
  },
  logout: (req, res) => {
    res.clearCookie('userEmail')
    req.session.destroy();
    return res.redirect('/')
  }
}

module.exports = usersController;
