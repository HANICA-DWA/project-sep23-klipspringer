# Software Guidebook

- [Software Guidebook](#software-guidebook)
- [Context](#context)
    - [Domain Terms](#domain-terms)
- [Functional Overview](#functional-overview)
    - [Link met meer informatie](#link-met-meer-informatie)
- [Quality Attributes](#quality-attributes)
    - [Responsiveness en Portability](#responsiveness-en-portability)
    - [Performance](#performance)
    - [Security](#security)
    - [Stability](#stability)
    - [Robustness](#robustness)
    - [Accessibility](#accessibility)
    - [Language Localisation (L10n)](#language-localisation-l10n)
- [Constraints](#constraints)
    - [Tijd](#tijd)
    - [Toegestane technologieën](#toegestane-technologieën)
    - [Bestaande systemen](#bestaande-systemen)
    - [Implementatieplatform](#implementatieplatform)
    - [Publieke standaarden](#publieke-standaarden)
    - [Kennis van het software-development team](#kennis-van-het-software-development-team)
- [Principles](#principles)
- [Software Architecture](#software-architecture)
    - [Container diagram](#container-diagram)
    - [Component MongoDB Diagram](#component-mongodb-diagram)
    - [Component REST API Diagram](#component-rest-api-diagram)
    - [Component React/Vite Diagram](#component-reactvite-diagram)
    - [Component Websocketserver Diagram](#component-websocketserver-diagram)
- [External Interfaces](#external-interfaces)
- [Code](#code)
    - [Architectural layering](#architectural-layering)
    - [JWT Verificatie](#jwt-verificatie)
- [Data](#data)
    - [User schema](#user-schema)
    - [Book schema](#book-schema)
- [Infrastructure Architecture](#infrastructure-architecture)
- [Deployment](#deployment)
- [Operatie en support](#operatie-en-support)
    - [Configuratie](#configuratie)
    - [Diagnostiek](#diagnostiek)
    - [Monitoring](#monitoring)
- [Decision Log](#decision-log)


# Context

![Context Diagram](C4-models/C4-model%20context.png)

BKS wordt een mobile-first webapplicatie van een persoonlijke boekenpagina. Met deze applicatie kun een gebruiker zijn leesvoorkeuren delen, zoals favoriete boeken, top 3 boeken, diverse collecties en je kunt zelfs een aangepaste collectie maken.

Deze software wordt gebruikt door 2 verschillende soorten gebruikers, anonieme gebruikers en geauthenticeerde gebruikers. De anononieme gebruiker kan profielen van anderen en boeken bekijken. Ook kan een anonieme gebruiker inloggen om een geauthenticeerde gebruiker te worden.
Een geauthenticeerde gebruiker kan zijn eigen profielpagina bewerken, boekenplanken toevoegen, bewerken en verwijderen. Hij heeft ook inzicht in zijn boekenkast en kan hier ook aanpassingen aan doen.

De software van BKS gebruikt 3 externe systemen, die van Google en LinkedIn voor het authenticeren van gebruikers. En het systeem van OpenLibrary om informatie van boeken op te halen.

### Domain Terms

| **Term (NL)**  | **Term (EN)** | **Betekenis**                                                           | **Synoniemen**       |
| -------------- | ------------- | ----------------------------------------------------------------------- | -------------------- |
| Boekenplank    | Shelf         | Een verzameling van boeken, samengesteld door de gebruiker              | Collectie, categorie |
| Boekenkast     | Bookcase      | Een overzicht van alle boeken die een gebruiker in zijn account heeft   |                      |
| ISBN           | ISBN          | Uniek id nummer van een boek                                            |                      |
| Auteur         | Author        | Persoon die een boek heeft geschreven                                   |                      |
| Titel          | Title         | De naam van een boek                                                    | Naam                 |
| Favorieten     | Favorites     | Een speciale collectie met de favoriete boeken van een gebruiker        | Voorkeuren           |
| Suggestie      | Suggestions   | Suggesties voor boeken op basis van de opgeslagen boeken in een account | Aanbeveling, advies  |
| Delen          | Share         | Het kopiëren van een link naar een profielpagina                        |                      |
| Gebruikersnaam | Handle        | De naam van een gebruiker in de app                                     |                      |

# Functional Overview

Gebruikers kunnen een account aanmaken via LinkdIn of Google. Zodra een gebruiker een account heeft, komt hij uit op zijn eigen profielpagina.
Hier staat al een "top 3" plank voor de gebruiker klaar. Ook kan de gebruiker zelf een plank aanmaken. Op deze planken kunnen boeken toegevoegd worden. De gebruiker kan hierbij boeken zoeken en deze vervolgens toevoegen aan de plank. Zijn profiel en de gemaakte planken zijn openbaar, waardoor de gebruiker zijn profiel kan delen met anderen. De gebruiker kan per boek een informatiepagina openen. Via deze pagina kan het boek ook gekocht worden via een webshop.

Het kopen van boeken moet via een affiliate link gaan van bijvoorbeeld bol.com of amazon.com.

### Link met meer informatie

[Link naar userstory's van projectplan](../Projectplan/Product%20Backlog.md)

[Link naar userstory's op projectbord (dit is geüpdatet tijdens het project)](https://github.com/orgs/HANICA-DWA/projects/19/views/1?filterQuery=type%3A%22User+Story%22)

[Link naar wireframe's](https://www.sketch.com/s/a50a2622-b344-4f1d-afd9-7f2bf52a80a1)

# Quality Attributes

### Responsiveness en Portability
- De applicatie wordt mobile first gebouwd maar moet responsive zijn voor mobile en desktop. Hierdoor is de applicatie op een breed scala apparaten te gebruiken.

### Performance
- API requests naar de backend server duren niet langer dan 500ms.
- Applicatie moet snel zijn. Pagina's moeten laden binnen 2 seconden.

### Security
- Inloggen, ofwel authenthicatie, wordt veilig gedaan via Google en LinkedIn SSO zodat we geen wachtwoorden hoeven op te slaan.

### Stability
- Testcoverage is minimaal 90%.
- Voor de boeken wordt de externe (gratis) API gebruikt van OpenLibrary.

### Robustness
- De applicatie is bestand tegen het optreden van fouten, inclusief verkeerde user input.
- De applicatie is geschikt om in de toekomst te veranderen van externe API voor de boekinformatie.

### Accessibility
- Frontend wordt volgens de designs van Rik gemaakt, een UX expert.
- Gebruikte kleuren worden getest op voldoende contrast.
- HTML volgt accessability guidelines.

### Language Localisation (L10n)
- De applicatie wordt gelokaliseerd voor de Engelse taal.

# Constraints

In dit hoofdstuk worden de beperkingen aan dit project toegelicht.

### Tijd

De tijd om deze software te ontwikkelen is beperkt tot 8 weken. Dit heeft als invloed op de architectuur dat er veelal technologieën worden gebruikt die al bekend zijn bij het team: React, Node.js, Express, MongoDB.

### Toegestane technologieën

Vanuit school wordt er een aantal beperkingen opgelegd met betrekking tot de technologieën die gebruikt mogen worden.

- Een React framework voor de frontend
- Node.js voor de backend
- NoSQL als database

### Bestaande systemen

Het gebruik van externe authenticatieproviders (Google en LinkedIn), verplicht het gebruik van JSON Web Tokens voor verificatie en authenticatie.

### Implementatieplatform

De app moet toegankelijk zijn via het internet en moet dus ondersteuning hebben voor de bekendste webbrowsers (Google Chrome, Firefox, Safari, Microsoft Edge), ook voor oudere versies. Er wordt daarom ViteJS gebruikt voor de ondersteuning van oudere syntaxen.
Daarnaast moet de app goed toegankelijk zijn voor andere apparaten dan desktops, de applicatie wordt daarom mobile-first onwtikkeld.

### Publieke standaarden

De publieke standaarden HTTP, JSON en REST hebben invloed op de architectuur die gekozen wordt. Voor webcommunicatie moet HTTP worden gebruikt. Verder wordt er een API ontwikkeld volgens de REST-standaard in combinatie met het JSON format voor responses.

### Kennis van het software-development team

Kennis van het software-development team over React, Express.js en MongoDB, heeft invloed op de keuze om deze technologieën te gebruiken.

# Principles

- DRY (Don't Repeat Yourself):

  We maken voor dingen die we vaker gebruiken een component of functie, zodat deze herbruikbaar is.

- Prefer a Rich Domain Model:

  We gebruiken een mongoose schema met de logic en validatie van de data, zodat de data in MongoDB altijd goed opgeslagen wordt en consistent is.

- Buy Rather Than Build:

  In plaats van een eigen login bouwen gaan we Google en LinkedIn SSO gebruiken. Ook gebruiken we een externe API voor boekeninformatie.

- Don't Reinvent the Wheel:

  We gebruiken voornamelijk Material UI (MUI)-componenten en bouwen alleen eigen componenten als het echt nodig is. We gebruiken dus ook alleen de styling via MUI en geen eigen geschreven CSS.

- Responsive Design:

  We gebruiken MUI-responsive componenten om te zorgen dat op zowel desktop en mobiel de applicatie goed te gebruiken is.

- Material-UI Theming:

  We maken gebruik van MUI theming om zo de huisstijl in de applicatie makkelijk te kunnen weergeven en wijzigen indien nodig.

- Client-Side Routing:

  we gebruiken React Router voor client-side routing, dit zorgt voor een vloeiende en dynamische ervaring voor de gebruiker. Hierdoor zijn er geen volledige pagina herladingen.

# Software Architecture

### Container diagram

![Container](C4-models/C4-model%20container.png)

In dit container diagram is een overzicht te zien van de containers die in de architectuur te vinden zijn. Gebruikers maken via HTTP verbindinging met de React/Vite frontend via een browser. Deze frontend fetcht via HTTP naar de REST API om CRUD operaties uit te voeren. Ook krijgt de frontend data via het externe systeem van OpenLibrary via HTTP en wordt er verbinding gemaakt met de websocketserver voor realtime berichten. De REST API maakt verbinding met een aantal systemen. Data die in de MongoDB database opgeslagen is, kan via de API gelezen en geschreven worden. Verder maakt de API verbinding met de externe systemen van Google en LinkedIn via HTTP voor authenticatie van gebruikers. En met het systeem van OpenLibrary via HTTP voor het ophalen van boekendata.

### Component MongoDB Diagram

![Component MongoDB](C4-models/Component%20MongoDB.png)

De REST API communiceert met de MongoDB database via het Mongo protocol. Deze container bestaat uit een documentenopslag, waarin JSON objecten zijn opgeslagen.

### Component REST API Diagram

![Component REST API](C4-models/Component%20REST%20API.png)

De React/Vite container communiceert met het Express component in de REST API, dat wordt gerund met nodejs. Dit component gebruikt het mongoose component om verbinding te maken met de MongoDB database. Verder worden CRUD operaties met betrekking tot het profiel, een plank en boeken uitgevoerd door de desbetreffende componenten, waar het Express component gebruik van maakt. Het lezen van profielinformatie en de authenticatie gebeurt door middel van de Google en LinkedIn connectors die respectievelijk gebruik maken van de externe systemen van Google en LinkedIn. Het lezen van boekinformatie gebeurt via de books connector, dat gebruik maakt van het externe systeem van OpenLibrary.
Tot slot worden volgers en gevolgde accounts nog geüpdatet in het eigen component.

### Component React/Vite Diagram

![Component React/Vite](C4-models/Component%20React+Vite.png)

Op de frontend is een gebruiker die interacteert met de beschikbare pagina's. Er is een main script component die zorgt voor de setup van React, Redux en websockets. Dit component maakt gebruik van React Router voor de correcte rendering van pagina's bij een route. Het Router component maakt gebruik van alle beschikbare pagina's. Er zijn componenten voor het zoeken van profielen, de authenticatie, de boekendetailpagina, het zoeken van boeken, het zoeken van auteurs, de boekenkast van de gebruiker en voor de profielinformatie. 
Het authenticatiecomponent maakt gebruik van de externe systemen van LinkedIn en Google. De boekendetailpagina maakt gebruik van het systeem van Amazon via een Amazon connector, voor het linken naar de webshop en van OpenLibrary. Het zoeken van boeken en auteurs maakt ook gebruik van OpenLibrary en van het component voor het scannen van boeken. 
De profielinformatie fetcht data van en naar de REST API. Verder is dit component nog verder verdeeld in het delen van je profiel (waarbij een social card wordt gegenereerd), het weergeven van boekenplanken, het volgen van gebruikers en het weergeven van notificaties. Deze laatste twee gebruiken de websocket component om live berichten te sturen en te ontvangen van de websocketserver.

### Component Websocketserver Diagram

![Component Websocketserver](C4-models/C4-model%20component%20websocketserver.png)

De frontend "React + Vite" maakt gebruik van de websocket server. De "server setup" component zorgt ervoor dat er een websocketserver beschikbaar is waar clients mee kunnen verbinden. Er wordt hier een handler aan gekoppeld die inkomende berichten afhandelt. Dit component gebruikt een broadcast component die ervoor zorgt dat een uitgaand bericht wordt verstuurd naar de volgers van de client waarvan het bericht afkomstig is.

# External Interfaces

BKS maakt gebruik van drie verschillende externe interfaces, namelijk Openlibrary, Google-authenticatie en LinkedIn-authenticatie. Openlibrary wordt gehost door archive.org als een non-profit om een database te bieden voor alle ooit geschreven boeken. Het stelt zijn database beschikbaar via een API via http en geeft resultaten terug in JSON-formaat. We gebruiken Openlibrary om alle informatie over een specifiek boek op te halen, zoals titel, auteur, coverafbeelding, enz. We maken ook gebruik van de zoekfunctie om door alle bestaande boeken te zoeken. We 'cachen' ook boeken in onze eigen database om het gebruik van Openlibrary te beperken en de rate limit van 100 verzoeken in korte tijd niet te overschrijden.

Enkele voorbeelden van de requests die we gebruiken:

```js
fetch(apiUrl + "/isbn/" + req.params.id + ".json"); // Boek opvragen op basis van ISBN
const result = await fetch(`https://openlibrary.org/search.json?q=${urlTitle}&limit=10`); // Zoeken op basis van een willekeurige term
const cover_url = `https://covers.openlibrary.org/b/id/${data.covers[0]}-M.jpg`; // URL van de coverafbeelding ophalen op basis van de cover-ID
```

We maken op vergelijkbare wijze gebruik van Google- en LinkedIn-authenticatie. We gebruiken ze om gebruikers te authenticeren. Dit gebeurt via verzoeken naar hun eindpunten en libraries om user tokens en basisinformatie te verkrijgen. Deze informatie wordt als JSON ontvangen via http-requests. Deze authenticatieproviders zijn eigendom van Google en LinkedIn, grote bedrijven waarvan wordt verwacht dat ze nog lang zullen bestaan.

# Code

### Architectural layering

In de webapplicatie is een aantal lagen te vinden.
De presentatielaag is te vinden in de frontend, gemaakt met React. Deze laag bevat de applicatie die voor de gebruiker te zien is.
De logische laag bestaat uit de API, gemaakt met Node.js en Express. Op deze laag vindt de logica plaats, tussen de presentatielaag en de datalaag.
De datalaag bestaat uit de MongoDB database. Hierin is alle data die voor de applicatie gebruikt wordt opgeslagen.

### JWT Verificatie

Een onderdeel van de applicatie dat niet direct triviaal is, is de verificatie van JWT's op de backend voor authenticatie.
Er worden tokens gebruikt van Google en LinkedIn.

_Google_

Voor de verificatie van Google JWT's wordt een library van Google gebruikt. De daadwerkelijke implementatie hiervan vindt dus niet plaats binnen de webapplicatie.

```js
import { OAuth2Client } from "google-auth-library";
async function googleVerifyIdToken(token) {
  const client = new OAuth2Client();
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  return payload;
}
```

_LinkedIn_

De verificatie van LinkedIn JWT's is wel geïmplementeerd. De token wordt eerst gedecodeerd en gecontroleerd op de verplichte velden. Met een fetch worden de public keys opgehaald van LinkedIn. De token wordt hierna geverifieerd, met behulp van deze public keys. Vervolgens wordt een aantal checks uitgevoerd voor de echtheid van de token. Er wordt gekeken of de token niet verlopen is, deze daadwerkelijk van LinkedIn komt en of de API key overeenkomt.

```js
import jwt from "jsonwebtoken";
import jwkToPem from "jwk-to-pem";
import { createError } from "./errorCreation.js";
async function linkedInVerifyIdToken(token) {
  const response = await fetch("https://www.linkedin.com/oauth/openid/jwks");
  const jwks = await response.json();
  // Find the correct key in the JWKS based on the key ID (kid) from your JWT header
  const decodedToken = jwt.decode(token, { complete: true });
  if (!decodedToken || !decodedToken.header || !decodedToken.header.kid) {
    throw createError("Invalid JWT format or missing key ID (kid).", 500);
  }
  const kid = decodedToken.header.kid;
  const key = jwks.keys.find((k) => k.kid === kid);
  const publicKeyPem = jwkToPem(key);

  // Verify the ID Token
  const decoded = jwt.verify(token, publicKeyPem, { algorithms: ["RS256"] });
  // Token is valid
  // Additional checks
  const now = Math.floor(Date.now() / 1000);
  if (decoded.exp < now) {
    throw createError("Token has expired", 400);
  }

  if (decoded.iss !== "https://www.linkedin.com") {
    throw createError("Issuer mismatch", 400);
  }

  if (decoded.aud !== process.env.LINKEDIN_APP_ID) {
    throw createError("Audience mismatch", 400);
  }

  return decoded;
}
```

# Data

Als dataopslag wordt MongoDB gebruikt. Dit is een NoSQL document based database. Documenten worden hier in het JSON-format opgeslagen. Bij gebruik van een cloud database kunnen er automatisch backups worden gemaakt om de data te beschermen.
De hoeveelheid opslag die nodig is, is van tevoren lastig te bepalen. Dit zou afhankelijk zijn van het aantal gebruikers dat de webapplicatie krijgt. MongoDB heeft een maximum van 16MB per document. Aangezien hier enkel tekst opgeslagen wordt, zal dit maximum niet snel worden bereikt.
Mongoose wordt gebruikt voor de connectie vanuit de backend met de datbase. Hiervoor zijn de volgende mongoose schema's gemaakt als datamodel.

### User schema

Dit schema is bedoeld voor het opslaan van gebruikers. Er is gekozen om te embedden in dit schema. De voordelen van NoSQL worden hierbij benut, door onnodige referenties te vermijden waar kan.

```js
 {
    _id: { type: String, required: true},
    sso_id: { type: String },
    sso_provider: { type: String, enum: ["Google", "LinkedIn"] },
    name: { type: String, required: true },
    profile_picture: { type: String, required: true},
    top_three: {
      type: {
        name: { type: String},
        books: {
          type: [Book.schema],
          required: true,
        },
      },
      required: true,
    },
    shelf: {
      type: [
        {
          name: { type: String },
          books: {
            type: [Book.schema]
          },
        },
      ],
    },
    bookcase: { type: [Book.schema], required: true},
  }
```

### Book schema

Op verschillende plekken in de user schema wordt gebruikt gemaakt van het type van book schema. Deze is hieronder te zien.

```js
{
  _id: { type: String, required: true },
  cover_image: { type: String },
  title: { type: String, required: true },
  authors: { type: [String], required: true },
}
```

# Infrastructure Architecture

Het doel van een Infrastructure architecture is om een duidelijk beeld te vormen over hoe de applicatie is opgebouwd.
Hierdoor wordt het makkelijker om de applicatie te onderhouden en uit te breiden.

Aangezien wij geen eigen server bezitten, kunnen we daar geen specificaties van beschrijven.
Als de applicatie moet worden gedeployed zouden cloudservices gebruikt kunnen worden.
Omdat de applicatie niet door ons wordt gedeployed, wordt de hardware specificaties uitbesteed aan de cloudservices provider.

In geval van rampen of storingen kan er worden geraadpleegd bij de cloudservice provider.
Het onderhouden en beheren of bewaken van de applicatie zal niet door ons worden verstrekt.

![Infrastructure Architecture Diagram](Diagrammen/Infrastructure_Architecture_Diagram.png)

# Deployment

We hebben nog niet bepaald hoe we onze applicatie gaan deployen. We hebben we een paar opties:
 - Compleet zelf hosten via een VM.
 - Hosten in de cloud via AWS / GCP.
 - Hosten op een deployment helper zoals vercel of netlify, met een externe database hosting provider zoals MongoDB.

Voor ons gaat de voorkeur naar zelf hosten met een VM. Dit zorgt voor complete controle over het deployen en is het ook het makkelijkst om problemen op te sporen. Het is wel goedkoper om alles via AWS of GCP te deployen. Hier betaal je voor wat je gebruikt dus betaal je niet te veel als er weinig traffic op de website komt. Ook als de applicatie veel traffic krijgt zorgen ze er zelf voor dat er meer servers gaan draaien. Het is wel wat moeilijker om dit op te zetten omdat we 3 containers hebben die dan allemaal met elkaar moeten communiceren.

# Operatie en support

### Configuratie

De applicatie gebruikt environment variabelen voor zowel de frontend als de backend. Na aanpassing van deze variabelen is een restart vereist.

_Backend_

```
GOOGLE_CLIENT_ID=
LINKEDIN_APP_SECRET=
LINKEDIN_APP_ID=
MONGOO_HOST=
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

# Decision Log

We hebben gekozen om de volgende technologieën te gebruiken:

Wij gebruiken als frontend framework React met Material UI (MUI) als component library, omdat we snel een frontend in elkaar wilden zetten wat lightweight en makkelijk te gebruiken is. Dit hebben we onderzocht door op google te zoeken naar frameworks voor react die voldoen aan deze criteria. Semantic UI hebben we ook overwogen, maar deze bleek lastiger bij gebruik en personalisatie.

Wij gebruiken als code framework React, omdat het gebruik van een React framework verplicht is. In combinatie met sessions op de backend is React makkelijker te gebruiken dan Next.js, wat we ook hebben overwogen. Next.js heeft ook een eigen backend en cached fetch calls, waardoor sessions op onze eigen backend server niet makkelijk te gebruiken zijn.

Wij gebruiken React-Router voor client-side routing, omdat dit niet standaard aanwezig is in React. Daarnaast is React-Router een populaire keuze voor client-side routing.

Wij gebruiken als backend framework Express, omdat het team ervaring heeft in Express als gebruik voor een API Framework. Ook is Express een veelgebruikt framework voor het opzetten van een API.

Wij gebruiken REST als API architectuur, omdat we voor onze communicatie HTTP gebruiken en het team ervaring heeft met REST en REST een veelgebruikte standaard is voor API's. Express heeft daarnaast goede ondersteuning voor het verwerken van JSON data en het versturen van JSON data, wat veel wordt gebruikt bij het maken van REST API's.

Wij gebruiken als database MongoDB, omdat een NoSQL database verplicht is om te gebruiken. Daarnaast heeft het team ervaring met MongoDB vanuit de courses, en is MongoDB een populaire keuze voor NoSQL databases. Ook is er een goede ondersteuning van MongoDB databases met npm libraries.

Wij gebruiken als database schema Mongoose op de backend, omdat het hierdoor eenvoudiger wordt om de database te manipuleren. Ook zorgt dit voor een consistentere database, wat het schrijven van code voor de database makkelijker maakt.

Wij hebben ervoor gekozen om ook websockets te gebruiken tussen de backend en frontend. Een aantal functies op de frontend zijn ervoor geschikt om live data te sturen en weer te geven. Websockets is hierin een veelgebruikt protocol.

Wij hebben ervoor gekozen om Vite te gebruiken voor het opzetten van het React-project, omdat Vite sneller is dan create_react_app (CRA). Vite gebruikt Hot Module Replacement (HMR), wat zorgt voor snellere updates tijdens het ontwikkelen. Het scherm wordt niet volledig gerefresht, alleen de code die is veranderd wordt geüpdatet tijdens het runnen van de applicatie. Daarnaast gebruikt Vite Rollup als bundling tool in plaats van Webpack. Rollup is beter in het verminderen van bundle groottes en zorgt voor een hogere performance bij het bundelen dan webpack.

Kortom gebruiken wij de MERN stack (MongoDB, Express.js, React, Node.js). Wij zijn tevreden met de keuzes die we hebben gemaakt. Dit zijn ook veelgebruikte, populaire technologieën. Hierdoor krijgen deze keuzes meer credibiliteit.