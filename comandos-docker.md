## Comandos docker

### Version de docker
```bash
docker version
```

### Descargar una imagen
```bash
docker pull [name] [tag de la version]
```

### Crear un contenedor de mongo y ejecutarlo a partir de una imagen
```bash
docker run -d -p 27017:27017 -v /home/adminssh/dev/practicas-node/rest-server-node/data:/data/db --name mongodb mongo:3.6.3
```

* -d es para que se ejecute en segundo plano
* -p [puerto afuera]:[puerto dentro] es para definir los puertos
* -v [path afuera]:[path dentro] sirve para combartir los datos entre host y contenedor 
* --name [name] para colocar un nombre al contenedor

### Listar todos los contenedores Activos
```bash
docker ps
```

### Listar todos los contenedores
```bash
docker ps -a
```

### Ejecutar un contenedor dentro de un contenedor que ya esta corriendo
```bash
docker exec -it [id] bash
```

### Ver logs del contenedor
```bash
docker logs [id]
```

### Iniciar contenedor
```bash
docker start [id]
```

### Detener contenedor
```bash
docker stop [id]
```

### Eliminar contenedor
```bash
docker rm [id]
```

# Dockerfile
 El Dockerfile es el archivo que se usa para construir una app con docker, dentro de este archivo debemos pasar todas las instrucciones necesarias para que funcione nuestra app. Por ejemplo
 ```sh
 FROM node:12.22.1-alpine3.11

 WORKDIR /app
 COPY . .
 RUN npm i

 CMD ["node", "/app/src/app.js"]
 ```

### Construir un contenedor a partir de un Dockerfile
```sh
docker build -t [name-app]  .
```

### Ejecutar imagen construida
```sh
docker run -d -p [port host]:[port docker] -v [path host]:[path docker] [name-app]
```