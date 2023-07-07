FROM node:18

WORKDIR /freezer_microservice

COPY package*.json ./

RUN npm install

RUN npm ci --omit=dev

EXPOSE 5000

COPY . .

CMD [ "npm","start" ]