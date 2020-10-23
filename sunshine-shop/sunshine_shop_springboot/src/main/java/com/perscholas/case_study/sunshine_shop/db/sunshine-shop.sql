SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;




-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `admin_id` int(10) NOT NULL AUTO_INCREMENT,
  `admin_name` varchar(25) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `admin_nickname` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `admin_password` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `admin_profile_picture_src` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`admin_id`) USING BTREE,
  UNIQUE INDEX `un_admin_name`(`admin_name`) USING BTREE,
  INDEX `un_admin_nickname`(`admin_nickname`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for category
-- ----------------------------

DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
    `id` BIGINT(10) NOT NULL AUTO_INCREMENT,
    `category_name` VARCHAR(255) NULL DEFAULT NULL,
    PRIMARY KEY (`id`))
    ENGINE = InnoDB
    AUTO_INCREMENT=1;

-- ----------------------------
-- Table structure for sub category
-- ----------------------------
DROP TABLE IF EXISTS `sub_category`;
CREATE TABLE `sub_category` (
    `id` BIGINT(10) NOT NULL AUTO_INCREMENT,
    `sub_category_name` VARCHAR(255) NULL DEFAULT NULL,
    `category_id`   BIGINT(10)     NOT NULL,
    PRIMARY KEY (`id`),
    KEY `fk_category` (`category_id`),
    CONSTRAINT `fk_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
)
ENGINE = InnoDB
AUTO_INCREMENT=1;

-- ----------------------------
-- Table structure for product
-- ----------------------------

DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
    `id`                  BIGINT(10)     NOT NULL AUTO_INCREMENT,
    `product_name`        varchar(100)   DEFAULT NULL,
    `product_title`       varchar(100)   DEFAULT NULL,
    `product_price`       decimal(13, 2) NULL DEFAULT NULL,
    `product_discount_price` decimal(13, 2)  NULL DEFAULT NULL,
    `product_create_date` datetime(6)    DEFAULT NULL,
    `product_last_updated` datetime(6)   DEFAULT NULL,
    `sub_category_id`      BIGINT(10)     NOT NULL,
    `product_image_url`   varchar(255)   DEFAULT NULL,
    `product_active`      bit(1)         DEFAULT 1,
    `product_recommend`   bit(1)         DEFAULT 0,
    `product_best_sell`   bit(1)         DEFAULT 0,
    `product_discount`    bit(1)         DEFAULT 0,

    PRIMARY KEY (`id`),
    KEY `fk_sub_category` (`sub_category_id`),
    CONSTRAINT `fk_sub_category` FOREIGN KEY (`sub_category_id`) REFERENCES `sub_category` (`id`)
)
ENGINE=InnoDB
AUTO_INCREMENT = 1;

-- ----------------------------
-- Table structure for orderitem
-- ----------------------------
DROP TABLE IF EXISTS `ordereditem`;
CREATE TABLE `ordereditem`  (
  `id` BIGINT(10) NOT NULL AUTO_INCREMENT,
  `ordereditem_code` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ordereditem_address` char(6) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ordereditem_detail_address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ordereditem_post` char(6) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `ordereditem_receiver` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ordereditem_mobile` char(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ordereditem_pay_date` datetime(0) NOT NULL,
  `ordereditem_delivery_date` datetime(0) NULL DEFAULT NULL,
  `ordereditem_confirm_date` datetime(0) NULL DEFAULT NULL,
  `ordereditem_status` tinyint(1) NOT NULL,
  `ordereditem_userid` BIGINT(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_ordereditem_userid`(`ordereditem_userid`) USING BTREE,
  CONSTRAINT `fk_ordereditem_userid` FOREIGN KEY (`ordereditem_userid`) REFERENCES `user` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 1;

-- ----------------------------
-- Table structure for productorderitem
-- ----------------------------
DROP TABLE IF EXISTS `orderitem`;
CREATE TABLE `orderitem`  (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `orderitem_number` smallint(5) UNSIGNED NOT NULL,
  `orderitem_price` decimal(10, 2) NOT NULL,
  `orderitem_productid` BIGINT(10) NOT NULL,
  `orderitem_order_id` BIGINT(10) NULL DEFAULT NULL,
  `orderitem_user_id` BIGINT(10) NOT NULL,
  `orderitem_user_message` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_orderitem_productid`(`orderitem_productid`),
  KEY `fk_orderitem_orderid`(`orderitem_order_id`) USING BTREE,
  KEY `fk_orderitem_userid`(`orderitem_order_id`) USING BTREE,
  CONSTRAINT `fk_orderitem_productid` FOREIGN KEY (`orderitem_productid`) REFERENCES `product` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_orderitem_orderid` FOREIGN KEY (`orderitem_order_id`) REFERENCES `ordereditem` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_orderitem_userid` FOREIGN KEY (`orderitem_order_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` BIGINT(10) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(25) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `user_nickname` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_password` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `user_realname` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `user_gender` tinyint(1) NOT NULL,
  `user_birthday` date NOT NULL,
  `user_address` char(6) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_homeplace` char(6) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_profile_picture_src` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 113 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;


# Add country code
#
DROP TABLE IF EXISTS `country`;

CREATE TABLE `country`(
    `id` smallint unsigned PRIMARY KEY NOT NULL,
    `code` varchar(2) DEFAULT NULL,
    `name` varchar(255) DEFAULT NULL
) ENGINE = InnoDB;

# Add state code

DROP TABLE IF EXISTS `state`;

CREATE TABLE `state`(
    `id` smallint unsigned primary key not null auto_increment,
    `name` varchar(255) DEFAULT NULL,
    `country_id` smallint unsigned not null,
    CONSTRAINT `fk_country` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT=1;

# add city code
DROP TABLE IF EXISTS `city`;

CREATE TABLE `city`(
    `id` smallint unsigned primary key not null auto_increment,
    `name` varchar(255) DEFAULT NULL,
    `state_id` smallint unsigned not null,
    CONSTRAINT `fk_state` FOREIGN KEY (`state_id`) REFERENCES `state` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT=1;

SET FOREIGN_KEY_CHECKS = 1;


-- -----------------------------------------------------
-- Add sample data
-- -----------------------------------------------------

INSERT INTO category(category_name) VALUES ('Fresh Produce');
INSERT INTO category(category_name) VALUES ('Dairy & Chilled');
INSERT INTO category(category_name) VALUES ('Barkery');
INSERT INTO category(category_name) VALUES ('Frozen');
INSERT INTO category(category_name) VALUES ('Beverage');

INSERT INTO sub_category(sub_category_name,category_id) VALUES ('Vegetables',1);
INSERT INTO sub_category(sub_category_name,category_id) VALUES ('Fruits',1);
INSERT INTO sub_category(sub_category_name,category_id) VALUES ('Meats',1);

INSERT INTO sub_category(sub_category_name,category_id) VALUES ('Cheese',2);
INSERT INTO sub_category(sub_category_name,category_id) VALUES ('Yogurt',2);
INSERT INTO sub_category(sub_category_name,category_id) VALUES ('Milk , Butter &amp; Egg',2);
INSERT INTO sub_category(sub_category_name,category_id) VALUES ('Other',2);

INSERT INTO sub_category(sub_category_name,category_id) VALUES ('Bread',3);
INSERT INTO sub_category(sub_category_name,category_id) VALUES ('Cake',3);

INSERT INTO sub_category(sub_category_name,category_id) VALUES ('Convenience Food',4);
INSERT INTO sub_category(sub_category_name,category_id) VALUES ('Seafood',4);
INSERT INTO sub_category(sub_category_name,category_id) VALUES ('Vegetarian',4);
INSERT INTO sub_category(sub_category_name,category_id) VALUES ('Ice-Cream',4);
INSERT INTO sub_category(sub_category_name,category_id) VALUES ('Meat',4);

INSERT INTO sub_category(sub_category_name,category_id) VALUES ('Tea',5);
INSERT INTO sub_category(sub_category_name,category_id) VALUES ('Coffee',5);
INSERT INTO sub_category(sub_category_name,category_id) VALUES ('Juice',5);
INSERT INTO sub_category(sub_category_name,category_id) VALUES ('Soy Milk',5);
INSERT INTO sub_category(sub_category_name,category_id) VALUES ('Mineral / Drinking water',5);
INSERT INTO sub_category(sub_category_name,category_id) VALUES ('Soft Drink',5);
INSERT INTO sub_category(sub_category_name,category_id) VALUES ('Oat & Cereal',5);
INSERT INTO sub_category(sub_category_name,category_id) VALUES ('Chocolate Drink',5);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_discount_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell, product_discount)
VALUES ('Vegetables1', 'JavaScript - The Fun Parts', 3324, 3000,
NOW(),1,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,1,1,1);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_discount_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell, product_discount)
VALUES ('Vegetables2', 'JavaScript - The Fun Parts', 22, 30,
NOW(),1,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,1,0,1);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_discount_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell, product_discount)
VALUES ('Fruits1', 'JavaScript - The Fun Parts', 3324,3324,
NOW(),2,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,0,1,0);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_discount_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell, product_discount)
VALUES ('Fruits2', 'JavaScript - The Fun Parts', 32, 34,
NOW(),2,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,0,0,1);


INSERT INTO PRODUCT (product_name, product_title, product_price, product_discount_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell, product_discount)
VALUES ('Meats1', 'JavaScript - The Fun Parts', 3324, 3310,
NOW(),3,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,1,0,1);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_discount_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell, product_discount)
VALUES ('Meats2', 'JavaScript - The Fun Parts', 34, 34,
NOW(),3,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,1,1,0);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_discount_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell, product_discount)
VALUES ('Cheese1', 'JavaScript - The Fun Parts', 3324, 3324,
NOW(),4,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,0,1,0);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_discount_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell, product_discount)
VALUES ('Cheese2', 'JavaScript - The Fun Parts', 34, 34,
NOW(),4,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,0,0,0);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_discount_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell, product_discount)
VALUES ('Yogurt1', 'JavaScript - The Fun Parts', 23, 34,
NOW(),5,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,1,1,1);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_discount_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell, product_discount)
VALUES ('Yogurt2', 'JavaScript - The Fun Parts', 34, 34,
NOW(),5,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,1,0,0);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_discount_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell, product_discount)
VALUES ('Milk', 'JavaScript - The Fun Parts', 34, 34,
NOW(),6,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,0,0,0);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_discount_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell, product_discount)
VALUES ('Other', 'JavaScript - The Fun Parts', 3, 19,
NOW(),7,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,0,0,1);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_discount_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell, product_discount)
VALUES ('Bread', 'JavaScript - The Fun Parts', 34, 34,
NOW(),8,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,0,0,0);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_discount_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell, product_discount)
VALUES ('Cake', 'JavaScript - The Fun Parts', 34, 22,
NOW(),9,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,0,0,1);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_discount_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell, product_discount)
VALUES ('Convenience Food', 'JavaScript - The Fun Parts', 34, 34,
NOW(),10,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,0,0,0);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_discount_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell, product_discount)
VALUES ('Seafood', 'JavaScript - The Fun Parts', 34, 34,
NOW(),11,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,0,0,0);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_discount_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell, product_discount)
VALUES ('Vegetarian', 'JavaScript - The Fun Parts', 34, 34,
NOW(),12,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,1,1,0);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_discount_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell, product_discount)
VALUES ('Ice-Cream', 'JavaScript - The Fun Parts', 34, 34,
NOW(),13,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,0,0,0);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_discount_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell, product_discount)
VALUES ('Meat', 'JavaScript - The Fun Parts', 34, 34,
NOW(),14,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,0,0,0);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_discount_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell, product_discount)
VALUES ('Tea', 'JavaScript - The Fun Parts', 34, 22,
NOW(),15,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,0,0,1);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_discount_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell, product_discount)
VALUES ('Coffee', 'JavaScript - The Fun Parts', 34, 34,
NOW(),16,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,0,1,0);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_discount_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell, product_discount)
VALUES ('Juice', 'JavaScript - The Fun Parts', 34, 34,
NOW(),17,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,0,0,0);


