# Opleverdocumentatie

- [Opleverdocumentatie](#opleverdocumentatie)
- [Inleiding](#inleiding)
- [Installatie en Implementatie](#installatie-en-implementatie)
  - [Overdragen bestanden](#overdragen-bestanden)
    - [Client](#client)
    - [Server](#server)
    - [Documentatie](#documentatie)
    - [Test](#test)
    - [Installatie](#installatie)
- [Extra realisatie](#extra-realisatie)
  - [Features](#features)
  - [Designs](#designs)

# Inleiding

In dit opleverdocument staat beschreven hoe de webapplicatie BKS na de oplevering gebruikt kan worden door de opdrachtgever. In het hoofdstuk ‘Installatie en implementatie’ wordt onder andere beschreven hoe de overdracht van de applicatie zal plaats vinden, hoe de site geïnstalleerd kan worden voor gebruik en wat er nog gerealiseerd zou kunnen worden voor een live-gang van BKS. 

# Installatie en Implementatie

In dit hoofdstuk wordt beschreven hoe de gerealiseerde webapplicatie BKS overgedragen kan worden aan en in gebruik genomen kan worden door de opdrachtgever.

## Overdragen bestanden

Alle bestanden die gebruikt zijn voor de realisering van de webapplicatie worden overgedragen in een .zip bestand. In dit bestand is een aantal mappen te vinden.

### Client 

In de map "public" is een aantal afbeeldingen te vinden die in de app worden gebruikt. 
In de map "src" staat de daadwerkelijke broncode van de frontend webapplicatie. Deze is opgedeeld in een aantal mapjes, behorende bij het type bestand. React Hooks staan in de "hooks" map, componenten in "components" enz.

### Server

In de map "server" zijn de bestanden voor de backend server te vinden. Ook hier zijn tests te vinden.
In de map "model" zijn de verschillende mongoose-models te vinden. Hierin zijn de verschillende datastructuren voor de applicatie te vinden, inclusief validatie en functies op de schema's. 
De verschillende express routes die vanuit "app.js" worden gebruikt, zijn te vinden in de map "routes". 
Een aantal functies die hergebruikt worden, zijn te vinden in de "functions" map.

### Documentatie

Documentatie over de webapplicatie is  te vinden in de map "groepsdocumenten". Hierin staat het Software Guidebook, waarin uitgebreid staat beschreven hoe de architectuur van de applicatie is vormgegeven, welke functionaliteiten er zijn en aan welke eisen dit moet voldoen.
Ook is hier het projectplan te vinden, waarin staat beschreven hoe het project is aangepakt.



### Test

In de map "\_\_tests\_\_" van de backend server zijn de unit-testen te vinden.
Om de tests uit te voeren is Node.js versie 21.0.0 of hoger nodig.

Deze worden uitgevoerd door "npm test" in de terminal van de backend server.

> npm test

Dit zal een coverage rapport teruggeven van alle uitgevoerde tests.

In de map "\_\_tests\_\_" van de frontend server zijn de integratie-testen te vinden. Deze zijn opgedeeld in de map "components" en de map "pages".
Ook zijn de verschillende mocks die worden gebruikt tijdens de integratie-testen te vinden in de map "\_\_mocks\_\_".

Er worden mocks gemaakt van fetches omdat dit niet mogelijk is om te testen.

Deze worden uitgevoerd door "npm test" in de terminal van de frontend server.

> npm test

Dit zal een coverage rapport teruggeven van alle uitgevoerde tests.


### Installatie

Om alles te laten draaien zijn er een paar programmas die geinstalleerd moeten worden.

> [MongoDB Community Edition](https://www.mongodb.com/try/download/community)
of
> [Docker Desktop](https://www.docker.com/products/docker-desktop/)

> [Node v21+ + npm v10+](https://nodejs.org/en)

Om de development server aan te zetten zijn de volgende stappen nodig:

1. Zet MongoDB aan als service met `mongod --service` of zet de docker container aan met `docker compose up`.

2. Kopier de inhoud van .env.example naar .env

3. Maak een google en linkedin account aan en vraag om OAuth2 tokens, vul deze in bij de lege velden in het .env bestand

4. Vul bij `MONGO_HOST`, de waarde `mongodb://127.0.0.1:27017`

5. Voer de volgende terminal commands uit:
> npm i
> node app.js

Om de development client aan te zetten zijn de volgende stappen nodig:

1. Kopier de inhoud van .env.example naar .env

2. Vul bij `NODE_ENV` de waarde `development` en bij `VITE_BACKEND_HOST` de waarde `http://localhost:3001` in.

3. Vul de google en linkedin waardes in die je hebt gekregen bij het aanmaken van google en linkedin OAuth van de server.

4. Voer de volgende terminal commands uit:
> npm i
> npm run dev


# Extra realisatie
In dit hoofdstuk wordt beschreven wat voor extra features/elementen er nog gerealiseerd kunnen worden voor een live-gang van BKS.

## Features
- Het uitwerken van een Open Graph kaart wanneer een gebruiker zijn link wilt delen.
- De gebruikersinteractie van het bewerken en verwijderen van een plank veranderen (af te stemmen met UX designer (Rik Schot)).
- Het toevoegen van affiliate links bij de "buy" knop op de detailpagina van een boek.

## Designs
Er zijn nog een aantal kleine aanpassingen mogelijk aan het design die de UX designer graag zou willen zien in de applicatie. Deze kunnen afgestemd/besproken worden met de UX designer, zodat de aanpassingen worden gemaakt naar verwachting.   


