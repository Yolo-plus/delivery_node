/*
Navicat MySQL Data Transfer

Source Server         : yolo
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : delivery

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2022-03-25 08:41:44
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for adminlist
-- ----------------------------
DROP TABLE IF EXISTS `adminlist`;
CREATE TABLE `adminlist` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `password` varchar(255) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of adminlist
-- ----------------------------
INSERT INTO `adminlist` VALUES ('1', '吴翠居', 'cj123456');

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `pic` varchar(255) COLLATE utf8_bin NOT NULL,
  `content` varchar(255) COLLATE utf8_bin NOT NULL,
  `content_time` datetime(6) NOT NULL,
  `shoplist_id` int(10) NOT NULL,
  `o_orderme` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of comments
-- ----------------------------
INSERT INTO `comments` VALUES ('7', '小张', 'af4f9655116127feef8bc0b01.webp', '量很足趴', '2022-02-24 13:11:15.000000', '16', '64696361');
INSERT INTO `comments` VALUES ('8', '小张', 'af4f9655116127feef8bc0b01.webp', '价格很实在呢', '2022-02-24 13:53:41.000000', '12', '24265045');
INSERT INTO `comments` VALUES ('9', '小张', 'af4f9655116127feef8bc0b01.webp', '书亦烧仙草量着实大，赞赞赞', '2022-02-24 14:16:14.000000', '17', '97889677');
INSERT INTO `comments` VALUES ('10', '老五', 'af4f9655116127feef8bc0b00.webp', '肯德基确实贵噢', '2022-02-24 14:37:49.000000', '10', '62478252');
INSERT INTO `comments` VALUES ('12', '小李', '36875d195904d72c95c0a6700.webp', '真棒', '2022-02-25 10:21:24.000000', '14', '60037575');
INSERT INTO `comments` VALUES ('13', '小李', '36875d195904d72c95c0a6700.webp', '很不错嘛', '2022-02-25 10:40:03.000000', '14', '15880209');
INSERT INTO `comments` VALUES ('14', '小李', '36875d195904d72c95c0a6700.webp', '很好吃哦', '2022-02-25 10:49:02.000000', '12', '62947672');

-- ----------------------------
-- Table structure for foodlist
-- ----------------------------
DROP TABLE IF EXISTS `foodlist`;
CREATE TABLE `foodlist` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `pic` varchar(255) COLLATE utf8_bin NOT NULL,
  `descs` varchar(255) COLLATE utf8_bin NOT NULL,
  `price` varchar(255) COLLATE utf8_bin NOT NULL,
  `shoplist_name` varchar(255) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of foodlist
-- ----------------------------
INSERT INTO `foodlist` VALUES ('1', '汉堡包', '71f691bebaea1a5cfdbc8e700.webp', '肉块大肉质嫩', '20', '汉堡王');
INSERT INTO `foodlist` VALUES ('2', '烧仙草', 'dd7ddb4cadb8e4a926711a100.jpg', '价格很诱惑', '7', '蜜雪冰城');
INSERT INTO `foodlist` VALUES ('3', '大金桶', 'a08ff5d492dd20062803b6400.webp', '虎年大金桶', '38', '肯德基');
INSERT INTO `foodlist` VALUES ('4', '至尊面条', 'a08ff5d492dd20062803b6401.webp', '量多实惠，流连忘返！', '20', '香港表哥茶餐厅');
INSERT INTO `foodlist` VALUES ('5', '超满足奶昔', 'a08ff5d492dd20062803b6402.jpg', '饱饱的哦~', '12', '茶颜悦色');
INSERT INTO `foodlist` VALUES ('6', '甜筒', 'a08ff5d492dd20062803b6403.webp', '即享受又不耽误减肥呢', '7', '蜜雪冰城');
INSERT INTO `foodlist` VALUES ('7', '马卡龙', '1faa1928198d67e2efde39400.webp', '味道香香的', '15', '茶颜悦色');
INSERT INTO `foodlist` VALUES ('8', '幽兰拿铁', '1faa1928198d67e2efde39401.webp', '不一样的拿铁', '18', '茶颜悦色');
INSERT INTO `foodlist` VALUES ('9', '蔓越阑珊', '1faa1928198d67e2efde39402.webp', '黯然回首，那人却在灯火阑珊处...', '18', '茶颜悦色');
INSERT INTO `foodlist` VALUES ('10', '凤楼稣桂', '1faa1928198d67e2efde39403.webp', '此时此刻，你值得拥有。', '16', '茶颜悦色');
INSERT INTO `foodlist` VALUES ('11', '鸡腿沙面', 'af4f9655116127feef8bc0b04.webp', '饱嗝~', '12', '沙县小吃');
INSERT INTO `foodlist` VALUES ('12', '烧仙草巨无霸', 'af4f9655116127feef8bc0b05.jpg', '量多，满足哦', '8', '书亦烧仙草');

-- ----------------------------
-- Table structure for orderinfo
-- ----------------------------
DROP TABLE IF EXISTS `orderinfo`;
CREATE TABLE `orderinfo` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `food` varchar(255) COLLATE utf8_bin NOT NULL,
  `pic` varchar(255) COLLATE utf8_bin NOT NULL,
  `count` int(10) NOT NULL,
  `order_id` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=34 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of orderinfo
-- ----------------------------
INSERT INTO `orderinfo` VALUES ('29', '鸡腿沙面', 'af4f9655116127feef8bc0b04.webp', '3', '24');
INSERT INTO `orderinfo` VALUES ('2', '烧仙草', 'dd7ddb4cadb8e4a926711a100.jpg', '1', '1');
INSERT INTO `orderinfo` VALUES ('4', '大金桶', 'a08ff5d492dd20062803b6400.webp', '2', '10');
INSERT INTO `orderinfo` VALUES ('5', '汉堡包', '71f691bebaea1a5cfdbc8e700.webp', '3', '11');
INSERT INTO `orderinfo` VALUES ('10', '超满足奶昔', 'a08ff5d492dd20062803b6402.jpg', '2', '14');
INSERT INTO `orderinfo` VALUES ('11', '马卡龙', '1faa1928198d67e2efde39400.webp', '1', '14');
INSERT INTO `orderinfo` VALUES ('9', '大金桶', 'a08ff5d492dd20062803b6400.webp', '2', '13');
INSERT INTO `orderinfo` VALUES ('12', '幽兰拿铁', '1faa1928198d67e2efde39401.webp', '1', '14');
INSERT INTO `orderinfo` VALUES ('13', '至尊面条', 'a08ff5d492dd20062803b6401.webp', '6', '15');
INSERT INTO `orderinfo` VALUES ('14', '甜筒', 'a08ff5d492dd20062803b6403.webp', '3', '16');
INSERT INTO `orderinfo` VALUES ('15', '烧仙草', 'dd7ddb4cadb8e4a926711a100.jpg', '2', '16');
INSERT INTO `orderinfo` VALUES ('16', '幽兰拿铁', '1faa1928198d67e2efde39401.webp', '2', '17');
INSERT INTO `orderinfo` VALUES ('17', '蔓越阑珊', '1faa1928198d67e2efde39402.webp', '1', '17');
INSERT INTO `orderinfo` VALUES ('18', '大金桶', 'a08ff5d492dd20062803b6400.webp', '2', '18');
INSERT INTO `orderinfo` VALUES ('19', '超满足奶昔', 'a08ff5d492dd20062803b6402.jpg', '1', '19');
INSERT INTO `orderinfo` VALUES ('20', '马卡龙', '1faa1928198d67e2efde39400.webp', '1', '19');
INSERT INTO `orderinfo` VALUES ('21', '蔓越阑珊', '1faa1928198d67e2efde39402.webp', '1', '19');
INSERT INTO `orderinfo` VALUES ('22', '凤楼稣桂', '1faa1928198d67e2efde39403.webp', '1', '19');
INSERT INTO `orderinfo` VALUES ('23', '至尊面条', 'a08ff5d492dd20062803b6401.webp', '10', '20');
INSERT INTO `orderinfo` VALUES ('24', '大金桶', 'a08ff5d492dd20062803b6400.webp', '2', '21');
INSERT INTO `orderinfo` VALUES ('25', '大金桶', 'a08ff5d492dd20062803b6400.webp', '2', '22');
INSERT INTO `orderinfo` VALUES ('26', '马卡龙', '1faa1928198d67e2efde39400.webp', '2', '23');
INSERT INTO `orderinfo` VALUES ('27', '幽兰拿铁', '1faa1928198d67e2efde39401.webp', '1', '23');
INSERT INTO `orderinfo` VALUES ('28', '超满足奶昔', 'a08ff5d492dd20062803b6402.jpg', '1', '23');
INSERT INTO `orderinfo` VALUES ('30', '烧仙草巨无霸', 'af4f9655116127feef8bc0b05.jpg', '4', '26');
INSERT INTO `orderinfo` VALUES ('31', '烧仙草巨无霸', 'af4f9655116127feef8bc0b05.jpg', '4', '27');
INSERT INTO `orderinfo` VALUES ('32', '大金桶', 'a08ff5d492dd20062803b6400.webp', '2', '28');
INSERT INTO `orderinfo` VALUES ('33', '汉堡包', '71f691bebaea1a5cfdbc8e700.webp', '3', '29');

-- ----------------------------
-- Table structure for orderlist
-- ----------------------------
DROP TABLE IF EXISTS `orderlist`;
CREATE TABLE `orderlist` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `orderme` int(10) NOT NULL,
  `total` int(10) NOT NULL,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `address_id` int(10) NOT NULL,
  `shop_id` int(10) NOT NULL,
  `didcomment` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=30 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of orderlist
-- ----------------------------
INSERT INTO `orderlist` VALUES ('1', '24265045', '7', '小张', '2', '12', '1');
INSERT INTO `orderlist` VALUES ('10', '94145292', '76', '小李', '6', '10', '0');
INSERT INTO `orderlist` VALUES ('11', '92191141', '60', '小李', '5', '11', '0');
INSERT INTO `orderlist` VALUES ('14', '15880209', '57', '小李', '7', '14', '1');
INSERT INTO `orderlist` VALUES ('13', '62478252', '76', '老五', '10', '10', '1');
INSERT INTO `orderlist` VALUES ('15', '99343809', '120', '小李', '8', '15', '0');
INSERT INTO `orderlist` VALUES ('16', '62947672', '35', '小李', '9', '12', '1');
INSERT INTO `orderlist` VALUES ('17', '60037575', '54', '小李', '6', '14', '1');
INSERT INTO `orderlist` VALUES ('28', '17181362', '76', '小李', '8', '10', '0');
INSERT INTO `orderlist` VALUES ('19', '31563200', '61', '小李', '7', '14', '0');
INSERT INTO `orderlist` VALUES ('20', '66607618', '200', '小李', '5', '15', '0');
INSERT INTO `orderlist` VALUES ('21', '16057192', '76', '小李', '9', '10', '0');
INSERT INTO `orderlist` VALUES ('22', '81911853', '76', '小李', '8', '10', '0');
INSERT INTO `orderlist` VALUES ('24', '64696361', '36', '小张', '2', '16', '1');
INSERT INTO `orderlist` VALUES ('26', '97889677', '32', '小张', '1', '17', '1');
INSERT INTO `orderlist` VALUES ('27', '57145717', '32', '老五', '12', '17', '0');
INSERT INTO `orderlist` VALUES ('29', '71827591', '60', '小张', '1', '11', '0');

-- ----------------------------
-- Table structure for shoplist
-- ----------------------------
DROP TABLE IF EXISTS `shoplist`;
CREATE TABLE `shoplist` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `pic` varchar(255) COLLATE utf8_bin NOT NULL,
  `descs` varchar(255) COLLATE utf8_bin NOT NULL,
  `fee` varchar(255) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of shoplist
-- ----------------------------
INSERT INTO `shoplist` VALUES ('10', '肯德基', '623a39fb88421271ec5ef2500.webp', '简称KFC', '5');
INSERT INTO `shoplist` VALUES ('11', '汉堡王', '623a39fb88421271ec5ef2501.webp', '创始于1954年美国迈尔密', '5');
INSERT INTO `shoplist` VALUES ('12', '蜜雪冰城', '2abc387e228fabd466d86d601.jpg', '在郑州成立的冰淇淋与茶饮的品牌', '3');
INSERT INTO `shoplist` VALUES ('14', '茶颜悦色', '623a39fb88421271ec5ef2504.jpg', '是湖南长沙茶悦餐饮管理有限公司旗下品牌', '5');
INSERT INTO `shoplist` VALUES ('16', '沙县小吃', '89dbeda7e077218f318f6d000.webp', '沙县大酒店，你值得拥有~', '3');
INSERT INTO `shoplist` VALUES ('17', '书亦烧仙草', '2d7493b97d51d57cb55693d00.webp', '知名奶茶品牌', '3');

-- ----------------------------
-- Table structure for usersaddress
-- ----------------------------
DROP TABLE IF EXISTS `usersaddress`;
CREATE TABLE `usersaddress` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `phone` varchar(255) COLLATE utf8_bin NOT NULL,
  `address` varchar(255) COLLATE utf8_bin NOT NULL,
  `u_name` varchar(255) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of usersaddress
-- ----------------------------
INSERT INTO `usersaddress` VALUES ('1', '张三', '13827876338', '北京市昌平区素龙街道24号', '小张');
INSERT INTO `usersaddress` VALUES ('2', '张爸', '13826792001', '北京市昌平区素龙街道24号', '小张');
INSERT INTO `usersaddress` VALUES ('5', '李爸', '16267266767', '福建省福田区江南大道1号', '小李');
INSERT INTO `usersaddress` VALUES ('6', '李妈', '16267268938', '福建省福田区江南大道1号', '小李');
INSERT INTO `usersaddress` VALUES ('7', '李叔叔', '17272626762', '福建省福田区商业中心18号', '小李');
INSERT INTO `usersaddress` VALUES ('8', '李姨', '12786726728', '福建省福州市', '小李');
INSERT INTO `usersaddress` VALUES ('9', '老马', '12888828288', '北京市', '小李');
INSERT INTO `usersaddress` VALUES ('10', '五哥', '13211455627', '浙江省', '老五');
INSERT INTO `usersaddress` VALUES ('11', '六十', '13928786356', '湖南省衡阳市', '刘六');
INSERT INTO `usersaddress` VALUES ('12', '五爸爸', '13888886768', '北京市', '老五');

-- ----------------------------
-- Table structure for usersinfo
-- ----------------------------
DROP TABLE IF EXISTS `usersinfo`;
CREATE TABLE `usersinfo` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `pic` varchar(255) COLLATE utf8_bin NOT NULL,
  `phone` varchar(255) COLLATE utf8_bin NOT NULL,
  `email` varchar(255) COLLATE utf8_bin NOT NULL,
  `hobby` varchar(255) COLLATE utf8_bin NOT NULL,
  `u_id` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of usersinfo
-- ----------------------------
INSERT INTO `usersinfo` VALUES ('1', '张三丰', 'af4f9655116127feef8bc0b01.webp', '13424525000', '674383333@163.com', '乒乓球，篮球', '1');
INSERT INTO `usersinfo` VALUES ('2', '李四华', '36875d195904d72c95c0a6700.webp', '18272784988', '78432662@qq.com', '电子竞技，动漫', '2');
INSERT INTO `usersinfo` VALUES ('4', '王五', 'af4f9655116127feef8bc0b00.webp', '12556253471', '78436734@qq.com', '游泳', '3');
INSERT INTO `usersinfo` VALUES ('5', '邓七发', 'southeast.jpg', '13276727889', '67432738@qq.com', '电子竞技', '18');
INSERT INTO `usersinfo` VALUES ('6', '刘陆', 'southeast.jpg', '15622515473', '67438728@qq.com', '羽毛球', '17');

-- ----------------------------
-- Table structure for userslist
-- ----------------------------
DROP TABLE IF EXISTS `userslist`;
CREATE TABLE `userslist` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `password` varchar(255) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=28 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of userslist
-- ----------------------------
INSERT INTO `userslist` VALUES ('1', '小张', 'zs123456');
INSERT INTO `userslist` VALUES ('2', '小李', 'ls123456');
INSERT INTO `userslist` VALUES ('3', '老五', 'ww123456');
INSERT INTO `userslist` VALUES ('17', '刘六', 'll123456');
INSERT INTO `userslist` VALUES ('18', '邓七', 'dq123456');
