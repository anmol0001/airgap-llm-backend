# FROM node:20-alpine

# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .

# EXPOSE 8443

# #CMD ["node", "index.js"]
# CMD ["npm", "run", "dev"]

###########################################

# FOR PRODUCTION
FROM node:20-alpine

WORKDIR /app

COPY package.json ./
RUN npm install --only=production

COPY . .

EXPOSE 8443

CMD ["node", "index.js"]
