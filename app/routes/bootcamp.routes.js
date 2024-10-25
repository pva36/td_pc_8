const { Router } = require("express");
const bootcampController = require("../controllers/bootcamp.controller");
const { verifyToken } = require("../middleware");

const bootcampRouter = Router();

// public access
bootcampRouter.get("/", bootcampController.findAll);

// authentication required
bootcampRouter.use(verifyToken);

bootcampRouter.get("/:id", bootcampController.findById);

bootcampRouter.post("/", bootcampController.createBootcamp);

bootcampRouter.post("/adduser", bootcampController.addUser);

module.exports = bootcampRouter;
