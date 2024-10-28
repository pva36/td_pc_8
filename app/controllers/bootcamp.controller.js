const { users, bootcamps } = require("../models");

const db = require("../models");
const Bootcamp = db.bootcamps;
const User = db.users;

// Crear y guardar un nuevo bootcamp
exports.createBootcamp = (req, res) => {
  return Bootcamp.create(
    // {
    //   title: bootcamp.title,
    //   cue: bootcamp.cue,
    //   description: bootcamp.description,
    // }
    req.body,
  )
    .then((bootcamp) => {
      return res.status(201).json(bootcamp);
      // console.log(
      //   `>> Creado el bootcamp: ${JSON.stringify(bootcamp, null, 4)}`,
      // );
      // return bootcamp;
    })
    .catch((err) => {
      console.log(`>> Error al crear el bootcamp: ${err}`);
      return res
        .status(500)
        .json({ message: `Error al crear el bootcamp: ${err}` });
    });
};

// Agregar un Usuario al Bootcamp
exports.addUser = (req, res) => {
  const bootcampId = req.body.idBootcamp;
  const userId = req.body.idUser;

  return Bootcamp.findByPk(bootcampId)
    .then((bootcamp) => {
      if (!bootcamp) {
        console.log("No se encontro el Bootcamp!");
        return res.status(404).json("No se encontro el Bootcamp!");
      }
      return User.findByPk(userId).then((user) => {
        if (!user) {
          console.log("Usuario no encontrado!");
          return res.status(404).json("Usuario no encontrado!");
        }
        bootcamp.addUser(user);
        console.log("***************************");
        console.log(
          ` Agregado el usuario id=${user.id} al bootcamp con id=${bootcamp.id}`,
        );
        console.log("***************************");
        return res.status(200).json({
          message: `Agregado el usuario id=${user.id} al bootcamp con id=${bootcamp.id}`,
        });
      });
    })
    .catch((err) => {
      console.log(
        ">> Error mientras se estaba agregando Usuario al Bootcamp",
        err,
      );
    });
};

// obtener los bootcamp por id
exports.findById = (req, res) => {
  const Id = req.params.id;
  return Bootcamp.findByPk(Id, {
    include: [
      {
        model: User,
        as: "users",
        attributes: ["id", "firstName", "lastName"],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((bootcamp) => {
      return res.status(200).json(bootcamp);
    })
    .catch((err) => {
      console.log(`>> Error mientras se encontraba el bootcamp: ${err}`);
      return res
        .status(500)
        .json({ message: `Error mientras se encontraba el bootcamp: ${err}` });
    });
};

// obtener todos los Usuarios incluyendo los Bootcamp
exports.findAll = (req, res) => {
  return Bootcamp.findAll({
    include: [
      {
        model: User,
        as: "users",
        attributes: ["id", "firstName", "lastName"],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((bootcamps) => {
      return res.json(bootcamps);
    })
    .catch((err) => {
      console.log(">> Error Buscando los Bootcamps: ", err);
      return res
        .status(404)
        .json({ message: `Error Buscando los Bootcamps: ${err}` });
    });
};
