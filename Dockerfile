# Image from node with yarn include
FROM node:7.10 as build-deps
 
# Establecer el directorio de trabajo
WORKDIR /app 
ENV NODE_ENV production

# Copiamos el codigo
COPY . ./ 

# Instalamos las dependencias
RUN yarn install  
RUN yarn build  

# Image from nginx
FROM nginx:1.12-alpine
COPY build /usr/share/nginx/html 
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]