-- MySQL Script generated by MySQL Workbench
-- Thu Dec  8 18:30:18 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema vappe
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `vappe` ;

-- -----------------------------------------------------
-- Schema vappe
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `vappe` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ;
USE `vappe` ;

-- -----------------------------------------------------
-- Table `vappe`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vappe`.`users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `birth_date` DATE NOT NULL,
  `user_img` VARCHAR(100) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `id_UNIQUE` ON `vappe`.`users` (`id` ASC);

CREATE UNIQUE INDEX `email_UNIQUE` ON `vappe`.`users` (`email` ASC);


-- -----------------------------------------------------
-- Table `vappe`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vappe`.`categories` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `id_UNIQUE` ON `vappe`.`categories` (`id` ASC);


-- -----------------------------------------------------
-- Table `vappe`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vappe`.`products` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(4000) NOT NULL,
  `price` INT UNSIGNED NOT NULL,
  `img` VARCHAR(100) NULL,
  `warning` VARCHAR(4000) NOT NULL,
  `category_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `products_categories_id`
    FOREIGN KEY (`category_id`)
    REFERENCES `vappe`.`categories` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE UNIQUE INDEX `id_UNIQUE` ON `vappe`.`products` (`id` ASC);

CREATE UNIQUE INDEX `name_UNIQUE` ON `vappe`.`products` (`name` ASC);

CREATE INDEX `products_categories_id_idx` ON `vappe`.`products` (`category_id` ASC);


-- -----------------------------------------------------
-- Table `vappe`.`cart_details`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vappe`.`cart_details` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_quantity` INT NOT NULL,
  `total_price` DECIMAL(30,5) NOT NULL,
  `product_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `cart_details_products_id`
    FOREIGN KEY (`product_id`)
    REFERENCES `vappe`.`products` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE UNIQUE INDEX `id_UNIQUE` ON `vappe`.`cart_details` (`id` ASC);

CREATE UNIQUE INDEX `product_id_UNIQUE` ON `vappe`.`cart_details` (`product_id` ASC);


-- -----------------------------------------------------
-- Table `vappe`.`shopping_cart`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vappe`.`shopping_cart` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL,
  `cart_detail_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `shopping_cart_users_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `vappe`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `shopping_cart_cart_details_id`
    FOREIGN KEY (`cart_detail_id`)
    REFERENCES `vappe`.`cart_details` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE UNIQUE INDEX `id_UNIQUE` ON `vappe`.`shopping_cart` (`id` ASC);

CREATE UNIQUE INDEX `user_id_UNIQUE` ON `vappe`.`shopping_cart` (`user_id` ASC);

CREATE UNIQUE INDEX `product_id_UNIQUE` ON `vappe`.`shopping_cart` (`cart_detail_id` ASC);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;