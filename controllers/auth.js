exports.getLogin = (req, res, next) => {
  const isLoggedIn = req.get("Cookie").split("=")[1].trim() === "true";
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  // res.setHeader("Set-Cookie", "loggedIn=true; Expires=Wed, 13 May 2020 08:00:00 GMT;") HTTP Date Format
  // res.setHeader("Set-Cookie", "loggedIn=true; Max-Age=10;") Cookie will expire in 10 seconds. Takes precedence over Expires
  // res.setHeader("Set-Cookie", "loggedIn=true; Secure") Only sends the cookie when a request is made with https
  // res.setHeader("Set-Cookie", "loggedIn=true; HttpOnly") Forbids client side JavaScript from accessing the cookie
  res.setHeader("Set-Cookie", "loggedIn=true;");
  res.redirect("/");
};
