const db = require('../../database');
const { InternalServerError } = require('../errors');

module.exports = {
  add: user => {
    return new Promise((resolve, reject) => {
      db.run(
        `
          INSERT INTO users (
            name,
            email,
            hashPassword
          ) VALUES (?, ?, ?)
        `,
        [user.name, user.email, user.hashPassword],
        err => {
          if (err) {
            reject(new InternalServerError('Error to add user!'));
          }

          return resolve();
        }
      );
    });
  },

  searchById: id => {
    return new Promise((resolve, reject) => {
      db.get(
        `
          SELECT *
          FROM users
          WHERE id = ?
        `,
        [id],
        (err, user) => {
          if (err) {
            return reject('Cannot possible add user!');
          }

          return resolve(user);
        }
      );
    });
  },

  searchByEmail: email => {
    return new Promise((resolve, reject) => {
      db.get(
        `
          SELECT *
          FROM users
          WHERE email = ?
        `,
        [email],
        (err, user) => {
          if (err) {
            return reject('Cannot find user!');
          }

          return resolve(user);
        }
      );
    });
  },

  list: () => {
    return new Promise((resolve, reject) => {
      db.all(
        `
          SELECT * FROM users
        `,
        (err, users) => {
          if (err) {
            return reject('Error to list users!');
          }
          return resolve(users);
        }
      );
    });
  },

  delete: user => {
    return new Promise((resolve, reject) => {
      db.run(
        `
          DELETE FROM users
          WHERE id = ?
        `,
        [user.id],
        err => {
          if (err) {
            return reject('Error to delete user');
          }
          return resolve();
        }
      );
    });
  }
};
