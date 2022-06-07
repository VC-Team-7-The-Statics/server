const passport = require("passport");

const checkJWT = (req, res, next) =>
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (user) {
      req.user = user;
    }

    next();
  })(req, res, next);

module.exports = checkJWT;
