create database cuaderno;

use cuaderno;

CREATE TABLE usuario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255),
  ci INT,
  telefono VARCHAR(255),
  direccion VARCHAR(255),
  fecha_nacimiento DATE,
  id_curso VARCHAR(255) NULL,
  rol VARCHAR(255),
  id_usuario VARCHAR(255) NULL,
  user VARCHAR(255),
  pass VARCHAR(255)
);

CREATE TABLE curso (
  id INT AUTO_INCREMENT PRIMARY KEY,
  grado VARCHAR(255),
  paralelo VARCHAR(255),
  id_profesor INT,
  FOREIGN KEY (id_profesor) REFERENCES usuario(id)
);

CREATE TABLE materia (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255),
  id_curso INT(255),
  FOREIGN KEY (id_curso) REFERENCES curso(id)
);

CREATE TABLE nota (
  id INT AUTO_INCREMENT PRIMARY KEY,
  indicador VARCHAR(255),
  campo VARCHAR(50),
  id_materia INT,
  FOREIGN KEY (id_materia) REFERENCES materia(id)
);

CREATE TABLE calificacion (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nota REAL,
  id_nota INT,
  id_estudiante INT,
  FOREIGN KEY (id_nota) REFERENCES nota(id),
  FOREIGN KEY (id_estudiante) REFERENCES usuario(id)
);