const passport = require('passport');
const User = require('../models/User');

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//WEB TOKEN

const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'SECRET_KEY'
  };
  
  passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findOne({ _id: jwt_payload.uid });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  }));
  
  module.exports = passport;
