FROM node:alpine

WORKDIR /frontend

COPY package*.json ./

RUN npm install -g npm@8.7.0

RUN npm install

COPY . .

CMD ["npm","run","dev"]