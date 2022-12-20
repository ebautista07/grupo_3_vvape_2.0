module.exports = (sequelize, dataTypes) => {
    let alias = 'Product'; // esto debería estar en singular
    let cols = {
         id: { //INT UNSIGNED NOT NULL AUTO_INCREMENT
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
            
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        name: { //`name` VARCHAR(45) NOT NULL,
            type: dataTypes.STRING(45),
            allowNull: false
        },
        description: { //`description` VARCHAR(4000) NOT NULL,
            type: dataTypes.STRING(4000),
            allowNull: false
        },
        price: { //`price` DECIMAL(30,5) UNSIGNED NOT NULL,
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        img: { //`img` VARCHAR(100) NULL,
            type: dataTypes.STRING(100),
            allowNull: true
        },
        warning: { //`warning` VARCHAR(4000) NOT NULL,
            type: dataTypes.STRING(4000),
            allowNull: false
        }, 
        category_id:   { //INT UNSIGNED NOT NULL
        type: dataTypes.INTEGER.UNSIGNED,
        allowNull: false,
                
        },
        stock:   { //INT UNSIGNED NOT NULL
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        
        }
    };
    let config = {
        timestamps: false,
        // createdAt: 'created_at',
        // updatedAt: 'updated_at',
        // deletedAt: false
    }
    const Product = sequelize.define(alias,cols,config);

    Product.associate = function (models) {
        Product.belongsTo(models.Category, {
            as: "category",
            foreignKey: "category_id"
        })

        // Product.belongsToMany(models.Actor, { // models.Actor -> Actors es el valor de alias en actor.js
        //     as: "actors",
        //     through: 'actor_movie',
        //     foreignKey: 'movie_id',
        //     otherKey: 'actor_id',
        //     timestamps: false
        // })
    }

    return Product
};


//     PRIMARY KEY (`id`),
//     CONSTRAINT `products_categories_id`
//       FOREIGN KEY (`category_id`)
//       REFERENCES `vappe`.`categories` (`id`)
//       ON DELETE CASCADE
//       ON UPDATE CASCADE)
//   ENGINE = InnoDB;

  
//   CREATE UNIQUE INDEX `id_UNIQUE` ON `vappe`.`products` (`id`);
  
//   CREATE UNIQUE INDEX `name_UNIQUE` ON `vappe`.`products` (`name`);
  
//   CREATE INDEX `products_categories_id_idx` ON `vappe`.`products` (`category_id`);