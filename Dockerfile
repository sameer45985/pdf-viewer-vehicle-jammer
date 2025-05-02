FROM node:18

WORKDIR /ewrwerwerwer

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "app.js" ]
