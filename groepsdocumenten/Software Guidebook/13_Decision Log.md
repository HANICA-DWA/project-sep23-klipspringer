### Decision Log

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
