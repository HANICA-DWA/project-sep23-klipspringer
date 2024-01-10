# Context

![Context Diagram](C4-models/C4-model%20context.png)

BKS is een mobile-first webapplicatie van een persoonlijke boekenpagina. Met deze applicatie kan een gebruiker zijn leesvoorkeuren delen, zoals favoriete boeken, top 3 boeken, diverse collecties en er kan zelfs een aangepaste collectie maken.

Deze software wordt gebruikt door 2 verschillende soorten gebruikers, anonieme gebruikers en geauthenticeerde gebruikers. De anononieme gebruiker kan profielen van anderen en boeken bekijken. Ook kan een anonieme gebruiker inloggen om een geauthenticeerde gebruiker te worden.
Een geauthenticeerde gebruiker kan zijn eigen profielpagina bewerken, boekenplanken toevoegen, bewerken en verwijderen. Hij heeft ook inzicht in zijn boekenkast en kan hier ook aanpassingen aan doen.

De software van BKS gebruikt 3 externe systemen, die van Google en LinkedIn voor het authenticeren van gebruikers. En het systeem van OpenLibrary om informatie van boeken op te halen. Deze externe systemen worden verder toegelicht in het hoofdstuk "External Interfaces".

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