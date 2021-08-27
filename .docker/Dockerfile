FROM node:lts-alpine as base

WORKDIR /src
COPY ../package*.json /src


FROM base as production
ENV NODE_ENV=production
RUN npm install
COPY . .
CMD ["npm", "start"]

FROM base as dev
ENV NODE_ENV=development
RUN npm install -g nodemon
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]