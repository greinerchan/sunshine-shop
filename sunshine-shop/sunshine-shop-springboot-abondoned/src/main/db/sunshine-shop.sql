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
-- Table structure for product
-- ----------------------------

DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
    `id`                  BIGINT(10)     NOT NULL AUTO_INCREMENT,
    `product_name`        varchar(100)   DEFAULT NULL,
    `product_title`       varchar(100)   DEFAULT NULL,
    `product_price`       decimal(13, 2) NULL DEFAULT NULL,
    `product_create_date` datetime(6)    NOT NULL,
    `product_last_updated` datetime(6)   NOT NULL,
    `category_id`         BIGINT(10)     NOT NULL,
    `product_image_url`   varchar(255)   DEFAULT NULL,
    `product_active`      bit(1)         DEFAULT 1,
    PRIMARY KEY (`id`),
    KEY `fk_category` (`category_id`),
    CONSTRAINT `fk_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
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

INSERT INTO PRODUCT_CATEGORY(CATEGORY_NAME) VALUES ('BOOKS');

INSERT INTO PRODUCT (SKU, NAME, DESCRIPTION, IMAGE_URL, ACTIVE, UNITS_IN_STOCK,
UNIT_PRICE, CATEGORY_ID,DATE_CREATED)
VALUES ('BOOK-TECH-1000', 'JavaScript - The Fun Parts', 'Learn JavaScript',
'assets/images/products/placeholder.png'
,1,100,19.99,1, NOW());

INSERT INTO PRODUCT (SKU, NAME, DESCRIPTION, IMAGE_URL, ACTIVE, UNITS_IN_STOCK,
UNIT_PRICE, CATEGORY_ID, DATE_CREATED)
VALUES ('BOOK-TECH-1001', 'Spring Framework Tutorial', 'Learn Spring',
'assets/images/products/placeholder.png'
,1,100,29.99,1, NOW());

INSERT INTO PRODUCT (SKU, NAME, DESCRIPTION, IMAGE_URL, ACTIVE, UNITS_IN_STOCK,
UNIT_PRICE, CATEGORY_ID, DATE_CREATED)
VALUES ('BOOK-TECH-1002', 'Kubernetes - Deploying Containers', 'Learn Kubernetes',
'assets/images/products/placeholder.png'
,1,100,24.99,1, NOW());

INSERT INTO PRODUCT (SKU, NAME, DESCRIPTION, IMAGE_URL, ACTIVE, UNITS_IN_STOCK,
UNIT_PRICE, CATEGORY_ID, DATE_CREATED)
VALUES ('BOOK-TECH-1003', 'Internet of Things (IoT) - Getting Started', 'Learn IoT',
'assets/images/products/placeholder.png'
,1,100,29.99,1, NOW());

INSERT INTO PRODUCT (SKU, NAME, DESCRIPTION, IMAGE_URL, ACTIVE, UNITS_IN_STOCK,
UNIT_PRICE, CATEGORY_ID, DATE_CREATED)
VALUES ('BOOK-TECH-1004', 'The Go Programming Language: A to Z', 'Learn Go',
'assets/images/products/placeholder.png'
,1,100,24.99,1, NOW());







