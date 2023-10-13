FROM node:18-alpine3.18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm test

EXPOSE 3000

CMD ["npm", "run", "dev"]
