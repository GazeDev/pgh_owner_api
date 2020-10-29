FROM node:12.16.1

WORKDIR /usr/src/api

# For npm@5 or later, copy package-lock.json as well
COPY ./package.json ./package-lock.json ./

RUN npm install

RUN npm install -g sequelize

COPY . .

EXPOSE 8081
