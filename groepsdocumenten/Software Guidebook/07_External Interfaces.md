# External Interfaces

BKS maakt gebruik van drie verschillende externe interfaces, namelijk Openlibrary, Google-authenticatie en LinkedIn-authenticatie. Openlibrary wordt gehost door archive.org als een non-profit om een database te bieden voor alle ooit geschreven boeken. Het stelt zijn database beschikbaar via een API via http en geeft resultaten terug in JSON-formaat. We gebruiken Openlibrary om alle informatie over een specifiek boek op te halen, zoals titel, auteur, coverafbeelding, enz. We maken ook gebruik van de zoekfunctie om door alle bestaande boeken te zoeken. We 'cachen' ook boeken in onze eigen database om het gebruik van Openlibrary te beperken en de rate limit van 100 verzoeken in korte tijd niet te overschrijden.

Enkele voorbeelden van de requests die we gebruiken:

```js
fetch(apiUrl + "/isbn/" + req.params.id + ".json"); // Boek opvragen op basis van ISBN
const result = await fetch(`https://openlibrary.org/search.json?q=${urlTitle}&limit=10`); // Zoeken op basis van een willekeurige term
const cover_url = `https://covers.openlibrary.org/b/id/${data.covers[0]}-M.jpg`; // URL van de coverafbeelding ophalen op basis van de cover-ID
```

We maken op vergelijkbare wijze gebruik van Google- en LinkedIn-authenticatie. We gebruiken ze om gebruikers te authenticeren. Dit gebeurt via verzoeken naar hun eindpunten en libraries om user tokens en basisinformatie te verkrijgen. Deze informatie wordt als JSON ontvangen via http-requests. Deze authenticatieproviders zijn eigendom van Google en LinkedIn, grote bedrijven waarvan wordt verwacht dat ze nog lang zullen bestaan.