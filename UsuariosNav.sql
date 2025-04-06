/*
Navicat MySQL Data Transfer

Source Server         : Personal
Source Server Version : 110502
Source Host           : localhost:3306
Source Database       : plf

Target Server Type    : MYSQL
Target Server Version : 110502
File Encoding         : 65001

Date: 2025-04-06 09:14:39
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for usuarios
-- ----------------------------
DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `matricula` varchar(8) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `paterno` varchar(20) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `edad` int(3) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `contrasena` varchar(15) NOT NULL,
  `direccion` text NOT NULL,
  `relacion` enum('soltero','casado','divorciado','viudo','separado') NOT NULL,
  `estado` enum('tabasco','campeche','yucatan','chiapas') NOT NULL,
  `nacionalidad` enum('mexicano','colombiano','argentino','paraguayo') NOT NULL,
  `habilidad` varchar(20) NOT NULL,
  `sexo` enum('M','F') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
