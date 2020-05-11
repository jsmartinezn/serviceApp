# Service-app

Service-app es una plataforma que permite conectar personas que ofrezcan servicios varios con clientes potenciales. Las personas pueden registrarse como empleados o como clientes, y conectarse con otras personas dados los intereses en los servicios que se tengan.

---

# Correr la pagina Web Localmente

Para correr la aplicación localmente se necesita tener instalados estos complementos.

### Node.js

Para instalar Nodejs puedes visitar su pagina web [Node js](https://nodejs.org/es/download/).

### Mongo db

Como se va a correr localmente se necesita descargar mongodb, para hacerlo puedes visitar su pagina web [Mongo DB](https://www.mongodb.com/download-center/community).

Despues de instalar mongo ecribir en una terminal:

```
mongod
```

Y ya se tiene corriendo localmente la base de datos.

### Variables de entorno

Se necesita crear un .env en la carpeta raiz del proyecto y se debe agregar dirección completa de la base de datos de la siguiente forma: MONGO_DB_ATLAS=dirección.

---

## Start

Para inicializar el proyecto se debe poner a correr el back y el front, para esto en la consola del computador siga los siguientes pasos:

```
Correr front

cd front

###Instalar dependencias del front
yarn install

###Correr el front
yarn start

##Correr back

###Instalar dependencias del back
yarn install

##Correr el back
yarn start
```

---

# Autores

Sebastian Martinez
Luis Ruiz

---

# Link

[Pagina](https://service-app-uniandes.herokuapp.com/)

---

# Licencia

Para el proyecto se utilizo la sieguiente licencia [MIT Licence](https://raw.githubusercontent.com/larruibo/uniandesQuestionator/master/LICENSE)
