const User = require('./users-model');
const jwt = require('jsonwebtoken')
const { InvalidArgumentError, InternalServerError } = require('../errors');
const blacklist = require('../../redis/manipulateBlacklist')

function createTokenJWT(user) {
  const payload = {
    id: user.id
  }

  const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '15m' })
  return token
}

module.exports = {
  add: async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const user = new User({
        name,
        email,
      });

      await user.addPassword(password)

      await user.add();

      res.status(201).json(user);
    } catch (err) {
      if (err instanceof InvalidArgumentError) {
        res.status(422).json({ error: err.message });
      } else if (err instanceof InternalServerError) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(500).json({ error: err.message });
      }
    }
  },

  login: (req, res) => {
    const token = createTokenJWT(req.user)
    res.set("Authorization", token)
    res.status(204).send()
  },

  logout: async (req, res) => {
    try {
      console.log(`aaaa`)
      const token = req.token
      await blacklist.add(token)
      res.status(204).send()
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  list: async (req, res) => {
    const users = await User.list();
    res.json(users);
  },

  delete: async (req, res) => {
    const user = await User.searchById(req.params.id);
    try {
      await user.delete();
      res.status(200).json({ data: "User deleted!" });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
};
