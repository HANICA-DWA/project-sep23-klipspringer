import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import jwkToPem from "jwk-to-pem";
import { createError } from "./errorCreation.js";

export async function googleVerifyIdToken(token) {
  const client = new OAuth2Client();
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  return payload;
}

export async function linkedInVerifyIdToken(token) {
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
