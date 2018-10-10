const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const { jwtSecret } = require("../config/keys");
const { User } = require("../sequelize");

const cookieExtractor = req => {
  var token = null;
  if (req && req.cookies) token = req.cookies["jwt"];
  return token;
};

const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = jwtSecret;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log("Error: ", err));
    })
  );
};
