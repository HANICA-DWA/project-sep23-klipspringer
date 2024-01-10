# Operatie en support

### Configuratie

De applicatie gebruikt environment variabelen voor zowel de frontend als de backend. Na aanpassing van deze variabelen is een restart vereist.

_Backend_

```
GOOGLE_CLIENT_ID=
LINKEDIN_APP_SECRET=
LINKEDIN_APP_ID=
MONGO_HOST=
```

De backend kan gerund worden met `node app` of, voor development, `nodemon app`, als nodemon geïnstalleerd is.

_Frontend_

```
NODE_ENV=development
VITE_BACKEND_HOST=http://localhost:3001
VITE_GG_APP_ID=
VITE_LINKEDIN_APP_SECRET=
VITE_LINKEDIN_APP_ID=`
```

De frontend kan gerund worden in development met `npm run dev`. Dit runt via Vite. Een productieklare versie kan gemaakt worden door `npm run build`. Verschillende configuratieinstellingen voor Vite kunnen aangepast worden via `vite.config.js`.

### Diagnostiek

Er worden geen logs bijgehouden van errors of andere informatie. Tijdens het runnen van de applicatie via de terminal, zijn foutmeldingen in deze terminal te zien.

### Monitoring

Naast het runnen van de applicatie via de terminal, is er geen expliciete plek waar de applicatie gemonitord kan worden. Er zijn geen handmatige taken die periodiek uitgevoerd moeten worden, ook hoeft de data uit de database niet periodiek gearchiveerd te worden.