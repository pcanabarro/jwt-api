const posts = require('./src/posts');
const users = require('./src/users');

module.exports = app => {
  app.get('/', (req, res) => {res.send('Hi person!')});
  
  posts.routes(app);
  users.routes(app);
};