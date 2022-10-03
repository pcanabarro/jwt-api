const usersController = require('./users-controller');
const middlewareAuth = require('./middlewareAuth.js')
const passport = require('passport');

module.exports = app => {
  app.route('/user/login')
    .post(middlewareAuth.local, usersController.login)

  app.route('/user')
    .post(usersController.add)
    .get(usersController.list);

  app.route('/user/:id')
    .delete(middlewareAuth.bearer, usersController.delete);
};
