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