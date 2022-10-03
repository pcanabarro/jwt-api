module.exports = {
  routes: require('./users-routes'),
  controller: require('./users-controller'),
  model: require('./users-model'),
  strategyAuth: require('./strategyAuthentication'),
  middlewareAuth: require('./middlewareAuth')
}