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
  id VARCHAR(255) PRIMARY KEY,
  grado VARCHAR(255),
  paralelo VARCHAR(255),
  id_usuario VARCHAR(255),
  FOREIGN KEY (id_usuario) REFERENCES usuario(id)
);

CREATE TABLE materia (
  id VARCHAR(255) PRIMARY KEY,
  nombre VARCHAR(255),
  id_curso VARCHAR(255),
  FOREIGN KEY (id_curso) REFERENCES curso(id)
);

CREATE TABLE tema (
  id VARCHAR(255) PRIMARY KEY,
  titulo VARCHAR(255),
  id_materia VARCHAR(255),
  FOREIGN KEY (id_materia) REFERENCES materia(id)
);

CREATE TABLE calificacion (
  id VARCHAR(255) PRIMARY KEY,
  nota_total REAL,
  nota_ser REAL,
  nota_saber REAL,
  nota_hacer REAL,
  nota_decidir REAL,
  nota_autoevaluacion REAL,
  id_materia VARCHAR(255),
  id_usuario VARCHAR(255),
  FOREIGN KEY (id_materia) REFERENCES materia(id),
  FOREIGN KEY (id_usuario) REFERENCES usuario(id)
);

CREATE TABLE nota (
  id VARCHAR(255) PRIMARY KEY,
  nota REAL,
  indicador VARCHAR(255),
  id_calificacion VARCHAR(255),
  FOREIGN KEY (id_calificacion) REFERENCES calificacion(id)
);

CREATE TABLE asistencia (
  id VARCHAR(255) PRIMARY KEY,
  presente VARCHAR(255),
  fecha DATE,
  id_calificacion VARCHAR(255),
  FOREIGN KEY (id_calificacion) REFERENCES calificacion(id)
);
