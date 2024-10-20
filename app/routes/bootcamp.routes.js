const { Router } = require("express");
const bootcampController = require("../controllers/bootcamp.controller");

const bootcampRouter = Router();

bootcampRouter.get("/", bootcampController.findAll);

bootcampRouter.get("/:id", bootcampController.findById);

bootcampRouter.post("/", bootcampController.createBootcamp);

// TODO:
bootcampRouter.post("/adduser", (req, res) =>
  res.status(501).send("post on /api/bootcamp/adduser"),
);

module.exports = bootcampRouter;
