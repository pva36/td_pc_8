// const { users } = require("../models");
const db = require("../models");
const User = db.users;
const Bootcamp = db.bootcamps;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Crear y Guardar Usuarios
exports.createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Lo siento, error interno. Intente más tarde." });
    } else {
      let user = req.body;
      return User.create({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: hashedPassword,
      })
        .then((user) => {
          console.log(
            `>> Se ha creado el usuario: ${JSON.stringify(user, null, 4)}`,
          );
          return res.status(201).json(user);
        })
        .catch((err) => {
          console.log(`>> Error al crear el usuario ${err}`);
          return res
            .status(400)
            .json({ message: `Error al crear el usuario: ${err.message}` });
        });
    }
  });
};

exports.signIn = async (req, res) => {
  // find user in database
  const userDb = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (userDb && (await bcrypt.compare(req.body.password, userDb.password))) {
    // create and return token
    jwt.sign(
      {
        userId: userDb.id,
        email: userDb.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "120s",
      },
      (err, token) => {
        if (err) {
          console.error(err);
          return res.json({ message: "Problema interno, intente más tarde" });
        } else {
          return res.status(200).json({
            token,
          });
        }
      },
    );
  }
};

// TODO: acomodar
// obtener los bootcamp de un usuario
exports.findUserById = (userId) => {
  return User.findByPk(userId, {
    include: [
      {
        model: Bootcamp,
        as: "bootcamps",
        attributes: ["id", "title"],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((users) => {
      return users;
    })
    .catch((err) => {
      console.log(`>> Error mientras se encontraba los usuarios: ${err}`);
    });
};

// TODO: acomodar
// obtener todos los Usuarios incluyendo los bootcamp
exports.findAll = () => {
  return User.findAll({
    include: [
      {
        model: Bootcamp,
        as: "bootcamps",
        attributes: ["id", "title"],
        through: {
          attributes: [],
        },
      },
    ],
  }).then((users) => {
    return users;
  });
};

// TODO: acomodar
// Actualizar usuarios
exports.updateUserById = (userId, fName, lName) => {
  return User.update(
    {
      firstName: fName,
      lastName: lName,
    },
    {
      where: {
        id: userId,
      },
    },
  )
    .then((user) => {
      console.log(
        `>> Se ha actualizado el usuario: ${JSON.stringify(user, null, 4)}`,
      );
      return user;
    })
    .catch((err) => {
      console.log(`>> Error mientras se actualizaba el usuario: ${err}`);
    });
};

// TODO: acomodar
// Eliminar usuarios
exports.deleteUserById = (userId) => {
  return User.destroy({
    where: {
      id: userId,
    },
  })
    .then((user) => {
      console.log(
        `>> Se ha eliminado el usuario: ${JSON.stringify(user, null, 4)}`,
      );
      return user;
    })
    .catch((err) => {
      console.log(`>> Error mientras se eliminaba el usuario: ${err}`);
    });
};
