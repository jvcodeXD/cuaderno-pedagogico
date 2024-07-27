const passport = require('passport')

const jwtAuth = passport.authenticate('jwt', { session: false })

const rolAuth = (roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.rol)) {
      return next()
    } else {
      return res
        .status(403)
        .json({ message: 'No tienes permiso para realizar esta accion' })
    }
  }
}

module.exports = { jwtAuth, rolAuth }
