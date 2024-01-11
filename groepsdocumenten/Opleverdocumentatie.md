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

In de map "client" zijn de bestanden te vinden die voor de frontend worden gebruikt.
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

Om alles te laten draaien zijn er een paar


# Extra realisatie

In dit hoofdstuk wordt beschreven wat voor extra features/elementen er nog gerealiseerd kunnen worden voor een live-gang van BKS.

## Features

- Het uitwerken van een Open Graph kaart wanneer een gebruiker zijn link wilt delen.
  - Er kan op dit moment wel handmatig een afbeelding van een eigen profiel worden gedownload, het delen van een link met een automatisch gegenereerde afbeelding is een toevoeging die gedaan kan worden.
- De gebruikersinteractie van het bewerken en verwijderen van een plank veranderen (af te stemmen met UX designer (Rik Schot)).
- Het toevoegen van affiliate links bij de "buy" knop op de detailpagina van een boek.
  - Er wordt op dit moment wel doorverwezen naar de Amazon-webshop, dit gebeurt momenteel nog niet via een affiliate link.
- Om de applicatie wat meer op een social-media platform te laten lijken, zouden er nog features als likes en reacties op boekenplanken geïmplenteerd kunnen worden.

## Designs

Er zijn nog een aantal kleine aanpassingen mogelijk aan het design die de UX designer graag zou willen zien in de applicatie. Deze kunnen afgestemd/besproken worden met de UX designer, zodat de aanpassingen worden gemaakt naar verwachting.   


