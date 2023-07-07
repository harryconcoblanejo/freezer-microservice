FROM node:16.4.0

WORKDIR /freezer_microservice

COPY packge*.json ./

RUN npm install

COPY . .

CMD [ "npm","start" ]