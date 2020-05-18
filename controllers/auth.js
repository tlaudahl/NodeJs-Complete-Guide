const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  // res.setHeader("Set-Cookie", "loggedIn=true; Expires=Wed, 13 May 2020 08:00:00 GMT;") HTTP Date Format
  // res.setHeader("Set-Cookie", "loggedIn=true; Max-Age=10;") Cookie will expire in 10 seconds. Takes precedence over Expires
  // res.setHeader("Set-Cookie", "loggedIn=true; Secure") Only sends the cookie when a request is made with https
  // res.setHeader("Set-Cookie", "loggedIn=true; HttpOnly") Forbids client side JavaScript from accessing the cookie
  // res.setHeader("Set-Cookie", "loggedIn=true;"); Sets a loggedIn cookie to true
  const { password, email } = req.body;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        return res.redirect("/login");
      }
      bcrypt
        .compare(password, user.password)
        .then(matched => {
          if (matched) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              res.redirect("/");
            });
          }
          res.redirect("/login");
        })
        .catch(err => {
          console.log(err);
          res.redirect("/login");
        });
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const { email, password, confirmedPassword } = req.body;
  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        return res.redirect("/signup");
      }
      return bcrypt
        .hash(password, 12)
        .then(hashedPass => {
          const user = new User({
            email,
            password: hashedPass,
            cart: { items: [] },
          });
          return user.save();
        })
        .then(result => {
          res.redirect("/login");
        });
    })
    .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
  // req.session will no longer be available
  req.session.destroy(err => {
    res.redirect("/");
    console.log(err);
  });
};
