const { Router } = require("express");
const userController = require("../controllers/user.controller");
const verifyToken = require("../middleware").verifyToken;

const userRouter = Router();

// route level middleware!
userRouter.use(verifyToken);

userRouter.get("/:id", userController.findUserById);

userRouter.get("/", userController.findAll);

userRouter.put("/:id", userController.updateUserById);

userRouter.delete("/:id", userController.deleteUserById);

module.exports = userRouter;
