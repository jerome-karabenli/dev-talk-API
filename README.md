# Dev-Talk


This is a personnal API project made for sharing knowlege in general about tech with members of my class. 

The idea is to be able to register and submit new subjects in dev-talk API and share knowledges via a discord server.

 If you have any suggestions about the project feel free to let me know


## Used tech 


<p float="left">
<img src="https://raw.githubusercontent.com/devicons/devicon/7a4ca8aa871d6dca81691e018d31eed89cb70a76/icons/nodejs/nodejs-original-wordmark.svg" alt="drawing" width=50/>
<img src="https://raw.githubusercontent.com/devicons/devicon/7a4ca8aa871d6dca81691e018d31eed89cb70a76/icons/mongodb/mongodb-original-wordmark.svg" alt="drawing" width=50/>
<img src="https://raw.githubusercontent.com/devicons/devicon/7a4ca8aa871d6dca81691e018d31eed89cb70a76/icons/express/express-original-wordmark.svg" alt="drawing" width=50/>
<!-- <img src="https://raw.githubusercontent.com/devicons/devicon/9f4f5cdb393299a81125eb5127929ea7bfe42889/icons/redis/redis-original-wordmark.svg" alt="drawing" width=50/>-->
<img src="https://raw.githubusercontent.com/devicons/devicon/9f4f5cdb393299a81125eb5127929ea7bfe42889/icons/docker/docker-original-wordmark.svg" alt="drawing" width=50/>
</p>

 

## How to use this app

### prerequisite

1. have installed [Node JS](https://nodejs.org/en/)
2. have a mongodb or other database but this project is based on mongo OR have [Docker](https://docs.docker.com/get-docker/) installed on your machine
3. personnaly I use the dockerized mongodb it's more simple. [Docker image of Mongodb](https://hub.docker.com/_/mongo)


### Installation exemple
Assuming you are working on linux, adapt these commands for your os. 

### ALL API FEATURES ARE READY TO USE OR CUSTOMIZABLE
1. `git clone https://github.com/jerome-karabenli/dev-talk-REST.git`
2. `cd dev-talk-REST/.docker`
3. `COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose build --no-cache`
4. `docker-compose up -d`


### JUST RUN THE NODE APP
1. `cd dev-talk-REST`
2. `npm start` for production
3. `npm run dev` for developpement


## ENV VARIABLES

be careful, if you run the node app without docker env variables are in file `./.env` otherwise if you use dockerized app env variables are in `./docker/docker-compose.yml`

- `DB_URI_DEV=mongodb://username:password@url:37017/devtalk`
- `DB_URI_PROD=mongodb://username:password@url:27017/devtalk`
- `ACCES_TOKEN_SECRET=yoursecret`
- `API_DOCS_SERVER=https://url:3001/devtalk/api/v1`
- `NODE_ENV=developpement || production`
- `HTTPS=disabled || enabled`
