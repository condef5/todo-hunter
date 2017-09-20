# Docker

1. Crear la imagen a partir del Dockerfile : `docker build -t condef5/todo-hunter . `
2. Correr un container : `docker run -d -p'80:80 --name hunter condef5/todo-hunter`
3. Subir imagen a docker-hub: `docker push condef5/todo-hunter`
4. Desplegar desde un servidor : `docker run -p 80:80 -d --name hunter-static condef5/todo-hunter`