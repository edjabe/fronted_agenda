Frontend agenda es una aplicacion hecha en vue.js la cual consume los servicios por medio de api del backend_agenda (https://github.com/edjabe/backend_agenda).

## Proceso de instalación

### 1. Clonar el repositorio

``` bash
# Primero clonamos el repositorio
$ git clone https://github.com/edjabe/fronted_agenda.git fronted_agenda

# Ingresamos al proyecto
$ cd fronted_agenda

# Procedemos a instalar todas las dependencias utilizadas
$ npm install

# Se debe copiar y confiagurar el archivo .env (En caso de que este incluido saltarse este paso)
$ cp .env.example .env
```
Una vez creado el archivo .env se configura lo siguiente:
En VUE_APP_API se debe reemplazar el ejemplo que viene (http://localhost) por la nueva url de la aplicación [backend_agenda](https://github.com/edjabe/backend_agenda) y al final agregar la url /api/v1/ Debería quedar de la siguiente forma:

```
VUE_APP_API=http://backend_agenda.test/api/v1

```

## 2. Ejecución y uso

``` bash
# Una vez configurado el archivo .env dentramos dentro del proyecto fronted_agenda y ejecutamos el siguiente comando:
npm run serve
```
Una vez ejecutado el comando anterior ingresamos al navegador y nos dirigimos a : http://localhost:8080

Para poder ingresar a la aplicación se debe usar unos de los siguientes usuarios:

Correo
```
administrador@agenda.com
ricardo@agenda.com
jpulgarin@agenda.com
```
Contraseña
```
#Para todos los usuarios es la misma
prueba2019
```
