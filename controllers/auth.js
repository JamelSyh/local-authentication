import User from "../models/user.js";
import { genPassword, validPassword } from "../utils/passwordUtils.js";

export function postRegister(req, res, next) {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.status(204).json();
    if (!doc) {
      const genP = genPassword(req.body.password);
      const hash = genP.hash;
      const salt = genP.salt;
      const user = new User({
        username: req.body.username,
        password: hash,
        salt: salt,
      });
      await user.save();
      await req.logIn(user, (err) => {
        if (err) throw err;
      });
      res.status(201).json(user);
    }
  });
}

export function postLogin(req, res, next) {
  res.json(req.user);
}

export function getUser(req, res) {
  res.json(req.user);
}

export function getLogout(req, res) {
  req.logOut();
  res.status(205);
  res.json();
}
