const jwt = require("jsonwebtoken");
const passport = require("passport");
const SamlStrategy = require("passport-saml").Strategy;
const { SECRET, SAML_PATH, SAML_ENTRY_POINT, SAML_ISSUER, SAML_CERT } = require("../../../config");
const express = require("express");
const router = express.Router();

passport.use(new SamlStrategy({
  path: SAML_PATH,
  entryPoint: SAML_ENTRY_POINT,
  issuer: SAML_ISSUER,
  cert: SAML_CERT
}, function(profile, done) {
  return done(null, profile);
}));

const loginSaml = (req, res, next) => {
  const samlToken = req.body.token;

  passport.authenticate('saml', { saml: { SAMLResponse: samlToken } }, (err, user, info) => {
    if (err || !user) {
      return res.status(401).json({ status: 401, message: 'Authentication failed' });
    }

    const token = jwt.sign({ id: user.nameID }, SECRET); // nameID, SAML profile içindeki kullanıcı ID'sidir
    res.status(200).json({ status: 200, token });
  })(req, res, next);
};

router.post('/saml', loginSaml);

module.exports = router;
