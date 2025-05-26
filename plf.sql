/*
 Navicat Premium Dump SQL

 Source Server         : Mysql
 Source Server Type    : MySQL
 Source Server Version : 80404 (8.4.4)
 Source Host           : localhost:3306
 Source Schema         : plf

 Target Server Type    : MySQL
 Target Server Version : 80404 (8.4.4)
 File Encoding         : 65001

 Date: 25/05/2025 18:48:33
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for producto
-- ----------------------------
DROP TABLE IF EXISTS `producto`;
CREATE TABLE `producto`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_es_0900_ai_ci NOT NULL,
  `precio` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_es_0900_ai_ci NOT NULL,
  `cantidad` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_es_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of producto
-- ----------------------------
INSERT INTO `producto` VALUES (1, 'Fanta', '17', 5);
INSERT INTO `producto` VALUES (2, 'Takis', '19', 12);
INSERT INTO `producto` VALUES (3, 'Power', '20', 5);
INSERT INTO `producto` VALUES (4, 'Cocos', '20', 10);
INSERT INTO `producto` VALUES (5, 'Maria', '20', 8);
INSERT INTO `producto` VALUES (6, 'Coca', '22', 9);
INSERT INTO `producto` VALUES (7, 'Pepsi', '21', 6);
INSERT INTO `producto` VALUES (8, 'Pera', '13', 2);
INSERT INTO `producto` VALUES (9, 'Agua', '10', 16);

-- ----------------------------
-- Table structure for usuario
-- ----------------------------
DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `correo` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `contrasenia` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `token` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NULL,
  `token_expiracion` datetime NULL DEFAULT NULL,
  `registro` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of usuario
-- ----------------------------
INSERT INTO `usuario` VALUES (5, 'Angel', 'angel@gmail.com', '$2y$10$/IFeiCZ5FN8JRtatajp5T.mqxdSt7LqHEdxReYALLFeT0qkM7NSum', NULL, NULL, '2025-04-13 17:07:44');
INSERT INTO `usuario` VALUES (6, 'Norberto', 'angel@gmail.com', '$2y$10$2aNb0bB5fT9z6N9oN1ZBJeJ56i2460CiQtEtw2rKr5BalMJzq.1RO', NULL, NULL, '2025-04-13 17:09:36');
INSERT INTO `usuario` VALUES (7, 'Pedro', 'miguel@gmail.com', '$2y$10$Fpn1r7LG3Y8NYrlu30sG1eNuEZCFM7b7.B9v0E06pbObP3c/qcnxW', NULL, NULL, '2025-04-13 17:17:28');
INSERT INTO `usuario` VALUES (8, 'Roberto', 'miguel@gmail.com', '$2y$10$fFvQNVHsEHjtoAjR0ozzrutQV8qitLUzZDG3pTQmPhMYzlo3bjni2', NULL, NULL, '2025-04-13 17:18:15');
INSERT INTO `usuario` VALUES (9, 'Carlos', 'miguel@gmail.com', '$2y$10$S7e2w2H.a6zm1hwgXTGkWOqF9p6bPsLGLxqn3pKotYpH5p0muZeOa', NULL, NULL, '2025-04-13 17:21:04');
INSERT INTO `usuario` VALUES (10, 'Rodrigo', 'rodrigo@gmail.com', '$2y$10$uViCkEs.BUVP8r7m4ogaKurjIjzxMNuw3HFT24tRGA3vlc5UdzcvC', NULL, NULL, '2025-04-13 17:24:39');
INSERT INTO `usuario` VALUES (11, 'luisa', 'luisa@gmail.com', '$2y$10$IscQUgL0jby1R/Qc1uzAsuWOWjRyVDuviB3goKsqgTl5uEfHhlWaC', NULL, NULL, '2025-05-25 10:40:51');
INSERT INTO `usuario` VALUES (12, 'luis', 'luis@gmail.com', '$2y$10$JD0gQgSlZF0Oxg2zOnBnWe4oOdaRvo8ir85C3cPnRsQCTjknH/h.G', NULL, NULL, '2025-05-25 11:26:27');

-- ----------------------------
-- Table structure for venta
-- ----------------------------
DROP TABLE IF EXISTS `venta`;
CREATE TABLE `venta`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha` datetime NOT NULL,
  `producto_id` int NOT NULL,
  `usuario_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_producto`(`producto_id` ASC) USING BTREE,
  INDEX `fk_usuario`(`usuario_id` ASC) USING BTREE,
  CONSTRAINT `fk_producto` FOREIGN KEY (`producto_id`) REFERENCES `producto` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_es_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of venta
-- ----------------------------
INSERT INTO `venta` VALUES (17, '2025-04-30 15:50:07', 7, 10);
INSERT INTO `venta` VALUES (18, '2025-04-30 15:50:55', 1, 12);
INSERT INTO `venta` VALUES (19, '2025-04-30 15:55:48', 2, 11);
INSERT INTO `venta` VALUES (20, '2025-04-30 16:03:28', 4, 7);
INSERT INTO `venta` VALUES (21, '2025-04-30 16:03:28', 6, 6);
INSERT INTO `venta` VALUES (22, '2025-04-30 16:08:43', 5, 8);
INSERT INTO `venta` VALUES (23, '2025-05-01 08:52:59', 9, 9);
INSERT INTO `venta` VALUES (24, '2025-05-01 09:22:13', 3, 10);

SET FOREIGN_KEY_CHECKS = 1;
