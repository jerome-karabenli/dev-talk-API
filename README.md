# Dev-Talk


This is a personnal project made in collaboration with [Benjamin CHORON](https://github.com/BenjaminChoron) for sharing knowlege in general about tech with members of my class. 

The idea is to be able to register, participate in the dev-talk via a discord server and listen the previous ones.. if you have any suggestions about the project feel free to let me know

Benjamin is in charge of frontend and I'm in charge of backend

## What does this application do

For now :

1. users can register if they member of promotion
2. users can manage their profil : change basic informations, add a profil picture, add new subject and manage it. 
3. any user can add a comment or a link related to a past or future topic

Next steps : 
- <del>add login</del> => done 
- <del>add session</del> => done 
- <del>make new frontend</del> => done 
- add dark-mode
- add RTC using redis and web sockets

## Tech used 

### Back
<p float="left">
<img src="https://raw.githubusercontent.com/devicons/devicon/7a4ca8aa871d6dca81691e018d31eed89cb70a76/icons/nodejs/nodejs-original-wordmark.svg" alt="drawing" width=50/>
<img src="https://raw.githubusercontent.com/devicons/devicon/7a4ca8aa871d6dca81691e018d31eed89cb70a76/icons/mongodb/mongodb-original-wordmark.svg" alt="drawing" width=50/>
<img src="https://raw.githubusercontent.com/devicons/devicon/7a4ca8aa871d6dca81691e018d31eed89cb70a76/icons/express/express-original-wordmark.svg" alt="drawing" width=50/>
<img src="https://raw.githubusercontent.com/devicons/devicon/9f4f5cdb393299a81125eb5127929ea7bfe42889/icons/redis/redis-original-wordmark.svg" alt="drawing" width=50/>
<img src="https://raw.githubusercontent.com/devicons/devicon/9f4f5cdb393299a81125eb5127929ea7bfe42889/icons/docker/docker-original-wordmark.svg" alt="drawing" width=50/>
</p>

### Front
<p float="left">
<img src="https://raw.githubusercontent.com/devicons/devicon/7a4ca8aa871d6dca81691e018d31eed89cb70a76/icons/html5/html5-original-wordmark.svg" alt="drawing" width=50/>
<img src="https://raw.githubusercontent.com/devicons/devicon/7a4ca8aa871d6dca81691e018d31eed89cb70a76/icons/css3/css3-original-wordmark.svg" alt="drawing" width=50/>
<img src="https://raw.githubusercontent.com/devicons/devicon/7a4ca8aa871d6dca81691e018d31eed89cb70a76/icons/sass/sass-original.svg" alt="drawing" width=50/>
<img src="https://raw.githubusercontent.com/devicons/devicon/7a4ca8aa871d6dca81691e018d31eed89cb70a76/icons/javascript/javascript-original.svg" alt="drawing" width=50/>
</p>

## How to use this app

### prerequisite

1. have installed [Node JS](https://nodejs.org/en/)
2. have a mongodb or other database but this project is based on mongo. 
3. personnaly I use the dockerized mongodb it's more simple.  [Docker](https://www.docker.com/)  &&   [Docker image of Mongodb](https://hub.docker.com/_/mongo)


### Installation exemple
Assuming you are working on linux, adapt these commands for your os. 

#### Database
1. `git clone https://github.com/jerome-karabenli/dev-talk.git`
2. `cd dev-talk/data/initial-data`
3. make your own template in `db-init.js` , don't forget to rename the file
4. `docker-compose up -d`

#### Node app
1. go to the root of `dev-talk` folder
2. `npm i`
3. `npm start`
