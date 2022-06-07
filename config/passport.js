const passport = require("passport");
const User = require("../models.js/User");
const secrets = require("./secrets");
const UserService = require("../services/UserService");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secrets.JWT_SECRET,
};

const verifyUser = async (jwt_payload, done) => {
  try {
    const UserInstance = new UserService(User);

    const user = await UserInstance.FindUser({ email: jwt_payload.email });

    if (user) return done(null, user);

    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
};

passport.use(new JwtStrategy(options, verifyUser));

module.exports = passport;
