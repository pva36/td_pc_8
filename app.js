require("dotenv").config();
const express = require("express");
const routes = require("./app/routes");

// express
const app = express();

// jwt
const jwt = require("jsonwebtoken");

// passport
// const passport = require("passport");
// const jwtStrategy = require("passport-jwt").Strategy;
// passport.use(jwtStrategy);

/**
 * Sync the DB (should I consider this?)
 */

const db = require("./app/models");

db.sequelize
  .sync({
    force: true,
  })
  .then(() => {
    console.log("Eliminando y resincronizando la base de datos.");
  });

/**
 * Application level middleware
 */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Routes
 */

app.use("/api/signup", routes.signupRouter);

app.use("/api/signin", routes.signinRouter);

app.use("/api/user", routes.userRouter);

app.use("/api/bootcamp", routes.bootcampRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
