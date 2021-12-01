FROM node:lts-alpine3.14
COPY node_app/package.json .
RUN yarn
CMD ["npm", "start"]
COPY . .
WORKDIR /node_app


