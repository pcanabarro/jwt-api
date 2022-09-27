const usersDao = require('./users-dao');
const { InvalidArgumentError } = require('../errors');
const validations = require('../commons-validations');
const bcrypt = require('bcrypt');

class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.hashPassword = user.password;

    this.validate();
  }

  async add() {
    if (await User.searchById(this.email)) {
      throw new InvalidArgumentError('This user already exists!');
    }

    return usersDao.add(this);
  }

  async addPassword(password) {
    validations.stringNotNullField(password, 'password');
    validations.minLengthField(password, 'password', 8);
    validations.maxLengthField(password, 'password', 64);
    
    this.hashPassword = await User.generateHashPassword(password)
  }

  validate() {
    validations.stringNotNullField(this.name, 'name');
    validations.stringNotNullField(this.email, 'email');

  }


  async delete() {
    return usersDao.delete(this);
  }

  static async searchById(id) {
    const user = await usersDao.searchById(id);
    if (!user) {
      return null;
    }

    return new User(user);
  }

  static async searchByEmail(email) {
    const user = await usersDao.searchByEmail(email);
    if (!user) {
      return null;
    }

    return new User(user);
  }

  static list() {
    return usersDao.list();
  }

  static generateHashPassword(password) {
    const saltRound = 12;
    return bcrypt.hash(password, saltRound)
  }


}

module.exports = User;
