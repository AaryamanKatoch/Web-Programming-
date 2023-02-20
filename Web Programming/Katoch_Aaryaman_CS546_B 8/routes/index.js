//Here you will require route files and export them as used in previous labs.
const sortArrayRoutes = require('./sortArray');
const constructorMethod = app => {
  app.use("/", sortArrayRoutes);

  app.use("*", (req, res) => {
    res.redirect("/");
  });
};

module.exports = constructorMethod;