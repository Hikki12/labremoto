# ************************************************************
# Sequel Pro SQL dump
# Versión 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.28)
# Base de datos: LabRemotoUTPL
# Tiempo de Generación: 2021-01-07 16:55:08 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Volcado de tabla listProject
# ------------------------------------------------------------

DROP TABLE IF EXISTS `listProject`;

CREATE TABLE `listProject` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codeModel` varchar(255) DEFAULT NULL,
  `nameModel` varchar(255) DEFAULT NULL,
  `subtitlesModel` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `urlMaqueta` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `listProject` WRITE;
/*!40000 ALTER TABLE `listProject` DISABLE KEYS */;

INSERT INTO `listProject` (`id`, `codeModel`, `nameModel`, `subtitlesModel`, `description`, `urlMaqueta`)
VALUES
	(1,'mcu-01','Maqueta 1','Maqueta MCU 1','Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus ipsum porro eius, illo quis magni maxime voluptatum est velit ex asperiores aSSSb quam ratione dolodsadre cum vero sequi? Hic, dicta!','/mcu'),
	(2,'mcu-02','Maqueta 2','Maqueta MCU 2','Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus ipsum porro eius, illo quis magni maxime voluptatum est velit ex asperiores ab quam ratione dolore cum vero sequi? Hic, dicta!. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dol','/project'),
	(3,'mcu-03','Maqueta 3','Lorem ipsum','Lorem ipsum Lorem ipsum Lorem ipsum','/mcu'),
	(4,'mcu-04','Maqueta 4',NULL,'Lorem ipsum dolor sit amet consectetur adipisicing elit.','/mcu4'),
	(6,'prueba-01','Prueba 01','Prueba 01asdasdas','Prueba 01asdasdasPrueba 01asdasdasPrueba 01asdasdasPrueba 01asdasdasPrueba 01asdasdas','/prueba-01');

/*!40000 ALTER TABLE `listProject` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla messages
# ------------------------------------------------------------

DROP TABLE IF EXISTS `messages`;

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;

INSERT INTO `messages` (`id`, `lastname`, `firstname`, `message`)
VALUES
	(8,'Mous','Anony\'','Awesome Node application !'),
	(9,'Anony','mous','Second message for this node app !'),
	(10,'Rec','Baf','Third message for this application Node !'),
	(11,'12asda','asd','asdas');

/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla reservations
# ------------------------------------------------------------

DROP TABLE IF EXISTS `reservations`;

CREATE TABLE `reservations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  `startTime` varchar(255) DEFAULT NULL,
  `endTime` varchar(255) DEFAULT NULL,
  `mockup` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;

