exports.pageNotFound = (req, res) => {
  const { url } = req;
  res.status(404).render("404", {
    pageTitle: "404 Page Not Found",
    path: url.path,
  });
};
