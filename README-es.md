[Ingles](README.md)

# UraraWeb

Este proyecto esta generado con [Angular CLI](https://github.com/angular/angular-cli) version 15.0.1.

## Servidor de desarrollo

Ejecutar `ng serve` para servidor desarrollo. Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente si cambia alguno de los archivos fuente.

## Code scaffolding

Ejecutar `ng generate component component-name` para generar un nuevo componente. Tambien puedes usar `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Construir

Ejecutar `ng build` para construir el proyecto. Los artefactos de construcción se almacenarán en el directorio`dist/`

## Ejecutar las pruebas unitarias

Ejecutar `ng test` para ejecutar las pruebas unitarias a través de [Karma](https://karma-runner.github.io).

## Ejecución de pruebas de un extremo a otro

Ejecuta `ng e2e` para ejecutar las pruebas de un extremo a otro a través de una plataforma de su elección. Para utilizar este comando, primero debe agregar un paquete que implemente capacidades de prueba de un extremo a otro.

## Mas ayuda

Para obtener más ayuda sobre el uso de Angular CLI `ng help` o ve a ver la pagina [Angular CLI Overview and Command Reference](https://angular.io/cli)

## Ejecutar con Docker

1. Genera la imagen
```shell
$ docker build -t name-image:tag .
```
Se expone por defecto el puerto `80`

2. Ejecuta el contenedor
```shell
$ docker run -d -p 4200:80 --name name-container name-image:tag
```