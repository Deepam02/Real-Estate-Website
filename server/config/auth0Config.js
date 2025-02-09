import { auth } from "express-oauth2-jwt-bearer";
const audience = process.env.ISSUER_BASE_URL
console.log(audience)
const jwtCheck = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
});

export default jwtCheck;
