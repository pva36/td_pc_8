const { Router } = require("express");
const bootcampController = require("../controllers/bootcamp.controller");
const { verifyToken } = require("../middleware");

const bootcampRouter = Router();

// public access
bootcampRouter.get("/", bootcampController.findAll);

// authentication required
bootcampRouter.get("/:id", verifyToken, bootcampController.findById);

bootcampRouter.post("/", verifyToken, bootcampController.createBootcamp);

// TODO:
bootcampRouter.post("/adduser", verifyToken, (req, res) =>
  res.status(501).send("post on /api/bootcamp/adduser"),
);

module.exports = bootcampRouter;
