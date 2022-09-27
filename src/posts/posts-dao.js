const db = require('../../database');

module.exports = {
  add: post => {
    return new Promise((resolve, reject) => {
      db.run(
        `
        INSERT INTO posts (
          title, 
          content
        ) VALUES (?, ?)
      `,
        [post.title, post.content],
        err => {
          if (err) {
            return reject('Cannot add post!');
          }

          return resolve();
        }
      );
    });
  },

  list: () => {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM posts`, (err, results) => {
        if (err) {
          return reject('Cannot list posts!');
        }

        return resolve(results);
      });
    });
  }
};
