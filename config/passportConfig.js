import passportLocal from "passport-local";
const localStrategy = passportLocal.Strategy;
import User from "../models/user.js";
import { validPassword } from "../utils/passwordUtils.js";

const verifyCallback = (username, password, done) => {
  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        return done(null, false);
      }
      const isValid = validPassword(password, user.password, user.salt);
      if (isValid) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((err) => {
      done(err);
    });
};

export default function (passport) {
  passport.use(new localStrategy(verifyCallback));
  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => {
    User.findById(id, function (err, user) {
      if (err) throw err;
      cb(err, user);
    });
  });
}