INSERT INTO PRODUCT (product_name, product_title, product_price, product_discount_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell, product_discount)
VALUES ('Soy Milk', 'JavaScript - The Fun Parts', 34, 34,
NOW(),18,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,0,0,0);


INSERT INTO PRODUCT (product_name, product_title, product_price, product_discount_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell, product_discount)
VALUES ('Mineral', 'JavaScript - The Fun Parts', 34, 12,
NOW(),19,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,0,0,1);


INSERT INTO PRODUCT (product_name, product_title, product_price, product_discount_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell, product_discount)
VALUES ('Soft Drink', 'JavaScript - The Fun Parts', 34, 11,
NOW(),20,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,0,0,1);


INSERT INTO PRODUCT (product_name, product_title, product_price, product_discount_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell, product_discount)
VALUES ('Oat & Cereal', 'JavaScript - The Fun Parts', 34, 34,
NOW(),21,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,1,0,0);



INSERT INTO PRODUCT (product_name, product_title, product_price, product_discount_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell, product_discount)
VALUES ('Chocolate Drink', 'JavaScript - The Fun Parts', 34, 34,
NOW(),22,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,0,0,0);


-- test pagination


INSERT INTO PRODUCT (product_name, product_title, product_price, product_discount_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell, product_discount)
VALUES ('Vegetables1', 'JavaScript - The Fun Parts', 3324, 3000,
NOW(),1,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,1,1,1);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_discount_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell, product_discount)
VALUES ('Vegetables1', 'JavaScript - The Fun Parts', 3324, 3000,
NOW(),1,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,1,1,1);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_discount_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell, product_discount)
VALUES ('Vegetables1', 'JavaScript - The Fun Parts', 3324, 3000,
NOW(),1,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,1,1,1);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_discount_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell, product_discount)
VALUES ('Vegetables1', 'JavaScript - The Fun Parts', 3324, 3000,
NOW(),1,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,1,1,1);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_discount_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell, product_discount)
VALUES ('Vegetables1', 'JavaScript - The Fun Parts', 3324, 3000,
NOW(),1,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,1,1,1);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_discount_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell, product_discount)
VALUES ('Vegetables1', 'JavaScript - The Fun Parts', 3324, 3000,
NOW(),1,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,1,1,1);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_discount_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell, product_discount)
VALUES ('Vegetables1', 'JavaScript - The Fun Parts', 3324, 3000,
NOW(),1,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,1,1,1);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_discount_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell, product_discount)
VALUES ('Vegetables1', 'JavaScript - The Fun Parts', 3324, 3000,
NOW(),1,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,1,1,1);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_discount_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell, product_discount)
VALUES ('Vegetables1', 'JavaScript - The Fun Parts', 3324, 3000,
NOW(),1,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,1,1,1);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_discount_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell, product_discount)
VALUES ('Vegetables1', 'JavaScript - The Fun Parts', 3324, 3000,
NOW(),1,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,1,1,1);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_discount_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell, product_discount)
VALUES ('Vegetables1', 'JavaScript - The Fun Parts', 3324, 3000,
NOW(),1,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,1,1,1);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_discount_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell, product_discount)
VALUES ('Vegetables1', 'JavaScript - The Fun Parts', 3324, 3000,
NOW(),1,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,1,1,1);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_discount_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell, product_discount)
VALUES ('Vegetables1', 'JavaScript - The Fun Parts', 3324, 3000,
NOW(),1,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,1,1,1);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_discount_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell, product_discount)
VALUES ('Vegetables1', 'JavaScript - The Fun Parts', 3324, 3000,
NOW(),1,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,1,1,1);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_discount_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell, product_discount)
VALUES ('Vegetables1', 'JavaScript - The Fun Parts', 3324, 3000,
NOW(),1,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,1,1,1);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_discount_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell, product_discount)
VALUES ('Vegetables1', 'JavaScript - The Fun Parts', 3324, 3000,
NOW(),1,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,1,1,1);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_discount_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell, product_discount)
VALUES ('Vegetables1', 'JavaScript - The Fun Parts', 3324, 3000,
NOW(),1,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,1,1,1);

