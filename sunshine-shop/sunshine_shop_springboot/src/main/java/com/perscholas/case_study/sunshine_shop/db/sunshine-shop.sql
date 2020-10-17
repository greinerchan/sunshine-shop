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
    `product_create_date` datetime(6)    DEFAULT NULL,
    `product_last_updated` datetime(6)   DEFAULT NULL,
    `sub_category_id`         BIGINT(10)     NOT NULL,
    `product_image_url`   varchar(255)   DEFAULT NULL,
    `product_active`      bit(1)         DEFAULT 1,
    `product_recommend`      bit(1)         DEFAULT 0,
    `product_best_sell`      bit(1)         DEFAULT 0,
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

INSERT INTO PRODUCT (product_name, product_title, product_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell)
VALUES ('Vegetables1', 'JavaScript - The Fun Parts', 3324,
NOW(),1,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,1,1);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell)
VALUES ('Vegetables2', 'JavaScript - The Fun Parts', 34,
NOW(),1,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,1,0);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell)
VALUES ('Fruits1', 'JavaScript - The Fun Parts', 3324,
NOW(),2,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,0,1);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell)
VALUES ('Fruits2', 'JavaScript - The Fun Parts', 34,
NOW(),2,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,0,0);


INSERT INTO PRODUCT (product_name, product_title, product_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell)
VALUES ('Meats1', 'JavaScript - The Fun Parts', 3324,
NOW(),3,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,1,0);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell)
VALUES ('Meats2', 'JavaScript - The Fun Parts', 34,
NOW(),3,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,1,1);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell)
VALUES ('Cheese1', 'JavaScript - The Fun Parts', 3324,
NOW(),4,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,0,1);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell)
VALUES ('Cheese2', 'JavaScript - The Fun Parts', 34,
NOW(),4,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,0,0);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell)
VALUES ('Yogurt1', 'JavaScript - The Fun Parts', 34,
NOW(),5,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,1,1);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell)
VALUES ('Yogurt2', 'JavaScript - The Fun Parts', 34,
NOW(),5,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,1,0);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell)
VALUES ('Milk', 'JavaScript - The Fun Parts', 34,
NOW(),6,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,0,0);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell)
VALUES ('Other', 'JavaScript - The Fun Parts', 34,
NOW(),7,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,0,0);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell)
VALUES ('Bread', 'JavaScript - The Fun Parts', 34,
NOW(),8,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,0,0);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell)
VALUES ('Cake', 'JavaScript - The Fun Parts', 34,
NOW(),9,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,0,0);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell)
VALUES ('Convenience Food', 'JavaScript - The Fun Parts', 34,
NOW(),10,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,0,0);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell)
VALUES ('Seafood', 'JavaScript - The Fun Parts', 34,
NOW(),11,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,0,0);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell)
VALUES ('Vegetarian', 'JavaScript - The Fun Parts', 34,
NOW(),12,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,1,1);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell)
VALUES ('Ice-Cream', 'JavaScript - The Fun Parts', 34,
NOW(),13,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,0,0);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell)
VALUES ('Meat', 'JavaScript - The Fun Parts', 34,
NOW(),14,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,0,0);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell)
VALUES ('Tea', 'JavaScript - The Fun Parts', 34,
NOW(),15,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,0,0);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell)
VALUES ('Coffee', 'JavaScript - The Fun Parts', 34,
NOW(),16,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,0,1);

INSERT INTO PRODUCT (product_name, product_title, product_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell)
VALUES ('Juice', 'JavaScript - The Fun Parts', 34,
NOW(),17,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,0,0);


INSERT INTO PRODUCT (product_name, product_title, product_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell)
VALUES ('Soy Milk', 'JavaScript - The Fun Parts', 34,
NOW(),18,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,0,0);


INSERT INTO PRODUCT (product_name, product_title, product_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell)
VALUES ('Mineral', 'JavaScript - The Fun Parts', 34,
NOW(),19,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,0,0);


INSERT INTO PRODUCT (product_name, product_title, product_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell)
VALUES ('Soft Drink', 'JavaScript - The Fun Parts', 34,
NOW(),20,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,0,0);


INSERT INTO PRODUCT (product_name, product_title, product_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell)
VALUES ('Oat & Cereal', 'JavaScript - The Fun Parts', 34,
NOW(),21,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,1,0);



INSERT INTO PRODUCT (product_name, product_title, product_price, product_create_date,
sub_category_id, product_image_url,product_active, product_recommend, product_best_sell)
VALUES ('Chocolate Drink', 'JavaScript - The Fun Parts', 34,
NOW(),22,'../../../../assets/product-images/beverage/juice/vegetable-juices-1725835_640.jpg',1,0,0);