INSERT INTO `reservations` (`id`, `name`, `lastName`, `email`, `date`, `startTime`, `endTime`, `mockup`)
VALUES
	(5,'Jason','Macas','jason@utpl.edu.ec','2020-11-04','11:00:00','12:00:00','mcu-01'),
	(8,'Diego','Pinto','diepinto30@utpl.edu.ec','2020-10-22','15:00:00','16:00:00','mcu-01'),
	(9,'Diego','Pinto','diepinto30@utpl.edu.ec','2020-10-23','17:00:00','18:00:00','mcu-01'),
	(10,'Diego','Pinto','diepinto30@utpl.edu.ec','2020-10-23','18:00:00','19:00:00','mcu-01'),
	(13,'Diego','Pinto','diepinto30@utpl.edu.ec','2020-10-24','16:00:00','17:00:00','mcu-01'),
	(16,'Victor','UTPL','victor@utpl.edu.ec','2020-10-23','23:00:00','24:00:00','mcu-01'),
	(17,'Victor','UTPL','victor@utpl.edu.ec','2020-10-24','12:00:00','13:00:00','mcu-01'),
	(18,'Victor','UTPL','victor@utpl.edu.ec','2020-10-24','11:00:00','12:00:00','mcu-01'),
	(19,'Diego','Pinto','diepinto30@utpl.edu.ec','2020-10-25','08:00:00','09:00:00','mcu-01'),
	(20,'Diego','Pinto','diepinto30@utpl.edu.ec','2020-10-26','11:00:00','12:00:00','mcu-01'),
	(21,'Jenny','Rivera','jenny@utpl.edu.ec','2020-10-27','11:00:00','12:00:00','mcu-01'),
	(23,'Diego','Pinto','diepinto30@utpl.edu.ec','2020-11-04','11:00:00','12:00:00','mcu-01'),
	(24,'Diego','Pinto','diepinto30@utpl.edu.ec','2020-11-04','16:00:00','17:00:00','mcu-01'),
	(25,'Diego','Pinto','diepinto30@utpl.edu.ec','2020-11-27','17:00:00','18:00:00','mcu-01'),
	(26,'Diego','Pinto','diepinto30@utpl.edu.ec','2020-11-27','20:00:00','21:00:00','mcu-01'),
	(27,'Diego','Pinto','diepinto30@utpl.edu.ec','2020-11-27','20:00:00','21:00:00','mcu-02'),
	(28,'Victor','Calderon','victor@utpl.edu.ec','2020-12-01','15:00:00','16:00:00','mcu-01'),
	(29,'Diego','Pinto','diepinto30@utpl.edu.ec','2020-12-02','20:00:00','16:00:00','mcu-01'),
	(30,'Jenny','Rivera','jenny@utpl.edu.ec','2020-12-01','15:00:00','16:00:00','mcu-03'),
	(32,'Diego','Pinto','diepinto30@utpl.edu.ec','2020-12-02','15:00:00','16:00:00','mcu-02'),
	(34,'Diego','Pinto','diepinto30@utpl.edu.ec','2020-12-01','15:00:00','16:00:00','mcu-04'),
	(35,'Diego','Pinto','diepinto30@utpl.edu.ec','2020-12-01','22:00:00','23:00:00','mcu-05'),
	(36,'Jenny','Rivera','jenny@utpl.edu.ec','2020-12-08','18:00:00','19:00:00','mcu-03'),
	(37,'Diego','Pinto','diepinto30@utpl.edu.ec','2020-12-08','20:00:00','21:00:00','mcu-01'),
	(38,'Diego','Pinto','diepinto30@utpl.edu.ec','2020-12-08','18:00:00','19:00:00','mcu-02'),
	(39,'Diego','Pinto','diepinto30@utpl.edu.ec','2020-12-08','18:00:00','19:00:00','mcu-01'),
	(40,'Diego','Pinto','diepinto30@utpl.edu.ec','2020-12-08','19:00:00','20:00:00','mcu-01'),
	(46,'Diego','Pinto','diepinto30@utpl.edu.ec','2020-12-08','21:00:00','22:00:00','mcu-01'),
	(47,'Diego','Pinto','diepinto30@utpl.edu.ec','2020-12-08','21:00:00','22:00:00','mcu-02'),
	(48,'Diego','Pinto','diepinto30@utpl.edu.ec','2020-12-08','20:00:00','21:00:00','mcu-03'),
	(49,'Victor','Calderon','victor@utpl.edu.ec','2020-12-08','20:00:00','21:00:00','mcu-02'),
	(50,'Victor','Calderon','victor@utpl.edu.ec','2020-12-08','21:00:00','22:00:00','mcu-04'),
	(52,'Diego','Pinto','diepinto30@utpl.edu.ec','2020-12-09','13:00:00','14:00:00','mcu-01'),
	(54,'admin','Remoto','adminRemoto@utpl.edu.ec','2020-12-09','23:00:00','00:00:00','mcu-02'),
	(56,'Diego','Pinto','diepinto30@utpl.edu.ec','2020-12-10','22:00:00','23:00:00','mcu-02'),
	(57,'Diego','Pinto','diepinto30@utpl.edu.ec','2020-12-10','22:00:00','23:00:00','mcu-01'),
	(59,'Diego','Pinto','diepinto30@utpl.edu.ec','2020-12-12','00:00:00','01:00:00','prueba-01'),
	(60,'Diego','Pinto','diepinto30@utpl.edu.ec','2020-12-11','23:00:00','24:00:00','mcu-01'),
	(61,'Diego','Pinto','diepinto30@utpl.edu.ec','2020-12-12','17:00:00','18:00:00','mcu-01'),
	(62,'Diego','Pinto','diepinto30@utpl.edu.ec','2020-12-14','18:00:00','19:00:00','mcu-01'),
	(63,'Diego','Pinto','diepinto30@utpl.edu.ec','2020-12-15','16:00:00','17:00:00','mcu-01'),
	(64,'Diego','Pinto','diepinto30@utpl.edu.ec','2020-12-16','11:00:00','12:00:00','mcu-01'),
	(65,'admin','Remoto','adminRemoto@utpl.edu.ec','2020-12-16','11:00:00','12:00:00','asdfs11'),
	(66,'Diego','Pinto','diepinto30@utpl.edu.ec','2021-01-07','11:00:00','12:00:00','mcu-01'),
	(67,'Jenny','Rivera','jenny@utpl.edu.ec','2021-01-07','11:00:00','12:00:00','mcu-02'),
	(68,'admin','Remoto','adminRemoto@utpl.edu.ec','2021-01-07','11:00:00','12:00:00','mcu-04');

