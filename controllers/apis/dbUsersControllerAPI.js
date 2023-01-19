const db = require('../../database/models')
const path = require('path');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');
// const fetch = require('node-fetch');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

// modelos

const Users = db.User;

const dbUsersControllerAPI = {
  
  'listUsers':(req,res)=>{
    
      let listAllUsers =  Users.findAll()
      .then(users => {
        return res.status(200).json(
          {
            status: 200,
            count: users.length,
            data: users,
            url: `api/listUsers`
          }
        )
      } )

},
  'show':(req,res)=>{
    let listUser =  Users.findByPk(req.params.id)
    .then(user => {
      let response = {
        meta:{
          status:200,
          total: user.length,
          url: `api/listUsers/show/${req.params.id}`
      },
      data: {
        id:user.id,
        name: user.name,
        last_name: user.last_name,
        email:user.email,
        birth_date: user.birth_date
      }
      }
      res.json(response)
    })
    .catch(e =>{
      return res.status(404).json({
          message:"user not found"
      })

  })
  },
  'users':(req,res)=>{
    fetch('http://localhost:3001/users/api/users')
    .then(data => data.json())
    .then(users =>{
      res.render('profileApi',{users})
    })
  }
}
module.exports = dbUsersControllerAPI;