--
-- Data for table `country`
--

INSERT INTO `country` VALUES
(1,'US','United States'),
(2,'CN','China'),
(3,'CA','Canada');



INSERT INTO `state` VALUES
(1,'Alabama',1),
(2,'Alaska',1),
(3,'Arizona',1),
(4,'Arkansas',1),
(5,'California',1),
(6,'Colorado',1),
(7,'Connecticut',1),
(8,'Delaware',1),
(9,'District Of Columbia',1),
(10,'Florida',1),

(11,'Anhui',2),
(12,'Beijing',2),
(13,'Chongqing',2),
(14,'Fujian',2),
(15,'Guangdong',2),
(16,'Gansu',2),
(17,'Guangxi',2),
(18,'Guizhou',2),
(19,'Henan',2),
(20,'Hubei',2),

(21,'Alberta',3),
(22,'British',3),
(23,'Columbia',3),
(24,'Manitoba',3),
(25,'New Brunswick',3),
(26,'Newfoundland',3),
(27,'Nova Scotia',3),
(28,'Ontario',3),
(29,'Quebec',3),
(30,'Saskatchewan',3);

INSERT INTO `city` VALUES

(1,'sdfdsfsd',1),
(2,'sdfd',1),
(3,'sdfsd',2),
(4,'sdfsd',2),
(5,'sdfsdf',3),
(6,'sdfsd',3),
(7,'sdf',4),
(8,'sdf',4),
(9,'Ddsfef',5),
(10,'sdfsd',5),
(11,'sdfdsfsd',6),
(12,'sdfd',6),
(13,'sdfsd',7),
(14,'sdfsd',7),
(15,'sdfsdf',8),
(16,'sdfsd',8),
(17,'sdf',9),
(18,'sdf',9),
(19,'Ddsfef',10),
(20,'sdfsd',10),
(21,'sdfdsfsd',11),
(22,'sdfd',11),
(23,'sdfsd',12),
(24,'sdfsd',12),
(25,'sdfsdf',13),
(26,'sdfsd',13),
(27,'sdf',14),
(28,'sdf',14),
(29,'Ddsfef',15),
(30,'sdfsd',15),
(31,'sdfdsfsd',16),
(32,'sdfd',16),
(33,'sdfsd',17),
(34,'sdfsd',17),
(35,'sdfsdf',18),
(36,'sdfsd',18),
(37,'sdf',19),
(38,'sdf',19),
(39,'Ddsfef',20),
(40,'sdf',20),
(41,'sdfdsfsd',21),
(42,'sdfd',21),
(43,'sdfsd',22),
(44,'sdfsd',22),
(45,'sdfsdf',23),
(46,'sdfsd',23),
(47,'sdf',24),
(48,'sdf',24),
(49,'Ddsfef',25),
(50,'sdf',25),
(51,'sdfdsfsd',26),
(52,'sdfd',26),
(53,'sdfsd',27),
(54,'sdfsd',27),
(55,'sdfsdf',28),
(56,'sdfsd',28),
(57,'sdf',29),
(58,'sdf',29),
(59,'Ddsfef',30),
(60,'Florida',30);