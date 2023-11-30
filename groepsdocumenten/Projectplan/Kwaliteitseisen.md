# Kwaliteitseisen

Het in dit project op te leveren product is zowel de software als de erbij behorende documentatie (om het product te kunnen begrijpen/gebruiken/onderhouden etc.)

| Product (deliverable)               | Kwaliteitseisen (SMAR(T))                          | Benodigde activiteiten voor product       | Proceskwaliteit (5xW, 1xH) |
|-------------------------------------|----------------------------------------------------|-------------------------------------------|----------------------------|
| Broncode applicatie(s):             | In Mono repo met README met inleiding en links     | Code reviews op code kwaliteit + werking  |                            |
| - Front-end (React)                 | Conform een React styleguide+consistente structuur | ESLint config, correcte keuze NL of EN    | domein                            |                            |
| - Back-end (Node/Express)           |                                |                                     |                            |
| - Database seed script & config     |                                |                                     |                            |
| Backlog (user stories, taken, bugs) | Goed gebruik GitHub Project bord + issues, gebruik tags, initiele backlog in projectplan, bijhouden  | Commit messages met issue nr's en korte beschrijving van het 'Waarom van de commit' |
| Projectplan (PvA)                   | Conform Toel. PvA 4.0 (en controlekaart) | Als groep opgesteld. Goedkeuring door opdrachtgever |
| Software guidebook (SGB)            | Gebruik C4 model met toelichting. Hoofdstukken Conform Brown | S. |                                     |                            |

*Tabel 1*: Kwaliteitscriteria, activiteiten en maatregelen proceskwaliteit per op te leveren product uit het project

### 6.1 Gebruik styleguides & folderstructuur

Gezien de Agile werkwijze volgen we ook het Agile manifesto (Beck, 2001). Dit betekent een focus op 'working code'. En ook zijn 'individuals and interactions' belangrijker dan super stricte naleving van 'processes and tools'. Echter zoals het manifesto aangeeft betekent dit NIET dat processes en tools niet belangrijk zijn. Invulling is meer dat 'perfect is the enemy of good', dus streven we wel naar *short lived branches*. We volgen het standaard GitHub proces van (zie hoofdstuk ontwikkelmethode) van pull requests volgens GitHub flow of Git glow. Maar mergen pull requests. En zorgen dat later refactoren van code die wel werkt, maar nog duidelijker kan. EN hier ook een issue voor aanmaken op de backlog en/of een `// TODO` in de code, zodat we deze verbetering niet vergeten.

<img src="plaatjes/perfect-is-the-enemy-of-good.webp" float="right" width="300">

Dit sluit in het kader van 'continuous integration'. Dus zorgen we als team dat we NIET meerdere dagen open laten staan van pull requests in review. Het is het wel het doel dat teamleden zorgen voor begrijpelijke code en een logische folderstructuur.

De basisDit gebeurt door de keuze van een redelijke styleguide. bv. AirBnB React/JSX.

De keuze tussen NL en EN in code is op basis van het probleemdomein en in afstemming met de opdrachtgever. Is de opdrachtgever alleen binnen Nederland actief en het ontwikkelteam Nederlands. Het is een veelvoorkomende misconceptie om standaard voor Engels te kiezen omdat de keywords uit programmeertalen veelal Engels zijn. Dit leidt tot slechte Engelse vertaling, die dan veelal niet meer aangepast worden. Bovendien introduceert dit een onnodig niveau van indirectie en mogelijke slechte abstractie.

Indien toch Engels dan zorgen we voor duidelijke tabel met vertalingen van Nederlandse domein termen naar Engelse termen.

>"Ooit in een applicatie gezien: `UitvoerendeInstelling` werd `ExecutionInstitute`" - Een zekere 'Mulder' op een discussie op [Tweakers](https://gathering.tweakers.net/forum/list_messages/1088706), 2005

### 6.2 Plan van Aanpak

Beoordelingscriteria Plan van Aanpak

1. Volledig
2. Consistent: alle benodigde resultaten zijn gepland, in de planning is de gekozen methode herkenbaar, en de resultaten
sluiten aan op de doelstelling van het project
3. Projectmethode is voldoende gemotiveerd
4. Opdracht lijkt haalbaar, gegeven afbakening en beschikbare tijd
5. Voldoet aan de AIM-controlekaart met betrekking tot taal en APA

### Documentatie

Documentatie is meer dan alleen Word documenten. Naast dat er andere vormen zijn dan Word documenten, zoals ProjectPlan en Software Guidebook documenten als markdown, zijn er ander artifacten die je maakt in het project, die je als documentatie kunt/moet zien in dit project:

- Interactieve REST endpoint specificatie via Swagger/OpenAPI
- Leesbare unit of integratie test code/methoden
  - Dit is een executeerbare specificatie van je applicatie. Testmethode namen zouden begrijpelijk moeten zijn, en idee geven van WAT de applicatie moet doen/kunnen (maar niet HOE, dat leidt tot 'brittle tests')
- De code zelf
  - Deze dient voorzover mogelijk ook 'zelfdocumenterend' te zijn (e.g. onderhoudbaar)
  - Mogelijk bevat de code ook comments, maar idealiter (zie 'Comments' code smell op CodeGuru (figuur 1))
- Tussentijdse presentaties aan de opdrachtgever tijdens Sprint retro's (bv. bij tussentijdse of eind beoordelingsmoment)
- De backlog in GitHub, hierop komen User Stories met ook Acceptatiecriteria voor, die ook onderdeel zijn van de specificatie

<img src="plaatjes/comments-code-smells.png">

*Figuur 1*: Code zelf is ook een vorm van documentatie, en NIET alleen code comments in de code (die kan zelfs een smell zijn) - bron: [Code Guru, Zhart z.d.](https://refactoring.guru/smells/middle-man))

>Code Guru Comments* op <https://refactoring.guru/smells/comments>

Zoals in de README.md uitgelegd (zie Bijlage A) streven we naar 'Documentation As code'. Omdat het Plan van Aanpak ook door Professional Skills docenten moe. We gebruiken de Markdown linter (Anson, 2023) om veelvoorkomende verschillen in het renderen van Markdown tussen bv. VS Code en op Github te voorkomen. Alle pandoc specifieke styling staat in de `projectplan.md`.

>We found that Git commit messages typically contain *what* has been changed, and sometimes *how* the modification works. Documenting what has been changed is easily retrieved by looking at the difference between commits. Following the principle that Single Source of Truth (SSOT) conveys the ultimate truth (DalleMule & Davenport, 2017), experienced developers and novice developers can find out how the source code works by reading it. However, design decisions that document why the modification was made can hardly be found. - Theunissen