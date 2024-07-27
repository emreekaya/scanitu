require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  SECRET: "HTP",
  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_PORT: process.env.MAIL_PORT,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASS: process.env.MAIL_PASS,
  SAML_PATH: process.env.SAML_PATH || '/login/callback',
  SAML_ENTRY_POINT: process.env.SAML_ENTRY_POINT || 'https://your-idp-url.com/sso',
  SAML_ISSUER: process.env.SAML_ISSUER || 'your-app-identifier',
  SAML_CERT: process.env.SAML_CERT || 'YOUR_IDP_CERTIFICATE'
};
