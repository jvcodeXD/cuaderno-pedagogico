const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const passport = require('passport')
const dotenv = require('dotenv')

const usuarioModel = require('../models/usuario')

dotenv.config()

const secretKey = process.env.JWT_SECRET_KEY

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey,
}

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const rows = await usuarioModel.obtenerUsuario(jwt_payload.id)
      if (rows.length > 0) {
        return done(null, rows[0])
      }
      return done(null, false)
    } catch (err) {
      return done(err, false)
    }
  })
)

module.exports = passport
