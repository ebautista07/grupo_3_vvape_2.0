const db = require('../../database/models')
const path = require('path');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');
// modelos

const Users = db.User;

const dbUsersControllerAPI = {
  
  'listUsers':(req,res)=>{
    
      let listAllUsers =  Users.findAll()
      .then(users => {
        return res.status(200).json(
          {
            status: 200,
            total: users.length,
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
      data: user
      }
      res.json(response)
    })
    .catch(e =>{
      return res.status(404).json({
          message:"user not found"
      })

  })
  }
}
module.exports = dbUsersControllerAPI;