-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: universidad
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alumno`
--

DROP TABLE IF EXISTS `alumno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alumno` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(255) DEFAULT NULL,
  `Apellido` varchar(255) DEFAULT NULL,
  `DNI` varchar(20) DEFAULT NULL,
  `FechaNacimiento` date DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Telefono` varchar(255) DEFAULT NULL,
  `Direccion` varchar(255) DEFAULT NULL,
  `Ciudad` varchar(255) DEFAULT NULL,
  `FechaIngreso` date DEFAULT NULL,
  `CarreraID` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `DNI` (`DNI`),
  KEY `CarreraID` (`CarreraID`),
  CONSTRAINT `alumno_ibfk_1` FOREIGN KEY (`CarreraID`) REFERENCES `carrera` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumno`
--

LOCK TABLES `alumno` WRITE;
/*!40000 ALTER TABLE `alumno` DISABLE KEYS */;
INSERT INTO `alumno` VALUES (1,'Juan','Pérez','44556677','2002-04-15','juan.perez@gmail.com','221-555-1234','Calle Falsa 123','Benito Juárez','2021-03-01',1),(2,'María','Gómez','33445566','2001-11-22','maria.gomez@hotmail.com','221-555-5678','Av. Libertad 456','Benito Juárez','2020-03-01',2),(3,'Lucía','Rodríguez','55667788','2003-08-10','lucia.r@gmail.com','221-555-9876','San Martín 789','Benito Juárez','2022-03-01',1),(4,'pepito','martinez','30000000',NULL,'pg981283@gmail.com','221-555-4465','falsasa 123','Benito Juarez','2023-03-01',1);
/*!40000 ALTER TABLE `alumno` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asistencia`
--

DROP TABLE IF EXISTS `asistencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asistencia` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `AlumnoID` int DEFAULT NULL,
  `ClaseID` int DEFAULT NULL,
  `Presente` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `AlumnoID` (`AlumnoID`),
  KEY `ClaseID` (`ClaseID`),
  CONSTRAINT `asistencia_ibfk_1` FOREIGN KEY (`AlumnoID`) REFERENCES `alumno` (`ID`),
  CONSTRAINT `asistencia_ibfk_2` FOREIGN KEY (`ClaseID`) REFERENCES `clase` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asistencia`
--

LOCK TABLES `asistencia` WRITE;
/*!40000 ALTER TABLE `asistencia` DISABLE KEYS */;
/*!40000 ALTER TABLE `asistencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carrera`
--

DROP TABLE IF EXISTS `carrera`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrera` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(255) DEFAULT NULL,
  `DuracionAnios` int DEFAULT NULL,
  `UniversidadID` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `UniversidadID` (`UniversidadID`),
  CONSTRAINT `carrera_ibfk_1` FOREIGN KEY (`UniversidadID`) REFERENCES `universidad` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrera`
--

LOCK TABLES `carrera` WRITE;
/*!40000 ALTER TABLE `carrera` DISABLE KEYS */;
INSERT INTO `carrera` VALUES (1,'Tecnicatura en Programación',3,1),(2,'Profesorado de Matemática',4,1);
/*!40000 ALTER TABLE `carrera` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `certificadoalumnoregular`
--

DROP TABLE IF EXISTS `certificadoalumnoregular`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `certificadoalumnoregular` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `AlumnoID` int DEFAULT NULL,
  `FechaEmision` datetime DEFAULT NULL,
  `CodigoVerificacion` varchar(50) DEFAULT NULL,
  `GeneradoPor` varchar(255) DEFAULT NULL COMMENT 'Usuario o sistema que generó el certificado',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `CodigoVerificacion` (`CodigoVerificacion`),
  KEY `AlumnoID` (`AlumnoID`),
  CONSTRAINT `certificadoalumnoregular_ibfk_1` FOREIGN KEY (`AlumnoID`) REFERENCES `alumno` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `certificadoalumnoregular`
--

LOCK TABLES `certificadoalumnoregular` WRITE;
/*!40000 ALTER TABLE `certificadoalumnoregular` DISABLE KEYS */;
INSERT INTO `certificadoalumnoregular` VALUES (1,1,'2025-10-13 16:55:22','1b9ebaed-c1fc-40a6-856b-a42610eacf58','Sistema'),(2,1,'2025-10-20 15:39:00','965ee8a6-a754-4e1c-ba8f-50b27f3012d0','Sistema'),(3,4,'2025-10-20 15:53:18','0699b6d6-c1af-489a-92f5-8124c50e2164','Sistema'),(4,4,'2025-10-20 16:27:51','2aeddedb-13c7-45dc-8884-e2d8db72bb05','Sistema'),(5,4,'2025-10-20 16:30:30','d9bd2915-f2e7-4980-bf6c-6b0275604e23','Sistema'),(6,4,'2025-10-20 16:31:43','95da088d-9147-4a30-bf62-90d6cb13e1fa','Sistema'),(7,4,'2025-10-20 16:31:43','0528ae91-0bd4-42ba-9b40-9c26676b8d17','Sistema'),(8,4,'2025-10-20 16:33:08','4e4b33f8-0210-4892-98c8-633a57fe666b','Sistema'),(9,4,'2025-10-20 16:34:52','dfe30c61-edf6-4506-b0e5-94c76e85b1b6','Sistema'),(10,4,'2025-10-20 16:36:05','c1b9b041-9f92-4284-a6ab-78ef4079d1de','Sistema'),(11,4,'2025-10-20 16:42:57','e0b6d6c6-2a04-43ca-946a-ce8ec850cad8','Sistema'),(12,4,'2025-10-20 16:46:32','e314e920-1d83-43c9-b991-5ba0ba212b10','Sistema'),(13,4,'2025-10-20 16:48:40','d6dbcec1-253c-4ab9-97e4-3bde26d61235','Sistema'),(14,4,'2025-10-20 16:53:01','9dda01bd-4222-411a-9edd-6a17ab2dc815','Sistema'),(15,4,'2025-10-20 16:53:11','5e8cec1a-5f2f-4d43-9e3d-6b92a2fdc822','Sistema'),(16,4,'2025-10-20 16:55:50','88efe56d-c73a-40ae-a0a8-fd2e48a8e871','Sistema'),(17,4,'2025-10-20 16:57:20','1fe6cc5d-18a5-480a-90df-0ea640646527','Sistema'),(18,1,'2025-10-24 14:53:07','a4a22f53-3681-4bdc-ba0a-31546e3e92ee','Sistema'),(19,4,'2025-10-24 14:55:28','2f2124c5-139a-41d8-9cba-5f9c6dca0f27','Sistema'),(20,4,'2025-10-24 14:55:31','d429e678-8ea1-4b16-8fad-03ec4ff6f9fb','Sistema'),(21,4,'2025-10-24 14:59:14','b8ed959c-a03f-4aed-957a-f6c8cb000829','Sistema'),(22,4,'2025-10-24 15:00:43','55ff13f3-5440-4a10-a2c3-122684221142','Sistema'),(23,4,'2025-10-24 15:02:49','6d24fa68-0db5-4f1f-978c-3706936e138e','Sistema'),(24,4,'2025-10-24 15:06:28','7a690ff1-4dfa-4994-ba90-3f7b4638d2ec','Sistema'),(25,4,'2025-10-24 15:08:00','d014746b-d7e0-4aca-81dd-dc40482b56c2','Sistema');
/*!40000 ALTER TABLE `certificadoalumnoregular` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clase`
--

