FROM node:16.4.0

WORKDIR /freezer_microservice

COPY package*.json ./

RUN npm install

RUN npm ci --omit=dev

COPY . .

EXPOSE 8081

CMD [ "npm","start" ]