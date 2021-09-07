FROM node:lts-alpine as base
RUN apk add mongodb-tools


WORKDIR /src
COPY ../package*.json /

RUN npm install -g nodemon
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]
# on production replace CMD by : CMD ["npm", "start"]
