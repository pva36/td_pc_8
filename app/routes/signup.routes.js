const { Router } = require("express");
const userController = require("../controllers/user.controller");
const { verifySignUp } = require("../middleware/index");

const signUpRouter = Router();

signUpRouter.post("/", verifySignUp, userController.createUser);

module.exports = signUpRouter;
