const postsController = require('./posts-controller');
const { middlewareAuth } = require('../users/index')
const passport = require('passport');

module.exports = app => {
  app
    .route('/post')
    .get(postsController.list)
    .post(middlewareAuth.bearer, postsController.add);
};
