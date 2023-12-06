# Software Architecture

### Container diagram

![Container](C4-models/C4-model%20container.png)

In dit container diagram is een overzicht te zien van de containers die in de architectuur te vinden zijn. Gebruikers maken via HTTP verbindinging met de React/Vite frontend via een browser. Deze frontend fetcht via HTTP naar de REST API om CRUD operaties uit te voeren. De REST API maakt verbinding met een aantal systemen. Data die in de MongoDB database opgeslagen is, kan via de API gelezen en geschreven worden. Verder maakt de API verbinding met de externe systemen van Google en LinkedIn via HTTP voor authenticatie van gebruikers. En met het systeem van OpenLibrary via HTTP voor het ophalen van boekendata.

### Component MongoDB Diagram

![Component MongoDB](C4-models/C4-model%20component%20MongoDB.png)

De REST API communiceert met de MongoDB database via het Mongo protocol. Deze container bestaat uit een documentenopslag, waarin JSON objecten zijn opgeslagen.

### Component REST API Diagram

![Component REST API](C4-models/C4-model%20component%20REST%20API.png)

De React/Vite container communiceert met het Express component in de REST API. Dit component maakt de verbinding tussen de frontend en backend mogelijk. Express gebruikt het mongoose component om verbinding te maken met de MongoDB container. Verder gebruikt Express een authenticatie component die ieder via een connector verbinding maakt met het externe systeem voor authenticatie. Er is nog een connector voor boeken die verbinding maakt met het OpenLibrary systeem. En een profielbewerk component, waarin aanpassingen aan een gebruiker worden gedaan.

### Component React/Vite Diagram

![Component React/Vite](C4-models/C4-model%20component%20react+vite.png)

De Pages component communiceert via HTTP met de REST API en de externe systemen voor authenticatie en boekeninformatie. Dit component bevat de pagina's die de gebruiker te zien krijgt. Er wordt gebruik gemaakt van het Material UI component die veel React componenten bevat die worden gebruikt. De Router component bepaalt de URL's die worden gebruikt voor de verschillende pagina's.
