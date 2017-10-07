# Image from node  
FROM node:7
 
# Global install yarn package manager
RUN apt-get update && apt-get install -y curl apt-transport-https && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y yarn
 
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