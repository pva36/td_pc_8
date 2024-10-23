const verifySignUp = async (req, res, next) => {
  // check whether the email submitted already exist
  // TODO: es necesario hacer esto si la base de datos se encarga de ello?
  next();
};

module.exports = verifySignUp;
