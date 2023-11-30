# Projectplan: Plan van Aanpak voor het DWA project

Het *DWA Projectplan* schrijf je in de eerste week van het project: de PREgame. Dit doe je vooral door de markdown bestanden in deze folder `Projectplan` correct 'in te vullen'. De vraag daarbij is natuurlijk 'Wat is 'correct'? Er komt bovendien meer bij kijken dan 'invullen', want op het HBO leiden we studenten op om meer te kunnen dan 'templates invullen' of 'lijstjes afvinken'. In ons onderwijs zit ook een leerlijn 'Plan van Aanpak schrijven', waar dit Projectplan een onderdeel van is.

In deze `README.md` wat meer over de verschillen en overeenkomsten tussen het DWA Projectplan (sectie 1) en ook een beschrijving van een tool die je helpt om voor DWA tot een compleet PvA te komen (sectie 2). De Dit behandelen we aan de hand van een aantal veel voorkomende of mogelijke 'misconcepties'. Misconcepties zijn idee of overtuigingen die mensen kunnen hebben. Hoewel het bij het schrijven. In een Plan van Aanpak komt dit aspect bv. ook bod, met name in het hoofdstuk 'Projectgrenzen', die zaken.

>"With the rise of ubiquitous Agile software development methods and the continuosly changing demands and contexts involved, documentation for sharing knowledge beciomes more critical. However, the attention span for documentation reading, in general, has decreased dramatically [34]. In previous research [31], [32] we have observed tgat developers do not want to write, others do not watot read, but having no documentation at all is not an option. Therefore, the question is when the specification of requirements can be considered 'just enough' before starting or completing an iteration or a project." - Theunissen, 2022.

## 1. Overeenkomensten en verschillen ProjectPlan en Plan van Aanpak

In het 1ejaars project moest je ook al een Plan van Aanpak opstellen. Het grootste verschil is dat je afstuderen een zelfstandig/individueel project is, waar de schoolprojecten ervoor altijd in teamverband zijn.

!!! warning
Misconceptie 1: 🙈 Een ProjectPlan is iets totaal anders dan een Plan van Aanpak

!!! warning
Misconceptie 2: Als ik de markdown bestanden invul en met de tool het PvA genereer is dit goed genoeg.

Feitelijk is een *ProjectPlan* in algemeen taalgebruik zo'n beetje een synoniem voor een *Plan van Aanpak*. Maar het woord 'Projectplan' kun je wel mooi gebruiken om de wat meer *lichtgewicht variant* van het PvA aan te duiden waar het docententeam van DWA doelbewust voor heeft gekozen. Qua format sluiten we ook aan bij het concept van 'Documentation as Code (DaC)'. Dit houdt in dat je de documentatie van software opslaat in versiebeheer direct 'naast' de (bron)code van de software zelf. Dit is een algemene trend in 'Agile Software development' volgens Theunissen (2022).

en in andere courses/projecten spreekt men van een 'Plan van Aanpak'. Voor het aanleveren aan je skills docent kun je het `genereer-pdf.sh` runnen die pandoc gebruikt.

Hiervoor moet je wel eerst `pandoc` installeren en ook benodige pandoc plugins zoals `pandoc-include`.

Dit Projectplan is iets anders dan een standaard Plan van Aanpak. Wel is er een behoorlijke overlap.

## Onderdelen van DWA Projectplan

Er zijn de volgende onderdelen van het ProjectPlan:

1. `Dagplanning.md`
2. `Definition of Done.md`
3. `Opdracht.md`
4. `Periodeplanning.md`
5. `Product Backlog.md`
6. `Procesbeschrijving.md`

Verder maak je ook een inleiding met context van je opdracht en bv. overzicht van teamleden in de `README.md` in de root van je repository.

De standaard onderdelen die we bij AIM verwachten voor een PvA volgens Roel Grit zijn:

1. Inleiding
2. Achtergrond van het project
3. Doelstelling, opdracht en op te leveren resultaten voor het bedrijf
4. Projectgrenzen
5. Randvoorwaarden
6. Op te leveren producten en kwaliteitseisen
7. Ontwikkelmethoden
8. Projectorganisatie en communicatie
9. Planning
10. Risico’s

Een indicatie van de invulling van deze 10 hoofdstukken is gegeven in het AIM document 'Toelichting op het PVA', mometeel in versie 4.0 (Praktijkbureau AIM, 2022)

## 2. Hoe een Projectplan te genereren

Met het (command line) programma `pandoc` kun je vanuit markdown's een `.pdf` bestand genereren.

Verander hieronder in de bestandsnaam van het uitvoer .pdf bestand `antilope` door je eigen concrete teamnaam, bv. `klipspringer`.

Dit gaat uit van aanwezigheid van 'chocolaty' (Windows) of 'brew' (macOS). En ivm de pandoc-include lib ook 'python' (programmeertaal/compiler)) en `pip` (de (default) package manager van Python). Linux gebruikers komen er vast zelf wel uit :P.

```console
brew install pandoc
brew install pandoc-include
cd groepsdocumenten/Projectplan
pandoc projectplan.md --filter pandoc-include -o DWA-plan-van-aanpak-antilope.pdf --table-of-contents --lua-filter projectplan-filters.lua
```

## Trouble shooting

Note to self. Voor het werkend krijgen van dfe `pandoc-include`: 

```console
# Python 3 in pad zetten op mijn mijn macOS
export PATH="/Library/Developer/CommandLineTools/Library/Frameworks/Python3.framework/Versions/3.9/lib/python3.9/site-packages:$PATH"

# pandoc-include in path zetten op mijn macOS
export PATH="/Users/bartvanderwal/Library/Python/3.9/bin:$PATH"
```

## Bronnen

!!! warning
TODO: APA

- Geraadpleegd 10 november 2023 op <https://pandoc.org/installing.html>
- Sunset, DC. *Pandoc include*. Geraadpleegd 10 november 2023 op <https://github.com/DCsunset/pandoc-include>
- HAN StudieCentra (2023) *APA bronnenlijst*. Geraadpleegd 10 november 2023 op <https://www.han.nl/over-de-han/organisatie/bedrijfsonderdelen/studiecentra/apa-in-bronnenlijst/>
- Theunissen, T., Hoppenbrouwers, S en Overbeek, S 2022. *Approaches for Documentation in ontinuous Software Development.*
- Praktijkbureau AIM, Professional Skills (september 2022). *Toelichting plan van aanpak AIM Versie 4.0 - Hoe kom je tot een goed plan van aanpak en wat moet erin staan?*