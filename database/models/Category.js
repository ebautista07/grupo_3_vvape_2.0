module.exports = (sequelize, dataTypes) => {
    let alias = 'Category'; // esto debería estar en singular
    let cols = {
         id: { //`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
            
        },
        
        name: { //`name` VARCHAR(45) NOT NULL,
            type: dataTypes.STRING(45),
            allowNull: false
        }
    };
    let config = {
        timestamps: false,
        // createdAt: 'created_at',
        // updatedAt: 'updated_at',
        // deletedAt: false
    }
    const Category = sequelize.define(alias,cols,config);
    
    Category.associate = function (models) {
        Category.hasMany(models.Product, {
            as: "Product",
            foreignKey: "category_id"
        })
    }
    return Category
};

// CREATE TABLE IF NOT EXISTS `vappe`.`categories` (
    
    
//     PRIMARY KEY (`id`))
//   ENGINE = InnoDB;
  
//   CREATE UNIQUE INDEX `id_UNIQUE` ON `vappe`.`categories` (`id`);