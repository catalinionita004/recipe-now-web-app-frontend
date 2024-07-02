# Folosește o imagine Node.js mai recentă
FROM node:14-alpine

# Setează directorul de lucru în container
WORKDIR /app

# Adaugă /app/node_modules/.bin la PATH
ENV PATH /app/node_modules/.bin:$PATH

# Copiază fișierele de configurare pentru npm
COPY package.json ./
COPY package-lock.json ./

# Rulează npm install cu detalii adiționale pentru diagnosticare
RUN npm install --verbose

# Copiază toate fișierele aplicației în container
COPY . ./

# Construiește aplicația (dacă este necesar)
RUN npm run build

# Expune portul 3000 pentru a rula aplicația (ajustează în funcție de portul pe care rulează aplicația ta)
EXPOSE 3000

# Comanda pentru a rula aplicația
CMD ["npm", "start"]
