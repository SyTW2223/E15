const jwt = require('jsonwebtoken')

function auth(req: { header: (arg0: string) => any; user: any }, res: any, next: any) {
  let jwtToken: string = req.header("Authorization")
  jwtToken = jwtToken.split(' ')[1]
  if (!jwtToken) {
    return res.status(400).send("Acceso denegado. No hay token")
  }
  try {
    const payload = jwt.verify(jwtToken, "secretkey")
    next()
  } catch (err) {
    res.status(401).send("Acceso denegado. Token no valido")
  }
}

module.exports = auth;