/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla testResult
# ------------------------------------------------------------

DROP TABLE IF EXISTS `testResult`;

CREATE TABLE `testResult` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  `result` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `testResult` WRITE;
/*!40000 ALTER TABLE `testResult` DISABLE KEYS */;

INSERT INTO `testResult` (`id`, `name`, `lastName`, `email`, `date`, `result`)
VALUES
	(1,'Diego','Pinto','diepinto30@utpl.edu.ec',NULL,NULL),
	(2,'Diego','Pinto','diepinto30@utpl.edu.ec',NULL,NULL),
	(3,'Diego','Pinto','diepinto30@utpl.edu.ec',NULL,NULL),
	(4,'Diego','Pinto','diepinto30@utpl.edu.ec',NULL,NULL),
	(5,'Diego','Pinto','diepinto30@utpl.edu.ec',NULL,NULL),
	(6,'Diego','Pinto','diepinto30@utpl.edu.ec',NULL,NULL),
	(7,'Diego','Pinto','diepinto30@utpl.edu.ec','2020-12-23 / 23:45:36','6.7/10'),
	(8,'Jason','Macas','jason@utpl.edu.ec','2020-12-23 / 23:47:17','8.8/10'),
	(9,'Jenny','Rivera','jenny@utpl.edu.ec','2020-12-23 / 23:48:3','8.8/10'),
	(10,'Jenny','Rivera','jenny@utpl.edu.ec','2020-12-23 / 23:48:46','10.0/10');

/*!40000 ALTER TABLE `testResult` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `rol` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `name`, `lastName`, `username`, `password`, `rol`)
VALUES
	(1,'Diego','Pinto','diepinto30@utpl.edu.ec','$2a$10$2Mn4TgEILYbLPRwR2ZEJ0.7MhwzPm8b2kkxMQxKE9.peK/s2HuSV.','estudiante'),
	(3,'Jason','Macas','jason@utpl.edu.ec','$2a$10$tBCZZWeNFZJN7QrddF8y9uyhA5TN7VCGNjL/h7BG8MW7LrBBQj76K','docente'),
	(4,'Victor','Calderon','victor@utpl.edu.ec','$2a$10$D98Xb4xpHJwiIxFzqzCaleR5StOIoo0LJ7hf4FPHn6MHQMHhpsgLS','estudiante'),
	(5,'Jenny','Rivera','jenny@utpl.edu.ec','$2a$10$dBMv578omq8uehirHV0x2.bnnipY9Th6VL2PJ1QupvRprscjF25ku','estudiante'),
	(6,'admin','Remoto','adminRemoto@utpl.edu.ec','$2a$10$lwtqr54QdJWgKtojVT4etO48G4DMp08FXScH2PwUGfIGZ7TmAXJFe','admin');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
