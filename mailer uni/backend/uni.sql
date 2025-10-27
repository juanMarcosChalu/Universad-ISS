CREATE DATABASE IF NOT EXISTS universidad
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;
USE universidad;

CREATE TABLE `Universidad` (
  `ID` int PRIMARY KEY AUTO_INCREMENT,
  `Nombre` varchar(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `Carrera` (
  `ID` int PRIMARY KEY AUTO_INCREMENT,
  `Nombre` varchar(255),
  `DuracionAnios` int,
  `UniversidadID` int
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `Alumno` (
  `ID` int PRIMARY KEY AUTO_INCREMENT,
  `Nombre` varchar(255),
  `Apellido` varchar(255),
  `DNI` varchar(20) UNIQUE,
  `FechaNacimiento` date,
  `Email` varchar(255),
  `Telefono` varchar(255),
  `Direccion` varchar(255),
  `Ciudad` varchar(255),
  `FechaIngreso` date,
  `CarreraID` int
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `Profesor` (
  `ID` int PRIMARY KEY AUTO_INCREMENT,
  `Nombre` varchar(255),
  `Apellido` varchar(255),
  `Email` varchar(255),
  `Telefono` varchar(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `Materia` (
  `ID` int PRIMARY KEY AUTO_INCREMENT,
  `Nombre` varchar(255),
  `Anio` int,
  `CarreraID` int
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `Clase` (
  `ID` int PRIMARY KEY AUTO_INCREMENT,
  `MateriaID` int,
  `ProfesorID` int,
  `Fecha` date,
  `Tema` varchar(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `Asistencia` (
  `ID` int PRIMARY KEY AUTO_INCREMENT,
  `AlumnoID` int,
  `ClaseID` int,
  `Presente` tinyint(1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `CertificadoAlumnoRegular` (
  `ID` int PRIMARY KEY AUTO_INCREMENT,
  `AlumnoID` int,
  `FechaEmision` datetime,
  `CodigoVerificacion` varchar(50) UNIQUE,
  `GeneradoPor` varchar(255) COMMENT 'Usuario o sistema que generó el certificado'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `Examen` (
  `ID` int PRIMARY KEY AUTO_INCREMENT,
  `MateriaID` int,
  `ProfesorID` int,
  `Fecha` datetime
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `Nota` (
  `ID` int PRIMARY KEY AUTO_INCREMENT,
  `AlumnoID` int,
  `ExamenID` int,
  `Calificacion` decimal(5,2),
  `Fecha` datetime
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Foreign keys (se agregan con ALTER para evitar problemas de orden)
ALTER TABLE `Carrera` ADD FOREIGN KEY (`UniversidadID`) REFERENCES `Universidad` (`ID`);
ALTER TABLE `Alumno` ADD FOREIGN KEY (`CarreraID`) REFERENCES `Carrera` (`ID`);
ALTER TABLE `Materia` ADD FOREIGN KEY (`CarreraID`) REFERENCES `Carrera` (`ID`);
ALTER TABLE `Clase` ADD FOREIGN KEY (`MateriaID`) REFERENCES `Materia` (`ID`);
ALTER TABLE `Clase` ADD FOREIGN KEY (`ProfesorID`) REFERENCES `Profesor` (`ID`);
ALTER TABLE `Asistencia` ADD FOREIGN KEY (`AlumnoID`) REFERENCES `Alumno` (`ID`);
ALTER TABLE `Asistencia` ADD FOREIGN KEY (`ClaseID`) REFERENCES `Clase` (`ID`);
ALTER TABLE `CertificadoAlumnoRegular` ADD FOREIGN KEY (`AlumnoID`) REFERENCES `Alumno` (`ID`);
ALTER TABLE `Examen` ADD FOREIGN KEY (`MateriaID`) REFERENCES `Materia` (`ID`);
ALTER TABLE `Examen` ADD FOREIGN KEY (`ProfesorID`) REFERENCES `Profesor` (`ID`);
ALTER TABLE `Nota` ADD FOREIGN KEY (`AlumnoID`) REFERENCES `Alumno` (`ID`);
ALTER TABLE `Nota` ADD FOREIGN KEY (`ExamenID`) REFERENCES `Examen` (`ID`);
