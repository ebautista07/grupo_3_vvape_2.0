module.exports = (sequelize, dataTypes) => {
    let alias = 'ShoppingCart'; // esto debería estar en singular
    let cols = {
         id: { //`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
            
        },
        user_id: { //`user_id` INT UNSIGNED NOT NULL,
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        cart_detail_id: { //`cart_detail_id` INT UNSIGNED NOT NULL,
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    };
    let config = {
        timestamps: false,
        // createdAt: 'created_at',
        // updatedAt: 'updated_at',
        // deletedAt: false
    }
    const ShoppingCart = sequelize.define(alias,cols,config);

    ShoppingCart.associate = function (models) {
        ShoppingCart.belongsTo(models.User, {
            as: "user",
            foreignKey: "user_id"
        })

        ShoppingCart.hasMany(models.CartDetail, { 
            as: "cart_detail",
            foreignKey: 'cart_detail_id',
            // through: 'actor_movie',
            // otherKey: 'actor_id',
            // timestamps: false
        })
    }

    return ShoppingCart  /////****PONER TABLA EN PLURAL!!!!! */
};

// CREATE TABLE IF NOT EXISTS `vappe`.`shopping_cart` (
    
    
    
    // PRIMARY KEY (`id`),
    // CONSTRAINT `shopping_cart_users_id`
    //   FOREIGN KEY (`user_id`)
    //   REFERENCES `vappe`.`users` (`id`)
    //   ON DELETE CASCADE
    //   ON UPDATE CASCADE,


//     CONSTRAINT `shopping_cart_cart_detail_id`
//       FOREIGN KEY (`cart_detail_id`)
//       REFERENCES `vappe`.`cart_detail` (`id`)
//       ON DELETE CASCADE
//       ON UPDATE CASCADE)
//   ENGINE = InnoDB;
  
//   CREATE UNIQUE INDEX `id_UNIQUE` ON `vappe`.`shopping_cart` (`id`);
  
//   CREATE UNIQUE INDEX `user_id_UNIQUE` ON `vappe`.`shopping_cart` (`user_id`);
  
//   CREATE UNIQUE INDEX `product_id_UNIQUE` ON `vappe`.`shopping_cart` (`cart_detail_id`);