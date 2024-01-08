## Deployment

We hebben nog niet bepaald hoe we onze applicatie gaan deployen. We hebben we een paar opties:
 - Compleet zelf hosten via een VM.
 - Hosten in de cloud via AWS / GCP.
 - Hosten op een deployment helper zoals vercel of netlify, met een externe database hosting provider zoals MongoDB.

Voor ons gaat de voorkeur naar zelf hosten met een VM. Dit zorgt voor complete controle over het deployen en is het ook het makkelijkst om problemen op te sporen. Het is wel goedkoper om alles via AWS of GCP te deployen. Hier betaal je voor wat je gebruikt dus betaal je niet te veel als er weinig traffic op de website komt. Ook als de applicatie veel traffic krijgt zorgen ze er zelf voor dat er meer servers gaan draaien. Het is wel wat moeilijker om dit op te zetten omdat we 3 containers hebben die dan allemaal met elkaar moeten communiceren.