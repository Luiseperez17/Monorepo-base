-- --------------------------------------------------------
-- Host:                         localhost
-- Versión del servidor:         10.4.32-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para base
CREATE DATABASE IF NOT EXISTS `base` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;
USE `base`;

-- Volcando estructura para tabla base.app_modulos
DROP TABLE IF EXISTS `app_modulos`;
CREATE TABLE IF NOT EXISTS `app_modulos` (
  `_id` int(20) NOT NULL AUTO_INCREMENT,
  `idPadre` int(20) DEFAULT 0,
  `nombreModulo` varchar(100) DEFAULT NULL,
  `nombreLargoModulo` varchar(100) DEFAULT NULL,
  `urlModulo` varchar(250) DEFAULT NULL,
  `componenteModulo` varchar(100) DEFAULT NULL,
  `iconoModulo` varchar(30) DEFAULT NULL,
  `orden` int(11) DEFAULT 0,
  `estado` int(11) DEFAULT 1,
  `eliminado` int(11) DEFAULT 0,
  `esPadre` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla base.app_modulos: ~8 rows (aproximadamente)
DELETE FROM `app_modulos`;
INSERT INTO `app_modulos` (`_id`, `idPadre`, `nombreModulo`, `nombreLargoModulo`, `urlModulo`, `componenteModulo`, `iconoModulo`, `orden`, `estado`, `eliminado`, `esPadre`, `created_at`, `updated_at`) VALUES
	(7, 0, 'Configuracion', 'Configuracion', '', NULL, NULL, 0, 1, 0, NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(9, 7, 'Usuarios', 'Usuarios', 'usuarios', 'CrearUsuarioComponent', 'ti ti-user', 1, 1, 0, 0, '2024-02-16 19:45:47', '2024-02-16 19:45:47'),
	(10, 7, 'Modulos', 'Modulos', 'modulos', NULL, 'ti ti-list-check', 2, 1, 0, NULL, '2024-02-16 19:46:35', '2024-02-16 19:46:35'),
	(12, 7, 'Parametrizacion', 'Parametrizacion', 'parametrizacion', 'ParametrizacionComponent', 'ti ti-settings', 3, 1, 0, 0, '2024-02-17 16:57:38', '2025-03-25 06:26:42'),
	(13, 7, 'Perfiles', 'Perfiles', 'perfiles', 'PerfilesComponent', 'ti ti-user-plus', 4, 1, 0, 0, '2024-02-17 17:01:05', '2024-02-17 17:01:05'),
	(27, 7, 'Perfil', 'Perfil', 'perfil', 'MiperfilComponent', 'ti ti-user', 9, 1, 0, 0, '2024-02-22 01:50:11', '2024-02-22 01:50:11');

-- Volcando estructura para tabla base.app_perfiles
DROP TABLE IF EXISTS `app_perfiles`;
CREATE TABLE IF NOT EXISTS `app_perfiles` (
  `id_perfil` int(11) NOT NULL AUTO_INCREMENT,
  `tx_descripcion` varchar(50) NOT NULL,
  `in_estado` int(11) NOT NULL DEFAULT 1,
  `updated_at` varchar(250) NOT NULL,
  `created_at` varchar(250) NOT NULL,
  PRIMARY KEY (`id_perfil`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla base.app_perfiles: ~2 rows (aproximadamente)
DELETE FROM `app_perfiles`;
INSERT INTO `app_perfiles` (`id_perfil`, `tx_descripcion`, `in_estado`, `updated_at`, `created_at`) VALUES
	(1, 'SuperAdmin', 1, '', ''),
	(2, 'Admin', 1, '2025-03-20 14:10:09', '2025-03-20 14:10:09');

-- Volcando estructura para tabla base.app_permisos_modulos
DROP TABLE IF EXISTS `app_permisos_modulos`;
CREATE TABLE IF NOT EXISTS `app_permisos_modulos` (
  `_id` int(20) NOT NULL AUTO_INCREMENT,
  `idModulo` int(20) DEFAULT NULL,
  `idPerfil` int(20) DEFAULT NULL,
  `ver` tinyint(1) DEFAULT NULL,
  `crear` tinyint(1) DEFAULT NULL,
  `editar` tinyint(1) DEFAULT NULL,
  `borrar` tinyint(1) DEFAULT NULL,
  `Informes` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5724 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla base.app_permisos_modulos: ~82 rows (aproximadamente)
DELETE FROM `app_permisos_modulos`;
INSERT INTO `app_permisos_modulos` (`_id`, `idModulo`, `idPerfil`, `ver`, `crear`, `editar`, `borrar`, `Informes`, `created_at`, `updated_at`) VALUES
	(2773, 9, 1, 1, 1, 1, 1, 0, '2024-05-08 17:59:28', '2024-05-08 17:59:28'),
	(2774, 9, 2, 0, 0, 0, 0, 0, '2024-05-08 17:59:28', '2024-05-08 17:59:28'),
	(2775, 9, 3, 0, 0, 0, 0, 0, '2024-05-08 17:59:28', '2024-05-08 17:59:28'),
	(2776, 9, 4, 0, 0, 0, 0, 0, '2024-05-08 17:59:28', '2024-05-08 17:59:28'),
	(2777, 9, 5, 0, 0, 0, 0, 0, '2024-05-08 17:59:28', '2024-05-08 17:59:28'),
	(2778, 9, 6, 0, 0, 0, 0, 0, '2024-05-08 17:59:28', '2024-05-08 17:59:28'),
	(2779, 9, 7, 0, 0, 0, 0, 0, '2024-05-08 17:59:28', '2024-05-08 17:59:28'),
	(2780, 9, 8, 0, 0, 0, 0, 0, '2024-05-08 17:59:28', '2024-05-08 17:59:28'),
	(2781, 9, 9, 0, 0, 0, 0, 0, '2024-05-08 17:59:28', '2024-05-08 17:59:28'),
	(2782, 9, 10, 0, 0, 0, 0, 0, '2024-05-08 17:59:28', '2024-05-08 17:59:28'),
	(2783, 9, 11, 0, 0, 0, 0, 0, '2024-05-08 17:59:28', '2024-05-08 17:59:28'),
	(2784, 9, 12, 0, 0, 0, 0, 0, '2024-05-08 17:59:28', '2024-05-08 17:59:28'),
	(2785, 9, 13, 0, 0, 0, 0, 0, '2024-05-08 17:59:28', '2024-05-08 17:59:28'),
	(2786, 9, 14, 0, 0, 0, 0, 0, '2024-05-08 17:59:28', '2024-05-08 17:59:28'),
	(2787, 9, 15, 0, 0, 0, 0, 0, '2024-05-08 17:59:28', '2024-05-08 17:59:28'),
	(2788, 9, 16, 0, 0, 0, 0, 0, '2024-05-08 17:59:28', '2024-05-08 17:59:28'),
	(2789, 9, 19, 0, 0, 0, 0, 0, '2024-05-08 17:59:28', '2024-05-08 17:59:28'),
	(2790, 9, 20, 0, 0, 0, 0, 0, '2024-05-08 17:59:28', '2024-05-08 17:59:28'),
	(2830, 13, 1, 1, 1, 1, 1, 0, '2024-05-08 18:00:43', '2024-05-08 18:00:43'),
	(2831, 13, 2, 0, 0, 0, 0, 0, '2024-05-08 18:00:43', '2024-05-08 18:00:43'),
	(2832, 13, 3, 0, 0, 0, 0, 0, '2024-05-08 18:00:43', '2024-05-08 18:00:43'),
	(2833, 13, 4, 0, 0, 0, 0, 0, '2024-05-08 18:00:43', '2024-05-08 18:00:43'),
	(2834, 13, 5, 0, 0, 0, 0, 0, '2024-05-08 18:00:43', '2024-05-08 18:00:43'),
	(2835, 13, 6, 0, 0, 0, 0, 0, '2024-05-08 18:00:43', '2024-05-08 18:00:43'),
	(2836, 13, 7, 0, 0, 0, 0, 0, '2024-05-08 18:00:43', '2024-05-08 18:00:43'),
	(2837, 13, 8, 0, 0, 0, 0, 0, '2024-05-08 18:00:43', '2024-05-08 18:00:43'),
	(2838, 13, 9, 0, 0, 0, 0, 0, '2024-05-08 18:00:43', '2024-05-08 18:00:43'),
	(2839, 13, 10, 0, 0, 0, 0, 0, '2024-05-08 18:00:43', '2024-05-08 18:00:43'),
	(2840, 13, 11, 0, 0, 0, 0, 0, '2024-05-08 18:00:43', '2024-05-08 18:00:43'),
	(2841, 13, 12, 0, 0, 0, 0, 0, '2024-05-08 18:00:43', '2024-05-08 18:00:43'),
	(2842, 13, 13, 0, 0, 0, 0, 0, '2024-05-08 18:00:43', '2024-05-08 18:00:43'),
	(2843, 13, 14, 0, 0, 0, 0, 0, '2024-05-08 18:00:43', '2024-05-08 18:00:43'),
	(2844, 13, 15, 0, 0, 0, 0, 0, '2024-05-08 18:00:43', '2024-05-08 18:00:43'),
	(2845, 13, 16, 0, 0, 0, 0, 0, '2024-05-08 18:00:43', '2024-05-08 18:00:43'),
	(2846, 13, 19, 0, 0, 0, 0, 0, '2024-05-08 18:00:43', '2024-05-08 18:00:43'),
	(2847, 13, 20, 0, 0, 0, 0, 0, '2024-05-08 18:00:43', '2024-05-08 18:00:43'),
	(4625, 10, 1, 1, 1, 1, 1, 0, '2024-09-13 16:09:22', '2024-09-13 16:09:22'),
	(4626, 10, 2, 0, 0, 0, 0, 0, '2024-09-13 16:09:22', '2024-09-13 16:09:22'),
	(4627, 10, 3, 0, 0, 0, 0, 0, '2024-09-13 16:09:22', '2024-09-13 16:09:22'),
	(4628, 10, 4, 0, 0, 0, 0, 0, '2024-09-13 16:09:22', '2024-09-13 16:09:22'),
	(4629, 10, 5, 0, 0, 0, 0, 0, '2024-09-13 16:09:22', '2024-09-13 16:09:22'),
	(4630, 10, 6, 0, 0, 0, 0, 0, '2024-09-13 16:09:22', '2024-09-13 16:09:22'),
	(4631, 10, 7, 0, 0, 0, 0, 0, '2024-09-13 16:09:22', '2024-09-13 16:09:22'),
	(4632, 10, 8, 0, 0, 0, 0, 0, '2024-09-13 16:09:22', '2024-09-13 16:09:22'),
	(4633, 10, 9, 0, 0, 0, 0, 0, '2024-09-13 16:09:22', '2024-09-13 16:09:22'),
	(4634, 10, 10, 0, 0, 0, 0, 0, '2024-09-13 16:09:22', '2024-09-13 16:09:22'),
	(4635, 10, 11, 0, 0, 0, 0, 0, '2024-09-13 16:09:22', '2024-09-13 16:09:22'),
	(4636, 10, 12, 0, 0, 0, 0, 0, '2024-09-13 16:09:22', '2024-09-13 16:09:22'),
	(4637, 10, 13, 0, 0, 0, 0, 0, '2024-09-13 16:09:22', '2024-09-13 16:09:22'),
	(4638, 10, 14, 0, 0, 0, 0, 0, '2024-09-13 16:09:22', '2024-09-13 16:09:22'),
	(4639, 10, 15, 0, 0, 0, 0, 0, '2024-09-13 16:09:22', '2024-09-13 16:09:22'),
	(4640, 10, 16, 0, 0, 0, 0, 0, '2024-09-13 16:09:22', '2024-09-13 16:09:22'),
	(4641, 10, 19, 0, 0, 0, 0, 0, '2024-09-13 16:09:22', '2024-09-13 16:09:22'),
	(4642, 10, 20, 0, 0, 0, 0, 0, '2024-09-13 16:09:22', '2024-09-13 16:09:22'),
	(4643, 10, 21, 0, 0, 0, 0, 0, '2024-09-13 16:09:22', '2024-09-13 16:09:22'),
	(4644, 10, 22, 0, 0, 0, 0, 0, '2024-09-13 16:09:22', '2024-09-13 16:09:22'),
	(4645, 10, 23, 0, 0, 0, 0, 0, '2024-09-13 16:09:22', '2024-09-13 16:09:22'),
	(4646, 10, 24, 0, 0, 0, 0, 0, '2024-09-13 16:09:22', '2024-09-13 16:09:22'),
	(4647, 10, 25, 0, 0, 0, 0, 0, '2024-09-13 16:09:22', '2024-09-13 16:09:22'),
	(4649, 12, 1, 1, 1, 1, 1, 0, '2024-09-13 16:09:31', '2024-09-13 16:09:31'),
	(4650, 12, 2, 0, 0, 0, 0, 0, '2024-09-13 16:09:31', '2024-09-13 16:09:31'),
	(4651, 12, 3, 0, 0, 0, 0, 0, '2024-09-13 16:09:31', '2024-09-13 16:09:31'),
	(4652, 12, 4, 0, 0, 0, 0, 0, '2024-09-13 16:09:31', '2024-09-13 16:09:31'),
	(4653, 12, 5, 0, 0, 0, 0, 0, '2024-09-13 16:09:31', '2024-09-13 16:09:31'),
	(4654, 12, 6, 0, 0, 0, 0, 0, '2024-09-13 16:09:31', '2024-09-13 16:09:31'),
	(4655, 12, 7, 0, 0, 0, 0, 0, '2024-09-13 16:09:31', '2024-09-13 16:09:31'),
	(4656, 12, 8, 0, 0, 0, 0, 0, '2024-09-13 16:09:31', '2024-09-13 16:09:31'),
	(4657, 12, 9, 0, 0, 0, 0, 0, '2024-09-13 16:09:31', '2024-09-13 16:09:31'),
	(4658, 12, 10, 0, 0, 0, 0, 0, '2024-09-13 16:09:31', '2024-09-13 16:09:31'),
	(4659, 12, 11, 0, 0, 0, 0, 0, '2024-09-13 16:09:31', '2024-09-13 16:09:31'),
	(4660, 12, 12, 0, 0, 0, 0, 0, '2024-09-13 16:09:31', '2024-09-13 16:09:31'),
	(4661, 12, 13, 0, 0, 0, 0, 0, '2024-09-13 16:09:31', '2024-09-13 16:09:31'),
	(4662, 12, 14, 0, 0, 0, 0, 0, '2024-09-13 16:09:31', '2024-09-13 16:09:31'),
	(4663, 12, 15, 0, 0, 0, 0, 0, '2024-09-13 16:09:31', '2024-09-13 16:09:31'),
	(4664, 12, 16, 0, 0, 0, 0, 0, '2024-09-13 16:09:31', '2024-09-13 16:09:31'),
	(4665, 12, 19, 0, 0, 0, 0, 0, '2024-09-13 16:09:31', '2024-09-13 16:09:31'),
	(4666, 12, 20, 0, 0, 0, 0, 0, '2024-09-13 16:09:31', '2024-09-13 16:09:31'),
	(4667, 12, 21, 0, 0, 0, 0, 0, '2024-09-13 16:09:31', '2024-09-13 16:09:31'),
	(4668, 12, 22, 0, 0, 0, 0, 0, '2024-09-13 16:09:31', '2024-09-13 16:09:31'),
	(4669, 12, 23, 0, 0, 0, 0, 0, '2024-09-13 16:09:31', '2024-09-13 16:09:31'),
	(4670, 12, 24, 0, 0, 0, 0, 0, '2024-09-13 16:09:31', '2024-09-13 16:09:31'),
	(4671, 12, 25, 0, 0, 0, 0, 0, '2024-09-13 16:09:31', '2024-09-13 16:09:31'),
	(5720, 78, 1, 1, 1, 1, 1, 0, '2025-03-25 06:11:51', '2025-03-25 06:11:51'),
	(5721, 78, 2, 1, 1, 1, 0, 0, '2025-03-25 06:11:51', '2025-03-25 06:11:51'),
	(5722, 79, 1, 1, 1, 1, 1, 0, '2025-03-25 06:46:35', '2025-03-25 06:46:35'),
	(5723, 79, 2, 1, 1, 1, 0, 0, '2025-03-25 06:46:35', '2025-03-25 06:46:35');

-- Volcando estructura para tabla base.app_usuarios
DROP TABLE IF EXISTS `app_usuarios`;
CREATE TABLE IF NOT EXISTS `app_usuarios` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `tx_usuario` varchar(50) NOT NULL COMMENT 'Correo del usuario',
  `tx_nombre` varchar(200) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `tx_clave` varchar(50) DEFAULT NULL,
  `in_perfil` varchar(10) NOT NULL,
  `in_estado` varchar(5) NOT NULL DEFAULT '1',
  `tx_correo` varchar(100) DEFAULT NULL,
  `primera_vez` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla base.app_usuarios: ~2 rows (aproximadamente)
DELETE FROM `app_usuarios`;
INSERT INTO `app_usuarios` (`id_usuario`, `tx_usuario`, `tx_nombre`, `tx_clave`, `in_perfil`, `in_estado`, `tx_correo`, `primera_vez`, `created_at`, `updated_at`) VALUES
	(1, 'admin@xyro.com.co', 'admin xyro', '827ccb0eea8a706c4c34a16891f84e7b', '1', '1', 'gabrielramirez@xyro.com.co', 0, '2024-11-13 19:56:08', '2025-02-27 20:07:05'),
	(3, 'daniel', 'Daniel Quintero', '827ccb0eea8a706c4c34a16891f84e7b', '1', '1', 'mauro.q.91@gmail.com', 0, '2025-03-20 19:04:54', '2025-03-22 01:44:47'),
	(4, 'pruebas', 'pruebas', '827ccb0eea8a706c4c34a16891f84e7b', '2', '3', 'pruebas@mail.com', 0, '2025-03-22 01:40:50', '2025-03-22 02:10:48');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
