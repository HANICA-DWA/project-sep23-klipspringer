# BK Server

Dit is de back-end van de BKS web applicatie. Dit is een NodeJS applicatie die RESTful endpoints beschikbaar stelt via Express.

## Hoe BKS Back-end te runnen?

Zorg dat eerste de Mongo database draait, andere krijg je errors bij het runnen.

Je kunt de back-end van BKS starten met:

```console
npm run
```

Via instelling in de `package.json` voert dit het commando `node app`, waarmee de Express endpoints die in app.js staan activeert.

## Hoe te testen?

Testen vereist node versie 21+

```console
npm test
```

### Database starten

Voordat de backend werkt moet je eerst een mongoDB server runnen. 

In de ontwikkelomgeving dient deze op de standaard poort `27017` te runnen.
Zie de installatie handleiding op [mongodb](https://www.mongodb.com/docs/manual/installation/)

Je kunt de mongo database ook runnen in Docker als je bv. [Docker Desktop](https://www.docker.com/products/docker-desktop/) hebt geinstalleerd. Er staat een docker compose config in de root van de server code: `docker-compose.yml`. Je start zo de database met:

```console
docker compose up
```

(NB De compose bevat ook de `node-express webapp` op `http://localhost:8090` voor kijken in je db zonder Mongo Desktop client programma)

