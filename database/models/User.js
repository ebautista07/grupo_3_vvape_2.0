module.exports = (sequelize, dataTypes) => {
    let alias = 'User'; // esto debería estar en singular
    let cols = {
        //  id: { //`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
        //     type: dataTypes.INTEGER.UNSIGNED,
        //     primaryKey: true,
        //     allowNull: false,
        //     autoIncrement: true
            
        // },
        
        name: { //`name` VARCHAR(100) NOT NULL,
            type: dataTypes.STRING(100),
            allowNull: false
        },
        last_name: { //``last_name` VARCHAR(100) NOT NULL,
            type: dataTypes.STRING(100),
            allowNull: false
        },
        email: { //`email` VARCHAR(100) NOT NULL,
            type: dataTypes.STRING(100),
            allowNull: false
        },
        password: { //`password` VARCHAR(45) NOT NULL,
            type: dataTypes.STRING(45),
            allowNull: true
        },
        birth_date: { //`birth_date` DATE NOT NULL,
            type: dataTypes.DATE,
            allowNull: false
        }, 
        user_img:   { //`user_img` VARCHAR(100) NULL,
        type: dataTypes.STRING(45),
        allowNull: true,
                
        }
    };
    let config = {
        timestamps: false,
        // createdAt: 'created_at',
        // updatedAt: 'updated_at',
        // deletedAt: false
    }
    const User = sequelize.define(alias,cols,config);

    

    return User
};

// CREATE TABLE IF NOT EXISTS `vappe`.`users` (
    
        
//     PRIMARY KEY (`id`))
//   ENGINE = InnoDB;
  
//   CREATE UNIQUE INDEX `id_UNIQUE` ON `vappe`.`users` (`id`);
  
//   CREATE UNIQUE INDEX `email_UNIQUE` ON `vappe`.`users` (`email`);