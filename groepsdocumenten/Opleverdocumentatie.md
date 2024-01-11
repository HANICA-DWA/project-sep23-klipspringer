# Opleverdocumentatie

- [Opleverdocumentatie](#opleverdocumentatie)
- [Inleiding](#inleiding)
- [Installatie en Implementatie](#installatie-en-implementatie)
  - [Overdragen bestanden](#overdragen-bestanden)
    - [Client](#client)
    - [Server](#server)

# Inleiding

In dit opleverdocument staat beschreven hoe de webapplicatie BKS na de oplevering gebruikt kan worden door de opdrachtgever. In het hoofdstuk ‘Installatie en implementatie’ wordt onder andere beschreven hoe de overdracht van de applicatie zal plaats vinden, hoe de site geïnstalleerd kan worden voor gebruik en wat er nog gerealiseerd zou kunnen worden voor een live-gang van BKS. 

# Installatie en Implementatie

In dit hoofdstuk wordt beschreven hoe de gerealiseerde webapplicatie BKS overgedragen kan worden aan en in gebruik genomen kan worden door de opdrachtgever.

## Overdragen bestanden

Alle bestanden die gebruikt zijn voor de realisering van de webapplicatie worden overgedragen in een .zip bestand. In dit bestand is een aantal mappen te vinden.

### Client 

In de map "client" zijn de bestanden te vinden die voor de frontend worden gebruikt. "\_\_mocks\_\_" en "\_\_tests\_\_" zijn mappen waarin de gemaakte frontend tests te vinden zijn. In een terminal zijn deze tests uit te voeren door:

> npm test
> 
> npm t

In de map "public" is een aantal afbeeldingen te vinden die in de app worden gebruikt. 
In de map "src" staat de daadwerkelijke source code van de frontend webapplicatie. Deze is opgedeeld in een aantal mapjes, behorende bij het type bestand. React Hooks staan in de "hooks" map, componenten in "components" enz.


### Server

In de map "server" zijn de bestanden voor de backend server te vinden. Ook hier zijn tests te vinden.
In de map "model" zijn de verschillende mongoose-models te vinden. Hierin zijn de verschillende datastructuren voor de applicatie te vinden, inclusief validatie en functies op de schema's. 

