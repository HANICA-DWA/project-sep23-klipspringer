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