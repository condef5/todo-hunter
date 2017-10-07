# Image from node  
FROM node:7
 
# Global install yarn package manager
RUN apt-get update && apt-get install -y curl apt-transport-https && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y yarn  
# Install Nginx

RUN apt-get install -y nginx
RUN mkdir /etc/nginx/logs && touch /etc/nginx/logs/static.log
 
# Establecer el directorio de trabajo 
WORKDIR /opt/app
ENV NODE_ENV production

# Copiamos el codigo en la carpeta app
COPY . . 

# Instalamos las dependencias
RUN yarn install  
RUN yarn build  
RUN cp -r build/. /usr/share/nginx/html
   
ADD ./nginx.conf /etc/nginx/sites-available/default
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]