const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklist = require('../../redis/manipulateBlacklist');

const User = require('./users-model');

const { InvalidArgumentError } = require('../errors');

function verifUser(user) {
    if (!user) {
        throw new InvalidArgumentError("Doesn't exist user with this email")
    }
}

async function verifPassword(password, hashPassword) {
    const validPwd = await bcrypt.compare(password, hashPassword)
    if (!validPwd) {
        throw new InvalidArgumentError("Doesn't exist user with this email or password")
    }
}

async function verifBlacklistToken(token) {
    const tokenInBlacklist = await blacklist.hasToken(token)
    if (!blacklist.hasToken(token)) {
        throw new jwt.JsonWebTokenError('Invalid Token')
    }
}

passport.use(
    new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: false
    }, async (email, password, done) => {
        try {
            const user = await User.searchByEmail(email)
            verifUser(user)
            await verifPassword(password, user.hashPassword)

            done(null, user)
        } catch (err) {
            done(err)
        }
    })
)

passport.use(
    new BearerStrategy(
        async (token, done) => {
            try {
                await verifBlacklistToken(token)
                const payload = jwt.verify(token, process.env.JWT_KEY)
                const user = await User.searchById(payload.id)
                done(null, user, { token: token })
            } catch (err) {
                done(err)
            }
        }
    )
)