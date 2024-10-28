require("dotenv").config();
const express = require("express");
const routes = require("./app/routes");

// express
const app = express();

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

// catch syntax errors inside the request
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError) {
    res.status(500).json({ message: `INVALID JSON: ${err.message}` });
  }
  next();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
