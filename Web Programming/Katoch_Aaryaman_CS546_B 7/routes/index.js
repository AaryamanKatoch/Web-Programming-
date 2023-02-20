const peopleRoutes = require('./people');

const path = require('path');

const constructorMethod = (app) => {
  app.use('/', peopleRoutes)

  app.use('*', (req, res) => {
    res.status(404).render("error",{err: "Page Not Found" })
  });
  };


module.exports = constructorMethod;