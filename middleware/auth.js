import passport from "passport";

export function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res
      .status(403)
      .json({ msg: "You are not authorized to view this resource" });
  }
}

export function authenticate(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    passport.authenticate("local", (err, user) => {
      if (err) throw err;
      if (!user) {
        res
          .status(401)
          .json({ msg: "You are not authorized to view this resource" });
      } else {
        req.logIn(user, (err) => {
          if (err) throw err;
          next();
        });
      }
    })(req, res, next);
  }
}

export function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.admin) {
    next();
  } else {
    res.status(401).json({
      msg: "You are not authorized to view this resource because you are not an admin.",
    });
  }
}
