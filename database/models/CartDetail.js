module.exports = (sequelize, dataTypes) => {
    let alias = 'CartDetail'; // esto debería estar en singular
    let cols = {
         id: { //`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
            
        },
        
        product_quantity: { //`product_quantity` INT NOT NULL,
            type: dataTypes.INTEGER,
            allowNull: false
        },
        product_id: { //`product_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            // autoIncrement: true
        }
    };
    let config = {
        timestamps: false,
        // createdAt: 'created_at',
        // updatedAt: 'updated_at',
        // deletedAt: false
    }
    const CartDetail = sequelize.define(alias,cols,config);

    CartDetail.associate = function (models) {
        CartDetail.belongsTo(models.Product, {
            as: "product",
            foreignKey: "product_id",
        })

       
    }

    return CartDetail
};

// CREATE TABLE IF NOT EXISTS `vappe`.`cart_detail` (
   
//     PRIMARY KEY (`id`),
//     CONSTRAINT `cart_detail_products_id`
//       FOREIGN KEY (`product_id`)
//       REFERENCES `vappe`.`products` (`id`)
//       ON DELETE CASCADE
//       ON UPDATE CASCADE)
//   ENGINE = InnoDB;
  
//   CREATE UNIQUE INDEX `id_UNIQUE` ON `vappe`.`cart_detail` (`id`);
  
//   CREATE UNIQUE INDEX `product_id_UNIQUE` ON `vappe`.`cart_detail` (`product_id`);