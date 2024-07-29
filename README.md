# Backend Cuaderno Digital

Este proyecto esta desarrollado con ExpressJS

## Tecnologias empleadas

- [Express](https://expressjs.com/es/) Framework web Node.js minimalista y flexible.
- [Passport](https://www.passportjs.org/) Middleware de autenticación para Node.js.
- [Mysql](https://www.mysql.com/) Sistema de gestión de bases de datos relacional.

# Instalacion

Antes de continuar es necesario que se hayan instalado las siguientes instalaciones

- [NodeJS](https://nodejs.org/en) Version LTS 20.16.0
- [NVM](https://github.com/nvm-sh/nvm) Para ambientes de desarrollo
- [Mysql](https://www.mysql.com/) Para conexion con la base de datos

En caso de no tener instalado `MySQL` realizar una instalacion con [Docker](https://docs.docker.com/)

```bash
docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:latest
```

### Configuracion del proyecto

Ingresar a la ruta del Backend

```bash
cd servidor
```

Crear la base de datos
En caso de tener instalado `MySQL` ingresar por la terminal

```bash
mysql -u root -p
```

En caso de tener instalado `MySQL` con docker ingresar por la terminal

```bash
docker exec -it mysql mysql -u root -p
```

Copiar y pegar el contenido del archivo [database.sql](servidor/database/database.sql)
La configuración de las variables de entorno se encuentra en el archivo .env.sample, el cual se debe renombrar con .env

```bash
cp .env.sample .env
```

### Instalando el proyecto

Instalar dependencias

```bash
npm install
```

Iniciar en modo desarrollo

```bash
npm run dev
```

# Frontend Cuaderno Digital

Este proyecto esta desarrollado con VueJS

## Tecnologias empleadas

- [VueJS](https://vuejs.org/) Framework frontend basado en JS/TS
- [Bootstrap](https://getbootstrap.com/) Framework web para diseño responsivo y moderno.
- [Axios](https://axios-http.com/) Manejo de peticiones HTTP

## Instalacion

Antes de continuar es necesario que se hayan realizado las siguiente instalaciones

- [NodeJS](https://nodejs.org/en) Version LTS 20.16.0
- [NVM](https://github.com/nvm-sh/nvm) Para ambientes de desarrollo

### Configuracion del proyecto

Ingresar a la ruta del frontend

```bash
cd frontend
```

La configuración de las variables de entorno se encuentra en el archivo .env.sample, el cual se debe renombrar con .env

```bash
cp .env.sample .env
```

### Instalando el proyecto

Instalar dependencias

```bash
npm install
```

Iniciar en modo desarrollo

```bash
npm run dev
```

Ingresar a la direccion

```bash
http://localhost:5173/
```
