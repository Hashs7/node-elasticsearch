#Node Elastic Search

## Installation
Installation des dépendances
```sh
npm i
```
Renommer le fichier .env.example par .env

## Déployement
Installer [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

Il faut ensuite s'authentifier avec le CLI
```sh
heroku login
```

Initialiser le remote du repository heroku
```sh
cd nodElastic/
git init
heroku git:remote -a node-elastic
```

Pour déployer l'application
```sh
git add .
git commit -am "Commit message"
git push heroku master
```


L'API est disponible à l'adresse: https://node-elastic.herokuapp.com/

Démarrer ou arrêter le serveur ElasticSearch
```sh
sudo -i service elasticsearch start
sudo -i service elasticsearch stop
```
