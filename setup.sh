#!/bin/bash
# Funciones auxiliares para colorear la salida
red=$(tput setaf 1)
green=$(tput setaf 2)
magenta=$(tput setaf 5)
reset=$(tput sgr0)
bold=$(tput bold)
configure_apache_ports() {
  echo "Cambiando la configuración de Apache para liberar los puertos 80 y 8080..."
  sudo sed -i 's/Listen 80/Listen 8081/g' /etc/apache2/ports.conf
  sudo sed -i 's/Listen 8080/Listen 8082/g' /etc/apache2/ports.conf
  echo "Reiniciando el servicio Apache..."
  sudo systemctl restart apache2
  echo "Servicio Apache reiniciado. Los puertos 80 y 8080 están ahora libres."
}

# Función para mostrar una barra de progreso
# Uso: progress_bar [porcentaje] [mensaje]
progress_bar() {
    local percent=$1
    local message=$2
    local n=$((percent / 2))

    echo -ne "${green}${bold}Progress: ["
    for i in $(seq 1 $n); do echo -ne "#"; done
    for i in $(seq 1 $((50 - n))); do echo -ne " "; done
    echo -ne "] ${percent}% - ${message}${reset}\r"
}

# Log inicial en magenta y más grande que el resto
echo "${magenta}${bold}Instalando MEDICINA MODERNA WEB APP EN EL SERVIDOR...${reset}"

# Instalar NVM si no está instalado
progress_bar 10 "Instalando NVM..."
if ! command -v nvm &> /dev/null; then
  echo "NVM no está instalado. Instalando NVM..."
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
fi
progress_bar 20 "NVM instalado."

# Seleccionar una versión de Node superior a 14.2
echo "Seleccionando una versión de Node superior a 14.2..."
nvm install 14.2
nvm use 14

progress_bar 30 "Instalando Yarn..."
# Comprobar si Yarn está instalado, de lo contrario, instalarlo
if ! command -v yarn &> /dev/null; then
  echo "Yarn no está instalado. Instalando Yarn..."
  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
  sudo apt-get update
  sudo apt-get install -y yarn
fi
progress_bar 40 "Yarn instalado."

# Crear carpetas front-end, back-end y server si no existen
mkdir -p front-end back-end server

progress_bar 50 "Clonando repositorio front-end..."

# Clonar repositorios y instalar dependencias
echo "Clonando repositorio front-end..."
git clone https://github.com/MKS2508/medmoderna-front.git front-end
cd front-end
echo "Instalando dependencias del front-end..."
yarn install

progress_bar 60 "Dependencias del front-end instaladas."

# Crear archivo Dockerfile para el front-end
echo "Creando archivo Dockerfile para el front-end..."
cd front-end
cat <<EOT >> Dockerfile
FROM node:14 as builder

WORKDIR /medmoderna-front

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN vite build

FROM nginx:stable-alpine

COPY --from=builder /medmoderna-front/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 8080
CMD ["nginx", "-g", "daemon off;"]
EOT
echo "Agregando archivo de configuración de nginx..."
cat <<EOT >> nginx.conf
server {
    listen 80;
    server_name localhost;

    location / {
        root /usr/share/nginx/html;
        try_files \$uri \$uri/ /index.html;
    }
}
server {
    listen 8080;
    server_name localhost;

    location / {
        root /usr/share/nginx/html;
        try_files \$uri \$uri/ /index.html;
    }
}
EOT
progress_bar 70 "Archivo Dockerfile creado para el front-end."

# Construir la imagen de Docker para el front-end
echo "Construyendo imagen de Docker para el front-end..."
docker build -t medmoderna-front .
progress_bar 80 "Imagen de Docker construida para el front-end."

cd ..

# Clonar repositorio back-end y instalar dependencias
echo "Clonando repositorio back-end..."
git clone https://github.com/MKS2508/medmoderna-api.git back-end
cd back-end
progress_bar 90 "Repositorio back-end clonado."

echo "Instalando dependencias del back-end..."
yarn install
progress_bar 95 "Dependencias del back-end instaladas."

# Crear archivo Dockerfile para el back-end
echo "Creando archivo Dockerfile para el back-end..."
cat <<EOT >> Dockerfile
FROM node:14

WORKDIR /

COPY package.json ./

RUN npm -g install pm2
RUN npm install

COPY . .

EXPOSE 3000

CMD ["pm2-runtime", "server.js"]
EOT
progress_bar 98 "Archivo Dockerfile creado para el back-end."




cd ..

# Crear archivo Dockerfile para MongoDB en la carpeta server
echo "Creando archivo Dockerfile para MongoDB..."
cat <<EOT >> server/Dockerfile
FROM mongo:4.4

ENV MONGO_INITDB_ROOT_USERNAME=medmoderna
ENV MONGO_INITDB_ROOT_PASSWORD=kiar4

EXPOSE 27017
EOT
progress_bar 99 "Archivo Dockerfile creado para MongoDB."

# Crear archivo .dockerignore en la carpeta server
echo "Creando archivo .dockerignore en la carpeta server..."
echo "Dockerfile" > server/.dockerignore
progress_bar 99 "Archivo .dockerignore creado en la carpeta server."

# Construir la imagen de Docker para MongoDB
echo "Construyendo imagen de Docker para MongoDB..."
cd server
docker build -t medmoderna-mongo .
progress_bar 99 "Imagen de Docker construida para MongoDB."
cd ..

# Construir la imagen de Docker para el back-end
echo "Construyendo imagen de Docker para el back-end..."
cd back-end
docker build -t medmoderna-back .
progress_bar 99 "Imagen de Docker construida para el back-end."
cd ..

# Crear una red Docker
echo "Creando una red Docker..."
docker network create medmoderna-network

# Crear y levantar contenedores
echo "Creando y levantando contenedores..."
docker run -d --name medmoderna-front --network medmoderna-network -p 3000:3000 medmoderna-front
docker run -d --name medmoderna-back --network medmoderna-network -p 5000:5000 medmoderna-back
docker run -d --name medmoderna-mongo --network medmoderna-network -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=medmoderna -e MONGO_INITDB_ROOT_PASSWORD=kiar4


echo "Los contenedores de medmoderna-front, medmoderna-back y medmoderna-mongo se han creado y están en ejecución."
configure_apache_ports