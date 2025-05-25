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

 Date: 25/05/2025 12:34:38
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
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_es_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of producto
-- ----------------------------

-- ----------------------------
-- Table structure for usuario
-- ----------------------------
DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `correo` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `matricula` int NOT NULL,
  `contrasenia` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `token` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NULL,
  `token_expiracion` datetime NULL DEFAULT NULL,
  `registro` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of usuario
-- ----------------------------
INSERT INTO `usuario` VALUES (5, 'Angel', 'angel@gmail.com', 21301055, '$2y$10$/IFeiCZ5FN8JRtatajp5T.mqxdSt7LqHEdxReYALLFeT0qkM7NSum', NULL, NULL, '2025-04-13 17:07:44');
INSERT INTO `usuario` VALUES (6, 'Vera', 'angel@gmail.com', 21301054, '$2y$10$2aNb0bB5fT9z6N9oN1ZBJeJ56i2460CiQtEtw2rKr5BalMJzq.1RO', NULL, NULL, '2025-04-13 17:09:36');
INSERT INTO `usuario` VALUES (7, 'Veras', 'miguel@gmail.com', 21301053, '$2y$10$Fpn1r7LG3Y8NYrlu30sG1eNuEZCFM7b7.B9v0E06pbObP3c/qcnxW', NULL, NULL, '2025-04-13 17:17:28');
INSERT INTO `usuario` VALUES (8, 'KUI', 'miguel@gmail.com', 21301044, '$2y$10$fFvQNVHsEHjtoAjR0ozzrutQV8qitLUzZDG3pTQmPhMYzlo3bjni2', NULL, NULL, '2025-04-13 17:18:15');
INSERT INTO `usuario` VALUES (9, 'UIU', 'miguel@gmail.com', 21301050, '$2y$10$S7e2w2H.a6zm1hwgXTGkWOqF9p6bPsLGLxqn3pKotYpH5p0muZeOa', NULL, NULL, '2025-04-13 17:21:04');
INSERT INTO `usuario` VALUES (10, 'Rodrigo', 'rodrigo@gmail.com', 21301043, '$2y$10$uViCkEs.BUVP8r7m4ogaKurjIjzxMNuw3HFT24tRGA3vlc5UdzcvC', NULL, NULL, '2025-04-13 17:24:39');
INSERT INTO `usuario` VALUES (11, 'luisa', 'luisa@gmail.com', 213010552, '$2y$10$IscQUgL0jby1R/Qc1uzAsuWOWjRyVDuviB3goKsqgTl5uEfHhlWaC', NULL, NULL, '2025-05-25 10:40:51');
INSERT INTO `usuario` VALUES (12, 'luis', 'luis@gmail.com', 21212121, '$2y$10$JD0gQgSlZF0Oxg2zOnBnWe4oOdaRvo8ir85C3cPnRsQCTjknH/h.G', NULL, NULL, '2025-05-25 11:26:27');

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
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_es_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of venta
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