DROP TABLE IF EXISTS `clase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clase` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `MateriaID` int DEFAULT NULL,
  `ProfesorID` int DEFAULT NULL,
  `Fecha` date DEFAULT NULL,
  `Tema` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `MateriaID` (`MateriaID`),
  KEY `ProfesorID` (`ProfesorID`),
  CONSTRAINT `clase_ibfk_1` FOREIGN KEY (`MateriaID`) REFERENCES `materia` (`ID`),
  CONSTRAINT `clase_ibfk_2` FOREIGN KEY (`ProfesorID`) REFERENCES `profesor` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clase`
--

LOCK TABLES `clase` WRITE;
/*!40000 ALTER TABLE `clase` DISABLE KEYS */;
/*!40000 ALTER TABLE `clase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `examen`
--

DROP TABLE IF EXISTS `examen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `examen` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `MateriaID` int DEFAULT NULL,
  `ProfesorID` int DEFAULT NULL,
  `Fecha` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `MateriaID` (`MateriaID`),
  KEY `ProfesorID` (`ProfesorID`),
  CONSTRAINT `examen_ibfk_1` FOREIGN KEY (`MateriaID`) REFERENCES `materia` (`ID`),
  CONSTRAINT `examen_ibfk_2` FOREIGN KEY (`ProfesorID`) REFERENCES `profesor` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `examen`
--

LOCK TABLES `examen` WRITE;
/*!40000 ALTER TABLE `examen` DISABLE KEYS */;
/*!40000 ALTER TABLE `examen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materia`
--

DROP TABLE IF EXISTS `materia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materia` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(255) DEFAULT NULL,
  `Anio` int DEFAULT NULL,
  `CarreraID` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `CarreraID` (`CarreraID`),
  CONSTRAINT `materia_ibfk_1` FOREIGN KEY (`CarreraID`) REFERENCES `carrera` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materia`
--

LOCK TABLES `materia` WRITE;
/*!40000 ALTER TABLE `materia` DISABLE KEYS */;
/*!40000 ALTER TABLE `materia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nota`
--

DROP TABLE IF EXISTS `nota`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nota` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `AlumnoID` int DEFAULT NULL,
  `ExamenID` int DEFAULT NULL,
  `Calificacion` decimal(5,2) DEFAULT NULL,
  `Fecha` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `AlumnoID` (`AlumnoID`),
  KEY `ExamenID` (`ExamenID`),
  CONSTRAINT `nota_ibfk_1` FOREIGN KEY (`AlumnoID`) REFERENCES `alumno` (`ID`),
  CONSTRAINT `nota_ibfk_2` FOREIGN KEY (`ExamenID`) REFERENCES `examen` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nota`
--

LOCK TABLES `nota` WRITE;
/*!40000 ALTER TABLE `nota` DISABLE KEYS */;
/*!40000 ALTER TABLE `nota` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profesor`
--

DROP TABLE IF EXISTS `profesor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profesor` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(255) DEFAULT NULL,
  `Apellido` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Telefono` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesor`
--

LOCK TABLES `profesor` WRITE;
/*!40000 ALTER TABLE `profesor` DISABLE KEYS */;
/*!40000 ALTER TABLE `profesor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `universidad`
--

DROP TABLE IF EXISTS `universidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `universidad` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `universidad`
--

LOCK TABLES `universidad` WRITE;
/*!40000 ALTER TABLE `universidad` DISABLE KEYS */;
INSERT INTO `universidad` VALUES (1,'Instituto Superior del Sudeste');
/*!40000 ALTER TABLE `universidad` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-24 16:01:02
