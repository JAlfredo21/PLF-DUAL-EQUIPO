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

 Date: 26/05/2025 21:43:23
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
  `rol` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of usuario
-- ----------------------------
INSERT INTO `usuario` VALUES (5, 'Angel', 'miguelvera3094@gmail.com', '$2y$10$OLxe3VFUBr5upBdyczVdoO3g.kBrHk1EkQwNPK6v8i3xRMUd4c5Vi', NULL, NULL, '2025-04-13 17:07:44', 'admin');
INSERT INTO `usuario` VALUES (6, 'Norberto', 'angel@gmail.com', '$2y$10$2aNb0bB5fT9z6N9oN1ZBJeJ56i2460CiQtEtw2rKr5BalMJzq.1RO', NULL, NULL, '2025-04-13 17:09:36', 'user');
INSERT INTO `usuario` VALUES (7, 'Pedro', 'miguel@gmail.com', '$2y$10$Fpn1r7LG3Y8NYrlu30sG1eNuEZCFM7b7.B9v0E06pbObP3c/qcnxW', NULL, NULL, '2025-04-13 17:17:28', 'user');
INSERT INTO `usuario` VALUES (8, 'Roberto', 'miguel@gmail.com', '$2y$10$fFvQNVHsEHjtoAjR0ozzrutQV8qitLUzZDG3pTQmPhMYzlo3bjni2', NULL, NULL, '2025-04-13 17:18:15', 'user');
INSERT INTO `usuario` VALUES (9, 'Carlos', 'miguel@gmail.com', '$2y$10$S7e2w2H.a6zm1hwgXTGkWOqF9p6bPsLGLxqn3pKotYpH5p0muZeOa', NULL, NULL, '2025-04-13 17:21:04', 'user');
INSERT INTO `usuario` VALUES (10, 'Rodrigo', 'rodrigo@gmail.com', '$2y$10$uViCkEs.BUVP8r7m4ogaKurjIjzxMNuw3HFT24tRGA3vlc5UdzcvC', NULL, NULL, '2025-04-13 17:24:39', 'user');
INSERT INTO `usuario` VALUES (11, 'luisa', 'luisa@gmail.com', '$2y$10$IscQUgL0jby1R/Qc1uzAsuWOWjRyVDuviB3goKsqgTl5uEfHhlWaC', NULL, NULL, '2025-05-25 10:40:51', 'user');
INSERT INTO `usuario` VALUES (12, 'luis', 'luis@gmail.com', '$2y$10$JD0gQgSlZF0Oxg2zOnBnWe4oOdaRvo8ir85C3cPnRsQCTjknH/h.G', NULL, NULL, '2025-05-25 11:26:27', 'user');

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
) ENGINE = InnoDB AUTO_INCREMENT = 160 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_es_0900_ai_ci ROW_FORMAT = Dynamic;

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
INSERT INTO `venta` VALUES (25, '2025-04-26 15:50:59', 1, 5);
INSERT INTO `venta` VALUES (26, '2025-04-27 13:50:55', 1, 6);
INSERT INTO `venta` VALUES (27, '2025-04-28 14:50:55', 1, 7);
INSERT INTO `venta` VALUES (28, '2025-04-29 20:50:55', 1, 9);
INSERT INTO `venta` VALUES (29, '2025-04-30 15:10:55', 1, 10);
INSERT INTO `venta` VALUES (30, '2025-05-01 10:30:55', 1, 12);
INSERT INTO `venta` VALUES (31, '2025-05-02 11:30:55', 2, 6);
INSERT INTO `venta` VALUES (32, '2025-05-03 19:20:55', 2, 9);
INSERT INTO `venta` VALUES (33, '2025-05-04 20:30:15', 3, 9);
INSERT INTO `venta` VALUES (34, '2025-05-05 09:29:25', 3, 12);
INSERT INTO `venta` VALUES (35, '2025-05-06 17:32:32', 3, 10);
INSERT INTO `venta` VALUES (36, '2025-05-07 18:20:14', 3, 11);
INSERT INTO `venta` VALUES (37, '2025-05-08 19:20:55', 3, 7);
INSERT INTO `venta` VALUES (38, '2025-05-09 12:28:20', 3, 5);
INSERT INTO `venta` VALUES (39, '2025-05-10 19:20:55', 3, 8);
INSERT INTO `venta` VALUES (40, '2025-05-11 14:48:18', 3, 10);
INSERT INTO `venta` VALUES (41, '2025-05-12 19:20:55', 4, 7);
INSERT INTO `venta` VALUES (42, '2025-05-13 12:12:12', 4, 9);
INSERT INTO `venta` VALUES (43, '2025-05-14 19:20:55', 4, 11);
INSERT INTO `venta` VALUES (44, '2025-05-15 20:45:48', 5, 10);
INSERT INTO `venta` VALUES (45, '2025-05-16 00:00:00', 5, 6);
INSERT INTO `venta` VALUES (46, '2025-05-17 00:00:00', 5, 10);
INSERT INTO `venta` VALUES (47, '2025-05-18 00:00:00', 5, 9);
INSERT INTO `venta` VALUES (48, '2025-05-19 00:00:00', 6, 6);
INSERT INTO `venta` VALUES (49, '2025-05-20 00:00:00', 6, 9);
INSERT INTO `venta` VALUES (50, '2025-05-21 00:00:00', 6, 8);
INSERT INTO `venta` VALUES (51, '2025-05-22 00:00:00', 6, 9);
INSERT INTO `venta` VALUES (52, '2025-05-23 00:00:00', 6, 5);
INSERT INTO `venta` VALUES (53, '2025-05-24 00:00:00', 6, 10);
INSERT INTO `venta` VALUES (54, '2025-05-25 00:00:00', 7, 6);
INSERT INTO `venta` VALUES (55, '2025-05-26 00:00:00', 7, 9);
INSERT INTO `venta` VALUES (56, '2025-05-27 00:00:00', 7, 10);
INSERT INTO `venta` VALUES (57, '2025-05-28 00:00:00', 8, 5);
INSERT INTO `venta` VALUES (58, '2025-05-29 00:00:00', 8, 9);
INSERT INTO `venta` VALUES (59, '2025-05-30 00:00:00', 8, 7);
INSERT INTO `venta` VALUES (60, '2025-05-31 00:00:00', 8, 12);
INSERT INTO `venta` VALUES (61, '2025-06-01 00:00:00', 8, 11);
INSERT INTO `venta` VALUES (62, '2025-06-02 00:00:00', 9, 5);
INSERT INTO `venta` VALUES (63, '2025-06-03 00:00:00', 9, 6);
INSERT INTO `venta` VALUES (64, '2025-06-04 00:00:00', 9, 7);
INSERT INTO `venta` VALUES (65, '2025-06-05 00:00:00', 9, 8);
INSERT INTO `venta` VALUES (66, '2025-06-06 00:00:00', 9, 9);
INSERT INTO `venta` VALUES (67, '2025-06-07 00:00:00', 9, 10);
INSERT INTO `venta` VALUES (68, '2025-06-08 00:00:00', 9, 11);
INSERT INTO `venta` VALUES (69, '2025-06-09 00:00:00', 9, 12);
INSERT INTO `venta` VALUES (70, '2025-04-26 00:00:00', 1, 5);
INSERT INTO `venta` VALUES (71, '2025-04-27 00:00:00', 1, 6);
INSERT INTO `venta` VALUES (72, '2025-04-28 00:00:00', 1, 7);
INSERT INTO `venta` VALUES (73, '2025-04-29 00:00:00', 1, 9);
INSERT INTO `venta` VALUES (74, '2025-04-30 00:00:00', 1, 10);
INSERT INTO `venta` VALUES (75, '2025-05-01 00:00:00', 1, 12);
INSERT INTO `venta` VALUES (76, '2025-05-02 00:00:00', 2, 6);
INSERT INTO `venta` VALUES (77, '2025-05-03 00:00:00', 2, 9);
INSERT INTO `venta` VALUES (78, '2025-05-04 00:00:00', 3, 9);
INSERT INTO `venta` VALUES (79, '2025-05-05 00:00:00', 3, 12);
INSERT INTO `venta` VALUES (80, '2025-05-06 00:00:00', 3, 10);
INSERT INTO `venta` VALUES (81, '2025-05-07 00:00:00', 3, 11);
INSERT INTO `venta` VALUES (82, '2025-05-08 00:00:00', 3, 7);
INSERT INTO `venta` VALUES (83, '2025-05-09 00:00:00', 3, 5);
INSERT INTO `venta` VALUES (84, '2025-05-10 00:00:00', 3, 8);
INSERT INTO `venta` VALUES (85, '2025-05-11 00:00:00', 3, 10);
INSERT INTO `venta` VALUES (86, '2025-05-12 00:00:00', 4, 7);
INSERT INTO `venta` VALUES (87, '2025-05-13 00:00:00', 4, 9);
INSERT INTO `venta` VALUES (88, '2025-05-14 00:00:00', 4, 11);
INSERT INTO `venta` VALUES (89, '2025-05-15 00:00:00', 5, 10);
INSERT INTO `venta` VALUES (90, '2025-05-16 00:00:00', 5, 6);
INSERT INTO `venta` VALUES (91, '2025-05-17 00:00:00', 5, 10);
INSERT INTO `venta` VALUES (92, '2025-05-18 00:00:00', 5, 9);
INSERT INTO `venta` VALUES (93, '2025-05-19 00:00:00', 6, 6);
INSERT INTO `venta` VALUES (94, '2025-05-20 00:00:00', 6, 9);
INSERT INTO `venta` VALUES (95, '2025-05-21 00:00:00', 6, 8);
INSERT INTO `venta` VALUES (96, '2025-05-22 00:00:00', 6, 9);
INSERT INTO `venta` VALUES (97, '2025-05-23 00:00:00', 6, 5);
INSERT INTO `venta` VALUES (98, '2025-05-24 00:00:00', 6, 10);
INSERT INTO `venta` VALUES (99, '2025-05-25 00:00:00', 7, 6);
INSERT INTO `venta` VALUES (100, '2025-05-26 00:00:00', 7, 9);
INSERT INTO `venta` VALUES (101, '2025-05-27 00:00:00', 7, 10);
INSERT INTO `venta` VALUES (102, '2025-05-28 00:00:00', 8, 5);
INSERT INTO `venta` VALUES (103, '2025-05-29 00:00:00', 8, 9);
INSERT INTO `venta` VALUES (104, '2025-05-30 00:00:00', 8, 7);
INSERT INTO `venta` VALUES (105, '2025-05-31 00:00:00', 8, 12);
INSERT INTO `venta` VALUES (106, '2025-06-01 00:00:00', 8, 11);
INSERT INTO `venta` VALUES (107, '2025-06-02 00:00:00', 9, 5);
INSERT INTO `venta` VALUES (108, '2025-06-03 00:00:00', 9, 6);
INSERT INTO `venta` VALUES (109, '2025-06-04 00:00:00', 9, 7);
INSERT INTO `venta` VALUES (110, '2025-06-05 00:00:00', 9, 8);
INSERT INTO `venta` VALUES (111, '2025-06-06 00:00:00', 9, 9);
INSERT INTO `venta` VALUES (112, '2025-06-07 00:00:00', 9, 10);
INSERT INTO `venta` VALUES (113, '2025-06-08 00:00:00', 9, 11);
INSERT INTO `venta` VALUES (114, '2025-06-09 00:00:00', 9, 12);
INSERT INTO `venta` VALUES (115, '2025-04-26 00:00:00', 1, 5);
INSERT INTO `venta` VALUES (116, '2025-04-27 00:00:00', 1, 6);
INSERT INTO `venta` VALUES (117, '2025-04-28 00:00:00', 1, 7);
INSERT INTO `venta` VALUES (118, '2025-04-29 00:00:00', 1, 9);
INSERT INTO `venta` VALUES (119, '2025-04-30 00:00:00', 1, 10);
INSERT INTO `venta` VALUES (120, '2025-05-01 00:00:00', 1, 12);
INSERT INTO `venta` VALUES (121, '2025-05-02 00:00:00', 2, 6);
INSERT INTO `venta` VALUES (122, '2025-05-03 00:00:00', 2, 9);
INSERT INTO `venta` VALUES (123, '2025-05-04 00:00:00', 3, 9);
INSERT INTO `venta` VALUES (124, '2025-05-05 00:00:00', 3, 12);
INSERT INTO `venta` VALUES (125, '2025-05-06 00:00:00', 3, 10);
INSERT INTO `venta` VALUES (126, '2025-05-07 00:00:00', 3, 11);
INSERT INTO `venta` VALUES (127, '2025-05-08 00:00:00', 3, 7);
INSERT INTO `venta` VALUES (128, '2025-05-09 00:00:00', 3, 5);
INSERT INTO `venta` VALUES (129, '2025-05-10 00:00:00', 3, 8);
INSERT INTO `venta` VALUES (130, '2025-05-11 00:00:00', 3, 10);
INSERT INTO `venta` VALUES (131, '2025-05-12 00:00:00', 4, 7);
INSERT INTO `venta` VALUES (132, '2025-05-13 00:00:00', 4, 9);
INSERT INTO `venta` VALUES (133, '2025-05-14 00:00:00', 4, 11);
INSERT INTO `venta` VALUES (134, '2025-05-15 00:00:00', 5, 10);
INSERT INTO `venta` VALUES (135, '2025-05-16 00:00:00', 5, 6);
INSERT INTO `venta` VALUES (136, '2025-05-17 00:00:00', 5, 10);
INSERT INTO `venta` VALUES (137, '2025-05-18 00:00:00', 5, 9);
INSERT INTO `venta` VALUES (138, '2025-05-19 00:00:00', 6, 6);
INSERT INTO `venta` VALUES (139, '2025-05-20 00:00:00', 6, 9);
INSERT INTO `venta` VALUES (140, '2025-05-21 00:00:00', 6, 8);
INSERT INTO `venta` VALUES (141, '2025-05-22 00:00:00', 6, 9);
INSERT INTO `venta` VALUES (142, '2025-05-23 00:00:00', 6, 5);
INSERT INTO `venta` VALUES (143, '2025-05-24 00:00:00', 6, 10);
INSERT INTO `venta` VALUES (144, '2025-05-25 00:00:00', 7, 6);
INSERT INTO `venta` VALUES (145, '2025-05-26 00:00:00', 7, 9);
INSERT INTO `venta` VALUES (146, '2025-05-27 00:00:00', 7, 10);
INSERT INTO `venta` VALUES (147, '2025-05-28 00:00:00', 8, 5);
INSERT INTO `venta` VALUES (148, '2025-05-29 00:00:00', 8, 9);
INSERT INTO `venta` VALUES (149, '2025-05-30 00:00:00', 8, 7);
INSERT INTO `venta` VALUES (150, '2025-05-31 00:00:00', 8, 12);
INSERT INTO `venta` VALUES (151, '2025-06-01 00:00:00', 8, 11);
INSERT INTO `venta` VALUES (152, '2025-06-02 00:00:00', 9, 5);
INSERT INTO `venta` VALUES (153, '2025-06-03 00:00:00', 9, 6);
INSERT INTO `venta` VALUES (154, '2025-06-04 00:00:00', 9, 7);
INSERT INTO `venta` VALUES (155, '2025-06-05 00:00:00', 9, 8);
INSERT INTO `venta` VALUES (156, '2025-06-06 00:00:00', 9, 9);
INSERT INTO `venta` VALUES (157, '2025-06-07 00:00:00', 9, 10);
INSERT INTO `venta` VALUES (158, '2025-06-08 00:00:00', 9, 11);
INSERT INTO `venta` VALUES (159, '2025-06-09 00:00:00', 9, 12);

SET FOREIGN_KEY_CHECKS = 1;
