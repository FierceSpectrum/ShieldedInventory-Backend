# Usa una imagen oficial de Node.js
FROM node:18

# Crea un directorio para la app
WORKDIR /usr/src/app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto de los archivos
COPY . .

# Expone el puerto de la app
EXPOSE 3003

# Comando para correr la app
CMD ["node", "src/app.js"]
