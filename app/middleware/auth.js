const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  // TODO
  const authHeader = req.headers["authorization"];
  if (typeof authHeader == "undefined") {
    return res.status(400).json({
      message: "Solo usuarios autenticados tienen ingreso a esta ruta",
    });
  }
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, jwtDecoded) => {
    if (err) {
      return res.status(403).json({ message: "El token es invalido" });
    } else {
      // where it comes from?
      console.log(jwtDecoded);
      req.user = jwtDecoded;
      next();
    }
  });
};

module.exports = verifyToken;
