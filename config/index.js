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
  SAML_ENTRY_POINT: process.env.SAML_ENTRY_POINT || 'https://itu-edu-tr.zoom.us/saml/SSO',
  SAML_ISSUER: process.env.SAML_ISSUER || 'https://itu-edu-tr.zoom.us/',
  SAML_CERT: process.env.SAML_CERT || `MIIGXTCCBUWgAwIBAgIQCLgQc9Z8Mn06Q0tiGbaLyjANBg
  kqhkiG9w0BAQsFADBZMQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMTMwMQYDVQQDEypEaW
  dpQ2VydCBHbG9iYWwgRzIgVExTIFJTQSBTSEEyNTYgMjAyMCBDQTEwHhcNMjEwMTMwMDAwMDAwWhcNMjIwMjA
  yMjM1OTU5WjBzMQswCQYDVQQGEwJVUzETMBEGA1UECBMKQ2FsaWZvcm5pYTERMA8GA1UEBxMIU2FuIEpvc2UxK
  DAmBgNVBAoTH1pvb20gVmlkZW8gQ29tbXVuaWNhdGlvbnMsIEluYy4xEjAQBgNVBAMMCSouem9vbS51`,
   smtpConfig: {
     user: "<user mail>", // ITU SMTP kullanıcı adı
     pass: "password", // ITU SMTP şifresi
   }
};
