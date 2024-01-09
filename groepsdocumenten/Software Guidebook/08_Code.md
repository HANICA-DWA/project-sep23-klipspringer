# Code

### Architectural layering

In de webapplicatie is een aantal lagen te vinden.
De presentatielaag is te vinden in de frontend, gemaakt met React. Deze laag bevat de applicatie die voor de gebruiker te zien is.
De logische laag bestaat uit de API, gemaakt met Node.js en Express. Op deze laag vindt de logica plaats, tussen de presentatielaag en de datalaag.
De datalaag bestaat uit de MongoDB database. Hierin is alle data die voor de applicatie gebruikt wordt opgeslagen.

### JWT Verificatie

Een onderdeel van de applicatie dat niet direct triviaal is, is de verificatie van JWT's op de backend voor authenticatie.
Er worden tokens gebruikt van Google en LinkedIn.

_Google_

Voor de verificatie van Google JWT's wordt een library van Google gebruikt. De daadwerkelijke implementatie hiervan vindt dus niet plaats binnen de webapplicatie.

```js
import { OAuth2Client } from "google-auth-library";
async function googleVerifyIdToken(token) {
  const client = new OAuth2Client();
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  return payload;
}
```

_LinkedIn_

De verificatie van LinkedIn JWT's is wel geïmplementeerd. De token wordt eerst gedecodeerd en gecontroleerd op de verplichte velden. Met een fetch worden de public keys opgehaald van LinkedIn. De token wordt hierna geverifieerd, met behulp van deze public keys. Vervolgens wordt een aantal checks uitgevoerd voor de echtheid van de token. Er wordt gekeken of de token niet verlopen is, deze daadwerkelijk van LinkedIn komt en of de API key overeenkomt.

```js
import jwt from "jsonwebtoken";
import jwkToPem from "jwk-to-pem";
import { createError } from "./errorCreation.js";
async function linkedInVerifyIdToken(token) {
  const response = await fetch("https://www.linkedin.com/oauth/openid/jwks");
  const jwks = await response.json();
  // Find the correct key in the JWKS based on the key ID (kid) from your JWT header
  const decodedToken = jwt.decode(token, { complete: true });
  if (!decodedToken || !decodedToken.header || !decodedToken.header.kid) {
    throw createError("Invalid JWT format or missing key ID (kid).", 500);
  }
  const kid = decodedToken.header.kid;
  const key = jwks.keys.find((k) => k.kid === kid);
  const publicKeyPem = jwkToPem(key);

  // Verify the ID Token
  const decoded = jwt.verify(token, publicKeyPem, { algorithms: ["RS256"] });
  // Token is valid
  // Additional checks
  const now = Math.floor(Date.now() / 1000);
  if (decoded.exp < now) {
    throw createError("Token has expired", 400);
  }

  if (decoded.iss !== "https://www.linkedin.com") {
    throw createError("Issuer mismatch", 400);
  }

  if (decoded.aud !== process.env.LINKEDIN_APP_ID) {
    throw createError("Audience mismatch", 400);
  }

  return decoded;
}
```
