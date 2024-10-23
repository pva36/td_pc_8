const { Router } = require("express");
const userController = require("../controllers/user.controller");

const signInRouter = Router();

signInRouter.post("/", (req, res) => {
  res.send("post in /api/signup");
});

module.exports = signInRouter;
