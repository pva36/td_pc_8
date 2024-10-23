const { Router } = require("express");
const userController = require("../controllers/user.controller");

const signInRouter = Router();

signInRouter.post("/", userController.signIn);

module.exports = signInRouter;
