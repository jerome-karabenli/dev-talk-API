# # Dev-Talk API

<div id="top"></div>


<!-- ABOUT THE PROJECT -->
## A propos
Il s'agit d'un projet de conception d'API personnel pour partager des connaissances sur le dev avec les membres de ma classe.

L'idée est de pouvoir enregistrer et soumettre de nouveaux sujets dans l'API dev-talk et échanger sur les sujets a travers un serveur vocal Discord.

## Stack utilisée

|[NodeJS](https://www.docker.com/)|[Redis](https://www.docker.com/)|     [MongoDB](https://www.docker.com/)|[Docker](https://www.docker.com/)|
|-|-|-|-|

## Prérequis
* [Docker et docker-compose](https://docs.docker.com/engine/install/)
* [NodeJS pour tester et modifier (optionnel)](https://docs.docker.com/engine/install/)


<!-- ROADMAP -->
## Roadmap
### Deploiement
- [x] Configurer le fichier docker-compose.
- [x] Configuer le fichier Dockerfile pour build
- [x] Configurer le fichier `.dockerignore` pour optimiser les perfs de build


### API
- [x] Utiliser les JWT pour l'authentification.
- [x] Envoi d'un email pour reset le mot de passe.
- [x] Utiliser `Joi` pour faire de la validation de data.
- [x] Créer une fonction permettant de mettre en cache dynamiquement.
- [x] Générer une doc avec Swagger.

Voir les [issues en cours](https://github.com/jerome-karabenli/dev-talk-API/issues) pour voir la liste complete des fonctionalités proposées et les bugs existants.


<!-- HOW TO -->
## Comment ca marche
### [__Doc de l'API__](https://demo-devtalk.jkarabenli.dev/api-docs)

1. Clonez ce repo
```bash
$ git clone https://github.com/jerome-karabenli/dev-talk-API.git && cd dev-talk-API 
``` 
2. Lancer la commande suivante
```bash
$ docker-compose up -d
```
3. La documentation de l'API se trouve sur la route __/api-docs__

### Tester l'API
1. Utilisez cette commande pour ne monter que les base de données. 
```bash
$ docker-compose up -d redis mongodb
```
2. Rendez vous dans le dossier `node_app` et taper 
```bash
$ npm start
# ou
$ yarn start
```

### Les variables d'environnement dans le dossier `node_app`
- `MONGODB_URI=mongodb://demo:demo@localhost:27017/devtalk`
- `ACCES_TOKEN_SECRET=demo`
- `NODE_ENV=developpement`
- `DOMAIN_NAME=demo-devtalk.jkarabenli.dev`
- `API_URL_PREFIX=/api/v1`
- `PORT=3000`
- `REDIS_URI=redis://localhost:6379`
- `API_DOCS_SERVER=https://demo-devtalk.jkarabenli.dev`

<!-- CONTRIBUTING -->
## Contribuer

Les contributions sont ce qui fait de la communauté open source un endroit incroyable pour apprendre, s'inspirer et créer. Toutes les contributions que vous apportez serront __grandement appréciées__.

Si vous avez une suggestion qui améliorerait le projet, vous pouvez `fork` le repo et créer une `pull request`. Vous pouvez aussi simplement ouvrir une `issue` avec le tag "enhancement".
N'oubliez pas de mettre une étoile au projet ! Merci encore!


1. Fork le projet
2. Créez votre branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push sur votre branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une __Pull Request__


<!-- CONTACT -->
## Liens

Lien de mon blog: [jkarabenli.dev](https://jkarabenli.dev/posts)

Lien du projet: [Github](https://github.com/jerome-karabenli/dev-talk-API)
